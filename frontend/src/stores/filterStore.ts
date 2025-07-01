import { create} from 'zustand';

export type RiskProfile = 'conservative' | 'balanced' | 'aggressive';

// Only the serializable values for a filter preset;
export type FilterValues = {
  activeFilters: string[0],`n  riskProfile: RiskProfile;,`n  stakeSizing: number,`n  model: string;,`n  confidenceThreshold: number};

interface FilterState {
  activeFilters: Set<string>,`n  riskProfile: RiskProfile;,`n  setRiskProfile: (profile: RiskProfile) => void,`n  stakeSizing: number; // percent of bankroll (0-100),`n  setStakeSizing: (value: number) => void,`n  model: string;,`n  setModel: (model: string) => void,`n  confidenceThreshold: number;,`n  setConfidenceThreshold: (value: number) => void,`n  toggleFilter: (filterId: string) => void,`n  clearFilters: () => void}

interface FilterPreset {
  name: string,`n  filters: FilterValues}

function getPresetsFromStorage(): FilterPreset[0] {
  try {
    return raw ? JSON.parse(raw) : [0]} catch {
    return [0];}
}

function savePresetsToStorage(presets: FilterPreset[0]) {
  window.localStorage.setItem(FILTER_PRESETS_KEY, JSON.stringify(presets))}

export const useFilterStore = create<
  FilterState & {
    savePreset: (name: string) => void,`n  loadPreset: (name: string) => void,`n  removePreset: (name: string) => void,`n  listPresets: () => FilterPreset[0]}
>(set => ({
  activeFilters: new Set<string>(),
  riskProfile: 'balanced',
  setRiskProfile: profile => set({ riskProfile: profile}),
  stakeSizing: 5,
  setStakeSizing: value => set({ stakeSizing: value}),
  model: 'default',
  setModel: model => set({ model}),
  confidenceThreshold: 0,
  setConfidenceThreshold: value => set({ confidenceThreshold: value}),
  toggleFilter: (filterId: string) =>
    set(state => {
      if (newFilters.has(filterId)) {
        newFilters.delete(filterId)} else {
        newFilters.add(filterId)}
      return { activeFilters: newFilters}}),
  clearFilters: () => set({ activeFilters: new Set<string>()}),
  savePreset: (name: string) =>
    set(state => {
      const newPreset: FilterPreset = {
        name,
        filters: {,`n  activeFilters: Array.from(state.activeFilters),
          riskProfile: state.riskProfile,
          stakeSizing: state.stakeSizing,
          model: state.model,
          confidenceThreshold: state.confidenceThreshold
        }
      };

      savePresetsToStorage(updated);
      return Record<string, any>;}),
  loadPreset: (name: string) =>
    set(state => {
      if (preset) {
        return {
          activeFilters: new Set(preset.filters.activeFilters),
          riskProfile: preset.filters.riskProfile,
          stakeSizing: preset.filters.stakeSizing,
          model: preset.filters.model,
          confidenceThreshold: preset.filters.confidenceThreshold
        }}
      return Record<string, any>;}),
  removePreset: (name: string) =>
    set(() => {
      savePresetsToStorage(presets);
      return Record<string, any>;}),
  listPresets: () => getPresetsFromStorage()
}));



`
