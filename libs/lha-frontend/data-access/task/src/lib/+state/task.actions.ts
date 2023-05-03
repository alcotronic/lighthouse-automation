import { createAction, props } from '@ngrx/store';
import { TaskEntity } from './task.models';
import { TaskCreateDto, TaskDto } from '@lighthouse-automation/lha-common';

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
  props<{ error: any }>()
);

export const selectTask = createAction(
  '[Task/API] Select Task',
  props<{ taskId: string }>()
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
  props<{ error: any }>()
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
  props<{ error: any }>()
);
