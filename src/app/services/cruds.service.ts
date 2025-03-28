import { FavoritesComponent } from './../components/favorites/favorites.component';
import { ObjetPanier } from './../interfaces/plante';
import { Firestore, collection, doc, addDoc, updateDoc, arrayUnion, DocumentData, DocumentReference, getDoc, arrayRemove } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
// voici la cause du probleme ============ import { arrayUnion } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudsService {

  constructor(
    private firestore: Firestore
  ) { }
// CONTACT
  addMessage(message : any) {
    const collRef = collection(this.firestore, 'emails');
    return addDoc(collRef, message);
  }
  // ACCOUNT
  // ajouter une adresse :
  addAddress(uid: string, adresse: any) {
    const documentRef = doc(this.firestore, `customers/${uid}`);
    return updateDoc(documentRef, {
      adresse: adresse
    });
  }
  //PANIER
  // add un item
  addPanier(uid: string, objetPanier: ObjetPanier) {
    const documentRef = doc(this.firestore, `customers/${uid}`);
    return updateDoc(documentRef, {
      panier: arrayUnion(objetPanier)
    });
  }
  // update au panier : 
  updatePanier(uid: string, objetPanier: ObjetPanier[]) {
    console.log('update', uid, objetPanier);
    const documentRef = doc(this.firestore, `customers/${uid}`);
    return updateDoc(documentRef, {
      panier: objetPanier
    });
  }
  // récupérer panier
  async getPanier(uid: string): Promise<ObjetPanier[]> {
    const documentRef: DocumentReference<DocumentData> = doc(this.firestore,`customers/${uid}`);
    const leDoc = await getDoc(documentRef);
    if (leDoc.exists()) return leDoc.data()["panier"];
    else throw Error('Document panier not found');
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
   // FAVORIS
   //get
   async getFavoris(uid: string): Promise<string[]> {
    const documentRef: DocumentReference<DocumentData> = doc(this.firestore,`customers/${uid}`);
    const leDoc = await getDoc(documentRef);
    if (leDoc.exists()) return leDoc.data()["favoris"];
    else throw Error('Document panier not found');
  }
  // add item
  addFavori(uid: string, favori: string) {
    const documentRef = doc(this.firestore, `customers/${uid}`);
    return updateDoc(documentRef, {
      favoris: arrayUnion(favori)
    });
  }
  // remove item
  removeFavori(uid: string, favori: string) {
    const documentRef = doc(this.firestore, `customers/${uid}`);
    return updateDoc(documentRef, {
      favoris: arrayRemove(favori)
    });
  }

}
