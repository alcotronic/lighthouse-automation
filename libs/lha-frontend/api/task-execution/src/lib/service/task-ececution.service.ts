import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskExecutionDto } from '@lighthouse-automation/lha-common';

@Injectable()
export class TaskExecutionService {
  taskUrl = '/api/task';

  constructor(private readonly http: HttpClient) { }

  createTaskExecution(taskCreateDto: TaskExecutionCreateDto) {
    return this.http.post(this.taskUrl + '/create', taskCreateDto);
  }

  getTaskExecution(taskId: string) {
    return this.http.get(this.taskUrl + '/' + taskId);
  }

  getAllTaskExecutions() {
    return this.http.get(this.taskUrl + '/tasks');
  }
}
