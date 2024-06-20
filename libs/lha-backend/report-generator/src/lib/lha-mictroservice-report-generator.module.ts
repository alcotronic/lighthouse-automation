import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';

import { LhaBackendReportGenerateQueueModule } from '@lighthouse-automation/lha-backend/queue/report-generate-queue';

import { ReportSchema } from '@lighthouse-automation/lha-backend/report';
import { ReportGeneratorService } from './service/report-generator.service';

@Module({
  imports: [
    BullModule,
    MongooseModule.forFeature([{ name: 'report', schema: ReportSchema }]),
    LhaBackendReportGenerateQueueModule
  ],
  providers: [ReportGeneratorService],
  exports: [ReportGeneratorService],
})
export class LhaMicroserviceReportGeneratorModule {}
