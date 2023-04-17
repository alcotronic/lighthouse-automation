export interface ReportTaskRun {
  _id: string;
  reportTaskId: string;
  timestamp: number;
  timestampOffset: number;
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
