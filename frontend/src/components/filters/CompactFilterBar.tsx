import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Calendar, Globe, TrendingUp, ChevronDown, X, Settings } from 'lucide-react';
import type { FilterState, SportOption, TimeFrameOption } from './QuantumFilters';

interface CompactFilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  className?: string;
  onOpenFullFilters?: () => void;
}

const QUICK_SPORTS = [
  { id: 'nba', name: 'NBA', icon: '🏀', color: 'text-orange-400' },
  { id: 'nfl', name: 'NFL', icon: '🏈', color: 'text-green-400' },
  { id: 'mlb', name: 'MLB', icon: '⚾', color: 'text-blue-400' },
  { id: 'nhl', name: 'NHL', icon: '🏒', color: 'text-cyan-400' },
  { id: 'wnba', name: 'WNBA', icon: '🏀', color: 'text-orange-300' },
  { id: 'soccer', name: 'Soccer', icon: '⚽', color: 'text-white' },
  { id: 'pga', name: 'PGA', icon: '⛳', color: 'text-emerald-400' },
  { id: 'mma', name: 'MMA', icon: '🥊', color: 'text-red-400' },
  { id: 'boxing', name: 'Boxing', icon: '🥊', color: 'text-yellow-500' },
  { id: 'tennis', name: 'Tennis', icon: '🎾', color: 'text-green-400' },
  { id: 'esports', name: 'Esports', icon: '🎮', color: 'text-purple-500' },
];

const QUICK_TIMEFRAMES = [
  { id: 'live', name: 'Live', icon: '🔴' },
  { id: 'pre-game', name: 'Pre-Game', icon: '⏰' },
  { id: 'in-game', name: 'In-Game', icon: '🎯' },
  { id: '2nd-half', name: '2nd Half', icon: '🎯' },
  { id: 'today', name: 'Today', icon: '📅' },
  { id: 'tonight', name: 'Tonight', icon: '🌙' },
  { id: 'tomorrow', name: 'Tomorrow', icon: '🌅' },
  { id: 'week', name: 'Week', icon: '📊' },
  { id: 'weekend', name: 'Weekend', icon: '🎉' },
];

