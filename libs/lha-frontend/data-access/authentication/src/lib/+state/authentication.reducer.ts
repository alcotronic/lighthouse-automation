import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as AuthenticationActions from './authentication.actions';
import { Authentication } from '../authentication.models';

export const AUTHENTICATION_FEATURE_KEY = 'authentication';

export function tokenGetter() {
  const accessToken = localStorage.getItem('accessToken');
  if(accessToken !== null) {
    return accessToken
  } else {
    return undefined;
  }
}

export interface AuthenticationState {
  username?: string;
  accessToken?: string;
  loaded: boolean; // has the Authentication list been loaded
  error?: string | null; // last known error (if any)
}

export interface AuthenticationPartialState {
  readonly [AUTHENTICATION_FEATURE_KEY]: AuthenticationState;
}

export const authenticationAdapter: EntityAdapter<Authentication> =
  createEntityAdapter<Authentication>();

export const initialAuthenticationState: AuthenticationState = {
  accessToken: tokenGetter(),
  error: null,
  loaded: false,
}

const reducer = createReducer(
  initialAuthenticationState,
  on(AuthenticationActions.postLogin, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    AuthenticationActions.postLoginSuccess,
    (state, { username, accessToken }) =>
     ({ ...state, username: username, accessToken: accessToken, loaded: true })
  ),
  on(AuthenticationActions.postLoginFailure, (state, { error }) => ({
    ...state,
    error: error.message,
  })),
  on(
    AuthenticationActions.postLogoutSuccess,
    (state) => ({ ...state, username: undefined, accessToken: undefined, loaded: false })
  ),
  on(AuthenticationActions.postLogoutFailure, (state, { error }) => ({
    ...state,
    error: error.message,
  })),
);

export function authenticationReducer(
  state: AuthenticationState | undefined,
  action: Action
) {
  return reducer(state, action);
}
