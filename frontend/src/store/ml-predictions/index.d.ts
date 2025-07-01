import { ModelOutput, PredictionState} from '@/types/prediction.ts';
interface MLPredictionsState extends PredictionState {
  setPredictions: (predictions: Map<string, ModelOutput>) => void;
  addPrediction: (id: string, prediction: ModelOutput) => void,`n  removePrediction: (id: string) => void,`n  setLoading: (isLoading: boolean) => void,`n  setError: (error: string | null) => void,`n  clearError: () => void}
export declare const useMLPredictionsStore: import('zustand').UseBoundStore<
  Omit<import('zustand').StoreApi<MLPredictionsState>, 'setState' | 'devtools'> & {
    setState(
      partial:
        | MLPredictionsState
        | Partial<MLPredictionsState>
        | ((state: MLPredictionsState) => MLPredictionsState | Partial<MLPredictionsState>),
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
      state: MLPredictionsState | ((state: MLPredictionsState) => MLPredictionsState),
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
