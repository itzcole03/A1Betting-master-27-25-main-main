import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import type { FilterState } from '../components/filters/QuantumFilters';

// All available sports for default selection (Primary 11 + Misc)
export const ALL_SPORTS = [
  'nba',
  'wnba',
  'mlb',
  'nfl',
  'nhl',
  'soccer',
  'pga',
  'mma',
  'boxing',
  'tennis',
  'esports',
  'misc',
];

// Helper function to check if all sports are selected
export const isAllSportsSelected = (selectedSports: string[]): boolean => {
  return selectedSports.length === ALL_SPORTS.length;
};

// Primary 11 sports from PrizePicks
export const PRIMARY_SPORTS = [
  'nba',
  'wnba',
  'mlb',
  'nfl',
  'nhl',
  'soccer',
  'pga',
  'mma',
  'boxing',
  'tennis',
  'esports',
];

// Just the misc category
export const MISC_SPORTS = ['misc'];

// Default filter state - ALL sports selected for maximum opportunity analysis
const DEFAULT_FILTERS: FilterState = {
  sports: [...ALL_SPORTS], // All sports selected by default
  timeFrame: 'today',
  regions: ['us'],
  advanced: {
    minConfidence: 80,
    onlyLive: false,
    includeProps: true,
    dataQuality: 'all',
  },
};

// Filter context type
interface FilterContextType {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  updateFilters: (updates: Partial<FilterState>) => void;
  resetFilters: () => void;
  isFiltering: boolean;
  filterKey: string; // Unique key that changes when filters change
}

// Create context
export const FilterContext = createContext<FilterContextType | null>(null);

// Custom hook for using filters
export const useFilters = () => {
  const [filters, setFilters] = useState<FilterState>(() => {
    // Try to load from localStorage
    try {
      const saved = localStorage.getItem('quantum_filters');
      return saved ? { ...DEFAULT_FILTERS, ...JSON.parse(saved) } : DEFAULT_FILTERS;
    } catch {
      return DEFAULT_FILTERS;
    }
  });

  const [isFiltering, setIsFiltering] = useState(false);

  // Generate a unique key when filters change (useful for triggering re-fetches)
  const filterKey = JSON.stringify(filters);

  // Save filters to localStorage when they change
  useEffect(() => {
    localStorage.setItem('quantum_filters', JSON.stringify(filters));
  }, [filters]);

  // Update filters with partial updates
  const updateFilters = useCallback((updates: Partial<FilterState>) => {
    setIsFiltering(true);
    setFilters(prev => ({ ...prev, ...updates }));

    // Simulate filtering delay
    setTimeout(() => setIsFiltering(false), 300);
  }, []);

  // Reset filters to default
  const resetFilters = useCallback(() => {
    setIsFiltering(true);
    setFilters(DEFAULT_FILTERS);
    setTimeout(() => setIsFiltering(false), 300);
  }, []);

  return {
    filters,
    setFilters,
    updateFilters,
    resetFilters,
    isFiltering,
    filterKey,
  };
};

// Hook for getting filtered data based on current filters
export const useFilteredData = <
  T extends { sport?: string; startTime?: Date; region?: string; confidence?: number },
