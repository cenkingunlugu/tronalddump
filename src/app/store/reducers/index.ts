import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  Action
} from '@ngrx/store';
import * as loginReducer from './login/login.reducer';
import * as favoritesReducer from './favorites/favorites.reducer';
import * as memesReducer from './meme/meme.reducer';
import * as myQuotesReducer from './my-quotes/my-quotes.reducer';

import { localStorageSync } from 'ngrx-store-localstorage';

/**
 * Keys to store in localStorage
 */
export const STORE_KEYS_TO_PERSIST = [
  loginReducer.loginFeatureKey, favoritesReducer.favoritesFeatureKey, myQuotesReducer.myQuotesFeatureKey
];


// tslint:disable-next-line:no-empty-interface
export interface State {
  login: loginReducer.LoginState;
  favorites: favoritesReducer.FavoritesState;
  meme: memesReducer.MemeState;
  myQuotes: myQuotesReducer.MyQuotesState;
}

export const reducers: ActionReducerMap<State> = {
  login: loginReducer.reducer,
  favorites: favoritesReducer.reducer,
  meme: memesReducer.reducer,
  myQuotes: myQuotesReducer.reducer
};

/**
 * Used by app module to define what to store in local storage
 * @param reducer for syncing in local storage
 */
export function localStorageSyncReducer(reducer: ActionReducer<State>): ActionReducer<State> {
  return localStorageSync({
    keys: STORE_KEYS_TO_PERSIST,
    rehydrate: true,
    checkStorageAvailability: true
  })(reducer);
}

/**
 * metaReducers for being used in appModule
 */
export const metaReducers: Array<MetaReducer<State, Action>> = [localStorageSyncReducer];
