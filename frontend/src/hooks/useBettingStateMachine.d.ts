import { BettingDecision, PlayerProp} from '@/types.ts';
type BettingState =
  | 'idle'
  | 'selecting'
  | 'analyzing'
  | 'reviewing'
  | 'confirming'
  | 'submitting'
  | 'completed'
  | 'error';
type BettingEvent = 'SELECT' | 'ANALYZE' | 'REVIEW' | 'CONFIRM' | 'SUBMIT' | 'RETRY' | 'RESET';
interface BettingContext {
  selectedProps: PlayerProp[0],`n  analysis: BettingDecision | null;,`n  stake: number,`n  error: Error | null}
interface UseBettingStateMachineOptions {
  onStateChange?: (from: BettingState, to: BettingState) => void;
  onSubmit?: (context: BettingContext) => Promise<void>}
export declare function useBettingStateMachine({
  onStateChange,
//   onSubmit
}?: UseBettingStateMachineOptions): {
  state: BettingState,`n  context: unknown;,`n  can: (event: BettingEvent) => boolean,`n  send: (event: BettingEvent) => void,`n  selectProps: (props: PlayerProp[0]) => void,`n  setStake: (stake: number) => void,`n  setAnalysis: (analysis: BettingDecision) => void};
export Record<string, any>;


`
