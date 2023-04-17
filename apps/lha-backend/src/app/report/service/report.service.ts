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
import { QueueService } from '../../queue/service/queue.service';

@Processor('reportGenerateLighthouseLhrQueue')
@Injectable()
export class ReportService {
  private readonly logger = new Logger(ReportService.name);
  
  constructor(
    @InjectModel('report') private reportModel: Model<ReportDocument>,
    private queueService: QueueService
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

  async addStartTime(report: Report) {
    const timeStart = new Date();

    await this.reportModel
      .updateOne(
        { _id: report._id },
        {
          $set: {
            timeStart: timeStart.getTime(),
            timeOffsetStart: timeStart.getTimezoneOffset(),
          },
        }
      ).exec();
  }

  async addFinishTime(report: Report) {
    const timeFinish = new Date();
    await this.reportModel
      .updateOne(
        { _id: report._id },
        {
          $set: {
            timeFinish: timeFinish.getTime(),
            timeOffsetFinish: timeFinish.getTimezoneOffset(),
            finished: true,
          },
        }
      ).exec();
  }

  async addScores(
    report: Report,
    performanceScore: number,
    accessibilityScore: number,
    bestPracticeScore: number,
    seoScore: number,
    pwaScore: number
  ) {
    await this.reportModel
      .updateOne(
        { _id: report._id },
        {
          $set: {
            performanceScore: performanceScore,
            accessibilityScore: accessibilityScore,
            bestPracticeScore: bestPracticeScore,
            seoScore: seoScore,
            pwaScore: pwaScore,
          },
        }
      ).exec();
  }

  async addLighthouseLhrGzip(report: Report, lighthouseLhrGzip: Buffer) {
    await this.reportModel
      .updateOne(
        { _id: report._id },
        {
          $set: {
            lighthouseLhrGzip: lighthouseLhrGzip,
          },
        }
      )
      .exec();
  }

  @Process()
  async reportGenerateLighthouseLhr(job: Job<Report>) {
    this.logger.debug('generateLighthouseLhr job recieved');
    const report = job.data;
    this.addStartTime(report);

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

    await chrome.kill();

    const lighthouseLhr = JSON.stringify(runnerResult.lhr);
    const lighthouseLhrGzip = await gzip(lighthouseLhr, { level: 9 });

    await this.addScores(
      report,
      runnerResult.lhr.categories.performance.score,
      runnerResult.lhr.categories.accessibility.score,
      runnerResult.lhr.categories['best-practices'].score,
      runnerResult.lhr.categories.seo.score,
      runnerResult.lhr.categories.pwa.score
    );
    await this.addLighthouseLhrGzip(report, lighthouseLhrGzip);
    await this.addFinishTime(report);

    const updatedReport = await this.reportModel.findById(report._id).exec();

    this.queueService.addJobToTaskExecutionUpdateScoresQueue(updatedReport);

    this.logger.debug('reportGenerateLighthouseLhr job finished');
  }
}
