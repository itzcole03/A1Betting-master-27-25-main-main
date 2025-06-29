import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Play, Pause, Target, ChevronDown, Activity, Timer } from 'lucide-react';

export interface InGameTimeOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  sport: string[];
  remaining?: string;
  active?: boolean;
}

interface InGameTimeFilterProps {
  sport?: string;
  onTimeFrameSelect: (timeFrame: string) => void;
  selectedTimeFrame?: string;
  className?: string;
}

const IN_GAME_OPTIONS: InGameTimeOption[] = [
  // Basketball (NBA/WNBA)
  {
    id: 'q1-live',
    name: '1st Quarter Live',
    description: 'Betting during Q1',
    icon: '1️⃣',
    sport: ['nba', 'wnba'],
    remaining: '8:45',
  },
  {
    id: 'q1-end',
    name: 'End of Q1',
    description: 'Q1 ending soon',
    icon: '⏰',
    sport: ['nba', 'wnba'],
    remaining: '1:30',
  },
  {
    id: 'q2-live',
    name: '2nd Quarter Live',
    description: 'Betting during Q2',
    icon: '2️⃣',
    sport: ['nba', 'wnba'],
    remaining: '6:22',
  },
  {
    id: 'halftime',
    name: 'Halftime',
    description: 'Halftime break',
    icon: '⏸️',
    sport: ['nba', 'wnba', 'nfl'],
    remaining: '12:00',
  },
  {
    id: 'q3-live',
    name: '3rd Quarter Live',
    description: 'Betting during Q3',
    icon: '3️⃣',
    sport: ['nba', 'wnba'],
    remaining: '4:15',
  },
  {
    id: 'q4-live',
    name: '4th Quarter Live',
    description: 'Final quarter action',
    icon: '4️⃣',
    sport: ['nba', 'wnba'],
    remaining: '2:08',
    active: true,
  },
  {
    id: 'final-2min',
    name: 'Final 2 Minutes',
    description: 'Crunch time bets',
    icon: '🔥',
    sport: ['nba', 'wnba'],
    remaining: '1:47',
  },

  // Football (NFL)
  {
    id: 'q1-nfl',
    name: '1st Quarter',
    description: 'First quarter action',
    icon: '1️⃣',
    sport: ['nfl'],
    remaining: '11:23',
  },
  {
    id: 'q2-nfl',
    name: '2nd Quarter',
    description: 'Second quarter',
    icon: '2️⃣',
    sport: ['nfl'],
    remaining: '8:45',
  },
  {
    id: 'q3-nfl',
    name: '3rd Quarter',
    description: 'Third quarter',
    icon: '3️⃣',
    sport: ['nfl'],
    remaining: '13:12',
  },
  {
    id: 'q4-nfl',
    name: '4th Quarter',
    description: 'Final quarter',
    icon: '4️⃣',
    sport: ['nfl'],
    remaining: '6:38',
  },
  {
    id: '2min-warning',
    name: '2-Minute Warning',
    description: 'Final 2 minutes',
    icon: '⚠️',
    sport: ['nfl'],
    remaining: '1:58',
  },

  // Hockey (NHL)
  {
    id: 'p1-nhl',
    name: '1st Period',
    description: 'First period action',
    icon: '🏒',
    sport: ['nhl'],
    remaining: '12:34',
  },
  {
    id: 'p2-nhl',
    name: '2nd Period',
    description: 'Second period',
    icon: '🏒',
    sport: ['nhl'],
    remaining: '7:21',
  },
  {
    id: 'p3-nhl',
    name: '3rd Period',
    description: 'Final period',
    icon: '🏒',
    sport: ['nhl'],
    remaining: '15:45',
  },
  {
    id: 'overtime-nhl',
    name: 'Overtime',
    description: '3-on-3 overtime',
    icon: '⏱️',
    sport: ['nhl'],
    remaining: '3:22',
  },

  // Baseball (MLB)
  {
    id: 'top-1st',
    name: 'Top 1st',
    description: 'First inning top',
    icon: '⚾',
    sport: ['mlb'],
    remaining: '2 outs',
  },
  {
    id: 'bot-1st',
    name: 'Bottom 1st',
    description: 'First inning bottom',
    icon: '⚾',
    sport: ['mlb'],
    remaining: '1 out',
  },
  {
    id: 'mid-game',
    name: 'Mid Game',
    description: 'Innings 4-6',
    icon: '⚾',
    sport: ['mlb'],
    remaining: 'Inn 5',
  },
  {
    id: 'late-innings',
    name: 'Late Innings',
    description: 'Innings 7-9',
    icon: '⚾',
    sport: ['mlb'],
    remaining: 'Inn 8',
  },
  {
    id: 'extra-innings',
    name: 'Extra Innings',
    description: 'Beyond 9th',
    icon: '⚾',
    sport: ['mlb'],
    remaining: 'Inn 10',
  },

  // Soccer
  {
    id: '1st-half-soccer',
    name: '1st Half',
    description: 'First 45 minutes',
    icon: '⚽',
    sport: ['soccer'],
    remaining: '28:12',
  },
  {
    id: '2nd-half-soccer',
    name: '2nd Half',
    description: 'Second 45 minutes',
    icon: '⚽',
    sport: ['soccer'],
    remaining: '67:43',
  },
  {
    id: 'stoppage',
    name: 'Stoppage Time',
    description: 'Added time',
    icon: '⏱️',
    sport: ['soccer'],
    remaining: '+3:22',
  },

  // Tennis
  {
    id: 'set1-tennis',
    name: '1st Set',
    description: 'First set in progress',
    icon: '🎾',
    sport: ['tennis'],
    remaining: '4-3',
  },
  {
    id: 'set2-tennis',
    name: '2nd Set',
    description: 'Second set',
    icon: '🎾',
    sport: ['tennis'],
    remaining: '2-1',
  },
  {
    id: 'set3-tennis',
    name: '3rd Set',
    description: 'Deciding set',
    icon: '🎾',
    sport: ['tennis'],
    remaining: '1-0',
  },

  // Combat Sports
  {
    id: 'round1-mma',
    name: 'Round 1',
    description: 'First round action',
    icon: '🥊',
    sport: ['mma', 'boxing'],
    remaining: '3:45',
  },
  {
    id: 'round2-mma',
    name: 'Round 2',
    description: 'Second round',
    icon: '🥊',
    sport: ['mma', 'boxing'],
    remaining: '2:12',
  },
  {
    id: 'round3-mma',
    name: 'Round 3',
    description: 'Final round',
    icon: '🥊',
    sport: ['mma', 'boxing'],
    remaining: '4:33',
  },

  // Golf (PGA)
  {
    id: 'front-nine',
    name: 'Front Nine',
    description: 'Holes 1-9',
    icon: '⛳',
    sport: ['pga'],
    remaining: 'Hole 6',
  },
  {
    id: 'back-nine',
    name: 'Back Nine',
    description: 'Holes 10-18',
    icon: '⛳',
    sport: ['pga'],
    remaining: 'Hole 14',
  },
  {
    id: 'final-holes',
    name: 'Final Holes',
    description: 'Holes 16-18',
    icon: '⛳',
    sport: ['pga'],
    remaining: 'Hole 17',
  },
];

