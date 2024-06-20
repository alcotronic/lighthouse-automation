import { AuthenticationEntity } from '../authentication.models';
import {
  authenticationAdapter,
  AuthenticationPartialState,
  initialAuthenticationState,
} from './authentication.reducer';
import * as AuthenticationSelectors from './authentication.selectors';

describe('Authentication Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getAuthenticationId = (it: AuthenticationEntity) => it.id;
  const createAuthenticationEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as AuthenticationEntity);

  let state: AuthenticationPartialState;

  beforeEach(() => {
    state = {
      authentication: authenticationAdapter.setAll(
        [
          createAuthenticationEntity('PRODUCT-AAA'),
          createAuthenticationEntity('PRODUCT-BBB'),
          createAuthenticationEntity('PRODUCT-CCC'),
        ],
        {
          ...initialAuthenticationState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Authentication Selectors', () => {
    it('selectAllAuthentication() should return the list of Authentication', () => {
      const results = AuthenticationSelectors.selectAllAuthentication(state);
      const selId = getAuthenticationId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = AuthenticationSelectors.selectEntity(
        state
      ) as AuthenticationEntity;
      const selId = getAuthenticationId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectAuthenticationLoaded() should return the current "loaded" status', () => {
      const result = AuthenticationSelectors.selectAuthenticationLoaded(state);

      expect(result).toBe(true);
    });

    it('selectAuthenticationError() should return the current "error" state', () => {
      const result = AuthenticationSelectors.selectAuthenticationError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
