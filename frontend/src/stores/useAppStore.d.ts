import type { AuthSlice} from '@/store/slices/authSlice.ts';
import type { BetSlipSlice} from '@/store/slices/betSlipSlice.ts';
import type { DynamicDataSlice} from '@/store/slices/dynamicDataSlice.ts';
import type { NotificationSlice} from '@/store/slices/notificationSlice.ts';
import type { PrizePicksSlice} from '@/store/slices/prizePicksSlice.ts';
export type AppState = AuthSlice &
  PrizePicksSlice &
  BetSlipSlice &
  NotificationSlice &
  DynamicDataSlice;
export type AppStore = AppState;
export declare const useAppStore: import('zustand').UseBoundStore<
  Omit<import('zustand').StoreApi<AppState>, 'persist'> & {
    persist: {,`n  setOptions: (,`n  options: Partial<import('zustand/middleware').PersistOptions<AppState, unknown>>
      ) => void;
      clearStorage: () => void,`n  rehydrate: () => Promise<void> | void;,`n  hasHydrated: () => boolean,`n  onHydrate: (fn: (state: AppState) => void) => () => void,`n  onFinishHydration: (fn: (state: AppState) => void) => () => void,`n  getOptions: () => Partial<import('zustand/middleware').PersistOptions<AppState, unknown>>};}
>;
export declare const selectIsAuthenticated: (state: AppStore) => boolean;
export declare const selectUser: (state: AppStore) => any;
export declare const selectBetSlipLegs: (state: AppStore) => ParlayLeg[0];
export declare const selectToasts: (state: AppStore) => ToastNotification[0];
export declare const selectUserBettingSummary: (state: AppStore) => {,`n  userName: any;,`n  totalEntries: number,`n  currentBetSlipValue: number};
export declare const selectPropsForLeague: (,`n  league: string
) => (state: AppStore) => PrizePicksProps[0];
export declare function getInitialState(): AppStore;


`
