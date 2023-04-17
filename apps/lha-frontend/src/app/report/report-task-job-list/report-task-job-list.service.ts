import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportTaskJobListService {

  reportTaskJobByTaskRunUrl = '/api/report-job/by-task-run';

  constructor(private readonly http: HttpClient) { }

  getJobsByTaskRun(reportTaskRunId: string) {
    return this.http.get(this.reportTaskJobByTaskRunUrl+'/'+reportTaskRunId);
  }
}
