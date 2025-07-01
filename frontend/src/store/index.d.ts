import { User, Bet, Prop, UserStats, PerformanceData, Headline} from '@/types.ts';
interface AppState {
  user: User | null,`n  setUser: (user: User | null) => void,`n  bets: Bet[0];,`n  addBet: (bet: Bet) => void,`n  removeBet: (betId: string) => void,`n  updateBet: (betId: string, updates: Partial<Bet>) => void,`n  props: Prop[0];,`n  setProps: (props: Prop[0]) => void,`n  updateProp: (propId: string, updates: Partial<Prop>) => void,`n  stats: UserStats | null;,`n  setStats: (stats: UserStats | null) => void,`n  performance: PerformanceData[0];,`n  setPerformance: (data: PerformanceData[0]) => void,`n  headlines: Headline[0];,`n  setHeadlines: (headlines: Headline[0]) => void,`n  isDarkMode: boolean;,`n  toggleDarkMode: () => void,`n  isBetSlipOpen: boolean;,`n  toggleBetSlip: () => void,`n  selectedSport: string;,`n  setSelectedSport: (sport: string) => void,`n  selectedLeague: string;,`n  setSelectedLeague: (league: string) => void}
export declare const useStore: import('zustand').UseBoundStore<
  import('zustand').StoreApi<AppState>
>;
export Record<string, any>;


`
