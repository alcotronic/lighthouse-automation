import { Processor, Process, InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job, Queue } from 'bull';
import { Model } from 'mongoose';
import { Device } from '@lighthouse-automation/lha-common';
import { TaskExecution, TaskExecutionDocument } from '../schema/task-execution';
import { ReportService } from '../../report/service/report.service';
import { Report } from '../../report/schema/report';
import { Task } from '../../task/schema/task';

@Processor('taskExecutionUpdateAverageQueue')
@Injectable()
export class TaskExecutionService {
  constructor(
    @InjectModel('taskExecution')
    private taskExecutionModel: Model<TaskExecutionDocument>,
    @InjectQueue('taskUpdateAverageQueue')
    private taskUpdateAverageQueue: Queue,
    @InjectQueue('taskExecutionUpdateAverageQueue')
    private taskExecutionUpdateAverageQueue: Queue,
    private reportService: ReportService,
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

  async addJobToQueue(report: Report) {
    const jobInQueue = await this.taskExecutionUpdateAverageQueue.add(report);
    return jobInQueue;
  }

  @Process()
  async taskExecutionUpdateAverage(job: Job<Report>) {
    console.info('taskExecutionUpdateAverage job recieved');

    const report = job.data;
    const reports = await this.reportService.findByTaskExecutionId(report.executionId);

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

    reports.forEach((element: Report) => {
      if (element.formFactor === Device.DESKTOP) {
        countDesktop = countDesktop + 1;
        performanceScoreDesktop = performanceScoreDesktop + element.performanceScore;
        accessibilityScoreDesktop = accessibilityScoreDesktop + element.accessibilityScore;
        bestPracticeScoreDesktop = bestPracticeScoreDesktop + element.bestPracticeScore;
        seoScoreDesktop = seoScoreDesktop + element.seoScore;
        pwaScoreDesktop = pwaScoreDesktop + element.pwaScore;
      } else if (element.formFactor === Device.MOBILE) {
        countMobile = countMobile + 1;
        performanceScoreMobile = performanceScoreMobile + element.performanceScore;
        accessibilityScoreMobile = accessibilityScoreMobile + element.accessibilityScore;
        bestPracticeScoreMobile = bestPracticeScoreMobile + element.bestPracticeScore;
        seoScoreMobile = seoScoreMobile + element.seoScore;
        pwaScoreMobile = pwaScoreMobile + element.pwaScore;
      }
    });

    console.log('countDesktop' + countDesktop);
    console.log('countMobile' + countMobile);

    performanceScoreDesktop = +(performanceScoreDesktop / countDesktop).toFixed(2);
    accessibilityScoreDesktop = +(accessibilityScoreDesktop / countDesktop).toFixed(2);
    bestPracticeScoreDesktop = +(bestPracticeScoreDesktop / countDesktop).toFixed(2);
    seoScoreDesktop = +(seoScoreDesktop / countDesktop).toFixed(2);
    pwaScoreDesktop = +(pwaScoreDesktop / countDesktop).toFixed(2);

    performanceScoreMobile = +(performanceScoreMobile / countMobile).toFixed(2);
    accessibilityScoreMobile = +(accessibilityScoreMobile / countMobile).toFixed(2);
    bestPracticeScoreMobile = +(bestPracticeScoreMobile / countMobile).toFixed(2);
    seoScoreMobile = +(seoScoreMobile / countMobile).toFixed(2);
    pwaScoreMobile = +(pwaScoreMobile / countMobile).toFixed(2);

    await this.taskExecutionModel
      .updateOne(
        { _id: report.executionId },
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
        },
      )
      .exec();
    this.taskUpdateAverageQueue.add(report);
    console.info('taskExecutionUpdateAverage job finished');
  }
}
