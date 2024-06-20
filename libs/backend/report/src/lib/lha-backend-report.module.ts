import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LhaBackendUserModule } from '@lighthouse-automation/backend/user';

import { ReportController } from './controller/report.controller';
import { ReportSchema } from './schema/report';
import { ReportService } from './service/report.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'report', schema: ReportSchema }]),
    LhaBackendUserModule
  ],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class LhaBackendReportModule {}
