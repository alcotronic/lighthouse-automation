import { Processor, Process } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bull';
import { Model } from 'mongoose';

import { QueueService } from '@lighthouse-automation/backend/queue';



@Processor('taskExecutionUpdateScoresQueue')
@Injectable()
export class TaskExecutionService {
  private readonly logger = new Logger(TaskExecutionService.name);

  constructor(
    @InjectModel('taskExecution')
    private taskExecutionModel: Model<TaskExecutionDocument>,
    private queueService: QueueService
  ) {}

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
}
