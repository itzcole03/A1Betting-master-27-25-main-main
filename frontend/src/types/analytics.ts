export interface PerformanceMetrics {
  accuracy: number,`n  profitLoss: number;,`n  precision: number,`n  recall: number;,`n  timestamp: string}

export interface TrendDelta {
  accuracyDelta: number,`n  precisionDelta: number;,`n  recallDelta: number,`n  profitLossDelta: number;,`n  period: string,`n  timestamp: string}

export interface RiskFactor {
  name: string,`n  severity: 'low' | 'medium' | 'high';,`n  impact: number,`n  description: string}

export interface RiskProfile {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH',`n  recommendation: string;,`n  factors: string[0],`n  timestamp: string;,`n  severity: number}

export interface ExplainabilityMap {
  featureName: string,`n  importance: number;,`n  impact: number,`n  direction: 'positive' | 'negative';,`n  description: string}

export interface ModelMetadata {
  modelId: string,`n  version: string;,`n  trainingDate: string,`n  features: string[0];,`n  performance: {,`n  accuracy: number;,`n  precision: number,`n  recall: number;,`n  f1Score: number}}

export interface AnalyticsState {
  metrics: PerformanceMetrics | null,`n  trendDelta: TrendDelta | null;,`n  riskProfile: RiskProfile | null,`n  explainabilityMap: ExplainabilityMap[0] | null;,`n  modelMetadata: ModelMetadata | null,`n  isLoading: boolean;,`n  error: string | null}



`
