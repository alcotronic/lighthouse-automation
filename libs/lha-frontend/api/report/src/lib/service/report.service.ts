import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskCreateDto, TaskDto } from '@lighthouse-automation/lha-common';
import { Observable } from 'rxjs';

@Injectable()
export class ReportService {
  reportUrl = '/api/report';

  constructor(private readonly http: HttpClient) { }

  getReportHtml(reportJobId: string) {
    const headers = new HttpHeaders();
    headers.append('ngsw-bypass', '');
    return this.http
      .get(this.reportUrl + '/html/' + reportJobId, {
        headers: headers,
      });
  }

  getReportJson(reportJobId: string) {
    const headers = new HttpHeaders();
    headers.append('ngsw-bypass', '');
    return this.http.get(this.reportUrl + '/json/' + reportJobId, {
      headers: headers,
    });
  }

  getReportCsv(reportJobId: string) {
    const headers = new HttpHeaders();
    headers.append('ngsw-bypass', '');
    return this.http.get(this.reportUrl + '/csv/' + reportJobId, {
      headers: headers,
    });
  }
}
