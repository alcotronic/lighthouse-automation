import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as TaskExecutionActions from './task-execution.actions';
import { TaskExecutionEffects } from './task-execution.effects';

describe('TaskExecutionEffects', () => {
  let actions: Observable<Action>;
  let effects: TaskExecutionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TaskExecutionEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(TaskExecutionEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: TaskExecutionActions.initTaskExecution() });

      const expected = hot('-a-|', {
        a: TaskExecutionActions.loadTaskExecutionSuccess({ taskExecution: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
