import { DataSource} from '@/core/DataSource.ts';
export interface SocialSentimentData {
  player: string,`n  sentiment: {,`n  score: number,`n  volume: number;,`n  sources: {,`n  twitter: number;,`n  reddit: number,`n  news: number};};
  trending: boolean,`n  keywords: string[0];,`n  timestamp: number}
export declare class SocialSentimentAdapter implements DataSource<SocialSentimentData[0]> {
  readonly id = 'social-sentiment';
  readonly type = 'sentiment-analysis';
  private readonly eventBus;
  private readonly performanceMonitor;
  private cache;
  constructor();
  isAvailable(): Promise<boolean>;
  fetch(): Promise<SocialSentimentData[0]>;
  private gatherSocialSentiment;
  private isCacheValid;
  clearCache(): void;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getData(): Promise<SocialSentimentData[0]>;
  isConnected(): boolean;
  getMetadata(): Record<string, unknown>;}


`
