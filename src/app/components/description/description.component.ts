import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private ficheServ: FicheService,
    private route: ActivatedRoute,
    private router: Router,
    private crud: CrudsService,
    private authServ: AuthService
  ) { }

  ngOnInit(): void {
    // recuperer plante
    this.plante = this.ficheServ.getPlante()!;
    const id = this.route.snapshot.paramMap.get('id');
    this.plante = liste.find( (pl:Plante) => decodeURIComponent(pl.image) === id)!;
  }

  setQte(nb: number) {
    this.qte = this.qte + nb;
  }

  share() {
    
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
