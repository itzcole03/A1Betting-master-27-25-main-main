import * as tf from '@tensorflow/tfjs.ts';
interface KellyMetrics {
  fraction: number,`n  expectedValue: number;,`n  riskAdjustedReturn: number,`n  optimalStake: number;,`n  confidence: number,`n  uncertainty: number;,`n  volatility: number,`n  sharpeRatio: number;,`n  maxDrawdown: number,`n  winRate: number;,`n  profitFactor: number}
interface KellyConfig {
  maxFraction: number,`n  minConfidence: number;,`n  riskTolerance: number,`n  volatilityThreshold: number;,`n  drawdownLimit: number,`n  profitTarget: number;,`n  stopLoss: number,`n  positionSizing: {,`n  method: 'fixed' | 'dynamic' | 'adaptive',`n  baseSize: number;,`n  maxSize: number,`n  minSize: number};
  bankrollManagement: {,`n  method: 'fixed' | 'progressive' | 'adaptive';,`n  initialSize: number,`n  maxRiskPerTrade: number;,`n  maxDrawdown: number};}
export declare class KellyCriterion {
  private logger;
  private cache;
  private config;
  private state;
  private readonly CACHE_KEY;
  private readonly CACHE_TTL;
  constructor(config?: Partial<KellyConfig>);
  private initializeState;
  private loadState;
  private saveState;
  analyze(predictions: tf.Tensor, labels: tf.Tensor): Promise<KellyMetrics>;
  private calculateWinProbability;
  private calculateOdds;
  private calculateKellyFraction;
  private adjustKellyFraction;
  private calculateAdaptiveMultiplier;
  private calculateExpectedValue;
  private calculateRiskAdjustedReturn;
  private calculateOptimalStake;
  private calculateUncertainty;
  private calculateVolatility;
  private calculateSharpeRatio;
  private calculateMaxDrawdown;
  private calculateWinRate;
  private calculateProfitFactor;
  private calculateConfidence;
  shouldPlaceBet(metrics: KellyMetrics): boolean;
  getBetSize(metrics: KellyMetrics, bankroll: number): number;
  private calculateAdaptiveBetSize;
  updateState(betSize: number, outcome: number, profit: number, metrics: KellyMetrics): void}
export Record<string, any>;


`
