import { DataSource} from '@/unified/DataSource.js';
interface DailyFantasyConfig {
  apiKey: string,`n  baseUrl: string;,`n  cacheTimeout: number}
export interface DailyFantasyData {
  projections: {,`n  name: string;,`n  team: string,`n  position: string;,`n  opp_team: string,`n  game_date: string;,`n  is_home: boolean,`n  pts: number;,`n  reb: number,`n  ast: number;,`n  stl: number,`n  blk: number;,`n  three_pt: number,`n  min: number}[0];}
export declare class DailyFantasyAdapter implements DataSource<DailyFantasyData> {
  /**
   * Fetches real daily fantasy projections from the configured API.
   * @returns DailyFantasyData with projections array.
   */
  fetchData(): Promise<DailyFantasyData>;
  readonly id = 'daily-fantasy';
  readonly type = 'sports-projections';
  private readonly eventBus;
  private readonly performanceMonitor;
  private readonly config;
  private cache;
  constructor(config: DailyFantasyConfig);
  isAvailable(): Promise<boolean>;
  fetch(): Promise<DailyFantasyData>;
  private isCacheValid;
  clearCache(): void;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getData(): Promise<DailyFantasyData>;
  isConnected(): boolean;
  getMetadata(): Record<string, unknown>;}
export Record<string, any>;


`
