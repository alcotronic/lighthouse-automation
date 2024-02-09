import { Processor, Process } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bull';
import { Model } from 'mongoose';

import { Report } from '@lighthouse-automation/lha-backend/report';
import { Task } from '@lighthouse-automation/lha-backend/task';
import { QueueService } from '@lighthouse-automation/lha-backend/queue';
import { Device } from '@lighthouse-automation/lha-common';

import { TaskExecution, TaskExecutionDocument } from '../schema/task-execution';
import { TaskExecutionScores } from '../schema/task-execution-scores';

@Processor('taskExecutionUpdateScoresQueue')
@Injectable()
export class TaskExecutionService {
  private readonly logger = new Logger(TaskExecutionService.name);

  constructor(
    @InjectModel('taskExecution')
    private taskExecutionModel: Model<TaskExecutionDocument>,
    private queueService: QueueService
  ) {}

  create(task: Task): Promise<TaskExecution> {
    const date = new Date();
    const createdTaskExecution = new this.taskExecutionModel({
      taskId: task.id,
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

  async addScoresDesktop(
    taskExecutionId: string,
    performanceScoreDesktop: number,
    accessibilityScoreDesktop: number,
    bestPracticeScoreDesktop: number,
    seoScoreDesktop: number,
    pwaScoreDesktop: number
  ) {
    await this.taskExecutionModel
      .updateOne(
        { _id: taskExecutionId },
        {
          $set: {
            performanceScoreDesktop: performanceScoreDesktop,
            accessibilityScoreDesktop: accessibilityScoreDesktop,
            bestPracticeScoreDesktop: bestPracticeScoreDesktop,
            seoScoreDesktop: seoScoreDesktop,
            pwaScoreDesktop: pwaScoreDesktop
          },
        }
      )
      .exec();
  }

  async addScoresMobile(
    taskExecutionId: string,
    performanceScoreMobile: number,
    accessibilityScoreMobile: number,
    bestPracticeScoreMobile: number,
    seoScoreMobile: number,
    pwaScoreMobile: number
  ) {
    await this.taskExecutionModel
      .updateOne(
        { _id: taskExecutionId },
        {
          $set: {
            performanceScoreMobile: performanceScoreMobile,
            accessibilityScoreMobile: accessibilityScoreMobile,
            bestPracticeScoreMobile: bestPracticeScoreMobile,
            seoScoreMobile: seoScoreMobile,
            pwaScoreMobile: pwaScoreMobile,
          },
        }
      )
      .exec();
  }

  async aggregateAverageScoresByTaskId(taskId: string): Promise<TaskExecutionScores | null> {
    this.logger.debug('aggregateDesktopScoresByTaskId for taskId: '+taskId);
    const aggregationResult = await this.taskExecutionModel.aggregate<TaskExecutionScores>([
      {$match: { taskId: taskId }},
      {$group: {
        _id: null,
        performanceScoreDesktopAverage: {$avg: "$performanceScoreDesktop"},
        accessibilityScoreDesktopAverage: {$avg: "$accessibilityScoreDesktop"},
        bestPracticeScoreDesktopAverage: {$avg: "$bestPracticeScoreDesktop"},
        seoScoreDesktopAverage: {$avg: "$seoScoreDesktop"},
        pwaScoreDesktopAverage: {$avg: "$pwaScoreDesktop"},
        performanceScoreMobileAverage: {$avg: "$performanceScoreMobile"},
        accessibilityScoreMobileAverage: {$avg: "$accessibilityScoreMobile"},
        bestPracticeScoreMobileAverage: {$avg: "$bestPracticeScoreMobile"},
        seoScoreMobileAverage: {$avg: "$seoScoreMobile"},
        pwaScoreMobileAverage: {$avg: "$pwaScoreMobile"}
      }},
      {$addFields: {
        taskId: taskId
      }}
    ]).exec();
    this.logger.debug(aggregationResult);
    return aggregationResult.length > 0 ? aggregationResult[0] : null;
  }
  
  @Process()
  async taskExecutionUpdateScores(job: Job<Report>) {
    this.logger.debug('taskExecutionUpdateScores job recieved');

    const report = job.data;

    this.logger.debug('reportId: ' + report._id);
    this.logger.debug('taskExecutionId: ' + report.taskExecutionId);

    if (report.formFactor === Device.DESKTOP) {
      await this.addScoresDesktop(
        report.taskExecutionId,
        report.performanceScore,
        report.accessibilityScore,
        report.bestPracticeScore,
        report.seoScore,
        report.pwaScore
      );
    } else if (report.formFactor === Device.MOBILE) {
      await this.addScoresMobile(
        report.taskExecutionId,
        report.performanceScore,
        report.accessibilityScore,
        report.bestPracticeScore,
        report.seoScore,
        report.pwaScore
      );
    }

    const updatedTaskExecution = await this.taskExecutionModel.findById(report.taskExecutionId).exec();
    this.logger.debug(updatedTaskExecution);

    this.queueService.addJobToTaskUpdateAverageScoresQueue(updatedTaskExecution);
    this.logger.debug('taskExecutionUpdateScores job finished');
  }
}
