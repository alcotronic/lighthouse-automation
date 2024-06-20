import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import * as RoleActions from './role.actions';
import { RoleService } from '../service/role.service';
import { Role } from 'libs/common/src';

@Injectable()
export class RoleEffects {
  private actions$ = inject(Actions);

  loadRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.loadRoles),
      switchMap(() => {
        return this.roleService.getCurrentUserRoles().pipe(
          mergeMap((roles: Role[]) => {
            return of(RoleActions.loadRolesSuccess({ roles: roles }))
          })
        )
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(RoleActions.loadRolesFailure({ error }));
      })
    )
  );

  loadRolesSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.loadRolesSuccess),
      tap((loadRolesSuccess) => {
        console.log(loadRolesSuccess);
      })
    ), { dispatch: false }
  );

  loadRolesFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.loadRolesFailure),
      tap((error) => {
        console.error('Error', error);
      })
    ), { dispatch: false }
  );

  constructor(private roleService: RoleService) {}
}
