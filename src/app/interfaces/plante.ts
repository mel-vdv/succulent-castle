export interface Plante {
    image: string;
    webp: string;
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
    gift?: number;
    };

export interface ObjetPanier {
    plante : Plante,
    option: string,
    qte: number,
    soustotal: number
}

export interface PrixDispo {
    prix: number;
    dispo: number;
    diam?: any;
}
