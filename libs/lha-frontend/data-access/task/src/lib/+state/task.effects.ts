import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, mergeMap, tap, map } from 'rxjs/operators';
import * as TaskActions from './task.actions';
import { TaskService } from '../service/task.service';
import { TaskDto } from '@lighthouse-automation/lha-common';
import { Router } from '@angular/router';
import { TaskState } from './task.reducer';
import { Store } from '@ngrx/store';
import { selectAllTask } from './task.selectors';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTask),
      switchMap((createTaskAction) => {
        console.log('Create Task', createTaskAction);
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
        if (createTaskSuccessAction.task.id) {
          this.router.navigate(['/task/' + createTaskSuccessAction.task.id]);
        }
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
      switchMap((selectTaskAction) => {
        console.log('Select Task', selectTaskAction);
        if (selectTaskAction.taskId && !selectTaskAction.task) {
          return this.store.select(selectAllTask).pipe(mergeMap((tasks) => {
            const task = tasks.find((task) => task.id === selectTaskAction.taskId);
            if( task )  {
              return of(TaskActions.selectTaskSuccess({task: task}))
            } else if(selectTaskAction.taskId) {
              return this.taskService.getTask(selectTaskAction.taskId).pipe(mergeMap((task) => {
                return of(TaskActions.selectTaskSuccess({task: task}));
              }))
            } else {
              return of(TaskActions.selectTaskFailure({error: new Error('no-task-id-for-selection')}));
            }
          }))
        } else if (!selectTaskAction.taskId && selectTaskAction.task) {
          return of(TaskActions.selectTaskSuccess({task: selectTaskAction.task}));
        } else {
          return of(TaskActions.selectTaskFailure({error: new Error('no-task-selected')}))
        }
      }),
      catchError((error) => {
        return of(TaskActions.createTaskFailure({ error }));
      })
    )
  );

  selectTaskSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.selectTaskSuccess),
      tap((selectTaskSuccessAction) => {
        console.log('Select Task Success', selectTaskSuccessAction);
      })
    ), { dispatch: false }
  );

  selectTaskFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.selectTaskFailure),
      tap((error) => {
        console.error('Select Task Error', error);
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

  constructor(private router: Router, private taskService: TaskService, private store: Store<TaskState>) {}
}
