import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, user, User } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private auth: Auth) {}
  

  loginWithGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }
  user$: Observable<User | null> = user(this.auth as any);
}
