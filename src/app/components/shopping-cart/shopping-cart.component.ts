import { CrudsService } from 'src/app/services/cruds.service';
import { Component, OnInit } from '@angular/core';
import { ObjetPanier } from 'src/app/interfaces/plante';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  panier?: Promise<ObjetPanier[]>;
  uid?: string;

  constructor(
    private crud: CrudsService,
    public router : Router
  ) { }

  ngOnInit(): void {
    this.uid = localStorage.getItem('uid') ?? undefined;
    this.getPanier();
  }

  getUid() {
    return this.uid ?? localStorage.getItem('uid')!;
  }

  setQte(nb: number, index: number){
    this.panier?.then(p => {
        p[index].qte += nb;
        // Rafraîchir la promesse pour mettre à jour dans le template si besoin :
        this.panier = Promise.resolve([...p]);
        this.crud.updatePanier(this.uid!, p);
    });
  }

  trash(index:number) {
    const uid = this.getUid();
    this.panier?.then(p => {
      p.splice(index, 1);
      console.log('p',p);
      console.log('uid', uid);
      // Rafraîchir la promesse pour mettre à jour dans le template si besoin :
      this.panier = Promise.resolve([...p]);
      this.crud.updatePanier(uid, p);
  });
  }

  getPanier(): void {
    if(!!this.uid) {
      this.panier = this.crud.getPanier(this.uid);
    }
    else {
      this.router.navigate(['/account']);
    }
  }


}
