import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, PreloadingStrategy, Router } from '@angular/router';
import { Plante } from 'src/app/interfaces/plante';
import { CrudsService } from 'src/app/services/cruds.service';
import { FicheService } from 'src/app/services/fiche.service';
import liste from 'src/assets/liste-plantes.json';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  plante!: Plante;
  qte: number = 1;
  uid?: string;
  couleur: string = "blanc";

  constructor(
    private ficheServ: FicheService,
    private route: ActivatedRoute,
    private router: Router,
    private crud: CrudsService,
    private authServ: AuthService
  ) { }

  ngOnInit(): void {
    this.getPlante();
    this.getCouleur();
  }

  getPlante() {
    this.plante = this.ficheServ.getPlante()!;
    const id = this.route.snapshot.paramMap.get('id');
    this.plante = liste.find( (pl:Plante) => decodeURIComponent(pl.image) === id)!;
  }

  getCouleur() {
    const fav = this.route.snapshot.paramMap.get('fav') ?? null;
    this.couleur = !! fav ? 'pink' : 'blanc';
  }

  getUid() {
    return localStorage.getItem('uid');
  }

  setQte(nb: number) {
    this.qte = this.qte + nb;
  }

  share() {
    
  }

  toogleCoeur() {
    const uid = this.getUid();
    if(!!uid) {
      const idPlante = this.plante?.image ?? this.route.snapshot.paramMap.get('id');
      if (this.couleur === 'pink') {
        // màj direct : 
        this.couleur = 'blanc';
        //update bdd : 
        this.crud.removeFavori(uid, idPlante);
      }
      else {
        //màj visuelle directe :
        this.couleur = "pink";
        // update bdd :
        this.crud.addFavori(uid, idPlante);
      }
    }
    else this.authServ.loginWithGoogle();
  }

  addPanier() {
    const uid = localStorage.getItem('uid') ?? null;
    if(!! uid) {
      const objetPanier = {
        plante: this.plante, qte: Number(this.qte), soustotal: Number(this.qte * this.plante.prix)
      };
      this.crud.addPanier(uid, objetPanier).then(()=> this.router.navigate(['/shopping-cart']));
    }
    else {
      this.router.navigate(['/account']);
    }
  }
}
