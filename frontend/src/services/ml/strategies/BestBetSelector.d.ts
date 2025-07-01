import * as tf from '@tensorflow/tfjs.ts';
interface BetMetrics {
  accuracy: number,`n  roi: number;,`n  expectedValue: number,`n  confidence: number;,`n  riskLevel: number,`n  edge: number}
interface BetSelection {
  selectedBets: number[0],`n  metrics: BetMetrics;,`n  confidenceThreshold: number,`n  edgeThreshold: number}
export declare class BestBetSelector {
  private logger;
  private kellyCriterion;
  private readonly minConfidence;
  private readonly minEdge;
  private readonly maxRiskLevel;
  constructor();
  selectBets(predictions: tf.Tensor, labels: tf.Tensor): Promise<BetSelection>;
  private calculateBetMetrics;
  private calculateAccuracy;
  private calculateROI;
  private calculateExpectedValue;
  private calculateConfidence;
  private calculateRiskLevel;
  private calculateEdge;
  private calculateStandardDeviation;
  private calculateActualProbability;
  private filterBets;
  private calculateEdgeForBet;
  getBetRecommendations(
    selection: BetSelection,
    bankroll: number
  ): Array<{
    betIndex: number,`n  stake: number;,`n  confidence: number,`n  expectedValue: number}>;}
export Record<string, any>;


`
