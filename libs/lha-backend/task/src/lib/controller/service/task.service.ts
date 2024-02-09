import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Process, Processor } from '@nestjs/bull';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../schema/task';
import { TaskCreateDto, TaskInterval } from '@lighthouse-automation/lha-common';
import { TaskExecution } from '../../task-execution/schema/task-execution';
import { Job } from 'bull';
import { TaskExecutionService } from '../../task-execution/service/task-execution.service';

@Processor('taskUpdateAverageScoresQueue')
@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    @InjectModel('task')
    private taskModel: Model<TaskDocument>,
    private taskExecutionService: TaskExecutionService
  ) {}

  create(userId: string, taskCreateDto: TaskCreateDto) {
    const createdTask = new this.taskModel({
      userId: userId,
      name: taskCreateDto.name,
      taskType: taskCreateDto.taskType,
      taskInterval: taskCreateDto.taskInterval,
      enabled: taskCreateDto.enabled,
      urlList: taskCreateDto.urlList,
    });
    return createdTask.save();
  }

  findById(userId: string, id: string): Promise<Task> {
    return this.taskModel
      .findOne(
        { _id: id, userId: userId },
        'name taskType taskInterval urlList enabled countDesktop performanceScoreDesktop accessibilityScoreDesktop bestPracticeScoreDesktop seoScoreDesktop pwaScoreDesktop countMobile performanceScoreMobile accessibilityScoreMobile bestPracticeScoreMobile seoScoreMobile pwaScoreMobile'
      )
      .exec();
  }

  findByTaskInterval(taskInterval: TaskInterval): Promise<Task[]> {
    return this.taskModel
      .find({
        taskInterval: taskInterval,
      })
      .exec();
  }

  findByTaskIntervalAndEnabled(taskInterval: TaskInterval): Promise<Task[]> {
    return this.taskModel
      .find({
        taskInterval: taskInterval,
        enabled: true,
      })
      .exec();
  }

  findAll(userId: string): Promise<Task[]> {
    return this.taskModel
      .find(
        { userId: userId },
        'name taskType taskInterval urlList enabled countDesktop performanceScoreDesktop accessibilityScoreDesktop bestPracticeScoreDesktop seoScoreDesktop pwaScoreDesktop countMobile performanceScoreMobile accessibilityScoreMobile bestPracticeScoreMobile seoScoreMobile pwaScoreMobile'
      )
      .exec();
  }

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
