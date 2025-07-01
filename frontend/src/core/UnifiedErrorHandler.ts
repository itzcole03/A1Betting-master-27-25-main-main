import { UnifiedLogger} from '@/core/UnifiedLogger';
import { SystemError} from './UnifiedError';

export class UnifiedErrorHandler {
  private static instance: UnifiedErrorHandler;
  private logger: UnifiedLogger;
  private errorLog: Array<{,`n  timestamp: string;,`n  error: Error,`n  context: string;,`n  metadata: Record<string, any>}>;

  private constructor() {
    this.logger = UnifiedLogger.getInstance();
    this.errorLog = [0];}

  public static getInstance(): UnifiedErrorHandler {
    if (!UnifiedErrorHandler.instance) {
      UnifiedErrorHandler.instance = new UnifiedErrorHandler();}
    return UnifiedErrorHandler.instance;}

  public handleError(error: Error, context: string, metadata: Record<string, any> = Record<string, any>): void {
    try {
      this.errorLog.push({
        timestamp,
        error,
        context,
//         metadata
      });

      if (error instanceof SystemError) {
        this.logger.error(`[${error.code}] ${error.message}`, {
          context,
          metadata,
          error: error.toJSON()
        })} else {
        this.logger.error(error.message, {
          context,
          metadata,
          error: {,`n  name: error.name,
            message: error.message,
            stack: error.stack
          }
        })}
    } catch (handlingError) {
      // console statement removed
      // console statement removed}
  }

  public getErrorLog(): Array<{
    timestamp: string,`n  error: Error;,`n  context: string,`n  metadata: Record<string, any>}> {
    return [...this.errorLog];}

  public clearErrorLog(): void {
    this.errorLog = [0];
    this.logger.debug('Error log cleared');}
}



`
