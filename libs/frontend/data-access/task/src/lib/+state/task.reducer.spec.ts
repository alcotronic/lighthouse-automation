import { Action } from '@ngrx/store';

import * as TaskActions from './task.actions';
import { TaskEntity } from './task.models';
import { TaskState, initialTaskState, taskReducer } from './task.reducer';

describe('Task Reducer', () => {
  const createTaskEntity = (id: string, name = ''): TaskEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Task actions', () => {
    it('loadTaskSuccess should return the list of known Task', () => {
      const task = [
        createTaskEntity('PRODUCT-AAA'),
        createTaskEntity('PRODUCT-zzz'),
      ];
      const action = TaskActions.loadTaskSuccess({ task });

      const result: TaskState = taskReducer(initialTaskState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = taskReducer(initialTaskState, action);

      expect(result).toBe(initialTaskState);
    });
  });
});
