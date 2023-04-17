import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskExecutionDto } from '@lighthouse-automation/lha-common';
import { Observable } from 'rxjs';

@Injectable()
export class TaskExecutionService {
  taskExecutionUrl = '/api/task-execution';

  constructor(private readonly http: HttpClient) { }

  getTaskExecution(taskExecutionId: string): Observable<TaskExecutionDto> {
    return this.http.get<TaskExecutionDto>(this.taskExecutionUrl + '/id/' + taskExecutionId);
  }

  getAllTaskExecutionsByTaskId(taskId: string): Observable<TaskExecutionDto[]> {
    return this.http.get<TaskExecutionDto[]>(this.taskExecutionUrl + '/taskId/' + taskId);
  }
}
