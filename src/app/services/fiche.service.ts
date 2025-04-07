import { Injectable } from '@angular/core';
import { Plante } from '../interfaces/plante';
import { ObjetAddress } from '../interfaces/address';

@Injectable({
  providedIn: 'root'
})
export class FicheService {

  constructor(
  ) { }

  plante?: Plante;
  gift?: Plante;
  address?: ObjetAddress;
  panierLength: number = 0;
  notif: string = "";

  setPlante(plante: Plante) {
    this.plante = plante;
  }
  getPlante(): Plante | undefined {
    return this.plante;
  }
  
  setGift(gift: Plante) {
    this.gift = gift;
  }
  getGift(): Plante | undefined {
    return this.gift;
  }

  setNotif(notif: string) {
    this.notif = notif;
  }
  getNotif(): string {
    return this.notif;
  }

  setAddress(address: ObjetAddress) {
    this.address = address;
  }
  getAddress(): ObjetAddress | undefined{
    return this.address;
  }
}
