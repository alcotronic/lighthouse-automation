import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl, SafeHtml } from '@angular/platform-browser';

import { ReportDto } from '@lighthouse-automation/lha-common';
import { ReportService } from '@lighthouse-automation/lha-frontend/api/report';

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

  reportHtml: SafeHtml | undefined;
  reportJson: SafeUrl | undefined;
  reportCsv: SafeUrl | undefined;

  reportHtmlUrl: SafeUrl | undefined;
  reportJsonUrl: SafeUrl | undefined;
  reportCsvUrl: SafeUrl | undefined;

  constructor(
    private reportService: ReportService,
    private sanitizer: DomSanitizer,
  ) {}

  async ngOnInit() {
    this.reportHtmlUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      '/api/report/html/' + this.report._id,
    );
    this.reportJsonUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      '/api/report/json/' + this.report._id,
    );
    this.reportCsvUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      '/api/report/csv/' + this.report._id,
    );
  }

  toggleShowHtmlReport() {
    if (this.showHtml === false) {
      this.showHtml = true;
    } else {
      this.showHtml = false;
    }
    this.showJson = false;
  }

  toggleShowJsonReport() {
    this.showHtml = false;
    if (this.showJson === false) {
      this.showJson = true;
    } else {
      this.showJson = false;
    }
  }
}
