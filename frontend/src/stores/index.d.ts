import { useAppStore, AppState, AppStore} from '@/store/useAppStore.ts';
import { useBettingStore, BettingStore} from './bettingStore.ts';
import { useMoneyMakerStore} from './moneyMakerStore.ts';
import type { MoneyMakerStoreState, MoneyMakerStoreActions} from '@/types/money-maker.ts';
import { useThemeStore, ThemeState} from './themeStore.ts';
import { BettingSlice} from './slices/bettingSlice.ts';
import { MLSlice} from './slices/mlSlice.ts';
import { UISlice} from './slices/uiSlice.ts';
import { WebSocketSlice} from './slices/websocketSlice.ts';
export { useAppStore, useBettingStore, useMoneyMakerStore, useThemeStore};
export type {
  AppState,
  AppStore,
  BettingStore,
  MoneyMakerStoreState,
  MoneyMakerStoreActions,
//   ThemeState
};
export type RootState = AppState &
  BettingStore &
  MoneyMakerStoreState &
  MoneyMakerStoreActions &
  ThemeState;
export declare const useStore: import('zustand').UseBoundStore<
  Omit<
    Omit<import('zustand').StoreApi<any>, 'setState' | 'devtools'> & {
      setState(
        partial: any,
        replace?: false | undefined,
        action?:
          | (
              | string
              | {
                  [x: string]: unknown;
                  [x: number]: unknown;
                  [x: symbol]: unknown,`n  type: string}
            )
          | undefined
      ): void;
      setState(
        state: any,
        replace: true,
        action?:
          | (
              | string
              | {
                  [x: string]: unknown;
                  [x: number]: unknown;
                  [x: symbol]: unknown,`n  type: string}
            )
          | undefined
      ): void;
      devtools: {,`n  cleanup: () => void};},
    'persist'
  > & {
    persist: {,`n  setOptions: (,`n  options: Partial<
          import('zustand/middleware').PersistOptions<
            any,
            {
              user: any,`n  token: any;,`n  isAuthenticated: any,`n  theme: any;,`n  config: any,`n  activeBets: any;,`n  totalStake: any,`n  potentialProfit: any}
          >
        >
      ) => void;
      clearStorage: () => void,`n  rehydrate: () => Promise<void> | void;,`n  hasHydrated: () => boolean,`n  onHydrate: (fn: (state: any) => void) => () => void,`n  onFinishHydration: (fn: (state: any) => void) => () => void,`n  getOptions: () => Partial<
        import('zustand/middleware').PersistOptions<
          any,
          {
            user: any,`n  token: any;,`n  isAuthenticated: any,`n  theme: any;,`n  config: any,`n  activeBets: any;,`n  totalStake: any,`n  potentialProfit: any}
        >
      >;};}
>;
export declare const selectors: {,`n  selectIsAuthenticated: (state: RootState) => any,`n  selectUser: (state: RootState) => any,`n  selectBetSlipLegs: (state: RootState) => any,`n  selectActiveBets: (state: RootState) => any,`n  selectTotalStake: (state: RootState) => any,`n  selectPotentialProfit: (state: RootState) => any,`n  selectTheme: (state: RootState) => any,`n  selectIsDarkMode: (state: RootState) => any,`n  selectConfig: (state: RootState) => any,`n  selectOpportunities: (state: RootState) => any};
export declare const actions: {,`n  login: (credentials: { email: string; password: string}) => Promise<void>;
  logout: () => Promise<void>,`n  placeBet: any;,`n  updateActiveBet: any,`n  clearOpportunities: any;,`n  toggleTheme: () => void,`n  updateConfig: any;,`n  addPrediction: any,`n  updatePrediction: any;,`n  addPortfolio: any,`n  updatePortfolio: any;,`n  updateMetrics: any,`n  setLoading: any;,`n  setError: any,`n  reset: any;,`n  loadInitialData: any,`n  handlePlaceBet: any};
export declare function getInitialState(): RootState;
export type StoreState = BettingSlice & MLSlice & UISlice & WebSocketSlice;
export declare const selectBettingState: (state: StoreState) => {,`n  bets: any;,`n  odds: any,`n  payouts: any};
export declare const selectMLState: (state: StoreState) => {,`n  predictions: any;,`n  modelMetrics: any,`n  driftAlerts: any};
export declare const selectUIState: (state: StoreState) => {,`n  theme: any;,`n  userPreferences: any,`n  notifications: any};
export declare const selectWebSocketState: (state: StoreState) => {,`n  isConnected: any;,`n  lastMessage: any,`n  connectionStatus: any};


`
