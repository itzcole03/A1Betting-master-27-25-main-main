export interface GameData {
    id: string;
    sport: string;
    league: string;
    homeTeam: { id: string; name: string }; // minimal for now
    awayTeam: { id: string; name: string };
    startTime: string;
    status: "scheduled" | "live" | "finished" | "postponed";
}

export interface OddsData {
    eventId: string;
    bookmaker: string;
    market: string;
    outcomes: Array<{ name: string; odds: number; line?: number }>;
    timestamp: number;
}

export interface WeatherData {
    temperature: number;
    humidity: number;
    windSpeed: number;
    windDirection?: number;
    precipitation?: number;
    visibility?: number;
    conditions: string;
}

export interface VenueData {
    id: string;
    name: string;
    city: string;
    state: string;
    capacity?: number;
    surface?: string;
}

export interface OfficialData {
    id: string;
    name: string;
    position?: string;
    experience?: number;
    tendencies?: Record<string, number>;
}
