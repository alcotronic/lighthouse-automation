import { Device } from "../enum/device.enum";

export interface ReportDto {
  _id?: string;
  taskId: string;
  taskExecutionId: string;
  formFactor: Device;
  url: string;
}