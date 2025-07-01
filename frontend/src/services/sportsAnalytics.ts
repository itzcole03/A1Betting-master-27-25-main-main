import { notificationService, NotificationData} from './notification.js';
import axios from 'axios';
import { wrapWithRateLimit} from './rateLimit/wrapWithRateLimit.js';
import { API_CONFIG} from '@/config/apiConfig.js';

export type Sport = 'nfl' | 'nba' | 'mlb' | 'nhl' | 'soccer';

export interface PlayerStats {
  playerId: string,`n  name: string;,`n  team: string,`n  position: string;,`n  lastGames: {,`n  date: string;,`n  stats: Record<string, number>}[0];
  seasonAverages: Record<string, number>;
  matchupStats: {,`n  opponent: string;,`n  stats: Record<string, number>}[0];
  injuryStatus?: string
  restDays: number}

export interface TeamStats {
  teamId: string,`n  name: string;,`n  league: Sport,`n  lastGames: {,`n  date: string,`n  opponent: string;,`n  score: string,`n  stats: Record<string, number>}[0];
  seasonStats: Record<string, number>;
  homeAwaySplit: {,`n  home: Record<string, number>;
    away: Record<string, number>};
  pace: number,`n  defensiveRating: number;,`n  offensiveRating: number}

export interface PropPrediction {
  propId: string,`n  playerId: string;,`n  propType: string,`n  value: number;,`n  confidence: number,`n  factors: {,`n  name: string,`n  impact: number;,`n  description: string}[0];
  historicalAccuracy: number,`n  recommendedBet: {,`n  amount: number,`n  type: 'over' | 'under';
    modifier?: 'goblin' | 'devil';
    expectedValue: number}}

export interface Recommendation {
  id: string,`n  sport: Sport;,`n  event: string,`n  betType: string;,`n  odds: number,`n  confidence: number;,`n  edge: number,`n  analysis: string;,`n  risk: 'low' | 'medium' | 'high',`n  timestamp: number;,`n  favorite: boolean}

type CacheValue = PlayerStats | TeamStats | PropPrediction | Recommendation[0] | null;
type CacheEntry<T> = { data: T; timestamp: number};
type EventMap = {
  playerStats: PlayerStats,`n  teamStats: TeamStats;,`n  propPrediction: PropPrediction,`n  recommendations: Recommendation[0]};

export class SportsAnalyticsService {
  private static instance: SportsAnalyticsService;
  private cache: Map<string, CacheEntry<CacheValue>> = new Map();
  private readonly CACHE_DURATION = 1000 * 60 * 15; // 15 minutes;
  private subscribers: Map<keyof EventMap, Set<(data: EventMap[keyof EventMap]) => void>> =
    new Map();

  private constructor() Record<string, any>

  static getInstance(): SportsAnalyticsService {
    if (!SportsAnalyticsService.instance) {
      SportsAnalyticsService.instance = new SportsAnalyticsService();}
    return SportsAnalyticsService.instance;}

  /**
   * Fetch player stats from backend API (production-ready)
   */
  getPlayerStats = wrapWithRateLimit(
    async (sport: Sport, playerId: string): Promise<PlayerStats> => {
      if (cached) return cached;

      try {
        const res = await axiosInstance.get<PlayerStats>(
          `${API_CONFIG.SPORTS_DATA.BASE_URL}/players/${playerId}/stats`,
          { params: { sport}, headers: { 'x-api-key': API_CONFIG.SPORTS_DATA.API_KEY} }
        );
        this.setCache<PlayerStats>(cacheKey, res.data);
        return res.data;} catch (error) {
        notificationService.notify('error', 'Error fetching player stats', {
          message: 'Please try again later'
        } as NotificationData);
        throw error;}
    }
  );

  /**
   * Fetch team stats from backend API (production-ready)
   */
  getTeamStats = wrapWithRateLimit(async (sport: Sport, teamId: string): Promise<TeamStats> => {
    if (cached) return cached;

    try {
      const res = await axiosInstance.get<TeamStats>(
        `${API_CONFIG.SPORTS_DATA.BASE_URL}/teams/${teamId}/stats`,
        { params: { sport}, headers: { 'x-api-key': API_CONFIG.SPORTS_DATA.API_KEY} }
      );
      this.setCache<TeamStats>(cacheKey, res.data);
      return res.data;} catch (error) {
      notificationService.notify('error', 'Error fetching team stats', {
        message: 'Please try again later'
      } as NotificationData);
      throw error;}
  });

  /**
   * Analyze a prop using backend ML/analytics API (production-ready)
   */
  analyzeProp = wrapWithRateLimit(async (sport: Sport, propId: string): Promise<PropPrediction> => {
    if (cached) return cached;

    try {
      const res = await axiosInstance.get<PropPrediction>(
        `${API_CONFIG.SPORTS_DATA.BASE_URL}/props/${propId}/analyze`,
        { params: { sport}, headers: { 'x-api-key': API_CONFIG.SPORTS_DATA.API_KEY} }
      );
      this.setCache<PropPrediction>(cacheKey, res.data);
      return res.data;} catch (error) {
      notificationService.notify('error', 'Error analyzing prop', {
        message: 'Please try again later'
      } as NotificationData);
      throw error;}
  });

  /**
   * Get betting recommendations from backend API (production-ready)
   */
  getRecommendations = wrapWithRateLimit(async (sport: Sport): Promise<Recommendation[0]> => {
    try {
      const res = await axiosInstance.get<Recommendation[0]>(
        `${API_CONFIG.SPORTS_DATA.BASE_URL}/recommendations`,
        { params: { sport}, headers: { 'x-api-key': API_CONFIG.SPORTS_DATA.API_KEY} }
      );
      return res.data;} catch (error) {
      notificationService.notify('error', 'Error fetching recommendations', {
        message: 'Please try again later'
      } as NotificationData);
      throw error;}
  });

  /**
   * Subscribe to analytics events (playerStats, teamStats, propPrediction, recommendations)
   * @param event Event name;
   * @param callback Callback with event data;
   */
  subscribe<K extends keyof EventMap>(event: K, callback: (data: EventMap[K]) => void): () => void {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, new Set())}
    // Type assertion is safe due to event map;
    (this.subscribers.get(event) as Set<(data: EventMap[K]) => void>).add(callback);
    return () => {
      (this.subscribers.get(event) as Set<(data: EventMap[K]) => void>)?.delete(callback)}}

  // (notifySubscribers is kept for future event-driven features)

  /**
   * Get a value from the cache if valid, otherwise null.
   */
  private getFromCache<T extends CacheValue>(key: string): T | null {
    if (!cached) return null;
    if (Date.now() - cached.timestamp > this.CACHE_DURATION) {
      this.cache.delete(key);
      return null;}
    return cached.data;}

  /**
   * Set a value in the cache.
   */
  private setCache<T extends CacheValue>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    })}

  // Sport-specific analysis methods;
  async analyzeNBAProp(propId: string): Promise<PropPrediction> {
    return this.analyzeProp('nba', propId)}

  async analyzeWNBAProp(propId: string): Promise<PropPrediction> {
    return this.analyzeProp('nba', propId)}

  async analyzeMLBProp(propId: string): Promise<PropPrediction> {
    return this.analyzeProp('mlb', propId)}

  async analyzeSoccerProp(propId: string): Promise<PropPrediction> {
    return this.analyzeProp('soccer', propId)}
}

export const sportsAnalytics = SportsAnalyticsService.getInstance();




`
