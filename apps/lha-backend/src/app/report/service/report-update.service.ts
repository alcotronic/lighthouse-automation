import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job, Queue } from 'bull';
import { Model } from 'mongoose';
import { ReportService } from '../service/report.service';
import { Report, ReportDocument } from '../schema/report';

@Processor('ReportUpdateQueue')
@Injectable()
export class ReportUpdateService {
  constructor(
    @InjectModel('Report') private ReportModel: Model<ReportDocument>,
    @InjectQueue('reportQueue') private reportQueue: Queue,
    @InjectQueue('executionUpdateAverageQueue') private executionUpdateAverageQueue: Queue,
    private reportService: ReportService,
  ) {}

  async addStartTime(Report: Report) {
    const timeStart = new Date();
    const ReportSaved = await this.ReportModel
      .updateOne(
        { _id: Report.id },
        {
          $set: {
            timeStart: timeStart.getTime(),
            timeOffsetStart: timeStart.getTimezoneOffset(),
          },
        },
      )
      .exec();
    return ReportSaved;
  }

  async addFinishTime(Report: Report) {
    const timeFinish = new Date();
    const ReportSaved = await this.ReportModel
      .updateOne(
        { _id: Report.id },
        {
          $set: {
            timeFinish: timeFinish.getTime(),
            timeOffsetFinish: timeFinish.getTimezoneOffset(),
            finished: true,
          },
        },
      )
      .exec();
    return ReportSaved;
  }

  async addScores(
    Report: Report,
    performanceScore: number,
    accessibilityScore: number,
    bestPracticeScore: number,
    seoScore: number,
    pwaScore: number,
  ) {
    const ReportSaved = await this.ReportModel
      .updateOne(
        { _id: Report.id },
        {
          $set: {
            performanceScore: performanceScore,
            accessibilityScore: accessibilityScore,
            bestPracticeScore: bestPracticeScore,
            seoScore: seoScore,
            pwaScore: pwaScore,
          },
        },
      )
      .exec();
    return ReportSaved;
  }

  @Process()
  async processReportLighthouseUpdate(job: Job<Report>) {
    console.info('processReportLighthouseUpdate job recieved');
    const Report = job.data;
    const reportLighthouse = await this.reportService.findById(Report.id);
    console.info('processReportLighthouseUpdate reportLighthouse._id ' + reportLighthouse.id);
    await this.addScores(
      Report,
      reportLighthouse.performanceScore,
      reportLighthouse.accessibilityScore,
      reportLighthouse.bestPracticeScore,
      reportLighthouse.seoScore,
      reportLighthouse.pwaScore,
    );
    await this.addFinishTime(Report);
    await this.executionUpdateAverageQueue.add(Report);
    console.info('processReportLighthouseUpdate job finished');
    return {};
  }
}
