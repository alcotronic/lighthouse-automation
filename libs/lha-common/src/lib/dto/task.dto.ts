import { TaskInterval } from '../enum/task-interval.enum';
import { TaskType } from '../enum/task-type.enum';

export interface TaskDto {
  _id: string;
  name: string;
  taskType: TaskType;
  taskInterval: TaskInterval;
  enabled: boolean;
  urlList: string[];
  countDesktop: number;
  performanceScoreDesktop: number;
  accessibilityScoreDesktop: number;
  bestPracticeScoreDesktop: number;
  seoScoreDesktop: number;
  pwaScoreDesktop: number;
  countMobile: number;
  performanceScoreMobile: number;
  accessibilityScoreMobile: number;
  bestPracticeScoreMobile: number;
  seoScoreMobile: number;
  pwaScoreMobile: number;
}
