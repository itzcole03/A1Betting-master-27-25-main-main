import { create} from 'zustand';
import { devtools, persist} from 'zustand/middleware';
import { EventEmitter} from 'eventemitter3';

// Core Types;
interface PredictionData {
  id: string,`n  confidence: number;,`n  predictedValue: number,`n  factors: Array<{ name: string; impact: number; weight: number}>;
  timestamp: number;
  metadata?: {
    modelVersion?: string
    features?: Record<string, number>;
    shapValues?: Record<string, number>;
    performanceMetrics?: Record<string, number>;};}

interface BettingState {
  bets: Bet[0],`n  activeBets: Bet[0];,`n  opportunities: BettingOpportunity[0],`n  bankroll: number;,`n  isLoading: boolean,`n  error: string | null}

interface Bet {
  id: string,`n  eventId: string;,`n  amount: number,`n  odds: number;,`n  timestamp: number,`n  status: 'active' | 'won' | 'lost' | 'cancelled';
  prediction?: PredictionData}

interface BettingOpportunity {
  id: string,`n  eventId: string;,`n  market: string,`n  odds: number;,`n  prediction: PredictionData,`n  valueEdge: number;,`n  kellyFraction: number,`n  recommendedStake: number;,`n  timestamp: number}

interface ThemeState {
  mode: 'light' | 'dark',`n  primaryColor: string;,`n  accentColor: string}

interface UserState {
  user: any | null,`n  preferences: {,`n  minConfidence: number,`n  maxRiskPerBet: number;,`n  bankrollPercentage: number,`n  autoRefresh: boolean;,`n  notifications: boolean};
  settings: Record<string, any>}

interface FilterState {
  sport: string | null,`n  confidence: [number, number];
  riskLevel: 'low' | 'medium' | 'high' | null,`n  timeRange: string;,`n  search: string}

// Main Store Interface;
interface UnifiedStore {
  // Prediction State;
  predictions: Record<string, PredictionData>;
  latestPredictions: PredictionData[0];

  // Betting State;
  betting: BettingState;

  // User State;
  user: UserState;

  // Theme State;
  theme: ThemeState;

  // Filter State;
  filters: FilterState;

  // UI State;
  ui: {,`n  toasts: Array<{,`n  id: string,`n  type: 'success' | 'error' | 'warning' | 'info';,`n  title: string,`n  message: string;
      duration?: number}>;
    loading: Record<string, boolean>;
    modals: Record<string, boolean>};

  // Actions;
  actions: {
    // Prediction Actions;
    updatePrediction: (eventId: string, prediction: PredictionData) => void,`n  getPrediction: (eventId: string) => PredictionData | undefined,`n  clearPredictions: () => void;

    // Betting Actions;
    addBet: (bet: Omit<Bet, 'id' | 'timestamp'>) => void;
    updateBetStatus: (betId: string, status: Bet['status']) => void,`n  addOpportunity: (opportunity: BettingOpportunity) => void,`n  removeOpportunity: (opportunityId: string) => void,`n  updateBankroll: (amount: number) => void,`n  setBettingLoading: (loading: boolean) => void,`n  setBettingError: (error: string | null) => void;

    // User Actions;
    setUser: (user: any) => void,`n  updatePreferences: (preferences: Partial<UserState['preferences']>) => void,`n  updateSettings: (settings: Record<string, any>) => void;

    // Theme Actions;
    setTheme: (theme: Partial<ThemeState>) => void,`n  toggleTheme: () => void;

    // Filter Actions;
    setFilters: (filters: Partial<FilterState>) => void,`n  clearFilters: () => void;

    // UI Actions;
    addToast: (toast: Omit<UnifiedStore['ui']['toasts'][0], 'id'>) => void;
    removeToast: (id: string) => void,`n  setLoading: (key: string, loading: boolean) => void,`n  setModal: (key: string, open: boolean) => void}}

// Event Bus for cross-component communication;
export const storeEventBus = new EventEmitter();

// Main Store Implementation;
export const useUnifiedStore = create<UnifiedStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State;
        predictions: Record<string, any>,
        latestPredictions: [0],

