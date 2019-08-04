import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RandomQuotesComponent } from './pages/random-quotes/random-quotes.component';


const routes: Routes = [{
  path: '',
  redirectTo: 'random-quotes',
  pathMatch: 'full'
},
{
  path: 'random-quotes',
  component: RandomQuotesComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
