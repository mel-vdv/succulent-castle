import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { bonReduc } from 'src/app/constantes/reduc';
import { ObjetPanier } from 'src/app/interfaces/plante';
import { CrudsService } from 'src/app/services/cruds.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '@angular/fire/auth';
import { ObjetAddress } from 'src/app/interfaces/address';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {


  priceId = "price_1R927tRoPmxQNFK8TU4181mU";
  stripeId= "cus_S38WDCxDnL7WVd";

  panier$!: Observable<ObjetPanier[] | null> | null;
  user!: User | null;
  address?: ObjetAddress;

  bonReduc: string = "";
  soustot: number = 0;
  fraisLivr: number = 12;
  tot: number = 0;
  tva: string = "";
  panierLength: number = 0;

  constructor(
    private firestore: Firestore,
    private crud: CrudsService,
    private router: Router,
    private authServ: AuthService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authServ.user$.subscribe((user:any) => {
      if(!!user?.uid) {
        this.user = user;
        this.getPanier();
        this.getAddress(user.uid);
      }
      else this.router.navigate(['/account']);
    });
  }

  getAddress(uid: string) {
    this.crud.getAddress(uid).then( add => this.address = add ?? undefined)
  }

  getPanier() {
    this.panier$ = !!this.user!.uid ? this.crud.getPanier(this.user!.uid!) : null;
    this.panier$?.subscribe((data:any) => {
      this.soustot = data.reduce((acc: number,item: ObjetPanier) => acc + (item.soustotal || 0), 0);
      this.getTva();
      this.getTotalFinal();
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
  infoExped(){

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

  }

}
