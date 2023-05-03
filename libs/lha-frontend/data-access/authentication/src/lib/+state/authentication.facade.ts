import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as AuthenticationActions from './authentication.actions';
import * as AuthenticationSelectors from './authentication.selectors';

@Injectable()
export class AuthenticationFacade {
  private readonly store = inject(Store);

  selectAuthenticationLoaded$ = this.store.pipe(select(AuthenticationSelectors.selectAuthenticationLoaded));
  selectAuthenticationError$ = this.store.pipe(select(AuthenticationSelectors.selectAuthenticationError));
  selectAuthenticationAccessToken$ = this.store.pipe(select(AuthenticationSelectors.selectAuthenticationAccessToken));

  postLogin(username: string, password: string) {
    this.store.dispatch(AuthenticationActions.postLogin({ username: username, password: password }));
  }

  postLogout() {
    this.store.dispatch(AuthenticationActions.postLogout());
  }
}
