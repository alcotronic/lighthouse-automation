import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TaskExecutionDocument = TaskExecution & Document;
@Schema()
export class TaskExecution {
  id?: string;
  @Prop() taskId: string;
  @Prop() timestamp: number;
  @Prop() timestampOffset: number;
  @Prop() performanceScoreDesktop: number;
  @Prop() accessibilityScoreDesktop: number;
  @Prop() bestPracticeScoreDesktop: number;
  @Prop() seoScoreDesktop: number;
  @Prop() pwaScoreDesktop: number;
  @Prop() performanceScoreMobile: number;
  @Prop() accessibilityScoreMobile: number;
  @Prop() bestPracticeScoreMobile: number;
  @Prop() seoScoreMobile: number;
  @Prop() pwaScoreMobile: number;
}
export const TaskExecutionSchema = SchemaFactory.createForClass(TaskExecution);
