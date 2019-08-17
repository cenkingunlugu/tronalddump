import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter} from '@ngrx/entity';
import { QuoteModel } from 'src/app/models/quote.model';

import * as myQuotesActions from '../../actions/my-quotes/my-quotes.actions';
import { State } from '..';
export const myQuotesFeatureKey = 'myQuotes';

/**
 * Interface for the state
 */
export interface MyQuotesState extends EntityState<QuoteModel> {}

/**
 * Entity adapter used for making CRUD easy
 */
export const myQuotesAdapter = createEntityAdapter<QuoteModel>({
  selectId: (entity) => entity.quoteId
});

/**
 * ngrx selector to get myQuotes (as a whole) easily
 */
export const getMyQuotesState = createFeatureSelector<State, MyQuotesState>(myQuotesFeatureKey);

/**
 * ngrx selector to get myQuotes entities (as an array) easily
 */
export const getMyQuotesEntitiesState = createSelector(
  getMyQuotesState,
  state => Object.keys(state.entities).map(id => state.entities[id])
);

export const getEntityById = (id: string) => (state: MyQuotesState) => state.entities[id];
export const getUserEntityById = (id: string) => createSelector(getMyQuotesState, getEntityById(id));


/**
 * Initial state
 */
export const initialState: MyQuotesState = {
  ...myQuotesAdapter.getInitialState()
} ;

export function reducer(state = initialState, action: myQuotesActions.MyQuotesActions): MyQuotesState {
  switch (action.type) {
    case myQuotesActions.MyQuotesActionTypes.ADD_ONE:
      return myQuotesAdapter.addOne(action.quote, state);
    case myQuotesActions.MyQuotesActionTypes.DELETE:
      return myQuotesAdapter.removeOne(action.quote.quoteId, state);
    case myQuotesActions.MyQuotesActionTypes.UPDATE_ONE:
      return myQuotesAdapter.updateOne(action.payload, state);
    case myQuotesActions.MyQuotesActionTypes.GET_ALL:
      return myQuotesAdapter.addAll(action.quotes, state);
    default:
      return state;
  }
}
