import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';

import { AverageScoreUpdateMessage } from '../message/average-score-update.message';

@Injectable()
export class AverageScoreUpdateQueueService {
  private readonly logger = new Logger(AverageScoreUpdateQueueService.name);

  constructor(
    @InjectQueue('averageScoreUpdateQueue')
    private averageScoreUpdateQueue: Queue,
  ) {}

  async addJobToAverageScoreUpdateQueue(
    averageScoreUpdateMessage: AverageScoreUpdateMessage,
  ) {
    this.logger.debug(
      `addJobToAverageScoreUpdateQueue taskExecutionId: ${averageScoreUpdateMessage.taskExecutionId}`,
    );
    await this.averageScoreUpdateQueue.add(averageScoreUpdateMessage);
  }
}
