import { DataSource} from '@/unified/DataSource.ts';
interface TheOddsConfig {
  apiKey: string,`n  baseUrl: string;,`n  cacheTimeout: number}
export interface TheOddsData {
  events: {,`n  id: string;,`n  sport: string,`n  commence_time: string;,`n  home_team: string,`n  away_team: string;,`n  bookmakers: Array<{,`n  key: string;,`n  title: string,`n  markets: Array<{,`n  key: string,`n  outcomes: Array<{,`n  name: string,`n  price: number;
          point?: number;}>;}>;}>;}[0];}
export declare class TheOddsAdapter implements DataSource<TheOddsData> {
  readonly id = 'the-odds';
  readonly type = 'betting-odds';
  private readonly eventBus;
  private readonly performanceMonitor;
  private readonly config;
  private cache;
  constructor(config: TheOddsConfig);
  isAvailable(): Promise<boolean>;
  fetch(): Promise<TheOddsData>;
  private fetchOddsData;
  private isCacheValid;
  clearCache(): void;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getData(): Promise<TheOddsData>;
  isConnected(): boolean;
  getMetadata(): Record<string, unknown>;}
export Record<string, any>;


`
