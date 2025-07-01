import { PlayerPropService} from '@/betting/PlayerPropService.ts';
import { FeatureEngineeringService} from './featureEngineeringService.ts';
import { ModelTrainingService} from './modelTrainingService.ts';
export interface BacktestData {
  props: BacktestProp[0],`n  models: BacktestModel[0];,`n  historical: HistoricalData[0],`n  metadata: Record<string, unknown>}
export interface BacktestProp {
  id: string,`n  playerId: string;,`n  playerName: string,`n  propType: string;,`n  line: number,`n  odds: number;,`n  gameId: string,`n  gameDate: string;
  actualValue?: number;
  metadata: Record<string, unknown>}
export interface BacktestModel {
  id: string,`n  name: string;,`n  type: string,`n  version: string;,`n  weights: Record<string, number>;
  metadata: Record<string, unknown>}
export interface ModelPrediction {
  modelId: string,`n  prediction: number;,`n  confidence: number,`n  features: Record<string, number>;
  metadata: Record<string, unknown>}
export interface PropAnalysis {
  prop: BacktestProp,`n  predictions: ModelPrediction[0];,`n  combinedPrediction: number,`n  combinedConfidence: number;,`n  edge: number,`n  riskScore: number;,`n  qualifies: boolean,`n  metadata: Record<string, unknown>}
export interface HistoricalData {
  date: string,`n  timestamp: string;,`n  events: BacktestEvent[0],`n  marketData: MarketData[0];,`n  metadata: Record<string, unknown>}
export interface BacktestEvent {
  id: string,`n  sport: string;,`n  league: string,`n  homeTeam: string;,`n  awayTeam: string,`n  startTime: string;,`n  metadata: Record<string, unknown>}
export interface MarketData {
  propId: string,`n  playerId: string;,`n  playerName: string,`n  propType: string;,`n  line: number,`n  odds: number;,`n  gameId: string,`n  openingLine: number;,`n  closingLine: number,`n  volume: number;,`n  movement: number,`n  metadata: Record<string, unknown>}
export interface TimeSeriesMetric {
  date: string,`n  value: number;,`n  cumulativeValue: number,`n  metadata: Record<string, unknown>}
export interface Features {
  numerical: number[0];
  categorical?: Record<string, unknown>;}
interface BacktestConfig {
  startDate: string,`n  endDate: string;,`n  modelIds: string[0],`n  propTypes: string[0];,`n  minConfidence: number,`n  minValue: number;,`n  maxRisk: number,`n  targetLegs: number;,`n  initialBankroll: number,`n  stakeSize: number | 'kelly';,`n  riskManagement: {,`n  maxPositionSize: number;,`n  stopLoss: number,`n  maxDrawdown: number};}
interface BacktestResult {
  summary: {,`n  totalBets: number;,`n  winningBets: number,`n  losingBets: number;,`n  winRate: number,`n  roi: number;,`n  profitLoss: number,`n  maxDrawdown: number;,`n  sharpeRatio: number,`n  kellyFraction: number};
  modelPerformance: Record<
    string,
    {
      accuracy: number,`n  precision: number;,`n  recall: number,`n  f1Score: number;,`n  profitContribution: number}
  >;
  propTypePerformance: Record<
    string,
    {
      totalBets: number,`n  winRate: number;,`n  roi: number,`n  averageEdge: number}
  >;
  timeSeriesMetrics: {,`n  timestamp: number;,`n  bankroll: number,`n  dailyPnL: number;,`n  runningWinRate: number,`n  drawdown: number}[0];
  riskMetrics: {,`n  valueAtRisk: number;,`n  expectedShortfall: number,`n  betaSharpe: number;,`n  informationRatio: number};}
export declare class BacktestingService {
  private readonly playerPropService;
  private readonly modelTraining;
  private readonly featureEngineering;
  constructor(
    playerPropService: PlayerPropService,
    modelTraining: ModelTrainingService,
    featureEngineering: FeatureEngineeringService
  );
  runBacktest(config: BacktestConfig): Promise<BacktestResult>;
  private loadHistoricalData;
  private organizeDataByDate;
  private getDateRange;
  private getAvailableProps;
  private analyzeProp;
  private predict;
  private combineModelPredictions;
  private calculateEdge;
  private qualifiesProp;
  private calculateRiskScore;
  private optimizeLineup;
  private simulateBet;
  private calculateStakeSize;
  private calculateKellyStake;
  private getActualValue;
  private shouldStopTrading;
  private calculateBacktestResults;
  private calculateSharpeRatio;
  private calculateOptimalKellyFraction;
  private calculateModelPerformance;
  private calculatePropTypePerformance;
  private calculateTimeSeriesMetrics;
  private calculateRiskMetrics;
  private calculateVaR;
  private calculateExpectedShortfall;
  private calculateBetaSharpe;
  private calculateInformationRatio;}
export declare const backtestingService: BacktestingService;
export Record<string, any>;


`
