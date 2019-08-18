import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { MemeEffects } from './meme.effects';
import { QuotesService } from 'src/app/services/quotes/quotes.service';
import * as memeActions from '../../actions/meme/meme.actions';
import { hot, cold } from 'jasmine-marbles';
import { TestScheduler } from 'rxjs/testing';

describe('MemeEffects', () => {
  let actions: Observable<any>;
  let effects: MemeEffects;
  let service: QuotesService;
  const blobData = new Blob();
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: QuotesService,
          useValue: {
            getRandomMeme: () => of(blobData)
          }
        },
        MemeEffects,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get<MemeEffects>(MemeEffects);
    service = TestBed.get(QuotesService);
    spyOn(service, 'getRandomMeme').and.callThrough();
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('showMeme effect', () => {
    it('should work as expected when succeed', () => {
      const action = new memeActions.ShowMeme();
      const completion = new memeActions.ShowMemeSucceed(true, blobData);

      // Refer to 'Writing Marble Tests' for details on '--a-' syntax
      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.showMeme).toBeObservable(expected);
      expect(service.getRandomMeme).toHaveBeenCalled();
    });
    it('should work as expected when failed', () => {
      (service.getRandomMeme as jasmine.Spy).and.returnValue(throwError({error: {
        error: {
          message: 'this is a failure!'
        }
      }}));
      const action = new memeActions.ShowMeme();
      const completion = new memeActions.ShowMemeFailed();

      // Refer to 'Writing Marble Tests' for details on '--a-' syntax
      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.showMeme).toBeObservable(expected);
      expect(service.getRandomMeme).toHaveBeenCalled();
    });

  });

  describe('showMemeSucceed effect', () => {
    it('should work as expected when succeed', () => {
      const scheduler = new TestScheduler((a, b) => {
        expect(a).toEqual(b);
      });
      scheduler.run((helpers) => {
        const action = new memeActions.ShowMemeSucceed(true, new Blob());
        const result = new memeActions.ShowMemeCompleted();

        actions = helpers.hot('--a-', { a: action });
        helpers.expectObservable(effects.showMemeSucceed).toBe('-- 4.47s y', { y: result });
      });
    });
  });
});
