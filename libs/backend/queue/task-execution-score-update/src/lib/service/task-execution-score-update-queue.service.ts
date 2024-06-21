import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';

import { TaskExecutionScoreUpdateDto } from '../dto/task-execution-score-update.dto';

@Injectable()
export class TaskExecutionScoreUpdateQueueService {
  private readonly logger = new Logger(
    TaskExecutionScoreUpdateQueueService.name,
  );

  constructor(
    @InjectQueue('taskxecutionScoreUpdateQueue')
    private queue: Queue,
  ) {}

  async addJobToExecutionScoreUpdateQueue(
    taskExecutionScoreUpdateDto: TaskExecutionScoreUpdateDto,
  ) {
    this.logger.debug(
      `addJobToExecutionScoreUpdateQueue report.id: ${taskExecutionScoreUpdateDto.reportId} report.taskId: ${taskExecutionScoreUpdateDto.taskId} report.taskExecutionId: ${taskExecutionScoreUpdateDto.taskExecutionId}`,
    );
    await this.queue.add(taskExecutionScoreUpdateDto);
  }
}
