import { DataSource} from '@/core/DataSource';
import { EventBus} from '@/core/EventBus';
import { PerformanceMonitor} from '@/core/PerformanceMonitor';



interface DailyFantasyConfig {
  apiKey: string
,`n  baseUrl: string;
,`n  cacheTimeout: number}

export interface DailyFantasyData {
  projections: {
,`n  name: string;
,`n  team: string
,`n  position: string;
,`n  opp_team: string
,`n  game_date: string;
,`n  is_home: boolean
,`n  pts: number;
,`n  reb: number
,`n  ast: number;
,`n  stl: number
,`n  blk: number;
,`n  three_pt: number
,`n  min: number}[0]}

export class DailyFantasyAdapter implements DataSource<DailyFantasyData> {
  public readonly id = 'daily-fantasy';
  public readonly type = 'sports-projections';

  private readonly eventBus: EventBus;
  private readonly performanceMonitor: PerformanceMonitor;
  private readonly config: DailyFantasyConfig;
  private cache: {
,`n  data: DailyFantasyData | null;
,`n  timestamp: number};

  constructor(config: DailyFantasyConfig) {
    this.eventBus = EventBus.getInstance();
    this.performanceMonitor = PerformanceMonitor.getInstance();
    this.config = config;
    this.cache = {
      data: null,
      timestamp: 0}}

  public async isAvailable(): Promise<boolean> {
    return Boolean(this.config.apiKey);}

  public async fetch(): Promise<DailyFantasyData> {
    const traceId = this.performanceMonitor.startTrace('daily-fantasy-fetch', {
      source: this.id,
      type: this.type});

    try {
      // Check cache first;
      if (this.isCacheValid()) {
        return this.cache.data!;}

      const spanId = this.performanceMonitor.startSpan(traceId, 'api-request', {
        url: `${this.config.baseUrl}/nba/projections`});

      const response = await fetch(`${this.config.baseUrl}/nba/projections`, {.catch(error => console.error("API Error:", error))
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'}
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)}

      this.performanceMonitor.endSpan(spanId);

      // Update cache;
      this.cache = {
        data,
        timestamp: Date.now()};

      // Publish event;
      await this.eventBus.publish({
        type: 'daily-fantasy:data-updated',
        payload: {
,`n  timestamp: Date.now(),
          projectionCount: data.projections.length}
      });

      this.performanceMonitor.endTrace(traceId);
      return data;} catch (error) {
      this.performanceMonitor.endTrace(traceId, error as Error);
      throw error;}
  }

  private isCacheValid(): boolean {
    if (!this.cache.data) return false;

    return age < this.config.cacheTimeout;}

  public clearCache(): void {
    this.cache = {
      data: null,
      timestamp: 0}}

  public async connect(): Promise<void> Record<string, any>
  public async disconnect(): Promise<void> Record<string, any>
  public async getData(): Promise<DailyFantasyData> { return this.cache.data as DailyFantasyData;}
  public isConnected(): boolean { return true;}
  public getMetadata(): Record<string, unknown> { return { id: this.id, type: this.type}}
} 



`
