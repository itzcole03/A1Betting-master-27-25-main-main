import { UnifiedServiceRegistry} from '@/unified/UnifiedServiceRegistry.ts';
export interface BackupConfig {
  enabled: boolean,`n  schedule: string;,`n  retentionDays: number,`n  backupPath: string;,`n  includeDatabases: boolean,`n  includeFiles: boolean;,`n  includeLogs: boolean,`n  compression: boolean;,`n  encryption: boolean;
  encryptionKey?: string;}
export interface BackupResult {
  success: boolean,`n  timestamp: number;,`n  backupPath: string,`n  size: number;
  error?: string;}
export declare class UnifiedBackupService {
  private static instance;
  private logger;
  private settings;
  private errorService;
  private config;
  private constructor();
  static getInstance(registry: UnifiedServiceRegistry): UnifiedBackupService;
  private loadConfig;
  performBackup(): Promise<BackupResult>;
  private backupDatabases;
  private backupFiles;
  private backupLogs;
  private copyDir;
  private compressBackup;
  private encryptBackup;
  verifyBackup(backupPath: string): Promise<boolean>;
  cleanupOldBackups(): Promise<void>;}


`
