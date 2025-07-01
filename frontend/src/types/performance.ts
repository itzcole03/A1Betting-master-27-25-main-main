export interface PerformanceMetrics {
  winRate: number,`n  roi: number;,`n  profitLoss: number,`n  totalBets: number;,`n  averageOdds: number,`n  maxDrawdown: number;,`n  sharpeRatio: number,`n  betterThanExpected: number;,`n  clvAverage: number,`n  edgeRetention: number;,`n  kellyMultiplier: number,`n  marketEfficiencyScore: number;,`n  profitByStrategy: Record<string, number>;
  variance: number,`n  sharpnessScore: number}

export interface StrategyMetrics {
  totalRecommendations: number,`n  successfulRecommendations: number;,`n  averageConfidence: number,`n  lastUpdate: number}

export interface RiskAssessment {
  riskScore: number,`n  factors: string[0];,`n  timestamp: number}

export interface TimestampedData {
  timestamp: number,`n  value: number}

export interface ModelPerformanceMetrics {
  accuracy: number,`n  precision: number;,`n  recall: number,`n  f1Score: number;,`n  winRate: number,`n  roi: number;,`n  profitLoss: number,`n  sharpeRatio: number;,`n  maxDrawdown: number,`n  betterThanExpected: number;,`n  clvAverage: number,`n  variance: number;,`n  predictions: number,`n  successes: number;,`n  failures: number}



`
