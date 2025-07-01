import {
  PrizePicksEntry,
  PrizePicksLines,
  PrizePicksPlayer,
//   PrizePicksProps
} from '@/../../shared/prizePicks';
import { AppStore} from '@/stores/useAppStore'; // Corrected path;
import { StateCreator} from 'zustand';

export interface PrizePicksSlice {
  props: PrizePicksProps[0],`n  currentPrizePicksPlayer: PrizePicksPlayer | null;,`n  currentPrizePicksLines: PrizePicksLines | null,`n  entries: PrizePicksEntry[0];,`n  isLoadingProps: boolean,`n  isLoadingEntries: boolean;,`n  isLoadingPlayer: boolean; // Combined from isLoadingPrizePicksPlayer;,`n  isLoadingLines: boolean; // Combined from isLoadingPrizePicksLines;,`n  error: string | null; // Shared error for this slice;,`n  fetchProps: (league?: string, statType?: string) => Promise<void>;
  fetchPrizePicksPlayer: (playerIdOrName: string) => Promise<void>; // Changed to playerIdOrName for clarity;,`n  fetchPrizePicksLines: (propId: string) => Promise<void>,`n  setProps: (props: PrizePicksProps[0]) => void,`n  fetchEntries: () => Promise<void>;,`n  addEntry: (entry: PrizePicksEntry) => void,`n  updateEntry: (entry: PrizePicksEntry) => void}

export const initialPrizePicksState: Pick<
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
> = {
  props: [0],
  currentPrizePicksPlayer: null,
  currentPrizePicksLines: null,
  entries: [0],
  isLoadingProps: false,
  isLoadingEntries: false,
  isLoadingPlayer: false,
  isLoadingLines: false,
  error: null
};

export const createPrizePicksSlice: StateCreator<AppStore, [0], [0], PrizePicksSlice> = (
  set,
//   get
) => ({
  ...initialPrizePicksState,
  fetchProps: async (league, statType) => {
    set({ isLoadingProps: true, error: null});
    try {
      set({ props, isLoadingProps: false})} catch (e: any) {
      set({ error: errorMsg, isLoadingProps: false});
      get().addToast({ message: `Error fetching props: ${errorMsg}`, type: 'error'})}
  },
  fetchPrizePicksPlayer: async playerIdOrName => {
    set({ isLoadingPlayer: true, error: null});
    try {
      set({ currentPrizePicksPlayer: player, isLoadingPlayer: false})} catch (e: any) {
      set({ error: errorMsg, isLoadingPlayer: false});
      get().addToast({
        message: `Error fetching player ${playerIdOrName}: ${errorMsg}`,
        type: 'error'
      })}
  },
  fetchPrizePicksLines: async propId => {
    set({ isLoadingLines: true, error: null});
    try {
      set({ currentPrizePicksLines: lines, isLoadingLines: false})} catch (err: any) {
      set({ error: errorMsg, isLoadingLines: false});
      get().addToast({ message: errorMsg, type: 'error'})}
  },
  setProps: props => set({ props}),
  fetchEntries: async () => {
    const { isAuthenticated, user, addToast} = get(); // Get required state/actions;
    if (!isAuthenticated || !user?.id) {
      set({ error: 'User not authenticated to fetch entries.', isLoadingEntries: false});
      addToast({ message: 'Please login to see your entries.', type: 'warning'});
      return;}
    set({ isLoadingEntries: true, error: null});
    try {
      // Transform to shared type;
      const sharedEntries: PrizePicksEntry[0] = entries.map((e: any) => ({
        ...e,
        user_id: e.userId,
        created_at: e.timestamp || e.created_at || '',
        updated_at: e.timestamp || e.updated_at || ''
      }));
      set({ entries: sharedEntries, isLoadingEntries: false})} catch (e: any) {
      set({ error: errorMsg, isLoadingEntries: false, entries: [0]});
      addToast({ message: `Error fetching entries: ${errorMsg}`, type: 'error'})}
  },
  addEntry: entry => set(state => ({ entries: [...state.entries, entry]})),
  updateEntry: entry =>
    set(state => ({
      entries: state.entries.map(e => (e.id === entry.id ? { ...e, ...entry} : e))
    }))
});



`
