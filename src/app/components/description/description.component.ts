import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Plante } from 'src/app/interfaces/plante';
import { CrudsService } from 'src/app/services/cruds.service';
import { FicheService } from 'src/app/services/fiche.service';
import liste from 'src/assets/listes/liste-plantes.json';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  user!: User | null;
  uid?: string;

  plante!: Plante;
  qte: number = 1;
  couleur: string = "blanc";

  sharing: boolean = false;
  shareUrl: string ="";

  options: (keyof Plante['stock'])[] = [];
  optionChoisie: keyof Plante['stock'] = 'p';
  optionsVisibles: boolean = false;

  constructor(
    private ficheServ: FicheService,
    private route: ActivatedRoute,
    private router: Router,
    private crud: CrudsService,
    private authServ: AuthService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getPlante();
    this.getCouleur();
  }

  getUser() {
    this.authServ.user$.subscribe((user) => {
      this.user = user;
      this.toogleCoeur();
    });
  }

  getPlante() {
    this.plante = this.ficheServ.getPlante()!;
    const id = this.route.snapshot.paramMap.get('id');
    this.plante = liste.find( (pl:Plante) => decodeURIComponent(pl.image) === id)!;
    this.getOption();
  }

  getCouleur() {
    const fav = this.route.snapshot.paramMap.get('fav') ?? null;
    this.couleur = !! fav ? 'pink' : 'blanc';
  }
  
  getOption() {
    if (this.plante.stock.p.dispo) this.options.push("p");
    if (this.plante.stock.rr?.dispo) this.options.push("rr");
    if (this.plante.stock.rsr?.dispo) this.options.push("rsr");
    if (this.plante.stock.fr?.dispo) this.options.push("fr");
    if (this.plante.stock.fsr?.dispo) this.options.push("fsr");
    if (this.plante.stock.g?.dispo) this.options.push("g");
    this.optionChoisie = this.options[0];
  }

  choisirOption(i: number) {
    this.optionChoisie = this.options[i];
    this.optionsVisibles = false;
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
      const idPlante = this.plante?.image ?? this.route.snapshot.paramMap.get('id');
      if (this.couleur === 'pink') {
        // màj direct : 
        this.couleur = 'blanc';
        //update bdd : 
        this.crud.removeFavori(this.user.uid, idPlante);
      }
      else {
        //màj visuelle directe :
        this.couleur = "pink";
        // update bdd :
        this.crud.addFavori(this.user.uid, idPlante);
      }
    }
    else this.authServ.loginWithGoogle().subscribe();
  }

  addPanier() {
    if(!!this.user?.uid) {
      const objetPanier = {
        plante: this.plante,
        option: this.optionChoisie,
        qte: Number(this.qte),
        soustotal: Number(this.qte * this.plante.stock[this.optionChoisie]!.prix)
      };
      this.crud.addPanier(this.user.uid, objetPanier).then(()=> this.router.navigate(['/shopping-cart']));
    }
    else {
      this.authServ.loginWithGoogle().subscribe();
    }
  }
}
