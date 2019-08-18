import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { LoginEffects } from './login.effects';
import { UserService, User } from 'src/app/services/user/user.service';
import * as loginActions from '../../actions/login/login.actions';
import { hot, cold } from 'jasmine-marbles';

describe('LoginEffects', () => {
  let actions: Observable<any>;
  let effects: LoginEffects;
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            login: () => of({
              token: 'test-token',
              user: {
                username: 'test-user'
              }
            })
          }
        },
        LoginEffects,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get<LoginEffects>(LoginEffects);
    service = TestBed.get(UserService);
    spyOn(service, 'login').and.callThrough();
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loginUser effect', () => {
    it('should work as expected when succeed', () => {
      const action = new loginActions.Login('admin', 'admin');
      const completion = new loginActions.LoginSucceed('test-token', {
        username: 'test-user'
      } as User);

      // Refer to 'Writing Marble Tests' for details on '--a-' syntax
      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.loginUser).toBeObservable(expected);
      expect(service.login).toHaveBeenCalledWith('admin', 'admin');
    });
    it('should work as expected when failed', () => {
      (service.login as jasmine.Spy).and.returnValue(throwError({error: {
        error: {
          message: 'this is a failure!'
        }
      }}));
      const action = new loginActions.Login('admin', 'admin');
      const completion = new loginActions.LoginFailed();

      // Refer to 'Writing Marble Tests' for details on '--a-' syntax
      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.loginUser).toBeObservable(expected);
      expect(service.login).toHaveBeenCalled();
    });
  });
});
