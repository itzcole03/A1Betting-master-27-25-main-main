import React from 'react.ts';
export interface StrategyRecommendation {
  strategyId: string,`n  strategyName: string;,`n  confidence: number,`n  expectedReturn: number;,`n  riskLevel: 'low' | 'medium' | 'high',`n  recommendation: string;,`n  reasoning: string[0],`n  data: {,`n  winProbability: number,`n  expectedValue: number;,`n  kellyFraction: number,`n  sharpeRatio: number;,`n  maxDrawdown: number};
  timeframe: string,`n  sport: string;,`n  lastUpdated: number}
interface Props {
  recommendations?: StrategyRecommendation[0];
  showDebug?: boolean;}
declare const UnifiedStrategyEngineDisplay: React.FC<Props>;
export default UnifiedStrategyEngineDisplay;


`
