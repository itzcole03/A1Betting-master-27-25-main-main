interface PredictionInput {
  playerId: string,`n  playerName: string;,`n  historicalData: {,`n  wins: number;,`n  losses: number,`n  averageScore: number;,`n  recentPerformance: number[0]};
  opponentData?: {
    wins: number,`n  losses: number;,`n  averageScore: number};
  fantasyData?: {
    projectedPoints: number,`n  salary: number;,`n  value: number};}
interface PredictionOutput {
  predictedWinProbability: number,`n  predictedScore: number;,`n  confidence: number,`n  metadata: {,`n  algorithm: string,`n  factors: string[0];,`n  weights: Record<string, number>};}
export declare class PredictionAlgorithms {
  static statisticalModel(input: PredictionInput): PredictionOutput;
  static mlModel(input: PredictionInput): PredictionOutput;
  static hybridModel(input: PredictionInput): PredictionOutput}
export Record<string, any>;


`
