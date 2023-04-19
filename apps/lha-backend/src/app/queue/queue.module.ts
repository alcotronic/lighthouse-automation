import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from './service/queue.service';

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: 'reportGenerateLighthouseLhrQueue',
      },
      {
        name: 'taskExecutionUpdateScoresQueue',
      },
      {
        name: 'taskUpdateAverageScoresQueue',
      }
    )
  ],
  providers: [QueueService],
  exports: [QueueService]
})
export class QueueModule {}
