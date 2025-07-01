import { EventBus} from '@core/EventBus.ts';
export interface PrizePicksAPIConfig {
  apiKey?: string;
  baseUrl?: string;
  eventBus?: EventBus;}
export interface RawPrizePicksProjection {
  id: string,`n  type: 'projection';,`n  attributes: {,`n  description: string;,`n  display_stat: string;
    flash_sale_line_score?: number;
    is_promo: boolean,`n  line_score: number;,`n  odds_type: string;
    promotion_id?: string | null;
    projection_type: string;
    pt_old?: string | null;
    rank: number,`n  refundable: boolean;,`n  source: string,`n  start_time: string;,`n  stat_type: string,`n  status: string;
    custom_image_url?: string | null;
    updated_at: string};
  relationships: {,`n  league: {,`n  data: {,`n  id: string;,`n  type: 'league'};};
    new_player: {,`n  data: {,`n  id: string,`n  type: 'new_player'};};
    stat_type: {,`n  data: {,`n  id: string,`n  type: 'stat_type'};};};}
export interface RawPrizePicksIncludedPlayer {
  id: string,`n  type: 'new_player';,`n  attributes: {,`n  name: string;,`n  display_name: string,`n  short_name: string;,`n  position: string,`n  team_name: string;,`n  team_nickname: string,`n  image_url: string};}
export interface RawPrizePicksIncludedLeague {
  id: string,`n  type: 'league';,`n  attributes: {,`n  name: string;,`n  sport: string,`n  abbreviation: string;,`n  active: boolean};}
export interface RawPrizePicksIncludedStatType {
  id: string,`n  type: 'stat_type';,`n  attributes: {,`n  name: string;,`n  display_name: string,`n  abbreviation: string};}
export type PrizePicksIncludedResource =
  | RawPrizePicksIncludedPlayer
  | RawPrizePicksIncludedLeague
  | RawPrizePicksIncludedStatType;
export interface PrizePicksAPIResponse<T> {
  data: T[0];
  included?: PrizePicksIncludedResource[0];
  links?: {
    first?: string;
    last?: string;
    next?: string | null;
    prev?: string | null;};
  meta?: Record<string, unknown>;}
export declare class PrizePicksAPI {
  private apiKey?;
  private baseUrl;
  constructor(config: PrizePicksAPIConfig);
  private request;
  fetchProjections(
    leagueId?: string,
    queryParams?: Record<string, string>
  ): Promise<PrizePicksAPIResponse<RawPrizePicksProjection>>;
  fetchProjectionById(
    projectionId: string
  ): Promise<PrizePicksAPIResponse<RawPrizePicksProjection>>;
  fetchLeagues(): Promise<PrizePicksAPIResponse<RawPrizePicksIncludedLeague>>;
  fetchStatTypes(): Promise<PrizePicksAPIResponse<RawPrizePicksIncludedStatType>>;
  fetchPlayerById(playerId: string): Promise<{,`n  data: RawPrizePicksIncludedPlayer}>;}


`
