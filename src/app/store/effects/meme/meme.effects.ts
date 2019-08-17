import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { QuotesService } from 'src/app/services/quotes/quotes.service';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, delay } from 'rxjs/operators';
import { Action } from '@ngrx/store';

import * as memeActions from '../../actions/meme/meme.actions';
/**
 * Meme effects
 */
@Injectable()
export class MemeEffects {

  /**
   * Constructor method
   * @param actions actions for the effect
   * @param quoteService quoteService instance for getting memes.
   */
  constructor(private actions: Actions, private quoteService: QuotesService) {}

  /**
   * Effect to show meme
   */
  @Effect()
  showMeme: Observable<Action> = this.actions.pipe(
    ofType(memeActions.MemeActionTypes.ShowMeme),
    switchMap(() => {
      return this.quoteService.getRandomMeme().pipe(
        map((response: Blob) => {
          return new memeActions.ShowMemeSucceed(true, response);
        }),
        catchError(() => {
          return of(new memeActions.ShowMemeFailed());
        })
      );
    })
  );

  /**
   * Effect to clear meme after some time
   */
  @Effect()
  showMemeSucceed: Observable<Action> = this.actions.pipe(
    ofType(memeActions.MemeActionTypes.ShowMemeSucceed),
    delay(4470),
    map(() => new memeActions.ShowMemeCompleted())
  );

}
