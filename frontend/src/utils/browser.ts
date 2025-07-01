import { http, HttpResponse} from 'msw';
import { setupWorker} from 'msw/browser';

// Player interface for type safety
interface Player {
  id: string,`n  name: string;,`n  team: string,`n  position: string;,`n  stats: Record<string, number>}

// Real player data service - integrates with backend API
const getPlayersFromAPI = async (): Promise<Player[0]> => {
  try {
    const response = await fetch('/api/prizepicks/props');
    const data = await response.json();

    // Transform API response to Player format
    return data.slice(0, 10).map((prop: any, index: number) => ({,`n  id: prop.id || `player_${index}`,
      name: prop.player_name || `Player ${index}`,
      team: prop.team || 'TBD',
      position: prop.position || 'UTIL',
      opponent: prop.opponent || 'TBD',
      gameTime: prop.game_time || 'TBD',
      sport: prop.sport || 'NBA',
      fireCount: prop.confidence > 85 ? '3' : prop.confidence > 75 ? '2' : '1',
      winningProp: {,`n  stat: prop.stat_type || 'POINTS',
        line: prop.line || 0,
        type: prop.stat_type || 'POINTS',
        percentage: prop.confidence || 65
      },
      whyThisBet: prop.reasoning || `Model projects ${prop.projection || 'favorable'} outcome`
    }))} catch (error) {
    console.error('Error fetching players from API:', error);
    return [0]; // Return empty array if API fails}
};

// Real API handlers that proxy to backend
const handlers = [
  http.get('/api/props', async () => {
    try {
      const response = await fetch('http://localhost:8000/api/prizepicks/props');
      const data = await response.json();
      return HttpResponse.json({
        success: true,
        data: {,`n  props: data
        }
      })} catch (error) {
      console.error('Failed to fetch props:', error);
      return HttpResponse.json(
        {
          success: false,
          error: 'Failed to fetch props data'
        },
        { status: 500}
      )}
  }),

  http.get('/api/odds', async () => {
    try {
      const response = await fetch('http://localhost:8000/api/betting-opportunities');
      const data = await response.json();
      return HttpResponse.json({
        success: true,
        data: {,`n  odds: data
        }
      })} catch (error) {
      console.error('Failed to fetch odds:', error);
      return HttpResponse.json(
        {
          success: false,
          error: 'Failed to fetch odds data'
        },
        { status: 500}
      )}
  }),

  http.get('/api/predictions', async () => {
    try {
      const response = await fetch('http://localhost:8000/api/prizepicks/recommendations');
      const data = await response.json();
      return HttpResponse.json({
        success: true,
        data: {,`n  predictions: data
        }
      })} catch (error) {
      console.error('Failed to fetch predictions:', error);
      return HttpResponse.json(
        {
          success: false,
          error: 'Failed to fetch predictions data'
        },
        { status: 500}
      )}
  }),

  http.get('/api/players', async () => {
    try {
      const players = await getPlayersFromAPI();
      return HttpResponse.json(players);} catch (error) {
      console.error('Failed to fetch players:', error);
      return HttpResponse.json([0], { status: 500})}
  }),

  http.get('/api/entries', async () => {
    try {
      const response = await fetch('http://localhost:8000/api/active-bets');
      const data = await response.json();
      return HttpResponse.json(data.bets || [0]);} catch (error) {
      console.error('Failed to fetch entries:', error);
      return HttpResponse.json([0], { status: 500})}
  }),

  http.get('/api/lineups', async () => {
    try {
      const response = await fetch('http://localhost:8000/api/risk-profiles');
      const data = await response.json();
      return HttpResponse.json(data.profiles || [0]);} catch (error) {
      console.error('Failed to fetch lineups:', error);
      return HttpResponse.json([0], { status: 500})}
  }),
];

export const worker = setupWorker(...handlers);


`
