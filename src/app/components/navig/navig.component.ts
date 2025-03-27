import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navig',
  templateUrl: './navig.component.html',
  styleUrls: ['./navig.component.scss']
})
export class NavigComponent implements OnInit {

  constructor(
    private authServ : AuthService
  ) { }

  user?: User | undefined | null;
  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authServ.user$.subscribe((result) => this.user = result);
  }

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

}
