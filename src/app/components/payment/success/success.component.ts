import { take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Commande } from 'src/app/interfaces/commande';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(
    private crud: CrudsService,
    private authServ: AuthService,
    private router: Router,
    private ficheServ: FicheService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }
  
  getUser() {
    this.authServ.user$.subscribe((user) => {
      this.user = user;
      if (!!user?.uid) this.addOrder(user.uid);
    });
  }

  addOrder(uid: string) {
    this.crud.getPanier(uid)
    .pipe(take(1))
    .subscribe(data => {
      const objetCommande: Commande = {
        panier: data,
        date: Date.now(),
        etat : "preparation",
        total: 166,
      }
      this.crud.addOrder(uid, objetCommande).then(() => {
        this.crud.updatePanier(uid, []);
        this.ficheServ.setNotif("success-order-notif");
        this.router.navigate(['/account']);
      });
    });
  }

}
