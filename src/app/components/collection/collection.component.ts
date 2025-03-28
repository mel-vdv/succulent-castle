import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plante } from 'src/app/interfaces/plante';
import { AuthService } from 'src/app/services/auth.service';
import { CrudsService } from 'src/app/services/cruds.service';
import { FicheService } from 'src/app/services/fiche.service';
import  liste  from 'src/assets/liste-plantes.json';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  constructor(
    public router: Router,
    private ficheServ: FicheService,
    private crud: CrudsService,
    private authServ: AuthService
  ) { }

  plantes!: Plante[];
  uid?: string;
  favoris?: Promise<string[]>;

  ngOnInit(): void {
    this.uid = this.getUid();
    this.plantes = liste;
    this.getCollek();
  }

  getCollek(): void{
    if(!!this.uid) {
      this.favoris = this.getFav(this.uid!);
      this.favoris?.then((f) => {
        if (f.length) {
          this.plantes = this.plantes.map( (pl: Plante) => {
          return {...pl, coeur: f.includes(pl.image) ? 'pink' : 'blanc'};
          });
        } 
      });
    }
  }

  // user ? 
  getUid() {
     return localStorage.getItem('uid') ?? undefined;
  }

  //vers la fiche description : 
  navig(plante: Plante) {
    this.ficheServ.setPlante(plante);
    const isFav = plante.coeur === "pink";
    const url = isFav ? `description/${plante.image}/f` : `description/${plante.image}`;
    this.router.navigate([url]);
  }

  //FAVORIS :
  async getFav(uid: string) {
    return this.crud.getFavoris(uid);
  }
  addFav(uid: string, fav: string) {
    this.crud.addFavori(uid,fav);
  }
  removeFav(uid: string, fav: string) {
    this.crud.removeFavori(uid,fav);
  }
  toogleFav(fav: string, coeur: string, i: number) {
    const uid = localStorage.getItem('uid');
    if(!!uid) {
      if(coeur === 'blanc') {
        //màj immédiate : 
        this.plantes[i].coeur = 'pink';
        //bdd :
        this.addFav(uid,fav);
      }
      else {
        //maj imm :
        this.plantes[i].coeur = 'blanc';
        //bdd :
        this.removeFav(uid, fav);
      }
    }
    else this.authServ.loginWithGoogle();
  }
}