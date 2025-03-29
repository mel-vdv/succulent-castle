
import { ObjetPanier } from './../interfaces/plante';
import { Firestore, collection, doc, addDoc, updateDoc, arrayUnion, getDoc, arrayRemove, docData, onSnapshot} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudsService {

  constructor(
    private firestore: Firestore
  ) { }
// CONTACT//////////////////////////////////////////////////////////
  addMessage(message : any) {
    const collRef = collection(this.firestore, 'emails');
    return addDoc(collRef, message);
  }
  // ACCOUNT////////////////////////////////////////////////////////
  // ajouter une adresse :
  addAddress(uid: string, adresse: any) {
    const documentRef = doc(this.firestore, `customers/${uid}`);
    return updateDoc(documentRef, {
      adresse: adresse
    });
  }
  //PANIER//////////////////////////////////////////////////////////
  // add un item
  addPanier(uid: string, objetPanier: ObjetPanier) {
    const documentRef = doc(this.firestore, `customers/${uid}`);
    return updateDoc(documentRef, {
      panier: arrayUnion(objetPanier)
    });
  }
  // remove item panier :
  removePanier (uid: string, objetPanier: ObjetPanier) {
    const documentRef = doc(this.firestore, `customers/${uid}`);
    return updateDoc(documentRef, {
      panier: arrayRemove(objetPanier)
    });
  }
  // update au panier : 
  updatePanier(uid: string, objetPanier: ObjetPanier[]) {
    const documentRef = doc(this.firestore, `customers/${uid}`);
    return updateDoc(documentRef, {
      panier: objetPanier
    });
  }
   //
  getPanier(uid: string): Observable<ObjetPanier[]> {
    const documentRef = doc(this.firestore,`customers/${uid}`);
   
  return new Observable<ObjetPanier[]>(observer => {
    const unsubscribe = onSnapshot(documentRef, snapshot => {
      const data: any = snapshot.data();
      const panier = Array.isArray(data?.panier) ? data.panier : [];
      observer.next(panier);
    }, error => {
      observer.error(error);
    });
    // Cleanup lorsque l'observable est désabonné
    return () => unsubscribe();
  });
    
  }
   // FAVORIS///////////////////////////////////////////////////
   //get
   async getFavoris(uid: string): Promise<string[]> {
    const documentRef = doc(this.firestore,`customers/${uid}`);
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
