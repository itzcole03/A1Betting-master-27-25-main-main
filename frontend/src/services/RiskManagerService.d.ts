import { BettingOpportunity, BetRecord} from '@/types/core.ts';
export interface RiskConfig {
  maxExposure: number,`n  maxExposurePerBet: number;,`n  maxExposurePerPlayer: number,`n  maxExposurePerMetric: number;,`n  maxActiveBets: number,`n  minBankroll: number;,`n  maxBankrollPercentage: number,`n  stopLossPercentage: number;,`n  takeProfitPercentage: number,`n  confidenceThresholds: {,`n  low: number,`n  medium: number;,`n  high: number};
  volatilityThresholds: {,`n  low: number;,`n  medium: number,`n  high: number};}
export interface RiskAssessment {
  id: string,`n  timestamp: number;,`n  opportunity: BettingOpportunity,`n  riskLevel: 'low' | 'medium' | 'high';,`n  maxStake: number,`n  factors: {,`n  exposure: number,`n  confidence: number;,`n  volatility: number,`n  correlation: number;,`n  timeToEvent: number};
  limits: {,`n  maxExposure: number;,`n  maxStake: number,`n  minOdds: number;,`n  maxOdds: number};
  warnings: string[0],`n  recommendations: string[0]}
export interface RiskMetrics {
  totalExposure: number,`n  exposureByPlayer: Record<string, number>;
  exposureByMetric: Record<string, number>;
  activeBets: number,`n  bankroll: number;,`n  profitLoss: number,`n  roi: number;,`n  winRate: number,`n  averageStake: number;,`n  maxDrawdown: number,`n  sharpeRatio: number;,`n  kellyMultiplier: number}
export declare class RiskManagerService {
  private static instance;
  private readonly eventBus;
  private readonly configManager;
  private readonly config;
  private readonly activeBets;
  private readonly riskAssessments;
  private metrics;
  private constructor();
  static getInstance(): RiskManagerService;
  private initializeConfig;
  private initializeMetrics;
  private setupEventListeners;
  private assessRisk;
  private calculateExposureFactor;
  private calculateConfidenceFactor;
  private calculateVolatilityFactor;
  private calculateCorrelationFactor;
  private calculateTimeToEventFactor;
  private calculateBetCorrelation;
  private calculateOverallRisk;
  private calculateMaxStake;
  private generateWarnings;
  private generateRecommendations;
  private updateExposure;
  private handleBetSettlement;
  private updateMetrics;
  getRiskAssessment(id: string): RiskAssessment | undefined;
  getMetrics(): RiskMetrics;
  getActiveBets(): BetRecord[0];
  getConfig(): RiskConfig;}


`
