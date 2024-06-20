import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ungzip } from 'node-gzip';

import { ReportDto } from '@lighthouse-automation/lha-common';

import { Report, ReportDocument } from '../schema/report';

@Injectable()
export class ReportService {
  private readonly logger = new Logger(ReportService.name);

  constructor(
    @InjectModel('report') private reportModel: Model<ReportDocument>,
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

  async unzipHtml(report: Report) {
    const htmlBuffer = await ungzip(report.lighthouseHtmlGzip);
    return htmlBuffer.toString();
  }

  async unzipLhr(report: Report) {
    const lhrBuffer = await ungzip(report.lighthouseLhrGzip);
    return JSON.parse(lhrBuffer.toString());
  }
}
