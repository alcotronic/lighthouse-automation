import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as TaskActions from './task.actions';
import { TaskEntity } from './task.models';
import { TaskDto } from '@lighthouse-automation/lha-common';

export const TASK_FEATURE_KEY = 'task';

export interface TaskState extends EntityState<TaskDto> {
  selectedId?: string | number; // which Task record has been selected
  loaded: boolean; // has the Task list been loaded
  error?: string | null; // last known error (if any)
}

export interface TaskPartialState {
  readonly [TASK_FEATURE_KEY]: TaskState;
}

export const taskAdapter: EntityAdapter<TaskDto> =
  createEntityAdapter<TaskDto>();

export const initialTaskState: TaskState = taskAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialTaskState,
  on(TaskActions.loadAllTasks, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(TaskActions.loadAllTasksSuccess, (state, { tasks }) =>
    taskAdapter.setAll(tasks, { ...state, loaded: true })
  ),
  on(TaskActions.loadAllTasksFailure, (state, { error }) => ({ ...state, error })),
  on(TaskActions.selectTask, (state, { taskId }) => ({
    ...state,
    selectedId: taskId,
    loaded: false,
    error: null,
  })),
);

export function taskReducer(state: TaskState | undefined, action: Action) {
  return reducer(state, action);
}
