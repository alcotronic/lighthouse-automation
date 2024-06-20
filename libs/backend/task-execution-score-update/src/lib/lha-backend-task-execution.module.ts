import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';

import { LhaBackendTaskExecutionScoreUpdateQueueModule } from '@lighthouse-automation/backend/queue/task-execution-score-update';

import { TaskExecutionSchema } from '@lighthouse-automation/backend/task-execution'

import { TaskExecutionScoreUpdateService } from './service/task-execution-score-update.service';


@Module({
  imports: [
    BullModule,
    MongooseModule.forFeature([{ name: 'taskExecution', schema: TaskExecutionSchema }]),
    LhaBackendTaskExecutionScoreUpdateQueueModule
  ],
  providers: [TaskExecutionScoreUpdateService],
  exports: [TaskExecutionScoreUpdateService],
})
export class LhaBackendTaskExecutionModule {}
