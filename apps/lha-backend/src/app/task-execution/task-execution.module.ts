import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { LhaBackendUserModule } from '@lighthouse-automation/lha-backend/user';
import { TaskExecutionController } from './controller/task-execution.controller';
import { TaskExecutionSchema } from './schema/task-execution';
import { TaskExecutionService } from './service/task-execution.service';
import { ReportModule } from '../report/report.module';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [
    BullModule,
    MongooseModule.forFeature([{ name: 'taskExecution', schema: TaskExecutionSchema }]),
    LhaBackendUserModule,
    ReportModule,
    QueueModule
  ],
  controllers: [TaskExecutionController],
  providers: [TaskExecutionService],
  exports: [TaskExecutionService],
})
export class TaskExecutionModule {}
