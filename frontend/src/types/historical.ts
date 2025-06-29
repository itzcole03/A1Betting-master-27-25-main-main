export interface HistoricalGameData {
    gameId: string;
    date: string;
    homeTeam: string;
    awayTeam: string;
    venue: string;
    result: {
        homeScore: number;
        awayScore: number;
        winner: string;
        margin: number;
    };
    weather: {
        temperature: number;
        humidity: number;
        windSpeed: number;
        precipitation: number;
        conditions: string;
    };
    attendance: number;
    duration: number;
    officials: string[];
    metadata?: Record<string, unknown>;
}

export interface PlayerStats {
    playerId: string;
    name: string;
    team: string;
    position: string;
    stats: Record<string, number>;
    advancedMetrics: Record<string, number>;
    gameLog: {
        gameId: string;
        date: string;
        stats: Record<string, number>;
        advancedMetrics: Record<string, number>;
    }[];
    metadata?: Record<string, unknown>;
}

export interface TeamStats {
    teamId: string;
    name: string;
    season: string;
    stats: Record<string, number>;
    advancedMetrics: Record<string, number>;
    homeStats: Record<string, number>;
    awayStats: Record<string, number>;
    lineupStats: Record<string, Record<string, number>>;
    metadata?: Record<string, unknown>;
}

export interface VenueStats {
    venueId: string;
    name: string;
    location: {
        city: string;
        state: string;
        country: string;
        coordinates: {
            latitude: number;
            longitude: number;
            altitude: number;
        };
    };
    capacity: number;
    surface: string;
    stats: Record<string, number>;
    weatherImpact: Record<string, number>;
    metadata?: Record<string, unknown>;
}

export interface OfficialStats {
    officialId: string;
    name: string;
    games: number;
    stats: Record<string, number>;
    tendencies: Record<string, number>;
    metadata?: Record<string, unknown>;
}
