import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';

import { ExecutionScoreUpdateMessage } from '../message/execution-score-update.message';

@Injectable()
export class ExecutionScoreUpdateQueueService {
  private readonly logger = new Logger(ExecutionScoreUpdateQueueService.name);

  constructor(
    @InjectQueue('executionScoreUpdateQueue')
    private executionScoreUpdateQueue: Queue,
  ) {}

  async addJobToExecutionScoreUpdateQueue(
    executionScoreUpdateMessage: ExecutionScoreUpdateMessage,
  ) {
    this.logger.debug(
      `addJobToExecutionScoreUpdateQueue report.id: ${executionScoreUpdateMessage.reportId} report.taskId: ${executionScoreUpdateMessage.taskId} report.taskExecutionId: ${executionScoreUpdateMessage.taskExecutionId}`,
    );
    await this.executionScoreUpdateQueue.add(executionScoreUpdateMessage);
  }
}
