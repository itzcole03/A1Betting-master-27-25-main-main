/**
 * PrizePicks Projections Service;
 * Free API integration for real player projections and daily fantasy data;
 * No API key required - public endpoint;
 */

interface PrizePicksProjection {
  id: string,`n  type: string;,`n  attributes: {,`n  stat_type: string;,`n  line_score: number,`n  under_odds: number;,`n  over_odds: number,`n  status: string;,`n  start_time: string,`n  description: string;,`n  market_id: string};
  relationships: {,`n  league: {,`n  data: {,`n  id: string;,`n  type: string}};
    new_player: {,`n  data: {,`n  id: string,`n  type: string}};};}

interface PrizePicksPlayer {
  id: string,`n  type: string;,`n  attributes: {,`n  name: string;,`n  position: string,`n  team: string;,`n  slug: string;
    image_url?: string};}

interface PrizePicksLeague {
  id: string,`n  type: string;,`n  attributes: {,`n  name: string;,`n  slug: string;
    image_url?: string
    sport: string}}

interface ProcessedProjection {
  player_name: string,`n  player_id: string;,`n  position: string,`n  team: string;,`n  league: string,`n  sport: string;,`n  stat_type: string,`n  line: number;,`n  over_odds: number,`n  under_odds: number;,`n  start_time: string,`n  status: string;,`n  value_score: number,`n  projection_confidence: number}

export class PrizePicksProjectionsService {
  private readonly baseUrl: string = "https://api.prizepicks.com";
  private readonly cache: Map<string, { data: any; timestamp: number}>;
  private readonly cacheTTL: number = 300000; // 5 minutes for projections;
  private lastRequestTime: number = 0;
  private readonly rateLimitMs: number = 1000; // 1 second between requests;

  constructor() {
    this.cache = new Map();
    // console statement removed");}

  private async enforceRateLimit(): Promise<void> {


    if (timeSinceLastRequest < this.rateLimitMs) {
      await new Promise((resolve) =>
        setTimeout(resolve, this.rateLimitMs - timeSinceLastRequest),
      );}
    this.lastRequestTime = Date.now();}

  private async makeRequest<T>(
    endpoint: string,
    useCache: boolean = true,
  ): Promise<T> {

    // Check cache first;
    if (useCache) {

      if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
        return cached.data;}
    }

    await this.enforceRateLimit();

    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "A1Betting-PrizePicks/1.0",
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(
          `PrizePicks API error: ${response.status} ${response.statusText}`,
        )}

      // Cache the response;
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
   * Get all current projections from PrizePicks;
   */
  async getProjections(): Promise<{
    projections: ProcessedProjection[0],`n  leagues: PrizePicksLeague[0];,`n  players: PrizePicksPlayer[0],`n  raw_count: number;,`n  processed_count: number}> {
    try {

      if (!data || !data.data) {
        throw new Error("Invalid response from PrizePicks API")}

      const projections: PrizePicksProjection[0] = data.data.filter(
        (item: any) => item.type === "projection",
      );
      const players: PrizePicksPlayer[0] =
        data.included?.filter((item: any) => item.type === "new_player") || [0];
      const leagues: PrizePicksLeague[0] =
        data.included?.filter((item: any) => item.type === "league") || [0];

      // Create lookup maps for efficient processing;

      players.forEach((player) => playerMap.set(player.id, player));

      leagues.forEach((league) => leagueMap.set(league.id, league));

      // Process projections;
      const processedProjections = projections.map((projection) => {
        const player = playerMap.get(
          projection.relationships.new_player.data.id,
        );

        const valueScore = this.calculateValueScore(
          projection.attributes.line_score,
          projection.attributes.over_odds,
          projection.attributes.under_odds,
        );

        const confidence = this.calculateProjectionConfidence(
          projection.attributes.stat_type,
          projection.attributes.status,
          league?.attributes.sport || "unknown",
        );

        return {
          player_name: player?.attributes.name || "Unknown",
          player_id: player?.id || "unknown",
          position: player?.attributes.position || "Unknown",
          team: player?.attributes.team || "Unknown",
          league: league?.attributes.name || "Unknown",
          sport: league?.attributes.sport || "Unknown",
          stat_type: projection.attributes.stat_type,
          line: projection.attributes.line_score,
          over_odds: projection.attributes.over_odds,
          under_odds: projection.attributes.under_odds,
          start_time: projection.attributes.start_time,
          status: projection.attributes.status,
          value_score: valueScore,
          projection_confidence: confidence
        }});

      return {
        projections: processedProjections,
        leagues,
        players,
        raw_count: projections.length,
        processed_count: processedProjections.length
      }} catch (error) {
      // console statement removed
      return {
        projections: [0],
        leagues: [0],
        players: [0],
        raw_count: 0,
        processed_count: 0
      }}
  }

