import { AccountComponent } from './components/account/account.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RgpdComponent } from './components/rgpd/rgpd.component';
import { CollectionComponent } from './components/collection/collection.component';
import { AddressesComponent } from './components/account/addresses/addresses.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ConnectionComponent } from './components/account/connection/connection.component';
import { BankCardsComponent } from './components/account/bank-cards/bank-cards.component';
import { OrdersComponent } from './components/account/orders/orders.component';
import { DescriptionComponent } from './components/description/description.component';
import { FaqComponent } from './components/faq/faq.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CancelComponent } from './components/payment/cancel/cancel.component';
import { SuccessComponent } from './components/payment/success/success.component';

const routes: Routes = [
  { path: "", component: PaymentComponent},
  { path: "home", component: HomeComponent},
  { path: "collection", component: CollectionComponent},
  { path: "description/:plant", component: DescriptionComponent},
  { path: "account", component: AccountComponent},
  { path: "account/addresses", component: AddressesComponent},
  { path: "account/orders", component: OrdersComponent},
  { path: "account/bank-cards", component: BankCardsComponent},
  { path: "account/connection", component: ConnectionComponent},
  { path: "payment", component: PaymentComponent},
  { path: "payment/success", component: SuccessComponent},
  { path: "payment/cancel", component: CancelComponent},
  { path: "faq", component: FaqComponent},
  { path: "rgpd", component: RgpdComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
