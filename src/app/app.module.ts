import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RandomQuotesComponent } from './pages/random-quotes/random-quotes.component';
import { QuoteDetailComponent } from './pages/quote-detail/quote-detail.component';
import { TagsComponent } from './pages/tags/tags.component';
import { QuoteListComponent } from './ui-elements/quote-list/quote-list.component';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { LoginComponent } from './pages/login/login.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './store/effects/login/login.effects';
import { FavoritesEffects } from './store/effects/favorites/favorites.effects';
import { MemeEffects } from './store/effects/meme/meme.effects';

import { FavoritesComponent } from './pages/favorites/favorites.component';
import { ModalComponent } from './ui-elements/modal/modal.component';
import { SurpriseDirective } from './ui-elements/surprise/surprise.directive';
import { MyQuotesComponent } from './pages/my-quotes/my-quotes.component';
import { ManageQuoteComponent } from './pages/manage-quote/manage-quote.component';


@NgModule({
  declarations: [
    AppComponent,
    RandomQuotesComponent,
    QuoteDetailComponent,
    TagsComponent,
    QuoteListComponent,
    LoginComponent,
    FavoritesComponent,
    ModalComponent,
    SurpriseDirective,
    MyQuotesComponent,
    ManageQuoteComponent
  ],
  imports: [
    DeviceDetectorModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxHmCarouselModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([LoginEffects, FavoritesEffects, MemeEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
