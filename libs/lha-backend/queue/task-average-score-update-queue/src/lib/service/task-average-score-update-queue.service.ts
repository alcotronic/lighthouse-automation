import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';

import { TaskAverageScoreUpdateMessage } from '../message/task-average-score-update.message';

@Injectable()
export class TaskAverageScoreUpdateQueueService {
  private readonly logger = new Logger(TaskAverageScoreUpdateQueueService.name);

  constructor(
    @InjectQueue('taskAverageScoreUpdateQueue')
    private queue: Queue,
  ) {}

  async addJobToTaskAverageScoreUpdateQueue(
    message: TaskAverageScoreUpdateMessage,
  ) {
    this.logger.debug(
      `addJobToAverageScoreUpdateQueue taskExecutionId: ${message.taskExecutionId}`,
    );
    await this.queue.add(message);
  }
}
