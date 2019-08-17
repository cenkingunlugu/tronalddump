import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from 'src/app/services/user/user.service';
import { State } from '..';
import * as loginActions from '../../actions/login/login.actions';

/**
 * Login feature key
 */
export const loginFeatureKey = 'login';

/**
 * interface for login state
 */
export interface LoginState {
  /**
   * logged in user if exists
   */
  user: User;
  /**
   * logged in users token if exists
   */
  token: string;
}
/**
 * initial login state
 */
export const initialState: LoginState = {
  /**
   * Initial user a.k.a. no one
   */
  user: undefined,
  /**
   * Initial users token a.k.a. none
   */
  token: undefined
};

/**
 * Selector to retrieve token
 */
export const selectLoginState = createFeatureSelector<State, LoginState>(loginFeatureKey);

/**
 * selector to get login token
 */
export const selectLoginToken = createSelector(
  selectLoginState,
  (state: LoginState) => state.token
);
/**
 * selector to get logged in user
 */
export const selectLoggedUser = createSelector(
  selectLoginState,
  (state: LoginState) => state.user
);

/**
 * reducer method
 * @param state State to reduce
 * @param action Action to pick what to reduce
 */
export function reducer(state = initialState, action: loginActions.LoginActions): LoginState {
  switch (action.type) {
    case loginActions.LoginActionTypes.LoginSucceed:
      return {
        ...state,
        token: action.token,
        user: action.user
      };
    case loginActions.LoginActionTypes.LogOut:
      return {
        ...state,
        token: undefined,
        user: undefined
      };
    default:
      return state;
  }
}
