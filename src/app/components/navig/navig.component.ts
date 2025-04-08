import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CrudsService } from 'src/app/services/cruds.service';

@Component({
  selector: 'app-navig',
  templateUrl: './navig.component.html',
  styleUrls: ['./navig.component.scss']
})
export class NavigComponent implements OnInit, OnDestroy {

  user!: User | null;
  panierLength: number = 0;
  menuOpened = false;
  authSub!: Subscription;

  constructor(
    private authServ : AuthService,
    private crud: CrudsService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authSub = this.authServ.user$.subscribe((user) => {
      console.log('get ser...', user?.uid);
      this.user = user;
      this.getPanierLength();
    });
  }

  getPanierLength() {
    if(!!this.user?.uid) {   
      this.crud.getPanier(this.user!.uid).pipe(take(1)).subscribe((data:any) => {
      this.panierLength = data?.length ?? 0;
      });
    }
    else this.panierLength = 0;
  }

  deco() {
    this.authServ.logout().pipe(take(1)).subscribe();
  }

  co() {
    this.authServ.loginWithGoogle().pipe(take(1)).subscribe();
  }

  ngOnDestroy(): void {
    if(this.authSub) this.authSub.unsubscribe();
  }

}
