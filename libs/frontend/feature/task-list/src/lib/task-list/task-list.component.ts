import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskDto } from 'libs/common/src';
import {
  TaskFacade
} from '@lighthouse-automation/frontend/data-access/task';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'lha-frontend-feature-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  taskList: any;
  unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private taskFacade: TaskFacade
  ) {}

  ngOnInit() {
    this.taskFacade.allTasks$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((tasks: TaskDto[]) => {
        this.taskList = tasks;
      });
    this.taskFacade.loadAllTasks();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  taskTypeName(reportType: string): string {
    if (reportType === 'MANUAL_REPORT') {
      return 'manual';
    } else {
      return 'scheduled';
    }
  }

  selectTask(task: TaskDto) {
    console.log(task.id);
    this.router.navigate(['/task/' + task.id]);
  }
}
