import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import * as favoriteReducers from '../../store/reducers/favorites/favorites.reducer';
import * as loginReducers from '../../store/reducers/login/login.reducer';

import { QuoteModel } from 'src/app/models/quote.model';
import { Router } from '@angular/router';
import { Subscription, merge } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  constructor(private store: Store<State>, private router: Router) { }
  quotes: QuoteModel[];
  isLoading: boolean;
  mainSubscription: Subscription;
  ngOnInit() {
    this.isLoading = true;
    const userStream = this.store.select(loginReducers.selectLoginState).pipe(tap((state) => {
      if (!state.user) {
        this.router.navigate(['/favorites']);
      }
    }));
    const favoritesStream = this.store.select(favoriteReducers.getFavoritesEntitiesState).pipe(tap((quotes) => {
      this.quotes = quotes;
      this.isLoading = false;
    }));
    this.mainSubscription = merge(userStream, favoritesStream).subscribe();
  }
  ngOnDestroy() {
    if (this.mainSubscription) {
      this.mainSubscription.unsubscribe();
    }
  }

}
