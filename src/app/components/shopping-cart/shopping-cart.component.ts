import { CrudsService } from 'src/app/services/cruds.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObjetPanier, Plante } from 'src/app/interfaces/plante';
import { Router } from '@angular/router';
import { Observable, Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '@angular/fire/auth';
import { FicheService } from 'src/app/services/fiche.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  panier$!: Observable<any> | null;
  user!: User | null;
  authSub!: Subscription;
  total: number = 0;

  constructor(
    private crud: CrudsService,
    public router : Router,
    private authServ: AuthService,
    private ficheServ: FicheService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authSub = this.authServ.user$.subscribe((user) => {
      if(!!user?.uid) {
        this.user = user;
        this.getPanier();
        this.getTotal();
      }
      else this.router.navigate(['/account']);
    });
  }

  getPanier() {
    this.panier$ = !!this.user?.uid ? this.crud.getPanier(this.user.uid) : null;
  }

  getTotal() {
    this.panier$?.subscribe((panier)=> this.total = panier.reduce((acc: number,item: ObjetPanier) => acc + (item.soustotal || 0), 0));
  }

  setQte(nb: number, i: number){
    if (!!this.user && !!(this.user!.uid)){
      this.panier$!
      .pipe(take(1))
      .subscribe((p:ObjetPanier[]) => {
        if (p && p[i]) {
          p[i].qte += nb;
          p[i].soustotal = p[i].plante.stock.p.prix * p[i].qte;
          this.crud.updatePanier(this.user!.uid!, p);
        }
      })
    }
    else this.authServ.loginWithGoogle();
  }

  trash(objetPanier: ObjetPanier) {
    this.crud.removePanier(this.user!.uid!, objetPanier);
  }
  // ROUTING
  navig(plante: Plante) {
    this.ficheServ.setPlante(plante);
    const url = !plante.gift ? "description/" : "gift/";
    this.router.navigate([`${url}${plante.image}`]);
  }
  goPayment() {
    this.router.navigate(['/payment']);
  }
  //----------------------
  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
  }
}
