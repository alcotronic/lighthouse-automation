import { Component, Input, OnInit } from '@angular/core';
import { ReportDto } from '@lighthouse-automation/lha-common';
import { ReportService } from '@lighthouse-automation/lha-frontend/data-access/report';

@Component({
  selector: 'lha-frontend-feature-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
})
export class ReportListComponent implements OnInit {
  @Input()
  taskExecutionId!: string;
  reportList?: ReportDto[];

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.reportService
      .getReportsByTaskExecutionId(this.taskExecutionId)
      .subscribe((result) => {
        this.reportList = result;
      });
  }
}
