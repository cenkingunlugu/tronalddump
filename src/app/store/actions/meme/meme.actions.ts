import { Action } from '@ngrx/store';

export enum MemeActionTypes {
  ShowMeme = '[Meme] Show Meme',
  ShowMemeSucceed = '[Meme] Show Meme Succeed',
  ShowMemeFailed = '[Meme] Show Meme Failed',
  ShowMemeCompleted = '[Meme] Show Meme Completed',
}

export class ShowMeme implements Action {
  readonly type = MemeActionTypes.ShowMeme;
}

export class ShowMemeSucceed implements Action {
  readonly type = MemeActionTypes.ShowMemeSucceed;
  constructor(public isVisible: boolean, public image: Blob) {}
}

export class ShowMemeFailed implements Action {
  readonly type = MemeActionTypes.ShowMemeFailed;
}

export class ShowMemeCompleted implements Action {
  readonly type = MemeActionTypes.ShowMemeCompleted;
}


export type MemeActions = ShowMeme | ShowMemeSucceed | ShowMemeFailed | ShowMemeCompleted;
