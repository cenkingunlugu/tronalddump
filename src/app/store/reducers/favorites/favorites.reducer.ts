import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter} from '@ngrx/entity';
import { QuoteModel } from 'src/app/models/quote.model';

import * as favoriteActions from '../../actions/favorites/favorites.actions';
import { State } from '..';

/**
 * Favorites feature key :)
 */
export const favoritesFeatureKey = 'favorites';

/**
 * Interface for the state
 */
export interface FavoritesState extends EntityState<QuoteModel> {}

/**
 * Entity adapter used for making CRUD easy
 */
export const favoritesAdapter = createEntityAdapter<QuoteModel>({
  selectId: (entity) => entity.quoteId
});

/**
 * ngrx selector to get favorites (as a whole) easily
 */
export const getFavoritesState = createFeatureSelector<State, FavoritesState>(favoritesFeatureKey);

/**
 * ngrx selector to get favorites entities (as an array) easily
 */
export const getFavoritesEntitiesState = createSelector(
  getFavoritesState,
  state => Object.keys(state.entities).map(id => state.entities[id])
);

/**
 * Entity getter by id
 * @param id id of the entity
 */
export const getEntityById = (id: string) => (state: FavoritesState) => state.entities[id];
/**
 * Favorite selector by id
 * @param id id of the entity
 */
export const getFavoriteEntityById = (id: string) => createSelector(getFavoritesState, getEntityById(id));


/**
 * Initial state
 */
export const initialState: FavoritesState = {
  ...favoritesAdapter.getInitialState()
} ;

/**
 * reducer function
 * @param state FavoritesState to deal with
 * @param action Action related to FavoritesState
 */
export function reducer(state = initialState, action: favoriteActions.FavoritesActions): FavoritesState {
  switch (action.type) {
    case favoriteActions.FavoritesActionTypes.ADD_ONE_SUCCEED:
      return favoritesAdapter.addOne(action.favorite, state);
    case favoriteActions.FavoritesActionTypes.DELETE:
      return favoritesAdapter.removeOne(action.favorite.quoteId, state);
    case favoriteActions.FavoritesActionTypes.UPDATE_ONE:
      return favoritesAdapter.updateOne(action.payload, state);
    case favoriteActions.FavoritesActionTypes.GET_ALL:
      return favoritesAdapter.addAll(action.favorites, state);
    default:
      return state;
  }
}
