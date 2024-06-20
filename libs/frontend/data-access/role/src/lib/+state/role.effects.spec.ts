import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as RoleActions from './role.actions';
import { RoleEffects } from './role.effects';

describe('RoleEffects', () => {
  let actions: Observable<Action>;
  let effects: RoleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        RoleEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(RoleEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: RoleActions.initRole() });

      const expected = hot('-a-|', {
        a: RoleActions.loadRoleSuccess({ role: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
