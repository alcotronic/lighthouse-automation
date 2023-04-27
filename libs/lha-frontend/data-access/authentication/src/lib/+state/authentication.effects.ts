import { Injectable, OnDestroy, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Subject, of } from 'rxjs';
import { switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import * as AuthenticationActions from './authentication.actions';
import { AuthenticationService } from '../service/authentication.service';
import { LoginResultDto, LogoutResultDto } from '../authentication.models';
import { Store } from '@ngrx/store';
import { RoleState, clearRoles, loadRoles } from '@lighthouse-automation/lha-frontend/data-access/role';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationEffects implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private actions$ = inject(Actions);

  postLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.postLogin),
      switchMap((postLoginAction) => {
        return this.authenticationService
          .postLogin(
            postLoginAction.loginDto.username,
            postLoginAction.loginDto.password
          )
          .pipe(mergeMap((loginResult: LoginResultDto) => {
            if (loginResult.username && loginResult.accessToken) {
              return of(AuthenticationActions.postLoginSuccess({username: loginResult.username, accessToken: loginResult.accessToken}));
            } else {
              return of(AuthenticationActions.postLoginFailure({ error: new Error('no-access-token') }));
            }
          }));
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(AuthenticationActions.postLoginFailure({ error }));
      })
    )
  );

  postLoginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.postLoginSuccess),
      tap((postLoginSuccessAction) => {
        this.authenticationService.setAccessToken(postLoginSuccessAction.accessToken);
        this.storeRole.dispatch(loadRoles());
        this.router.navigate(['task/list']);
      })
    ), { dispatch: false }
  );

  postLoginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.postLoginFailure),
      tap((error) => {
        console.error('Error', error);
        this.authenticationService.removeAccessToken();
        this.storeRole.dispatch(clearRoles());
      })
    ), { dispatch: false }
  );

  postLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.postLogout),
      switchMap(() => {
        return this.authenticationService
          .getLogout()
          .pipe(mergeMap((logoutResult: LogoutResultDto) => {
            if (logoutResult.success) {
              return of(AuthenticationActions.postLogoutSuccess({success: logoutResult.success}));
            } else {
              return of(AuthenticationActions.postLogoutFailure({ error: new Error('no-logout-success') }));
            }
          }));
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(AuthenticationActions.postLogoutFailure({ error }));
      })
    )
  );

  postLogoutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.postLogoutSuccess),
      tap((postLogoutSuccessAction) => {
        console.log(postLogoutSuccessAction);
        this.authenticationService.removeAccessToken();
        this.storeRole.dispatch(clearRoles());
        this.router.navigate(['']);
      })
    ), { dispatch: false }
  );

  postLogoutFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.postLogoutFailure),
      tap((error) => {
        console.error('Error', error);
        this.authenticationService.removeAccessToken();
        this.storeRole.dispatch(clearRoles());
        this.router.navigate(['']);
      })
    ), { dispatch: false }
  );

  constructor(private router: Router,private storeRole: Store<RoleState>, private authenticationService: AuthenticationService) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
