import { Component, Input, OnInit } from '@angular/core';
import { ReportTaskJobListService } from './report-task-job-list.service';

@Component({
  selector: 'lha-app-report-task-job-list',
  templateUrl: './report-task-job-list.component.html',
  styleUrls: ['./report-task-job-list.component.scss']
})
export class ReportTaskJobListComponent implements OnInit {

  @Input()
  taskRunId!: string;
  taskJobList: any;

  constructor(
    private taskJobListService: ReportTaskJobListService
  ) { }

  ngOnInit() {
    this.taskJobListService.getJobsByTaskRun(this.taskRunId).subscribe((result) => {
      this.taskJobList = result;
    });
  }

}
