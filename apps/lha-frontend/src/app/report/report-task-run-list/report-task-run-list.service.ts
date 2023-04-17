import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportTaskRunListService {

  reportTaskRunAllUrl = '/api/report-task-run/by-task';

  constructor(private readonly http: HttpClient) { }

  getAllReportTaskRuns(reportTaskId: string) {
    return this.http.get(this.reportTaskRunAllUrl+'/'+reportTaskId);
  }

}
