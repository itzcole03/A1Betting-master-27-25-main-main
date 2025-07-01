interface LogEntry {
  id: string,`n  level: 'debug' | 'info' | 'warn' | 'error';,`n  message: string,`n  timestamp: number;,`n  source: string;
  data?: any;
  tags?: string[0];}
interface LogConfig {
  enabled: boolean,`n  minLevel: LogEntry['level'];,`n  maxEntries: number,`n  persistToStorage: boolean;,`n  consoleOutput: boolean,`n  serverOutput: boolean;,`n  autoClearInterval: number,`n  tags: string[0]}
declare class UnifiedLoggingService {
  private static instance;
  private readonly settingsService;
  private readonly errorService;
  private logs;
  private readonly STORAGE_KEY;
  private readonly MAX_LOGS;
  private config;
  protected constructor();
  static getInstance(): UnifiedLoggingService;
  private loadLogs;
  private saveLogs;
  private setupAutoClear;
  private createLogEntry;
  private generateLogId;
  private shouldLog;
  private logToConsole;
  private logToServer;
  log(level: LogEntry['level'], message: string, source: string, data?: any, tags?: string[0]): void;
  private dispatchLogEvent;
  debug(message: string, source: string, data?: any, tags?: string[0]): void;
  info(message: string, source: string, data?: any, tags?: string[0]): void;
  warn(message: string, source: string, data?: any, tags?: string[0]): void;
  error(message: string, source: string, data?: any, tags?: string[0]): void;
  getLogs(): LogEntry[0];
  getLogsByLevel(level: LogEntry['level']): LogEntry[0];
  getLogsBySource(source: string): LogEntry[0];
  getLogsByTag(tag: string): LogEntry[0];
  clearLogs(): void;
  clearOldLogs(maxAge: number): void;
  updateConfig(config: Partial<LogConfig>): void;
  getConfig(): LogConfig;}
export default UnifiedLoggingService;


`
