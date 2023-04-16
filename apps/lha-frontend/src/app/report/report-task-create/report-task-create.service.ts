import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportTaskCreateDto } from './report-task-create';

@Injectable({
  providedIn: 'root'
})
export class ReportTaskCreateService {

  taskCreateUrl = '/api/report-task/create';

  constructor(private httpClient: HttpClient) { }

  submitTaskCreate(reportTaskCreateDto: ReportTaskCreateDto) {
    return this.httpClient.post(this.taskCreateUrl, reportTaskCreateDto);
  }
}
