import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map, of } from 'rxjs';
import { Task } from '../schema/task';
import { TaskDto } from '@lighthouse-automation/lha-common';

export interface Response<TaskDto>{
  tasks: TaskDto[]
}

// @Injectable()
// export class TaskInterceptor implements NestInterceptor<Task, Response<TaskDto>> {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<Response<TaskDto>> {
//     return next.handle().pipe(map((tasks: Task[]) => {
//       const taskDtos: TaskDto[] = [];
//       tasks.forEach((task) => {
//         taskDtos.push(task as TaskDto);
//       })
//       return { tasks: taskDtos };
//     }));
//   }
// }

function convertToDto(task: Task):TaskDto {
  return {
    id: task.id,
    name: task.name,
    taskType: task.taskType,
    taskInterval: task.taskInterval,
    enabled: task.enabled,
    urlList: task.urlList,
    countDesktop: task.countDesktop,
    performanceScoreDesktop: task.performanceScoreDesktop,
    accessibilityScoreDesktop: task.accessibilityScoreDesktop,
    bestPracticeScoreDesktop: task.bestPracticeScoreDesktop,
    pwaScoreDesktop: task.pwaScoreDesktop,
    seoScoreDesktop: task.seoScoreDesktop,
    countMobile: task.countMobile,
    performanceScoreMobile: task.performanceScoreMobile,
    accessibilityScoreMobile: task.accessibilityScoreMobile,
    bestPracticeScoreMobile: task.bestPracticeScoreMobile,
    pwaScoreMobile: task.pwaScoreMobile,
    seoScoreMobile: task.seoScoreMobile
  }
}

@Injectable()
export class TaskInterceptor implements NestInterceptor<Task, TaskDto> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<TaskDto> {
    return next.handle().pipe(map((task: Task) => {
      return convertToDto(task);
    }));
  }
}

@Injectable()
export class TasksInterceptor implements NestInterceptor<Task[], TaskDto[]> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<TaskDto[]> {
    return next.handle().pipe(map((tasks: Task[]) => {
      const taskDtos: TaskDto[] = [];
      tasks.forEach((task) => {
        taskDtos.push(convertToDto(task));
      })
      return taskDtos;
    }));
  }
}
