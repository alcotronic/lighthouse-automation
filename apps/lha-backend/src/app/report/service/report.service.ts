import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job, Queue } from 'bull';
import { Model } from 'mongoose';
import { Report, ReportDocument } from '../schema/report';
import { ReportDto } from '@lighthouse-automation/lha-common';

@Processor('reportQueue')
@Injectable()
export class ReportService {
  constructor(
    @InjectModel('report') private reportModel: Model<ReportDocument>,
    @InjectQueue('reportQueue') private reportQueue: Queue,
    @InjectQueue('taskExecutionUpdateAverageQueue')
    private taskExecutionUpdateAverageQueue: Queue,
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
    const report = await this.reportModel.find({ taskExecutionId: taskExecutionId }).exec();
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
        },
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
        },
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
    pwaScore: number,
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
        },
      )
      .exec();
    return reportSaved;
  }

  @Process()
  async processReport(job: Job<Report>) {
    console.info('processReport job recieved');
    //console.info(job);
    const report = job.data;
    console.info(report);
    await this.addStartTime(report);
    //await this.reportLighthouseQueue.add(report);
    /* const reportLighthouse = await this.client
      .send<any>({ cmd: 'lighthouse' }, report)
      .toPromise()
      .then((reportLighthouse: ReportLighthouse) => {
        return reportLighthouse;
      });
    await this.addScores(
      report,
      reportLighthouse.performanceScore,
      reportLighthouse.accessibilityScore,
      reportLighthouse.bestPracticeScore,
      reportLighthouse.seoScore,
      reportLighthouse.pwaScore,
    );
    await this.reportTaskRunUpdateAverageQueue.add(report);
    await this.addFinishTime(report); */
    console.info('processReport job finished');
    return {};
  }
}
