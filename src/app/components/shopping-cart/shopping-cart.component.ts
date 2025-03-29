import { CrudsService } from 'src/app/services/cruds.service';
import { Component, OnInit, Pipe } from '@angular/core';
import { ObjetPanier } from 'src/app/interfaces/plante';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  panier$!: Observable<any> | null;
  uid!: string | null;

  constructor(
    private crud: CrudsService,
    public router : Router
  ) { }

  ngOnInit(): void {
    this.uid ="KGjzPIk253ecTKoyjWZcLqBJj9i2";// localStorage.getItem('uid');
    this.panier$ = !!this.uid ? this.crud.getPanier(this.uid!) : null;
    console.log('on init panier', this.panier$);
  }

  getUid() {
    return"KGjzPIk253ecTKoyjWZcLqBJj9i2";// this.uid ?? localStorage.getItem('uid');
  }

  setQte(nb: number, i: number){
    this.panier$!
    .pipe(take(1))
    .subscribe(p => {
      if (p && p[i]) {
        p[i].qte += nb;
        this.crud.updatePanier(this.uid!, p);
      }
      
    })
  }

  trash(objetPanier: ObjetPanier) {
    this.crud.removePanier(this.uid!, objetPanier);
  }
}
