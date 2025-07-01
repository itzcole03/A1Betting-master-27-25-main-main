export interface SystemConfig {
  errorHandling: {,`n  maxRetries: number;,`n  backoffFactor: number,`n  timeoutMs: number};
  emergencyMode: boolean}
export interface StrategyConfig {
  riskTolerance: number,`n  maxExposure: number;,`n  adaptiveStaking: boolean,`n  hedgingEnabled: boolean;,`n  stopLoss: number}
import type { Feature, Experiment} from '@/utils/FeatureFlags-MyPC.js';
export interface Config {
  system: SystemConfig,`n  strategy: StrategyConfig;,`n  data: {,`n  retryAttempts: number;,`n  refreshInterval: number};
  prediction: {,`n  minConfidence: number;,`n  ensembleSize: number};
  features?: {
    [key: string]: Feature};
  experiments?: {
    [key: string]: Experiment};}
export declare class UnifiedConfigManager {
  private static instance;
  private config;
  private eventBus;
  private constructor();
  static getInstance(): UnifiedConfigManager;
  getConfig(): Config;
  updateConfig(updates: Partial<Config>): Promise<void>}
export declare const configManager: UnifiedConfigManager;


`
