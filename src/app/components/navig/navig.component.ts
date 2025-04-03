import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CrudsService } from 'src/app/services/cruds.service';

@Component({
  selector: 'app-navig',
  templateUrl: './navig.component.html',
  styleUrls: ['./navig.component.scss']
})
export class NavigComponent implements OnInit {

  user!: User | null;
  panierLength: number = 0;

  constructor(
    private authServ : AuthService,
    private crud: CrudsService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authServ.user$.subscribe((user) => {
      this.user = user;
      this.getPanierLength();
    });
  }

  getPanierLength() {
    if(!!this.user?.uid) {   
      this.crud.getPanier(this.user!.uid).subscribe((data:any) => {
      this.panierLength = data?.length ?? 0;
      });
    }
    else this.panierLength = 0;
  }

  deco() {
    this.authServ.logout().subscribe(() => {});
  }

  co() {
    this.authServ.loginWithGoogle();
  }
}
