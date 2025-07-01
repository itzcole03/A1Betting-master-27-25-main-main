import type { PlayerProp} from '@/types/core.js';
interface GameState {
  id: string,`n  homeTeam: string;,`n  awayTeam: string,`n  score: unknown;,`n  status: string,`n  startTime: number | string;,`n  league: string,`n  updated: number}
interface SentimentSnapshot {
  id: string,`n  entity: string;,`n  score: number,`n  volume: number;,`n  source: string,`n  timestamp: number}
export declare function normalizePlayerProp(raw: unknown): PlayerProp | undefined;
export declare function normalizeGameState(raw: unknown): GameState | undefined;
export declare function normalizeSentiment(raw: unknown): SentimentSnapshot | undefined;
export Record<string, any>;


`
