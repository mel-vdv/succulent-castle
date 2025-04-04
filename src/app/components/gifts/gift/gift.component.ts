
import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Plante } from 'src/app/interfaces/plante';
import { AuthService } from 'src/app/services/auth.service';
import { CrudsService } from 'src/app/services/cruds.service';
import { FicheService } from 'src/app/services/fiche.service';
import liste from 'src/assets/listes/liste-gifts.json';

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./../../description/description.component.scss']
})
export class GiftComponent implements OnInit {

  user!: User | null;
  gift!: Plante;
  qte: number = 1;
  uid?: string;
  couleur: string = "blanc";
  sharing: boolean = false;
  shareUrl: string ="";

  constructor(
    private ficheServ: FicheService,
    private route: ActivatedRoute,
    private router: Router,
    private crud: CrudsService,
    private authServ: AuthService
  ) { }

  ngOnInit(): void {
    this.getGift();
    this.getCouleur();
    this.getUser();
  }

  getGift() {
    this.gift = this.ficheServ.getGift()!;
    const id = this.route.snapshot.paramMap.get('id');
    this.gift = liste.find( (g: Plante) => decodeURIComponent( g.image) === id)!;
  }

  getCouleur() {
    const fav = this.route.snapshot.paramMap.get('fav') ?? null;
    this.couleur = !! fav ? 'pink' : 'blanc';
  }

  getUser() {
    this.authServ.user$.subscribe((user) => {
      this.user = user;
      this.toogleCoeur();
    });
  }

  setQte(nb: number) {
    this.qte = this.qte + nb;
  }

  share() {
    this.shareUrl = window.location.origin + this.route.url;
  }

  copypaste() {
    navigator.clipboard.writeText(this.shareUrl).then(() => {
      alert('Lien copié dans le presse-papier !');
      this.sharing = false;
    }, (err) => {
      alert('Erreur lors de la copie : ' + err);
    });
  }

  get whatsappLink() {
    this.sharing = false;
    return `https://wa.me/?text=${encodeURIComponent(this.shareUrl)}`;
  }

  toogleCoeur() {
    if(!!this.user?.uid) {
      const idGift = this.gift?.image ?? this.route.snapshot.paramMap.get('id');
      if (this.couleur === 'pink') {
        // màj direct : 
        this.couleur = 'blanc';
        //update bdd : 
        this.crud.removeFavori(this.user.uid, idGift);
      }
      else {
        //màj visuelle directe :
        this.couleur = "pink";
        // update bdd :
        this.crud.addFavori(this.user.uid, idGift);
      }
    }
    else this.authServ.loginWithGoogle().subscribe();
  }

  addPanier() {
    if(!!this.user?.uid) {
      const objetPanier = {
        plante: this.gift, qte: Number(this.qte), soustotal: Number(this.qte * this.gift.stock.p.prix)
      };
      this.crud.addPanier(this.user.uid, objetPanier).then(()=> this.router.navigate(['/shopping-cart']));
    }
    else {
      this.authServ.loginWithGoogle().subscribe();
    }
  }
}
