// Enhanced Performance Monitoring System for A1Betting Platform
// Autonomous Development System - Phase 7C Enhancement

export interface PerformanceMetrics {
  predictionAccuracy: number;
  latency: number;
  throughput: number;
  errorRate: number;
}

export interface PredictionResult {
  id: string;
  prediction: number;
  actual?: number;
  confidence: number;
  timestamp: number;
}

export class EnhancedPerformanceMonitor {
  private metrics: PerformanceMetrics = {
    predictionAccuracy: 0,
    latency: 0,
    throughput: 0,
    errorRate: 0
  };

  private predictionHistory: PredictionResult[] = [];

  trackPredictionAccuracy(prediction: PredictionResult): void {
    this.predictionHistory.push(prediction);
    
    if (prediction.actual !== undefined) {
      const accuracy = this.calculateAccuracy();
      this.metrics.predictionAccuracy = accuracy;
      
      if (accuracy < 0.6) {
        this.alertOnAnomalies('prediction_accuracy', accuracy, 0.6);
      }
    }
  }

  monitorLatency(operation: string, startTime: number): number {
    const latency = Date.now() - startTime;
    this.metrics.latency = latency;
    
    if (latency > 1000) {
      this.alertOnAnomalies('latency', latency, 1000);
    }
    
    return latency;
  }

  alertOnAnomalies(metric: string, value: number, threshold: number): void {
    if (value > threshold) {
      console.warn(`🚨 Performance Alert: ${metric} = ${value} exceeds threshold ${threshold}`);
      
      // In production, this would send alerts to monitoring service
      this.logPerformanceIssue(metric, value, threshold);
    }
  }

  private calculateAccuracy(): number {
    const validPredictions = this.predictionHistory.filter(p => p.actual !== undefined);
    if (validPredictions.length === 0) return 0;

    const correct = validPredictions.filter(p => 
      Math.abs((p.prediction - (p.actual || 0)) / (p.actual || 1)) < 0.1
    ).length;

    return correct / validPredictions.length;
  }

  private logPerformanceIssue(metric: string, value: number, threshold: number): void {
    // Enhanced logging for production debugging
    const issue = {
      timestamp: new Date().toISOString(),
      metric,
      value,
      threshold,
      context: this.getSystemContext()
    };
    
    console.error('Performance Issue:', JSON.stringify(issue, null, 2));
  }

  private getSystemContext(): object {
    return {
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
      timestamp: Date.now(),
      activeConnections: this.predictionHistory.length,
      memoryUsage: typeof performance !== 'undefined' && performance.memory ? 
        performance.memory.usedJSHeapSize : 'unknown'
    };
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  reset(): void {
    this.metrics = {
      predictionAccuracy: 0,
      latency: 0,
      throughput: 0,
      errorRate: 0
    };
    this.predictionHistory = [];
  }
}

// Singleton instance for global use
export const performanceMonitor = new EnhancedPerformanceMonitor();

// Export utility functions for easy integration
export const trackPrediction = (prediction: PredictionResult) => 
  performanceMonitor.trackPredictionAccuracy(prediction);

export const measureLatency = (operation: string, startTime: number) => 
  performanceMonitor.monitorLatency(operation, startTime);

export const getPerformanceMetrics = () => 
  performanceMonitor.getMetrics(); 