import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bull';
import { Model } from 'mongoose';
import { gzip } from 'node-gzip';
import { Config, RunnerResult, ScreenEmulationSettings } from 'lighthouse';
import lighthouse from 'lighthouse/core/index.cjs';
import puppeteer from 'puppeteer-core';

import { ReportGenerateMessage } from '@lighthouse-automation/backend/queue/report-generate-queue';
import { ExecutionScoreUpdateQueueService } from '@lighthouse-automation/backend/queue/execution-score-update-queue';
import { Device } from '@lighthouse-automation/common';

import {
  Report,
  ReportDocument,
} from '@lighthouse-automation/backend/report';

type Scores = {
  performanceScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  seoScore: number;
  pwaScore: number;
};

@Processor('reportGenerateQueue')
@Injectable()
export class ReportGeneratorService {
  private readonly logger = new Logger(ReportGeneratorService.name);

  constructor(
    @InjectModel('report') private reportModel: Model<ReportDocument>,
    private executionScoreUpdateQueueService: ExecutionScoreUpdateQueueService,
  ) {}

  addStartTime(report: Report) {
    const timeStart = new Date();
    report.timeStart = timeStart.getTime();
    report.timeOffsetStart = timeStart.getTimezoneOffset();
  }

  addFinishTime(report: Report) {
    const timeFinish = new Date();
    report.timeFinish = timeFinish.getTime();
    report.timeOffsetFinish = timeFinish.getTimezoneOffset();
    report.finished = true;
  }

  addScores(report: Report, scores: Scores) {
    report.performanceScore = scores.performanceScore;
    report.accessibilityScore = scores.accessibilityScore;
    report.bestPracticeScore = scores.bestPracticesScore;
    report.seoScore = scores.seoScore;
    report.pwaScore = scores.pwaScore;
  }

  addLighthouseLhrGzip(report: Report, lighthouseLhrGzip: Buffer) {
    report.lighthouseLhrGzip = lighthouseLhrGzip;
  }

  addLighthouseHtmlGzip(report: Report, lighthouseHtmlGzip: Buffer) {
    report.lighthouseHtmlGzip = lighthouseHtmlGzip;
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

    const report = await this.reportModel.findById(job.data.reportId).exec();

    this.addStartTime(report);

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

    this.addScores(report, scores);
    this.addLighthouseLhrGzip(
      report,
      await gzip(JSON.stringify(runnerResult.lhr), {
        level: 9,
      }),
    );
    this.addLighthouseHtmlGzip(
      report,
      await gzip(runnerResult.report[0], {
        level: 9,
      }),
    );
    this.addFinishTime(report);

    await report.save();

    this.executionScoreUpdateQueueService.addJobToExecutionScoreUpdateQueue({
      reportId: report._id,
      taskId: report.taskId,
      taskExecutionId: report.taskExecutionId,
    });

    this.logger.debug('generateLighthouseLhr job finished');
  }
}
