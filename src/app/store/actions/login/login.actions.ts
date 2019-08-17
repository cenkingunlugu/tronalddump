import { Action } from '@ngrx/store';
import { User } from 'src/app/services/user/user.service';

export enum LoginActionTypes {
  Login = '[Login] Login state',
  LogOut = '[Login] LogOut state',
  LoginSucceed = '[Login] Login succeed state',
  LoginFailed = '[Login] Login failed state'
}

/**
 * Action definition for the situation where we want to dispatch
 * a login action.
 */
export class Login implements Action {
  /**
   * the type of action to be invoked LogActionTypes.Login
   */
  readonly type = LoginActionTypes.Login;

  /**
   * action type requires login info
   * @param username the username
   * @param password the password
   */
  constructor(public username: string, public password: string) {}
}

/**
 * Action definition for the situation where we want to dispatch
 * a login succeed action.
 */
export class LoginSucceed implements Action {
  /**
   * the type of action to be invoked LogActionTypes.LoginSucceed
   */
  readonly type = LoginActionTypes.LoginSucceed;
  /**
   * action type requires login info
   * @param token the token
   * @param user the user
   */
  constructor(public token: string, public user: User) {}
}

/**
 * Action definition for the situation where we want to dispatch
 * a login failed action.
 */
export class LoginFailed implements Action {
  /**
   * the type of action to be invoked LogActionTypes.LoginFailed
   */
  readonly type = LoginActionTypes.LoginFailed;
}

/**
 * Action definition for the situation where we want to dispatch
 * a logout action.
 */
export class LogOut implements Action {
  /**
   * the type of action to be invoked LogActionTypes.LogOut
   */
  readonly type = LoginActionTypes.LogOut;
}



export type LoginActions = Login | LoginSucceed | LoginFailed | LogOut;
