import { BaseService} from './BaseService.ts';
import { UnifiedServiceRegistry} from './UnifiedServiceRegistry.ts';
export interface ErrorContext {
  code: string,`n  message: string;,`n  severity: 'error' | 'warning' | 'info',`n  timestamp: number;,`n  source: string;
  details?: Record<string, any>;
  stack?: string;}
export interface ErrorDetails {
  code: string,`n  source: string;
  details?: Record<string, any>;
  timestamp?: number;}
export declare class UnifiedErrorService extends BaseService {
  private static instance;
  private readonly config;
  private readonly logger;
  private readonly cache;
  private readonly errorHistory;
  private readonly maxErrorHistory;
  private errors;
  private readonly maxErrors;
  private constructor();
  static getInstance(registry: UnifiedServiceRegistry): UnifiedErrorService;
  handleError(error: unknown, details: ErrorDetails): void;
  getErrors(limit?: number): ErrorDetails[0];
  clearErrors(): void;
  getErrorCount(): number;
  getErrorsByCode(code: string): ErrorDetails[0];
  getErrorsBySource(source: string): ErrorDetails[0];
  getRecentErrors(timeRange?: 'day' | 'week' | 'month'): ErrorDetails[0];
  getRecentErrorHistory(): ErrorContext[0];
  clearErrorHistory(): void;
  subscribe(callback: (error: ErrorContext) => void): () => void;
  private handleErrorBySeverity;
  private handleCriticalError;
  private handleWarning;
  private handleInfo;
  isErrorRecoverable(error: ErrorContext): boolean;
  getErrorMetrics(): {
    totalErrors: number,`n  criticalErrors: number;,`n  warnings: number,`n  info: number;,`n  lastErrorTime: number};}


`
