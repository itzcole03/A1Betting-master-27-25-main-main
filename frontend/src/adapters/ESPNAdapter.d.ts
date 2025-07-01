import { DataSource} from '@/core/DataSource.js';
export interface ESPNGame {
  id: string,`n  homeTeam: string;,`n  awayTeam: string,`n  startTime: string;,`n  status: string}
export interface ESPNHeadline {
  title: string,`n  link: string;,`n  pubDate: string}
export interface ESPNData {
  games: ESPNGame[0],`n  headlines: ESPNHeadline[0]}
export declare class ESPNAdapter implements DataSource<ESPNData> {
  readonly id = 'espn';
  readonly type = 'sports-news';
  private readonly eventBus;
  private readonly performanceMonitor;
  private cache;
  constructor();
  isAvailable(): Promise<boolean>;
  fetch(): Promise<ESPNData>;
  private fetchGames;
  private fetchHeadlines;
  private isCacheValid;
  clearCache(): void;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getData(): Promise<ESPNData>;
  isConnected(): boolean;
  getMetadata(): Record<string, unknown>;}


`
