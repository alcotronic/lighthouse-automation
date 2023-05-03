import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as TaskExecutionActions from './task-execution.actions';
import * as TaskExecutionSelectors from './task-execution.selectors';

@Injectable()
export class TaskExecutionFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(
    select(TaskExecutionSelectors.selectTaskExecutionLoaded)
  );
  allTaskExecutions$ = this.store.pipe(
    select(TaskExecutionSelectors.selectAllTaskExecutions)
  );
  selectedTaskExecution$ = this.store.pipe(
    select(TaskExecutionSelectors.selectedEntity)
  );

  loadTaskExecutionsByTaskId(taskId: string) {
    this.store.dispatch(TaskExecutionActions.loadTaskExecutionsByTaskId({ taskId: taskId }));
  }

  selectTaskExecution(taskExecutionId: string) {
    this.store.dispatch(TaskExecutionActions.selectTaskExecution({taskExecutionId: taskExecutionId}));
  }

  clearSelectedTaskExecution() {
    this.store.dispatch(TaskExecutionActions.clearSelectedTaskExecution());
  }
}
