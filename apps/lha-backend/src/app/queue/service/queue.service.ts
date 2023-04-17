import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { TaskExecution } from '../../task-execution/schema/task-execution';
import { Report } from '../../report/schema/report';

@Injectable()
export class QueueService {
  private readonly logger = new Logger(QueueService.name);

  constructor(
    @InjectQueue('reportGenerateLighthouseLhrQueue')
    private reportGenerateLighthouseLhrQueue: Queue,
    @InjectQueue('taskExecutionUpdateScoresQueue')
    private taskExecutionUpdateScoresQueue: Queue,
    @InjectQueue('taskUpdateAverageScoresQueue')
    private taskUpdateAverageScoresQueue: Queue
  ) {}

  async addJobToReportGenerateLighthouseLhrQueue(report: Report) {
    this.logger.debug('addJobToReportGenerateLighthouseLhrQueue report:');
    this.logger.debug('report.id: ' + report._id);
    this.logger.debug('report.taskId: ' + report.taskId);
    this.logger.debug('report.taskExecutionId: ' + report.taskExecutionId);
    await this.reportGenerateLighthouseLhrQueue.add(report);
  }

  async addJobToTaskExecutionUpdateScoresQueue(report: Report) {
    this.logger.debug('addJobToTaskExecutionUpdateScoresQueue report:');
    this.logger.debug('report.id: ' + report._id);
    this.logger.debug('report.taskId: ' + report.taskId);
    this.logger.debug('report.taskExecutionId: ' + report.taskExecutionId);
    await this.taskExecutionUpdateScoresQueue.add(report);
  }

  async addJobToTaskUpdateAverageScoresQueue(taskExecution: TaskExecution) {
    this.logger.debug('addJobToTaskUpdateAverageScoresQueue taskExecution:');
    this.logger.debug(taskExecution);
    await this.taskUpdateAverageScoresQueue.add(taskExecution);
  }
}
