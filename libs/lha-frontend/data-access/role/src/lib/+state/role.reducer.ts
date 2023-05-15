import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as RoleActions from './role.actions';
import { Role } from '@lighthouse-automation/lha-common';

export const ROLE_FEATURE_KEY = 'role';

export interface RoleState {
  roles?: Role[]; // which Role record has been selected
  loaded: boolean; // has the Role list been loaded
  error?: string | null; // last known error (if any)
}

export interface RolePartialState {
  readonly [ROLE_FEATURE_KEY]: RoleState;
}

export const roleAdapter: EntityAdapter<Role[]> = createEntityAdapter<Role[]>();

export const initialRoleState: RoleState = {
  roles: undefined,
  loaded: false,
  error: null,
};

const reducer = createReducer(
  initialRoleState,
  on(RoleActions.clearRoles, (state) => ({
    roles: undefined,
    loaded: false,
    error: null,
  })),
  on(RoleActions.loadRoles, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(RoleActions.loadRolesSuccess, (state, { roles }) => ({
    ...state,
    roles: roles,
    loaded: true,
  })),
  on(RoleActions.loadRolesFailure, (state, { error }) => ({
    ...state,
    roles: undefined,
    error: error.message,
  }))
);

export function roleReducer(state: RoleState | undefined, action: Action) {
  return reducer(state, action);
}
