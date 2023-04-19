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
        'name reportType reportInterval enabled urlList countDesktop performanceScoreDesktop accessibilityScoreDesktop bestPracticeScoreDesktop seoScoreDesktop pwaScoreDesktop countMobile performanceScoreMobile accessibilityScoreMobile bestPracticeScoreMobile seoScoreMobile pwaScoreMobile'
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
        'name reportType reportInterval enabled countDesktop performanceScoreDesktop accessibilityScoreDesktop bestPracticeScoreDesktop seoScoreDesktop pwaScoreDesktop countMobile performanceScoreMobile accessibilityScoreMobile bestPracticeScoreMobile seoScoreMobile pwaScoreMobile'
      )
      .exec();
  }

  @Process()
  async taskUpdateAverageScores(job: Job<TaskExecution>) {
    this.logger.debug('taskUpdateAverageScores job recieved');

    const taskExecutions = await this.taskExecutionService.findByTaskId(
      job.data.taskId
    );

    let countDesktop = 0;
    let performanceScoreDesktop = 0;
    let accessibilityScoreDesktop = 0;
    let bestPracticeScoreDesktop = 0;
    let seoScoreDesktop = 0;
    let pwaScoreDesktop = 0;

    let countMobile = 0;
    let performanceScoreMobile = 0;
    let accessibilityScoreMobile = 0;
    let bestPracticeScoreMobile = 0;
    let seoScoreMobile = 0;
    let pwaScoreMobile = 0;

    taskExecutions.forEach((taskExecution: TaskExecution) => {
      if (
        taskExecution.performanceScoreDesktop &&
        taskExecution.accessibilityScoreDesktop &&
        taskExecution.bestPracticeScoreDesktop &&
        taskExecution.seoScoreDesktop && 
        taskExecution.pwaScoreDesktop
      ) {
        countDesktop = countDesktop + 1;
        performanceScoreDesktop =
          performanceScoreDesktop + taskExecution.performanceScoreDesktop;
        accessibilityScoreDesktop =
          accessibilityScoreDesktop + taskExecution.accessibilityScoreDesktop;
        bestPracticeScoreDesktop =
          bestPracticeScoreDesktop + taskExecution.bestPracticeScoreDesktop;
        seoScoreDesktop = seoScoreDesktop + taskExecution.seoScoreDesktop;
        pwaScoreDesktop = pwaScoreDesktop + taskExecution.performanceScoreDesktop;
      }
      if (taskExecution.performanceScoreMobile &&
        taskExecution.accessibilityScoreMobile &&
        taskExecution.bestPracticeScoreMobile &&
        taskExecution.seoScoreMobile && 
        taskExecution.pwaScoreMobile) {
        countMobile = countMobile + 1;
        performanceScoreMobile =
          performanceScoreMobile + taskExecution.performanceScoreMobile;
        accessibilityScoreMobile =
          accessibilityScoreMobile + taskExecution.accessibilityScoreMobile;
        bestPracticeScoreMobile =
          bestPracticeScoreMobile + taskExecution.bestPracticeScoreMobile;
        seoScoreMobile = seoScoreMobile + taskExecution.seoScoreMobile;
        pwaScoreMobile = pwaScoreMobile + taskExecution.pwaScoreMobile;
      }
    });

    performanceScoreDesktop = +(performanceScoreDesktop / countDesktop).toFixed(
      2
    );
    accessibilityScoreDesktop = +(
      accessibilityScoreDesktop / countDesktop
    ).toFixed(2);
    bestPracticeScoreDesktop = +(
      bestPracticeScoreDesktop / countDesktop
    ).toFixed(2);
    seoScoreDesktop = +(seoScoreDesktop / countDesktop).toFixed(2);
    pwaScoreDesktop = +(pwaScoreDesktop / countDesktop).toFixed(2);

    performanceScoreMobile = +(performanceScoreMobile / countMobile).toFixed(2);
    accessibilityScoreMobile = +(
      accessibilityScoreMobile / countMobile
    ).toFixed(2);
    bestPracticeScoreMobile = +(bestPracticeScoreMobile / countMobile).toFixed(
      2
    );
    seoScoreMobile = +(seoScoreMobile / countMobile).toFixed(2);
    pwaScoreMobile = +(pwaScoreMobile / countMobile).toFixed(2);

    await this.taskModel
      .updateOne(
        { _id: job.data.taskId },
        {
          $set: {
            countDesktop: countDesktop,
            performanceScoreDesktop: performanceScoreDesktop,
            accessibilityScoreDesktop: accessibilityScoreDesktop,
            bestPracticeScoreDesktop: bestPracticeScoreDesktop,
            seoScoreDesktop: seoScoreDesktop,
            pwaScoreDesktop: pwaScoreDesktop,
            countMobile: countMobile,
            performanceScoreMobile: performanceScoreMobile,
            accessibilityScoreMobile: accessibilityScoreMobile,
            bestPracticeScoreMobile: bestPracticeScoreMobile,
            seoScoreMobile: seoScoreMobile,
            pwaScoreMobile: pwaScoreMobile,
          },
        }
      )
      .exec();
    this.logger.debug('taskUpdateAverageScores job finished');
  }
}
