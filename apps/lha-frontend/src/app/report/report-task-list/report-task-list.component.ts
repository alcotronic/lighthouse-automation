import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportTaskListService } from './report-task-list.service';

@Component({
  selector: 'lha-app-report-task-list',
  templateUrl: './report-task-list.component.html',
  styleUrls: ['./report-task-list.component.scss'],
})
export class ReportTaskListComponent implements OnInit {
  reportTaskList: any;

  constructor(
    private reportTaskService: ReportTaskListService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.reportTaskService.getAllReportTasks().subscribe((result: any) => {
      this.reportTaskList = result;
    });
  }

  reportTypeName(reportType: string): string {
    if (reportType === 'MANUAL_REPORT') {
      return 'manual';
    } else {
      return 'scheduled';
    }
  }

  selectReportTask(reportTask: any) {
    console.info(reportTask._id);
    this.router.navigate(['/report-task/task/' + reportTask._id]);
  }
}
