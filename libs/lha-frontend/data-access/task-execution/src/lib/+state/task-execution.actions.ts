import { createAction, props } from '@ngrx/store';
import { TaskExecutionDto } from '@lighthouse-automation/lha-common';

export const initTaskExecutions = createAction(
  '[TaskExecution Page] Init TaskExecutions'
);

export const loadTaskExecutionsByTaskId = createAction(
  '[TaskExecution/API] Load TaskExecutions by TaskId',
  props<{ taskId: string }>()
);

export const loadTaskExecutionsByTaskIdSuccess = createAction(
  '[TaskExecution/API] Load TaskExecutions by TaskId Success',
  props<{ taskExecutions: TaskExecutionDto[] }>()
);

export const loadTaskExecutionsByTaskIdFailure = createAction(
  '[TaskExecution/API] Load TaskExecutions by TaskId Failure',
  props<{ error: Error }>()
);

export const selectTaskExecution = createAction(
  '[TaskExecution/API] Select Task',
  props<{ taskExecutionId?: string, taskExecution?: TaskExecutionDto }>()
);

export const selectTaskExecutionSuccess = createAction(
  '[TaskExecution/API] Select TaskExecution Success',
  props<{taskExecution?: TaskExecutionDto }>()
);

export const selectTaskExecutionFailure = createAction(
  '[TaskExecution/API] Select TaskExecution Failure',
  props<{ error: Error }>()
);

export const clearSelectedTaskExecution = createAction(
  '[TaskExecution/API] Clear elected TaskExecution'
);
