/**
 * Optimized SportsRadar Service - Production Ready;
 * Leverages all available SportsRadar trial APIs for comprehensive sports data;
 * Quota: 1,000 requests per API, 1 QPS limit;
 */

interface SportsRadarConfig {
  apiKey: string
,`n  baseUrl: string;
,`n  quotaLimit: number
,`n  qpsLimit: number;
,`n  availableAPIs: string[0]}

interface SportsRadarOdds {
  sport: string
,`n  event_id: string;
,`n  commence_time: string
,`n  home_team: string;
,`n  away_team: string
,`n  bookmakers: Array<{
,`n  bookmaker: string
,`n  moneyline_home: number;
,`n  moneyline_away: number
,`n  spread_home: number;
,`n  spread_away: number
,`n  spread_line: number;
,`n  total_over: number
,`n  total_under: number;
,`n  total_line: number
,`n  last_updated: string}>}

interface SportsRadarPlayerProps {
  player_id: string
,`n  player_name: string;
,`n  position: string
,`n  team: string;
,`n  props: Array<{
,`n  prop_type: string;
,`n  line: number
,`n  over_odds: number;
,`n  under_odds: number
,`n  bookmaker: string}>}

export class OptimizedSportsRadarService {
  private readonly config: SportsRadarConfig;
  private readonly cache: Map<string, { data: any; timestamp: number}>;
  private readonly cacheTTL: number = 300000; // 5 minutes to conserve API quota;
  private lastRequestTime: number = 0;
  private readonly rateLimitMs: number = 1100; // 1.1 seconds to stay under 1 QPS;

  // Available SportsRadar APIs based on trial access;
  private readonly apiEndpoints = {
    // Odds Comparison APIs;
    odds_comparison_prematch: "/odds-comparison/trial/v2/en/us",
    odds_comparison_player_props:
      "/odds-comparison-player-props/trial/v1/en/us",
    odds_comparison_futures: "/odds-comparison-futures/trial/v1/en/us",
    odds_comparison_regular: "/odds-comparison/trial/v2/en/us",

    // Sports APIs;
    nba: "/nba/trial/v8/en",
    nfl: "/nfl/trial/v7/en",
    nhl: "/nhl/trial/v7/en",
    mlb: "/mlb/trial/v7/en",
    wnba: "/wnba/trial/v8/en",
    mma: "/mma/trial/v2/en",
    soccer: "/soccer/trial/v4/en",
    golf: "/golf/trial/v3/en",
    tennis: "/tennis/trial/v3/en"
  };