const CompactFilterBar: React.FC<CompactFilterBarProps> = ({
  filters,
  onFiltersChange,
  className = '',
  onOpenFullFilters,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<'sports' | 'time' | null>(null);

  const toggleSport = (sportId: string) => {
    const updatedSports = filters.sports.includes(sportId)
      ? filters.sports.filter(id => id !== sportId)
      : [...filters.sports, sportId];
    onFiltersChange({ ...filters, sports: updatedSports });
  };

  const selectTimeFrame = (timeFrameId: string) => {
    onFiltersChange({ ...filters, timeFrame: timeFrameId });
    setActiveDropdown(null);
  };

  const clearSport = (sportId: string) => {
    onFiltersChange({
      ...filters,
      sports: filters.sports.filter(id => id !== sportId),
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.sports.length > 4) count++; // Default is 4 major sports
    if (filters.timeFrame !== 'today') count++;
    if (filters.regions.length > 1) count++;
    if (filters.advanced.minConfidence > 80) count++;
    if (filters.advanced.onlyLive) count++;
    return count;
  };

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {/* Active Sport Pills */}
      <div className='flex items-center space-x-2'>
        <div className='flex items-center space-x-1 text-sm text-gray-400 font-mono'>
          <TrendingUp className='w-4 h-4' />
          <span>Sports:</span>
        </div>
        <div className='flex flex-wrap gap-1'>
          {filters.sports.slice(0, 4).map(sportId => {
            const sport = QUICK_SPORTS.find(s => s.id === sportId);
            return sport ? (
              <motion.div
                key={sportId}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className='flex items-center space-x-1 px-2 py-1 bg-electric-500/20 text-electric-400 rounded-full text-xs group'
              >
                <span>{sport.icon}</span>
                <span className='font-mono'>{sport.name}</span>
                <button
                  onClick={() => clearSport(sportId)}
                  className='opacity-0 group-hover:opacity-100 transition-opacity'
                >
                  <X className='w-3 h-3' />
                </button>
              </motion.div>
            ) : null;
          })}
          {filters.sports.length > 4 && (
            <div className='px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-mono'>
              +{filters.sports.length - 4}
            </div>
          )}
        </div>

        {/* Sports Dropdown */}
        <div className='relative'>
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'sports' ? null : 'sports')}
            className='flex items-center space-x-1 px-3 py-1 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all text-sm'
          >
            <span className='text-gray-400'>Add</span>
            <ChevronDown
              className={`w-3 h-3 text-gray-400 transition-transform ${
                activeDropdown === 'sports' ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {activeDropdown === 'sports' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className='absolute top-full left-0 mt-1 w-64 quantum-card rounded-lg border border-white/10 overflow-hidden z-50'
              >
                <div className='p-3'>
                  <div className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-2'>
                    Quick Sports
                  </div>
                  <div className='grid grid-cols-2 gap-1'>
                    {QUICK_SPORTS.map(sport => (
                      <button
                        key={sport.id}
                        onClick={() => toggleSport(sport.id)}
                        className={`flex items-center space-x-2 p-2 rounded text-left text-sm transition-all ${
                          filters.sports.includes(sport.id)
                            ? 'bg-electric-500/20 text-electric-400'
                            : 'hover:bg-white/10 text-gray-300'
                        }`}
                      >
                        <span>{sport.icon}</span>
                        <span>{sport.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Time Frame Selector */}
      <div className='flex items-center space-x-2'>
        <div className='flex items-center space-x-1 text-sm text-gray-400 font-mono'>
          <Calendar className='w-4 h-4' />
          <span>Time:</span>
        </div>

        <div className='relative'>
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'time' ? null : 'time')}
            className='flex items-center space-x-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all text-sm'
          >
            <span>{QUICK_TIMEFRAMES.find(t => t.id === filters.timeFrame)?.icon}</span>
            <span className='font-mono'>
              {QUICK_TIMEFRAMES.find(t => t.id === filters.timeFrame)?.name || 'Today'}
            </span>
            <ChevronDown
              className={`w-3 h-3 transition-transform ${
                activeDropdown === 'time' ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {activeDropdown === 'time' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className='absolute top-full left-0 mt-1 w-48 quantum-card rounded-lg border border-white/10 overflow-hidden z-50'
              >
                <div className='p-2'>
                  {QUICK_TIMEFRAMES.map(timeframe => (
                    <button
                      key={timeframe.id}
                      onClick={() => selectTimeFrame(timeframe.id)}
                      className={`flex items-center space-x-2 w-full p-2 rounded text-left text-sm transition-all ${
                        filters.timeFrame === timeframe.id
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      <span>{timeframe.icon}</span>
                      <span className='font-mono'>{timeframe.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Advanced Filters Button */}
      {onOpenFullFilters && (
        <button
          onClick={onOpenFullFilters}
          className='flex items-center space-x-2 px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all text-sm relative'
        >
          <Settings className='w-4 h-4' />
          <span className='font-mono'>Advanced</span>
          {getActiveFiltersCount() > 0 && (
            <div className='absolute -top-1 -right-1 w-4 h-4 bg-purple-400 text-black text-xs rounded-full flex items-center justify-center font-bold'>
              {getActiveFiltersCount()}
            </div>
          )}
        </button>
      )}

      {/* Active Filters Indicator */}
      {getActiveFiltersCount() > 0 && !onOpenFullFilters && (
        <div className='flex items-center space-x-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs'>
          <Filter className='w-3 h-3' />
          <span className='font-mono'>{getActiveFiltersCount()} active</span>
        </div>
      )}

      {/* Click outside handler */}
      {activeDropdown && (
        <div className='fixed inset-0 z-40' onClick={() => setActiveDropdown(null)} />
      )}
    </div>
  );
};

export default CompactFilterBar;
