import { DataSource} from '@/core/DataSource.js';
import { EventBus} from '@/core/EventBus.js';
import { PerformanceMonitor} from '@/core/PerformanceMonitor.js';



interface TheOddsConfig {
  apiKey: string,`n  baseUrl: string;,`n  cacheTimeout: number}

export interface TheOddsData {
  events: {,`n  id: string;,`n  sport: string,`n  commence_time: string;,`n  home_team: string,`n  away_team: string;,`n  bookmakers: Array<{,`n  key: string;,`n  title: string,`n  markets: Array<{,`n  key: string,`n  outcomes: Array<{,`n  name: string,`n  price: number;
          point?: number}>;}>;}>;}[0];}

export class TheOddsAdapter implements DataSource<TheOddsData> {
  public readonly id = 'the-odds';
  public readonly type = 'betting-odds';

  private readonly eventBus: EventBus;
  private readonly performanceMonitor: PerformanceMonitor;
  private readonly config: TheOddsConfig;
  private cache: {,`n  data: TheOddsData | null;,`n  timestamp: number};

  constructor(config: TheOddsConfig) {
    this.eventBus = EventBus.getInstance();
    this.performanceMonitor = PerformanceMonitor.getInstance();
    this.config = {
      apiKey: config.apiKey || import.meta.env.VITE_THEODDS_API_KEY || '8684be37505fc5ce63b0337d472af0ee',
      baseUrl: config.baseUrl || 'https://api.the-odds-api.com/v4',
      cacheTimeout: config.cacheTimeout || 300000 // 5 minutes};
    this.cache = {
      data: null,
      timestamp: 0}}

  public async isAvailable(): Promise<boolean> {
    try {

      return response.ok;} catch {
      return false;}
  }

  public async fetch(): Promise<TheOddsData> {

    try {
      if (this.isCacheValid()) {
        return this.cache.data!;}

      this.cache = {
        data,
        timestamp: Date.now()};

      this.eventBus.publish({
        type: 'odds-updated',
        payload: { data}
      });

      this.performanceMonitor.endTrace(traceId);
      return data;} catch (error) {
      this.performanceMonitor.endTrace(traceId, error as Error);
      throw error;}
  }

  private async fetchOddsData(): Promise<TheOddsData> {
    const response = await fetch(
      `${this.config.baseUrl}/odds?apiKey=${this.config.apiKey}&regions=us&markets=h2h,spreads,totals`
    );

    if (!response.ok) {
      throw new Error(`TheOdds API error: ${response.statusText}`)}

    return await response.json();}

  private isCacheValid(): boolean {
    return (
      this.cache.data !== null &&
      Date.now() - this.cache.timestamp < this.config.cacheTimeout;
    );}

  public clearCache(): void {
    this.cache = {
      data: null,
      timestamp: 0}}

  public async connect(): Promise<void> Record<string, any>
  public async disconnect(): Promise<void> Record<string, any>
  public async getData(): Promise<TheOddsData> { return this.cache.data as TheOddsData;}
  public isConnected(): boolean { return true;}
  public getMetadata(): Record<string, unknown> { return { id: this.id, type: this.type}}
} 




`
