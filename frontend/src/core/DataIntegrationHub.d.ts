import { DataSource, DataSourceMetrics} from './DataSource.ts';
import { SocialSentimentData} from '@/adapters/SocialSentimentAdapter.ts';
export interface IntegratedData {
  timestamp: number,`n  projections: {
    [playerId: string]: {,`n  stats: Record<string, number>;
      confidence: number,`n  lastUpdated: number};};
  sentiment: {
    [playerId: string]: SocialSentimentData};
  odds: {
    [eventId: string]: {,`n  markets: Record<string, number>;
      movement: {,`n  direction: 'up' | 'down' | 'stable';,`n  magnitude: number};};};
  injuries: {
    [playerId: string]: {,`n  status: string;,`n  details: string,`n  impact: number;,`n  timeline: string};};
  trends: {
    [metric: string]: {,`n  value: number;,`n  change: number,`n  significance: number};};}
export declare class DataIntegrationHub {
  private static instance;
  private readonly eventBus;
  private readonly performanceMonitor;
  private readonly dataSources;
  private readonly metrics;
  private integratedData;
  private correlationCache;
  private dataCache;
  private syncInterval;
  private isRealTimeEnabled;
  private constructor();
  static getInstance(): DataIntegrationHub;
  private initializeIntegratedData;
  registerDataSource(source: DataSource<any>): void;
  startRealTimeSync(): Promise<void>;
  stopRealTimeSync(): void;
  setSyncInterval(milliseconds: number): void;
  private synchronizeAll;
  private updateSourceMetrics;
  private integrateData;
  private calculateDataConfidence;
  private updateIntegratedDataSource;
  private integrateProjections;
  private integratePrizePicksProjections;
  private integrateSentiment;
  private integrateSportsData;
  private integrateOdds;
  private calculateInjuryImpact;
  private calculateOddsMovement;
  private analyzeTrendsWithCorrelations;
  private analyzeProjectionTrends;
  private analyzeSentimentTrends;
  private analyzeMarketTrends;
  private analyzeCorrelationTrends;
  private calculateTrendSignificance;
  private calculateCorrelation;
  private setupEventListeners;
  getIntegratedData(): IntegratedData;
  getSourceMetrics(): Map<string, DataSourceMetrics>;
  private calculateMetrics;
  private emitMetricsUpdate;}


`
