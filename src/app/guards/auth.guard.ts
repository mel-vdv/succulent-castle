import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authServ: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authServ.user$.pipe(
      take(1),
      map(user => {
        if (user && user.uid) {
          return true;
        } else {
          this.router.navigate(['/account']);
          return false;
        }
      })
    );
  }
}
