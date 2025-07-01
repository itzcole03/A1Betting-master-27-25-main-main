import React, { useState, useEffect} from 'react';
import { motion, AnimatePresence} from 'framer-motion';
import {
  Calendar,
  Clock,
  Filter,
  ChevronDown,
  Check,
  X,
  RotateCcw,
  Zap,
  Globe,
//   TrendingUp
} from 'lucide-react';

export interface SportOption {
  id: string,`n  name: string;,`n  icon: string,`n  color: string;,`n  category: 'primary' | 'misc'}

export interface TimeFrameOption {
  id: string,`n  name: string;,`n  description: string,`n  icon: string;,`n  color: string,`n  value: number; // hours}

export interface FilterState {
  sports: string[0],`n  timeFrame: string;,`n  regions: string[0],`n  advanced: {,`n  minConfidence: number,`n  onlyLive: boolean;,`n  includeProps: boolean,`n  dataQuality: 'all' | 'high' | 'premium'}}

interface QuantumFiltersProps {
  filters: FilterState,`n  onFiltersChange: (filters: FilterState) => void;
  className?: string
  showAdvanced?: boolean}

const SPORTS_OPTIONS: SportOption[0] = [
  // Primary Eleven (PrizePicks Core Sports)
  { id: 'nba', name: 'NBA', icon: '🏀', color: 'text-orange-400', category: 'primary'},
  { id: 'wnba', name: 'WNBA', icon: '🏀', color: 'text-orange-300', category: 'primary'},
  { id: 'mlb', name: 'MLB', icon: '���', color: 'text-blue-400', category: 'primary'},
  { id: 'nfl', name: 'NFL', icon: '🏈', color: 'text-green-400', category: 'primary'},
  { id: 'nhl', name: 'NHL', icon: '🏒', color: 'text-cyan-400', category: 'primary'},
  { id: 'soccer', name: 'Soccer', icon: '⚽', color: 'text-white', category: 'primary'},
  { id: 'pga', name: 'PGA', icon: '⛳', color: 'text-emerald-400', category: 'primary'},
  { id: 'mma', name: 'MMA', icon: '🥊', color: 'text-red-400', category: 'primary'},
  { id: 'boxing', name: 'Boxing', icon: '🥊', color: 'text-yellow-500', category: 'primary'},
  { id: 'tennis', name: 'Tennis', icon: '🎾', color: 'text-green-400', category: 'primary'},
  { id: 'esports', name: 'Esports', icon: '🎮', color: 'text-purple-500', category: 'primary'},

  // Misc Category (Everything Else from PrizePicks)
  { id: 'misc', name: 'Misc.', icon: '🎯', color: 'text-gray-400', category: 'misc'},
];

const TIME_FRAME_OPTIONS: TimeFrameOption[0] = [
  // Live & Real-Time
  {
    id: 'live',
    name: 'Live Now',
    description: 'Currently active games',
    icon: '🔴',
    color: 'text-red-400',
    value: 0
  },
  {
    id: 'pre-game',
    name: 'Pre-Game',
    description: 'Starting within 2 hours',
    icon: '⏰',
    color: 'text-orange-400',
    value: 2
  },
  {
    id: 'in-game',
    name: 'In-Game',
    description: 'Games in progress',
    icon: '🎯',
    color: 'text-red-500',
    value: 0.5
  },

  // Quarter/Period Specific (Basketball/Football)
  {
    id: '1st-quarter',
    name: '1st Quarter',
    description: 'First quarter bets',
    icon: '1️⃣',
    color: 'text-blue-400',
    value: 0.25
  },
  {
    id: '2nd-quarter',
    name: '2nd Quarter',
    description: 'Second quarter bets',
    icon: '2️⃣',
    color: 'text-blue-500',
    value: 0.25
  },
  {
    id: '3rd-quarter',
    name: '3rd Quarter',
    description: 'Third quarter bets',
    icon: '3️⃣',
    color: 'text-blue-600',
    value: 0.25
  },
  {
    id: '4th-quarter',
    name: '4th Quarter',
    description: 'Fourth quarter bets',
    icon: '4️⃣',
    color: 'text-blue-700',
    value: 0.25
  },

  // Half-Time Specific
  {
    id: '1st-half',
    name: '1st Half',
    description: 'First half bets',
    icon: '🥅',
    color: 'text-green-400',
    value: 0.5
  },
  {
    id: '2nd-half',
    name: '2nd Half',
    description: 'Second half bets',
    icon: '🎯',
    color: 'text-green-500',
    value: 0.5
  },
  {
    id: 'halftime',
    name: 'Halftime',
    description: 'Halftime break bets',
    icon: '⏸️',
    color: 'text-yellow-400',
    value: 0.02
  },

  // Hockey Periods
  {
    id: '1st-period',
    name: '1st Period',
    description: 'First period (Hockey)',
    icon: '🏒',
    color: 'text-cyan-400',
    value: 0.33
  },
  {
    id: '2nd-period',
    name: '2nd Period',
    description: 'Second period (Hockey)',
    icon: '🏒',
    color: 'text-cyan-500',
    value: 0.33
  },
  {
    id: '3rd-period',
    name: '3rd Period',
    description: 'Third period (Hockey)',
    icon: '🏒',
    color: 'text-cyan-600',
    value: 0.33
  },
  {
    id: 'overtime',
    name: 'Overtime',
    description: 'Overtime periods',
    icon: '⏱️',
    color: 'text-purple-400',
    value: 0.08
  },

  // Baseball Innings
  {
    id: 'early-innings',
    name: 'Early Innings',
    description: 'Innings 1-3',
    icon: '⚾',
    color: 'text-blue-300',
    value: 0.33
  },
  {
    id: 'middle-innings',
    name: 'Middle Innings',
    description: 'Innings 4-6',
    icon: '⚾',
    color: 'text-blue-400',
    value: 0.33
  },
  {
    id: 'late-innings',
    name: 'Late Innings',
    description: 'Innings 7-9',
    icon: '⚾',
    color: 'text-blue-500',
    value: 0.33
  },
  {
    id: 'extra-innings',
    name: 'Extra Innings',
    description: 'Beyond 9th inning',
    icon: '⚾',
    color: 'text-blue-600',
    value: 0.2
  },

  // Soccer Specific
  {
    id: 'first-45',
    name: 'First 45min',
    description: 'First half (Soccer)',
    icon: '⚽',
    color: 'text-green-300',
    value: 0.75
  },
  {
    id: 'second-45',
    name: 'Second 45min',
    description: 'Second half (Soccer)',
    icon: '⚽',
    color: 'text-green-400',
    value: 0.75
  },
  {
    id: 'stoppage-time',
    name: 'Stoppage Time',
    description: 'Added time',
    icon: '⏱️',
    color: 'text-yellow-500',
    value: 0.08
  },

  // Tennis Specific
  {
    id: '1st-set',
    name: '1st Set',
    description: 'First set (Tennis)',
    icon: '🎾',
    color: 'text-yellow-300',
    value: 0.5
  },
  {
    id: '2nd-set',
    name: '2nd Set',
    description: 'Second set (Tennis)',
    icon: '🎾',
    color: 'text-yellow-400',
    value: 0.5
  },
  {
    id: '3rd-set',
    name: '3rd Set',
    description: 'Third set (Tennis)',
    icon: '🎾',
    color: 'text-yellow-500',
    value: 0.5
  },

  // Standard Time Frames
  {
    id: 'next-hour',
    name: 'Next Hour',
    description: 'Starting within 1 hour',
    icon: '⏰',
    color: 'text-orange-300',
    value: 1
  },
  {
    id: 'today',
    name: 'Today',
    description: 'Rest of today',
    icon: '📅',
    color: 'text-electric-400',
    value: 24
  },
  {
    id: 'tonight',
    name: 'Tonight',
    description: '6 PM - Midnight',
    icon: '🌙',
    color: 'text-purple-300',
    value: 6
  },
  {
    id: 'tomorrow',
    name: 'Tomorrow',
    description: 'Next day only',
    icon: '🌅',
    color: 'text-yellow-400',
    value: 48
  },
  {
    id: 'week',
    name: 'This Week',
    description: 'Next 7 days',
    icon: '📊',
    color: 'text-blue-400',
    value: 168
  },
  {
    id: 'weekend',
    name: 'Weekend',
    description: 'Sat-Sun games',
    icon: '🎉',
    color: 'text-purple-400',
    value: 72
  },
  {
    id: 'month',
    name: 'This Month',
    description: 'Next 30 days',
    icon: '📈',
    color: 'text-green-400',
    value: 720
  },
  {
    id: 'season',
    name: 'Full Season',
    description: 'All upcoming games',
    icon: '🏆',
    color: 'text-cyan-400',
    value: 8760
  },
];

const REGION_OPTIONS = [
  { id: 'us', name: 'United States', icon: '🇺🇸', color: 'text-blue-400'},
  { id: 'eu', name: 'Europe', icon: '🇪🇺', color: 'text-yellow-400'},
  { id: 'uk', name: 'United Kingdom', icon: '🇬🇧', color: 'text-red-400'},
  { id: 'ca', name: 'Canada', icon: '🇨🇦', color: 'text-red-500'},
  { id: 'au', name: 'Australia', icon: '🇦🇺', color: 'text-green-400'},
  { id: 'asia', name: 'Asia', icon: '🌏', color: 'text-purple-400'},
];

const QuantumFilters: React.FC<QuantumFiltersProps> = ({
  filters,
  onFiltersChange,
  className = '',
  showAdvanced = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'sports' | 'time' | 'regions' | 'advanced'>('sports');

  // Group sports by category
  const sportsByCategory = SPORTS_OPTIONS.reduce(
    (acc, sport) => {
      if (!acc[sport.category]) acc[sport.category] = [0];
      acc[sport.category].push(sport);
      return acc;},
    Record<string, any> as Record<string, SportOption[0]>
  );

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates})};

  const toggleSport = (sportId: string) => {
    const updatedSports = filters.sports.includes(sportId)
      ? filters.sports.filter(id => id !== sportId)
      : [...filters.sports, sportId];
    updateFilters({ sports: updatedSports})};

  const selectTimeFrame = (timeFrameId: string) => {
    updateFilters({ timeFrame: timeFrameId})};

  const toggleRegion = (regionId: string) => {
    const updatedRegions = filters.regions.includes(regionId)
      ? filters.regions.filter(id => id !== regionId)
      : [...filters.regions, regionId];
    updateFilters({ regions: updatedRegions})};

  const resetFilters = () => {
    onFiltersChange({
      sports: ['nba', 'nfl', 'mlb', 'nhl'],
      timeFrame: 'today',
      regions: ['us'],
      advanced: {,`n  minConfidence: 80,
        onlyLive: false,
        includeProps: true,
        dataQuality: 'all'
      }
    })};

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.sports.length > 0) count++;
    if (filters.timeFrame !== 'today') count++;
    if (filters.regions.length > 1) count++;
    if (filters.advanced.minConfidence > 80) count++;
    if (filters.advanced.onlyLive) count++;
    if (!filters.advanced.includeProps) count++;
    if (filters.advanced.dataQuality !== 'all') count++;
    return count;};

  const CategoryIcon = ({ category}: { category: string}) => {
    const icons = {
      primary: '⭐',
      misc: '🎯'
    };
    return <span className='text-lg'>{icons[category as keyof typeof icons] || '📊'}</span>;};

  return (
    <motion.div
      className={`quantum-card rounded-2xl overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 10}}
      animate={{ opacity: 1, y: 0}}
      transition={{ duration: 0.3}}
    >
      {/* Filter Header */}
      <div className='p-4 border-b border-white/10'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <div className='relative'>
              <Filter className='w-5 h-5 text-electric-400' />
              {getActiveFiltersCount() > 0 && (
                <div className='absolute -top-2 -right-2 w-4 h-4 bg-electric-400 text-black text-xs rounded-full flex items-center justify-center font-bold'>
                  {getActiveFiltersCount()}
                </div>
              )}
            </div>
            <h3 className='text-lg font-bold text-white font-cyber'>QUANTUM FILTERS</h3>
          </div>

          <div className='flex items-center space-x-2'>
            <button onClick={resetFilters}
              className='p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10'
              title='Reset Filters'>`n            >
              <RotateCcw className='w-4 h-4' />
            </button>
            <button onClick={() => setIsExpanded(!isExpanded)}
              className='flex items-center space-x-2 px-3 py-2 bg-electric-500/20 text-electric-400 rounded-lg hover:bg-electric-500/30 transition-all'
            >
              <span className='font-mono text-sm'>{isExpanded ? 'Collapse' : 'Expand'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>`n              />
            </button>
          </div>
        </div>

        {/* Quick Filter Pills */}
        <div className='flex flex-wrap gap-2 mt-4'>
          {filters.sports.slice(0, 3).map(sportId => {
            const sport = SPORTS_OPTIONS.find(s => s.id === sportId);
            return sport ? (
              <div key={sportId}
                className='flex items-center space-x-1 px-2 py-1 bg-white/10 rounded-full text-xs'>`n              >
                <span>{sport.icon}</span>
                <span className='text-gray-300'>{sport.name.split(' ')[0]}</span>
              </div>
            ) : null;})}
          {filters.sports.length > 3 && (
            <div className='px-2 py-1 bg-electric-500/20 text-electric-400 rounded-full text-xs font-mono'>
              +{filters.sports.length - 3} more
            </div>
          )}
          <div className='flex items-center space-x-1 px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs'>
            <Clock className='w-3 h-3' />
            <span>{TIME_FRAME_OPTIONS.find(t => t.id === filters.timeFrame)?.name}</span>
          </div>
        </div>
      </div>

      {/* Expanded Filter Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0}}
            animate={{ height: 'auto', opacity: 1}}
            exit={{ height: 0, opacity: 0}}
            transition={{ duration: 0.3}}
            className='overflow-hidden'
          >
            {/* Filter Tabs */}
            <div className='flex border-b border-white/10'>
              {[
                { id: 'sports', label: 'Sports', icon: TrendingUp},
                { id: 'time', label: 'Time', icon: Calendar},
                { id: 'regions', label: 'Regions', icon: Globe},
                ...(showAdvanced ? [{ id: 'advanced', label: 'Advanced', icon: Zap}] : [0]),
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button key={tab.id}>`n                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 transition-all ${
                      activeTab === tab.id
                        ? 'bg-electric-500/20 text-electric-400 border-b-2 border-electric-400'
                        : 'text-gray-400 hover: text-white hover:bg-white/5'}`}
                  >
                    <Icon className='w-4 h-4' />
                    <span className='font-mono text-sm'>{tab.label}</span>
                  </button>
                )})}
            </div>

            {/* Filter Content */}
            <div className='p-4'>
              {/* Sports Tab */}
              {activeTab === 'sports' && (
                <div className='space-y-6'>
                  {Object.entries(sportsByCategory).map(([category, sports]) => (
                    <div key={category}>
                      <div className='flex items-center space-x-2 mb-3'>
                        <CategoryIcon category={category} />
                        <div>
                          <h4 className='text-sm font-bold text-gray-300 uppercase tracking-wider font-cyber'>
                            {category === 'primary' ? 'Primary 11 Sports' : 'Misc. Sports'}
                          </h4>
                          {category === 'misc' && (
                            <p className='text-xs text-gray-400 font-mono mt-1'>
                              College sports, international events, specialty competitions
                            </p>
                          )}
                        </div>
                      </div>
                      <div className='grid grid-cols-2 md: grid-cols-3 gap-2'>
                        {sports.map(sport => (
                          <motion.button
                            key={sport.id}
                            onClick={() => toggleSport(sport.id)}
                            className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                              filters.sports.includes(sport.id)
                                ? 'bg-electric-500/20 border-electric-500/40 text-electric-400'
                                : 'bg-gray-800/30 border-gray-600 text-gray-300 hover:border-gray-500'}`}
                            whileHover={{ scale: 1.02}}
                            whileTap={{ scale: 0.98}}
                          >
                            <span className='text-lg'>{sport.icon}</span>
                            <div className='flex-1 text-left'>
                              <div className='text-sm font-bold'>{sport.name.split(' ')[0]}</div>
                              <div className='text-xs opacity-75'>
                                {sport.name.split(' ').slice(1).join(' ')}
                              </div>
                            </div>
                            {filters.sports.includes(sport.id) && (
                              <Check className='w-4 h-4 text-electric-400' />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Time Frame Tab */}
              {activeTab === 'time' && (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                  {TIME_FRAME_OPTIONS.map(timeFrame => (
                    <motion.button
                      key={timeFrame.id}
                      onClick={() => selectTimeFrame(timeFrame.id)}
                      className={`p-4 rounded-xl border transition-all text-left ${
                        filters.timeFrame === timeFrame.id
                          ? 'bg-electric-500/20 border-electric-500/40 text-electric-400'
                          : 'bg-gray-800/30 border-gray-600 text-gray-300 hover:border-gray-500'}`}
                      whileHover={{ scale: 1.02}}
                      whileTap={{ scale: 0.98}}
                    >
                      <div className='flex items-center space-x-3 mb-2'>
                        <span className='text-xl'>{timeFrame.icon}</span>
                        <span className='font-bold font-cyber'>{timeFrame.name}</span>
                        {filters.timeFrame === timeFrame.id && (
                          <Check className='w-4 h-4 text-electric-400 ml-auto' />
                        )}
                      </div>
                      <div className='text-sm opacity-75 font-mono'>{timeFrame.description}</div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Regions Tab */}
              {activeTab === 'regions' && (
                <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                  {REGION_OPTIONS.map(region => (
                    <motion.button
                      key={region.id}
                      onClick={() => toggleRegion(region.id)}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                        filters.regions.includes(region.id)
                          ? 'bg-electric-500/20 border-electric-500/40 text-electric-400'
                          : 'bg-gray-800/30 border-gray-600 text-gray-300 hover:border-gray-500'}`}
                      whileHover={{ scale: 1.02}}
                      whileTap={{ scale: 0.98}}
                    >
                      <span className='text-lg'>{region.icon}</span>
                      <div className='flex-1 text-left'>
                        <div className='text-sm font-bold'>{region.name}</div>
                      </div>
                      {filters.regions.includes(region.id) && (
                        <Check className='w-4 h-4 text-electric-400' />
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Advanced Tab */}
              {activeTab === 'advanced' && showAdvanced && (
                <div className='space-y-6'>
                  {/* Confidence Slider */}
                  <div>
                    <label className='block text-sm font-bold mb-3 text-electric-400 font-cyber'>
                      MINIMUM CONFIDENCE: {filters.advanced.minConfidence}%
                    </label>
                    <input type='range'
                      min='50'
                      max='99'
                      value={filters.advanced.minConfidence}>`n                      onChange={e =>
                        updateFilters({
                          advanced: {
                            ...filters.advanced,
                            minConfidence: parseInt(e.target.value)
                          }
                        })}
                      className='w-full h-2 bg-gray-700 rounded-lg appearance-none slider-thumb'
                    />
                  </div>

                  {/* Toggle Options */}
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between p-4 quantum-card rounded-xl'>
                      <div>
                        <div className='font-bold text-white font-cyber'>Live Games Only</div>
                        <div className='text-sm text-gray-400 font-mono'>
                          Show only currently active games
                        </div>
                      </div>
                      <button onClick={() =>
                          updateFilters({
                            advanced: { ...filters.advanced, onlyLive: !filters.advanced.onlyLive}
                          })}
                        className={`w-12 h-6 rounded-full transition-all ${
                          filters.advanced.onlyLive ? 'bg-electric-400' : 'bg-gray-600'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                            filters.advanced.onlyLive ? 'translate-x-7' : 'translate-x-1'}`}>`n                        />
                      </button>
                    </div>

                    <div className='flex items-center justify-between p-4 quantum-card rounded-xl'>
                      <div>
                        <div className='font-bold text-white font-cyber'>Include Props</div>
                        <div className='text-sm text-gray-400 font-mono'>
                          Show player prop predictions
                        </div>
                      </div>
                      <button onClick={() =>
                          updateFilters({
                            advanced: {
                              ...filters.advanced,
                              includeProps: !filters.advanced.includeProps
                            }
                          })}
                        className={`w-12 h-6 rounded-full transition-all ${
                          filters.advanced.includeProps ? 'bg-electric-400' : 'bg-gray-600'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                            filters.advanced.includeProps ? 'translate-x-7' : 'translate-x-1'}`}>`n                        />
                      </button>
                    </div>
                  </div>

                  {/* Data Quality */}
                  <div>
                    <label className='block text-sm font-bold mb-3 text-electric-400 font-cyber'>
                      DATA QUALITY FILTER
                    </label>
                    <div className='grid grid-cols-3 gap-2'>
                      {[
                        { id: 'all', label: 'All Data', desc: 'Include all sources'},
                        { id: 'high', label: 'High Quality', desc: 'Verified sources only'},
                        { id: 'premium', label: 'Premium', desc: 'Premium feeds only'},
                      ].map(option => (
                        <button key={option.id}>`n                          onClick={() =>
                            updateFilters({
                              advanced: { ...filters.advanced, dataQuality: option.id as any}
                            })}
                          className={`p-3 rounded-lg border text-center transition-all ${
                            filters.advanced.dataQuality === option.id
                              ? 'bg-electric-500/20 border-electric-500/40 text-electric-400'
                              : 'bg-gray-800/30 border-gray-600 text-gray-300 hover:border-gray-500'}`}
                        >
                          <div className='font-bold text-sm'>{option.label}</div>
                          <div className='text-xs opacity-75'>{option.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )};

export default QuantumFilters;
export type { FilterState, SportOption, TimeFrameOption};




`
