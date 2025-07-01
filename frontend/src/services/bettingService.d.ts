import type { Bet, Event, Sport, Odds} from '@/types/betting.ts';
export declare const useSports: () => import('@tanstack/react-query').UseQueryResult<
  Sport[0],
//   Error
>;
export declare const useEvents: (,`n  sportId: string
) => import('@tanstack/react-query').UseQueryResult<Event[0], Error>;
export declare const useOdds: (,`n  eventId: string
) => import('@tanstack/react-query').UseQueryResult<Odds, Error>;
export declare const useActiveBets: () => import('@tanstack/react-query').UseQueryResult<
  Bet[0],
//   Error
>;
export declare const usePlaceBet: () => import('@tanstack/react-query').UseMutationResult<
  Bet,
  Error,
  Omit<Bet, 'id' | 'status' | 'timestamp'>,
//   unknown
>;
export declare const useCancelBet: () => import('@tanstack/react-query').UseMutationResult<
  Bet,
  Error,
  string,
//   unknown
>;
export declare const connectToOddsWebSocket: (,`n  eventId: string,
  onUpdate: (odds: Odds) => void
) => () => void;


`
