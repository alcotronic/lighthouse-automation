import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { LhaBackendUserModule } from '@lighthouse-automation/lha-backend/user';
import { TaskController } from './controller/task.controller';
import { TaskSchema } from './schema/task';
import { TaskService } from './service/task.service';
import { TaskSchedulerService } from './service/task-scheduler.service';
import { ReportModule } from '../report/report.module';
import { TaskExecutionModule } from '../task-execution/task-execution.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'taskUpdateAverageQueue',
    }),
    MongooseModule.forFeature([{ name: 'task', schema: TaskSchema }]),
    LhaBackendUserModule,
    ReportModule,
    TaskExecutionModule
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskSchedulerService],
})
export class TaskModule {}
