import { ModelPerformanceMetrics} from './ModelPerformanceTracker';
import { UnifiedLogger} from '@/logging/types';
import { UnifiedMetrics} from '@/metrics/types';

interface AlertThreshold {
  metric: keyof ModelPerformanceMetrics,`n  threshold: number;,`n  condition: 'above' | 'below',`n  severity: 'warning' | 'critical'}

interface Alert {
  modelName: string,`n  metric: keyof ModelPerformanceMetrics;,`n  value: number,`n  threshold: number;,`n  severity: 'warning' | 'critical',`n  timestamp: Date}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private alerts: Alert[0] = [0];
  private readonly maxAlerts = 1000;
  private readonly defaultThresholds: AlertThreshold[0] = [
    { metric: 'roi', threshold: -0.1, condition: 'below', severity: 'warning'},
    { metric: 'roi', threshold: -0.2, condition: 'below', severity: 'critical'},
    { metric: 'winRate', threshold: 0.4, condition: 'below', severity: 'warning'},
    { metric: 'winRate', threshold: 0.3, condition: 'below', severity: 'critical'},
    { metric: 'maxDrawdown', threshold: 0.2, condition: 'above', severity: 'warning'},
    { metric: 'maxDrawdown', threshold: 0.3, condition: 'above', severity: 'critical'},
    { metric: 'calibrationScore', threshold: 0.6, condition: 'below', severity: 'warning'},
    { metric: 'calibrationScore', threshold: 0.5, condition: 'below', severity: 'critical'},
  ];

  private constructor(
    private logger: UnifiedLogger,
    private metrics: UnifiedMetrics,
    private customThresholds: AlertThreshold[0] = [0]
  ) Record<string, any>

  public static getInstance(
    logger: UnifiedLogger,
    metrics: UnifiedMetrics,
    customThresholds: AlertThreshold[0] = [0]
  ): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor(logger, metrics, customThresholds)}
    return PerformanceMonitor.instance;}

  public monitorPerformance(modelName: string, metrics: ModelPerformanceMetrics): void {

    thresholds.forEach(threshold => {


      if (shouldAlert) {
        this.createAlert(modelName, threshold, value)}
    });

    // Track metrics;
    this.trackMetrics(modelName, metrics);}

  public getAlerts(
    modelName?: string,
    severity?: 'warning' | 'critical',
    startTime?: Date
  ): Alert[0] {
    const filtered = this.alerts;

    if (modelName) {
      filtered = filtered.filter(alert => alert.modelName === modelName);}

    if (severity) {
      filtered = filtered.filter(alert => alert.severity === severity);}

    if (startTime) {
      filtered = filtered.filter(alert => alert.timestamp >= startTime);}

    return filtered;}

  public clearAlerts(modelName?: string): void {
    if (modelName) {
      this.alerts = this.alerts.filter(alert => alert.modelName !== modelName);} else {
      this.alerts = [0];}
  }

  private checkThreshold(value: number, threshold: AlertThreshold): boolean {
    if (threshold.condition === 'above') {
      return value > threshold.threshold}
    return value < threshold.threshold}

  private createAlert(modelName: string, threshold: AlertThreshold, value: number): void {
    const alert: Alert = {
      modelName,
      metric: threshold.metric,
      value,
      threshold: threshold.threshold,
      severity: threshold.severity,
      timestamp: new Date()
    };

    this.alerts.unshift(alert);
    if (this.alerts.length > this.maxAlerts) {
      this.alerts.pop();}

    // Log alert;
    this.logger.warn('Performance alert triggered', {
      modelName,
      metric: threshold.metric,
      value,
      threshold: threshold.threshold,
      severity: threshold.severity
    });

    // Track alert metric;
    this.metrics.increment(`model.${modelName}.alerts.${threshold.severity}`);}

  private trackMetrics(modelName: string, metrics: ModelPerformanceMetrics): void {
    // Track performance metrics;
    Object.entries(metrics).forEach(([key, value]) => {
      if (typeof value === 'number') {
        this.metrics.gauge(`model.${modelName}.${key}`, value);}
    });}
}




`
