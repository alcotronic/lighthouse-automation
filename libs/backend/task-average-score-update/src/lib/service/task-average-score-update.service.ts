import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Process, Processor } from '@nestjs/bull';
import { Model } from 'mongoose';
import { Job } from 'bull';

import { TaskExecution, TaskExecutionService } from '@lighthouse-automation/backend/task-execution';

import { TaskDocument } from '@lighthouse-automation/backend/task';

@Processor('taskUpdateAverageScoresQueue')
@Injectable()
export class TaskAverageScoreUpdateService {
  private readonly logger = new Logger(TaskAverageScoreUpdateService.name);

  constructor(
    @InjectModel('task')
    private taskModel: Model<TaskDocument>,
    private taskExecutionService: TaskExecutionService
  ) {}

  @Process()
  async taskUpdateAverageScores(job: Job<TaskExecution>) {
    this.logger.debug('taskUpdateAverageScores job recieved');

    // let countDesktop = 0;
    // let countMobile = 0;

    const aggregationResult =
      await this.taskExecutionService.aggregateAverageScoresByTaskId(
        job.data.taskId
      );

    await this.taskModel
      .updateOne(
        { _id: job.data.taskId },
        {
          $set: {
            performanceScoreDesktop:
              aggregationResult.performanceScoreDesktopAverage
                ? aggregationResult.performanceScoreDesktopAverage.toFixed(2)
                : null,
            accessibilityScoreDesktop:
              aggregationResult.accessibilityScoreDesktopAverage
                ? aggregationResult.accessibilityScoreDesktopAverage.toFixed(2)
                : null,
            bestPracticeScoreDesktop:
              aggregationResult.bestPracticeScoreDesktopAverage
                ? aggregationResult.bestPracticeScoreDesktopAverage.toFixed(2)
                : null,
            seoScoreDesktop: aggregationResult.seoScoreDesktopAverage
              ? aggregationResult.seoScoreDesktopAverage.toFixed(2)
              : null,
            pwaScoreDesktop: aggregationResult.pwaScoreDesktopAverage
              ? aggregationResult.pwaScoreDesktopAverage.toFixed(2)
              : null,
            performanceScoreMobile:
              aggregationResult.performanceScoreMobileAverage
                ? aggregationResult.performanceScoreMobileAverage.toFixed(2)
                : null,
            accessibilityScoreMobile:
              aggregationResult.accessibilityScoreMobileAverage
                ? aggregationResult.accessibilityScoreMobileAverage.toFixed(2)
                : null,
            bestPracticeScoreMobile:
              aggregationResult.bestPracticeScoreMobileAverage
                ? aggregationResult.bestPracticeScoreMobileAverage.toFixed(2)
                : null,
            seoScoreMobile: aggregationResult.seoScoreMobileAverage
              ? aggregationResult.seoScoreMobileAverage.toFixed(2)
              : null,
            pwaScoreMobile: aggregationResult.pwaScoreMobileAverage
              ? aggregationResult.pwaScoreMobileAverage.toFixed(2)
              : null,
          },
        }
      )
      .exec();

    this.logger.debug('taskUpdateAverageScores job finished');
  }
}
