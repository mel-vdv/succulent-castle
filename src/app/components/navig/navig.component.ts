import { FicheService } from 'src/app/services/fiche.service';
import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { CrudsService } from 'src/app/services/cruds.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-navig',
  templateUrl: './navig.component.html',
  styleUrls: ['./navig.component.scss']
})
export class NavigComponent implements OnInit {
  //user?: User | undefined | null;
  uid?: string | null;

  panierLength: number = 0;
 // panierSub?: Subscription;

  constructor(
    private authServ : AuthService,
    private crud: CrudsService,
    private ficheServ: FicheService
  ) { }


  ngOnInit(): void {
    this.uid = this.getUid();
  }

  getUid() {
    return "KGjzPIk253ecTKoyjWZcLqBJj9i2"; // localStorage.getItem('uid');
  }

  /*
  deco() {
    this.authServ.logout();
  }
  co() {
    this.authServ.loginWithGoogle().subscribe((result) => {
        this.user = result.user;
        if(!!result.user && !!result.user.uid) localStorage.setItem('uid', result.user.uid);
      }
    )
  }
    */

}
