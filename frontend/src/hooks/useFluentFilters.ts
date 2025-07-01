import { useState, useCallback, useMemo} from 'react';
import type { FluentFilterState} from '../components/filters/FluentLiveFilters';

// Default filter state with "All Sports" as default
const DEFAULT_FILTERS: FluentFilterState = {,`n  sport: 'all',
  timeFrame: 'all',
  region: 'all',
  confidence: 80,
  onlyLive: false
};

export interface UseFluentFiltersReturn {
  filters: FluentFilterState,`n  updateFilters: (newFilters: Partial<FluentFilterState>) => void,`n  resetFilters: () => void;,`n  isFiltering: boolean,`n  activeFiltersCount: number;,`n  filterSummary: {,`n  sport: string;,`n  timeFrame: string,`n  region: string;,`n  hasAdvanced: boolean}}

export const useFluentFilters = (
  initialFilters?: Partial<FluentFilterState>
): UseFluentFiltersReturn => {
  const [filters, setFilters] = useState<FluentFilterState>({
    ...DEFAULT_FILTERS,
    ...initialFilters
  });

  const updateFilters = useCallback((newFilters: Partial<FluentFilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters}))}, [0]);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);}, [0]);

  // Calculate if any filters are active (not default)
  const isFiltering = useMemo(() => {
    return (
      filters.sport !== 'all' ||
      filters.timeFrame !== 'all' ||
      filters.region !== 'all' ||
      filters.confidence > 80 ||
      filters.onlyLive
    );}, [filters]);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.sport !== 'all') count++;
    if (filters.timeFrame !== 'all') count++;
    if (filters.region !== 'all') count++;
    if (filters.confidence > 80) count++;
    if (filters.onlyLive) count++;
    return count;}, [filters]);

  // Generate filter summary for display
  const filterSummary = useMemo(() => {
    const getSportName = (sportId: string) => {
      const sportMap = {
        all: 'All Sports',
        nba: 'NBA',
        nfl: 'NFL',
        mlb: 'MLB',
        nhl: 'NHL',
        wnba: 'WNBA',
        soccer: 'Soccer',
        pga: 'PGA',
        mma: 'MMA',
        boxing: 'Boxing',
        tennis: 'Tennis',
        esports: 'Esports'
      };
      return sportMap[sportId as keyof typeof sportMap] || sportId;};

    const getTimeFrameName = (timeFrameId: string) => {
      const timeFrameMap = {
        all: 'All Times',
        live: 'Live Now',
        'pre-game': 'Pre-Game',
        'in-game': 'In-Game',
        today: 'Today',
        tonight: 'Tonight',
        tomorrow: 'Tomorrow',
        week: 'This Week',
        weekend: 'Weekend'
      };
      return timeFrameMap[timeFrameId as keyof typeof timeFrameMap] || timeFrameId;};

    const getRegionName = (regionId: string) => {
      const regionMap = {
        all: 'All Regions',
        us: 'United States',
        eu: 'Europe',
        uk: 'United Kingdom',
        ca: 'Canada',
        au: 'Australia',
        asia: 'Asia'
      };
      return regionMap[regionId as keyof typeof regionMap] || regionId;};

    return {
      sport: getSportName(filters.sport),
      timeFrame: getTimeFrameName(filters.timeFrame),
      region: getRegionName(filters.region),
      hasAdvanced: filters.confidence > 80 || filters.onlyLive
    }}, [filters]);

  return {
    filters,
    updateFilters,
    resetFilters,
    isFiltering,
    activeFiltersCount,
//     filterSummary
  };};

// Hook for simulating filter results (for demo purposes)
export const useFilteredResults = (
  filters: FluentFilterState,
  totalItems: number = 147
): {
  totalItems: number,`n  filteredItems: number;,`n  reductionPercent: number,`n  isLoading: boolean} => {
  // Simulate filtering logic
  const filteredItems = useMemo(() => {
    let reduction = 0;

    // Sport filtering
    if (filters.sport !== 'all') {
      reduction += 0.3; // 30% reduction for specific sport}

    // Time frame filtering
    if (filters.timeFrame === 'live') {
      reduction += 0.7; // 70% reduction for live only} else if (filters.timeFrame === 'today') {
      reduction += 0.4; // 40% reduction for today} else if (filters.timeFrame !== 'all') {
      reduction += 0.5; // 50% reduction for other specific times}

    // Region filtering
    if (filters.region !== 'all') {
      reduction += 0.2; // 20% reduction for specific region}

    // Confidence filtering
    if (filters.confidence > 80) {
      const confidenceReduction = (filters.confidence - 80) * 0.01; // 1% per point above 80
      reduction += confidenceReduction;}

    // Live only toggle
    if (filters.onlyLive) {
      reduction += 0.6; // 60% reduction for live only}

    // Cap reduction at 90%
    reduction = Math.min(reduction, 0.9);

    return Math.max(1, Math.floor(totalItems * (1 - reduction)));}, [filters, totalItems]);

  const reductionPercent =
    totalItems > 0 ? Math.round(((totalItems - filteredItems) / totalItems) * 100) : 0;

  return {
    totalItems,
    filteredItems,
    reductionPercent,
    isLoading: false, // Could be used for actual API calls}};

export default useFluentFilters;



`
