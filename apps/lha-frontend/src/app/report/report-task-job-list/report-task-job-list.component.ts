import { Component, Input, OnInit } from '@angular/core';
import { ReportTaskJobListService } from './report-task-job-list.service';

@Component({
  selector: 'lha-app-report-task-job-list',
  templateUrl: './report-task-job-list.component.html',
  styleUrls: ['./report-task-job-list.component.scss']
})
export class ReportTaskJobListComponent implements OnInit {

  @Input()
  reportTaskRunId!: string;
  reportTaskJobList: any;

  constructor(
    private reportTaskJobListService: ReportTaskJobListService
  ) { }

  ngOnInit() {
    this.reportTaskJobListService.getJobsByTaskRun(this.reportTaskRunId).subscribe((result) => {
      this.reportTaskJobList = result;
    });
  }

}
