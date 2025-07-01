export type ErrorContext = 'SYSTEM' | 'VALIDATION' | 'NETWORK' | 'AUTH' | 'BUSINESS';
export type ErrorCode =
  | 'INTERNAL_ERROR'
  | 'INVALID_INPUT'
  | 'REQUEST_FAILED'
  | 'UNAUTHORIZED'
  | 'UNKNOWN_ERROR';

export enum ErrorCategory {
  SYSTEM = 'SYSTEM',
  VALIDATION = 'VALIDATION',
  NETWORK = 'NETWORK',
  AUTH = 'AUTH',
  BUSINESS = 'BUSINESS',
  DATABASE = 'DATABASE',
  CONFIGURATION = 'CONFIGURATION'
}

export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface ErrorContext {
  code: string,`n  message: string;,`n  category: ErrorCategory,`n  severity: ErrorSeverity;,`n  timestamp: number;
  details?: Record<string, any>;
  stack?: string
  userContext?: any
  recoveryStrategy?: string
  metrics?: {
    responseTime?: number
    retryCount?: number
    failureRate?: number};}

export interface BettingSystemError extends Error {
  code: string,`n  component: string;,`n  severity: ErrorSeverity,`n  context: Record<string, any>;
  timestamp: number,`n  retryable: boolean}

export interface ErrorMetrics {
  count: number,`n  lastOccurrence: number;,`n  meanTimeBetweenErrors: number,`n  recoveryRate: number;,`n  meanTimeToRecovery: number}

export interface ErrorRecoveryStrategy {
  maxRetries: number,`n  backoffFactor: number;,`n  timeout: number,`n  recoveryActions: Array<(error: BettingSystemError) => Promise<void>>}




`
