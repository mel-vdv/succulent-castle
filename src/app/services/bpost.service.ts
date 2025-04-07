import { Injectable } from '@angular/core';
import { FRAISENVOI } from '../constantes/fraisEnvoi';

@Injectable({
  providedIn: 'root'
})
export class BpostService {

  constructor() { }

  calcul( notOnlyGrains: boolean, toBelgium: boolean ): number {
    if (!notOnlyGrains && toBelgium) return FRAISENVOI.nationalLetter;
    if (notOnlyGrains && toBelgium) return FRAISENVOI.nationalColis;
    if (!notOnlyGrains && !toBelgium) return FRAISENVOI.internationalLetter;
    if (notOnlyGrains && !toBelgium) return FRAISENVOI.internationalColis;
    else return 0;
  }
}
