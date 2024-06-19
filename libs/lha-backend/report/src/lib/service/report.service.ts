import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bull';
import { Model } from 'mongoose';
import { gzip, ungzip } from 'node-gzip';
import puppeteer from 'puppeteer-core';
import {
  Config,
  RunnerResult,
  ScreenEmulationSettings,
} from 'lighthouse';
import lighthouse from 'lighthouse/core/index.cjs';

import { Device, ReportDto } from '@lighthouse-automation/lha-common';

import { Report, ReportDocument } from '../schema/report';
import { ReportGenerateMessage } from '@lighthouse-automation/lha-backend/queue/report-generate-queue';
import { ExecutionScoreUpdateQueueService } from '@lighthouse-automation/lha-backend/queue/execution-score-update-queue';

type Scores = {
  performanceScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  seoScore: number;
  pwaScore: number;
};

@Processor('reportGenerateQueue')
@Injectable()
export class ReportService {
  private readonly logger = new Logger(ReportService.name);

  constructor(
    @InjectModel('report') private reportModel: Model<ReportDocument>,
    private executionScoreUpdateQueueService: ExecutionScoreUpdateQueueService,
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
      .findByIdAndUpdate(
        { _id: report._id },
        {
          $set: {
            timeStart: timeStart.getTime(),
            timeOffsetStart: timeStart.getTimezoneOffset(),
          },
        },
      )
      .exec();
  }

  async addFinishTime(report: Report) {
    const timeFinish = new Date();
    await this.reportModel
      .findByIdAndUpdate(
        { _id: report._id },
        {
          $set: {
            timeFinish: timeFinish.getTime(),
            timeOffsetFinish: timeFinish.getTimezoneOffset(),
            finished: true,
          },
        },
      )
      .exec();
  }

  async addScores(report: Report, scores: Scores) {
    this.logger.debug(`addScoreces report._id: ${report._id}`);
    const result = await this.reportModel
      .findByIdAndUpdate(
        { _id: report._id },
        {
          $set: {
            performanceScore: scores.performanceScore,
            accessibilityScore: scores.accessibilityScore,
            bestPracticeScore: scores.bestPracticesScore,
            seoScore: scores.seoScore,
            pwaScore: scores.pwaScore,
          },
        },
      )
      .exec();
    return result;
  }

  async addLighthouseLhrGzip(report: Report, lighthouseLhrGzip: Buffer) {
    await this.reportModel
      .findByIdAndUpdate(
        { _id: report._id },
        {
          $set: {
            lighthouseLhrGzip: lighthouseLhrGzip,
          },
        },
      )
      .exec();
  }

  async addLighthouseHtmlGzip(report: Report, lighthouseHtmlGzip: Buffer) {
    await this.reportModel
      .findByIdAndUpdate(
        { _id: report._id },
        {
          $set: {
            lighthouseHtmlGzip: lighthouseHtmlGzip,
          },
        },
      )
      .exec();
  }

  async unzipHtml(report: Report) {
    const htmlBuffer = await ungzip(report.lighthouseHtmlGzip);
    return htmlBuffer.toString();
  }

  async unzipLhr(report: Report) {
    const lhrBuffer = await ungzip(report.lighthouseLhrGzip);
    return JSON.parse(lhrBuffer.toString());
  }

  extractScores(runnerResult: RunnerResult): Scores {
    const scores: Scores = {
      performanceScore: 0,
      accessibilityScore: 0,
      bestPracticesScore: 0,
      seoScore: 0,
      pwaScore: 0,
    };

    try {
      scores.performanceScore =
        runnerResult.lhr.categories['performance']?.score ?? 0;
      scores.accessibilityScore =
        runnerResult.lhr.categories['accessibility']?.score ?? 0;
      scores.bestPracticesScore =
        runnerResult.lhr.categories['best-practices']?.score ?? 0;
      scores.seoScore = runnerResult.lhr.categories['seo']?.score ?? 0;
      scores.pwaScore = runnerResult.lhr.categories['pwa']?.score ?? 0;
    } catch (error) {
      this.logger.debug(`extractScores Error: ${error}`);
    }

    return scores;
  }

  @Process({ concurrency: 1 })
  async reportGenerateLighthouseLhr(job: Job<ReportGenerateMessage>) {
    this.logger.debug('generateLighthouseLhr job recieved');

    const report = await this.findById(job.data.reportId);

    const screenEmulationConfig: ScreenEmulationSettings = {
      width: report.formFactor === Device.DESKTOP ? 1920 : 360,
      height: report.formFactor === Device.DESKTOP ? 1080 : 800,
      deviceScaleFactor: 0,
      mobile: report.formFactor !== Device.DESKTOP,
      disabled: false,
    };

    const config: Config = {
      extends: 'lighthouse:default',
      settings: {
        formFactor: report.formFactor === Device.DESKTOP ? 'desktop' : 'mobile',
        screenEmulation: screenEmulationConfig,
        output: ['html'],
      },
    };

    this.addStartTime(report);

    const browser = await puppeteer.launch({
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      headless: false,
    });
    const page = await browser.newPage();
    const runnerResult: RunnerResult = await lighthouse(
      report.url,
      undefined,
      config,
      page,
    );

    await browser.close();
    
    const scores = this.extractScores(runnerResult);

    await this.addScores(report, scores);
    await this.addLighthouseLhrGzip(
      report,
      await gzip(JSON.stringify(runnerResult.lhr), {
        level: 9,
      }),
    );
    await this.addLighthouseHtmlGzip(
      report,
      await gzip(runnerResult.report[0], {
        level: 9,
      }),
    );

    await this.addFinishTime(report);

    const updatedReport = await this.reportModel.findById(report._id).exec();

    this.executionScoreUpdateQueueService.addJobToExecutionScoreUpdateQueue({
      reportId: report._id,
      taskId: report.taskId,
      taskExecutionId: report.taskExecutionId
    });

    this.logger.debug('generateLighthouseLhr job finished');
  }
}
