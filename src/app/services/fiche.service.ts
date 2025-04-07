import { Injectable } from '@angular/core';
import { Plante } from '../interfaces/plante';
import { ObjetAddress } from '../interfaces/address';
import { Commande } from '../interfaces/commande';

@Injectable({
  providedIn: 'root'
})
export class FicheService {

  constructor(
  ) { }

  plante?: Plante;
  gift?: Plante;
  uid?: string;
  //address?: ObjetAddress;
  commande?: Commande;
  panierLength: number = 0;
  notif: string = "";
  isOrdered: boolean = false;
  isOrdering: boolean = false;

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
  setUid(uid: string): void {
    this.uid = uid;
  }

  getUid(): string | undefined {
    return this.uid;
  }
  
  setObjetCommande(objetCommande: Commande | undefined): void {
    this.commande = objetCommande;
  }

  getObjetCommande(): Commande | undefined {
    return this.commande;
  }

  getIsOrdering(): boolean {
    return this.isOrdering;
  }
  getIsOrdered(): boolean {
    return this.isOrdered;
  }
  setIsOrdering(value: boolean):void {
    this.isOrdering = value;
  }
  setIsOrdered(value: boolean):void {
    this.isOrdered = value;
  }


}
