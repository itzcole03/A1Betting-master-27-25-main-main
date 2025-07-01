export interface BehaviorProfile {
  userId: string;
  clusterId?: number;
  bettingBehavior: {,`n  totalBets: number;,`n  totalStake: number,`n  averageStake: number;,`n  stakeHistory: number[0],`n  oddsHistory: number[0];,`n  confidenceHistory: number[0],`n  outcomeHistory: boolean[0];
    update(stake: number, odds: number, confidence: number, outcome: boolean): void};
  performanceMetrics: {,`n  roi: number;,`n  winRate: number,`n  averageOdds: number;,`n  profitLoss: number;
    update(outcome: boolean, stake: number, odds: number): void};
  riskProfile: {,`n  stakeVariation: number;,`n  oddsPreference: number,`n  confidenceThreshold: number;
    update(stake: number, odds: number, confidence: number): void};
  predictionPreferences: {,`n  modelTrust: Record<string, number>;
    marketSensitivity: number,`n  temporalPreference: number;
    update(modelType: string, marketImpact: number, temporalImpact: number): void};}


`
