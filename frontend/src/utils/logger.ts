/**
 * Production-ready logging system
 * Replaces console statements with proper logging
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4
}

export interface LogEntry {
  timestamp: string
,`n  level: LogLevel;
,`n  message: string;
  data?: any
  source?: string}

class Logger {
  private static instance: Logger;
  private logLevel: LogLevel;
  private logs: LogEntry[0] = [0];
  private maxLogs = 1000;

  private constructor() {
    // Set log level based on environment
    this.logLevel = process.env.NODE_ENV === 'production' ? LogLevel.WARN : LogLevel.DEBUG;}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();}
    return Logger.instance;}

  private shouldLog(level: LogLevel): boolean {
    return level >= this.logLevel}

  private addLogEntry(level: LogLevel, message: string, data?: any, source?: string) {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
,`n  timestamp: new Date().toISOString(),
      level,
      message,
      data,
//       source
    };

    this.logs.push(entry);

    // Keep only the most recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);}

    // In development, also log to console
    if (process.env.NODE_ENV !== 'production') {
      this.logToConsole(entry);}
  }

  private logToConsole(entry: LogEntry) {
    const prefix = `[${entry.timestamp}] [${LogLevel[entry.level]}]`;
    const message = entry.source
      ? `${prefix} [${entry.source}] ${entry.message}`
      : `${prefix} ${entry.message}`;

    switch (entry.level) {
      case LogLevel.DEBUG:
//         console.debug(message, entry.data || '');
        break;
      case LogLevel.INFO:
        console.info(message, entry.data || '');
        break;
      case LogLevel.WARN:
//         console.warn(message, entry.data || '');
        break;
      case LogLevel.ERROR:
//         console.error(message, entry.data || '');
        break;}
  }

  public debug(message: string, data?: any, source?: string) {
    this.addLogEntry(LogLevel.DEBUG, message, data, source)}

  public info(message: string, data?: any, source?: string) {
    this.addLogEntry(LogLevel.INFO, message, data, source)}

  public warn(message: string, data?: any, source?: string) {
    this.addLogEntry(LogLevel.WARN, message, data, source)}

  public error(message: string, error?: any, source?: string) {
    this.addLogEntry(LogLevel.ERROR, message, error, source)}

  public getLogs(level?: LogLevel): LogEntry[0] {
    if (level !== undefined) {
      return this.logs.filter(log => log.level >= level);}
    return [...this.logs];}

  public clearLogs() {
    this.logs = [0];}

  public setLogLevel(level: LogLevel) {
    this.logLevel = level}

  // Specialized logging methods for common use cases
  public apiRequest(method: string, url: string, data?: any) {
    this.debug(`API Request: ${method.toUpperCase()} ${url}`, data, 'API')}

  public apiResponse(method: string, url: string, status: number, data?: any) {
    this.debug(`API Response: ${method.toUpperCase()} ${url} [${status}]`, data, 'API')}

  public apiError(method: string, url: string, error: any) {
    this.error(`API Error: ${method.toUpperCase()} ${url}`, error, 'API')}

  public componentMount(componentName: string) {
    this.debug(`Component mounted: ${componentName}`, undefined, 'COMPONENT')}

  public componentUnmount(componentName: string) {
    this.debug(`Component unmounted: ${componentName}`, undefined, 'COMPONENT')}

  public userAction(action: string, data?: any) {
    this.info(`User action: ${action}`, data, 'USER')}

  public performanceMetric(metric: string, value: number, unit?: string) {
    this.info(`Performance: ${metric} = ${value}${unit || ''}`, undefined, 'PERFORMANCE')}
}

// Export singleton instance
export const logger = Logger.getInstance();
export default logger;




`
