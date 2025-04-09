import { AccountComponent } from './components/account/account.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RgpdComponent } from './components/rgpd/rgpd.component';
import { CollectionComponent } from './components/collection/collection.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DescriptionComponent } from './components/description/description.component';
import { FaqComponent } from './components/faq/faq.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CancelComponent } from './components/payment/cancel/cancel.component';
import { SuccessComponent } from './components/payment/success/success.component';
import { AdvicesComponent } from './components/advices/advices.component';
import { ContactComponent } from './components/contact/contact.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CgvComponent } from './components/cgv/cgv.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { GiftsComponent } from './components/gifts/gifts/gifts.component';
import { GiftComponent } from './components/gifts/gift/gift.component';

const routes: Routes = [
  { path: "", component: HomeComponent, data: {
    title: "seo.home.t",
    description: "seo.home.d"
  }},
  { path: "home", component: HomeComponent, data: {
    title: "seo.home.t",
    description: "seo.home.d"
  }},
  { path: "collection", component: CollectionComponent, data: {
    title: "seo.collection.t",
    description: "seo.collection.d"
  }},
  { path: "description/:id", component: DescriptionComponent, data: {
    title: "seo.description.t",
    description: "seo.description.d"
  }},
  { path: "description/:id/:fav", component: DescriptionComponent, data: {
    title: "seo.description.t",
    description: "seo.description.d"
  }},
  { path: "gifts", component: GiftsComponent, data: {
    title: "seo.gifts.t",
    description: "seo.gifts.d"
  }},
  { path: "gift/:id", component: GiftComponent, data: {
    title: "seo.gift.t",
    description: "seo.gift.d"
  }},
  { path: "gift/:id/:fav", component: GiftComponent, data: {
    title: "seo.gift.t",
    description: "seo.gift.d"
  }},
  { path: "advices", component: AdvicesComponent, data: {
    title: "seo.advices.t",
    description: "seo.advices.d"
  }},
  { path: "contact", component: ContactComponent, data: {
    title: "seo.contact.t",
    description: "seo.contact.d"
  }},
  { path: "shopping-cart", component: ShoppingCartComponent, data: {
    title: "seo.shopping-cart.t",
    description: "seo.shopping-cart.d"
  }},
  { path: "favorites", component: FavoritesComponent, data: {
    title: "seo.favorites.t",
    description: "seo.favorites.d"
  }},
  { path: "account", component: AccountComponent, data: {
    title: "seo.account.t",
    description: "seo.account.d"
  }},
  { path: "payment", component: PaymentComponent, data: {
    title: "seo.payment.t",
    description: "seo.payment.d"
  }},
  { path: "payment/success", component: SuccessComponent, data: {
    title: "seo.home.t",
    description: "seo.home.d"
  }},
  { path: "payment/cancel", component: CancelComponent, data: {
    title: "seo.home.t",
    description: "seo.home.d"
  }},
  { path: "faq", component: FaqComponent, data: {
    title: "seo.faq.t",
    description: "seo.faq.d"
  }},
  { path: "cgv", component: CgvComponent, data: {
    title: "seo.cgv.t",
    description: "seo.cgv.d"
  }},
  { path: "rgpd", component: RgpdComponent, data: {
    title: "seo.rgpd.t",
    description: "seo.rgpd.d"
  }},
  { path: '**', component: NotFoundComponent, data: {
    title: "seo.home.t",
    description: "seo.home.d"
  }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
