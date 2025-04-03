
import { ObjetPanier } from './../interfaces/plante';
import { Firestore, collection, doc, addDoc, updateDoc, arrayUnion, getDoc, arrayRemove, docData, onSnapshot} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObjetAddress } from '../interfaces/address';
import { Commande } from '../interfaces/commande';

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
  // NEWSLETTER////////////////////////////////////////////////////
  // add abonné
  addAbonne(email: string) {
    const documentRef = doc(this.firestore, "newsletters/subscribers");
    return updateDoc(documentRef, {
      emails: arrayUnion(email)
    });
  }
  // remove email
  // ADDRESS////////////////////////////////////////////////////////
  // // add un item
  updateAddress(uid: string, objetAddress: ObjetAddress) {
    const documentRef = doc(this.firestore, `customers/${uid}`);
    return updateDoc(documentRef, {
      adresse: objetAddress
    });
  }
  //get 
  async getAddress(uid: string): Promise<ObjetAddress> {
    const documentRef = doc(this.firestore,`customers/${uid}`);
    const leDoc = await getDoc(documentRef);
    if (leDoc.exists()) return leDoc.data()["adresse"];
    else throw Error('Document panier not found');
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
  removePanier (uid: string, objetPanier: ObjetPanier) { console.log('trash');
    const documentRef = doc(this.firestore, `customers/${uid}`);
    return updateDoc(documentRef, {
      panier: arrayRemove(objetPanier)
    });
  }
  // update au panier : 
  updatePanier(uid: string, objetPanier: ObjetPanier[]) { console.log('update');
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

  /// COMMANDES///////////////////////////////////////////////
     // FAVORIS///////////////////////////////////////////////////
   //get
   async getOrders(uid: string): Promise<Commande[]> {
    const documentRef = doc(this.firestore,`customers/${uid}`);
    const leDoc = await getDoc(documentRef);
    if (leDoc.exists()) return leDoc.data()["commandes"];
    else throw Error('Document panier not found');
  }
  // add item
  addOrder(uid: string, ojbetCommande: Commande) {
    const documentRef = doc(this.firestore, `customers/${uid}`);
    return updateDoc(documentRef, {
      commandes: arrayUnion(ojbetCommande)
    });
  }

}
