import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Commande } from 'src/app/interfaces/commande';
import { CrudsService } from 'src/app/services/cruds.service';
import { FicheService } from 'src/app/services/fiche.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  user!: User | null;
  order!: Commande;
  flag: boolean = false;

  constructor(
    private crud: CrudsService,
    private router: Router,
    private ficheServ: FicheService
  ) { }

  ngOnInit(): void {
    console.log('init');
    if (this.ficheServ.getIsOrdered() || this.ficheServ.getIsOrdering() ) {
      console.log('HEEEEELAAAAAA');
      return;
    }
    else this.addOrder();
  }

  addOrder() {
    console.log("add order");
    this.ficheServ.setIsOrdering(true);
    const objetCommande = this.ficheServ.getObjetCommande();
    const uid = this.ficheServ.getUid()!;
    // on ajoute la commande dans "commandes" de la bdd
    this.crud.addOrder(uid, objetCommande!).then(() => {
      // flag : 
      this.ficheServ.setIsOrdered(true);
      this.ficheServ.setIsOrdering(false);
      // puis on vide le panier :
      this.crud.updatePanier(uid, []);
      // puis le service :
      this.ficheServ.setNotif("success-order-notif");
      this.ficheServ.setObjetCommande(undefined);
      // puis redirection
      this.router.navigate(['/account']);
    })
    .catch(err => this.ficheServ.setIsOrdering(false));
  }

}
