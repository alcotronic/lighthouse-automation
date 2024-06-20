import { RoleEntity } from './role.models';
import {
  roleAdapter,
  RolePartialState,
  initialRoleState,
} from './role.reducer';
import * as RoleSelectors from './role.selectors';

describe('Role Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getRoleId = (it: RoleEntity) => it.id;
  const createRoleEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as RoleEntity);

  let state: RolePartialState;

  beforeEach(() => {
    state = {
      role: roleAdapter.setAll(
        [
          createRoleEntity('PRODUCT-AAA'),
          createRoleEntity('PRODUCT-BBB'),
          createRoleEntity('PRODUCT-CCC'),
        ],
        {
          ...initialRoleState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Role Selectors', () => {
    it('selectAllRole() should return the list of Role', () => {
      const results = RoleSelectors.selectAllRole(state);
      const selId = getRoleId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = RoleSelectors.selectEntity(state) as RoleEntity;
      const selId = getRoleId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectRoleLoaded() should return the current "loaded" status', () => {
      const result = RoleSelectors.selectRoleLoaded(state);

      expect(result).toBe(true);
    });

    it('selectRoleError() should return the current "error" state', () => {
      const result = RoleSelectors.selectRoleError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
