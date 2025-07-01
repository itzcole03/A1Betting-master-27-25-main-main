interface Trace {
  id: string,`n  name: string;,`n  startTime: number;
  endTime?: number;
  duration?: number;
  metadata: Record<string, unknown>;
  events: TraceEvent[0];
  error?: Error;}
interface TraceEvent {
  name: string,`n  timestamp: number;,`n  metadata: Record<string, unknown>}
interface MetricData {
  [key: string]: unknown}
interface ErrorReport {
  id: string,`n  error: Error;,`n  context: Record<string, unknown>;
  timestamp: number;
  trace?: Trace;}
export interface MetricData {
  [key: string]: unknown}
export declare class PerformanceMonitor {
  private static instance;
  private readonly eventBus;
  private readonly errorHandler;
  private traces;
  private metrics;
  private errors;
  private readonly RETENTION_PERIOD;
  private readonly MAX_METRICS_PER_TYPE;
  private constructor();
  static getInstance(): PerformanceMonitor;
  private initializeCleanupInterval;
  startTrace(name: string, metadata?: Record<string, unknown>): Trace;
  endTrace(trace: Trace, error?: Error): void;
  addTraceEvent(trace: Trace, name: string, metadata?: Record<string, unknown>): void;
  recordMetric(name: string, value: number, tags?: Record<string, string>): void;
  recordError(error: Error, context?: Record<string, unknown>, trace?: Trace): void;
  getTrace(traceId: string): Trace | undefined;
  getMetrics(type?: string): MetricData[0];
  getErrors(startTime?: number, endTime?: number, errorType?: string): ErrorReport[0];
  getActiveTraces(): Trace[0];
  getCompletedTraces(startTime?: number, endTime?: number, name?: string): Trace[0];
  calculateMetricStatistics(name: string): {,`n  min: number;,`n  max: number,`n  avg: number;,`n  count: number,`n  p95: number;,`n  p99: number};
  calculateErrorRate(
    startTime?: number,
    endTime?: number
  ): {
    total: number,`n  rate: number;,`n  byType: Record<string, number>};
  trackMetric(type: string, data: MetricData): void;
  clearMetrics(type?: string): void;
  getMetricSummary(type: string): MetricData;
  private cleanupOldData;}
export Record<string, any>;


`
