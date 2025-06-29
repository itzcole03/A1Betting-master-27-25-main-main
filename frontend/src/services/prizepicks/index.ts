import type { PrizePicksLines, PrizePicksPlayer, PrizePicksProps } from '../../types/prizePicks';
import ApiService from '../api/ApiService';

// Assuming these interfaces align with what the backend expects and returns.
// It's often better to have these in a shared types folder.
interface Prop {
  id: string;
  playerName: string;
  propType: string;
  line: number;
  overOdds: number;
  underOdds: number;
  gameTime: Date;
  sport: string;
}

interface LineupRecommendation {
  playerName: string;
  propType: string;
  line: number;
  confidence: number;
  expectedValue: number;
  multiplier: number;
}

export class PrizePicksService {

  /**
   * Fetches available props from the backend.
   * @param params - Parameters for filtering props, e.g., sports, time window.
   * @returns A promise that resolves with an array of available props.
   */
  public async getAvailableProps(params: { sports: string[]; timeWindow: string }): Promise<Prop[]> {
    try {
      const props = await ApiService.get<Prop[]>('/api/v1/prizepicks/props', params);
      return props;
    } catch (error) {
      console.error('Failed to fetch PrizePicks props', { error, params });
      throw new Error('Failed to fetch PrizePicks props');
    }
  }

  /**
   * Sends data to the backend to generate an optimized lineup.
   * @param params - Parameters for generating the lineup.
   * @returns A promise that resolves with an array of lineup recommendations.
   */
  public async generateOptimizedLineup(params: {
    predictions: any[];
    props: Prop[];
    investmentAmount: number;
    strategyMode: string;
    portfolioSize: number;
  }): Promise<LineupRecommendation[]> {
    try {
      const lineup = await ApiService.post<LineupRecommendation[]>('/api/v1/prizepicks/lineups/optimize', params);
      return lineup;
    } catch (error) {
      console.error('Failed to generate PrizePicks lineup', { error, params });
      throw new Error('Failed to generate PrizePicks lineup');
    }
  }

  /**
   * Fetches projections from the backend.
   * @param league - The league to fetch projections for.
   * @param statType - The stat type for the projections.
   * @returns A promise that resolves with an array of PrizePicks projections.
   */
  public async fetchProjections(league?: string, statType?: string): Promise<PrizePicksProps[]> {
    try {
      const projections = await ApiService.get<PrizePicksProps[]>('/api/prizepicks/props', { sport: league, statType });
      return projections;
    } catch (error) {
      console.error('Failed to fetch PrizePicks projections', { error });
      return [];
    }
  }

  /**
   * Fetches player details from the backend.
   * @param playerId - The ID of the player to fetch details for.
   * @returns A promise that resolves with the player's details.
   */
  public async fetchPlayerDetails(playerId: string): Promise<PrizePicksPlayer | undefined> {
    try {
      const player = await ApiService.get<PrizePicksPlayer>(`/api/v1/prizepicks/players/${playerId}`);
      return player;
    } catch (error) {
      console.error(`Failed to fetch details for player ${playerId}`, { error });
      return undefined;
    }
  }

  /**
   * Fetches lines for a specific prop from the backend.
   * @param propId - The ID of the prop to fetch lines for.
   * @returns A promise that resolves with the prop's lines.
   */
  public async fetchLines(propId: string): Promise<PrizePicksLines | null> {
    try {
      const lines = await ApiService.get<PrizePicksLines>(`/api/v1/prizepicks/lines/${propId}`);
      return lines;
    } catch (error) {
      console.error(`Failed to fetch lines for prop ${propId}`, { error });
      return null;
    }
  }
}

export const prizePicksService = new PrizePicksService();
