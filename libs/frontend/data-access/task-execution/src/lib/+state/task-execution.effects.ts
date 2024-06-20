import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import * as TaskExecutionActions from './task-execution.actions';
import { TaskExecutionService } from '../service/task-ececution.service';
import { TaskExecutionDto } from 'libs/common/src';
import { selectAllTaskExecutions } from './task-execution.selectors';
import { Store } from '@ngrx/store';
import { TaskExecutionState } from './task-execution.reducer';

@Injectable()
export class TaskExecutionEffects {
  private actions$ = inject(Actions);

  loadTaskExecutionsByTaskId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskExecutionActions.loadTaskExecutionsByTaskId),
      switchMap((loadTaskExecutionsByTaskIdAction) => {
        console.log('Load TaskExecutions by TaskId', loadTaskExecutionsByTaskIdAction);
        return this.taskExecutionService
          .getAllTaskExecutionsByTaskId(loadTaskExecutionsByTaskIdAction.taskId)
          .pipe(
            mergeMap((taskExecutions: TaskExecutionDto[]) =>
              of(
                TaskExecutionActions.loadTaskExecutionsByTaskIdSuccess({
                  taskExecutions: taskExecutions,
                })
              )
            )
          );
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(
          TaskExecutionActions.loadTaskExecutionsByTaskIdFailure({ error })
        );
      })
    )
  );

  loadTaskExecutionsByTaskIdSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TaskExecutionActions.loadTaskExecutionsByTaskIdSuccess),
        tap((createTaskSuccessAction) => {
          console.log('Load TaskExecutions by TaskId Success', createTaskSuccessAction);
        })
      ),
    { dispatch: false }
  );

  loadTaskExecutionsByTaskIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TaskExecutionActions.loadTaskExecutionsByTaskIdFailure),
        tap((error) => {
          console.error('Load TaskExecutions by TaskId Failure', error);
        })
      ),
    { dispatch: false }
  );

  selectTaskExecution$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskExecutionActions.selectTaskExecution),
      switchMap((selectTaskExecutionAction) => {
        console.log('Select TaskExecution', selectTaskExecutionAction);
        if (selectTaskExecutionAction.taskExecutionId && !selectTaskExecutionAction.taskExecution) {
          return this.store.select(selectAllTaskExecutions).pipe(
            mergeMap((taskExecutions) => {
              const taskExecution = taskExecutions.find(
                (taskExecution) => taskExecution.id === selectTaskExecutionAction.taskExecutionId
              );
              if (taskExecution) {
                return of(TaskExecutionActions.selectTaskExecutionSuccess({ taskExecution: taskExecution }));
              } else if (selectTaskExecutionAction.taskExecutionId) {
                return this.taskExecutionService.getTaskExecution(selectTaskExecutionAction.taskExecutionId).pipe(
                  mergeMap((taskExecution) => {
                    return of(TaskExecutionActions.selectTaskExecutionSuccess({ taskExecution: taskExecution }));
                  })
                );
              } else {
                return of(
                  TaskExecutionActions.selectTaskExecutionFailure({
                    error: new Error('no-taskExecution-id-for-selection'),
                  })
                );
              }
            })
          );
        } else if (!selectTaskExecutionAction.taskExecutionId && selectTaskExecutionAction.taskExecution) {
          return of(
            TaskExecutionActions.selectTaskExecutionSuccess({ taskExecution: selectTaskExecutionAction.taskExecution })
          );
        } else {
          return of(
            TaskExecutionActions.selectTaskExecutionFailure({
              error: new Error('no-taskExecution-selected'),
            })
          );
        }
      }),
      catchError((error) => {
        return of(TaskExecutionActions.selectTaskExecutionFailure({ error }));
      })
    )
  );

  selectTaskExecutionSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TaskExecutionActions.selectTaskExecutionSuccess),
        tap((selectTaskExecutionSuccessAction) => {
          console.log('Select TaskExecution Success', selectTaskExecutionSuccessAction);
        })
      ),
    { dispatch: false }
  );

  selectTaskExecutionFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TaskExecutionActions.selectTaskExecutionFailure),
        tap((error) => {
          console.error('Select TaskExecution Error', error);
        })
      ),
    { dispatch: false }
  );

  clearSelectedTaskExecution$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TaskExecutionActions.clearSelectedTaskExecution),
        tap(() => {
          console.log('Clear select TaskExecution');
        })
      ),
    { dispatch: false }
  );

  constructor(private taskExecutionService: TaskExecutionService, private store: Store<TaskExecutionState>) {}
}
