import { TaskInterval } from "../enum/task-interval.enum";
import { TaskType } from "../enum/task-type.enum";

export interface TaskCreateDto {
    name: string;
    taskType: TaskType;
    taskInterval: TaskInterval;
    enabled: boolean;
    urlList: string[];
  }