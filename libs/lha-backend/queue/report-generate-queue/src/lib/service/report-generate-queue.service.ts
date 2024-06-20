import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';

import { ReportGenerateMessage } from '../message/report-generate.message';

@Injectable()
export class ReportGenerateQueueService {
  private readonly logger = new Logger(ReportGenerateQueueService.name);

  constructor(
    @InjectQueue('reportGenerateQueue')
    private queue: Queue,
  ) {}

  async addJobToReportGenerateQueue(
    message: ReportGenerateMessage,
  ) {
    this.logger.debug(
      `addJobToReportGenerateQueue reportId: ${message.reportId}`,
    );
    await this.queue.add(message.reportId);
  }
}
