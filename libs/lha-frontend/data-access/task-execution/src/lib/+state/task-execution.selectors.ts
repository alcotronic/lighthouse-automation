import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  TASK_EXECUTION_FEATURE_KEY,
  TaskExecutionState,
  taskExecutionAdapter,
} from './task-execution.reducer';

// Lookup the 'TaskExecution' feature state managed by NgRx
export const selectTaskExecutionState =
  createFeatureSelector<TaskExecutionState>(TASK_EXECUTION_FEATURE_KEY);

const { selectAll, selectEntities } = taskExecutionAdapter.getSelectors();

export const selectTaskExecutionLoaded = createSelector(
  selectTaskExecutionState,
  (state: TaskExecutionState) => state.loaded
);

export const selectTaskExecutionError = createSelector(
  selectTaskExecutionState,
  (state: TaskExecutionState) => state.error
);

export const selectAllTaskExecutions = createSelector(
  selectTaskExecutionState,
  (state: TaskExecutionState) => selectAll(state)
);

export const selectTaskExecutionEntities = createSelector(
  selectTaskExecutionState,
  (state: TaskExecutionState) => selectEntities(state)
);

export const selectedEntity = createSelector(
  selectTaskExecutionState,
  (state: TaskExecutionState) => state.selected
);
