import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, mergeMap, tap } from 'rxjs/operators';
import * as TaskActions from './task.actions';
import { TaskService } from '../service/task.service';
import { TaskDto } from '@lighthouse-automation/lha-common';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTask),
      switchMap((createTaskAction) => {
        return this.taskService
          .createTask(createTaskAction.taskToCreate)
          .pipe(
            mergeMap((task: TaskDto) =>
              of(TaskActions.createTaskSuccess({ task: task }))
            )
          );
      }),
      catchError((error) => {
        return of(TaskActions.createTaskFailure({ error }));
      })
    )
  );

  createTaskSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTaskSuccess),
      tap((createTaskSuccessAction) => {
        console.log('Create Task success', createTaskSuccessAction);
      })
    ), { dispatch: false }
  );

  createTaskFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTaskFailure),
      tap((error) => {
        console.error('Create Task Error', error);
      })
    ), { dispatch: false }
  );

  selectTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.selectTask),
      tap((selectTaskAction) => {
        console.log('Select Task', selectTaskAction);
      })
    ), { dispatch: false }
  );

  clearSelectedTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.clearSelectedTask),
      tap(() => {
        console.log('Clear select Task');
      })
    ), { dispatch: false }
  );

  loadTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTask),
      switchMap((loadTaskAction) => {
        return this.taskService
          .getTask(loadTaskAction.taskId)
          .pipe(
            mergeMap((task: TaskDto) =>
              of(TaskActions.loadTaskSuccess({ task: task }))
            )
          );
      }),
      catchError((error) => {
        return of(TaskActions.loadTaskFailure({ error }));
      })
    )
  );

  loadTaskSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTaskSuccess),
      tap((loadTaskSuccessAction) => {
        console.log('Load Task success', loadTaskSuccessAction);
      })
    ), { dispatch: false }
  );

  loadTaskFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTaskFailure),
      tap((error) => {
        console.error('Load Task Error', error);
      })
    ), { dispatch: false }
  );

  loadAllTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadAllTasks),
      switchMap((loadAllTaskAction) => {
        return this.taskService
          .getAllTasks()
          .pipe(
            mergeMap((tasks: TaskDto[]) =>
              of(TaskActions.loadAllTasksSuccess({ tasks: tasks }))
            )
          );
      }),
      catchError((error) => {
        return of(TaskActions.loadAllTasksFailure({ error }));
      })
    )
  );

  loadAllTasksSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadAllTasksSuccess),
      tap((loadAllTaskSuccessAction) => {
        console.log('Load All Task success', loadAllTaskSuccessAction);
      })
    ), { dispatch: false }
  );

  loadAllTasksFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadAllTasksFailure),
      tap((error) => {
        console.error('Load All Tasks Error', error);
      })
    ), { dispatch: false }
  );

  constructor(private taskService: TaskService) {}
}
