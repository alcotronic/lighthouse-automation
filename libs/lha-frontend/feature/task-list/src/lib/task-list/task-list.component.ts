import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '@lighthouse-automation/lha-frontend/api/task';

@Component({
  selector: 'lha-frontend-feature-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  taskList: any;

  constructor(
    private taskService: TaskService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.taskService.getAllTasks().subscribe((result: any) => {
      this.taskList = result;
    });
  }

  reportTypeName(reportType: string): string {
    if (reportType === 'MANUAL_REPORT') {
      return 'manual';
    } else {
      return 'scheduled';
    }
  }

  selectReportTask(task: any) {
    console.log(task._id);
    this.router.navigate(['/task/task/' + task._id]);
  }
}