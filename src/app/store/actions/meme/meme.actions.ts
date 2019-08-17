import { Action } from '@ngrx/store';

/**
 * Action types for Meme state
 */
export enum MemeActionTypes {
  ShowMeme = '[Meme] Show Meme',
  ShowMemeSucceed = '[Meme] Show Meme Succeed',
  ShowMemeFailed = '[Meme] Show Meme Failed',
  ShowMemeCompleted = '[Meme] Show Meme Completed',
}
/**
 * Show Meme action type
 */
export class ShowMeme implements Action {
  /**
   * type of ShowMeme Action
   */
  readonly type = MemeActionTypes.ShowMeme;
}
/**
 * Show Meme Succeed action type
 */
export class ShowMemeSucceed implements Action {
  /**
   * type of ShowMemeSucceed Action
   */
  readonly type = MemeActionTypes.ShowMemeSucceed;
  /**
   * constructor method
   * @param isVisible visible flag for the meme
   * @param image meme Blob
   */
  constructor(public isVisible: boolean, public image: Blob) {}
}
/**
 * Show Meme Failed action type
 */
export class ShowMemeFailed implements Action {
  /**
   * type of ShowMemeFailed Action
   */
  readonly type = MemeActionTypes.ShowMemeFailed;
}
/**
 * Show Meme Completed action type
 */
export class ShowMemeCompleted implements Action {
  /**
   * type of ShowMemeCompleted Action
   */
  readonly type = MemeActionTypes.ShowMemeCompleted;
}

/**
 * Actions can be used for Memes
 */
export type MemeActions = ShowMeme | ShowMemeSucceed | ShowMemeFailed | ShowMemeCompleted;
