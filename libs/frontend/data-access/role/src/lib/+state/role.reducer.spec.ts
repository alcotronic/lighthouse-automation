import { Action } from '@ngrx/store';

import * as RoleActions from './role.actions';
import { RoleEntity } from './role.models';
import { RoleState, initialRoleState, roleReducer } from './role.reducer';

describe('Role Reducer', () => {
  const createRoleEntity = (id: string, name = ''): RoleEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Role actions', () => {
    it('loadRoleSuccess should return the list of known Role', () => {
      const role = [
        createRoleEntity('PRODUCT-AAA'),
        createRoleEntity('PRODUCT-zzz'),
      ];
      const action = RoleActions.loadRoleSuccess({ role });

      const result: RoleState = roleReducer(initialRoleState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = roleReducer(initialRoleState, action);

      expect(result).toBe(initialRoleState);
    });
  });
});