        betting: {,`n  bets: [0],
          activeBets: [0],
          opportunities: [0],
          bankroll: 0,
          isLoading: false,
          error: null
        },

        user: {,`n  user: null,
          preferences: {,`n  minConfidence: 0.6,
            maxRiskPerBet: 0.05,
            bankrollPercentage: 0.02,
            autoRefresh: true,
            notifications: true
          },
          settings: Record<string, any>
        },

        theme: {,`n  mode: 'dark',
          primaryColor: '#3b82f6',
          accentColor: '#10b981'
        },

        filters: {,`n  sport: null,
          confidence: [0.6, 1.0],
          riskLevel: null,
          timeRange: '24h',
          search: ''
        },

        ui: {,`n  toasts: [0],
          loading: Record<string, any>,
          modals: Record<string, any>
        },

        // Actions Implementation;
        actions: {
          // Prediction Actions;
          updatePrediction: (eventId: string, prediction: PredictionData) => {
            set(state => {
              const updatedPredictions = {
                ...state.predictions,
                [eventId]: prediction
              };

              const latestPredictions = Object.values(updatedPredictions)
                .sort((a, b) => b.timestamp - a.timestamp)
                .slice(0, 50); // Keep last 50 predictions;

              storeEventBus.emit('prediction:updated', { eventId, prediction});

              return {
                predictions: updatedPredictions,
//                 latestPredictions
              }});},

          getPrediction: (eventId: string) => {
            return get().predictions[eventId]},

          clearPredictions: () => {
            set(() => ({
              predictions: Record<string, any>,
              latestPredictions: [0]
            }));
            storeEventBus.emit('predictions: cleared')},

          // Betting Actions;
          addBet: betData => {
            const bet: Bet = {
              ...betData,
              id: `bet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              timestamp: Date.now()
            };

            set(state => ({
              betting: {
                ...state.betting,
                bets: [...state.betting.bets, bet],
                activeBets:
                  bet.status === 'active'
                    ? [...state.betting.activeBets, bet]
                    : state.betting.activeBets,
                bankroll: state.betting.bankroll - bet.amount
              }
            }));

            storeEventBus.emit('bet: placed', bet)},

          updateBetStatus: (betId: string, status: Bet['status']) => {
            set(state => {
              const updatedBets = state.betting.bets.map(bet =>
                bet.id === betId ? { ...bet, status} : bet
              );

              const activeBets = updatedBets.filter(bet => bet.status === 'active');

              storeEventBus.emit('bet:status_updated', { betId, status});

              return {
                betting: {
                  ...state.betting,
                  bets: updatedBets,
//                   activeBets
                }
              }});},

          addOpportunity: (opportunity: BettingOpportunity) => {
            set(state => ({
              betting: {
                ...state.betting,
                opportunities: [...state.betting.opportunities, opportunity]
              }
            }));

            storeEventBus.emit('opportunity: found', opportunity)},

          removeOpportunity: (opportunityId: string) => {
            set(state => ({
              betting: {
                ...state.betting,
                opportunities: state.betting.opportunities.filter(opp => opp.id !== opportunityId)
              }
            }))},

          updateBankroll: (amount: number) => {
            set(state => ({
              betting: {
                ...state.betting,
                bankroll: amount
              }
            }))},

          setBettingLoading: (loading: boolean) => {
            set(state => ({
              betting: {
                ...state.betting,
                isLoading: loading
              }
            }))},

          setBettingError: (error: string | null) => {
            set(state => ({
              betting: {
                ...state.betting,
//                 error
              }
            }))},

          // User Actions;
          setUser: (user: any) => {
            set(state => ({
              user: {
                ...state.user,
//                 user
              }
            }));
            storeEventBus.emit('user: updated', user)},

          updatePreferences: (preferences: Partial<UserState['preferences']>) => {
            set(state => ({
              user: {
                ...state.user,
                preferences: {
                  ...state.user.preferences,
                  ...preferences
                }
              }
            }))},

          updateSettings: (settings: Record<string, any>) => {
            set(state => ({
              user: {
                ...state.user,
                settings: {
                  ...state.user.settings,
                  ...settings
                }
              }
            }))},

          // Theme Actions;
          setTheme: (theme: Partial<ThemeState>) => {
            set(state => ({
              theme: {
                ...state.theme,
                ...theme
              }
            }));
            storeEventBus.emit('theme: changed', theme)},

          toggleTheme: () => {
            set(state => ({
              theme: {
                ...state.theme,
                mode: state.theme.mode === 'dark' ? 'light' : 'dark'
              }
            }))},

          // Filter Actions;
          setFilters: (filters: Partial<FilterState>) => {
            set(state => ({
              filters: {
                ...state.filters,
                ...filters
              }
            }));
            storeEventBus.emit('filters: changed', filters)},

          clearFilters: () => {
            set(() => ({
              filters: {,`n  sport: null,
                confidence: [0.6, 1.0],
                riskLevel: null,
                timeRange: '24h',
                search: ''
              }
            }))},

          // UI Actions;
          addToast: toastData => {
            const toast = {
              ...toastData,
              id: `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            };

            set(state => ({
              ui: {
                ...state.ui,
                toasts: [...state.ui.toasts, toast]
              }
            }));

            // Auto-remove toast after duration;
            if (toast.duration !== 0) {
              setTimeout(() => {
                get().actions.removeToast(toast.id);}, toast.duration || 5000);}
          },

          removeToast: (id: string) => {
            set(state => ({
              ui: {
                ...state.ui,
                toasts: state.ui.toasts.filter(toast => toast.id !== id)
              }
            }))},

          setLoading: (key: string, loading: boolean) => {
            set(state => ({
              ui: {
                ...state.ui,
                loading: {
                  ...state.ui.loading,
                  [key]: loading
                }
              }
            }))},

          setModal: (key: string, open: boolean) => {
            set(state => ({
              ui: {
                ...state.ui,
                modals: {
                  ...state.ui.modals,
                  [key]: open
                }
              }
            }))}
        }
      }),
      {
        name: 'a1betting-store',
        partialize: state => ({,`n  user: state.user,
          theme: state.theme,
          filters: state.filters,
          betting: {,`n  bankroll: state.betting.bankroll,
            bets: state.betting.bets
          }
        })
      }
    ),
    { name: 'A1Betting Store'}
  )
);

// Convenience Hooks;
export const usePredictions = () => {
  return {
    predictions,
    latestPredictions,
    updatePrediction: actions.updatePrediction,
    getPrediction: actions.getPrediction,
    clearPredictions: actions.clearPredictions
  }};

export const useBetting = () => {
  return {
    ...betting,
    addBet: actions.addBet,
    updateBetStatus: actions.updateBetStatus,
    addOpportunity: actions.addOpportunity,
    removeOpportunity: actions.removeOpportunity,
    updateBankroll: actions.updateBankroll,
    setBettingLoading: actions.setBettingLoading,
    setBettingError: actions.setBettingError
  }};

export const useUser = () => {
  return {
    ...user,
    setUser: actions.setUser,
    updatePreferences: actions.updatePreferences,
    updateSettings: actions.updateSettings
  }};

export const useTheme = () => {
  return {
    ...theme,
    setTheme: actions.setTheme,
    toggleTheme: actions.toggleTheme
  }};

export const useFilters = () => {
  return {
    ...filters,
    setFilters: actions.setFilters,
    clearFilters: actions.clearFilters
  }};

export const useUI = () => {
  return {
    ...ui,
    addToast: actions.addToast,
    removeToast: actions.removeToast,
    setLoading: actions.setLoading,
    setModal: actions.setModal
  }};

// Export types for use in components;
export type {
  PredictionData,
  BettingState,
  Bet,
  BettingOpportunity,
  ThemeState,
  UserState,
  FilterState,
//   UnifiedStore
};




`
