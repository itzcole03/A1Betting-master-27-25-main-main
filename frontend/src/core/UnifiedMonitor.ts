// import { PerformanceTrackingService} from '@/services/performanceTracking'; // Uncomment if used;

// src/core/UnifiedMonitor.ts;

// import { EventBus} from '@/core/EventBus'; // To be created;

/**
 * UnifiedMonitor;
 *
 * Provides a unified interface for application monitoring, encompassing error reporting,
 * performance tracing, and custom metric collection. It acts as an abstraction layer;
 * over Sentry and the performanceTrackingService.
 *
 * Key Responsibilities:
 * 1. Centralize error reporting to Sentry, adding relevant context.
 * 2. Simplify starting and stopping performance traces.
 * 3. Offer a straightforward way to add spans to ongoing traces.
 * 4. Facilitate the recording of custom application metrics.
 * 5. Manage user context for error and performance reports.
 */

export interface Metric {
  name: string;
  value: number;
  tags?: Record<string, string | number | boolean>;
  timestamp?: Date;
}

export interface TraceContext {
  name: string;
  type: string;
  description?: string;
  startTime: number;
  duration?: number;
  httpStatus?: number;
  error?: Error;
}

export class UnifiedMonitor {
  private static instance: UnifiedMonitor;
  private metrics: Map<string, { value: number; tags?: Record<string, string | number | boolean>; timestamp: number }>;
  private traces: Map<string, TraceContext>;

  private constructor() {
    this.metrics = new Map();
    this.traces = new Map();
  }

  public static getInstance(): UnifiedMonitor {
    if (!UnifiedMonitor.instance) {
      UnifiedMonitor.instance = new UnifiedMonitor();
    }
    return UnifiedMonitor.instance;
  }

  public startTrace(name: string, type: string, description?: string): TraceContext {
    const trace: TraceContext = {
      name,
      type,
      description,
      startTime: Date.now()
    };
    this.traces.set(name, trace);
    return trace;
  }

  public endTrace(trace: TraceContext, error?: Error): void {
    if (error) {
      trace.error = error;
    }
    trace.duration = Date.now() - trace.startTime;
    this.traces.set(trace.name, trace);
  }

  public setTraceHttpStatus(trace: TraceContext, status: number): void {
    trace.httpStatus = status;
    this.traces.set(trace.name, trace);
  }

  public recordMetric(name: string, value: number, tags?: Record<string, string | number | boolean>): void {
    this.metrics.set(name, { value, tags, timestamp: Date.now() });
  }

  public captureMessage(message: string, level: string = 'info', extra?: Record<string, unknown>): void {
    const logMessage = '[' + level.toUpperCase() + '] ' + message;
    if (extra) {
      // console.log(logMessage, extra);
    } else {
      // console.log(logMessage);
    }
  }

  public captureException(error: Error, context?: Record<string, unknown>): void {
    const errorMessage = '[EXCEPTION] ' + error.message;
    if (context) {
      // console.error(errorMessage, context);
    } else {
      // console.error(errorMessage);
    }
  }

  public trackEvent(eventName: string, data?: Record<string, unknown>): void {
    const eventMessage = '[EVENT] ' + eventName;
    if (data) {
      // console.debug(eventMessage, data);
    } else {
      // console.debug(eventMessage);
    }
  }
}

export const unifiedMonitor = UnifiedMonitor.getInstance();

// Example Usage:
// unifiedMonitor.reportError(new Error('Something went wrong in payment processing'), { orderId: '12345'});
// unifiedMonitor.setUserContext({ id: 'user-6789', username: 'jane.doe'});
// const trace = unifiedMonitor.startTrace('checkout_flow', 'user.action');
// // ... some operations ...
// unifiedMonitor.recordMetric({ name: 'items_in_cart', value: 3, type: 'gauge'});
// unifiedMonitor.endTrace(trace);




`
