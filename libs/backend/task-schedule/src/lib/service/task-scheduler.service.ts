import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { ReportGenerateQueueService } from '@lighthouse-automation/backend/queue/report-generate';
import { TaskExecutionService } from '@lighthouse-automation/backend/task-execution';
import { ReportService } from '@lighthouse-automation/backend/report';
import { Device, TaskInterval } from '@lighthouse-automation/common';

import { Task, TaskService } from '@lighthouse-automation/backend/task';


@Injectable()
export class TaskSchedulerService {
  constructor(
    private taskService: TaskService,
    private reportService: ReportService,
    private taskExecutionService: TaskExecutionService,
    private queueService: ReportGenerateQueueService
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async generateTenMinuteReport() {
    const tasks = await this.taskService.findByTaskIntervalAndEnabled(TaskInterval.EVERY_10_MINUTES);
    console.info('Running every 10 minutes tasks.');
    await this.createExecutionsForTasks(tasks);
    console.info('Finished every 10 minutes tasks.');
  }

  @Cron(CronExpression.EVERY_HOUR)
  async generateHourlyReport() {
    const tasks = await this.taskService.findByTaskIntervalAndEnabled(TaskInterval.EVERY_HOUR);
    console.info('Running hourly tasks.');
    await this.createExecutionsForTasks(tasks);
    console.info('Finished hourly tasks.');
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async generateDaylyReport() {
    const tasks = await this.taskService.findByTaskIntervalAndEnabled(TaskInterval.EVERY_DAY);
    console.info('Running dayly tasks.');
    await this.createExecutionsForTasks(tasks);
    console.info('Finished dayly tasks.');
  }

  @Cron(CronExpression.EVERY_WEEKEND)
  async generateWeekendReport() {
    const tasks = await this.taskService.findByTaskIntervalAndEnabled(TaskInterval.EVERY_WEEKEND);
    console.info('Running weekend tasks.');
    await this.createExecutionsForTasks(tasks);
    console.info('Finished weekend tasks.');
  }

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async generateMontlyReport() {
    const tasks = await this.taskService.findByTaskIntervalAndEnabled(TaskInterval.EVERY_MONTH);
    console.info('Running monthly tasks.');
    await this.createExecutionsForTasks(tasks);
    console.info('Finished monthly tasks.');
  }

  async createExecutionsForTask(task: Task) {
    const taskExecution = await this.taskExecutionService.create(task._id);
    task.urlList.forEach(async (url: string) => {
      const reportDesktop = await this.reportService.create({
        taskId: task.id,
        taskExecutionId: taskExecution._id,
        formFactor: Device.DESKTOP,
        url: url,
      });
      const reportMobile = await this.reportService.create({
        taskId: task.id,
        taskExecutionId: taskExecution._id,
        formFactor: Device.MOBILE,
        url: url,
      });
      this.queueService.addJobToReportGenerateQueue(reportDesktop);
      this.queueService.addJobToReportGenerateQueue(reportMobile);
    });
    return {};
  }

  async createExecutionsForTasks(tasks: Task[]) {
    tasks.forEach(async (task: Task) => {
      await this.createExecutionsForTask(task);
    });
    return {};
  }
}
