import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';

import { LhaBackendReportGenerateQueueModule } from '@lighthouse-automation/backend/queue/report-generate';
import { LhaBackendReportModule } from '@lighthouse-automation/backend/report';
import { LhaBackendUserModule } from '@lighthouse-automation/backend/user';

import { TaskSchema } from './schema/task';
import { TaskSchedulerService } from './service/task-scheduler.service';

@Module({
  imports: [
    BullModule,
    MongooseModule.forFeature([{ name: 'task', schema: TaskSchema }]),
    LhaBackendReportGenerateQueueModule,
  ],
  providers: [TaskSchedulerService],
})
export class LhaBackendTaskScheduleModule {}
