import { TaskInterval, TaskType } from "@lighthouse-automation/common";

export type TaskCreateDto = {
  userId: string;
  name: string;
  taskType: TaskType;
  taskInterval: TaskInterval;
  enabled: boolean;
  urlList: string[];
}