import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { LhaBackendUserModule } from '@lighthouse-automation/lha-backend/user';
import { TaskExecutionController } from './controller/execution.controller';
import { TaskExecutionSchema } from './schema/task-execution';
import { TaskExecutionService } from './service/task-execution.service';
import { ReportModule } from '../report/report.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'taskUpdateAverageQueue',
    }),
    BullModule.registerQueue({
      name: 'taskExecutionUpdateAverageQueue',
    }),
    MongooseModule.forFeature([{ name: 'taskExecution', schema: TaskExecutionSchema }]),
    LhaBackendUserModule,
    ReportModule
  ],
  controllers: [TaskExecutionController],
  providers: [TaskExecutionService],
  exports: [TaskExecutionService],
})
export class TaskExecutionModule {}
