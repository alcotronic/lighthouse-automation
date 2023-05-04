export interface TaskExecutionDto {
  id: string;
  taskId: string;
  timestamp: number;
  timestampOffset: number;
  performanceScoreDesktop: number;
  accessibilityScoreDesktop: number;
  bestPracticeScoreDesktop: number;
  seoScoreDesktop: number;
  pwaScoreDesktop: number;
  performanceScoreMobile: number;
  accessibilityScoreMobile: number;
  bestPracticeScoreMobile: number;
  seoScoreMobile: number;
  pwaScoreMobile: number;
}
