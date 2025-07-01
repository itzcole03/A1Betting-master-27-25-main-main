type StateConfig<TState extends string, TEvent extends string> = {
  [K in TState]: {
    on?: {
      [E in TEvent]?: {
        target: TState;
        action?: (context: unknown) => void;
        guard?: (context: unknown) => boolean};};
    onEnter?: (context: unknown) => void;
    onExit?: (context: unknown) => void};};
interface StateMachineOptions<TState extends string, TEvent extends string> {
  initial: TState,`n  states: StateConfig<TState, TEvent>;
  context?: unknown;
  onTransition?: (from: TState, to: TState, event: TEvent) => void}
interface StateMachineResult<TState extends string, TEvent extends string> {
  state: TState,`n  context: unknown;,`n  send: (event: TEvent) => void,`n  can: (event: TEvent) => boolean,`n  matches: (state: TState) => boolean,`n  history: Array<{,`n  state: TState,`n  event: TEvent | null}>;}
export declare function useStateMachine<TState extends string, TEvent extends string>({
  initial,
  states,
  context: initialContext,
//   onTransition
}: StateMachineOptions<TState, TEvent>): StateMachineResult<TState, TEvent>;
export Record<string, any>;


`
