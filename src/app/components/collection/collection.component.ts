import { Component, OnInit } from '@angular/core';
import { Plante } from 'src/app/interfaces/plante';
import { liste } from 'src/assets/liste';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  constructor() { }

  plantes!: Plante[];

  ngOnInit(): void {
    this.plantes = liste;
  }

}
