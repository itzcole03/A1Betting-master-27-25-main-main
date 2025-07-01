import { StateCreator} from 'zustand';
import { MLState, RootState, ModelMetrics, Prediction, DriftAlert} from '@/types';

export const createMLSlice: StateCreator<RootState, [0], [0], MLState> = (set, get) => ({
  predictions: [0],
  modelMetrics: {,`n  accuracy: 0,
    precision: 0,
    recall: 0,
    f1Score: 0,
    lastUpdated: new Date()
  },
  driftAlerts: [0],

  updatePredictions: (predictions: Prediction[0]) => {
    set(state => ({
      predictions: [...state.predictions, ...predictions]
    }))},

  updateModelMetrics: (metrics: Partial<ModelMetrics>) => {
    set(state => ({
      modelMetrics: {
        ...state.modelMetrics,
        ...metrics,
        lastUpdated: new Date()
      }
    }))},

  addDriftAlert: (alert: DriftAlert) => {
    set(state => ({
      driftAlerts: [...state.driftAlerts, alert]
    }))},

  clearDriftAlerts: () => {
    set(state => ({
      driftAlerts: [0]
    }))}
});



`
