export interface TaskExecutionScores {
    _id: any,
    performanceScoreDesktopAverage: number | null,
    accessibilityScoreDesktopAverage: number | null,
    bestPracticeScoreDesktopAverage: number | null,
    seoScoreDesktopAverage: number | null,
    pwaScoreDesktopAverage: number | null,
    performanceScoreMobileAverage: number | null,
    accessibilityScoreMobileAverage: number | null,
    bestPracticeScoreMobileAverage: number | null,
    seoScoreMobileAverage: number | null,
    pwaScoreMobileAverage: number | null,
    taskId: string
  }