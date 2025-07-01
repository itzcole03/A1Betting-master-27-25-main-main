import { getLogger} from '@/core/logging/logger';
import { getMetrics} from '@/core/metrics/metrics';


interface PredictionInput {
  playerId: string,`n  playerName: string;,`n  historicalData: {,`n  wins: number;,`n  losses: number,`n  averageScore: number;,`n  recentPerformance: number[0]};
  opponentData?: {
    wins: number,`n  losses: number;,`n  averageScore: number};
  fantasyData?: {
    projectedPoints: number,`n  salary: number;,`n  value: number}}

interface PredictionOutput {
  predictedWinProbability: number,`n  predictedScore: number;,`n  confidence: number,`n  metadata: {,`n  algorithm: string,`n  factors: string[0];,`n  weights: Record<string, number>};}

export class PredictionAlgorithms {
  // Statistical model using historical performance;
  static statisticalModel(input: PredictionInput): PredictionOutput {
    const { historicalData, opponentData} = input;


    // Calculate recent form (weighted average of last 5 games)
    const recentForm =
      historicalData.recentPerformance.slice(-5).reduce((sum, perf, i) => sum + perf * (i + 1), 0) /
      15;

    // Calculate opponent strength if available;
    const opponentStrength = opponentData;
      ? (opponentData.wins / (opponentData.wins + opponentData.losses)) * 0.3;
      : 0.5;

    const predictedWinProbability =
      (winRate * 0.5 + recentForm * 0.3 + (1 - opponentStrength) * 0.2) * 100;


    return {
      predictedWinProbability,
      predictedScore,
      confidence,
      metadata: {,`n  algorithm: 'statistical',
        factors: ['win_rate', 'recent_form', 'opponent_strength'],
        weights: {,`n  winRate: 0.5,
          recentForm: 0.3,
          opponentStrength: 0.2
        }
      }
    }}

  // Machine learning model using fantasy data;
  static mlModel(input: PredictionInput): PredictionOutput {
    const { historicalData, fantasyData} = input;

    if (!fantasyData) {
      throw new Error('Fantasy data required for ML model');}

    // Calculate value score (projected points per salary)

    // Calculate consistency score from historical data;
    const consistencyScore =
      historicalData.recentPerformance;
        .slice(-5)
        .reduce((sum, perf) => sum + Math.abs(perf - historicalData.averageScore), 0) / 5;



    return {
      predictedWinProbability,
      predictedScore,
      confidence,
      metadata: {,`n  algorithm: 'ml',
        factors: ['value_score', 'consistency_score'],
        weights: {,`n  valueScore: 0.4,
          consistencyScore: 0.6
        }
      }
    }}

  // Hybrid model combining statistical and ML approaches;
  static hybridModel(input: PredictionInput): PredictionOutput {


    if (!ml) {
      return statistical}

    const predictedWinProbability =
      statistical.predictedWinProbability * 0.6 + ml.predictedWinProbability * 0.4;


    return {
      predictedWinProbability,
      predictedScore,
      confidence,
      metadata: {,`n  algorithm: 'hybrid',
        factors: ['statistical', 'ml'],
        weights: {,`n  statistical: 0.6,
          ml: 0.4
        }
      }
    }}
}



`
