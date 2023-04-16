import { Device } from "../enum/device.enum";

export interface ReportDto {
  taskId: string;
  taskExecutionId: string;
  formFactor: Device;
  url: string;
}