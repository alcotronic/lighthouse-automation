import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as RoleActions from './role.actions';
import * as RoleSelectors from './role.selectors';

@Injectable()
export class RoleFacade {
  private readonly store = inject(Store);

  selectRoleLoaded$ = this.store.pipe(select(RoleSelectors.selectRoleLoaded));
  selectRoleError$ = this.store.pipe(select(RoleSelectors.selectRoleError));
  selectAllRoles$ = this.store.pipe(select(RoleSelectors.selectAllRoles));

  loadRoles() {
    this.store.dispatch(RoleActions.loadRoles());
  }

  clearRoles() {
    this.store.dispatch(RoleActions.clearRoles());
  }
}
