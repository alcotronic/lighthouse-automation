import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as TaskActions from './task.actions';
import * as TaskFeature from './task.reducer';
import * as TaskSelectors from './task.selectors';
import { TaskDto } from '@lighthouse-automation/lha-common';

@Injectable()
export class TaskFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
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
