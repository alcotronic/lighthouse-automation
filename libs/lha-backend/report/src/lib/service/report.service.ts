import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bull';
import { Model } from 'mongoose';
import { launch } from 'chrome-launcher';
import { gzip, ungzip } from 'node-gzip';
import lighthouse from 'lighthouse/core/index.cjs';
import { Config, Flags, ScreenEmulationSettings } from 'lighthouse';

import { QueueService } from '@lighthouse-automation/lha-backend/queue';
import { Device, ReportDto } from '@lighthouse-automation/lha-common';

import { Report, ReportDocument } from '../schema/report';

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

  async addLighthouseHtmlGzip(report: Report, lighthouseHtmlGzip: Buffer) {
    await this.reportModel
      .updateOne(
        { _id: report._id },
        {
          $set: {
            lighthouseHtmlGzip: lighthouseHtmlGzip,
          },
        }
      )
      .exec();
  }

  async addLighthouseJsonGzip(report: Report, lighthouseJsonGzip: Buffer) {
    await this.reportModel
      .updateOne(
        { _id: report._id },
        {
          $set: {
            lighthouseJsonGzip: lighthouseJsonGzip,
          },
        }
      )
      .exec();
  }

  async addLighthouseCsvGzip(report: Report, lighthouseCsvGzip: Buffer) {
    await this.reportModel
      .updateOne(
        { _id: report._id },
        {
          $set: {
            lighthouseCsvGzip: lighthouseCsvGzip,
          },
        }
      )
      .exec();
  }

  async unzipJson(report: Report) {
    const jsonBuffer = await ungzip(report.lighthouseJsonGzip);
    return jsonBuffer.toString();
  }

  async unzipHtml(report: Report) {
    const htmlBuffer = await ungzip(report.lighthouseHtmlGzip);
    return htmlBuffer.toString();
  }

  async unzipCsv(report: Report) {
    const csvBuffer = await ungzip(report.lighthouseCsvGzip);
    return csvBuffer.toString();
  }

  async unzipLhr(report: Report) {
    const lhrBuffer = await ungzip(report.lighthouseLhrGzip);
    return JSON.parse(lhrBuffer.toString());
  }

  @Process()
  async reportGenerateLighthouseLhr(job: Job<Report>) {
    this.logger.debug('generateLighthouseLhr job recieved');
    const report = job.data;
    this.addStartTime(report);

    const chrome = await launch({ chromeFlags: ['--headless'] });
    //const chrome = await launch();
    const flags: Flags = {
      port: chrome.port,
    };
    const screenEmulationConfig: ScreenEmulationSettings = {
      width: report.formFactor === Device.DESKTOP ? 1920 : 360,
      height: report.formFactor === Device.DESKTOP ? 1080 : 800,
      deviceScaleFactor: 0,
      mobile: report.formFactor === Device.DESKTOP ? false : true,
      disabled: false
    };
    const config: Config = {
      extends: 'lighthouse:default',
      settings: {
        formFactor: report.formFactor === Device.DESKTOP ? 'desktop' : 'mobile',
        screenEmulation: screenEmulationConfig,
        output: ['html', 'json', 'csv']
      }
    };
    const runnerResult = await lighthouse(report.url, flags, config);

    await chrome.kill();

    const lighthouseLhrGzip = await gzip(JSON.stringify(runnerResult.lhr), { level: 9 });
    const lighthouseHtmlGzip = await gzip(runnerResult.report[0], { level: 9 });
    const lighthouseJsonGzip = await gzip(runnerResult.report[2], { level: 9 });
    const lighthouseCsvGzip = await gzip(runnerResult.report[1], { level: 9 });

    await this.addScores(
      report,
      runnerResult.lhr.categories.performance.score,
      runnerResult.lhr.categories.accessibility.score,
      runnerResult.lhr.categories['best-practices'].score,
      runnerResult.lhr.categories.seo.score,
      runnerResult.lhr.categories.pwa.score
    );
    await this.addLighthouseLhrGzip(report, lighthouseLhrGzip);
    await this.addLighthouseHtmlGzip(report, lighthouseHtmlGzip);
    await this.addLighthouseCsvGzip(report, lighthouseJsonGzip);
    await this.addLighthouseJsonGzip(report, lighthouseCsvGzip);
    await this.addFinishTime(report);

    const updatedReport = await this.reportModel.findById(report._id).exec();

    this.queueService.addJobToTaskExecutionUpdateScoresQueue(updatedReport);

    this.logger.debug('reportGenerateLighthouseLhr job finished');
  }
}
