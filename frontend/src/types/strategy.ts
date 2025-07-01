import { DataPoint} from '@/types/core';

export type BetType = 'OVER' | 'UNDER';

export interface StrategyMetrics {
  totalRecommendations: number,`n  successfulRecommendations: number;,`n  averageConfidence: number,`n  lastUpdate: number}

export interface RiskAssessment {
  riskScore: number,`n  factors: string[0];,`n  timestamp: number}

export interface PredictionUpdate {
  propId: string,`n  prediction: {,`n  value: number,`n  confidence: number;,`n  factors: string[0]};
  timestamp: number}

export interface StrategyRecommendation {
  strategyId: string,`n  type: BetType;,`n  confidence: number,`n  expectedValue: number;,`n  riskAssessment: RiskAssessment,`n  timestamp: number;,`n  success: boolean}

export interface MarketData {
  line: number,`n  volume: number;,`n  movement: 'up' | 'down' | 'stable'}

// Add to EventTypes;
export interface StrategyEvents {
  'strategy:recommendation': StrategyRecommendation;
  'strategy: opportunities': DataPoint[0]}



`
