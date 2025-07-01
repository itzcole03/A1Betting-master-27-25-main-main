type AnalyticsData = Record<string, unknown>;
export interface AnalyticsEvent {
  id: string,`n  type: string;,`n  timestamp: number,`n  data: AnalyticsData;
  metadata?: AnalyticsData;}
interface AnalyticsMetrics {
  totalEvents: number,`n  eventsByType: Map<string, number>;
  averageLatency: number,`n  errorRate: number;,`n  lastProcessed: number}
interface AnalyticsConfig {
  enabled: boolean,`n  sampleRate: number;,`n  retentionPeriod: number,`n  batchSize: number;,`n  flushInterval: number}
export declare class UnifiedAnalytics {
  private static instance;
  private readonly eventBus;
  private readonly monitor;
  private readonly eventQueue;
  private readonly metrics;
  private config;
  private flushTimer;
  private constructor();
  static getInstance(): UnifiedAnalytics;
  private setupEventListeners;
  private startFlushTimer;
  trackEvent(type: string, data: AnalyticsData, metadata?: AnalyticsData): void;
  private updateMetrics;
  private flushEvents;
  /**
   * Process and send analytics events to the backend analytics service.
   * Formats events, sends them via fetch, and updates metrics.
   * Falls back to local logging if the service is unavailable.
   */
  private processEvents;
  getMetrics(): AnalyticsMetrics;
  updateConfig(updates: Partial<AnalyticsConfig>): void;
  cleanup(): Promise<void>;}
export Record<string, any>;


`
