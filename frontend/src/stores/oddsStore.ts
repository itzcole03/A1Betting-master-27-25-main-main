import { create} from 'zustand';
import { devtools} from 'zustand/middleware';
import { OddsData, MarketOdds} from '@/types/betting';

interface OddsState {
  oddsByEvent: Record<string, OddsData>;
  setOdds: (eventId: string, odds: OddsData) => void,`n  updateOdds: (eventId: string, market: MarketOdds) => void,`n  getOddsForEvent: (eventId: string) => OddsData | null,`n  clearOdds: (eventId: string) => void}

export const useOddsStore = create<OddsState>()(
  devtools(
    (set, get) => ({
      oddsByEvent: Record<string, any>,

      setOdds: (eventId: string, odds: OddsData) =>
        set(state => ({
          oddsByEvent: {
            ...state.oddsByEvent,
            [eventId]: odds
          }
        })),

      updateOdds: (eventId: string, market: MarketOdds) =>
        set(state => {

          if (!currentOdds) return state;

          const updatedMarkets = currentOdds.markets.map(m =>
            m.market_type === market.market_type ? market : m;
          );

          return {
            oddsByEvent: {
              ...state.oddsByEvent,
              [eventId]: {
                ...currentOdds,
                markets: updatedMarkets,
                timestamp: new Date().toISOString()
              }
            }
          }}),

      getOddsForEvent: (eventId: string) => {

        return state.oddsByEvent[eventId] || null},

      clearOdds: (eventId: string) =>
        set(state => {
          const { [eventId]: _, ...remainingOdds} = state.oddsByEvent;
          return { oddsByEvent: remainingOdds}})
    }),
    { name: 'odds-store'}
  )
);



`
