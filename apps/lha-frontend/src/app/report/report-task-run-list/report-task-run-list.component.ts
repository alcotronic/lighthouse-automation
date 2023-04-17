import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportTaskRunListService } from './report-task-run-list.service';

@Component({
  selector: 'lha-app-report-task-run-list',
  templateUrl: './report-task-run-list.component.html',
  styleUrls: ['./report-task-run-list.component.scss']
})
export class ReportTaskRunListComponent implements OnInit {

  @Input()
  reportTaskId!: string;
  @Input()
  reportTaskRunList: any;

  constructor(private router: Router) { }

  ngOnInit() { }

  selectReportTaskRun(reportTaskRun: any) {
    console.info(reportTaskRun._id)
    this.router.navigate(['/report-task/task/'+this.reportTaskId+'/run/'+reportTaskRun._id]);
  }

}
