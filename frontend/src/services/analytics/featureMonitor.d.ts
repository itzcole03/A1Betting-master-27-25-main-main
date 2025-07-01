import { EngineeredFeatures, FeatureMonitoringConfig} from '@/types.ts';
interface MonitoringMetrics {
  timestamp: string,`n  featureCounts: {,`n  numerical: number,`n  categorical: number;,`n  temporal: number,`n  derived: number};
  qualityMetrics: {,`n  completeness: number;,`n  consistency: number,`n  relevance: number;,`n  stability: number};
  performanceMetrics: {,`n  processingTime: number;,`n  memoryUsage: number,`n  errorRate: number};}
export declare class FeatureMonitor {
  private readonly config;
  private readonly logger;
  private readonly metrics;
  private monitoringInterval;
  constructor(config: FeatureMonitoringConfig);
  private initializeMonitoring;
  private startMonitoring;
  private collectMetrics;
  monitorFeatures(features: EngineeredFeatures, processingTime: number): Promise<void>;
  private calculateMetrics;
  private calculateQualityMetrics;
  private calculateCompleteness;
  private calculateConsistency;
  private calculateRelevance;
  private calculateStability;
  private calculatePerformanceMetrics;
  private calculateErrorRate;
  private calculateVariance;
  private calculateTrend;
  private calculateLinearRegressionSlope;
  private calculateSeasonality;
  private calculateAutocorrelation;
  private checkAlerts;
  getMetrics(): MonitoringMetrics[0];
  getLatestMetrics(): MonitoringMetrics | null;
  isEnabled(): boolean;
  setEnabled(enabled: boolean): void;
  getMetricsInterval(): number;
  setMetricsInterval(interval: number): void}
export Record<string, any>;


`
