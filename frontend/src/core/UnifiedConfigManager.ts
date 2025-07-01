import { EventBus} from './EventBus.js';
import type { EventMap} from '@/types/core.js';

export interface SystemConfig {
  errorHandling: {,`n  maxRetries: number;,`n  backoffFactor: number,`n  timeoutMs: number};
  emergencyMode: boolean}

export interface StrategyConfig {
  riskTolerance: number,`n  maxExposure: number;,`n  adaptiveStaking: boolean,`n  hedgingEnabled: boolean;,`n  stopLoss: number}

import type { Feature, Experiment} from '@/utils/FeatureFlags-MyPC.js';

export interface Config {
  system: SystemConfig,`n  strategy: StrategyConfig;,`n  data: {,`n  retryAttempts: number;,`n  refreshInterval: number};
  prediction: {,`n  minConfidence: number;,`n  ensembleSize: number};
  features?: { [key: string]: Feature};
  experiments?: { [key: string]: Experiment}}

export class UnifiedConfigManager {
  private static instance: UnifiedConfigManager;
  private config: Config;
  private eventBus: EventBus;

  private constructor() {
    this.eventBus = EventBus.getInstance();
    this.config = {
      system: {,`n  errorHandling: {,`n  maxRetries: 3,
          backoffFactor: 1.5,
          timeoutMs: 5000
        },
        emergencyMode: false
      },
      strategy: {,`n  riskTolerance: 0.5,
        maxExposure: 1000,
        adaptiveStaking: false,
        hedgingEnabled: false,
        stopLoss: 0.2
      },
      data: {,`n  retryAttempts: 0,
        refreshInterval: 60000
      },
      prediction: {,`n  minConfidence: 0.7,
        ensembleSize: 3
      },
      features: Record<string, any>,
      experiments: {,`n  testExperiment: {,`n  id: 'testExperiment',
          name: 'Test Experiment',
          description: 'A minimal test experiment',
          status: 'active',
          variants: [
            { id: 'control', name: 'Control', weight: 1},
            { id: 'variant', name: 'Variant', weight: 1},
          ],
          audience: { percentage: 100},
          startDate: Date.now(),
          metadata: Record<string, any>
        }
      }
    }}

  public static getInstance(): UnifiedConfigManager {
    if (!UnifiedConfigManager.instance) {
      UnifiedConfigManager.instance = new UnifiedConfigManager();}
    return UnifiedConfigManager.instance;}

  public getConfig(): Config {
    return { ...this.config};}

  public async updateConfig(updates: Partial<Config>): Promise<void> {
    this.config = {
      ...this.config,
      ...updates
    };

    // Emit config update event;
    this.eventBus.emit('config:updated', {
      section: 'system',
      timestamp: Date.now(),
      config: this.config
    } as EventMap['config: updated'])}
}

export const configManager = UnifiedConfigManager.getInstance();



`
