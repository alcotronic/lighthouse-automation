import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as AuthenticationActions from './authentication.actions';
import { AuthenticationEffects } from './authentication.effects';
import { AuthenticationService } from '../service/authentication.service';
import { HttpClientModule } from '@angular/common/http';

describe('AuthenticationEffects', () => {
  let actions: Observable<Action>;
  let effects: AuthenticationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        AuthenticationEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        AuthenticationService
      ],
    });

    effects = TestBed.inject(AuthenticationEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: AuthenticationActions.postLogin({loginDto: { username: 'test', password: 'test'}}) });

      const expected = hot('-a-|', {
        a: AuthenticationActions.postLoginSuccess({
          accessToken: '',
        }),
      });

      expect(effects.postLogin$).toBeObservable(expected);
    });
  });
});
