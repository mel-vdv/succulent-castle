import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Plante } from 'src/app/interfaces/plante';
import { AuthService } from 'src/app/services/auth.service';
import { CrudsService } from 'src/app/services/cruds.service';
import { FicheService } from 'src/app/services/fiche.service';
import liste from 'src/assets/listes/liste-plantes.json';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  user!: User | null;
  favoris?: Promise<string[]>
  plantes: Plante[] = [];

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
    this.authServ.user$.subscribe((user) => {
      this.user = user;
      this.getFav();
    });
  }

  //FAVORIS :
  getFav() {
    if (!!this.user?.uid) {
      this.favoris = this.crud.getFavoris(this.user.uid);
      this.favoris?.then((f:string[])=> {
        this.plantes = liste.filter( (pl:Plante) => f.includes(pl.image));
      });
    }
    else this.authServ.loginWithGoogle().subscribe();
  }

  removeFav(fav: string) {
    if(!!this.user?.uid) {
      // rafraichir la promesse favoris de la page :
      this.plantes = this.plantes.filter((pl: Plante) => pl.image !== fav);
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

}
