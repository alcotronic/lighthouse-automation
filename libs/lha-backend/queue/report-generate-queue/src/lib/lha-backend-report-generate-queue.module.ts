import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { ReportGenerateQueueService } from './service/report-generate-queue.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'reportGenerateQueue',
    }),
  ],
  providers: [ReportGenerateQueueService],
  exports: [ReportGenerateQueueService],
})
export class LhaBackendReportGenerateQueueModule {}
