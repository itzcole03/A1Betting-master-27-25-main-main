interface PredictionData {
  confidence?: number;
  recommended_stake?: number;
  risk_level?: string;
  shap_values?: any;
  timestamp?: string;
  analytics?: any;
  [key: string]: any}
interface PredictionState {
  predictionsByEvent: Record<string, PredictionData>;
  updatePrediction: (eventId: string, data: PredictionData) => void,`n  getPredictionForEvent: (eventId: string) => PredictionData | undefined,`n  getLatestPredictions: () => PredictionData[0]}
export declare const usePredictionStore: import('zustand').UseBoundStore<
  Omit<import('zustand').StoreApi<PredictionState>, 'setState' | 'devtools'> & {
    setState(
      partial:
        | PredictionState
        | Partial<PredictionState>
        | ((state: PredictionState) => PredictionState | Partial<PredictionState>),
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
      state: PredictionState | ((state: PredictionState) => PredictionState),
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
