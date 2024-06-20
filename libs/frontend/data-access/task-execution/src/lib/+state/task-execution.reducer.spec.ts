import { Action } from '@ngrx/store';

import * as TaskExecutionActions from './task-execution.actions';
import { TaskExecutionEntity } from './task-execution.models';
import {
  TaskExecutionState,
  initialTaskExecutionState,
  taskExecutionReducer,
} from './task-execution.reducer';

describe('TaskExecution Reducer', () => {
  const createTaskExecutionEntity = (
    id: string,
    name = ''
  ): TaskExecutionEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid TaskExecution actions', () => {
    it('loadTaskExecutionSuccess should return the list of known TaskExecution', () => {
      const taskExecution = [
        createTaskExecutionEntity('PRODUCT-AAA'),
        createTaskExecutionEntity('PRODUCT-zzz'),
      ];
      const action = TaskExecutionActions.loadTaskExecutionSuccess({
        taskExecution,
      });

      const result: TaskExecutionState = taskExecutionReducer(
        initialTaskExecutionState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = taskExecutionReducer(initialTaskExecutionState, action);

      expect(result).toBe(initialTaskExecutionState);
    });
  });
});
