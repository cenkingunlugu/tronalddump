import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import * as favoriteActions from '../../actions/favorites/favorites.actions';
import * as favoriteReducers from '../../reducers/favorites/favorites.reducer';
import * as memeActions from '../../actions/meme/meme.actions';

import { State } from '../../reducers';
/**
 * Maximum count to be added to favorites
 */
const MAX_FAVORITES_COUNT = 45;

/**
 * Favorites effects
 */
@Injectable()
export class FavoritesEffects {
  /**
   * Constructor method
   * @param actions Actions to be used
   * @param store Store to interact
   */
  constructor(private actions: Actions, private store: Store<State>) {}
  /**
   * Effect to add quote to the favorites
   */
  @Effect()
  tryToAddToFavorite: Observable<Action> = this.actions.pipe(
    ofType(favoriteActions.FavoritesActionTypes.ADD_ONE),
    map((action: favoriteActions.AddOne) => action),
    withLatestFrom(this.store.select(favoriteReducers.getFavoritesEntitiesState)),
    map((actionAndStoreState) => {
      const action = actionAndStoreState[0];
      const favorites = actionAndStoreState[1];
      const isOverLimit = favorites.length >= MAX_FAVORITES_COUNT;
      if (isOverLimit) {
        return new favoriteActions.AddOneFailed();
      }
      return new favoriteActions.AddOneSucceed(action.quote);
    })
  );

  /**
   * Effect to show meme on failure
   */
  @Effect()
  favoriteFail: Observable<Action> = this.actions.pipe(
    ofType(favoriteActions.FavoritesActionTypes.ADD_ONE_FAILED),
    map(() => {
      return new memeActions.ShowMeme();
    })
  );

}