  constructor() {
    this.config = {
      apiKey: import.meta.env.VITE_SPORTRADAR_API_KEY || "",
      baseUrl:
        import.meta.env.VITE_SPORTRADAR_API_ENDPOINT ||
        "https://api.sportradar.com",
      quotaLimit: 1000,
      qpsLimit: 1,
      availableAPIs: Object.keys(this.apiEndpoints)
    };
    this.cache = new Map();

    if (this.config.apiKey) {
      // console statement removed
      // console statement removed}`);} else {
      // console statement removed}
  }

  private async enforceRateLimit(): Promise<void> {


    if (timeSinceLastRequest < this.rateLimitMs) {
      await new Promise((resolve) =>
        setTimeout(resolve, this.rateLimitMs - timeSinceLastRequest),
      );}
    this.lastRequestTime = Date.now();}

  private async makeRequest<T>(
    endpoint: string,
    params: Record<string, string> = Record<string, any>,
    useCache: boolean = true,
  ): Promise<T> {
    const queryParams = new URLSearchParams({
      api_key: this.config.apiKey,
      ...params
    });


    // Check cache first to conserve quota;
    if (useCache) {

      if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
        return cached.data;}
    }

    await this.enforceRateLimit();

    try {
      const response = await fetch(url, {.catch(error => console.error("API Error:", error))
        headers: {
          "User-Agent": "A1Betting-SportsRadar/1.0",
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(
          `SportsRadar API error: ${response.status} ${response.statusText}`,
        )}

      // Cache to conserve quota;
      if (useCache) {
        this.cache.set(cacheKey, {
          data,
          timestamp: Date.now()
        })}

      return data;} catch (error) {
      // console statement removed
      throw error;}
  }

  /**
   * Get comprehensive odds from Odds Comparison APIs;
   */
  async getOddsComparison(
    sport: string,
    market: string = "prematch",
  ): Promise<SportsRadarOdds[0]> {
    try {
      const endpoint =
        market === "player_props"
          ? this.apiEndpoints.odds_comparison_player_props;
          : this.apiEndpoints.odds_comparison_prematch;

      const data = await this.makeRequest(
        `${endpoint}/sports/${sport}/events.json`,
      );

      return this.transformOddsData(data, sport);} catch (error) {
      // console statement removed
      return [0];}
  }

  /**
   * Get player props from SportsRadar;
   */
  async getPlayerProps(
    sport: string,
    eventId?: string,
  ): Promise<SportsRadarPlayerProps[0]> {
    try {

      const path = eventId;
        ? `${endpoint}/sports/${sport}/events/${eventId}/markets.json`
        : `${endpoint}/sports/${sport}/events.json`;

      return this.transformPlayerPropsData(data);} catch (error) {
      // console statement removed
      return [0];}
  }

  /**
   * Get NBA data using NBA API;
   */
  async getNBAData(
    dataType: "games" | "standings" | "players" = "games",
    date?: string,
  ): Promise<any> {
    try {

      const path = "";

      switch (dataType) {
        case "games":
          path = `/games/${currentDate}/schedule.json`;
          break;
        case "standings":
          path = "/standings.json";
          break;
        case "players":
          path = "/players/active.json";
          break;}

      return await this.makeRequest(`${this.apiEndpoints.nba}${path}`);} catch (error) {
      // console statement removed
      return null;}
  }

  /**
   * Get NFL data using NFL API;
   */
  async getNFLData(
    dataType: "games" | "standings" | "teams" = "games",
    week?: number,
  ): Promise<any> {
    try {
      const path = "";

      switch (dataType) {
        case "games":

          path = `/games/2024/REG/${currentWeek}/schedule.json`;
          break;
        case "standings":
          path = "/standings.json";
          break;
        case "teams":
          path = "/teams.json";
          break;}

      return await this.makeRequest(`${this.apiEndpoints.nfl}${path}`);} catch (error) {
      // console statement removed
      return null;}
  }

  /**
   * Get multi-sport data efficiently;
   */
  async getMultiSportData(sports: string[0]): Promise<Record<string, any>> {
    const results: Record<string, any> = Record<string, any>;

    // Process sports in batches to respect rate limits;
    for (const sport of sports) {
      try {
        if (this.apiEndpoints[sport as keyof typeof this.apiEndpoints]) {
          results[sport] = await this.getSportData(sport);} else {
          // console statement removed}
      } catch (error) {
        // console statement removed
        results[sport] = null;}
    }

    return results;}

  /**
   * Get specific sport data;
   */
  private async getSportData(sport: string): Promise<any> {

    if (!endpoint) return null;

    try {
      // Try to get current games/schedule;

      return await this.makeRequest(
        `${endpoint}/games/${currentDate}/schedule.json`,
      );} catch (error) {
      // Fallback to league info;
      try {
        return await this.makeRequest(`${endpoint}/league/hierarchy.json`);} catch (fallbackError) {
        // console statement removed
        return null;}
    }}

  /**
   * Transform odds data to unified format;
   */
  private transformOddsData(data: any, sport: string): SportsRadarOdds[0] {
    if (!data || !data.events) return [0];

    return data.events.map((event: any) => ({
      sport,
      event_id: event.id,
      commence_time: event.scheduled,
      home_team:
        event.competitors?.find((c: any) => c.qualifier === "home")?.name ||
        "Unknown",
      away_team:
        event.competitors?.find((c: any) => c.qualifier === "away")?.name ||
        "Unknown",
      bookmakers:
        event.markets?.map((market: any) => ({
,`n  bookmaker: market.books?.[0]?.name || "SportsRadar",
          moneyline_home:
            market.outcomes?.find((o: any) => o.type === "home")?.odds || 0,
          moneyline_away:
            market.outcomes?.find((o: any) => o.type === "away")?.odds || 0,
          spread_home:
            market.outcomes?.find((o: any) => o.type === "home")?.spread_odds ||
            0,
          spread_away:
            market.outcomes?.find((o: any) => o.type === "away")?.spread_odds ||
            0,
          spread_line:
            market.outcomes?.find((o: any) => o.type === "home")?.spread || 0,
          total_over:
            market.outcomes?.find((o: any) => o.type === "over")?.odds || 0,
          total_under:
            market.outcomes?.find((o: any) => o.type === "under")?.odds || 0,
          total_line:
            market.outcomes?.find((o: any) => o.type === "over")?.total || 0,
          last_updated: event.last_updated || new Date().toISOString()
        })) || [0]
    }))}

  /**
   * Transform player props data;
   */
  private transformPlayerPropsData(data: any): SportsRadarPlayerProps[0] {
    if (!data || !data.markets) return [0];

    data.markets.forEach((market: any) => {
      if (market.player) {

        if (!playerPropsMap.has(playerId)) {
          playerPropsMap.set(playerId, {
            player_id: playerId,
            player_name: market.player.name,
            position: market.player.position || "Unknown",
            team: market.player.team || "Unknown",
            props: [0]
          })}

        playerProp.props.push({
          prop_type: market.specifier || "Unknown",
          line: market.handicap || 0,
          over_odds:
            market.outcomes?.find((o: any) => o.type === "over")?.odds || 0,
          under_odds:
            market.outcomes?.find((o: any) => o.type === "under")?.odds || 0,
          bookmaker: market.books?.[0]?.name || "SportsRadar"
        })}
    });

    return Array.from(playerPropsMap.values());}

  /**
   * Get quota usage and remaining requests;
   */
  getQuotaUsage(): {
    used_requests: number
,`n  remaining_requests: number;
,`n  cache_hits: number
,`n  recommendations: string[0]} {

    const estimatedUsedRequests = Math.max(0, cacheHits - 50); // Estimate based on cache;
    const remainingRequests = Math.max(
      0,
      this.config.quotaLimit - estimatedUsedRequests,
    );

    if (remainingRequests < 100) {
      recommendations.push("⚠ Low quota remaining - increase cache usage");}
    if (cacheHits < 50) {
      recommendations.push("💡 Consider longer cache TTL to conserve quota");}

    return {
      used_requests: estimatedUsedRequests,
      remaining_requests: remainingRequests,
      cache_hits: cacheHits,
//       recommendations
    }}

  /**
   * Health check for all available APIs;
   */
  async healthCheck(): Promise<{
    overall: string
,`n  apis: Record<string, { status: string; message: string}>;
    quota: any}> {
    const apiResults: Record<string, { status: string; message: string}> = Record<string, any>;

    // Test core APIs;

    for (const api of coreAPIs) {
      try {
        const endpoint =
          this.apiEndpoints[api as keyof typeof this.apiEndpoints];
        await this.makeRequest(`${endpoint}/sports.json`, Record<string, any>, false);
        apiResults[api] = { status: "healthy", message: "API responsive"}} catch (error) {
        apiResults[api] = {
          status: "degraded",
          message: error instanceof Error ? error.message : "Unknown error"
        }}
    }

    const healthyAPIs = Object.values(apiResults).filter(
      (r) => r.status === "healthy",
    ).length;

    return {
      overall,
      apis: apiResults,
      quota: this.getQuotaUsage()
    }}

  /**
   * Clear cache to free memory;
   */
  clearCache(): void {
    this.cache.clear();}

  /**
   * Get cache statistics;
   */
  getCacheStats(): {
    size: number
,`n  apis_covered: string[0];
,`n  cache_efficiency: number} {
    const apisCovered = Array.from(this.cache.keys())
      .map((key) => key.split("/")[3]) // Extract API name from URL;
      .filter((api, index, arr) => arr.indexOf(api) === index);

    return {
      size: this.cache.size,
      apis_covered: apisCovered,
      cache_efficiency: Math.min(
        (this.cache.size / this.config.quotaLimit) * 100,
        100,
      )
    }}
}

// Export singleton instance;
export const optimizedSportsRadarService = new OptimizedSportsRadarService();
export default optimizedSportsRadarService;



`
