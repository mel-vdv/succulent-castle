import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plante } from 'src/app/interfaces/plante';
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
    private ficheServ: FicheService
  ) { }

  plantes!: Plante[];

  ngOnInit(): void {
    this.plantes = liste;
  }

  //vers la fiche description : 
  navig(plante: Plante) {
    this.ficheServ.setPlante(plante);
    this.router.navigate([`description/${plante.image}`]);
  }

}
