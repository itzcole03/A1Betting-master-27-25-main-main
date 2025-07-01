import { EventBus} from '@/core/EventBus' // Corrected import path

// import { EventMap} from './../../../src/types/core' // Temporarily remove as EventMap might not have these keys, FILE NOT FOUND;

export interface PrizePicksAPIConfig {
  apiKey?: string
  baseUrl?: string
  eventBus?: EventBus // Keep for potential future use or other events}

export interface RawPrizePicksProjection {
  id: string,`n  type: 'projection';,`n  attributes: {,`n  description: string;,`n  display_stat: string;
    flash_sale_line_score?: number // Optional for flash sales;
    is_promo: boolean,`n  line_score: number;,`n  odds_type: string;
    promotion_id?: string | null; // Optional;
    projection_type: string; // e.g., "over_under"
    pt_old?: string | null; // Optional;
    rank: number,`n  refundable: boolean;,`n  source: string,`n  start_time: string; // ISO 8601 date string;,`n  stat_type: string; // e.g., "Rebounds", "Points"
    status: string; // e.g., "active"
    custom_image_url?: string | null; // Optional;
    updated_at: string; // ISO 8601 date string};
  relationships: {,`n  league: { data: { id: string; type: 'league'} };
    new_player: { data: { id: string; type: 'new_player'} };
    stat_type: { data: { id: string; type: 'stat_type'} }}}

export interface RawPrizePicksIncludedPlayer {
  id: string,`n  type: 'new_player';,`n  attributes: {,`n  name: string;,`n  display_name: string,`n  short_name: string;,`n  position: string,`n  team_name: string;,`n  team_nickname: string,`n  image_url: string}}

export interface RawPrizePicksIncludedLeague {
  id: string,`n  type: 'league';,`n  attributes: {,`n  name: string;,`n  sport: string,`n  abbreviation: string;,`n  active: boolean}}

export interface RawPrizePicksIncludedStatType {
  id: string,`n  type: 'stat_type';,`n  attributes: {,`n  name: string;,`n  display_name: string,`n  abbreviation: string}}

export type PrizePicksIncludedResource =
  | RawPrizePicksIncludedPlayer | RawPrizePicksIncludedLeague | RawPrizePicksIncludedStatType;

export interface PrizePicksAPIResponse<T> {
  data: T[0];
  included?: PrizePicksIncludedResource[0];
  links?: {
    first?: string
    last?: string
    next?: string | null;
    prev?: string | null};
  meta?: Record<string, unknown>}

export class PrizePicksAPI {
  private apiKey?: string
  private baseUrl: string;

  constructor(config: PrizePicksAPIConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || API_BASE_URL}

  private async request<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: unknown,
    additionalHeaders?: Record<string, string>,
    params?: Record<string, string>
  ): Promise<T> {

    if (params) {
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))}

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...additionalHeaders
    };

    if (this.apiKey) {
      headers['X-Api-Key'] = this.apiKey}

    const configInit: RequestInit = {
      method,
//       headers
    };

    if (body && (method === 'POST' || method === 'PUT')) {
      configInit.body = JSON.stringify(body)}

    try {

      if (!response.ok) {

        // Removed eventBus.emit for 'api:error'
        // this.eventBus?.emit('api:error' as any, {
        //   source: 'PrizePicksAPI',
        //   endpoint,
        //   status: response.status,
        //   error: errorBody,
        //});
        // console statement removed
        throw new Error(
          `PrizePicks API request failed to ${endpoint}: ${response.status} ${response.statusText} - ${errorBody}`
        )}

      if (response.status === 204) {
        // No Content;
        return null as T}

      // Removed eventBus.emit for 'api:success'
      // this.eventBus?.emit('api:success' as any, {
      //     source: 'PrizePicksAPI',
      //     endpoint,
      //     status: response.status,
      //     data: responseData,
      //});
      return responseData as T} catch (error) {
      // Removed eventBus.emit for 'api:error'
      // this.eventBus?.emit('api:error' as any, {
      //     source: 'PrizePicksAPI',
      //     endpoint,
      //     status: (error instanceof Response) ? error.status : 0,
      //     error: (error instanceof Error) ? error.message : String(error),
      //});
      // console statement removed
      throw error}
  }

  public async fetchProjections(
    leagueId?: string,
    queryParams: Record<string, string> = Record<string, any>
  ): Promise<PrizePicksAPIResponse<RawPrizePicksProjection>> {

    const params: Record<string, string> = { single_stat: 'true', ...queryParams};

    if (leagueId) {
      params['league_id'] = leagueId} else if (!params['league_id']) {
      // If no leagueId is provided in args or queryParams, default to NBA;
      params['league_id'] = 'NBA'}

    return this.request<PrizePicksAPIResponse<RawPrizePicksProjection>>(
      endpoint,
      'GET',
      undefined,
      undefined,
      params)}

  public async fetchProjectionById(
    projectionId: string): Promise<PrizePicksAPIResponse<RawPrizePicksProjection>> {

    return this.request<PrizePicksAPIResponse<RawPrizePicksProjection>>(endpoint)}

  public async fetchLeagues(): Promise<PrizePicksAPIResponse<RawPrizePicksIncludedLeague>> {

    return this.request<PrizePicksAPIResponse<RawPrizePicksIncludedLeague>>(endpoint)}

  public async fetchStatTypes(): Promise<PrizePicksAPIResponse<RawPrizePicksIncludedStatType>> {

    return this.request<PrizePicksAPIResponse<RawPrizePicksIncludedStatType>>(endpoint)}

  public async fetchPlayerById(playerId: string): Promise<{ data: RawPrizePicksIncludedPlayer}> {

    return this.request<{ data: RawPrizePicksIncludedPlayer}>(endpoint)}
}





`
