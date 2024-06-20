import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { ReportDto } from 'libs/common/src';
import { ReportService } from '@lighthouse-automation/frontend/data-access/report';

@Component({
  selector: 'lha-frontend-feature-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  @Input()
  report!: ReportDto;
  showHtml = false;
  showJson = false;
  showCsv = false;

  reportHtml?: SafeHtml;
  reportJson?: string;
  reportCsv?: string;

  constructor(
    private reportService: ReportService,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    if (this.report._id) {
      this.reportService
        .getReportHtml(this.report._id)
        .subscribe((reportHtml) => {
          this.reportHtml = this.sanitizer.bypassSecurityTrustHtml(reportHtml);
        });
      this.reportService
        .getReportJson(this.report._id)
        .subscribe((reportJson) => {
          this.reportJson = reportJson;
        });
      this.reportService
        .getReportCsv(this.report._id)
        .subscribe((resultCsv) => {
          this.reportCsv = resultCsv;
        });
    }
  }

  toggleShowHtmlReport() {
    this.showJson = false;
    this.showCsv = false;
    this.showHtml = this.showHtml ? false : true;
  }

  toggleShowJsonReport() {
    this.showHtml = false;
    this.showCsv = false;
    this.showJson = this.showJson ? false : true;
  }

  toggleShowCsvReport() {
    this.showHtml = false;
    this.showJson = false;
    this.showCsv = this.showCsv ? false : true;
  }
}
