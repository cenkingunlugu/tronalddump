import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RandomQuotesComponent } from './pages/random-quotes/random-quotes.component';
import { QuoteDetailComponent } from './pages/quote-detail/quote-detail.component';
import { TagsComponent } from './pages/tags/tags.component';
import { LoginComponent } from './pages/login/login.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { MyQuotesComponent } from './pages/my-quotes/my-quotes.component';
import { ManageQuoteComponent } from './pages/manage-quote/manage-quote.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'random-quotes',
    pathMatch: 'full'
  },
  {
    path: 'random-quotes',
    component: RandomQuotesComponent
  },
  {
    path: 'quote/:id',
    component: QuoteDetailComponent
  },
  {
    path: 'tag/:tagName',
    component: TagsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'my-quotes',
    component: MyQuotesComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'manage-quote/:id',
    component: ManageQuoteComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'manage-quote',
    component: ManageQuoteComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
