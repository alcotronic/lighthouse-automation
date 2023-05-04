import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map, of } from 'rxjs';
import { TaskExecution } from '../schema/task-execution';
import { TaskExecutionDto } from '@lighthouse-automation/lha-common';

export interface Response<TaskExecutionDto>{
  tasks: TaskExecutionDto[]
}

function convertToDto(taskExecution: TaskExecution):TaskExecutionDto {
  return {
    id: taskExecution.id,
    taskId: taskExecution.taskId,
    timestamp: taskExecution.timestamp,
    timestampOffset: taskExecution.timestampOffset,
    performanceScoreDesktop: taskExecution.performanceScoreDesktop,
    accessibilityScoreDesktop: taskExecution.accessibilityScoreDesktop,
    bestPracticeScoreDesktop: taskExecution.bestPracticeScoreDesktop,
    pwaScoreDesktop: taskExecution.pwaScoreDesktop,
    seoScoreDesktop: taskExecution.pwaScoreDesktop,
    performanceScoreMobile: taskExecution.performanceScoreMobile,
    accessibilityScoreMobile: taskExecution.accessibilityScoreMobile,
    bestPracticeScoreMobile: taskExecution.bestPracticeScoreMobile,
    pwaScoreMobile: taskExecution.pwaScoreMobile,
    seoScoreMobile: taskExecution.pwaScoreMobile
  }
}

@Injectable()
export class TaskExecutionInterceptor implements NestInterceptor<TaskExecution, TaskExecutionDto> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<TaskExecutionDto> {
    return next.handle().pipe(map((taskExecution: TaskExecution) => {
      return convertToDto(taskExecution);
    }));
  }
}

@Injectable()
export class TaskExecutionsInterceptor implements NestInterceptor<TaskExecution[], TaskExecutionDto[]> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<TaskExecutionDto[]> {
    return next.handle().pipe(map((tasks: TaskExecution[]) => {
      const taskExecutionDtos: TaskExecutionDto[] = [];
      tasks.forEach((taskExecution) => {
        taskExecutionDtos.push(convertToDto(taskExecution));
      })
      return taskExecutionDtos;
    }));
  }
}
