import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CrudsService } from 'src/app/services/cruds.service';
import { FicheService } from 'src/app/services/fiche.service';
import  listeGifts  from 'src/assets/listes/liste-gifts.json';
import { User } from '@angular/fire/auth';
import { Plante } from 'src/app/interfaces/plante';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.scss']
})
export class GiftsComponent implements OnInit {

  constructor(
    public router: Router,
    private ficheServ: FicheService,
    private crud: CrudsService,
    private authServ: AuthService
  ) { }

  gifts!: Plante[];
  user!: User | null;
  favoris?: Promise<string[]>;

  ngOnInit(): void {
    this.getUser();
    this.gifts = listeGifts;
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
          this.gifts = this.gifts.map( (g: Plante) => {
          return {...g, coeur: f.includes(g.image) ? 'pink' : 'blanc'};
          });
        } 
      });
    }
    else {
      this.gifts = listeGifts;
    }
  }

  //vers la fiche description : 
  navig(gift: Plante) {
    this.ficheServ.setGift(gift);
    const isFav = gift.coeur === "pink";
    const url = isFav ? `gift/${gift.image}/f` : `gift/${gift.image}`;
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
        this.gifts[i].coeur = 'pink';
        //bdd :
        this.addFav(this.user.uid,fav);
      }
      else {
        //maj imm :
        this.gifts[i].coeur = 'blanc';
        //bdd :
        this.removeFav(this.user.uid, fav);
      }
    }
    else this.authServ.loginWithGoogle().subscribe();
  }
}