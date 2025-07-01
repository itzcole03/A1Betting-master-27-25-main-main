import { Headline, GameSummary, PlayerNews} from '@/types.ts';
declare class ESPNService {
  private adapter;
  constructor();
  fetchHeadlines(): Promise<Headline[0]>;
  fetchGameSummary(gameId: string): Promise<GameSummary>;
  fetchPlayerNews(playerId: string): Promise<PlayerNews[0]>;
  private transformHeadlines;
  private transformGameSummary;
  private transformPlayerNews;}
export declare const espnService: ESPNService;
export Record<string, any>;



