import { CrudsService } from 'src/app/services/cruds.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '@angular/fire/auth';
import { ObjetAddress } from 'src/app/interfaces/address';
import { Commande } from 'src/app/interfaces/commande';
import { ActivatedRoute } from '@angular/router';
import { FicheService } from 'src/app/services/fiche.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {


user!: User | null;
address?: ObjetAddress;
orders?: Commande[];
notif?: string;

  constructor(
    private authServ: AuthService,
    private crud: CrudsService,
    private route: ActivatedRoute,
    private ficheServ: FicheService,
    private translate: TranslateService
  ) {
   }

  ngOnInit(): void {
   this.getUser();
   this.getNotif();
  }

  getNotif() {
    const notifkey = this.ficheServ.getNotif();
    this.translate.get(notifkey).subscribe((res: string) => this.notif = res);
  }

  
  getUser() {
    this.authServ.user$.subscribe((user) => {
      this.user = user;
      if (!!user?.uid) {
        this.getAddress(user.uid);
        this.getCommandes(user.uid);
      }
    });
  }

  getAddress(uid: string) {
    this.crud.getAddress(uid).then( add => {
      this.address = add;
    }
    )
  }

  getCommandes(uid: string) {
    this.crud.getOrders(uid).then(data => this.orders = data ?? undefined );
  }

  /********************************** */

  co() {
    this.authServ.loginWithGoogle().subscribe(result => this.user = result.user ?? null)
  }

  deco() {
    this.authServ.logout().subscribe(() => this.user = null);
  }
}
