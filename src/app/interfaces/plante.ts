export interface Plante {
    image: string;
    genre: string;
    espece: string;
    prix: number;
    dispo: number;
    diametre?: number;
    hauteur?: number;
    coeur: string;
}

export interface ObjetPanier {
    plante : Plante,
    qte: number,
    soustotal: number
}

