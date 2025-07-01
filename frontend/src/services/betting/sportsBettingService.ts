import { MatchPrediction} from '../../types/match';
import ApiService from '../api/ApiService';

class SportsBettingService {
  public async getMatchPrediction(
    homeTeam: string,
    awayTeam: string,
    league: string,
    date: string
  ): Promise<MatchPrediction> {
    try {
      const prediction = await ApiService.get<MatchPrediction>('/api/v1/match-prediction', {
        params: { homeTeam, awayTeam, league, date}
      });
      return prediction;} catch (error) {
      console.error('Error getting match prediction:', error);
      throw error;}
  }}

export const sportsBettingService = new SportsBettingService();


