import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import * as myQuotesReducers from '../../store/reducers/my-quotes/my-quotes.reducer';
import * as loginReducers from '../../store/reducers/login/login.reducer';

import { QuoteModel } from 'src/app/models/quote.model';
import { Router } from '@angular/router';
import { Subscription, merge } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-my-quotes',
  templateUrl: './my-quotes.component.html',
  styleUrls: ['./my-quotes.component.scss']
})
export class MyQuotesComponent implements OnInit, OnDestroy {

  constructor(private store: Store<State>, private router: Router) { }
  quotes: QuoteModel[];
  isLoading: boolean;
  mainSubscription: Subscription;
  ngOnInit() {
    this.isLoading = true;
    const userStream = this.store.select(loginReducers.selectLoginState).pipe(tap((state) => {
      if (!state.user) {
        this.router.navigate(['/my-quotes']);
      }
    }));
    const myQuotesStream = this.store.select(myQuotesReducers.getMyQuotesEntitiesState).pipe(tap((quotes) => {
      this.quotes = quotes;
      this.isLoading = false;
    }));
    this.mainSubscription = merge(userStream, myQuotesStream).subscribe();
  }
  ngOnDestroy() {
    if (this.mainSubscription) {
      this.mainSubscription.unsubscribe();
    }
  }

}
