import { ObjetAddress } from "./address";
import { ObjetPanier } from "./plante";
export interface Commande {
    panier: ObjetPanier[];
    total: number;
    date: number;
    etat: string;
    adresse: ObjetAddress;
}
