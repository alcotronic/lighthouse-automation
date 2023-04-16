import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';
import { LhaBackendUserModule } from '@lighthouse-automation/lha-backend/user';
import { ReportController } from './controller/report.controller';
import { ReportSchema } from './schema/report';
import { ReportService } from './service/report.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'reportQueue',
    }),
    BullModule.registerQueue({
      name: 'taskExecutionUpdateAverageQueue',
    }),
    MongooseModule.forFeature([{ name: 'report', schema: ReportSchema }]),
    LhaBackendUserModule,
  ],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
