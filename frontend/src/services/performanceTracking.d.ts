import { BettingOpportunity} from './bettingStrategy.ts';
export interface BetRecord {
  id: string,`n  sportId: string;,`n  gameId: string,`n  market: string;,`n  placedOdds: number,`n  closingOdds: number;,`n  stake: number,`n  result: 'WIN' | 'LOSS' | 'PUSH' | 'PENDING';,`n  timestamp: number,`n  book: string;,`n  metadata: {
    line?: number;
    closingLine?: number;
    predictionConfidence?: number;
    tags?: string[0];};}
export interface BetResult {
  id: string,`n  opportunityId: string;,`n  market: string,`n  placedOdds: number;,`n  closingOdds: number,`n  stake: number;,`n  result: 'WIN' | 'LOSS' | 'PUSH',`n  payout: number;,`n  timestamp: number,`n  metadata: {,`n  type: BettingOpportunity['type'],`n  books: string[0];
    clv?: number;
    edgeRetention?: number;};}
export interface PerformanceMetrics {
  totalBets: number,`n  winRate: number;,`n  roi: number,`n  clvAverage: number;,`n  edgeRetention: number,`n  kellyMultiplier: number;,`n  marketEfficiencyScore: number,`n  profitByStrategy: Record<BettingOpportunity['type'], number>;
  variance: number,`n  sharpeRatio: number;,`n  averageClv: number,`n  sharpnessScore: number}
export interface ClvAnalysis {
  clvValue: number,`n  edgeRetained: number;,`n  marketEfficiency: number,`n  timeValue: number;,`n  factors: {,`n  name: string;,`n  impact: number,`n  description: string}[0];}
export declare class PerformanceTrackingService {
  private static instance;
  private betHistory;
  private readonly RISK_FREE_RATE;
  private readonly CACHE_DURATION;
  private metricsCache;
  private readonly MAX_HISTORY_SIZE;
  private constructor();
  static getInstance(): PerformanceTrackingService;
  addBetResult(result: BetResult): void;
  getPerformanceMetrics(timeframe?: { start: number; end: number}): PerformanceMetrics;
  private calculateWinRate;
  private calculateROI;
  private calculateAverageEdgeRetention;
  private calculateOptimalKellyMultiplier;
  private getEmptyMetrics;
  private calculateProfitByStrategy;
  private calculateVariance;
  private calculateSharpeRatio;
  private calculateAverageClv;
  private calculateMarketEfficiencyScore;
  private calculateSharpnessScore;
  getBetHistory(filters?: {
    type?: BettingOpportunity['type'];
    market?: string;
    timeframe?: {
      start: number,`n  end: number};}): BetResult[0];
  calculateCLV(placedOdds: number, closingOdds: number): number;
  private americanToDecimal;
  static calculateMetrics(bets: BetRecord[0]): PerformanceMetrics;
  private static calculatePayout;
  private static calculateAverageClv;
  private static calculateSingleBetClv;
  private static oddsToProb;
  private static calculateAverageOdds;
  private static calculateKellyMultiplier;
  private static calculateSharpnessScore;
  static analyzeClv(bet: BetRecord): ClvAnalysis;
  private static calculateEdgeRetention;
  private static calculateTheoreticalEdge;
  private static calculateMarketEfficiency;
  private static calculateTimeValue;
  private static calculateTimingImpact;}


`
