import { GiftComponent } from './../components/gifts/gift/gift.component';
import { Injectable } from '@angular/core';
import { Plante } from '../interfaces/plante';
import { Cadeau } from '../interfaces/cadeau';

@Injectable({
  providedIn: 'root'
})
export class FicheService {

  constructor(
  ) { }

  plante?: Plante;
  gift?: Cadeau;
  panierLength: number = 0;
  notif: string = "";

  setPlante(plante: Plante) {
    this.plante = plante;
  }
  getPlante(): Plante | undefined {
    return this.plante;
  }
  
  setGift(gift: Cadeau) {
    this.gift = gift;
  }
  getGift(): Cadeau | undefined {
    return this.gift;
  }

  setNotif(notif: string) {
    this.notif = notif;
  }
  getNotif(): string {
    return this.notif;
  }
}
