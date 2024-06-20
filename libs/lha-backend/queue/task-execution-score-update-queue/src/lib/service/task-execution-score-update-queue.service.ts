import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';

import { TaskExecutionScoreUpdateMessage } from '../message/task-execution-score-update.message';

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
    message: TaskExecutionScoreUpdateMessage,
  ) {
    this.logger.debug(
      `addJobToExecutionScoreUpdateQueue report.id: ${message.reportId} report.taskId: ${message.taskId} report.taskExecutionId: ${message.taskExecutionId}`,
    );
    await this.queue.add(message);
  }
}
