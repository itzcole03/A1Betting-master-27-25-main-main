import { OddsUpdate} from '@/types/core.ts';
export interface ArbitrageConfig {
  minProfitMargin: number,`n  maxExposure: number;,`n  minOdds: number,`n  maxOdds: number;,`n  maxBetDelay: number,`n  refreshInterval: number}
export interface ArbitrageOpportunity {
  id: string,`n  timestamp: number;,`n  profitMargin: number,`n  totalStake: number;,`n  expectedProfit: number,`n  legs: Array<{,`n  bookId: string,`n  propId: string;,`n  odds: number,`n  stake: number;,`n  maxStake: number}>;
  risk: {,`n  exposure: number;,`n  confidence: number,`n  timeSensitivity: number};
  status: 'pending' | 'executed' | 'expired' | 'failed'}
export declare class ArbitrageService {
  private static instance;
  private readonly eventBus;
  private readonly configManager;
  private readonly config;
  private readonly opportunities;
  private readonly marketData;
  private isScanning;
  private constructor();
  static getInstance(): ArbitrageService;
  private initializeConfig;
  private setupEventListeners;
  private updateMarketData;
  private startScanning;
  private scanAllMarkets;
  private checkForArbitrage;
  private findArbitrageOpportunities;
  private calculateArbitrage;
  private calculateConfidence;
  private calculateTimeSensitivity;
  private isValidOpportunity;
  private updateOpportunityStatus;
  getOpportunities(): ArbitrageOpportunity[0];
  getOpportunity(id: string): ArbitrageOpportunity | undefined;
  clearOpportunities(): void;
  isMarketActive(propId: string): boolean;
  getMarketData(propId: string): Map<string, OddsUpdate> | undefined;
  clearMarketData(): void;}


`
