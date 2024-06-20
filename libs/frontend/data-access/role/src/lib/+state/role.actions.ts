import { createAction, props } from '@ngrx/store';
import { Role } from 'libs/common/src';

export const clearRoles = createAction('[Role/API] Clear Roles');

export const loadRoles = createAction('[Role/API] Load Roles');

export const loadRolesSuccess = createAction(
  '[Role/API] Load Role Success',
  props<{ roles: Role[] }>()
);

export const loadRolesFailure = createAction(
  '[Role/API] Load Role Failure',
  props<{ error: Error }>()
);
