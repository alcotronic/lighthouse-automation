import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';

import { LhaBackendReportModule } from '@lighthouse-automation/backend/report';
import { LhaBackendUserModule } from '@lighthouse-automation/backend/user';

import { TaskController } from './controller/task.controller';
import { TaskSchema } from './schema/task';
import { TaskService } from './service/task.service';

@Module({
  imports: [
    BullModule,
    MongooseModule.forFeature([{ name: 'task', schema: TaskSchema }]),
    LhaBackendUserModule,
    LhaBackendReportModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class LhaBackendTaskModule {}
