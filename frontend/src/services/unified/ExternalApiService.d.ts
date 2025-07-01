import { EventEmitter} from 'events.ts';
export interface SportsNewsArticle {
  id: string,`n  title: string;,`n  summary: string,`n  url: string;,`n  publishedAt: string}
interface ApiConfig {
  baseURL: string;
  timeout?: number;}
/**
 * Modern ExternalApiService with proper async/await and error handling;
 */
export declare class ExternalApiService extends EventEmitter {
  private config;
  constructor(config: ApiConfig);
  /**
   * @deprecated Use newsService.fetchHeadlines instead. This method will be removed in a future release.
   * Calls the unified newsService.fetchHeadlines for robust news fetching.
   */
  getSportsNews(): Promise<SportsNewsArticle[0]>;
  getSchedule(): Promise<any[0]>;}
export declare const externalApiService: ExternalApiService;
export Record<string, any>;


`
