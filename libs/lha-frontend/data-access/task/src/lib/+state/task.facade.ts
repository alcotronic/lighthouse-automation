import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as TaskActions from './task.actions';
import * as TaskSelectors from './task.selectors';
import { TaskCreateDto, TaskDto } from '@lighthouse-automation/lha-common';

@Injectable()
export class TaskFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(TaskSelectors.selectTaskLoaded));
  allTask$ = this.store.pipe(select(TaskSelectors.selectAllTask));
  selectedTask$ = this.store.pipe(select(TaskSelectors.selectEntity));

  createTask(taskToCreate: TaskCreateDto) {
    this.store.dispatch(TaskActions.createTask({ taskToCreate: taskToCreate }));
  }

  loadAllTasks() {
    this.store.dispatch(TaskActions.loadAllTasks());
  }

  selectTask(taskId?: string, task?: TaskDto) {
    this.store.dispatch(TaskActions.selectTask({ taskId: taskId, task: task }));
  }

  clearSelectedTask() {
    this.store.dispatch(TaskActions.clearSelectedTask());
  }
}
