import { Injectable } from '@angular/core';
import { Plante } from '../interfaces/plante';

@Injectable({
  providedIn: 'root'
})
export class FicheService {

  constructor() { }

  plante?: Plante;
  panierLength: number = 0;

  setPlante(plante: Plante) {
    this.plante = plante;
  }
  getPlante(): Plante | undefined {
    return this.plante;
  }
}
