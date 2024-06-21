import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { ReportCreateQueueService } from './service/report-create-queue.service'

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'reportCreateQueue',
    }),
  ],
  providers: [ReportCreateQueueService],
  exports: [ReportCreateQueueService],
})
export class LhaBackendReportCreateQueueModule {}
