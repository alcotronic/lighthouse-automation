import { createAction, props } from '@ngrx/store';
import { TaskCreateDto, TaskDto } from 'libs/common/src';

export const createTask = createAction(
  '[Task/API] Create Task',
  props<{ taskToCreate: TaskCreateDto }>()
);

export const createTaskSuccess = createAction(
  '[Task/API] Create Task Success',
  props<{ task: TaskDto }>()
);

export const createTaskFailure = createAction(
  '[Task/API] Create Task Failure',
  props<{ error: Error }>()
);

export const selectTask = createAction(
  '[Task/API] Select Task',
  props<{ taskId?: string, task?: TaskDto }>()
);

export const selectTaskSuccess = createAction(
  '[Task/API] Select Task Success',
  props<{task?: TaskDto }>()
);

export const selectTaskFailure = createAction(
  '[Task/API] Select Task Failure',
  props<{ error: Error }>()
);

export const clearSelectedTask = createAction(
  '[Task/API] Clear elected Task'
);

export const loadTask = createAction(
  '[Task/API] Load Task',
  props<{ taskId: string }>()
);

export const loadTaskSuccess = createAction(
  '[Task/API] Load Task Success',
  props<{ task: TaskDto }>()
);

export const loadTaskFailure = createAction(
  '[Task/API] Load Task Failure',
  props<{ error: Error }>()
);

export const loadAllTasks = createAction(
  '[Task/API] Load all Tasks'
);

export const loadAllTasksSuccess = createAction(
  '[Task/API] Load all Tasks Success',
  props<{ tasks: TaskDto[] }>()
);

export const loadAllTasksFailure = createAction(
  '[Task/API] Load all Tasks Failure',
  props<{ error: Error }>()
);
