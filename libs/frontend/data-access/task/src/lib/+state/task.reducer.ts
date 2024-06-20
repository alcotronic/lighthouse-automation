import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as TaskActions from './task.actions';
import { TaskDto } from 'libs/common/src';

export const TASK_FEATURE_KEY = 'task';

export interface TaskState extends EntityState<TaskDto> {
  selected?: TaskDto;
  loaded: boolean;
  error?: string | null;
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
  on(TaskActions.createTaskFailure, (state, { error }) => ({
    ...state,
    error: error.message,
  })),
  on(TaskActions.selectTaskSuccess, (state, { task }) => ({
    ...state,
    selected: task ? task : undefined,
  })),
  on(TaskActions.selectTaskFailure, (state, { error }) => ({
    ...state,
    error: error.message,
  })),
  on(TaskActions.clearSelectedTask, (state) => ({
    ...state,
    selected: undefined,
  })),
  on(TaskActions.loadAllTasks, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(TaskActions.loadAllTasksSuccess, (state, { tasks }) =>
    taskAdapter.setAll(tasks, { ...state, loaded: true })
  ),
  on(TaskActions.loadAllTasksFailure, (state, { error }) => ({
    ...state,
    error: error.message,
  }))
);

export function taskReducer(state: TaskState | undefined, action: Action) {
  return reducer(state, action);
}
