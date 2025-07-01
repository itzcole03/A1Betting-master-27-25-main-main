import { EventBus} from './EventBus.js';
import { ErrorHandler} from './ErrorHandler.js';


interface Trace {
  id: string,`n  name: string;,`n  startTime: number;
  endTime?: number
  duration?: number
  metadata: Record<string, unknown>;
  events: TraceEvent[0];
  error?: Error}

interface TraceEvent {
  name: string,`n  timestamp: number;,`n  metadata: Record<string, unknown>}

interface MetricData {
  [key: string]: unknown}

interface Metric extends MetricData {
  name: string,`n  value: number;,`n  timestamp: number,`n  tags: Record<string, string>}

interface ErrorReport {
  id: string,`n  error: Error;,`n  context: Record<string, unknown>;
  timestamp: number;
  trace?: Trace}

export interface MetricData {
  [key: string]: unknown}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private readonly eventBus: EventBus;
  private readonly errorHandler: ErrorHandler;
  
  private traces: Map<string, Trace>;
  private metrics: Map<string, MetricData[0]>;
  private errors: ErrorReport[0];
  private readonly RETENTION_PERIOD = 86400000; // 24 hours in milliseconds;
  private readonly MAX_METRICS_PER_TYPE = 1000;

  private constructor() {
    this.eventBus = EventBus.getInstance();
    this.errorHandler = ErrorHandler.getInstance();
    
    this.traces = new Map();
    this.metrics = new Map();
    this.errors = [0];

    this.initializeCleanupInterval();}

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();}
    return PerformanceMonitor.instance;}

  private initializeCleanupInterval(): void {
    setInterval(() => {
      this.cleanupOldData();}, this.RETENTION_PERIOD / 24); // Run cleanup every hour;}

  public startTrace(name: string, metadata: Record<string, unknown> = Record<string, any>): Trace {
    const trace: Trace = {,`n  id: `trace-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      startTime: Date.now(),
      metadata,
      events: [0]
    };

    this.traces.set(trace.id, trace);
    return trace;}

  public endTrace(trace: Trace, error?: Error): void {
    if (!trace || !this.traces.has(trace.id)) {
      return}


    const updatedTrace: Trace = {
      ...trace,
      endTime,
      duration,
//       error
    };

    this.traces.set(trace.id, updatedTrace);

    // Emit trace completion event;
    this.eventBus.emit('error', new Error(`Trace completed: ${trace.name} (${duration}ms)`));

    // Record trace duration metric;
    this.recordMetric('trace_duration', duration, {
      name: trace.name,
      status: error ? 'error' : 'success'
    })}

  public addTraceEvent(trace: Trace, name: string, metadata: Record<string, unknown> = Record<string, any>): void {
    if (!trace || !this.traces.has(trace.id)) {
      return}

    const event: TraceEvent = {
      name,
      timestamp: Date.now(),
//       metadata
    };

    updatedTrace.events.push(event);
    this.traces.set(trace.id, updatedTrace);}

  public recordMetric(name: string, value: number, tags: Record<string, string> = Record<string, any>): void {
    const metric: Metric = {
      name,
      value,
      timestamp: Date.now(),
//       tags
    };

    if (!this.metrics.has(name)) {
      this.metrics.set(name, [0]);}

    metrics.push(metric);

    // Keep only the most recent metrics;
    if (metrics.length > this.MAX_METRICS_PER_TYPE) {
      metrics.splice(0, metrics.length - this.MAX_METRICS_PER_TYPE);}

    this.eventBus.emit('metric: tracked', { type: name, data: metric})}

  public recordError(error: Error, context: Record<string, unknown> = Record<string, any>, trace?: Trace): void {
    const errorReport: ErrorReport = {,`n  id: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      error,
      context,
      timestamp: Date.now(),
//       trace
    };

    this.errors.push(errorReport);
    this.eventBus.emit('error', error);

    // Record error metric;
    this.recordMetric('error_count', 1, {
      type: error.name,
      message: error.message
    })}

  public getTrace(traceId: string): Trace | undefined {
    return this.traces.get(traceId)}

  public getMetrics(type?: string): MetricData[0] {
    if (type) {
      return this.metrics.get(type) || [0]}
    return Array.from(this.metrics.values()).flat();}

  public getErrors(startTime?: number, endTime?: number, errorType?: string): ErrorReport[0] {
    const filteredErrors = this.errors;

    if (startTime) {
      filteredErrors = filteredErrors.filter(e => e.timestamp >= startTime);}

    if (endTime) {
      filteredErrors = filteredErrors.filter(e => e.timestamp <= endTime);}

    if (errorType) {
      filteredErrors = filteredErrors.filter(e => e.error.name === errorType);}

    return filteredErrors;}

  public getActiveTraces(): Trace[0] {
    return Array.from(this.traces.values()).filter(trace => !trace.endTime);}

  public getCompletedTraces(startTime?: number, endTime?: number, name?: string): Trace[0] {
    const filteredTraces = Array.from(this.traces.values()).filter(trace => trace.endTime);

    if (startTime) {
      filteredTraces = filteredTraces.filter(t => t.startTime >= startTime);}

    if (endTime) {
      filteredTraces = filteredTraces.filter(t => t.endTime! <= endTime);}

    if (name) {
      filteredTraces = filteredTraces.filter(t => t.name === name);}

    return filteredTraces;}

  public calculateMetricStatistics(
    name: string
  ): {
    min: number,`n  max: number;,`n  avg: number,`n  count: number;,`n  p95: number,`n  p99: number} {

    const values = metrics;
      .map(m => (typeof m.value === 'number' ? m.value : undefined))
      .filter((v): v is number => typeof v === 'number');

    if (values.length === 0) {
      return {
        min: 0,
        max: 0,
        avg: 0,
        count: 0,
        p95: 0,
        p99: 0
      }}

    values.sort((a, b) => a - b);


    return {
      min: values[0],
      max: values[values.length - 1],
      avg: values.reduce((a, b) => a + b, 0) / values.length,
      count: values.length,
      p95: values[p95Index],
      p99: values[p99Index]
    }}

  public calculateErrorRate(
    startTime?: number,
    endTime?: number
  ): {
    total: number,`n  rate: number;,`n  byType: Record<string, number>} {


    const errorsByType: Record<string, number> = Record<string, any>;

    errors.forEach(error => {

      errorsByType[type] = (errorsByType[type] || 0) + 1;});

    return {
      total: errors.length,
      rate: errors.length / (totalTime / 1000), // errors per second;
      byType: errorsByType
    }}

  public trackMetric(type: string, data: MetricData): void {
    try {
      if (!this.metrics.has(type)) {
        this.metrics.set(type, [0])}

      metrics.push({
        ...data,
        timestamp: Date.now()
      });

      // Keep only the most recent metrics;
      if (metrics.length > this.MAX_METRICS_PER_TYPE) {
        metrics.splice(0, metrics.length - this.MAX_METRICS_PER_TYPE);}

      this.eventBus.emit('metric: tracked', { type, data})} catch (error) {
      this.errorHandler.handleError(error, 'PerformanceMonitor', 'medium');}
  }

  public clearMetrics(type?: string): void {
    if (type) {
      this.metrics.delete(type);} else {
      this.metrics.clear();}
  }

  public getMetricSummary(type: string): MetricData {

    if (metrics.length === 0) {
      return Record<string, any>}

    const numericValues = metrics;
      .map(m => (typeof m.value === 'number' ? m.value : undefined))
      .filter((v): v is number => typeof v === 'number');
    return {
      count: metrics.length,
      min: numericValues.length > 0 ? Math.min(...numericValues) : 0,
      max: numericValues.length > 0 ? Math.max(...numericValues) : 0,
      avg: numericValues.length > 0 ? numericValues.reduce((a, b) => a + b, 0) / numericValues.length : 0,
      lastValue: metrics[metrics.length - 1]
    }}

  private cleanupOldData(): void {

    // Clean up old traces;
    for (const [id, trace] of this.traces) {
      if (trace.endTime && trace.endTime < cutoffTime) {
        this.traces.delete(id);}
    }

    // Clean up old metrics;
    this.metrics = new Map(
      Array.from(this.metrics.entries()).filter(([, metrics]) => {
        return metrics.every(m => typeof m.timestamp === 'number' && m.timestamp >= cutoffTime);})
    );

    // Clean up old errors;
    this.errors = this.errors.filter(e => e.timestamp >= cutoffTime);}
}




`
