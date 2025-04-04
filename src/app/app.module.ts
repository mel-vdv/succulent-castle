import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
//COMPONENTS : 
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
import { NavigComponent } from './components/navig/navig.component';
import { Footer2Component } from './components/footer2/footer2.component';
import { AccountComponent } from './components/account/account.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CancelComponent } from './components/payment/cancel/cancel.component';
import { SuccessComponent } from './components/payment/success/success.component';
import { PubComponent } from './components/pub/pub.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { SloganComponent } from './components/slogan/slogan.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdvicesComponent } from './components/advices/advices.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CgvComponent } from './components/cgv/cgv.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { OrdersComponent } from './components/account/orders/orders.component';
import { WhatsappComponent } from './components/contact/whatsapp/whatsapp.component';
import { GiftsComponent } from './components/gifts/gifts/gifts.component';
import { GiftComponent } from './components/gifts/gift/gift.component';
//PIPES :
import { VirgulePipe } from './pipes/virgule.pipe';

//AUTRE
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//firebase MODULAIRE
import { environment } from '../environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideDatabase,getDatabase } from '@angular/fire/database';
//import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// Fonction pour charger les fichiers de traduction
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/trad/', '.json');
}


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
    NavigComponent,
    Footer2Component,
    AccountComponent,
    NotFoundComponent,
    PaymentComponent,
    CancelComponent,
    SuccessComponent,
    PubComponent,
    NewsletterComponent,
    SloganComponent,
    ShoppingCartComponent,
    ContactComponent,
    AdvicesComponent,
    CgvComponent,
    FavoritesComponent,
    OrdersComponent,
    WhatsappComponent,
    GiftsComponent,
    GiftComponent,
    VirgulePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),
    ReactiveFormsModule, FormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
