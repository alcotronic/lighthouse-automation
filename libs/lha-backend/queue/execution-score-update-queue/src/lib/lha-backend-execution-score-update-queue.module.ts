import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { ExecutionScoreUpdateQueueService } from './service/execution-score-update-queue.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'executionScoreUpdateQueue',
    }),
  ],
  providers: [ExecutionScoreUpdateQueueService],
  exports: [ExecutionScoreUpdateQueueService],
})
export class LhaBackendExecutionScoreUpdateQueueModule {}
