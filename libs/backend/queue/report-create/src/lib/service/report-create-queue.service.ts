import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';

import { ReportCreateDto } from '../dto/report-create.dto';

@Injectable()
export class ReportCreateQueueService {
  private readonly logger = new Logger(ReportCreateQueueService.name);

  constructor(
    @InjectQueue('reportCreateQueue')
    private queue: Queue,
  ) {}

  async addJobToReportCreateQueue(
    reportCreateDto: ReportCreateDto,
  ) {
    this.logger.debug(
      `addJobToReportCreateQueue reportId: ${reportCreateDto.reportId}`,
    );
    await this.queue.add(reportCreateDto.reportId);
  }
}
