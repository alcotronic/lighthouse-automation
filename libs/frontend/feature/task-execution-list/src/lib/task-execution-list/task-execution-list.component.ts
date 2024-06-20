import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskDto, TaskExecutionDto } from 'libs/common/src';
import { TaskExecutionFacade } from '@lighthouse-automation/frontend/data-access/task-execution';
import { Subject } from 'rxjs';

@Component({
  selector: 'lha-frontend-feature-task-execution-list',
  templateUrl: './task-execution-list.component.html',
  styleUrls: ['./task-execution-list.component.scss'],
})
export class TaskExecutionListComponent implements OnInit, OnDestroy {
  @Input()
  task!: TaskDto;
  taskExecutionList?: TaskExecutionDto[];
  unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private taskExecutionFacade: TaskExecutionFacade
  ) {}

  ngOnInit() {
    this.taskExecutionFacade.allTaskExecutions$.subscribe((taskExecutions: TaskExecutionDto[]) => {
      this.taskExecutionList = taskExecutions;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selectTaskExecution(taskExecution: TaskExecutionDto) {
    console.log(taskExecution.id);
    this.router.navigate([
      '/task/' + this.task.id + '/execution/' + taskExecution.id,
    ]);
  }
}
