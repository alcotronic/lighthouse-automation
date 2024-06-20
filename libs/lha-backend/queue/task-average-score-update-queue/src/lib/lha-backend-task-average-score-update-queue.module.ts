import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { TaskAverageScoreUpdateQueueService } from './service/task-average-score-update-queue.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'taskAverageScoreUpdateQueue',
    }),
  ],
  providers: [TaskAverageScoreUpdateQueueService],
  exports: [TaskAverageScoreUpdateQueueService],
})
export class LhaBackendTaskAverageScoreUpdateQueueModule {}
