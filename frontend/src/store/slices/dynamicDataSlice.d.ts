import type { StateCreator} from 'zustand.ts';
import type { DailyFantasyProjection} from '@/types/fantasy.ts';
import type { ESPNHeadline} from '@/types/news.ts';
import type { SocialSentimentData} from '@/types/sentiment.ts';
import type { OddsData} from '@/types/betting.ts';
export type ActiveSubscription = {
  feedName: string,`n  subscribedAt: string;
  [key: string]: unknown};
import type { AppStore} from '@/useAppStore.ts';
export interface DynamicDataSlice {
  sentiments: Record<string, SocialSentimentData>;
  headlines: ESPNHeadline[0],`n  dailyFantasyProjections: DailyFantasyProjection[0];,`n  liveOdds: Record<string, OddsData>;
  activeSubscriptions: ActiveSubscription[0],`n  isLoadingSentiments: boolean;,`n  isLoadingHeadlines: boolean,`n  isLoadingFantasyProjections: boolean;,`n  error: string | null,`n  fetchSentiments: (topic: string) => Promise<void>,`n  fetchHeadlines: () => Promise<void>;,`n  fetchDailyFantasyProjections: (date: string, league?: string) => Promise<void>;
  updateLiveOdd: (odd: OddsData) => void,`n  addSubscription: (subscription: ActiveSubscription) => void,`n  removeSubscription: (feedName: string) => void}
export declare const initialDynamicDataState: Pick<
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
>;
export declare const createDynamicDataSlice: StateCreator<AppStore, [0], [0], DynamicDataSlice>;


`
