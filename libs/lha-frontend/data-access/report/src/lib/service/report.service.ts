import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportDto } from '@lighthouse-automation/lha-common';
import { Observable } from 'rxjs';

@Injectable()
export class ReportService {
  reportUrl = '/api/report';

  constructor(private readonly http: HttpClient) {}

  getReportsByTaskExecutionId(
    taskExecutionId: string
  ): Observable<ReportDto[]> {
    return this.http.get<ReportDto[]>(
      this.reportUrl + '/byTaskExecutionId/' + taskExecutionId
    );
  }

  getReportHtml(reportId: string) {
    return this.http.get(this.reportUrl + '/html/' + reportId, {
      responseType: 'text',
    });
  }

  getReportJson(reportId: string) {
    return this.http.get(this.reportUrl + '/json/' + reportId, {
      responseType: 'text',
    });
  }

  getReportCsv(reportId: string) {
    return this.http.get(this.reportUrl + '/csv/' + reportId, {
      responseType: 'text',
    });
  }
}
