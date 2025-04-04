import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plante } from 'src/app/interfaces/plante';
import { AuthService } from 'src/app/services/auth.service';
import { CrudsService } from 'src/app/services/cruds.service';
import { FicheService } from 'src/app/services/fiche.service';
import  liste  from 'src/assets/listes/liste-plantes.json';
import { genres } from 'src/app/constantes/genres';
import { User } from '@angular/fire/auth';

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
  user!: User | null;
  favoris?: Promise<string[]>;

  tris: string[] = ["de A à Z", "de Z à A", "Prix croissant","Prix décroissant"];
  triChoisi: string = this.tris[0];
  genres: string[] = genres;
  genreChoisi: string = "tous";

  ngOnInit(): void {
    this.getUser();
    this.plantes = liste;
    this.getCoeurs();
  }
  
  getUser() {
    this.authServ.user$.subscribe((user) => {
      this.user = user;
      this.getCoeurs();
    });
  }

  getCoeurs(): void{
    if(!!this.user?.uid) {
      this.favoris = this.getFav(this.user.uid);
      this.favoris?.then((f) => {
        if (f.length) {
          this.plantes = this.plantes.map( (pl: Plante) => {
          return {...pl, coeur: f.includes(pl.image) ? 'pink' : 'blanc'};
          });
        } 
      });
    }
    else {
      this.plantes = liste;
    }
  }

  triage() {
    const x =  this.genreChoisi === 'tous' ? liste : liste.filter((p: Plante) => p.genre.toLowerCase() === this.genreChoisi);
    this.plantes = x
      .sort( (a: Plante, b:Plante) => {
        switch(this.triChoisi) {
          case "Prix croissant": return a.prix - b.prix;
          case "Prix décroissant":  return b.prix - a.prix;
          case "de A à Z": return (a.genre + ' ' + a.espece).localeCompare(b.genre + ' '+ b.espece);
          case "de Z à A": return (b.genre + ' ' + b.espece).localeCompare(a.genre + ' ' + a.espece);
          default: return 0;
        }
      });
    this.getCoeurs();
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
    if(!!this.user?.uid) {
      if(coeur === 'blanc') {
        //màj immédiate : 
        this.plantes[i].coeur = 'pink';
        //bdd :
        this.addFav(this.user.uid,fav);
      }
      else {
        //maj imm :
        this.plantes[i].coeur = 'blanc';
        //bdd :
        this.removeFav(this.user.uid, fav);
      }
    }
    else this.authServ.loginWithGoogle().subscribe();
  }
}