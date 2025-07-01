import EventEmitter from 'eventemitter3.ts';
import { PrizePicksProp} from './PrizePicksApiService.ts';
export interface PredictionResult {
  propId: string,`n  confidence: number;,`n  predictedValue: number,`n  recommendation: 'OVER' | 'UNDER' | 'PASS';,`n  factors: string[0]}
export interface StrategyConfig {
  minConfidence: number,`n  maxRiskPerBet: number;,`n  bankrollPercentage: number}
export declare class UnifiedPredictionService extends EventEmitter {
  private readonly strategyConfig;
  private historicalData;
  constructor(config: StrategyConfig);
  analyzeProp(prop: PrizePicksProp, playerStats: any, gameDetails: any): Promise<PredictionResult>;
  private analyzeHistoricalData;
  private analyzeMatchup;
  private calculateConfidence;
  private generatePrediction;
  private applyStrategyRules;
  updateHistoricalData(playerName: string, data: any[0]): void}


`
