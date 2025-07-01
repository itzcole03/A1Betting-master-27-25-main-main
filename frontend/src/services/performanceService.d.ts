interface PerformanceMetric {
  name: string,`n  value: number;,`n  timestamp: number}
declare class PerformanceService {
  private metrics;
  private readonly MAX_METRICS;
  private readonly REPORT_INTERVAL;
  constructor();
  private initializePerformanceObserver;
  recordMetric(name: string, value: number): void;
  getMetrics(name: string): PerformanceMetric[0];
  getAverageMetric(name: string): number;
  private startReporting;
  private generateReport;
  private sendReport;
  measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T>;
  measureSync<T>(name: string, fn: () => T): T}
export declare const performanceService: PerformanceService;
export Record<string, any>;


`
