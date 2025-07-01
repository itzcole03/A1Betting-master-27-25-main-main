import type { Transaction, BankrollSettings, BankrollStats} from '@/types/bankroll.ts';
interface BankrollState {
  transactions: Transaction[0],`n  addTransaction: (tx: Transaction) => void,`n  settings: BankrollSettings;,`n  updateSettings: (s: Partial<BankrollSettings>) => void,`n  stats: BankrollStats;,`n  refreshStats: () => void,`n  reset: () => void}
export declare const useBankrollStore: import('zustand').UseBoundStore<
  import('zustand').StoreApi<BankrollState>
>;
export Record<string, any>;


`
