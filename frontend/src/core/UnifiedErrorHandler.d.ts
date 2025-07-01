export declare class UnifiedErrorHandler {
  private static instance;
  private logger;
  private errorLog;
  private constructor();
  static getInstance(): UnifiedErrorHandler;
  handleError(error: Error, context: string, metadata?: Record<string, any>): void;
  getErrorLog(): Array<{
    timestamp: string,`n  error: Error;,`n  context: string,`n  metadata: Record<string, any>}>;
  clearErrorLog(): void;}


`
