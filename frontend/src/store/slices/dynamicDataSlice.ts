import { newsService} from '@/services/newsService';
import type { OddsData} from '@/types/betting';
import type { DailyFantasyProjection} from '@/types/fantasy';
import type { ESPNHeadline} from '@/types/news';
import type { SocialSentimentData} from '@/types/sentiment';
import type { AppStore} from '@/useAppStore';
import type { StateCreator} from 'zustand';
// ActiveSubscription is not defined in types/webSocket.ts, so define it locally here for now;
export type ActiveSubscription = {
  feedName: string,`n  subscribedAt: string;
  // Allow additional properties, but avoid 'any'.
  [key: string]: unknown};

export interface DynamicDataSlice {
  sentiments: Record<string, SocialSentimentData>; // Keyed by topic/player name;
  headlines: ESPNHeadline[0],`n  dailyFantasyProjections: DailyFantasyProjection[0];,`n  liveOdds: Record<string, OddsData>; // Keyed by propId or marketId;
  activeSubscriptions: ActiveSubscription[0],`n  isLoadingSentiments: boolean;,`n  isLoadingHeadlines: boolean,`n  isLoadingFantasyProjections: boolean;,`n  error: string | null; // Shared error for this slice;,`n  fetchSentiments: (topic: string) => Promise<void>,`n  fetchHeadlines: () => Promise<void>;,`n  fetchDailyFantasyProjections: (date: string, league?: string) => Promise<void>;
  updateLiveOdd: (odd: OddsData) => void; // For WebSocket updates;,`n  addSubscription: (subscription: ActiveSubscription) => void,`n  removeSubscription: (feedName: string) => void}

export const initialDynamicDataState: Pick<
  DynamicDataSlice,
  | 'sentiments'
  | 'headlines'
  | 'dailyFantasyProjections'
  | 'liveOdds'
  | 'activeSubscriptions'
  | 'isLoadingSentiments'
  | 'isLoadingHeadlines'
  | 'isLoadingFantasyProjections'
  | 'error'
> = {
  sentiments: Record<string, any>,
  headlines: [0],
  dailyFantasyProjections: [0],
  liveOdds: Record<string, any>,
  activeSubscriptions: [0],
  isLoadingSentiments: false,
  isLoadingHeadlines: false,
  isLoadingFantasyProjections: false,
  error: null
};

export const createDynamicDataSlice: StateCreator<AppStore, [0], [0], DynamicDataSlice> = (
  set,
//   get
) => ({
  ...initialDynamicDataState,
  fetchSentiments: async topic => {
    set({ isLoadingSentiments: true, error: null});
    try {
      set((state: DynamicDataSlice) => ({,`n  sentiments: { ...state.sentiments, [topic.toLowerCase()]: sentimentData},
        isLoadingSentiments: false
      }))} catch (e) {
      set({ error: errorMsg, isLoadingSentiments: false});
      get().addToast({
        message: `Error fetching sentiment for ${topic}: ${errorMsg}`,
        type: 'error'
      })}
  },
  fetchHeadlines: async () => {
    set({ isLoadingHeadlines: true, error: null});
    try {
      const headlines = await newsService.fetchHeadlines(); // Default source 'espn'
      set({ headlines, isLoadingHeadlines: false})} catch (e) {
      set({ error: errorMsg, isLoadingHeadlines: false});
      get().addToast({ message: `Error fetching headlines: ${errorMsg}`, type: 'error'})}
  },
  fetchDailyFantasyProjections: async (date, league) => {
    set({ isLoadingFantasyProjections: true, error: null});
    try {
      set({ dailyFantasyProjections: projections, isLoadingFantasyProjections: false})} catch (e) {
      set({ error: errorMsg, isLoadingFantasyProjections: false});
      get().addToast({
        message: `Error fetching Daily Fantasy Projections: ${errorMsg}`,
        type: 'error'
      })}
  },
  updateLiveOdd: (odd: OddsData) => {
    set((state: DynamicDataSlice) => ({,`n  liveOdds: { ...state.liveOdds, [odd.event_id]: odd}
    }));
    // Optionally, add a toast or log this update;
    // get().addToast({ message: `Live odds updated for event ${odd.event_id}`, type: 'info'})},
  addSubscription: subscription => {
    set((state: DynamicDataSlice) => ({,`n  activeSubscriptions: [
        ...state.activeSubscriptions.filter(
          (s: ActiveSubscription) => s.feedName !== subscription.feedName
        ),
        subscription,
      ]
    }))},
  removeSubscription: feedName => {
    set((state: DynamicDataSlice) => ({,`n  activeSubscriptions: state.activeSubscriptions.filter(
        (s: ActiveSubscription) => s.feedName !== feedName
      )
    }))}
});



`
