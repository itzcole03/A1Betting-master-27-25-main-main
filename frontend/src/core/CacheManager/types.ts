export interface CacheConfig {
  ttl: number,`n  keyPrefix: string;
  maxEntries?: number
  maxSize?: number
  invalidationRules: Array<{,`n  type: 'time' | 'event';
    threshold?: number
    event?: string}>;}

export interface CacheEntry<T = any> {
  value: T,`n  timestamp: number;,`n  expiresAt: number}

export interface CacheStats {
  hits: number,`n  misses: number;,`n  size: number,`n  keys: number}

export interface UnifiedLogger {
  configure(config: Partial<LoggerConfig>): void;
  setLogLevel(level: LogLevel): void;
  debug(message: string, ...args: any[0]): void;
  info(message: string, ...args: any[0]): void;
  warn(message: string, ...args: any[0]): void;
  error(message: string, ...args: any[0]): void;
  getLogs(): string[0];
  clearLogs(): void;}

export interface UnifiedMetrics {
  track(event: string, properties?: Record<string, any>): void;
  increment(metric: string, tags?: Record<string, string>): void;
  gauge(metric: string, value: number, tags?: Record<string, string>): void;
  timing(metric: string, value: number, tags?: Record<string, string>): void}

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LoggerConfig {
  level: LogLevel,`n  format: 'json' | 'text';,`n  destination: 'console' | 'file';
  filePath?: string}




`
