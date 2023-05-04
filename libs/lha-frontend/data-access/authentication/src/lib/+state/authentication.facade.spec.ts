import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import * as AuthenticationActions from './authentication.actions';
import { AuthenticationEffects } from './authentication.effects';
import { AuthenticationFacade } from './authentication.facade';
import {
  AUTHENTICATION_FEATURE_KEY,
  AuthenticationState,
  initialAuthenticationState,
  authenticationReducer,
} from './authentication.reducer';
import * as AuthenticationSelectors from './authentication.selectors';

interface TestSchema {
  authentication: AuthenticationState;
}

describe('AuthenticationFacade', () => {
  let facade: AuthenticationFacade;
  let store: Store<TestSchema>;
  // const createAuthenticationEntity = (id: string, name = ''): AuthenticationEntity => ({
  //   id,
  //   name: name || `name-${id}`,
  // });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(AUTHENTICATION_FEATURE_KEY, authenticationReducer),
          EffectsModule.forFeature([AuthenticationEffects]),
        ],
        providers: [AuthenticationFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(AuthenticationFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allAuthentication$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allAuthentication$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadAuthenticationSuccess` to manually update list
     */
    it('allAuthentication$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allAuthentication$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      // store.dispatch(
      //   AuthenticationActions.loadAuthenticationSuccess({
      //     authentication: [createAuthenticationEntity('AAA'), createAuthenticationEntity('BBB')],
      //   })
      // );

      list = await readFirst(facade.allAuthentication$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