>(
  data: T[],
  filters?: FilterState
) => {
  const filterContext = useContext(FilterContext);
  const activeFilters = filters || filterContext?.filters || DEFAULT_FILTERS;

  return data.filter(item => {
    // Sport filter - empty array means "All Sports"
    if (activeFilters.sports.length > 0 && item.sport) {
      if (!activeFilters.sports.includes(item.sport)) return false;
    }

    // Time frame filter
    if (item.startTime && activeFilters.timeFrame !== 'season') {
      const now = new Date();
      const itemTime = new Date(item.startTime);

      switch (activeFilters.timeFrame) {
        case 'live':
          // Check if game is currently active (within 3 hours of start time)
          const diffHours = (now.getTime() - itemTime.getTime()) / (1000 * 60 * 60);
          if (diffHours < 0 || diffHours > 3) return false;
          break;
        case 'today':
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          if (itemTime < today || itemTime >= tomorrow) return false;
          break;
        case 'tomorrow':
          const tomorrowStart = new Date();
          tomorrowStart.setDate(tomorrowStart.getDate() + 1);
          tomorrowStart.setHours(0, 0, 0, 0);
          const tomorrowEnd = new Date(tomorrowStart);
          tomorrowEnd.setDate(tomorrowEnd.getDate() + 1);
          if (itemTime < tomorrowStart || itemTime >= tomorrowEnd) return false;
          break;
        case 'week':
          const weekEnd = new Date();
          weekEnd.setDate(weekEnd.getDate() + 7);
          if (itemTime > weekEnd) return false;
          break;
        case 'weekend':
          const dayOfWeek = itemTime.getDay();
          if (dayOfWeek !== 0 && dayOfWeek !== 6) return false; // Sunday = 0, Saturday = 6
          break;
        case 'month':
          const monthEnd = new Date();
          monthEnd.setDate(monthEnd.getDate() + 30);
          if (itemTime > monthEnd) return false;
          break;
      }
    }

    // Region filter
    if (activeFilters.regions.length > 0 && item.region) {
      if (!activeFilters.regions.includes(item.region)) return false;
    }

    // Confidence filter
    if (item.confidence !== undefined) {
      if (item.confidence < activeFilters.advanced.minConfidence) return false;
    }

    return true;
  });
};

// Hook for getting filter statistics
export const useFilterStats = (totalCount: number, filteredCount: number) => {
  const context = useContext(FilterContext);
  const filters = context?.filters || DEFAULT_FILTERS;

  const stats = {
    totalItems: totalCount,
    filteredItems: filteredCount,
    hiddenItems: totalCount - filteredCount,
    reductionPercent:
      totalCount > 0 ? Math.round(((totalCount - filteredCount) / totalCount) * 100) : 0,
    activeFilters: {
      sports: filters.sports.length,
      hasTimeFilter: filters.timeFrame !== 'today',
      regions: filters.regions.length,
      hasAdvancedFilters:
        filters.advanced.minConfidence > 80 ||
        filters.advanced.onlyLive ||
        !filters.advanced.includeProps ||
        filters.advanced.dataQuality !== 'all',
    },
  };

  return stats;
};

// Utility function to check if current filters are default
export const isDefaultFilters = (filters: FilterState): boolean => {
  return JSON.stringify(filters) === JSON.stringify(DEFAULT_FILTERS);
};

// Utility function to get human-readable filter summary
export const getFilterSummary = (filters: FilterState): string => {
  const parts = [];

  if (filters.sports.length === ALL_SPORTS.length) {
    parts.push('All Sports');
  } else if (filters.sports.length > 0) {
    if (filters.sports.length <= 3) {
      parts.push(`Sports: ${filters.sports.join(', ').toUpperCase()}`);
    } else {
      parts.push(`${filters.sports.length}/${ALL_SPORTS.length} sports`);
    }
  } else {
    parts.push('No Sports Selected');
  }

  if (filters.timeFrame !== 'today') {
    parts.push(`Time: ${filters.timeFrame}`);
  }

  if (filters.regions.length > 1) {
    parts.push(`${filters.regions.length} regions`);
  }

  if (filters.advanced.minConfidence > 80) {
    parts.push(`Min confidence: ${filters.advanced.minConfidence}%`);
  }

  if (filters.advanced.onlyLive) {
    parts.push('Live only');
  }

  if (!filters.advanced.includeProps) {
    parts.push('No props');
  }

  if (filters.advanced.dataQuality !== 'all') {
    parts.push(`${filters.advanced.dataQuality} quality`);
  }

  return parts.length > 0 ? parts.join(' • ') : 'Default filters';
};
