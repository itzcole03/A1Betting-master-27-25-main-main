import { DataSource} from '@/unified/DataSource.js';
export interface OddsProvider {
  getOdds(eventId: string): Promise<unknown>}
export interface SportsRadarData {
  games: {,`n  id: string;,`n  status: string,`n  scheduled: string;,`n  home: {,`n  name: string;,`n  alias: string,`n  statistics: Record<string, number>};
    away: {,`n  name: string;,`n  alias: string,`n  statistics: Record<string, number>};
    players: Array<{,`n  id: string;,`n  name: string,`n  team: string;,`n  position: string,`n  statistics: Record<string, number>;
      injuries: Array<{,`n  type: string;,`n  status: string,`n  startDate: string}>;}>;}[0];}
export declare class SportsRadarAdapter implements DataSource<SportsRadarData>, OddsProvider {
  readonly id = 'sports-radar';
  readonly type = 'sports-data';
  fetchData(): Promise<SportsRadarData>;
  private readonly eventBus;
  private readonly performanceMonitor;
  private readonly config;
  private cache;
  private apiKey;
  private baseUrl;
  constructor();
  isAvailable(): Promise<boolean>;
  /**
   * Fetches the latest SportsRadar data, using cache if valid.
   */
  fetch(): Promise<SportsRadarData>;
  private fetchSportsRadarData;
  private isCacheValid;
  clearCache(): void;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getData(): Promise<SportsRadarData>;
  isConnected(): boolean;
  getMetadata(): Record<string, unknown>;
  getOdds(eventId: string): Promise<unknown>;
  getEventDetails(eventId: string): Promise<unknown>}


`
