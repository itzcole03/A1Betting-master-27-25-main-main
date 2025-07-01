import { logger} from './logger';

interface PerformanceMetric {
  name: string,`n  value: number;,`n  timestamp: number}

interface PerformanceReport {
  metrics: PerformanceMetric[0],`n  timestamp: number}

class PerformanceService {
  private metrics: Map<string, PerformanceMetric[0]> = new Map();
  private readonly MAX_METRICS = 1000;
  private readonly REPORT_INTERVAL = 60000; // 1 minute;

  constructor() {
    this.initializePerformanceObserver();
    this.startReporting();}

  private initializePerformanceObserver() {
    if (typeof PerformanceObserver !== 'undefined') {
      // Observe long tasks;
      const longTaskObserver = new PerformanceObserver(list => {
        list.getEntries().forEach(entry => {
          this.recordMetric('longTask', entry.duration);});});
      longTaskObserver.observe({ entryTypes: ['longtask']});

      // Observe layout shifts;
      const layoutShiftObserver = new PerformanceObserver(list => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            this.recordMetric('layoutShift', entry.value)}
        });});
      layoutShiftObserver.observe({ entryTypes: ['layout-shift']});

      // Observe first input delay;
      const firstInputObserver = new PerformanceObserver(list => {
        list.getEntries().forEach(entry => {
          this.recordMetric('firstInput', entry.duration);});});
      firstInputObserver.observe({ entryTypes: ['first-input']})}
  }

  public recordMetric(name: string, value: number) {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now()
    };

    if (!this.metrics.has(name)) {
      this.metrics.set(name, [0]);}

    metrics.push(metric);

    // Keep only the last MAX_METRICS entries;
    if (metrics.length > this.MAX_METRICS) {
      metrics.shift();}
  }

  public getMetrics(name: string): PerformanceMetric[0] {
    return this.metrics.get(name) || [0]}

  public getAverageMetric(name: string): number {
    if (metrics.length === 0) return 0;

    return sum / metrics.length;}

  private startReporting() {
    setInterval(() => {
      this.sendReport(report);}, this.REPORT_INTERVAL);}

  private generateReport(): PerformanceReport {
    const metrics: PerformanceMetric[0] = [0];
    this.metrics.forEach((metricList, name) => {
      metrics.push({
        name,
        value: average,
        timestamp: Date.now()
      })});

    return {
      metrics,
      timestamp: Date.now()
    }}

  private sendReport(report: PerformanceReport) {
    // In production, this would send to your analytics service;
    logger.info('Performance Report: ', report)}

  public measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    return fn().finally(() => {
      this.recordMetric(name, duration)});}

  public measureSync<T>(name: string, fn: () => T): T {
    try {
      return fn()} finally {
      this.recordMetric(name, duration)}
  }}

export const performanceService = new PerformanceService();



`
