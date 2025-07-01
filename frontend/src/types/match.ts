export interface MatchPrediction {
  homeWinProbability: number,`n  awayWinProbability: number;,`n  drawProbability: number,`n  recommendedBet: {,`n  type: 'home' | 'away' | 'draw' | 'none',`n  stake: number;,`n  odds: number,`n  expectedValue: number;,`n  confidence: number};
  insights: {,`n  keyFactors: string[0];,`n  riskLevel: 'low' | 'medium' | 'high',`n  valueAssessment: string;,`n  modelConsensus: number}}



`
