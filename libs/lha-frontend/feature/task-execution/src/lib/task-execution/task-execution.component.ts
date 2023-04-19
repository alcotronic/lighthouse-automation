import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDto, TaskExecutionDto } from '@lighthouse-automation/lha-common';
import { TaskService } from '@lighthouse-automation/lha-frontend/api/task';
import { TaskExecutionService } from '@lighthouse-automation/lha-frontend/api/task-execution';

@Component({
  selector: 'lha-frontend-feature-task-execution',
  templateUrl: './task-execution.component.html',
  styleUrls: ['./task-execution.component.scss']
})
export class TaskExecutionComponent implements OnInit {

  task?: TaskDto;
  taskExecution?: TaskExecutionDto;
  showUrls = true;
  showReports = true;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private taskExecutionService: TaskExecutionService,
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('taskId');
    const taskExecutionId = this.route.snapshot.paramMap.get('taskExecutionId');
    if (!!taskId && !!taskExecutionId) {
      console.log(taskId);
      console.log(taskExecutionId);
      this.taskService.getTask(taskId).subscribe((result: TaskDto) => {
        this.task = result;
      });
      this.taskExecutionService
        .getTaskExecution(taskExecutionId)
        .subscribe((result: TaskExecutionDto) => {
          this.taskExecution = result;
        });
    }
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
