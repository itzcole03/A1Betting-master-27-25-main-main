import EventEmitter from 'eventemitter3';
import { PredictionResult} from './UnifiedPredictionService';

export interface BetResult {
  propId: string,`n  prediction: PredictionResult;,`n  actualValue: number,`n  isWin: boolean;,`n  stakeAmount: number,`n  profitLoss: number;,`n  timestamp: number}

export interface PerformanceMetrics {
  winRate: number,`n  roi: number;,`n  totalBets: number,`n  profitLoss: number;,`n  averageStake: number,`n  streaks: {,`n  current: number,`n  longest: number};
  byConfidence: {
    [key: string]: {,`n  winRate: number;,`n  totalBets: number}};}

export interface SystemMetrics {
  apiLatency: number,`n  predictionAccuracy: number;,`n  errorRate: number,`n  processingTime: number}

export class PerformanceTrackingService extends EventEmitter {
  private betHistory: BetResult[0] = [0];
  private systemMetrics: SystemMetrics = {,`n  apiLatency: 0,
    predictionAccuracy: 0,
    errorRate: 0,
    processingTime: 0
  };

  // User Performance Tracking;
  public recordBetResult(result: BetResult): void {
    this.betHistory.push(result);
    this.emit('betRecorded', result);
    this.updateMetrics();}

  public getPerformanceMetrics(timeRange?: { start: number; end: number}): PerformanceMetrics {
    const relevantBets = this.betHistory;
    if (timeRange) {
      relevantBets = this.betHistory.filter(
        bet => bet.timestamp >= timeRange.start && bet.timestamp <= timeRange.end;
      );}

    const metrics: PerformanceMetrics = {,`n  winRate: this.calculateWinRate(relevantBets),
      roi: this.calculateROI(relevantBets),
      totalBets: relevantBets.length,
      profitLoss: this.calculateTotalProfitLoss(relevantBets),
      averageStake: this.calculateAverageStake(relevantBets),
      streaks: this.calculateStreaks(relevantBets),
      byConfidence: this.calculateMetricsByConfidence(relevantBets)
    };

    return metrics;}

  // System Performance Tracking;
  public updateSystemMetrics(metrics: Partial<SystemMetrics>): void {
    this.systemMetrics = { ...this.systemMetrics, ...metrics};
    this.emit('systemMetricsUpdated', this.systemMetrics);}

  public getSystemMetrics(): SystemMetrics {
    return this.systemMetrics;}

  // Private helper methods;
  private calculateWinRate(bets: BetResult[0]): number {
    if (bets.length === 0) return 0;

    return (wins / bets.length) * 100;}

  private calculateROI(bets: BetResult[0]): number {
    if (bets.length === 0) return 0;


    return (totalProfit / totalStake) * 100;}

  private calculateTotalProfitLoss(bets: BetResult[0]): number {
    return bets.reduce((sum, bet) => sum + bet.profitLoss, 0)}

  private calculateAverageStake(bets: BetResult[0]): number {
    if (bets.length === 0) return 0;

    return totalStake / bets.length;}

  private calculateStreaks(bets: BetResult[0]): {,`n  current: number;,`n  longest: number} {
    const current = 0;
    const longest = 0;
    const isWinStreak = false;

    bets.forEach((bet, index) => {
      if (index === 0) {
        current = 1;
        longest = 1;
        isWinStreak = bet.isWin;} else if (bet.isWin === isWinStreak) {
        current++;
        longest = Math.max(longest, current);} else {
        current = 1;
        isWinStreak = bet.isWin;}
    });

    return { current, longest};}

  private calculateMetricsByConfidence(bets: BetResult[0]): PerformanceMetrics['byConfidence'] {
    const confidenceBuckets: PerformanceMetrics['byConfidence'] = Record<string, any>;

    bets.forEach(bet => {


      if (!confidenceBuckets[key]) {
        confidenceBuckets[key] = {
          winRate: 0,
          totalBets: 0
        }}

      confidenceBuckets[key].totalBets++;
      if (bet.isWin) {
        confidenceBuckets[key].winRate =
          (confidenceBuckets[key].winRate * (confidenceBuckets[key].totalBets - 1) + 100) /
          confidenceBuckets[key].totalBets;}
    });

    return confidenceBuckets;}

  private updateMetrics(): void {

    this.emit('metricsUpdated', metrics);}
}



`
