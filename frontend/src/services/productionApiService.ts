/**
 * Production API Service for A1Betting Frontend
 * 
 * This service provides a unified interface to all backend endpoints,
 * replacing all hardcoded URLs and mock data with real API calls.
 * 
 * Integrates with the production backend endpoints created in:
 * - backend/main_enhanced_prod.py
 * - backend/specialist_apis.py
 * - backend/config_manager.py
 */

import axios from 'axios';

// Define interfaces to work with any axios version
interface ApiAxiosInstance {
    get<T = any>(url: string): Promise<{ data: T }>;
    post<T = any>(url: string, data?: any): Promise<{ data: T }>;
    put<T = any>(url: string, data?: any): Promise<{ data: T }>;
    delete<T = any>(url: string): Promise<{ data: T }>;
    interceptors: {
        request: {
            use(onFulfilled: (config: any) => any, onRejected?: (error: any) => any): void;
        };
        response: {
            use(onFulfilled: (response: any) => any, onRejected?: (error: any) => any): void;
        };
    };
}

// Types for API responses
export interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
}

export interface HealthResponse {
    status: string;
    timestamp: string;
    version: string;
    services: {
        database: string;
        cache: string;
        specialist_apis: string;
    };
    system: {
        cpu_usage: number;
        memory_usage: number;
        disk_usage: number;
    };
}

export interface GameData {
    id: string;
    sport: string;
    home_team: string;
    away_team: string;
    start_time: string;
    status: string;
    odds?: OddsData[];
}

export interface OddsData {
    bookmaker: string;
    market: string;
    outcomes: {
        name: string;
        price: number;
    }[];
    last_update: string;
}

export interface PlayerProp {
    id: string;
    player_name: string;
    stat_type: string;
    line: number;
    over_odds: number;
    under_odds: number;
    game_id: string;
    market_source: string;
}

export interface NewsItem {
    id: string;
    title: string;
    description: string;
    url: string;
    source: string;
    published_at: string;
    sport?: string;
}

export interface PredictionData {
    id: string;
    game_id: string;
    prediction_type: string;
    confidence: number;
    predicted_outcome: string;
    probability: number;
    model_used: string;
    features_used: string[];
    created_at: string;
}

export interface ArbitrageOpportunity {
    id: string;
    game_id: string;
    sport: string;
    bookmakers: string[];
    profit_percentage: number;
    total_stake: number;
    legs: {
        bookmaker: string;
        market: string;
        selection: string;
        odds: number;
        stake: number;
    }[];
    expires_at: string;
}

export interface ValueBet {
    id: string;
    game_id: string;
    market: string;
    selection: string;
    bookmaker_odds: number;
    fair_odds: number;
    value_percentage: number;
    recommended_stake: number;
    confidence: number;
}

export interface UserProfile {
    id: string;
    email: string;
    username: string;
    risk_profile: string;
    bankroll: number;
    total_bets: number;
    win_rate: number;
    total_profit: number;
    created_at: string;
}

class ProductionApiService {
    private client: ApiAxiosInstance;
    private baseURL: string;

