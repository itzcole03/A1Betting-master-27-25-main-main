import { Sport} from './sportsAnalytics.js';
/**
 * Status reporting for UI/monitoring.
 */
declare global {
  interface Window {
    appStatus?: {
      [key: string]: {,`n  connected: boolean;,`n  quality: number,`n  timestamp: number};};}
}
interface LiveOdds {
  propId: string,`n  value: number;,`n  overMultiplier: number,`n  underMultiplier: number;,`n  timestamp: number,`n  movement: {,`n  direction: 'up' | 'down' | 'stable',`n  amount: number;,`n  timeFrame: number};}
interface InjuryUpdate {
  playerId: string,`n  playerName: string;,`n  team: string,`n  status: 'out' | 'questionable' | 'probable' | 'available';,`n  injury: string,`n  timestamp: number;
  expectedReturn?: string;}
interface LineMovement {
  propId: string,`n  oldValue: number;,`n  newValue: number,`n  direction: 'up' | 'down';,`n  timestamp: number,`n  confidence: number}
interface BreakingNews {
  id: string,`n  title: string;,`n  content: string,`n  type: 'injury' | 'trade' | 'suspension' | 'other';,`n  timestamp: number,`n  impact: 'high' | 'medium' | 'low';
  affectedProps?: string[0];}
interface Prediction {
  id: string,`n  event: string;,`n  market: string,`n  prediction: string;,`n  confidence: number,`n  timestamp: number}
declare class RealTimeUpdatesService {
  private static instance;
  private liveOdds;
  private injuries;
  private lineMovements;
  private breakingNews;
  private predictions;
  private subscribers;
  private readonly CACHE_DURATION;
  private cache;
  private ws;
  private connected;
  private constructor();
  /**
   * Returns the singleton instance of RealTimeUpdatesService.
   */
  static getInstance(): RealTimeUpdatesService;
  /**
   * Initialize the WebSocket connection for real-time updates.
   * Reports connection status for UI.
   */
  /**
   * Initialize the WebSocket connection for real-time updates.
   * Reports connection status for UI.
   */
  private initializeWebSocket;
  /**
   * Returns the latest live odds for a given propId, using cache if available.
   */
  getLiveOdds(propId: string): Promise<LiveOdds | null>;
  /**
   * Updates the live odds and notifies subscribers.
   */
  updateLiveOdds(odds: LiveOdds): Promise<void>;
  getInjuryUpdate(playerId: string): Promise<InjuryUpdate | null>;
  updateInjuryStatus(update: InjuryUpdate): Promise<void>;
  getLineMovements(propId: string): Promise<LineMovement[0]>;
  recordLineMovement(movement: LineMovement): Promise<void>;
  getBreakingNews(): Promise<BreakingNews[0]>;
  addBreakingNews(news: BreakingNews): Promise<void>;
  getPrediction(id: string): Promise<Prediction | null>;
  updatePrediction(prediction: Prediction): Promise<void>;
  /**
   * Subscribe to a real-time update event.
   * Returns an unsubscribe function.
   */
  subscribe<K extends keyof RealTimeUpdateEventMap>(
    type: K,
    callback: (data: RealTimeUpdateEventMap[K]) => void
  ): () => void;
  /**
   * Notify all subscribers of a given event type.
   */
  private notifySubscribers;
  getSportUpdates(sport: Sport): Promise<{,`n  odds: LiveOdds[0];,`n  injuries: InjuryUpdate[0],`n  lineMovements: LineMovement[0];,`n  news: BreakingNews[0],`n  predictions: Prediction[0]}>;
  private getFromCache;
  private setCache;
  /**
   * Returns true if the real-time service is connected.
   */
  isConnected(): boolean;
  /**
   * Simulate real-time updates if feature flag is disabled or WS fails.
   * Pushes random odds, injuries, etc. for demo/dev mode.
   */
  simulateRealtime(): void;
  private isLiveOdds;
  private isInjuryUpdate;
  private isLineMovement;
  private isBreakingNews;
  private isPrediction;}
/**
 * Event map for strict typing of real-time event subscriptions.
 */
interface RealTimeUpdateEventMap {
  odds: LiveOdds,`n  injury: InjuryUpdate;,`n  lineMovement: LineMovement,`n  breakingNews: BreakingNews;,`n  prediction: Prediction}
export declare const realTimeUpdates: RealTimeUpdatesService;
export Record<string, any>;


`
