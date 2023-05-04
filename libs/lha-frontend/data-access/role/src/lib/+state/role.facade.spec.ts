import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import * as RoleActions from './role.actions';
import { RoleEffects } from './role.effects';
import { RoleFacade } from './role.facade';
import {
  ROLE_FEATURE_KEY,
  RoleState,
  initialRoleState,
  roleReducer,
} from './role.reducer';
import * as RoleSelectors from './role.selectors';

interface TestSchema {
  role: RoleState;
}

describe('RoleFacade', () => {
  let facade: RoleFacade;
  let store: Store<TestSchema>;
  // const createRoleEntity = (id: string, name = ''): RoleEntity => ({
  //   id,
  //   name: name || `name-${id}`,
  // });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(ROLE_FEATURE_KEY, roleReducer),
          EffectsModule.forFeature([RoleEffects]),
        ],
        providers: [RoleFacade],
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
      facade = TestBed.inject(RoleFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allRole$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allRole$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadRoleSuccess` to manually update list
     */
    it('allRole$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allRole$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      // store.dispatch(
      //   RoleActions.loadRoleSuccess({
      //     role: [createRoleEntity('AAA'), createRoleEntity('BBB')],
      //   })
      // );

      list = await readFirst(facade.allRole$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