    constructor() {
        this.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

        this.client = axios.create({
            baseURL: this.baseURL,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        }) as ApiAxiosInstance;

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        // Request interceptor for authentication
        this.client.interceptors.request.use(
            (config: any) => {
                const token = localStorage.getItem('auth_token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error: any) => Promise.reject(error)
        );

        // Response interceptor for error handling
        this.client.interceptors.response.use(
            (response: any) => response,
            (error: any) => {
                if (error.response?.status === 401) {
                    localStorage.removeItem('auth_token');
                    window.location.href = '/login';
                }

                // Log errors in development
                if (import.meta.env.DEV) {
                    console.error('API Error:', error.response?.data || error.message);
                }

                return Promise.reject(error);
            }
        );
    }

    // Health and System Endpoints
    async getHealth(): Promise<HealthResponse> {
        const response = await this.client.get<HealthResponse>('/health');
        return response.data;
    }

    async getDetailedHealth(): Promise<any> {
        const response = await this.client.get('/health/detailed');
        return response.data;
    }

    // Live Games and Sports Data
    async getLiveGames(sport?: string, date?: string): Promise<GameData[]> {
        const params = new URLSearchParams();
        if (sport) params.append('sport', sport);
        if (date) params.append('date', date);

        const response = await this.client.get<GameData[]>(`/api/v1/live-games?${params}`);
        return response.data;
    }

    async getGameOdds(gameId: string, market?: string): Promise<OddsData[]> {
        const params = new URLSearchParams();
        if (market) params.append('market', market);

        const response = await this.client.get<OddsData[]>(`/api/v1/odds/${gameId}?${params}`);
        return response.data;
    }

    // Player Props and Statistics
    async getPlayerProps(sport?: string, player?: string): Promise<PlayerProp[]> {
        const params = new URLSearchParams();
        if (sport) params.append('sport', sport);
        if (player) params.append('player', player);

        const response = await this.client.get<PlayerProp[]>(`/api/v1/player-props?${params}`);
        return response.data;
    }

    async getPlayerStats(playerId: string): Promise<any> {
        const response = await this.client.get(`/api/v1/player-stats/${playerId}`);
        return response.data;
    }

    // News and Information
    async getSportsNews(sport?: string, limit?: number): Promise<NewsItem[]> {
        const params = new URLSearchParams();
        if (sport) params.append('sport', sport);
        if (limit) params.append('limit', limit.toString());

        const response = await this.client.get<NewsItem[]>(`/api/v1/sports-news?${params}`);
        return response.data;
    }

    // Predictions and Analysis
    async getPredictions(gameId?: string, sport?: string): Promise<PredictionData[]> {
        const params = new URLSearchParams();
        if (gameId) params.append('game_id', gameId);
        if (sport) params.append('sport', sport);

        const response = await this.client.get<PredictionData[]>(`/api/predictions?${params}`);
        return response.data;
    }

    async getBettingOpportunities(sport?: string, minValue?: number): Promise<any[]> {
        const params = new URLSearchParams();
        if (sport) params.append('sport', sport);
        if (minValue) params.append('min_value', minValue.toString());

        const response = await this.client.get(`/api/betting-opportunities?${params}`);
        return response.data;
    }

    // Arbitrage and Value Betting
    async getArbitrageOpportunities(sport?: string, minProfit?: number): Promise<ArbitrageOpportunity[]> {
        const params = new URLSearchParams();
        if (sport) params.append('sport', sport);
        if (minProfit) params.append('min_profit', minProfit.toString());

        const response = await this.client.get<ArbitrageOpportunity[]>(`/api/arbitrage-opportunities?${params}`);
        return response.data;
    }

    async getValueBets(sport?: string, minValue?: number): Promise<ValueBet[]> {
        const params = new URLSearchParams();
        if (sport) params.append('sport', sport);
        if (minValue) params.append('min_value', minValue.toString());

        const response = await this.client.get<ValueBet[]>(`/api/value-bets?${params}`);
        return response.data;
    }

    // User Management
    async getUserProfile(): Promise<UserProfile> {
        const response = await this.client.get<UserProfile>('/api/user/profile');
        return response.data;
    }

    async updateUserProfile(data: Partial<UserProfile>): Promise<UserProfile> {
        const response = await this.client.put<UserProfile>('/api/user/profile', data);
        return response.data;
    }

    // Betting Actions
    async placeBet(betData: {
        game_id: string;
        market: string;
        selection: string;
        stake: number;
        odds: number;
    }): Promise<any> {
        const response = await this.client.post('/api/place-bet', betData);
        return response.data;
    }

    async getUserBets(status?: string): Promise<any[]> {
        const params = new URLSearchParams();
        if (status) params.append('status', status);

        const response = await this.client.get(`/api/user/bets?${params}`);
        return response.data;
    }

    // Analytics and Feedback
    async getAnalytics(timeframe?: string): Promise<any> {
        const params = new URLSearchParams();
        if (timeframe) params.append('timeframe', timeframe);

        const response = await this.client.get(`/api/analytics?${params}`);
        return response.data;
    }

    async submitFeedback(feedback: {
        prediction_id: string;
        outcome: boolean;
        confidence: number;
        notes?: string;
    }): Promise<any> {
        const response = await this.client.post('/api/feedback', feedback);
        return response.data;
    }

    // Unified Data Feed
    async getUnifiedFeed(date?: string): Promise<{
        live_games: GameData[];
        top_props: PlayerProp[];
        value_bets: ValueBet[];
        arbitrage_opportunities: ArbitrageOpportunity[];
        latest_news: NewsItem[];
        predictions: PredictionData[];
    }> {
        const params = new URLSearchParams();
        if (date) params.append('date', date);

        const response = await this.client.get(`/api/v1/unified-data?${params}`);
        return response.data;
    }

    // Specialist API Endpoints (direct access to external data)
    async getSportradarGames(sport: string, date?: string): Promise<any[]> {
        const params = new URLSearchParams();
        params.append('sport', sport);
        if (date) params.append('date', date);

        const response = await this.client.get(`/api/v1/sr/games?${params}`);
        return response.data;
    }

    async getTheOddsData(sport: string, region?: string): Promise<any[]> {
        const params = new URLSearchParams();
        params.append('sport', sport);
        if (region) params.append('region', region);

        const response = await this.client.get(`/api/v1/the-odds/sports/${sport}?${params}`);
        return response.data;
    }

    async getPrizePicksProps(league?: string): Promise<any[]> {
        const params = new URLSearchParams();
        if (league) params.append('league', league);

        const response = await this.client.get(`/api/v1/prizepicks/props?${params}`);
        return response.data;
    }

    async getESPNData(sport: string): Promise<any[]> {
        const response = await this.client.get(`/api/v1/espn/${sport}`);
        return response.data;
    }

    // WebSocket connection helper
    connectWebSocket(onMessage?: (data: any) => void): WebSocket | null {
        try {
            const wsUrl = this.baseURL.replace('http', 'ws') + '/ws';
            const ws = new WebSocket(wsUrl);

            ws.onopen = () => {
                console.log('WebSocket connected');
            };

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (onMessage) {
                    onMessage(data);
                }
            };

            ws.onclose = () => {
                console.log('WebSocket disconnected');
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            return ws;
        } catch (error) {
            console.error('Failed to create WebSocket connection:', error);
            return null;
        }
    }
}

// Export singleton instance
export const productionApiService = new ProductionApiService();

// Export default for easier imports
export default productionApiService;
