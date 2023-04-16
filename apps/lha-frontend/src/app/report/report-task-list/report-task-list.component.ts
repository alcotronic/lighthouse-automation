import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '@lighthouse-automation/lha-frontend/api/task';

@Component({
  selector: 'lha-app-report-task-list',
  templateUrl: './report-task-list.component.html',
  styleUrls: ['./report-task-list.component.scss'],
})
export class ReportTaskListComponent implements OnInit {
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
    this.router.navigate(['/report-task/task/' + task._id]);
  }
}
