import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';

import { LhaBackendReportModule } from '@lighthouse-automation/backend/report';
import { LhaBackendTaskExecutionScoreUpdateQueueModule } from '@lighthouse-automation/backend/queue/task-execution-score-update';
import { LhaBackendUserModule } from '@lighthouse-automation/backend/user';

import { TaskExecutionController } from './controller/task-execution.controller';
import { TaskExecutionSchema } from './schema/task-execution';
import { TaskExecutionService } from './service/task-execution.service';


@Module({
  imports: [
    BullModule,
    MongooseModule.forFeature([{ name: 'taskExecution', schema: TaskExecutionSchema }]),
    LhaBackendUserModule,
    LhaBackendReportModule,
    LhaBackendTaskExecutionScoreUpdateQueueModule
  ],
  controllers: [TaskExecutionController],
  providers: [TaskExecutionService],
  exports: [TaskExecutionService],
})
export class LhaBackendTaskExecutionModule {}
