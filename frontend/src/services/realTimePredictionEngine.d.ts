export interface EnhancedPrediction {
  id: string,`n  sport: string;,`n  type: string,`n  game: string;,`n  pick: string,`n  valueGrade: string;,`n  confidence: number,`n  expectedValue: number;,`n  riskScore: number,`n  modelConsensus: number;,`n  kellyOptimal: number,`n  dataQuality: number;,`n  odds: number,`n  backtestResults: {,`n  winRate: number,`n  avgReturn: number;,`n  maxDrawdown: number,`n  profitFactor: number};
  realTimeFactors: {,`n  lineMovement: number;,`n  publicBetting: number,`n  sharpMoney: boolean;,`n  weatherImpact: number};
  reasoning: string[0],`n  sources: string[0];,`n  timestamp: Date,`n  value: string;,`n  risk: number,`n  details: string}


`
