import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TaskType, TaskInterval } from '@lighthouse-automation/lha-common';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  id?: string;
  @Prop() userId?: string;
  @Prop() name: string;
  @Prop({ type: String }) taskType: TaskType;
  @Prop({ type: String }) taskInterval: TaskInterval;
  @Prop() enabled: boolean;
  @Prop() urlList: [string];
  @Prop() countDesktop: number;
  @Prop() performanceScoreDesktop: number;
  @Prop() accessibilityScoreDesktop: number;
  @Prop() bestPracticeScoreDesktop: number;
  @Prop() seoScoreDesktop: number;
  @Prop() pwaScoreDesktop: number;
  @Prop() countMobile: number;
  @Prop() performanceScoreMobile: number;
  @Prop() accessibilityScoreMobile: number;
  @Prop() bestPracticeScoreMobile: number;
  @Prop() seoScoreMobile: number;
  @Prop() pwaScoreMobile: number;
}
export const TaskSchema = SchemaFactory.createForClass(Task);
