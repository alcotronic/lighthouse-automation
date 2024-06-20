import { Processor, Process } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


import { TaskExecution, TaskExecutionDocument } from '../schema/task-execution';

@Processor('taskExecutionUpdateScoresQueue')
@Injectable()
export class TaskExecutionService {
  private readonly logger = new Logger(TaskExecutionService.name);

  constructor(
    @InjectModel('taskExecution')
    private taskExecutionModel: Model<TaskExecutionDocument>,
  ) {}

  create(taskId: string): Promise<TaskExecution> {
    const date = new Date();
    const createdTaskExecution = new this.taskExecutionModel({
      taskId: taskId,
      timestamp: date.getTime(),
      timestampOffset: date.getTimezoneOffset(),
    });
    return createdTaskExecution.save();
  }

  findById(id: string): Promise<TaskExecution> {
    return this.taskExecutionModel.findById(id).exec();
  }

  findByTaskId(taskId: string): Promise<TaskExecution[]> {
    return this.taskExecutionModel.find({ taskId: taskId }).exec();
  }

  findAll(): Promise<TaskExecution[]> {
    return this.taskExecutionModel.find().exec();
  }
}
