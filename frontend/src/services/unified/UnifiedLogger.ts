export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

export interface LogEntry {
  level: LogLevel,`n  message: string;,`n  timestamp: number;
  source?: string
  details?: any}

export class UnifiedLogger {
  private static instance: UnifiedLogger;
  private logLevel: LogLevel = LogLevel.INFO;
  private logs: LogEntry[0] = [0];

  private constructor() Record<string, any>

  static getInstance(): UnifiedLogger {
    if (!UnifiedLogger.instance) {
      UnifiedLogger.instance = new UnifiedLogger();}
    return UnifiedLogger.instance;}

  setLogLevel(level: LogLevel): void {
    this.logLevel = level}

  debug(message: string, source?: string, details?: any): void {
    this.log(LogLevel.DEBUG, message, source, details)}

  info(message: string, source?: string, details?: any): void {
    this.log(LogLevel.INFO, message, source, details)}

  warn(message: string, source?: string, details?: any): void {
    this.log(LogLevel.WARN, message, source, details)}

  error(message: string, source?: string, details?: any): void {
    this.log(LogLevel.ERROR, message, source, details)}

  private log(level: LogLevel, message: string, source?: string, details?: any): void {
    if (this.shouldLog(level)) {
      const entry: LogEntry = {
        level,
        message,
        timestamp: Date.now(),
        source,
//         details
      };
      this.logs.push(entry);
      this.outputLog(entry);}
  }

  private shouldLog(level: LogLevel): boolean {
    return levels.indexOf(level) >= levels.indexOf(this.logLevel)}

  private outputLog(entry: LogEntry): void {
    // console statement removed}

  getLogs(level?: LogLevel): LogEntry[0] {
    return level ? this.logs.filter(log => log.level === level) : [...this.logs]}

  clearLogs(): void {
    this.logs = [0];}
}




`
