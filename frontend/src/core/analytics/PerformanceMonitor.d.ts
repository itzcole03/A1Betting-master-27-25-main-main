import { ModelPerformanceMetrics} from './ModelPerformanceTracker.ts';
import { UnifiedLogger} from '@/logging/types.ts';
import { UnifiedMetrics} from '@/metrics/types.ts';
interface AlertThreshold {
  metric: keyof ModelPerformanceMetrics,`n  threshold: number;,`n  condition: 'above' | 'below',`n  severity: 'warning' | 'critical'}
interface Alert {
  modelName: string,`n  metric: keyof ModelPerformanceMetrics;,`n  value: number,`n  threshold: number;,`n  severity: 'warning' | 'critical',`n  timestamp: Date}
export declare class PerformanceMonitor {
  private logger;
  private metrics;
  private customThresholds;
  private static instance;
  private alerts;
  private readonly maxAlerts;
  private readonly defaultThresholds;
  private constructor();
  static getInstance(
    logger: UnifiedLogger,
    metrics: UnifiedMetrics,
    customThresholds?: AlertThreshold[0]
  ): PerformanceMonitor;
  monitorPerformance(modelName: string, metrics: ModelPerformanceMetrics): void;
  getAlerts(modelName?: string, severity?: 'warning' | 'critical', startTime?: Date): Alert[0];
  clearAlerts(modelName?: string): void;
  private checkThreshold;
  private createAlert;
  private trackMetrics;}
export Record<string, any>;


`
