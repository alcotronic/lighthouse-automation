import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { AverageScoreUpdateQueueService } from './service/average-score-update-queue.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'averageScoreupdaterQueue',
    }),
  ],
  providers: [AverageScoreUpdateQueueService],
  exports: [AverageScoreUpdateQueueService],
})
export class LhaBackendAverageScoreUpdateQueueModule {}