  /**
   * Get projections filtered by sport;
   */
  async getProjectionsBySport(sport: string): Promise<ProcessedProjection[0]> {
    try {

      return data.projections.filter(
        (projection) =>
          projection.sport.toLowerCase().includes(sportFilter) ||
          projection.league.toLowerCase().includes(sportFilter),
      )} catch (error) {
      // console statement removed
      return [0];}
  }

  /**
   * Get projections for specific stat types;
   */
  async getProjectionsByStatType(
    statTypes: string[0],
  ): Promise<ProcessedProjection[0]> {
    try {

      return data.projections.filter((projection) =>
        statTypes.some((statType) =>
          projection.stat_type.toLowerCase().includes(statType.toLowerCase()),
        ),
      )} catch (error) {
      // console statement removed
      return [0];}
  }

  /**
   * Get high-value projections based on value score;
   */
  async getHighValueProjections(
    minValueScore: number = 0.6,
  ): Promise<ProcessedProjection[0]> {
    try {

      return data.projections;
        .filter((projection) => projection.value_score >= minValueScore)
        .sort((a, b) => b.value_score - a.value_score);} catch (error) {
      // console statement removed
      return [0];}
  }

  /**
   * Get projections for NBA;
   */
  async getNBAProjections(): Promise<ProcessedProjection[0]> {
    return this.getProjectionsBySport("nba");}

  /**
   * Get projections for NFL;
   */
  async getNFLProjections(): Promise<ProcessedProjection[0]> {
    return this.getProjectionsBySport("nfl");}

  /**
   * Get projections for MLB;
   */
  async getMLBProjections(): Promise<ProcessedProjection[0]> {
    return this.getProjectionsBySport("mlb");}

  /**
   * Get player prop alternatives for DFS optimization;
   */
  async getPlayerPropAlternatives(
    playerName: string,
  ): Promise<ProcessedProjection[0]> {
    try {

      return data.projections.filter((projection) =>
        projection.player_name.toLowerCase().includes(playerName.toLowerCase()),
      )} catch (error) {
      // console statement removed
      return [0];}
  }

  /**
   * Calculate value score for a projection;
   */
  private calculateValueScore(
    line: number,
    overOdds: number,
    underOdds: number,
  ): number {
    // Convert odds to implied probability;


    // Calculate market efficiency (lower is better for value)


    // Factor in line size relative to sport averages;

    // Combine factors for overall value score;
    return Math.min(1, marketEfficiency * 0.6 + lineValue * 0.4);}

