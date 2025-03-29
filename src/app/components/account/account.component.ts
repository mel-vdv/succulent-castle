import { CrudsService } from 'src/app/services/cruds.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {


user$ = this.authServ.user$;

  constructor(
    private authServ: AuthService,
    private crud: CrudsService
  ) { }


  choix: number = 0;
  uid?: string;

  ngOnInit(): void {
   
  }
  // me connecter
  signInWithGoogle() {
    this.authServ.loginWithGoogle().subscribe({
      next: (result) => {
        this.user$ = result.user;
        this.uid = result.user.uid;
        if(!!result.user && !!result.user.uid) localStorage.setItem('uid', result.user.uid);
      },
      error: (err) => {
        console.error('Erreur de connexion :', err);
      }
    });
  }

  // se déconnecter
  signOut() {
    this.authServ.logout();
  }

  // compléter infos :
  addAddress(user: User) {
    const address = {
      number: 13,
      rue: "rue de dineur",
      complement: "au 3em étage, BOL 13",
      cp: 92130,
      ville: "bourg la reine",
      pays: "france"
    }
    this.crud.addAddress(user.uid, address)
  }
}
