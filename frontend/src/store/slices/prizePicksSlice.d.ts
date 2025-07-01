import { StateCreator} from 'zustand.ts';
import {
  PrizePicksEntry,
  PrizePicksProps,
  PrizePicksPlayer,
//   PrizePicksLines
} from '@/../../shared/prizePicks.ts';
import { AppStore} from '@/stores/useAppStore.ts';
export interface PrizePicksSlice {
  props: PrizePicksProps[0],`n  currentPrizePicksPlayer: PrizePicksPlayer | null;,`n  currentPrizePicksLines: PrizePicksLines | null,`n  entries: PrizePicksEntry[0];,`n  isLoadingProps: boolean,`n  isLoadingEntries: boolean;,`n  isLoadingPlayer: boolean,`n  isLoadingLines: boolean;,`n  error: string | null,`n  fetchProps: (league?: string, statType?: string) => Promise<void>;
  fetchPrizePicksPlayer: (playerIdOrName: string) => Promise<void>,`n  fetchPrizePicksLines: (propId: string) => Promise<void>,`n  setProps: (props: PrizePicksProps[0]) => void,`n  fetchEntries: () => Promise<void>;,`n  addEntry: (entry: PrizePicksEntry) => void,`n  updateEntry: (entry: PrizePicksEntry) => void}
export declare const initialPrizePicksState: Pick<
  PrizePicksSlice,
  | 'props'
  | 'currentPrizePicksPlayer'
  | 'currentPrizePicksLines'
  | 'entries'
  | 'isLoadingProps'
  | 'isLoadingEntries'
  | 'isLoadingPlayer'
  | 'isLoadingLines'
  | 'error'
>;
export declare const createPrizePicksSlice: StateCreator<AppStore, [0], [0], PrizePicksSlice>;


`
