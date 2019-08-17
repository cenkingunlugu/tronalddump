import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from 'src/app/services/user/user.service';
import { State } from '..';
import * as loginActions from '../../actions/login/login.actions';

export const loginFeatureKey = 'login';

export interface LoginState {
  user: User;
  token: string;
}

export const initialState: LoginState = {
  user: undefined,
  token: undefined
};

/**
 * Selector to retrieve token
 */
export const selectLoginState = createFeatureSelector<State, LoginState>(loginFeatureKey);

export const selectLoginToken = createSelector(
  selectLoginState,
  (state: LoginState) => state.token
);

export const selectLoggedUser = createSelector(
  selectLoginState,
  (state: LoginState) => state.user
);

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
