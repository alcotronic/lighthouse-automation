import { Action } from '@ngrx/store';

import * as AuthenticationActions from './authentication.actions';
import { AuthenticationEntity } from '../authentication.models';
import {
  AuthenticationState,
  initialAuthenticationState,
  authenticationReducer,
} from './authentication.reducer';

describe('Authentication Reducer', () => {
  const createAuthenticationEntity = (
    id: string,
    name = ''
  ): AuthenticationEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Authentication actions', () => {
    it('loadAuthenticationSuccess should return the list of known Authentication', () => {
      const authentication = [
        createAuthenticationEntity('PRODUCT-AAA'),
        createAuthenticationEntity('PRODUCT-zzz'),
      ];
      const action = AuthenticationActions.loadAuthenticationSuccess({
        authentication,
      });

      const result: AuthenticationState = authenticationReducer(
        initialAuthenticationState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = authenticationReducer(initialAuthenticationState, action);

      expect(result).toBe(initialAuthenticationState);
    });
  });
});
