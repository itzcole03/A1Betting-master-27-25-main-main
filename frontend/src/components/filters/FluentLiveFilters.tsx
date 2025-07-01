import React, { useState, useRef, useEffect} from 'react';
import { motion, AnimatePresence} from 'framer-motion';
import {
  ChevronDown,
  Filter,
  Clock,
  Globe,
  TrendingUp,
  X,
  Check,
  RotateCcw,
  Settings,
//   Zap
} from 'lucide-react';

export interface FluentFilterState {
  sport: string; // Single sport selection with "all" as default,`n  timeFrame: string;,`n  region: string,`n  confidence: number;,`n  onlyLive: boolean}

interface FluentLiveFiltersProps {
  filters: FluentFilterState,`n  onFiltersChange: (filters: FluentFilterState) => void,`n  totalGames: number;,`n  filteredGames: number;
  className?: string}

// Sports with "All Sports" as the first option
const SPORTS_OPTIONS = [
  { id: 'all', name: 'All Sports', icon: '🏆', color: 'text-electric-400', popular: true},
  { id: 'nba', name: 'NBA', icon: '🏀', color: 'text-orange-400', popular: true},
  { id: 'nfl', name: 'NFL', icon: '🏈', color: 'text-green-400', popular: true},
  { id: 'mlb', name: 'MLB', icon: '⚾', color: 'text-blue-400', popular: true},
  { id: 'nhl', name: 'NHL', icon: '🏒', color: 'text-cyan-400', popular: true},
  { id: 'wnba', name: 'WNBA', icon: '🏀', color: 'text-orange-300', popular: false},
  { id: 'soccer', name: 'Soccer', icon: '⚽', color: 'text-white', popular: true},
  { id: 'pga', name: 'PGA', icon: '⛳', color: 'text-emerald-400', popular: false},
  { id: 'mma', name: 'MMA', icon: '🥊', color: 'text-red-400', popular: false},
  { id: 'boxing', name: 'Boxing', icon: '🥊', color: 'text-yellow-500', popular: false},
  { id: 'tennis', name: 'Tennis', icon: '🎾', color: 'text-green-400', popular: false},
  { id: 'esports', name: 'Esports', icon: '🎮', color: 'text-purple-500', popular: false},
];

const TIME_FRAME_OPTIONS = [
  { id: 'all', name: 'All Times', icon: '⏰', color: 'text-gray-400'},
  { id: 'live', name: 'Live Now', icon: '🔴', color: 'text-red-400'},
  { id: 'pre-game', name: 'Pre-Game', icon: '⏰', color: 'text-orange-400'},
  { id: 'in-game', name: 'In-Game', icon: '🎯', color: 'text-red-500'},
  { id: 'today', name: 'Today', icon: '📅', color: 'text-electric-400'},
  { id: 'tonight', name: 'Tonight', icon: '🌙', color: 'text-purple-300'},
  { id: 'tomorrow', name: 'Tomorrow', icon: '🌅', color: 'text-yellow-400'},
  { id: 'week', name: 'This Week', icon: '📊', color: 'text-blue-400'},
  { id: 'weekend', name: 'Weekend', icon: '🎉', color: 'text-purple-400'},
];

const REGION_OPTIONS = [
  { id: 'all', name: 'All Regions', icon: '🌍', color: 'text-gray-400'},
  { id: 'us', name: 'United States', icon: '🇺🇸', color: 'text-blue-400'},
  { id: 'eu', name: 'Europe', icon: '🇪🇺', color: 'text-yellow-400'},
  { id: 'uk', name: 'United Kingdom', icon: '🇬🇧', color: 'text-red-400'},
  { id: 'ca', name: 'Canada', icon: '🇨🇦', color: 'text-red-500'},
  { id: 'au', name: 'Australia', icon: '🇦🇺', color: 'text-green-400'},
  { id: 'asia', name: 'Asia', icon: '🌏', color: 'text-purple-400'},
];

const FluentLiveFilters: React.FC<FluentLiveFiltersProps> = ({
  filters,
  onFiltersChange,
  totalGames,
  filteredGames,
  className = ''
}) => {
  const [activeDropdown, setActiveDropdown] = useState<'sport' | 'time' | 'region' | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)}
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);}, [0]);

  const updateFilter = (key: keyof FluentFilterState, value: unknown) => {
    onFiltersChange({ ...filters, [key]: value});
    setActiveDropdown(null);};

  const resetFilters = () => {
    onFiltersChange({
      sport: 'all',
      timeFrame: 'all',
      region: 'all',
      confidence: 80,
      onlyLive: false
    })};

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.sport !== 'all') count++;
    if (filters.timeFrame !== 'all') count++;
    if (filters.region !== 'all') count++;
    if (filters.confidence > 80) count++;
    if (filters.onlyLive) count++;
    return count;};

  const getCurrentSport = () =>
    SPORTS_OPTIONS.find(s => s.id === filters.sport) || SPORTS_OPTIONS[0];
  const getCurrentTimeFrame = () =>
    TIME_FRAME_OPTIONS.find(t => t.id === filters.timeFrame) || TIME_FRAME_OPTIONS[0];
  const getCurrentRegion = () =>
    REGION_OPTIONS.find(r => r.id === filters.region) || REGION_OPTIONS[0];

  const reductionPercent =
    totalGames > 0 ? Math.round(((totalGames - filteredGames) / totalGames) * 100) : 0;

  const DropdownButton = ({
    isActive,
    onClick,
    icon,
    label,
    value,
    color = 'text-gray-400'
  }: {
    isActive: boolean,`n  onClick: () => void;,`n  icon: React.ReactNode,`n  label: string;,`n  value: string;
    color?: string}) => (
    <motion.button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all duration-300 min-w-[140px] ${
//         isActive
          ? 'bg-electric-500/20 border-electric-500/40 text-electric-400'
          : 'bg-gray-800/40 border-gray-600/40 text-gray-300 hover:border-gray-500/60 hover:bg-gray-700/40'}`}
      whileHover={{ scale: 1.02}}
      whileTap={{ scale: 0.98}}
    >
      <span className='text-lg'>{icon}</span>
      <div className='flex-1 text-left'>
        <div className='text-xs text-gray-400 uppercase tracking-wider font-mono'>{label}</div>
        <div className={`text-sm font-semibold ${color}`}>{value}</div>
      </div>
      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}>`n      />
    </motion.button>
  );

  const DropdownMenu = ({
    options,
    selectedId,
    onSelect,
    groupByPopular = false
  }: {
    options: unknown[0],`n  selectedId: string;,`n  onSelect: (id: string) => void;
    groupByPopular?: boolean}) => {
    const popularOptions = groupByPopular
      ? options.filter(opt => opt.popular || opt.id === 'all')
      : [0];
    const otherOptions = groupByPopular
      ? options.filter(opt => !opt.popular && opt.id !== 'all')
      : options;

    return (
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.95}}
        animate={{ opacity: 1, y: 0, scale: 1}}
        exit={{ opacity: 0, y: 8, scale: 0.95}}
        transition={{ duration: 0.2}}
        className='absolute top-full left-0 mt-2 w-full min-w-[250px] quantum-card rounded-xl border border-white/10 overflow-hidden z-50 shadow-2xl'
      >
        <div className='max-h-80 overflow-y-auto'>
          {groupByPopular && popularOptions.length > 0 && (
            <>
              <div className='px-4 py-2 bg-gray-800/50 border-b border-white/10'>
                <div className='text-xs font-bold text-electric-400 uppercase tracking-wider font-cyber'>
//                   Popular
                </div>
              </div>
              {popularOptions.map(option => (
                <button key={option.id}>`n                  onClick={() => onSelect(option.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all hover:bg-white/10 ${
                    selectedId === option.id
                      ? 'bg-electric-500/20 text-electric-400'
                      : 'text-gray-300'}`}
                >
                  <span className='text-lg'>{option.icon}</span>
                  <span className='flex-1 font-semibold'>{option.name}</span>
                  {selectedId === option.id && <Check className='w-4 h-4' />}
                </button>
              ))}
            </>
          )}

          {groupByPopular && otherOptions.length > 0 && (
            <>
              <div className='px-4 py-2 bg-gray-800/50 border-b border-white/10'>
                <div className='text-xs font-bold text-gray-400 uppercase tracking-wider font-cyber'>
                  Other Sports
                </div>
              </div>
              {otherOptions.map(option => (
                <button key={option.id}>`n                  onClick={() => onSelect(option.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all hover:bg-white/10 ${
                    selectedId === option.id
                      ? 'bg-electric-500/20 text-electric-400'
                      : 'text-gray-300'}`}
                >
                  <span className='text-lg'>{option.icon}</span>
                  <span className='flex-1 font-semibold'>{option.name}</span>
                  {selectedId === option.id && <Check className='w-4 h-4' />}
                </button>
              ))}
            </>
          )}

          {!groupByPopular &&
            options.map(option => (
              <button key={option.id}>`n                onClick={() => onSelect(option.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all hover:bg-white/10 ${
                  selectedId === option.id
                    ? 'bg-electric-500/20 text-electric-400'
                    : 'text-gray-300'}`}
              >
                <span className='text-lg'>{option.icon}</span>
                <span className='flex-1 font-semibold'>{option.name}</span>
                {selectedId === option.id && <Check className='w-4 h-4' />}
              </button>
            ))}
        </div>
      </motion.div>
    )};

  return (
    <div className={`quantum-card rounded-2xl overflow-hidden ${className}`} ref={dropdownRef}>
      {/* Header */}
      <div className='p-4 border-b border-white/10'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <div className='relative'>
              <Zap className='w-5 h-5 text-electric-400' />
              {getActiveFiltersCount() > 0 && (
                <div className='absolute -top-2 -right-2 w-4 h-4 bg-electric-400 text-black text-xs rounded-full flex items-center justify-center font-bold'>
                  {getActiveFiltersCount()}
                </div>
              )}
            </div>
            <h3 className='text-lg font-bold text-white font-cyber'>LIVE FILTERS</h3>
          </div>

          <div className='flex items-center space-x-4'>
            <div className='text-sm text-gray-400 font-mono'>
              <span className='text-electric-400 font-bold'>{filteredGames.toLocaleString()}</span>
              <span className='text-gray-500'>/</span>
              <span>{totalGames.toLocaleString()}</span>
              <span className='ml-2 text-xs'>games</span>
              {reductionPercent > 0 && (
                <span className='ml-2 text-yellow-400'>(-{reductionPercent}%)</span>
              )}
            </div>

            <button onClick={resetFilters}
              className='p-2 text-gray-400 hover: text-white transition-colors rounded-lg hover:bg-white/10'
              title='Reset All Filters'>`n            >
              <RotateCcw className='w-4 h-4' />
            </button>
          </div>
        </div>
      </div>

      {/* Main Filter Controls */}
      <div className='p-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
          {/* Sport Filter */}
          <div className='relative'>
            <DropdownButton isActive={activeDropdown === 'sport'}>`n              onClick={() => setActiveDropdown(activeDropdown === 'sport' ? null : 'sport')}
              icon={getCurrentSport().icon}
              label='Sport'
              value={getCurrentSport().name}
              color={getCurrentSport().color}
            />

            <AnimatePresence>
              {activeDropdown === 'sport' && (
                <DropdownMenu options={SPORTS_OPTIONS}
                  selectedId={filters.sport}>`n                  onSelect={id => updateFilter('sport', id)}
                  groupByPopular={true}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Time Frame Filter */}
          <div className='relative'>
            <DropdownButton isActive={activeDropdown === 'time'}>`n              onClick={() => setActiveDropdown(activeDropdown === 'time' ? null : 'time')}
              icon={getCurrentTimeFrame().icon}
              label='Time'
              value={getCurrentTimeFrame().name}
              color={getCurrentTimeFrame().color}
            />

            <AnimatePresence>
              {activeDropdown === 'time' && (
                <DropdownMenu options={TIME_FRAME_OPTIONS}
                  selectedId={filters.timeFrame}>`n                  onSelect={id => updateFilter('timeFrame', id)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Region Filter */}
          <div className='relative'>
            <DropdownButton isActive={activeDropdown === 'region'}>`n              onClick={() => setActiveDropdown(activeDropdown === 'region' ? null : 'region')}
              icon={getCurrentRegion().icon}
              label='Region'
              value={getCurrentRegion().name}
              color={getCurrentRegion().color}
            />

            <AnimatePresence>
              {activeDropdown === 'region' && (
                <DropdownMenu options={REGION_OPTIONS}
                  selectedId={filters.region}>`n                  onSelect={id => updateFilter('region', id)}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            {/* Live Games Toggle */}
            <motion.button
              onClick={() => updateFilter('onlyLive', !filters.onlyLive)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all ${
                filters.onlyLive
                  ? 'bg-red-500/20 border-red-500/40 text-red-400'
                  : 'bg-gray-800/40 border-gray-600/40 text-gray-400 hover:text-gray-300'}`}
              whileHover={{ scale: 1.02}}
              whileTap={{ scale: 0.98}}
            >
              <div className={`w-2 h-2 rounded-full ${filters.onlyLive ? 'bg-red-400 animate-pulse' : 'bg-gray-500'}`}>`n              />
              <span className='text-sm font-mono'>Live Only</span>
            </motion.button>

            {/* Advanced Settings Toggle */}
            <motion.button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all ${
//                 showAdvanced
                  ? 'bg-purple-500/20 border-purple-500/40 text-purple-400'
                  : 'bg-gray-800/40 border-gray-600/40 text-gray-400 hover:text-gray-300'}`}
              whileHover={{ scale: 1.02}}
              whileTap={{ scale: 0.98}}
            >
              <Settings className='w-4 h-4' />
              <span className='text-sm font-mono'>Advanced</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}>`n              />
            </motion.button>
          </div>

          {/* Active Filters Summary */}
          {getActiveFiltersCount() > 0 && (
            <div className='flex items-center space-x-2'>
              <Filter className='w-4 h-4 text-electric-400' />
              <span className='text-sm text-electric-400 font-mono'>
                {getActiveFiltersCount()} active filter{getActiveFiltersCount() !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        {/* Advanced Controls */}
        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ height: 0, opacity: 0}}
              animate={{ height: 'auto', opacity: 1}}
              exit={{ height: 0, opacity: 0}}
              transition={{ duration: 0.3}}
              className='overflow-hidden border-t border-white/10 mt-4 pt-4'
            >
              <div className='space-y-4'>
                {/* Confidence Slider */}
                <div>
                  <div className='flex items-center justify-between mb-3'>
                    <label className='text-sm font-bold text-purple-400 font-cyber'>
                      MIN CONFIDENCE
                    </label>
                    <span className='text-purple-400 font-mono text-sm'>{filters.confidence}%</span>
                  </div>
                  <div className='relative'>
                    <input type='range'
                      min='50'
                      max='99'
                      value={filters.confidence}>`n                      onChange={e => updateFilter('confidence', parseInt(e.target.value))}
                      className='w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb'
                    />
                    <div className='flex justify-between text-xs text-gray-500 mt-1'>
                      <span>50%</span>
                      <span>75%</span>
                      <span>90%</span>
                      <span>99%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )};

export default FluentLiveFilters;
export type { FluentFilterState};




`

