import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, doc, onSnapshot } from '@angular/fire/firestore';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {


  fakeUser = "iT0ZOszpJPQdKujI0gMsaf7Lbzv2";
  priceId = "price_1R6DyvRoPmxQNFK8KkHN90gc";

  constructor(private firestore: Firestore) { }

  ngOnInit(): void {
  }

  acheterPlante() {
    this.payer().catch(console.error);
  }

  async payer(): Promise<void> {
    const checkoutSessionsRef = collection(
      this.firestore,
      'customers',
      this.fakeUser,
      'checkout_sessions'
    );

    const docRef = await addDoc(checkoutSessionsRef, {
      price: "price_1R6DyvRoPmxQNFK8KkHN90gc",
      success_url: window.location.origin + '/payment/success',
      cancel_url: window.location.origin + '/payment/cancel',
    });

    onSnapshot(docRef, (snap) => {
      const data = snap.data();
      if (data?.['url']) {
        window.location.assign(data['url']);
      }
    });

  }

}
