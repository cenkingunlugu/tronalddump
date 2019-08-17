import { Action } from '@ngrx/store';
import { QuoteModel } from 'src/app/models/quote.model';
import { Update } from '@ngrx/entity';

/**
 * MyQuotes section action types
 */
export enum MyQuotesActionTypes {
  ADD_ONE = '[MyQuotes] Add One',
  ADD_ONE_SUCCEED = '[MyQuotes] Add One Succeed',
  ADD_ONE_FAILED = '[MyQuotes] Add One Failed',
  UPDATE_ONE = '[MyQuotes] Update One',
  DELETE = '[MyQuotes] Delete',
  DELETE_SUCCEED = '[MyQuotes] Delete Succeed',
  DELETE_FAILED = '[MyQuotes] Delete Failed',
  GET_ALL = '[MyQuotes] Get All',
}
/**
 * Action for add quote
 */
export class AddOne implements Action {
  /**
   * Action type for add quote
   */
  readonly type = MyQuotesActionTypes.ADD_ONE;
  /**
   * Constructor method on add quote
   * @param quote to be added
   */
  constructor(public quote: QuoteModel) {}
}

/**
 * Action for add quote succeed
 */
export class AddOneSucceed implements Action {
  /**
   * Action type for add quote succeed
   */
  readonly type = MyQuotesActionTypes.ADD_ONE_SUCCEED;
  /**
   * Constructor method on success
   * @param quote added quote data
   */
  constructor(public quote: QuoteModel) {}
}

/**
 * Action for add quote failed
 */
export class AddOneFailed implements Action {
  /**
   * Action type for add quote failed
   */
  readonly type = MyQuotesActionTypes.ADD_ONE_FAILED;
}

/**
 * Action for delete favorite
 */
export class Delete implements Action {
  /**
   * Action type for update favorite
   */
  readonly type = MyQuotesActionTypes.DELETE;
  /**
   * Constructor method on delete favorite
   * @param quote for deletion
   */
  constructor(public quote: QuoteModel ) { }
}

/**
 * Action for delete favorite succeed
 */
export class DeleteSucceed implements Action {
  /**
   * Action type for add favorite succeed
   */
  readonly type = MyQuotesActionTypes.DELETE_SUCCEED;
  /**
   * Constructor method on delete favorite
   * @param favorite for selecting which favorite to delete
   */
  constructor(public favorite: QuoteModel) { }
}

/**
 * Action for delete quote failed
 */
export class DeleteFailed implements Action {
  /**
   * Action type for add quote failed
   */
  readonly type = MyQuotesActionTypes.DELETE_FAILED;
  /**
   * Constructor method on delete quote
   * @param favorite for selecting which quote to delete
   */
  constructor(public favorite: QuoteModel) { }
}

/**
 * Action for getting all MyQuotes
 */
export class GetAll implements Action {
  /**
   * Action type for getting all MyQuotes
   */
  readonly type = MyQuotesActionTypes.GET_ALL;
  /**
   * Constructor method on get all MyQuotes
   * @param quotes to get
   */
  constructor(public quotes: QuoteModel[]) { }
}

/**
 * Action for update quote
 */
export class UpdateOne implements Action {
  /**
   * Action type for update quote
   */
  readonly type = MyQuotesActionTypes.UPDATE_ONE;
  /**
   * Constructor method on update quote
   * @param payload for update
   */
  constructor(
    public payload: Update<QuoteModel>
  ) { }
}




/**
 * All actions for MyQuotes section
 */
export type MyQuotesActions = AddOne | AddOneSucceed | AddOneFailed | Delete | DeleteFailed | DeleteSucceed | GetAll | UpdateOne;
