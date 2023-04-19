import { Device } from "../enum/device.enum";

export interface ReportDto {
  _id?: string;
  taskId: string;
  taskExecutionId: string;
  formFactor: Device;
  timeCreate?: number;
  timeOffsetCreate?: number;
  timeStart?: number;
  timeOffsetStart?: number;
  timeFinish?: number;
  timeOffsetFinish?: number;
  finished?: boolean;
  url: string;
  performanceScore?: number;
  accessibilityScore?: number;
  bestPracticeScore?: number;
  seoScore?: number;
  pwaScore?: number;
}