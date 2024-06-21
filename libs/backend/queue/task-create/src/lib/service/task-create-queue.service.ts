import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';

import { TaskCreateDto } from '../dto/task-create.dto';

@Injectable()
export class TaskCreateQueueService {
  private readonly logger = new Logger(TaskCreateQueueService.name);

  constructor(
    @InjectQueue('taskCreateQueue')
    private queue: Queue,
  ) {}

  async addJobToTaskCreateQueue(taskCreateDto: TaskCreateDto) {
    this.logger.debug(
      `addJobToTaskCreateQueue add ${taskCreateDto.taskType} for userId: ${taskCreateDto.userId} with task name: ${taskCreateDto.name}`,
    );
    await this.queue.add(taskCreateDto);
  }
}
