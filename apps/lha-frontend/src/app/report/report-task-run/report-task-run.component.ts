import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportTaskService } from '../report-task/report-task.service';
import { ReportTaskRunService } from './report-task-run.service';

@Component({
  selector: 'lha-app-report-task-run',
  templateUrl: './report-task-run.component.html',
  styleUrls: ['./report-task-run.component.scss']
})
export class ReportTaskRunComponent implements OnInit {

  reportTask: any;
  reportTaskRun: any;
  reportTaskJobList: any;
  showUrls = true;
  showJobs = true;

  constructor(
    private route: ActivatedRoute,
    private reportTaskService: ReportTaskService,
    private reportTaskRunService: ReportTaskRunService,
  ) {}

  ngOnInit() {
    const reportTaskId = this.route.snapshot.paramMap.get('taskId');
    const reportTaskRunId = this.route.snapshot.paramMap.get('runId');
    if (!!reportTaskId && !!reportTaskRunId) {
      console.info(reportTaskId);
      console.info(reportTaskRunId);
      this.reportTaskService.getReportTask(reportTaskId).subscribe((result) => {
        this.reportTask = result;
      });
      this.reportTaskRunService
        .getTaskRun(reportTaskRunId)
        .subscribe((result) => {
          this.reportTaskRun = result;
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

  toggleShowJobs() {
    if (this.showJobs) {
      this.showJobs = false;
    } else {
      this.showJobs = true;
    }
  }
}
