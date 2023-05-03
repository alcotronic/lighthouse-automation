import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as TaskExecutionActions from './task-execution.actions';
import { TaskExecutionDto } from '@lighthouse-automation/lha-common';

export const TASK_EXECUTION_FEATURE_KEY = 'taskExecution';

export interface TaskExecutionState extends EntityState<TaskExecutionDto> {
  selected?: TaskExecutionDto;
  loaded: boolean;
  error?: string | null;
}

export interface TaskExecutionPartialState {
  readonly [TASK_EXECUTION_FEATURE_KEY]: TaskExecutionState;
}

export const taskExecutionAdapter: EntityAdapter<TaskExecutionDto> =
  createEntityAdapter<TaskExecutionDto>();

export const initialTaskExecutionState: TaskExecutionState =
  taskExecutionAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialTaskExecutionState,
  on(TaskExecutionActions.loadTaskExecutionsByTaskId, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    TaskExecutionActions.loadTaskExecutionsByTaskIdSuccess,
    (state, { taskExecutions }) =>
      taskExecutionAdapter.setAll(taskExecutions, { ...state, loaded: true })
  ),
  on(TaskExecutionActions.loadTaskExecutionsByTaskIdFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(TaskExecutionActions.selectTaskExecutionSuccess, (state, { taskExecution }) => ({
    ...state,
    selected: taskExecution ? taskExecution : undefined,
  })),
  on(TaskExecutionActions.clearSelectedTaskExecution, (state) => ({
    ...state,
    selected: undefined,
  }))
);

export function taskExecutionReducer(
  state: TaskExecutionState | undefined,
  action: Action
) {
  return reducer(state, action);
}