const InGameTimeFilter: React.FC<InGameTimeFilterProps> = ({
  sport = 'nba',
  onTimeFrameSelect,
  selectedTimeFrame,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter options by sport
  const relevantOptions = IN_GAME_OPTIONS.filter(
    option => option.sport.includes(sport) || option.sport.includes('all')
  );

  const activeOption = relevantOptions.find(option => option.active);
  const selectedOption = relevantOptions.find(option => option.id === selectedTimeFrame);
  const displayOption = selectedOption || activeOption || relevantOptions[0];

  const handleSelect = (optionId: string) => {
    onTimeFrameSelect(optionId);
    setIsExpanded(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Current Time Display */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='flex items-center space-x-3 w-full p-4 quantum-card rounded-xl hover:border-electric-500/40 transition-all'
      >
        <div className='flex items-center space-x-2'>
          <Activity className='w-5 h-5 text-red-400 animate-pulse' />
          <div>
            <div className='text-sm font-bold text-white font-cyber'>IN-GAME BETTING</div>
            <div className='text-xs text-gray-400 font-mono'>Live opportunities</div>
          </div>
        </div>

        {displayOption && (
          <div className='flex-1 flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <span className='text-lg'>{displayOption.icon}</span>
              <div>
                <div className='text-sm font-bold text-electric-400'>{displayOption.name}</div>
                <div className='text-xs text-gray-400'>{displayOption.description}</div>
              </div>
            </div>

            {displayOption.remaining && (
              <div className='text-right'>
                <div className='text-xs text-gray-400'>Time Remaining</div>
                <div className='text-sm font-bold text-yellow-400 font-mono'>
                  {displayOption.remaining}
                </div>
              </div>
            )}
          </div>
        )}

        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expanded Options */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className='absolute top-full left-0 right-0 mt-2 quantum-card rounded-xl border border-white/10 overflow-hidden z-50'
          >
            <div className='p-2 max-h-80 overflow-y-auto custom-scrollbar'>
              <div className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2'>
                Select In-Game Time Frame
              </div>

              <div className='space-y-1'>
                {relevantOptions.map(option => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all text-left ${
                      selectedTimeFrame === option.id
                        ? 'bg-electric-500/20 text-electric-400 border border-electric-500/40'
                        : option.active
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                          : 'hover:bg-white/10 text-gray-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className='flex items-center space-x-3'>
                      <span className='text-lg'>{option.icon}</span>
                      <div>
                        <div className='text-sm font-bold'>{option.name}</div>
                        <div className='text-xs opacity-75'>{option.description}</div>
                      </div>
                    </div>

                    <div className='text-right'>
                      {option.remaining && (
                        <div className='text-xs font-mono'>{option.remaining}</div>
                      )}
                      {option.active && (
                        <div className='flex items-center space-x-1 text-xs text-red-400'>
                          <div className='w-2 h-2 bg-red-400 rounded-full animate-pulse' />
                          <span>LIVE</span>
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {isExpanded && <div className='fixed inset-0 z-40' onClick={() => setIsExpanded(false)} />}
    </div>
  );
};

export default InGameTimeFilter;
