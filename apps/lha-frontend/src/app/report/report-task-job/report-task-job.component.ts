import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl, SafeHtml } from '@angular/platform-browser';
import { ReportTaskJobService } from './report-task-job.service';

@Component({
  selector: 'lha-app-report-task-job',
  templateUrl: './report-task-job.component.html',
  styleUrls: ['./report-task-job.component.scss'],
})
export class ReportTaskJobComponent implements OnInit {
  @Input()
  reportTaskJob: any;
  showHtml = false;
  showJson = false;

  reportHtml: SafeHtml | undefined;
  reportJson: SafeUrl | undefined;
  reportCsv: SafeUrl | undefined;

  reportHtmlUrl: SafeUrl | undefined;
  reportJsonUrl: SafeUrl | undefined;
  reportCsvUrl: SafeUrl | undefined;

  constructor(
    private reportTasJobService: ReportTaskJobService,
    private sanitizer: DomSanitizer,
  ) {}

  async ngOnInit() {
    this.reportHtmlUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      '/api/report-lighthouse/html/' + this.reportTaskJob._id,
    );
    this.reportJsonUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      '/api/report-lighthouse/json/' + this.reportTaskJob._id,
    );
    this.reportCsvUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      '/api/report-lighthouse/csv/' + this.reportTaskJob._id,
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
