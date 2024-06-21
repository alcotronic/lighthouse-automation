import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';

import { TaskAverageScoreUpdateDto } from '../dto/task-average-score-update.dto';

@Injectable()
export class TaskAverageScoreUpdateQueueService {
  private readonly logger = new Logger(TaskAverageScoreUpdateQueueService.name);

  constructor(
    @InjectQueue('taskAverageScoreUpdateQueue')
    private queue: Queue,
  ) {}

  async addJobToTaskAverageScoreUpdateQueue(
    taskAverageScoreUpdateDto: TaskAverageScoreUpdateDto,
  ) {
    this.logger.debug(
      `addJobToAverageScoreUpdateQueue taskExecutionId: ${taskAverageScoreUpdateDto.taskExecutionId}`,
    );
    await this.queue.add(taskAverageScoreUpdateDto);
  }
}
