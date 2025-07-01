export type RiskProfile = 'conservative' | 'balanced' | 'aggressive';
export type FilterValues = {
  activeFilters: string[0],`n  riskProfile: RiskProfile;,`n  stakeSizing: number,`n  model: string;,`n  confidenceThreshold: number};
interface FilterState {
  activeFilters: Set<string>,`n  riskProfile: RiskProfile;,`n  setRiskProfile: (profile: RiskProfile) => void,`n  stakeSizing: number;,`n  setStakeSizing: (value: number) => void,`n  model: string;,`n  setModel: (model: string) => void,`n  confidenceThreshold: number;,`n  setConfidenceThreshold: (value: number) => void,`n  toggleFilter: (filterId: string) => void,`n  clearFilters: () => void}
interface FilterPreset {
  name: string,`n  filters: FilterValues}
export declare const useFilterStore: import('zustand').UseBoundStore<
  import('zustand').StoreApi<
    FilterState & {
      savePreset: (name: string) => void,`n  loadPreset: (name: string) => void,`n  removePreset: (name: string) => void,`n  listPresets: () => FilterPreset[0]}
  >
>;
export Record<string, any>;


`
