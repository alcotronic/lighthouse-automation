import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskCreateDto } from '@lighthouse-automation/lha-common';

@Injectable()
export class TaskService {
  taskUrl = '/api/task';

  constructor(private readonly http: HttpClient) { }

  createTask(taskCreateDto: TaskCreateDto) {
    return this.http.post(this.taskUrl + '/create', taskCreateDto);
  }

  getTask(taskId: string) {
    return this.http.get(this.taskUrl + '/' + taskId);
  }

  getAllTasks() {
    return this.http.get(this.taskUrl + '/tasks');
  }
}
