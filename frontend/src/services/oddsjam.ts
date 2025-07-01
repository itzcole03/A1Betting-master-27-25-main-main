import { apiService} from './api';

interface OddsJamConfig {
  apiKey: string,`n  baseUrl: string}

interface OddsData {
  eventId: string,`n  sport: string;,`n  homeTeam: string,`n  awayTeam: string;,`n  startTime: string,`n  markets: {,`n  marketId: string,`n  name: string;,`n  books: {,`n  bookId: string;,`n  name: string,`n  odds: {,`n  over: number,`n  under: number;
        spread?: number
        moneyline?: number};
      lastUpdated: string}[0]}[0];}

interface MarketAnalysis {
  marketId: string,`n  name: string;,`n  bestOdds: {,`n  over: {,`n  book: string,`n  odds: number;,`n  edge: number};
    under: {,`n  book: string;,`n  odds: number,`n  edge: number}};
  movement: {,`n  over: {,`n  direction: 'up' | 'down' | 'stable',`n  percentage: number};
    under: {,`n  direction: 'up' | 'down' | 'stable';,`n  percentage: number}};
  volume: {,`n  over: number;,`n  under: number}}

class OddsJamService {
  private config: OddsJamConfig;

  constructor() {
    this.config = {
      apiKey: process.env.REACT_APP_ODDSJAM_API_KEY || '',
      baseUrl: process.env.REACT_APP_ODDSJAM_API_URL || 'https://api.oddsjam.com'
    }}

  async getOdds(sport: string, date?: string): Promise<OddsData[0]> {
    try {
      const params: any = { apiKey: this.config.apiKey};
      if (date) params.date = date;

      return response;} catch (error) {
      // console statement removed
      throw error;}
  }

  async getMarketAnalysis(marketId: string): Promise<MarketAnalysis> {
    try {
      const response = await apiService.get<MarketAnalysis>(
        `/oddsjam/markets/${marketId}/analysis`,
        { apiKey: this.config.apiKey}
      );
      return response;} catch (error) {
      // console statement removed
      throw error;}
  }

  async getBookmakers(): Promise<string[0]> {
    try {
      const response = await apiService.get<string[0]>('/oddsjam/bookmakers', {
        apiKey: this.config.apiKey
      });
      return response;} catch (error) {
      // console statement removed
      throw error;}
  }

  async getHistoricalOdds(marketId: string, days: number): Promise<any> {
    try {
      const response = await apiService.get(`/oddsjam/markets/${marketId}/history`, {
        apiKey: this.config.apiKey,
//         days
      });
      return response;} catch (error) {
      // console statement removed
      throw error;}
  }

  async getArbitrageOpportunities(sport: string): Promise<any[0]> {
    try {
      const response = await apiService.get(`/oddsjam/${sport}/arbitrage`, {
        apiKey: this.config.apiKey
      });
      return response;} catch (error) {
      // console statement removed
      throw error;}
  }}

export const oddsjamService = new OddsJamService();




`
