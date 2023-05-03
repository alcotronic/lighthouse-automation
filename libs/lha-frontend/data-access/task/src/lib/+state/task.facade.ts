import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as TaskActions from './task.actions';
import * as TaskSelectors from './task.selectors';

@Injectable()
export class TaskFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(TaskSelectors.selectTaskLoaded));
  allTask$ = this.store.pipe(select(TaskSelectors.selectAllTask));
  selectedTask$ = this.store.pipe(select(TaskSelectors.selectEntity));

  loadAllTasks() {
    this.store.dispatch(TaskActions.loadAllTasks());
  }

  selectTask(taskId: string) {
    this.store.dispatch(TaskActions.selectTask({ taskId: taskId }));
  }

  clearSelectedTask() {
    this.store.dispatch(TaskActions.clearSelectedTask());
  }
}
