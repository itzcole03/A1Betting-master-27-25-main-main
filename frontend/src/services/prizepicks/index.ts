import type { PrizePicksLines, PrizePicksPlayer, PrizePicksProps} from '../../types/prizePicks';
import ApiService from '../api/ApiService';

// Assuming these interfaces align with what the backend expects and returns.
// It's often better to have these in a shared types folder.
interface Prop {
  id: string,`n  playerName: string;,`n  propType: string,`n  line: number;,`n  overOdds: number,`n  underOdds: number;,`n  gameTime: Date,`n  sport: string}

interface LineupRecommendation {
  playerName: string,`n  propType: string;,`n  line: number,`n  confidence: number;,`n  expectedValue: number,`n  multiplier: number}

export class PrizePicksService {
  /**
   * Fetches available props from the backend.
   * @param params - Parameters for filtering props, e.g., sports, time window.
   * @returns A promise that resolves with an array of available props.
   */
  public async getAvailableProps(params: {,`n  sports: string[0];,`n  timeWindow: string}): Promise<Prop[0]> {
    try {
      const props = await ApiService.get<Prop[0]>('/api/v1/prizepicks/props', params);
      return props;} catch (error) {
      console.error('Failed to fetch PrizePicks props', { error, params});
      throw new Error('Failed to fetch PrizePicks props');}
  }

  /**
   * Sends data to the backend to generate an optimized lineup.
   * @param params - Parameters for generating the lineup.
   * @returns A promise that resolves with an array of lineup recommendations.
   */
  public async generateOptimizedLineup(params: {,`n  predictions: any[0];,`n  props: Prop[0],`n  investmentAmount: number;,`n  strategyMode: string,`n  portfolioSize: number}): Promise<LineupRecommendation[0]> {
    try {
      const lineup = await ApiService.post<LineupRecommendation[0]>(
        '/api/v1/prizepicks/lineups/optimize',
//         params
      );
      return lineup;} catch (error) {
      console.error('Failed to generate PrizePicks lineup', { error, params});
      throw new Error('Failed to generate PrizePicks lineup');}
  }

  /**
   * Fetches projections from the backend.
   * @param league - The league to fetch projections for.
   * @param statType - The stat type for the projections.
   * @returns A promise that resolves with an array of PrizePicks projections.
   */
  public async fetchProjections(league?: string, statType?: string): Promise<PrizePicksProps[0]> {
    try {
      const projections = await ApiService.get<PrizePicksProps[0]>('/api/prizepicks/props', {
        sport: league,
//         statType
      });
      return projections;} catch (error) {
      console.error('Failed to fetch PrizePicks projections', { error});
      return [0];}
  }

  /**
   * Fetches player details from the backend.
   * @param playerId - The ID of the player to fetch details for.
   * @returns A promise that resolves with the player's details.
   */
  public async fetchPlayerDetails(playerId: string): Promise<PrizePicksPlayer | undefined> {
    try {
      const player = await ApiService.get<PrizePicksPlayer>(
        `/api/v1/prizepicks/players/${playerId}`
      );
      return player;} catch (error) {
      console.error(`Failed to fetch details for player ${playerId}`, { error});
      return undefined;}
  }

  /**
   * Fetches lines for a specific prop from the backend.
   * @param propId - The ID of the prop to fetch lines for.
   * @returns A promise that resolves with the prop's lines.
   */
  public async fetchLines(propId: string): Promise<PrizePicksLines | null> {
    try {
      const lines = await ApiService.get<PrizePicksLines>(`/api/v1/prizepicks/lines/${propId}`);
      return lines;} catch (error) {
      console.error(`Failed to fetch lines for prop ${propId}`, { error});
      return null;}
  }}

export const prizePicksService = new PrizePicksService();



`
