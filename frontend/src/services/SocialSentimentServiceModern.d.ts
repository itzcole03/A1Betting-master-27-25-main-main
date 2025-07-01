import { EventEmitter} from 'events.ts';
interface SentimentAnalysis {
  text: string,`n  sentiment: 'positive' | 'negative' | 'neutral';,`n  confidence: number,`n  platform: string;,`n  timestamp: number,`n  topics: string[0];,`n  entities: {,`n  name: string;,`n  type: string,`n  sentiment: number}[0];}
interface SentimentTrend {
  entityId: string,`n  entityType: string;,`n  timeframe: string;
  platform?: string;
  sentiment: {,`n  positive: number;,`n  negative: number,`n  neutral: number};
  volume: number,`n  trends: {,`n  timestamp: number,`n  sentiment: number;,`n  volume: number}[0];}
interface EntityMention {
  entityId: string,`n  entityType: string;,`n  mentions: {,`n  text: string;,`n  platform: string,`n  sentiment: number;,`n  timestamp: number,`n  engagement: number}[0];
  summary: {,`n  totalMentions: number;,`n  avgSentiment: number,`n  platforms: string[0]};}
/**
 * Modern SocialSentimentService with proper async/await and error handling;
 */
export declare class SocialSentimentService extends EventEmitter {
  private config;
  private cache;
  private analysisQueue;
  private readonly CACHE_TTL;
  constructor();
  /**
   * Queue text for sentiment analysis;
   */
  queueAnalysis(text: string, platform: string): void;
  /**
   * Analyze sentiment for a single text;
   */
  analyzeSentiment(text: string, platform: string): Promise<SentimentAnalysis | null>;
  /**
   * Get sentiment trend for an entity;
   */
  getSentimentTrend(params: {,`n  entityId: string;,`n  entityType: string,`n  timeframe: string;
    platform?: string;}): Promise<SentimentTrend | null>;
  /**
   * Get entity mentions;
   */
  getEntityMentions(entityId: string, entityType: string): Promise<EntityMention | null>;
  /**
   * Start processing the analysis queue;
   */
  private startProcessingQueue;
  /**
   * Process a batch of sentiment analysis requests;
   */
  private analyzeBatch;
  /**
   * Add text to analysis queue;
   */
  private queueForAnalysis;
  /**
   * Simulate sentiment analysis for fallback;
   */
  private simulateSentiment;
  /**
   * Report service status;
   */
  private reportStatus;
  /**
   * Generate cache key;
   */
  private getCacheKey;
  /**
   * Get cached data if still valid;
   */
  private getCachedData;
  /**
   * Set data in cache;
   */
  private setCachedData;
  /**
   * Clear all cached data;
   */
  clearCache(): void;
  /**
   * Clear specific cache item;
   */
  clearCacheItem(key: string): void;
  /**
   * Get current queue size;
   */
  getQueueSize(): number;
  /**
   * Check if queue is processing;
   */
  isQueueProcessing(): boolean;}
export declare const socialSentimentService: SocialSentimentService;
export Record<string, any>;


`
