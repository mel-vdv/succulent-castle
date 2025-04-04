import { CrudsService } from 'src/app/services/cruds.service';
import { Component, OnInit } from '@angular/core';
import { ObjetPanier } from 'src/app/interfaces/plante';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  panier$!: Observable<any> | null;
  user!: User | null;
  total: number = 0;

  constructor(
    private crud: CrudsService,
    public router : Router,
    private authServ: AuthService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authServ.user$.subscribe((user) => {
      if(!!user?.uid) {
        this.user = user;
        this.getPanier();
        this.getTotal();
      }
      else this.authServ.loginWithGoogle();
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

  goPayment() {
    this.router.navigate(['/payment']);
  }
}
