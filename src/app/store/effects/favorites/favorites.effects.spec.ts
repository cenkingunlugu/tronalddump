import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { FavoritesEffects } from './favorites.effects';
import { StoreModule, Store } from '@ngrx/store';
import { reducers, metaReducers, State } from '../../reducers';
import * as favoriteActions from '../../actions/favorites/favorites.actions';
import * as memeActions from '../../actions/meme/meme.actions';
import { QuoteModel } from 'src/app/models/quote.model';
import { hot, cold } from 'jasmine-marbles';

describe('FavoritesEffects when it is over limit', () => {
  let actions: Observable<any>;
  let effects: FavoritesEffects;
  let store: Store<State>;
  const fakeQuote = new QuoteModel().deserialize({
    quoteId: 'fake-id'
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, { metaReducers, runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
          strictStateSerializability: false,
          strictActionSerializability: false,
        } })
      ],
      providers: [
        FavoritesEffects,
        provideMockActions(() => actions)
      ]
    });
    store = TestBed.get(Store);
    const allFakes = Array.from({length: 45}, (v, k) => fakeQuote);
    spyOn(store, 'select').and.callFake(() => {
      return of(allFakes);
    });
    effects = TestBed.get<FavoritesEffects>(FavoritesEffects);
  });

  describe('favoriteFail effect', () => {
    it('should work as expected', () => {
      store = TestBed.get(Store);
      (store.select as jasmine.Spy).and.callFake(() => {
        return of([]);
      });
      const action = new favoriteActions.AddOneFailed();
      const completion = new memeActions.ShowMeme();

      // Refer to 'Writing Marble Tests' for details on '--a-' syntax
      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.favoriteFail).toBeObservable(expected);
    });

  });

  describe('tryToAddToFavorite effect', () => {
    it('should work as expected', () => {
      store = TestBed.get(Store);
      (store.select as jasmine.Spy).and.callFake(() => {
        return of([]);
      });
      const action = new favoriteActions.AddOne(fakeQuote);
      const completion = new favoriteActions.AddOneFailed();

      // Refer to 'Writing Marble Tests' for details on '--a-' syntax
      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.tryToAddToFavorite).toBeObservable(expected);
    });

  });
});

describe('FavoritesEffects when it is under limit', () => {
  let actions: Observable<any>;
  let effects: FavoritesEffects;
  let store: Store<State>;
  const fakeQuote = new QuoteModel().deserialize({
    quoteId: 'fake-id'
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, { metaReducers, runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
          strictStateSerializability: false,
          strictActionSerializability: false,
        } })
      ],
      providers: [
        FavoritesEffects,
        provideMockActions(() => actions)
      ]
    });
    store = TestBed.get(Store);
    spyOn(store, 'select').and.callFake(() => {
      return of([]);
    });
    effects = TestBed.get<FavoritesEffects>(FavoritesEffects);
  });

  describe('tryToAddToFavorite effect', () => {
    it('should work as expected', () => {
      store = TestBed.get(Store);
      (store.select as jasmine.Spy).and.callFake(() => {
        return of([]);
      });
      const action = new favoriteActions.AddOne(fakeQuote);
      const completion = new favoriteActions.AddOneSucceed(fakeQuote);

      // Refer to 'Writing Marble Tests' for details on '--a-' syntax
      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.tryToAddToFavorite).toBeObservable(expected);
    });

  });
});

