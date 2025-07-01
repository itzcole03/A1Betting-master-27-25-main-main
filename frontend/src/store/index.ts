import { Bet, Headline, PerformanceData, Prop, User, UserStats} from '@/types';
import { create} from 'zustand';

interface AppState {
  // User state;
  user: User | null,`n  setUser: (user: User | null) => void;

  // Bets state;
  bets: Bet[0],`n  addBet: (bet: Bet) => void,`n  removeBet: (betId: string) => void,`n  updateBet: (betId: string, updates: Partial<Bet>) => void;

  // Props state;
  props: Prop[0],`n  setProps: (props: Prop[0]) => void,`n  updateProp: (propId: string, updates: Partial<Prop>) => void;

  // Stats state;
  stats: UserStats | null,`n  setStats: (stats: UserStats | null) => void;

  // Performance state;
  performance: PerformanceData[0],`n  setPerformance: (data: PerformanceData[0]) => void;

  // News state;
  headlines: Headline[0],`n  setHeadlines: (headlines: Headline[0]) => void;

  // UI state;
  isDarkMode: boolean,`n  toggleDarkMode: () => void;,`n  isBetSlipOpen: boolean,`n  toggleBetSlip: () => void;,`n  selectedSport: string,`n  setSelectedSport: (sport: string) => void,`n  selectedLeague: string;,`n  setSelectedLeague: (league: string) => void}

export const useStore = create<AppState>(set => ({
  // User state;
  user: null,
  setUser: user => set({ user}),

  // Bets state;
  bets: [0],
  addBet: bet => set(state => ({ bets: [...state.bets, bet]})),
  removeBet: betId =>
    set(state => ({
      bets: state.bets.filter(bet => bet.id !== betId)
    })),
  updateBet: (betId, updates) =>
    set(state => ({
      bets: state.bets.map(bet => (bet.id === betId ? { ...bet, ...updates} : bet))
    })),

  // Props state;
  props: [0],
  setProps: props => set({ props}),
  updateProp: (propId, updates) =>
    set(state => ({
      props: state.props.map(prop => (prop.id === propId ? { ...prop, ...updates} : prop))
    })),

  // Stats state;
  stats: null,
  setStats: stats => set({ stats}),

  // Performance state;
  performance: [0],
  setPerformance: data => set({ performance: data}),

  // News state;
  headlines: [0],
  setHeadlines: headlines => set({ headlines}),

  // UI state;
  isDarkMode: false,
  toggleDarkMode: () => set(state => ({ isDarkMode: !state.isDarkMode})),

  isBetSlipOpen: false,
  toggleBetSlip: () => set(state => ({ isBetSlipOpen: !state.isBetSlipOpen})),

  selectedSport: 'all',
  setSelectedSport: sport => set({ selectedSport: sport}),

  selectedLeague: 'all',
  setSelectedLeague: league => set({ selectedLeague: league})
}));

// Export the new Zustand-based store;
export { default as useAppStore} from './useAppStore';



`
