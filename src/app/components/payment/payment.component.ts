import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, onSnapshot } from '@angular/fire/firestore';
import { User } from '@angular/fire/auth';
import { Observable, Subscription, take } from 'rxjs';
import { bonReduc } from 'src/app/constantes/reduc';

import { ObjetAddress } from 'src/app/interfaces/address';
import { ObjetPanier } from 'src/app/interfaces/plante';

import { BpostService } from 'src/app/services/bpost.service';
import { FicheService } from 'src/app/services/fiche.service';
import { CrudsService } from 'src/app/services/cruds.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {


  priceId = "price_1R927tRoPmxQNFK8TU4181mU";
  stripeId= "cus_S38WDCxDnL7WVd";

  panier$!: Observable<ObjetPanier[] | null> | null;
  user!: User | null;
  authSub!: Subscription;
  address?: ObjetAddress;
  boutonPayerInactif: boolean = true;

  bonReduc: string = "";
  soustot: number = 0;
  fraisLivr: number = 0;
  tot: number = 0;
  tva: string = "";
  panierLength: number = 0;
  isNotOnlyGrains: boolean = false;

  constructor(
    private firestore: Firestore,
    private crud: CrudsService,
    private router: Router,
    private authServ: AuthService,
    private bpost: BpostService,
    private ficheServ: FicheService
    ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authSub = this.authServ.user$.subscribe((user:any) => {
      if(!!user?.uid) {
        this.user = user;
        this.getPanier();
        this.getAddress(user.uid);
      }
      else this.router.navigate(['/account']);
    });
  }

  getAddress(uid: string) {
    this.crud.getAddress(uid).then( add => {
      this.address = add ?? undefined;
      if (!!this.address) this.calculFraisEnvoi(this.address.country);
    })
  }

  getPanier() {
    this.panier$ = !!this.user!.uid ? this.crud.getPanier(this.user!.uid!) : null;
    this.panier$?.subscribe((data:any) => {
      this.soustot = data.reduce((acc: number,item: ObjetPanier) => acc + (item.soustotal || 0), 0);
      this.getTva();
      this.getTotalFinal();
      this.isNotOnlyGrains = this.getNotOnlyGrains(data);
      this.panierLength = data?.length ?? 0;
    });
  }

  getTva() {
    this.tva = (this.soustot - this.soustot / 1.20).toFixed(2);
  }

  getTotalFinal() {
    this.tot = this.soustot + this.fraisLivr;
  }

  applyReduc() {
    if(this.bonReduc === bonReduc.code) {
      this.soustot -= (this.soustot * bonReduc.pourcent / 100);
      this.getTva();
      this.getTotalFinal();
    }
  }

  getNotOnlyGrains(panier: any) {
    return panier.filter((objetPanier:any) => objetPanier.option !== 'g')?.length;
  }

  calculFraisEnvoi(pays: string){
    const toBelgium = pays.toLowerCase() === 'belgique';
    const onlyGrains = this.isNotOnlyGrains;
    this.fraisLivr = this.bpost.calcul(onlyGrains, toBelgium);
    this.getTotalFinal();
    this.boutonPayerInactif = false;
  }

  goPanier() {
    this.router.navigate(['/shopping-cart']);
  }

  goStripe() {
    if (!!this.user?.uid) this.payer().catch(console.error);
    else this.authServ.loginWithGoogle();
  }
  ///////////////////////////////////////////

  async payer(): Promise<void> {
    
    this.panier$!.pipe(take(1)).subscribe(async data => {
      if (!!data) {
        this.ficheServ.setUid(this.user!.uid);
        this.ficheServ.setObjetCommande(
        {
        panier: data,
        total: this.tot,
        date: Date.now(),
        etat: 'preparation',
        adresse: this.address!
        });
        this.router.navigate(['payment/success']);
      }

      const checkoutSessionsRef = collection(
        this.firestore,
        'customers',
        this.user!.uid,
        'checkout_sessions'
      );

      const docRef = await addDoc(checkoutSessionsRef, {
        price: this.priceId,
        mode: "payment",
        success_url: window.location.origin + '/payment/success',
        cancel_url: window.location.origin + '/payment/cancel',
      });

      onSnapshot(docRef, (snap) => {
        const data = snap.data();
        if (data?.['url']) {
          window.location.assign(data['url']);
        }
      });

    });
  }
  /***************** */
  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
  }
}
