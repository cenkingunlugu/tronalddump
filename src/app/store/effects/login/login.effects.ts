import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as loginActions from '../../actions/login/login.actions';
import { of, Observable } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { UserService, UserResponse } from 'src/app/services/user/user.service';
import { Action } from '@ngrx/store';


@Injectable()
export class LoginEffects {



  constructor(private actions: Actions, private userService: UserService) {}

  /**
   * Effect to login the user
   */
  @Effect()
  loginUser: Observable<Action> = this.actions.pipe(
    ofType(loginActions.LoginActionTypes.Login),
    switchMap((action: loginActions.Login) => {
      return this.userService.login(action.username, action.password).pipe(
        map((response: UserResponse) => {
          return new loginActions.LoginSucceed(response.token, response.user);
        }),
        catchError(() => {
          return of(new loginActions.LoginFailed());
        })
      );
    })
  );

}
