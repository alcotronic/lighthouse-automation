import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportTaskJobService {
  reportHtmlUrl = '/api/report-lighthouse/html';
  reportJsonUrl = '/api/report-lighthouse/json';
  reportCsvUrl = '/api/report-lighthouse/csv';

  constructor(private readonly http: HttpClient) {}

  getReportHtml(reportJobId: string) {
    const headers = new HttpHeaders();
    headers.append('ngsw-bypass', '');
    return this.http
      .get(this.reportHtmlUrl + '/' + reportJobId, {
        headers: headers,
      })
      .toPromise();
  }

  getReportJson(reportJobId: string) {
    const headers = new HttpHeaders();
    headers.append('ngsw-bypass', '');
    return this.http.get(this.reportJsonUrl + '/' + reportJobId, {
      headers: headers,
    });
  }

  getReportCsv(reportJobId: string) {
    const headers = new HttpHeaders();
    headers.append('ngsw-bypass', '');
    return this.http.get(this.reportCsvUrl + '/' + reportJobId, {
      headers: headers,
    });
  }
}
