import { Injectable, OnDestroy, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Subject, of } from 'rxjs';
import { switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import * as AuthenticationActions from './authentication.actions';
import * as AuthenticationFeature from './authentication.reducer';
import { AuthenticationService } from '../service/authentication.service';
import { LoginResultDto, LogoutResultDto } from '../authentication.models';

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
            if (loginResult.access_token) {
              return of(AuthenticationActions.postLoginSuccess({accessToken: loginResult.access_token}));
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
        console.log('postLoginSuccess$');
        console.log(postLoginSuccessAction);
        this.authenticationService.setAccessToken(postLoginSuccessAction.accessToken);
      })
    ), { dispatch: false }
  );

  postLoginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.postLoginFailure),
      tap((error) => {
        console.log('postLoginFailure$');
        console.log(error);
        this.authenticationService.removeAccessToken();
      })
    ), { dispatch: false }
  );

  postLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.postLogout),
      switchMap((postLogoutAction) => {
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
        return of(AuthenticationActions.postLoginFailure({ error }));
      })
    )
  );

  postLogoutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.postLogoutSuccess),
      tap((postLogoutSuccessAction) => {
        console.log('postLogoutSuccess$');
        console.log(postLogoutSuccessAction);
        this.authenticationService.removeAccessToken();
      })
    ), { dispatch: false }
  );

  postLogoutFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.postLogoutFailure),
      tap((error) => {
        console.log('postLogoutFailure$');
        console.log(error);
        this.authenticationService.removeAccessToken();
      })
    ), { dispatch: false }
  );

  constructor(private authenticationService: AuthenticationService) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
