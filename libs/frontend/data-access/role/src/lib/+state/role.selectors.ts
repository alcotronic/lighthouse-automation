import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ROLE_FEATURE_KEY, RoleState } from './role.reducer';

// Lookup the 'Role' feature state managed by NgRx
export const selectRoleState =
  createFeatureSelector<RoleState>(ROLE_FEATURE_KEY);

export const selectRoleLoaded = createSelector(
  selectRoleState,
  (state: RoleState) => state.loaded
);

export const selectRoleError = createSelector(
  selectRoleState,
  (state: RoleState) => state.error
);

export const selectAllRoles = createSelector(
  selectRoleState,
  (state: RoleState) => state.roles
);
