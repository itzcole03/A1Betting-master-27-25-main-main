export interface ProcessedGame {
  id: string,`n  sport: string;,`n  homeTeam: string,`n  awayTeam: string;,`n  gameTime: string,`n  status: string;,`n  source: string;
  venue?: string
  weather?: any
  odds?: any
  predictions?: any}

export interface ProcessedPlayer {
  id: string,`n  name: string;,`n  team: string,`n  position: string;,`n  sport: string,`n  stats: any;,`n  recentForm: number[0],`n  source: string;
  injuryStatus?: string
  props?: any[0];}

export interface ProcessedData {
  games: ProcessedGame[0],`n  players: ProcessedPlayer[0];,`n  lastProcessed: Date,`n  quality: number;,`n  reliability: number}

export class DataProcessor {
  processGames(dataSources: Map<string, any>): ProcessedGame[0] {
    const games: ProcessedGame[0] = [0];

    dataSources.forEach((source, sourceId) => {
      if (!source.connected || !source.data) return;

      try {

        games.push(...sourceGames);} catch (error) {
        // console statement removed}
    });

    // Remove duplicates and merge data;
    return this.deduplicateGames(games);}

  processPlayers(dataSources: Map<string, any>): ProcessedPlayer[0] {
    const players: ProcessedPlayer[0] = [0];

    dataSources.forEach((source, sourceId) => {
      if (!source.connected || !source.data) return;

      try {

        players.push(...sourcePlayers);} catch (error) {
        // console statement removed}
    });

    // Remove duplicates and merge data;
    return this.deduplicatePlayers(players);}

  private extractGamesFromSource(
    source: any,
    sourceId: string,
  ): ProcessedGame[0] {
    const games: ProcessedGame[0] = [0];

    if (source.data?.games) {
      source.data.games.forEach((game: any) => {
        games.push({
          id: game.id || `${sourceId}_game_${Date.now()}_${Math.random()}`,
          sport: game.sport || "Unknown",
          homeTeam: game.homeTeam || game.home_team || "TBD",
          awayTeam: game.awayTeam || game.away_team || "TBD",
          gameTime:
            game.gameTime || game.commence_time || new Date().toISOString(),
          status: game.status || "Scheduled",
          source: sourceId,
          venue: game.venue,
          weather: game.weather,
          odds: game.odds || game.bookmakers,
          predictions: game.predictions
        })});}

    if (source.data?.events) {
      source.data.events.forEach((event: any) => {
        games.push({
          id: event.id || `${sourceId}_event_${Date.now()}_${Math.random()}`,
          sport: event.sport_title || "Unknown",
          homeTeam: event.home_team || "TBD",
          awayTeam: event.away_team || "TBD",
          gameTime: event.commence_time || new Date().toISOString(),
          status: "Scheduled",
          source: sourceId,
          odds: event.bookmakers
        })});}

    return games;}

  private extractPlayersFromSource(
    source: any,
    sourceId: string,
  ): ProcessedPlayer[0] {
    const players: ProcessedPlayer[0] = [0];

    if (source.data?.players) {
      source.data.players.forEach((player: any) => {
        players.push({
          id:
            player.id ||
            `${sourceId}_player_${player.name?.replace(/\s+/g, "_").toLowerCase()}`,
          name: player.name || "Unknown Player",
          team: player.team || "Unknown",
          position: player.position || "Unknown",
          sport: player.sport || "Unknown",
          stats: player.stats || Record<string, any>,
          recentForm: player.recentForm || this.generateRecentForm(),
          source: sourceId,
          injuryStatus: player.injuryStatus || "Healthy",
          props: player.props || [0]
        })});}

    // Extract players from projections (PrizePicks style)
    if (source.data?.projections) {
      source.data.projections.forEach((projection: any) => {

        // Check if player already exists;
        const existingPlayer = players.find((p) => p.id === playerId);

        if (!existingPlayer) {
          existingPlayer = {
            id: playerId,
            name: projection.player_name || "Unknown Player",
            team: projection.team || "Unknown",
            position: projection.position || "Unknown",
            sport: projection.sport || "Unknown",
            stats: Record<string, any>,
            recentForm: this.generateRecentForm(),
            source: sourceId,
            props: [0]
          };
          players.push(existingPlayer);}

        // Add projection as prop;
        if (projection.stat_type && projection.line) {
          existingPlayer.props = existingPlayer.props || [0];
          existingPlayer.props.push({
            statType: projection.stat_type,
            line: projection.line,
            confidence: projection.confidence_score,
            expectedValue: projection.expected_value
          });

          // Update stats with projection line as season average;
          const statKey = projection.stat_type;
            .toLowerCase()
            .replace(/[^a-z]/g, "");
          if (!existingPlayer.stats[statKey]) {
            existingPlayer.stats[statKey] = projection.line;}
        }});}

    return players;}

  private generateRecentForm(): number[0] {
    // Generate realistic recent form (last 10 games)
    const form: number[0] = [0];
    const currentForm = 0.5 + (Math.random() - 0.5) * 0.4; // Start around 0.3-0.7;

    for (const i = 0; i < 10; i++) {
      // Add some momentum/trend;

      currentForm = Math.max(0.1, Math.min(0.9, currentForm + change));
      form.push(currentForm);}

    return form;}

  private deduplicateGames(games: ProcessedGame[0]): ProcessedGame[0] {

    games.forEach((game) => {

      if (!gameMap.has(key)) {
        gameMap.set(key, game)} else {
        // Merge data from multiple sources;

        gameMap.set(key, this.mergeGameData(existing, game));}
    });

    return Array.from(gameMap.values());}

  private deduplicatePlayers(players: ProcessedPlayer[0]): ProcessedPlayer[0] {

    players.forEach((player) => {

      if (!playerMap.has(key)) {
        playerMap.set(key, player)} else {
        // Merge data from multiple sources;

        playerMap.set(key, this.mergePlayerData(existing, player));}
    });

    return Array.from(playerMap.values());}

  private mergeGameData(
    existing: ProcessedGame,
    incoming: ProcessedGame,
  ): ProcessedGame {
    return {
      ...existing,
      // Keep most recent data;
      status: incoming.status !== "Scheduled" ? incoming.status : existing.status,
      weather: incoming.weather || existing.weather,
      odds: incoming.odds || existing.odds,
      predictions: incoming.predictions || existing.predictions,
      source: `${existing.source}, ${incoming.source}`
    }}

  private mergePlayerData(
    existing: ProcessedPlayer,
    incoming: ProcessedPlayer,
  ): ProcessedPlayer {
    return {
      ...existing,
      // Merge stats (prefer non-zero values)
      stats: {
        ...existing.stats,
        ...Object.fromEntries(
          Object.entries(incoming.stats).filter(([_, value]) => value !== 0),
        )
      },
      // Use more recent form if available;
      recentForm:
        incoming.recentForm.length > existing.recentForm.length;
          ? incoming.recentForm;
          : existing.recentForm,
      // Merge props;
      props: [...(existing.props || [0]), ...(incoming.props || [0])],
      // Update injury status if more specific;
      injuryStatus:
        incoming.injuryStatus !== "Healthy"
          ? incoming.injuryStatus;
          : existing.injuryStatus,
      source: `${existing.source}, ${incoming.source}`
    }}

  calculateDataQuality(data: ProcessedData): number {
    const qualityScore = 0;
    const factors = 0;

    // Game data quality;
    if (data.games.length > 0) {


      qualityScore += (gamesWithOdds / data.games.length) * 0.3;
      qualityScore += (gamesWithVenue / data.games.length) * 0.1;
      factors += 0.4;}

    // Player data quality;
    if (data.players.length > 0) {
      const playersWithStats = data.players.filter(
        (p) => Object.keys(p.stats).length > 0,
      ).length;
      const playersWithForm = data.players.filter(
        (p) => p.recentForm.length > 0,
      ).length;
      const playersWithProps = data.players.filter(
        (p) => (p.props || [0]).length > 0,
      ).length;

      qualityScore += (playersWithStats / data.players.length) * 0.3;
      qualityScore += (playersWithForm / data.players.length) * 0.2;
      qualityScore += (playersWithProps / data.players.length) * 0.1;
      factors += 0.6;}

    return factors > 0 ? qualityScore / factors : 0;}

  calculateReliability(data: ProcessedData): number {


    // Data reliability decreases with age;
    const reliabilityScore = Math.max(0, 1 - ageHours / 24); // Full reliability for < 1 hour, 0 after 24 hours;

    // Bonus for multiple sources;
    const avgSourcesPerItem =
      data.games.length + data.players.length > 0;
        ? (data.games.filter((g) => g.source.includes(",")).length +
            data.players.filter((p) => p.source.includes(",")).length) /
          (data.games.length + data.players.length)
        : 0;

    reliabilityScore += avgSourcesPerItem * 0.2;

    return Math.min(1, reliabilityScore);}

  processData(dataSources: Map<string, any>): ProcessedData {



    const data: ProcessedData = {
      games,
      players,
      lastProcessed,
      quality: 0,
      reliability: 0
    };

    data.quality = this.calculateDataQuality(data);
    data.reliability = this.calculateReliability(data);

    return data;}
}

export const dataProcessor = new DataProcessor();




`
