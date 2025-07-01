import type {
  BettingMetrics,
  ModelPerformance,
  BettingStats,
  LineMovement,
//   ArbitrageOpportunity
} from '@/types/betting.ts';
interface AnalyticsConfig {
  autoRefresh: boolean,`n  refreshInterval: number;,`n  metricsWindow: 'day' | 'week' | 'month' | 'year',`n  includeArbitrage: boolean;,`n  includeLineMovement: boolean}
declare class UnifiedAnalyticsService {
  private static instance;
  private readonly predictionService;
  private readonly bettingService;
  private config;
  private readonly apiUrl;
  private metricsCache;
  private lastUpdate;
  protected constructor();
  static getInstance(): UnifiedAnalyticsService;
  getBettingMetrics(): Promise<BettingMetrics>;
  private getDefaultMetrics;
  getModelPerformance(): Promise<ModelPerformance[0]>;
  getBettingStats(): Promise<BettingStats>;
  private getDefaultStats;
  getLineMovements(marketId: string): Promise<LineMovement[0]>;
  getArbitrageOpportunities(): Promise<ArbitrageOpportunity[0]>;
  getPerformanceBreakdown(): Promise<any>;
  getRiskAnalysis(): Promise<any>;
  setConfig(newConfig: Partial<AnalyticsConfig>): void;
  getConfig(): AnalyticsConfig;
  private clearCache;
  isCacheValid(): boolean;
  refreshData(): Promise<void>;}
export default UnifiedAnalyticsService;


`
