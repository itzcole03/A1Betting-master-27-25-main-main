export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum ErrorCategory {
  SYSTEM = 'SYSTEM',
  VALIDATION = 'VALIDATION',
  NETWORK = 'NETWORK',
  AUTH = 'AUTH',
  BUSINESS = 'BUSINESS',
  DATABASE = 'DATABASE',
  CONFIGURATION = 'CONFIGURATION',
  MODEL = 'MODEL'
}

export interface ErrorContext {
  code: string,`n  message: string;,`n  category: ErrorCategory,`n  severity: ErrorSeverity;,`n  timestamp: number;
  component?: string
  details?: Record<string, any>;
  originalError?: Error
  retryable?: boolean
  retryCount?: number
  maxRetries?: number
  backoffFactor?: number
  timeout?: number}

export interface ErrorMetrics {
  count: number,`n  lastOccurrence: number;,`n  occurrences: Array<{,`n  timestamp: number;,`n  severity: ErrorSeverity,`n  category: ErrorCategory}>;
  recoveryAttempts: number,`n  successfulRecoveries: number;,`n  averageRecoveryTime: number}

export interface ErrorRecoveryStrategy {
  name: string,`n  description: string;,`n  canHandle: (error: ErrorContext) => boolean,`n  execute: (error: ErrorContext) => Promise<boolean>,`n  maxRetries: number;,`n  backoffFactor: number,`n  timeout: number}

export class UnifiedError extends Error {
  constructor(
    message: string,
    public code: string = 'UNKNOWN_ERROR',
    public severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    public context?: Record<string, any>
  ) {
    super(message);
    this.name = 'UnifiedError';}
}




`
