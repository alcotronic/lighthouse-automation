import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';

import { LhaBackendQueueModule } from '@lighthouse-automation/lha-backend/queue';
import { LhaBackendReportModule } from '@lighthouse-automation/lha-backend/report';
import { LhaBackendTaskExecutionModule } from '@lighthouse-automation/lha-backend/task-execution';
import { LhaBackendUserModule } from '@lighthouse-automation/lha-backend/user';

import { TaskController } from './controller/task.controller';
import { TaskSchema } from './schema/task';
import { TaskSchedulerService } from './service/task-scheduler.service';
import { TaskService } from './service/task.service';

@Module({
  imports: [
    BullModule,
    MongooseModule.forFeature([{ name: 'task', schema: TaskSchema }]),
    LhaBackendUserModule,
    LhaBackendReportModule,
    LhaBackendQueueModule,
    LhaBackendTaskExecutionModule
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskSchedulerService],
})
export class LhaBackendTaskModule {}
