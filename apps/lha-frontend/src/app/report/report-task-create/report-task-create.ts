export enum ReportTaskType {
  MANUAL_REPORT = 'MANUAL_REPORT',
  SCHEDULED_REPORT = 'SCHEDULED_REPORT'
}

export enum ReportTaskInterval {
  NEVER = 'NEVER',
  EVERY_10_MINUTES = 'EVERY_10_MINUTES',
  EVERY_HOUR = 'EVERY_HOUR',
  EVERY_DAY = 'EVERY_DAY',
  EVERY_WEEKEND = 'EVERY_WEEKEND',
  EVERY_MONTH = 'EVERY_MONTH'
}

export interface ReportTaskCreateDto {
  name: string;
  reportType: ReportTaskType;
  reportTaskInterval: ReportTaskInterval;
  enabled: boolean;
  urlList: Array<string>;
}
