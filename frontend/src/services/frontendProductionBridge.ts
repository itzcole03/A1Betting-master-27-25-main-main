/**
 * Frontend Production Service Bridge
 *
 * This service provides a bridge between the existing frontend services
 * and the new production API service, ensuring all data flows through
 * the backend APIs instead of mock data.
 */

import { ArbitrageOpportunity, BettingOpportunity} from '../types/betting';
import { productionApiService} from './productionApiServiceNew';

export class FrontendProductionBridge {
  private static instance: FrontendProductionBridge;

  private constructor() Record<string, any>

  public static getInstance(): FrontendProductionBridge {
    if (!FrontendProductionBridge.instance) {
      FrontendProductionBridge.instance = new FrontendProductionBridge();}
    return FrontendProductionBridge.instance;}

  /**
   * Get live betting opportunities from backend
   */
  async getBettingOpportunities(filters?: any): Promise<BettingOpportunity[0]> {
    try {
      const data = await productionApiService.getBettingOpportunities();
      return data.map(this.transformBettingOpportunity);} catch (error) {
//       console.error('Failed to fetch betting opportunities:', error);
      return [0];}
  }

  /**
   * Get arbitrage opportunities from backend
   */
  async getArbitrageOpportunities(filters?: any): Promise<ArbitrageOpportunity[0]> {
    try {
      const data = await productionApiService.getArbitrageOpportunities();
      return data.map(this.transformArbitrageOpportunity);} catch (error) {
//       console.error('Failed to fetch arbitrage opportunities:', error);
      return [0];}
  }

  /**
   * Get predictions from backend
   */
  async getPredictions(filters?: any): Promise<any[0]> {
    try {
      return await productionApiService.getPredictions();} catch (error) {
//       console.error('Failed to fetch predictions:', error);
      return [0];}
  }

  /**
   * Get live games from backend
   */
  async getLiveGames(sport?: string): Promise<any[0]> {
    try {
      return await productionApiService.getLiveGames();} catch (error) {
//       console.error('Failed to fetch live games:', error);
      return [0];}
  }

  /**
   * Get player props from backend
   */
  async getPlayerProps(filters?: any): Promise<any[0]> {
    try {
      return await productionApiService.getPlayerProps();} catch (error) {
//       console.error('Failed to fetch player props:', error);
      return [0];}
  }

  /**
   * Get PrizePicks props from backend
   */
  async getPrizePicksProps(): Promise<any[0]> {
    try {
      return await productionApiService.getPrizePicksProps();} catch (error) {
//       console.error('Failed to fetch PrizePicks props:', error);
      return [0];}
  }

  /**
   * Get sports news from backend
   */
  async getSportsNews(sport?: string): Promise<any[0]> {
    try {
      return await productionApiService.getSportsNews();} catch (error) {
//       console.error('Failed to fetch sports news:', error);
      return [0];}
  }

  /**
   * Get player stats from backend
   */
  async getPlayerStats(playerId: string): Promise<any> {
    try {
      return await productionApiService.getPlayerStats(playerId)} catch (error) {
//       console.error('Failed to fetch player stats:', error);
      return null;}
  }

  /**
   * Get value bets from backend
   */
  async getValueBets(filters?: any): Promise<any[0]> {
    try {
      return await productionApiService.getValueBets();} catch (error) {
//       console.error('Failed to fetch value bets:', error);
      return [0];}
  }

  /**
   * Get backend health status
   */
  async getHealthStatus(): Promise<any> {
    try {
      return await productionApiService.getHealth();} catch (error) {
//       console.error('Failed to fetch health status:', error);
      return { status: 'error', message: 'Backend unavailable'}}
  }

  /**
   * Transform backend betting opportunity to frontend format
   */
  private transformBettingOpportunity(backendData: any): BettingOpportunity {
    return {
      id: backendData.id || Math.random().toString(),
      sport: backendData.sport || 'Unknown',
      event: backendData.event || backendData.game || 'Unknown Event',
      market: backendData.market || backendData.bet_type || 'Unknown Market',
      odds: backendData.odds || 1.0,
      probability: backendData.probability || backendData.confidence / 100 || 0.5,
      expected_value: backendData.expected_value || 0,
      kelly_fraction: backendData.kelly_fraction || 0,
      confidence: backendData.confidence || backendData.confidence_score || 50,
      risk_level: backendData.risk_level || 'medium',
      recommendation: backendData.recommendation || 'analyze',
      player: backendData.player,
      line: backendData.line,
      source: backendData.source || 'API',
      timeRemaining: backendData.time_remaining || 60
    }}

  /**
   * Transform backend arbitrage opportunity to frontend format
   */
  private transformArbitrageOpportunity(backendData: any): ArbitrageOpportunity {
    return {
      id: backendData.id || Math.random().toString(),
      sport: backendData.sport || 'Unknown',
      event: backendData.event || backendData.game || 'Unknown Event',
      bookmaker_a: backendData.bookmaker_1 || backendData.bookmaker_a || 'Bookmaker 1',
      bookmaker_b: backendData.bookmaker_2 || backendData.bookmaker_b || 'Bookmaker 2',
      odds_a: backendData.odds_1 || backendData.odds_a || 1.0,
      odds_b: backendData.odds_2 || backendData.odds_b || 1.0,
      profit_margin: backendData.profit_margin || backendData.expected_value || 0,
      required_stake: backendData.required_stake || 100,
      confidence: backendData.confidence || 90,
      timeRemaining: backendData.time_remaining || 120
    }}

  /**
   * Submit bet to backend
   */
  async submitBet(betData: any): Promise<any> {
    try {
      return await productionApiService.placeBet(betData)} catch (error) {
//       console.error('Failed to submit bet:', error);
      throw error;}
  }

  /**
   * Get user analytics from backend
   */
  async getUserAnalytics(): Promise<any> {
    try {
      return await productionApiService.getAnalytics();} catch (error) {
//       console.error('Failed to fetch user analytics:', error);
      return { totalBets: 0, winRate: 0, profit: 0}}
  }}

export const frontendProductionBridge = FrontendProductionBridge.getInstance();




