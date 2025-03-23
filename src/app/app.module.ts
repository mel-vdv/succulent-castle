import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RgpdComponent } from './components/rgpd/rgpd.component';
import { CollectionComponent } from './components/collection/collection.component';
import { FaqComponent } from './components/faq/faq.component';
import { TitleComponent } from './components/title/title.component';
import { DescriptionComponent } from './components/description/description.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { BankCardsComponent } from './components/account/bank-cards/bank-cards.component';
import { ConnectionComponent } from './components/account/connection/connection.component';
import { OrdersComponent } from './components/account/orders/orders.component';
import { AddressesComponent } from './components/account/addresses/addresses.component';
import { PaymentComponent } from './components/payment/payment.component';
import { NavigComponent } from './components/navig/navig.component';
import { Footer2Component } from './components/footer2/footer2.component';
import { AccountComponent } from './components/account/account.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    RgpdComponent,
    CollectionComponent,
    FaqComponent,
    TitleComponent,
    DescriptionComponent,
    DeliveryComponent,
    BankCardsComponent,
    ConnectionComponent,
    OrdersComponent,
    AddressesComponent,
    PaymentComponent,
    NavigComponent,
    Footer2Component,
    AccountComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
