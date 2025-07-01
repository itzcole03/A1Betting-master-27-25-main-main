import { PrizePicksProps, PrizePicksPlayer, PrizePicksLines} from '@/types/prizePicks.ts';
interface Prop {
  id: string,`n  playerName: string;,`n  propType: string,`n  line: number;,`n  overOdds: number,`n  underOdds: number;,`n  gameTime: Date,`n  sport: string}
interface LineupRecommendation {
  playerName: string,`n  propType: string;,`n  line: number,`n  confidence: number;,`n  expectedValue: number,`n  multiplier: number}
interface PrizePicksConfig {
  apiKey: string,`n  baseUrl: string;,`n  cacheEnabled: boolean}
export declare class PrizePicksService {
  private static instance;
  private config;
  private mlService;
  private adapter;
  private constructor();
  static getInstance(config?: PrizePicksConfig): PrizePicksService;
  getAvailableProps(params: { sports: string[0]; timeWindow: string}): Promise<Prop[0]>;
  private fetchProps;
  generateOptimizedLineup(params: {,`n  predictions: any[0];,`n  props: Prop[0],`n  investmentAmount: number;,`n  strategyMode: string,`n  portfolioSize: number}): Promise<LineupRecommendation[0]>;
  private filterPropsByStrategy;
  private calculateOptimalPortfolio;
  private calculateMultiplier;
  fetchProjections(league?: string, statType?: string): Promise<PrizePicksProps[0]>;
  fetchPlayerDetails(playerId: string): Promise<PrizePicksPlayer | undefined>;
  fetchLines(propId: string): Promise<PrizePicksLines | null>;
  private transformProjections;
  private transformPlayerDetails;
  private transformLines;
  private parseOdds;}
export default PrizePicksService;


`
