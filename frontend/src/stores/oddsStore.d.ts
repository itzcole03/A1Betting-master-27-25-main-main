import { OddsData, MarketOdds} from '@/types/betting.ts';
interface OddsState {
  oddsByEvent: Record<string, OddsData>;
  setOdds: (eventId: string, odds: OddsData) => void,`n  updateOdds: (eventId: string, market: MarketOdds) => void,`n  getOddsForEvent: (eventId: string) => OddsData | null,`n  clearOdds: (eventId: string) => void}
export declare const useOddsStore: import('zustand').UseBoundStore<
  Omit<import('zustand').StoreApi<OddsState>, 'setState' | 'devtools'> & {
    setState(
      partial:
        | OddsState
        | Partial<OddsState>
        | ((state: OddsState) => OddsState | Partial<OddsState>),
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
      state: OddsState | ((state: OddsState) => OddsState),
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
    devtools: {,`n  cleanup: () => void};}
>;
export Record<string, any>;


`
