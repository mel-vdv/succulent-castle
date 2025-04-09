import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Plante } from 'src/app/interfaces/plante';
import { AuthService } from 'src/app/services/auth.service';
import { CrudsService } from 'src/app/services/cruds.service';
import { FicheService } from 'src/app/services/fiche.service';
import listePlantes from 'src/assets/listes/liste-plantes.json';
import listeGifts from 'src/assets/listes/liste-gifts.json';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {

  user!: User | null;
  authSub!: Subscription;
  favoris?: Promise<string[]>
  plantes: Plante[] = [];
  gifts: Plante[] = [];

  constructor(
    private crud: CrudsService,
    private authServ: AuthService,
    public router: Router,
    private ficheServ: FicheService,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }
  
  getUser() {
    this.authSub = this.authServ.user$.subscribe((user:any) => {
      if(!!user?.uid) {
        this.user = user;
        this.getFav(user.uid);
      }
      else this.router.navigate(['/account']);
    });
  }

  //FAVORIS :
  getFav(uid: string) {
      this.favoris = this.crud.getFavoris(uid);
      this.favoris?.then((f:string[])=> {
        this.gifts = listeGifts.filter( (pl:Plante) => f.includes(pl.image));
        this.plantes = listePlantes.filter( (pl:Plante) => f.includes(pl.image));
      });
  }

  removeFav(fav: string, groupe?: string) {
    if(!!this.user?.uid) {
      // rafraichir la promesse favoris de la page :
      if( groupe === "plantes") {
        this.plantes = this.plantes.filter((pl: Plante) => pl.image !== fav);
      }
      else this.gifts = this.gifts.filter((pl: Plante) => pl.image !== fav);
      
      // update bdd : 
      this.crud.removeFavori(this.user.uid,fav);
    }
    else this.authServ.loginWithGoogle();
  }

  // ROUTING
  navig(plante: Plante) {
    this.ficheServ.setPlante(plante);
    this.router.navigate([`description/${plante.image}/f`]);
  }

  //************** */
  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
  }

}
