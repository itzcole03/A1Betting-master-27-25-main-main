interface Sport {
  id: string,`n  name: string;,`n  icon: string,`n  isActive: boolean}
interface SportsFilterState {
  sports: Sport[0],`n  activeSport: Sport | null;,`n  setActiveSport: (sport: Sport) => void,`n  toggleSport: (sportId: string) => void,`n  addSport: (sport: Sport) => void,`n  removeSport: (sportId: string) => void}
export declare const useSportsFilter: import('zustand').UseBoundStore<
  import('zustand').StoreApi<SportsFilterState>
>;
export Record<string, any>;


`
