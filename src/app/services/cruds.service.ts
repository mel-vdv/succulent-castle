import { ObjetPanier } from './../interfaces/plante';
import { Firestore, collection, doc, addDoc, updateDoc, arrayUnion, DocumentData, DocumentReference, getDoc } from '@angular/fire/firestore';
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
  //DESCRIPTION
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
}
