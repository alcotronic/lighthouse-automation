import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  AUTHENTICATION_FEATURE_KEY,
  AuthenticationState
} from './authentication.reducer';

// Lookup the 'Authentication' feature state managed by NgRx
export const selectAuthenticationState =
  createFeatureSelector<AuthenticationState>(AUTHENTICATION_FEATURE_KEY);

export const selectAuthenticationLoaded = createSelector(
  selectAuthenticationState,
  (state: AuthenticationState) => state.loaded
);

export const selectAuthenticationError = createSelector(
  selectAuthenticationState,
  (state: AuthenticationState) => state.error
);

export const selectAuthenticationAccessToken = createSelector(
  selectAuthenticationState,
  (state: AuthenticationState) => state.accessToken
);
