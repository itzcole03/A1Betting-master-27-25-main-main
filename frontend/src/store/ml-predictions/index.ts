import { create} from 'zustand';
import { devtools} from 'zustand/middleware';
import { ModelOutput, PredictionState} from '@/types/prediction';

interface MLPredictionsState extends PredictionState {
  // Actions;
  setPredictions: (predictions: Map<string, ModelOutput>) => void;
  addPrediction: (id: string, prediction: ModelOutput) => void,`n  removePrediction: (id: string) => void,`n  setLoading: (isLoading: boolean) => void,`n  setError: (error: string | null) => void,`n  clearError: () => void}

export const useMLPredictionsStore = create<MLPredictionsState>()(
  devtools(
    set => ({
      predictions: new Map(),
      isLoading: false,
      error: null,

      setPredictions: predictions => set({ predictions}),
      addPrediction: (id, prediction) =>
        set(state => {
          newPredictions.set(id, prediction);
          return { predictions: newPredictions}}),
      removePrediction: id =>
        set(state => {
          newPredictions.delete(id);
          return { predictions: newPredictions}}),
      setLoading: isLoading => set({ isLoading}),
      setError: error => set({ error}),
      clearError: () => set({ error: null})
    }),
    { name: 'ml-predictions-store'}
  )
);



`
