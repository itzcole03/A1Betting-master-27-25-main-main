import { DataSource } from '../unified/DataSource';
import { EventBus } from '../unified/EventBus';
import { PerformanceMonitor } from '../unified/PerformanceMonitor';

export interface ESPNGame {
  id: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  status: string;
}

export interface ESPNHeadline {
  title: string;
  link: string;
  pubDate: string;
}

export interface ESPNData {
  games: ESPNGame[];
  headlines: ESPNHeadline[];
}

export class ESPNAdapter implements DataSource<ESPNData> {
  public readonly id = 'espn';
  public readonly type = 'sports-news';

  private readonly eventBus: EventBus;
  private readonly performanceMonitor: PerformanceMonitor;
  private cache: {
    data: ESPNData | null;
    timestamp: number;
  }

  constructor() {
    this.eventBus = EventBus.getInstance();
    this.performanceMonitor = PerformanceMonitor.getInstance();
    this.cache = {
      data: null,
      timestamp: 0
    }
  }

  public async isAvailable(): Promise<boolean> {
    return true;
  }

  public async fetch(): Promise<ESPNData> {
    const traceId = this.performanceMonitor.startTrace('espn-fetch', {
      source: this.id,
      type: this.type
    });

    try {
      if (this.isCacheValid()) {
        return this.cache.data!;
      }
      
      const [games, headlines] = await Promise.all([this.fetchGames(), this.fetchHeadlines()]);
      const data: ESPNData = { games, headlines }
      
      this.cache = { data, timestamp: Date.now() }
      await this.eventBus.publish({
        type: 'espn:data-updated',
        payload: { data: { gameCount: games.length, headlineCount: headlines.length }, timestamp: Date.now() }
      });
      
      this.performanceMonitor.endTrace(traceId);
      return data;
    } catch (error) {
      this.performanceMonitor.endTrace(traceId, error as Error);
      throw error;
    }
  }

  private async fetchGames(): Promise<ESPNGame[]> {
    // Use ESPN's public scoreboard API (NBA example)
    const url = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard';

    try {
      const response = await fetch(url);
      const json = await response.json();
      
      return (json.events || []).map((event: any) => {
        const eventData = event as Record<string, unknown>;
        const competitions = eventData.competitions as unknown[];
        const competitors = (competitions?.[0] as Record<string, unknown>)?.competitors as unknown[];

        const homeCompetitor = competitors?.find(
          (c: unknown) => (c as Record<string, unknown>).homeAway === 'home'
        ) as Record<string, unknown> | undefined;

        const awayCompetitor = competitors?.find(
          (c: unknown) => (c as Record<string, unknown>).homeAway === 'away'
        ) as Record<string, unknown> | undefined;

        return {
          id: eventData.id as string,
          homeTeam:
            ((homeCompetitor?.team as Record<string, unknown>)?.displayName as string) || '',
          awayTeam:
            ((awayCompetitor?.team as Record<string, unknown>)?.displayName as string) || '',
          startTime: eventData.date as string,
          status: ((eventData.status as Record<string, unknown>)?.type as Record<string, unknown>)
            ?.name as string
        }
      });
    } catch {
      return [];
    }
  }

  private async fetchHeadlines(): Promise<ESPNHeadline[]> {
    // Use ESPN's NBA news RSS feed
    const url = 'https://www.espn.com/espn/rss/nba/news';

    try {
      const response = await fetch(url);
      const text = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'text/xml');
      const items = xml.querySelectorAll('item');
      
      return Array.from(items).map(item => {
        const title = item.querySelector('title')?.textContent || '';
        const link = item.querySelector('link')?.textContent || '';
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        
        return { title, link, pubDate }
      });
    } catch {
      return [];
    }
  }

  private isCacheValid(): boolean {
    const cacheTimeout = 5 * 60 * 1000; // 5 minutes
    return this.cache.data !== null && Date.now() - this.cache.timestamp < cacheTimeout;
  }

  public clearCache(): void {
    this.cache = { data: null, timestamp: 0 }
  }

  public async connect(): Promise<void> {
    // Implementation for connection
  }

  public async disconnect(): Promise<void> {
    // Implementation for disconnection
}
