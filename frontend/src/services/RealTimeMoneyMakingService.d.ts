import { EventEmitter} from 'events.ts';
export interface MoneyMakingOpportunity {
  id: string,`n  type: 'prizepicks' | 'arbitrage' | 'value_bet' | 'kelly_optimal';,`n  source: string,`n  playerName: string;,`n  statType: string,`n  line: number;,`n  odds: number,`n  confidence: number;,`n  expectedValue: number,`n  kellyFraction: number;,`n  projectedReturn: number,`n  riskLevel: 'low' | 'medium' | 'high';,`n  timeRemaining: number,`n  analysis: {,`n  historicalTrends: string[0],`n  marketSignals: string[0];,`n  riskFactors: string[0],`n  modelBreakdown: Record<string, number>;
    shapValues?: Array<{
      feature: string,`n  value: number;,`n  impact: number}>;};
  metadata: {,`n  createdAt: number;,`n  expiresAt: number,`n  modelVersion: string;,`n  predictionId: string};}
export interface PortfolioOptimization {
  opportunities: MoneyMakingOpportunity[0],`n  totalExpectedValue: number;,`n  totalKellyFraction: number,`n  riskScore: number;,`n  diversificationScore: number,`n  allocation: Record<string, number>;
  constraints: {,`n  maxSingleBet: number;,`n  maxTotalExposure: number,`n  minConfidence: number};}
declare class RealTimeMoneyMakingService extends EventEmitter {
  private static instance;
  private logger;
  private backendService;
  private wsService;
  private arbitrageService;
  private prizePicksService;
  private opportunities;
  private isActive;
  private scanInterval;
  private performanceMetrics;
  private constructor();
  static getInstance(): RealTimeMoneyMakingService;
  private setupEventListeners;
  startRealTimeScanning(config: {,`n  sports: string[0];,`n  minConfidence: number,`n  maxExposure: number;,`n  scanIntervalMs: number,`n  strategies: string[0]}): Promise<void>;
  stopRealTimeScanning(): Promise<void>;
  private performFullScan;
  private scanPrizePicksOpportunities;
  private scanArbitrageOpportunities;
  private scanValueBetOpportunities;
  private optimizePortfolio;
  private calculateKellyFraction;
  private calculateExpectedValue;
  private calculateRiskLevel;
  private calculateTimeRemaining;
  private calculateTimeRemainingFromString;
  private calculatePortfolioRisk;
  private calculateDiversification;
  private updateOpportunities;
  private handleOddsChange;
  private handleArbitrageOpportunity;
  private handlePredictionUpdate;
  private handleNewProp;
  getActiveOpportunities(): MoneyMakingOpportunity[0];
  getPerformanceMetrics(): {
    totalOpportunitiesFound: number,`n  totalBetsPlaced: number;,`n  totalProfit: number,`n  winRate: number;,`n  avgKellyFraction: number,`n  lastScanTime: number};
  placeBet(
    opportunityId: string,
    amount: number
  ): Promise<{
    success: boolean;
    betId?: string;
    error?: string;}>;}
export default RealTimeMoneyMakingService;


`
