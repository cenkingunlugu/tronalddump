import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RandomQuotesComponent } from './pages/random-quotes/random-quotes.component';
import { QuoteDetailComponent } from './pages/quote-detail/quote-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    RandomQuotesComponent,
    QuoteDetailComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
