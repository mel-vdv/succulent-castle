import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, user, User } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user$!: Observable<User | null>;

  constructor(private auth: Auth) {  this.user$ = user(this.auth as any);}
  

  loginWithGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }
}
