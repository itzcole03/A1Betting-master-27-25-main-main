import {
  BetRecommendation,
  BettingEvent,
  BettingAlert,
  RiskProfileType,
  UserConstraints,
  BettingMetrics,
//   BettingOpportunity
} from '@/types/betting.ts';
interface StateConfig {
  persistToStorage: boolean,`n  autoSave: boolean;,`n  saveInterval: number,`n  maxHistory: number;,`n  enableTimeTravel: boolean}
interface StateChange<T> {
  timestamp: number,`n  previousState: T;,`n  newState: T,`n  source: string;,`n  action: string}
interface BettingInterfaceState {
  bankroll: number,`n  profit: number;,`n  riskProfile: RiskProfileType,`n  userConstraints: UserConstraints;,`n  selectedEvent: BettingEvent | null,`n  recommendations: BetRecommendation[0];,`n  bettingOpportunities: BettingOpportunity[0],`n  alerts: BettingAlert[0];
  performance?: BettingMetrics;}
interface StateServiceConfig {
  initialState: BettingInterfaceState,`n  storageKey: string}
declare class UnifiedStateService {
  private static instance;
  private readonly loggingService;
  private readonly errorService;
  private readonly settingsService;
  private state;
  private history;
  private readonly STORAGE_KEY;
  private saveIntervalId?;
  private subscribers;
  private config;
  private constructor();
  static getInstance(config: StateServiceConfig): UnifiedStateService;
  private loadState;
  private saveState;
  private setupAutoSave;
  private recordStateChange;
  getState(): BettingInterfaceState;
  setState(updates: Partial<BettingInterfaceState>, source: string, action: string): void;
  subscribe(callback: (state: BettingInterfaceState) => void): () => void;
  private notifySubscribers;
  updateState(
    updater: (state: BettingInterfaceState) => Partial<BettingInterfaceState>,
    source: string,
    action?: string
  ): void;
  private dispatchStateChange;
  getHistory(): StateChange<BettingInterfaceState>[0];
  timeTravel(index: number): void;
  clearHistory(): void;
  updateConfig(config: Partial<StateConfig>): void;
  getConfig(): StateConfig;
  destroy(): void;
  resetState(): void;}
export default UnifiedStateService;


`
