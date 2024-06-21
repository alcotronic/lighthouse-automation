import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { TaskCreateQueueService } from './service/task-create-queue.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'TaskCreateQueue',
    }),
  ],
  providers: [TaskCreateQueueService],
  exports: [TaskCreateQueueService],
})
export class LhaBackendTaskCreateQueueModule {}
