import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportTaskListService {

  reportTaskAllUrl = '/api/task/tasks';

  constructor(private readonly http: HttpClient) { }

  getAllReportTasks() {
    return this.http.get(this.reportTaskAllUrl);
  }

}
