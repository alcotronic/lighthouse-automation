import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDto, TaskExecutionDto } from 'libs/common/src';
import { TaskFacade, TaskService } from '@lighthouse-automation/frontend/data-access/task';
import { TaskExecutionFacade, TaskExecutionService } from '@lighthouse-automation/frontend/data-access/task-execution';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'lha-frontend-feature-task-execution',
  templateUrl: './task-execution.component.html',
  styleUrls: ['./task-execution.component.scss'],
})
export class TaskExecutionComponent implements OnInit, OnDestroy {
  task?: TaskDto;
  taskExecution?: TaskExecutionDto;
  showUrls = true;
  showReports = true;

  unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private taskExecutionService: TaskExecutionService,
    private taskFacade: TaskFacade,
    private taskExecutionFacade: TaskExecutionFacade
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('taskId');
    const taskExecutionId = this.route.snapshot.paramMap.get('taskExecutionId');
    if (taskId) {
      this.taskFacade.selectedTask$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((task) => {
          this.task = task;
        });
      this.taskFacade.selectTask(taskId);
    }
    if (taskExecutionId) {
      this.taskExecutionFacade.selectedTaskExecution$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((taskExecution) => {
          this.taskExecution = taskExecution;
        });
      this.taskExecutionFacade.selectTaskExecution(taskExecutionId);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.taskExecutionFacade.clearSelectedTaskExecution();
  }

  toggleShowUrls() {
    if (this.showUrls) {
      this.showUrls = false;
    } else {
      this.showUrls = true;
    }
  }

  toggleShowReports() {
    if (this.showReports) {
      this.showReports = false;
    } else {
      this.showReports = true;
    }
  }
}
