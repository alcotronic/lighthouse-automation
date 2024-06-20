import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { TaskExecutionScoreUpdateQueueService } from './service/task-execution-score-update-queue.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'taskExecutionScoreUpdateQueue',
    }),
  ],
  providers: [TaskExecutionScoreUpdateQueueService],
  exports: [TaskExecutionScoreUpdateQueueService],
})
export class LhaBackendTaskExecutionScoreUpdateQueueModule {}
