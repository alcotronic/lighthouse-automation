import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';

import { LhaBackendReportModule } from '@lighthouse-automation/lha-backend/report';
import { LhaBackendQueueModule } from '@lighthouse-automation/lha-backend/queue';
import { LhaBackendUserModule } from '@lighthouse-automation/lha-backend/user';

import { TaskExecutionController } from './controller/task-execution.controller';
import { TaskExecutionSchema } from './schema/task-execution';
import { TaskExecutionService } from './service/task-execution.service';


@Module({
  imports: [
    BullModule,
    MongooseModule.forFeature([{ name: 'taskExecution', schema: TaskExecutionSchema }]),
    LhaBackendUserModule,
    LhaBackendReportModule,
    LhaBackendQueueModule
  ],
  controllers: [TaskExecutionController],
  providers: [TaskExecutionService],
  exports: [TaskExecutionService],
})
export class LhaBackendTaskExecutionModule {}
