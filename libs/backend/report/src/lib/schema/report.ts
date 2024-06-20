import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Device } from '@lighthouse-automation/common';

export type ReportDocument = Report & Document;

@Schema()
export class Report {
  _id?: string;
  @Prop() taskId: string;
  @Prop() taskExecutionId: string;
  @Prop({ type: String }) formFactor: Device;
  @Prop() timeCreate: number;
  @Prop() timeOffsetCreate: number;
  @Prop() timeStart: number;
  @Prop() timeOffsetStart: number;
  @Prop() timeFinish: number;
  @Prop() timeOffsetFinish: number;
  @Prop() finished: boolean;
  @Prop() url: string;
  @Prop() performanceScore: number;
  @Prop() accessibilityScore: number;
  @Prop() bestPracticeScore: number;
  @Prop() seoScore: number;
  @Prop() pwaScore: number;
  @Prop() lighthouseLhr: string;
  @Prop() lighthouseLhrGzip: Buffer;
  @Prop() lighthouseHtmlGzip: Buffer;
  @Prop() lighthouseCsvGzip: Buffer;
  @Prop() lighthouseJsonGzip: Buffer;
}
export const ReportSchema = SchemaFactory.createForClass(Report);
