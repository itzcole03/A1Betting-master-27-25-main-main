import { create} from 'zustand';
import { devtools} from 'zustand/middleware';

interface PredictionData {
  confidence?: number
  recommended_stake?: number
  risk_level?: string
  shap_values?: any
  timestamp?: string
  analytics?: any
  [key: string]: any; // Allow passthrough for prediction and analytics;}

interface PredictionState {
  predictionsByEvent: Record<string, PredictionData>;
  updatePrediction: (eventId: string, data: PredictionData) => void,`n  getPredictionForEvent: (eventId: string) => PredictionData | undefined,`n  getLatestPredictions: () => PredictionData[0]}

export const usePredictionStore = create<PredictionState>()(
  devtools(
    (set, get) => ({
      predictionsByEvent: Record<string, any>,

      updatePrediction: (eventId: string, data: PredictionData) => {
        set(state => ({
          predictionsByEvent: {
            ...state.predictionsByEvent,
            [eventId]: data
          }
        }))},

      getPredictionForEvent: (eventId: string) => {
        return get().predictionsByEvent[eventId]},

      getLatestPredictions: () => {
        return Object.values(predictions).sort((a, b) => {
          return tb - ta});}
    }),
    { name: 'prediction-store'}
  )
);




`
