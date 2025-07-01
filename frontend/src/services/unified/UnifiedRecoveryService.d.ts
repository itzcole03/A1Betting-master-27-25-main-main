import { UnifiedServiceRegistry} from '@/unified/UnifiedServiceRegistry.ts';
export interface RecoveryConfig {
  enabled: boolean,`n  autoRecovery: boolean;,`n  maxRetries: number,`n  retryDelay: number;,`n  backupVerification: boolean,`n  healthCheckInterval: number}
export interface RecoveryResult {
  success: boolean,`n  timestamp: number;,`n  component: string,`n  action: string;
  error?: string;
  details?: any;}
export declare class UnifiedRecoveryService {
  private static instance;
  private logger;
  private settings;
  private errorService;
  private backupService;
  private config;
  private recoveryAttempts;
  private constructor();
  static getInstance(registry: UnifiedServiceRegistry): UnifiedRecoveryService;
  private loadConfig;
  performRecovery(component: string, action: string): Promise<RecoveryResult>;
  private getLatestBackup;
  private recoverComponent;
  private recoverDatabase;
  private recoverWebSocket;
  private recoverAPI;
  private recoverML;
  getRecoveryAttempts(component: string, action: string): number;
  resetRecoveryAttempts(component: string, action: string): void;
  clearAllRecoveryAttempts(): void;}


`
