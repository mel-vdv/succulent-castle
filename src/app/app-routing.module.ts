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
  { path: "", component: HomeComponent},
  { path: "home", component: HomeComponent},
  { path: "collection", component: CollectionComponent},
  { path: "description/:id", component: DescriptionComponent},
  { path: "description/:id/:fav", component: DescriptionComponent},
  { path: "gifts", component: GiftsComponent},
  { path: "gift/:id", component: GiftComponent},
  { path: "gift/:id/:fav", component: GiftComponent},
  { path: "advices", component: AdvicesComponent},
  { path: "contact", component: ContactComponent},
  { path: "shopping-cart", component: ShoppingCartComponent},
  { path: "favorites", component: FavoritesComponent},
  { path: "account", component: AccountComponent},
  { path: "payment", component: PaymentComponent},
  { path: "payment/success", component: SuccessComponent},
  { path: "payment/cancel", component: CancelComponent},
  { path: "faq", component: FaqComponent},
  { path: "cgv", component: CgvComponent},
  { path: "rgpd", component: RgpdComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
