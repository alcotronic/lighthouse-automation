import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TASK_FEATURE_KEY, TaskState, taskAdapter } from './task.reducer';

// Lookup the 'Task' feature state managed by NgRx
export const selectTaskState =
  createFeatureSelector<TaskState>(TASK_FEATURE_KEY);

const { selectAll, selectEntities } = taskAdapter.getSelectors();

export const selectTaskLoaded = createSelector(
  selectTaskState,
  (state: TaskState) => state.loaded
);

export const selectTaskError = createSelector(
  selectTaskState,
  (state: TaskState) => state.error
);

export const selectAllTasks = createSelector(
  selectTaskState,
  (state: TaskState) => selectAll(state)
);

export const selectTaskEntities = createSelector(
  selectTaskState,
  (state: TaskState) => selectEntities(state)
);

export const selectedEntity = createSelector(
  selectTaskState,
  (state: TaskState) => state.selected
);
