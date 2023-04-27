import { createAction, props } from '@ngrx/store';
import { LoginDto, LoginResultDto } from '../authentication.models';

export const postLogin = createAction(
  '[Authentication/API] Post Login',
  props<{ loginDto: LoginDto }>()
);

export const postLoginSuccess = createAction(
  '[Authentication/API] Post Login Success',
  props<{ username: string, accessToken: string }>()
);

export const postLoginFailure = createAction(
  '[Authentication/API] Post Login Failure',
  props<{ error: any }>()
);

export const postLogout = createAction(
  '[Authentication/API] Post Logout',
);

export const postLogoutSuccess = createAction(
  '[Authentication/API] Post Logout Success',
  props<{ success: boolean }>()
);

export const postLogoutFailure = createAction(
  '[Authentication/API] Post Logout Failure',
  props<{ error: any }>()
);
