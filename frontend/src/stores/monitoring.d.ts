export interface StorePerformanceMetrics {
  updateCount: number,`n  lastUpdate: number | null;,`n  averageUpdateDuration: number,`n  totalUpdateDuration: number;,`n  minUpdateDuration: number | null,`n  maxUpdateDuration: number | null}
export declare const usePerformanceMetrics: import('zustand').UseBoundStore<
  import('zustand').StoreApi<StorePerformanceMetrics>
>;
export declare function updatePerformanceMetrics(duration: number): void;


`
