import { Action } from '@ngrx/store';
import { QuoteModel } from 'src/app/models/quote.model';
import { Update } from '@ngrx/entity';

/**
 * Favorites section action types
 */
export enum FavoritesActionTypes {
  ADD_ONE = '[Favorites] Add One',
  ADD_ONE_SUCCEED = '[Favorites] Add One Succeed',
  ADD_ONE_FAILED = '[Favorites] Add One Failed',
  UPDATE_ONE = '[Favorites] Update One',
  DELETE = '[Favorites] Delete',
  DELETE_SUCCEED = '[Favorites] Delete Succeed',
  DELETE_FAILED = '[Favorites] Delete Failed',
  GET_ALL = '[Favorites] Get All',
}
/**
 * Action for add favorite
 */
export class AddOne implements Action {
  /**
   * Action type for add favorite
   */
  readonly type = FavoritesActionTypes.ADD_ONE;
  /**
   * Constructor method on add favorite
   * @param quote to be added
   */
  constructor(public quote: QuoteModel) {}
}

/**
 * Action for add favorite succeed
 */
export class AddOneSucceed implements Action {
  /**
   * Action type for add favorite succeed
   */
  readonly type = FavoritesActionTypes.ADD_ONE_SUCCEED;
  /**
   * Constructor method on success
   * @param favorite added favorite data
   */
  constructor(public favorite: QuoteModel) {}
}

/**
 * Action for add favorite failed
 */
export class AddOneFailed implements Action {
  /**
   * Action type for add favorite failed
   */
  readonly type = FavoritesActionTypes.ADD_ONE_FAILED;
}

/**
 * Action for delete favorite
 */
export class Delete implements Action {
  /**
   * Action type for delete favorite
   */
  readonly type = FavoritesActionTypes.DELETE;
  /**
   * Constructor method on delete favorite
   * @param favorite for deletion
   */
  constructor(public favorite: QuoteModel ) { }
}

/**
 * Action for delete favorite succeed
 */
export class DeleteSucceed implements Action {
  /**
   * Action type for add favorite succeed
   */
  readonly type = FavoritesActionTypes.DELETE_SUCCEED;
  /**
   * Constructor method on delete favorite
   * @param favorite for selecting which favorite to delete
   */
  constructor(public favorite: QuoteModel) { }
}

/**
 * Action for delete favorite failed
 */
export class DeleteFailed implements Action {
  /**
   * Action type for add favorite failed
   */
  readonly type = FavoritesActionTypes.DELETE_FAILED;
  /**
   * Constructor method on delete favorite
   * @param favorite for selecting which favorite to delete
   */
  constructor(public favorite: QuoteModel) { }
}

/**
 * Action for getting all favorites
 */
export class GetAll implements Action {
  /**
   * Action type for getting all favorites
   */
  readonly type = FavoritesActionTypes.GET_ALL;
  /**
   * Constructor method on get all favorites
   * @param favorites to get
   */
  constructor(public favorites: QuoteModel[]) { }
}

/**
 * Action for update quote
 */
export class UpdateOne implements Action {
  /**
   * Action type for update quote
   */
  readonly type = FavoritesActionTypes.UPDATE_ONE;
  /**
   * Constructor method on update quote
   * @param payload for update
   */
  constructor(
    public payload: Update<QuoteModel>
  ) { }
}





/**
 * All actions for favorites section
 */
export type FavoritesActions = AddOne | AddOneSucceed | AddOneFailed | Delete | DeleteFailed | DeleteSucceed | GetAll | UpdateOne;
