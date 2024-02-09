import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';

import { LhaBackendQueueModule } from '@lighthouse-automation/lha-backend/queue';
import { LhaBackendUserModule } from '@lighthouse-automation/lha-backend/user';

import { ReportController } from './controller/report.controller';
import { ReportSchema } from './schema/report';
import { ReportService } from './service/report.service';

@Module({
  imports: [
    BullModule,
    MongooseModule.forFeature([{ name: 'report', schema: ReportSchema }]),
    LhaBackendUserModule,
    LhaBackendQueueModule
  ],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class LhaBackendReportModule {}