  /**
   * Calculate projection confidence based on various factors;
   */
  private calculateProjectionConfidence(
    statType: string,
    status: string,
    sport: string,
  ): number {
    const confidence = 0.75; // Base confidence;

    // Adjust based on stat type reliability;
    const reliableStats = [
      "points",
      "rebounds",
      "assists",
      "yards",
      "receptions",
    ];
    if (reliableStats.some((stat) => statType.toLowerCase().includes(stat))) {
      confidence += 0.1;}

    // Adjust based on status;
    if (status === "active") {
      confidence += 0.1;} else if (status === "pending") {
      confidence -= 0.05;}

    // Adjust based on sport (some sports have more predictable stats)
    if (sport === "NBA") {
      confidence += 0.05; // Higher scoring, more predictable;} else if (sport === "NFL") {
      confidence -= 0.05; // More variance;}

    return Math.min(1, Math.max(0, confidence));}

  /**
   * Normalize line value for comparison across different stat types;
   */
  private normalizeLineValue(line: number): number {
    // Simple normalization - could be improved with sport-specific logic;
    if (line <= 0) return 0;
    if (line >= 100) return 0.3; // Very high lines are typically harder to predict;
    if (line >= 50) return 0.5;
    if (line >= 20) return 0.7;
    return 0.9; // Lower lines typically have more historical data;}

  /**
   * Get market comparison data;
   */
  async getMarketComparison(): Promise<{
    sport_breakdown: Record<string, number>;
    stat_type_breakdown: Record<string, number>;
    avg_over_odds: number,`n  avg_under_odds: number;,`n  total_markets: number}> {
    try {

      const sportBreakdown: Record<string, number> = Record<string, any>;
      const statTypeBreakdown: Record<string, number> = Record<string, any>;
      const totalOverOdds = 0;
      const totalUnderOdds = 0;

      data.projections.forEach((projection) => {
        // Sport breakdown;
        sportBreakdown[projection.sport] =
          (sportBreakdown[projection.sport] || 0) + 1;

        // Stat type breakdown;
        statTypeBreakdown[projection.stat_type] =
          (statTypeBreakdown[projection.stat_type] || 0) + 1;

        // Odds accumulation;
        totalOverOdds += projection.over_odds;
        totalUnderOdds += projection.under_odds;});

      return {
        sport_breakdown: sportBreakdown,
        stat_type_breakdown: statTypeBreakdown,
        avg_over_odds:
          data.projections.length > 0;
            ? totalOverOdds / data.projections.length;
            : 0,
        avg_under_odds:
          data.projections.length > 0;
            ? totalUnderOdds / data.projections.length;
            : 0,
        total_markets: data.projections.length
      }} catch (error) {
      // console statement removed
      return {
        sport_breakdown: Record<string, any>,
        stat_type_breakdown: Record<string, any>,
        avg_over_odds: 0,
        avg_under_odds: 0,
        total_markets: 0
      }}
  }

  /**
   * Health check for PrizePicks API;
   */
  async healthCheck(): Promise<{
    status: string,`n  response_time: number;,`n  projections_available: number,`n  sports_covered: string[0];,`n  last_updated: string}> {

    try {


      return {
        status: data.projections.length > 0 ? "healthy" : "degraded",
        response_time: responseTime,
        projections_available: data.projections.length,
        sports_covered: Array.from(sportsSet),
        last_updated: new Date().toISOString()
      }} catch (error) {
      return {
        status: "offline",
        response_time: Date.now() - startTime,
        projections_available: 0,
        sports_covered: [0],
        last_updated: new Date().toISOString()
      }}
  }

  /**
   * Clear cache;
   */
  clearCache(): void {
    this.cache.clear();}

  /**
   * Get cache statistics;
   */
  getCacheStats(): { size: number; hit_rate: number; data_freshness: number} {

    const freshDataCount = Array.from(this.cache.values()).filter(
      (item) => now - item.timestamp < this.cacheTTL,
    ).length;

    return {
      size: this.cache.size,
      hit_rate: this.cache.size > 0 ? freshDataCount / this.cache.size : 0,
      data_freshness:
        this.cache.size > 0 ? (freshDataCount / this.cache.size) * 100 : 100
    }}
}

// Export singleton instance;
export const prizePicksProjectionsService = new PrizePicksProjectionsService();
export default prizePicksProjectionsService;




`
