import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportTaskService {

  reportTaskUrl = '/api/task';

  constructor(private readonly http: HttpClient) { }

  getReportTask(reportTaskId: string) {
    return this.http.get(this.reportTaskUrl+'/'+reportTaskId);
  }

}
