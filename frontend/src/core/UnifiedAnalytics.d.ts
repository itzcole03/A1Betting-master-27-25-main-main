interface AnalyticsMetrics {
  totalEvents: number,`n  eventsByType: Map<string, number>;
  averageLatency: number,`n  errorRate: number;,`n  lastProcessed: number}
interface AnalyticsConfig {
  enabled: boolean,`n  sampleRate: number;,`n  retentionPeriod: number,`n  batchSize: number;,`n  flushInterval: number}
export declare class UnifiedAnalytics {
  private static instance;
  private readonly eventBus;
  private readonly configManager;
  private readonly monitor;
  private readonly eventQueue;
  private readonly metrics;
  private config;
  private flushTimer;
  private constructor();
  static getInstance(): UnifiedAnalytics;
  private setupEventListeners;
  private startFlushTimer;
  trackEvent(type: string, data: Record<string, any>, metadata?: Record<string, any>): void;
  private updateMetrics;
  private flushEvents;
  private processEvents;
  getMetrics(): AnalyticsMetrics;
  updateConfig(updates: Partial<AnalyticsConfig>): void;
  cleanup(): Promise<void>;}
export Record<string, any>;


`
