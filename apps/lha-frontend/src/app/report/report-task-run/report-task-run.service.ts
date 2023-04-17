import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportTaskRunService {
  reportTaskRunByIdUrl = 'api/report-task-run/by-id';

  constructor(private readonly http: HttpClient) {}

  getTaskRun(reportTaskRunId: string) {
    return this.http.get(this.reportTaskRunByIdUrl + '/' + reportTaskRunId);
  }
}
