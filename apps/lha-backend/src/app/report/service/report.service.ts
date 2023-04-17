import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job, Queue } from 'bull';
import { Model } from 'mongoose';
import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse/core/index.cjs';
//import { screenEmulationMetrics, userAgents } from 'lighthouse/core/config/constants';
// import * as reportGenerator from 'lighthouse/report/generator/report-generator';
import { gzip, ungzip } from 'node-gzip';

import { Report, ReportDocument } from '../schema/report';
import { Device, ReportDto } from '@lighthouse-automation/lha-common';
import { Config, Flags } from 'lighthouse';

@Processor('reportQueue')
@Injectable()
export class ReportService {
  private readonly logger = new Logger(ReportService.name);
  
  constructor(
    @InjectModel('report') private reportModel: Model<ReportDocument>,
    @InjectQueue('reportQueue') private reportQueue: Queue,
    @InjectQueue('taskExecutionUpdateAverageQueue')
    private taskExecutionUpdateAverageQueue: Queue
  ) {}

  async create(reportDto: ReportDto): Promise<Report> {
    const timeCreate = new Date();
    const report = new this.reportModel({
      taskId: reportDto.taskId,
      taskExecutionId: reportDto.taskExecutionId,
      formFactor: reportDto.formFactor,
      timeCreate: timeCreate.getTime(),
      timeOffsetCreate: timeCreate.getTimezoneOffset(),
      timeStart: undefined,
      timeOffsetStart: undefined,
      timeFinish: undefined,
      timeOffsetFinish: undefined,
      finished: false,
      url: reportDto.url,
    });
    const reportSaved = await report.save();
    this.reportQueue.add(reportSaved);
    return reportSaved;
  }

  async findById(reportId: string): Promise<Report> {
    const report = await this.reportModel.findById(reportId).exec();
    return report;
  }

  async findByTaskId(taskId: string): Promise<Report[]> {
    const report = await this.reportModel.find({ taskId: taskId }).exec();
    return report;
  }

  async findByTaskExecutionId(taskExecutionId: string): Promise<Report[]> {
    const report = await this.reportModel
      .find({ taskExecutionId: taskExecutionId })
      .exec();
    return report;
  }

  async addJobToQueue(report: Report) {
    const jobInQueue = await this.reportQueue.add(report);
    return jobInQueue;
  }

  async addStartTime(report: Report) {
    const timeStart = new Date();
    const reportSaved = await this.reportModel
      .updateOne(
        { _id: report.id },
        {
          $set: {
            timeStart: timeStart.getTime(),
            timeOffsetStart: timeStart.getTimezoneOffset(),
          },
        }
      )
      .exec();
    return reportSaved;
  }

  async addFinishTime(report: Report) {
    const timeFinish = new Date();
    const reportSaved = await this.reportModel
      .updateOne(
        { _id: report.id },
        {
          $set: {
            timeFinish: timeFinish.getTime(),
            timeOffsetFinish: timeFinish.getTimezoneOffset(),
            finished: true,
          },
        }
      )
      .exec();
    return reportSaved;
  }

  async addScores(
    report: Report,
    performanceScore: number,
    accessibilityScore: number,
    bestPracticeScore: number,
    seoScore: number,
    pwaScore: number
  ) {
    const reportSaved = await this.reportModel
      .updateOne(
        { _id: report.id },
        {
          $set: {
            performanceScore: performanceScore,
            accessibilityScore: accessibilityScore,
            bestPracticeScore: bestPracticeScore,
            seoScore: seoScore,
            pwaScore: pwaScore,
          },
        }
      )
      .exec();
    return reportSaved;
  }

  async addLighthouseLhrGzip(report: Report, lighthouseLhrGzip: Buffer) {
    const reportSaved = await this.reportModel
      .updateOne(
        { _id: report.id },
        {
          $set: {
            lighthouseLhrGzip: lighthouseLhrGzip,
          },
        }
      )
      .exec();
    return reportSaved;
  }

  @Process()
  async processReport(job: Job<Report>) {
    this.logger.debug('processReport job recieved');
    const report = job.data;
    this.logger.debug(report);
    await this.addStartTime(report);

    //const chrome = await launch({ chromeFlags: ['--headless'] });
    const chrome = await launch();
    const flags: Flags = {
      port: chrome.port,
    };
    const config: Config = {
      extends: 'lighthouse:default'
    };
    // const config: Config = {
    //   extends: report.formFactor === Device.DESKTOP ? 'lighthouse:desktop' : 'lighthouse:mobile',
    // };

    const runnerResult = await lighthouse(report.url, flags, config);
    const lighthouseLhr = JSON.stringify(runnerResult.lhr);
    const lighthouseLhrGzip = await gzip(lighthouseLhr, { level: 9 });
    await chrome.kill();

    await this.addScores(
      report,
      runnerResult.lhr.categories.performance.score,
      runnerResult.lhr.categories.accessibility.score,
      runnerResult.lhr.categories.bestPracticeScore.score,
      runnerResult.lhr.categories.seo.score,
      runnerResult.lhr.categories['pwa'].score
    );
    await this.addLighthouseLhrGzip(report, lighthouseLhrGzip);

    //await this.reportTaskRunUpdateAverageQueue.add(report);
    await this.addFinishTime(report);
    console.info('processReport job finished');
    return {};
  }
}
