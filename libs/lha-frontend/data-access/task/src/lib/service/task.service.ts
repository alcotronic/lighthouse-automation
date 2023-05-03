import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskCreateDto, TaskDto } from '@lighthouse-automation/lha-common';
import { Observable } from 'rxjs';

@Injectable()
export class TaskService {
  taskUrl = '/api/task';

  constructor(private readonly http: HttpClient) {}

  createTask(taskCreateDto: TaskCreateDto): Observable<TaskDto> {
    return this.http.post<TaskDto>(this.taskUrl + '/create', taskCreateDto);
  }

  getTask(taskId: string): Observable<TaskDto> {
    return this.http.get<TaskDto>(this.taskUrl + '/id/' + taskId);
  }

  getAllTasks(): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(this.taskUrl + '/tasks');
  }
}
