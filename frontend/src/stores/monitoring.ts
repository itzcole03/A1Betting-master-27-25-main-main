import { create} from 'zustand';

export interface StorePerformanceMetrics {
  updateCount: number,`n  lastUpdate: number | null;,`n  averageUpdateDuration: number,`n  totalUpdateDuration: number;,`n  minUpdateDuration: number | null,`n  maxUpdateDuration: number | null}

const initialMetrics: StorePerformanceMetrics = {,`n  updateCount: 0,
  lastUpdate: null,
  averageUpdateDuration: 0,
  totalUpdateDuration: 0,
  minUpdateDuration: null,
  maxUpdateDuration: null
};

export const usePerformanceMetrics = create<StorePerformanceMetrics>(() => ({
  ...initialMetrics
}));

export function updatePerformanceMetrics(duration: number) {
  usePerformanceMetrics.setState(state => {
    const minUpdateDuration =
      state.minUpdateDuration === null ? duration : Math.min(state.minUpdateDuration, duration);
    const maxUpdateDuration =
      state.maxUpdateDuration === null ? duration : Math.max(state.maxUpdateDuration, duration);
    return {
      updateCount,
      lastUpdate: Date.now(),
      averageUpdateDuration,
      totalUpdateDuration,
      minUpdateDuration,
//       maxUpdateDuration
    }});}



`
