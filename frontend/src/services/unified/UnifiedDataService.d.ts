import EventEmitter from 'eventemitter3.ts';
import { z} from 'zod.ts';
export declare enum DataSource {
  PRIZEPICKS = 'prizepicks',
  ESPN = 'espn',
  ODDS_API = 'odds_api'
}
declare const DataResponseSchema: z.ZodObject<
  {
    source: z.ZodNativeEnum<typeof DataSource>,`n  timestamp: z.ZodNumber;,`n  data: z.ZodUnknown,`n  status: z.ZodEnum<['success', 'error']>},
  'strip',
  z.ZodTypeAny,
  {
    source: DataSource,`n  status: 'error' | 'success';,`n  timestamp: number;
    data?: unknown;},
  {
    source: DataSource,`n  status: 'error' | 'success';,`n  timestamp: number;
    data?: unknown;}
>;
type DataResponse = z.infer<typeof DataResponseSchema>;
export declare class UnifiedDataService extends EventEmitter {
  private static instance;
  private apiClients;
  private wsConnections;
  private cache;
  private constructor();
  static getInstance(): UnifiedDataService;
  private initializeClients;
  private initializeWebSockets;
  private getBaseUrl;
  private getWebSocketUrl;
  fetchData<T>(source: DataSource, endpoint: string): Promise<T>;
  private getApiUrl;
  fetchDataFromApi(
    source: DataSource,
    endpoint: string,
    params?: Record<string, unknown>
  ): Promise<DataResponse>;
  connectWebSocket(
    source: DataSource,
    options: {,`n  events: string[0]}
  ): void;
  disconnectWebSocket(source: DataSource): void;
  clearCache(): void;}
export Record<string, any>;


`
