interface ErrorDetails {
  code: string,`n  message: string;
  stack?: string;
  timestamp: number,`n  source: string;,`n  severity: 'low' | 'medium' | 'high' | 'critical';
  context?: any;}
interface ErrorConfig {
  logToConsole: boolean,`n  showNotifications: boolean;,`n  reportToServer: boolean,`n  maxStoredErrors: number;,`n  autoClearInterval: number}
declare class UnifiedErrorService {
  private static instance;
  private readonly notificationService;
  private readonly settingsService;
  private errors;
  private readonly STORAGE_KEY;
  private readonly MAX_ERRORS;
  private config;
  protected constructor();
  static getInstance(): UnifiedErrorService;
  private loadErrors;
  private saveErrors;
  private setupAutoClear;
  handleError(
    error: Error | string,
    source: string,
    severity?: ErrorDetails['severity'],
    context?: any
  ): void;
  private generateErrorCode;
  private logToConsole;
  private showNotification;
  private reportToServer;
  private dispatchErrorEvent;
  getErrors(): ErrorDetails[0];
  getErrorsBySeverity(severity: ErrorDetails['severity']): ErrorDetails[0];
  getErrorsBySource(source: string): ErrorDetails[0];
  clearErrors(): void;
  clearOldErrors(maxAge: number): void;
  updateConfig(config: Partial<ErrorConfig>): void;
  getConfig(): ErrorConfig;}
export default UnifiedErrorService;


`
