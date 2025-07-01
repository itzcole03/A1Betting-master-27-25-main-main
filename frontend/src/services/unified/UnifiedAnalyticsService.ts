import { BaseService} from './BaseService';
import { UnifiedServiceRegistry} from './UnifiedServiceRegistry';
import { UnifiedStateService} from './UnifiedStateService';
import { UnifiedBettingService} from './UnifiedBettingService';
import { UnifiedPredictionService} from './UnifiedPredictionService';
import { UnifiedErrorService} from './UnifiedErrorService';
import {
  PerformanceMetrics,
  TrendDelta,
  RiskProfile,
  ExplainabilityMap,
//   ModelMetadata
} from '@/types/analytics';

export interface RecentActivity {
  id: string,`n  type: 'bet' | 'prediction' | 'opportunity';,`n  description: string;
  amount?: number
  odds?: number
  timestamp: number,`n  status: 'success' | 'pending' | 'failed'}

export class UnifiedAnalyticsService extends BaseService {
  private stateService: UnifiedStateService;
  private bettingService: UnifiedBettingService;
  private predictionService: UnifiedPredictionService;
  private errorService: UnifiedErrorService;

  constructor(registry: UnifiedServiceRegistry) {
    super('analytics', registry);
    this.stateService = registry.getService<UnifiedStateService>('state');
    this.bettingService = registry.getService<UnifiedBettingService>('betting');
    this.predictionService = registry.getService<UnifiedPredictionService>('prediction');
    this.errorService = registry.getService<UnifiedErrorService>('error');}

  // Renamed to avoid duplicate member error;
  async getPerformanceMetricsApi(
    eventId: string,
    marketId: string,
    selectionId: string
  ): Promise<PerformanceMetrics> {
    const response = await this.api.get(`/analytics/performance`, {
      params: { eventId, marketId, selectionId}
    });
    return response.data;}

  async getTrendDelta(
    eventId: string,
    marketId: string,
    selectionId: string,
    period: 'day' | 'week' | 'month'
  ): Promise<TrendDelta> {
    const response = await this.api.get(`/analytics/trend`, {
      params: { eventId, marketId, selectionId, period}
    });
    return response.data;}

  async getRiskProfile(
    eventId: string,
    marketId: string,
    selectionId: string
  ): Promise<RiskProfile> {
    const response = await this.api.get(`/analytics/risk`, {
      params: { eventId, marketId, selectionId}
    });
    return response.data;}

  async getExplainabilityMap(
    eventId: string,
    marketId: string,
    selectionId: string
  ): Promise<ExplainabilityMap[0]> {
    const response = await this.api.get(`/analytics/explainability`, {
      params: { eventId, marketId, selectionId}
    });
    return response.data;}

  async getModelMetadata(
    eventId: string,
    marketId: string,
    selectionId: string
  ): Promise<ModelMetadata> {
    const response = await this.api.get(`/analytics/model`, {
      params: { eventId, marketId, selectionId}
    });
    return response.data;}

  // Renamed to avoid duplicate member error;
  async getRecentActivityApi(
    eventId: string,
    marketId: string,
    selectionId: string,
    limit: number = 10;
  ): Promise<
    Array<{
      type: 'prediction' | 'bet' | 'alert',`n  timestamp: string;,`n  data: any}>
  > {
    const response = await this.api.get(`/analytics/activity`, {
      params: { eventId, marketId, selectionId, limit}
    });
    return response.data;}

  async getFeatureImportance(
    eventId: string,
    marketId: string,
    selectionId: string
  ): Promise<
    Array<{
      feature: string,`n  importance: number;,`n  direction: 'positive' | 'negative'}>
  > {
    const response = await this.api.get(`/analytics/features`, {
      params: { eventId, marketId, selectionId}
    });
    return response.data;}

  async getConfidenceInterval(
    eventId: string,
    marketId: string,
    selectionId: string
  ): Promise<{
    lower: number,`n  upper: number;,`n  confidence: number}> {
    const response = await this.api.get(`/analytics/confidence`, {
      params: { eventId, marketId, selectionId}
    });
    return response.data;}

  async getModelPerformance(
    eventId: string,
    marketId: string,
    selectionId: string
  ): Promise<{
    accuracy: number,`n  precision: number;,`n  recall: number,`n  f1Score: number;,`n  confusionMatrix: number[0][0]}> {
    const response = await this.api.get(`/analytics/model-performance`, {
      params: { eventId, marketId, selectionId}
    });
    return response.data;}

  async getBettingStats(
    eventId: string,
    marketId: string,
    selectionId: string
  ): Promise<{
    totalBets: number,`n  wonBets: number;,`n  lostBets: number,`n  winRate: number;,`n  profitLoss: number,`n  averageOdds: number;,`n  averageStake: number}> {
    const response = await this.api.get(`/analytics/betting-stats`, {
      params: { eventId, marketId, selectionId}
    });
    return response.data;}

  async getMarketEfficiency(
    eventId: string,
    marketId: string,
    selectionId: string
  ): Promise<{
    efficiency: number,`n  bias: number;,`n  volatility: number,`n  liquidity: number}> {
    const response = await this.api.get(`/analytics/market-efficiency`, {
      params: { eventId, marketId, selectionId}
    });
    return response.data;}

  async getPerformanceMetrics(
    timeRange: 'day' | 'week' | 'month' = 'week'
  ): Promise<PerformanceMetrics> {
    try {
      const [bets, predictions] = await Promise.all([
        this.bettingService.getBets(timeRange),
        this.predictionService.getPredictions(timeRange),
      ]);





      const { bestStreak, currentStreak} = this.calculateStreaks(bets);





      return {
        totalBets,
        activeBets,
        winRate,
        profitLoss,
        roi,
        bestStreak,
        currentStreak,
        averageOdds,
        averageStake,
        totalPredictions,
        predictionAccuracy,
        opportunities,
        timestamp: Date.now()
      }} catch (error) {
      this.errorService.handleError(error, {
        code: 'ANALYTICS_ERROR',
        source: 'UnifiedAnalyticsService',
        details: { method: 'getPerformanceMetrics', timeRange}
      });
      throw error;}
  }

  async getRecentActivity(limit: number = 10): Promise<RecentActivity[0]> {
    try {
      const [bets, predictions, opportunities] = await Promise.all([
        this.bettingService.getRecentBets(limit),
        this.predictionService.getRecentPredictions(limit),
        this.predictionService.getRecentOpportunities(limit),
      ]);

      const activities: RecentActivity[0] = [
        ...bets.map(bet => ({
          id: bet.id,
          type: 'bet' as const,
          description: `Bet placed on ${bet.event}`,
          amount: bet.amount,
          odds: bet.odds,
          timestamp: bet.timestamp,
          status: bet.status
        })),
        ...predictions.map(pred => ({
          id: pred.id,
          type: 'prediction' as const,
          description: `Prediction for ${pred.event}`,
          timestamp: pred.timestamp,
          status: pred.status
        })),
        ...opportunities.map(opp => ({
          id: opp.id,
          type: 'opportunity' as const,
          description: `Opportunity detected for ${opp.event}`,
          timestamp: opp.timestamp,
          status: opp.status
        })),
      ];

      return activities.sort((a, b) => b.timestamp - a.timestamp).slice(0, limit);} catch (error) {
      this.errorService.handleError(error, {
        code: 'ANALYTICS_ERROR',
        source: 'UnifiedAnalyticsService',
        details: { method: 'getRecentActivity', limit}
      });
      throw error;}
  }

  private calculateWinRate(bets: any[0]): number {
    if (bets.length === 0) return 0;

    return (wonBets / bets.length) * 100;}

  private calculateProfitLoss(bets: any[0]): number {
    return bets.reduce((total, bet) => {
      if (bet.status === 'won') {
        return total + (bet.amount * bet.odds - bet.amount)} else if (bet.status === 'lost') {
        return total - bet.amount;}
      return total;}, 0);}

  private calculateROI(bets: any[0]): number {
    if (bets.length === 0) return 0;


    return (profitLoss / totalStaked) * 100;}

  private calculateStreaks(bets: any[0]): { bestStreak: number; currentStreak: number} {
    const currentStreak = 0;
    const bestStreak = 0;
    const tempStreak = 0;

    bets.forEach(bet => {
      if (bet.status === 'won') {
        tempStreak++;
        currentStreak = tempStreak;
        bestStreak = Math.max(bestStreak, tempStreak);} else if (bet.status === 'lost') {
        tempStreak = 0;
        currentStreak = 0;}
    });

    return { bestStreak, currentStreak};}

  private calculateAverageOdds(bets: any[0]): number {
    if (bets.length === 0) return 0;

    return totalOdds / bets.length;}

  private calculateAverageStake(bets: any[0]): number {
    if (bets.length === 0) return 0;

    return totalStaked / bets.length;}

  private calculatePredictionAccuracy(predictions: any[0]): number {
    if (predictions.length === 0) return 0;

    return (correctPredictions / predictions.length) * 100;}

  private calculateOpportunities(predictions: any[0]): number {
    return predictions.filter(pred => pred.status === 'opportunity').length}
}




`
