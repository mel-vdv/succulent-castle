export interface Plante {
    image: string;
    genre: string;
    espece: string;
    stock: {
        p: PrixDispo;
        g?: PrixDispo;
        fsr?: PrixDispo;
        fr?: PrixDispo;
        rsr?: PrixDispo;
        rr?: PrixDispo;
        }
    coeur: string;
    carroussel?: number;
    };

export interface ObjetPanier {
    plante : Plante,
    qte: number,
    soustotal: number
}

export interface PrixDispo {
    prix: number;
    dispo: number;
    diam?: any;
}
