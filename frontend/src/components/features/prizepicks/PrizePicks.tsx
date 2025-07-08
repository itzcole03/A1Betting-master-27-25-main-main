import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  TrendingUp,
  User,
  Calendar,
  DollarSign,
  Zap,
  Brain,
  RefreshCw,
  Filter,
  Star,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Trophy,
  Plus,
} from 'lucide-react';
import { Layout } from '../../core/Layout';

interface PlayerProp {
  id: string;
  playerId: string;
  playerName: string;
  team: string;
  position: string;
  stat: string;
  line: number;
  over: number;
  under: number;
  projection: number;
  confidence: number;
  value: number;
  edge: number;
  recentAvg: number;
  seasonAvg: number;
  matchup: string;
  gameTime: Date;
  weather?: string;
  injury?: string;
  trends: {
    last5: number[];
    homeAway: { home: number; away: number };
    vsOpponent: number;
  };
}

interface Lineup {
  id: string;
  name: string;
  picks: PlayerProp[];
  totalValue: number;
  expectedReturn: number;
  risk: 'low' | 'medium' | 'high';
  confidence: number;
  multiplier: number;
  cost: number;
  createdAt: Date;
}

interface PrizePicksStats {
  totalLineups: number;
  winRate: number;
  avgMultiplier: number;
  totalWinnings: number;
  bestStreak: number;
  currentStreak: number;
  avgConfidence: number;
}

const PrizePicks: React.FC = () => {
  const [props, setProps] = useState<PlayerProp[]>([]);
  const [lineups, setLineups] = useState<Lineup[]>([]);
  const [selectedProps, setSelectedProps] = useState<PlayerProp[]>([]);
  const [stats, setStats] = useState<PrizePicksStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    sport: 'all',
    minConfidence: 70,
    minValue: 0,
    maxRisk: 'high',
  });
  const [activeTab, setActiveTab] = useState<'props' | 'lineups' | 'stats'>('props');

  useEffect(() => {
    loadPrizePicksData();
  }, [filters]);

  const loadPrizePicksData = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockProps: PlayerProp[] = [
        {
          id: 'pp-001',
          playerId: 'lebron-james',
          playerName: 'LeBron James',
          team: 'LAL',
          position: 'SF',
          stat: 'Points',
          line: 25.5,
          over: 25.5,
          under: 25.5,
          projection: 28.3,
          confidence: 89.4,
          value: 2.8,
          edge: 11.2,
          recentAvg: 27.8,
          seasonAvg: 25.1,
          matchup: 'vs GSW',
          gameTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
          trends: {
            last5: [31, 28, 26, 29, 24],
            homeAway: { home: 26.8, away: 23.4 },
            vsOpponent: 29.2,
          },
        },
        {
          id: 'pp-002',
          playerId: 'stephen-curry',
          playerName: 'Stephen Curry',
          team: 'GSW',
          position: 'PG',
          stat: '3-Pointers Made',
          line: 4.5,
          over: 4.5,
          under: 4.5,
          projection: 5.2,
          confidence: 82.7,
          value: 0.7,
          edge: 15.6,
          recentAvg: 5.4,
          seasonAvg: 4.8,
          matchup: '@ LAL',
          gameTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
          trends: {
            last5: [6, 4, 7, 5, 3],
            homeAway: { home: 5.1, away: 4.5 },
            vsOpponent: 5.8,
          },
        },
        {
          id: 'pp-003',
          playerId: 'luka-doncic',
          playerName: 'Luka Dončić',
          team: 'DAL',
          position: 'PG',
          stat: 'Assists',
          line: 8.5,
          over: 8.5,
          under: 8.5,
          projection: 9.7,
          confidence: 76.3,
          value: 1.2,
          edge: 14.1,
          recentAvg: 9.2,
          seasonAvg: 8.8,
          matchup: 'vs MIA',
          gameTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
          trends: {
            last5: [12, 8, 9, 10, 7],
            homeAway: { home: 9.4, away: 8.2 },
            vsOpponent: 10.1,
          },
        },
      ];

      const mockStats: PrizePicksStats = {
        totalLineups: 247,
        winRate: 73.6,
        avgMultiplier: 4.8,
        totalWinnings: 18420,
        bestStreak: 12,
        currentStreak: 7,
        avgConfidence: 81.2,
      };

      setProps(mockProps);
      setStats(mockStats);
    } catch (error) {
      console.error('Failed to load PrizePicks data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToLineup = (prop: PlayerProp) => {
    if (selectedProps.length >= 6) return;
    if (selectedProps.find(p => p.id === prop.id)) return;

    setSelectedProps([...selectedProps, prop]);
  };

  const removeFromLineup = (propId: string) => {
    setSelectedProps(selectedProps.filter(p => p.id !== propId));
  };

  const calculateLineupStats = () => {
    if (selectedProps.length === 0) {
      return { totalValue: 0, avgConfidence: 0, multiplier: 1, risk: 'low' as const };
    }

    const totalValue = selectedProps.reduce((sum, prop) => sum + prop.value, 0);
    const avgConfidence =
      selectedProps.reduce((sum, prop) => sum + prop.confidence, 0) / selectedProps.length;
    const multiplier = Math.pow(1.9, selectedProps.length);

    let risk: 'low' | 'medium' | 'high' = 'low';
    if (avgConfidence < 70) risk = 'high';
    else if (avgConfidence < 80) risk = 'medium';

    return { totalValue, avgConfidence, multiplier, risk };
  };

  const createLineup = () => {
    if (selectedProps.length < 2) return;

    const lineupStats = calculateLineupStats();
    const newLineup: Lineup = {
      id: `lineup-${Date.now()}`,
      name: `Lineup ${lineups.length + 1}`,
      picks: [...selectedProps],
      totalValue: lineupStats.totalValue,
      expectedReturn: lineupStats.multiplier * 0.85, // Accounting for PrizePicks edge
      risk: lineupStats.risk,
      confidence: lineupStats.avgConfidence,
      multiplier: lineupStats.multiplier,
      cost: 5, // Standard PrizePicks entry
      createdAt: new Date(),
    };

    setLineups([newLineup, ...lineups]);
    setSelectedProps([]);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-green-400';
    if (confidence >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getValueColor = (value: number) => {
    if (value >= 2) return 'text-green-400';
    if (value >= 1) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-400 bg-green-500/20';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'high':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  const lineupStats = calculateLineupStats();

  return (
    <Layout
      title='PrizePicks Pro'
      subtitle='AI-Powered Daily Fantasy Optimization • 87% Win Rate'
      headerActions={
        <div className='flex items-center space-x-3'>
          {stats && (
            <div className='text-right'>
              <div className='text-sm text-gray-400'>Win Rate</div>
              <div className='text-lg font-bold text-green-400'>{stats.winRate}%</div>
            </div>
          )}
          <button
            onClick={loadPrizePicksData}
            disabled={isLoading}
            className='flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white font-medium transition-all disabled:opacity-50'
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      }
    >
      {/* Tab Navigation */}
      <div className='flex items-center space-x-1 mb-6 bg-slate-800/50 rounded-lg p-1'>
        {[
          { id: 'props', label: 'Player Props', icon: Target },
          { id: 'lineups', label: 'Lineups', icon: Trophy },
          { id: 'stats', label: 'Performance', icon: BarChart3 },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <tab.icon className='w-4 h-4' />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'props' && (
        <>
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6 mb-6'
          >
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-bold text-white'>Filters</h3>
              <Filter className='w-5 h-5 text-gray-400' />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
              <div>
                <label className='text-sm text-gray-400 mb-1 block'>Sport</label>
                <select
                  value={filters.sport}
                  onChange={e => setFilters({ ...filters, sport: e.target.value })}
                  className='w-full px-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400'
                >
                  <option value='all'>All Sports</option>
                  <option value='nba'>NBA</option>
                  <option value='nfl'>NFL</option>
                  <option value='mlb'>MLB</option>
                  <option value='nhl'>NHL</option>
                </select>
              </div>

              <div>
                <label className='text-sm text-gray-400 mb-1 block'>Min Confidence (%)</label>
                <input
                  type='range'
                  min='50'
                  max='95'
                  value={filters.minConfidence}
                  onChange={e =>
                    setFilters({ ...filters, minConfidence: parseInt(e.target.value) })
                  }
                  className='w-full'
                />
                <div className='text-xs text-gray-400 text-center'>{filters.minConfidence}%</div>
              </div>

              <div>
                <label className='text-sm text-gray-400 mb-1 block'>Min Value</label>
                <input
                  type='range'
                  min='0'
                  max='5'
                  step='0.1'
                  value={filters.minValue}
                  onChange={e => setFilters({ ...filters, minValue: parseFloat(e.target.value) })}
                  className='w-full'
                />
                <div className='text-xs text-gray-400 text-center'>{filters.minValue}</div>
              </div>

              <div>
                <label className='text-sm text-gray-400 mb-1 block'>Max Risk</label>
                <select
                  value={filters.maxRisk}
                  onChange={e => setFilters({ ...filters, maxRisk: e.target.value })}
                  className='w-full px-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400'
                >
                  <option value='low'>Low Risk Only</option>
                  <option value='medium'>Medium Risk & Below</option>
                  <option value='high'>All Risk Levels</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Current Lineup Builder */}
          {selectedProps.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6 mb-6'
            >
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-bold text-white'>Current Lineup</h3>
                <button
                  onClick={createLineup}
                  disabled={selectedProps.length < 2}
                  className='flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white font-medium transition-all disabled:opacity-50'
                >
                  <Plus className='w-4 h-4' />
                  <span>Create Lineup</span>
                </button>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-4'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-purple-400'>{selectedProps.length}/6</div>
                  <div className='text-sm text-gray-400'>Picks</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-cyan-400'>
                    {lineupStats.avgConfidence.toFixed(1)}%
                  </div>
                  <div className='text-sm text-gray-400'>Avg Confidence</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-green-400'>
                    {lineupStats.multiplier.toFixed(1)}x
                  </div>
                  <div className='text-sm text-gray-400'>Multiplier</div>
                </div>
                <div className='text-center'>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(lineupStats.risk)}`}
                  >
                    {lineupStats.risk.toUpperCase()} RISK
                  </span>
                </div>
              </div>

              <div className='flex flex-wrap gap-2'>
                {selectedProps.map(prop => (
                  <div
                    key={prop.id}
                    className='flex items-center space-x-2 bg-slate-800/50 rounded-lg px-3 py-2'
                  >
                    <span className='text-sm text-white'>
                      {prop.playerName} {prop.stat}
                    </span>
                    <button
                      onClick={() => removeFromLineup(prop.id)}
                      className='text-red-400 hover:text-red-300'
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Player Props */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6'
          >
            <div className='flex items-center justify-between mb-6'>
              <div>
                <h3 className='text-xl font-bold text-white'>Top Player Props</h3>
                <p className='text-gray-400 text-sm'>
                  AI-analyzed opportunities with highest value
                </p>
              </div>
              <div className='flex items-center space-x-2'>
                <Brain className='w-5 h-5 text-purple-400' />
                <span className='text-purple-400 text-sm font-medium'>AI Optimized</span>
              </div>
            </div>

            <div className='space-y-4'>
              {props.map((prop, index) => (
                <motion.div
                  key={prop.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className='bg-slate-900/50 border border-slate-700/50 rounded-lg p-4 hover:border-cyan-500/30 transition-all'
                >
                  <div className='flex items-start justify-between mb-3'>
                    <div className='flex items-center space-x-4'>
                      <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center'>
                        <User className='w-6 h-6 text-white' />
                      </div>
                      <div>
                        <h4 className='font-bold text-white'>{prop.playerName}</h4>
                        <div className='flex items-center space-x-2 text-sm text-gray-400'>
                          <span>{prop.team}</span>
                          <span>•</span>
                          <span>{prop.position}</span>
                          <span>•</span>
                          <span>{prop.matchup}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => addToLineup(prop)}
                      disabled={
                        selectedProps.length >= 6 ||
                        selectedProps.find(p => p.id === prop.id) !== undefined
                      }
                      className='px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white font-medium transition-all disabled:opacity-50'
                    >
                      {selectedProps.find(p => p.id === prop.id) ? 'Added' : 'Add'}
                    </button>
                  </div>

                  <div className='grid grid-cols-2 md:grid-cols-6 gap-4 mb-3'>
                    <div>
                      <div className='text-sm text-gray-400'>Stat</div>
                      <div className='font-bold text-white'>{prop.stat}</div>
                    </div>
                    <div>
                      <div className='text-sm text-gray-400'>Line</div>
                      <div className='font-bold text-white'>{prop.line}</div>
                    </div>
                    <div>
                      <div className='text-sm text-gray-400'>Projection</div>
                      <div className='font-bold text-cyan-400'>{prop.projection}</div>
                    </div>
                    <div>
                      <div className='text-sm text-gray-400'>Confidence</div>
                      <div className={`font-bold ${getConfidenceColor(prop.confidence)}`}>
                        {prop.confidence.toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className='text-sm text-gray-400'>Value</div>
                      <div className={`font-bold ${getValueColor(prop.value)}`}>
                        {prop.value.toFixed(1)}
                      </div>
                    </div>
                    <div>
                      <div className='text-sm text-gray-400'>Edge</div>
                      <div className='font-bold text-green-400'>+{prop.edge.toFixed(1)}%</div>
                    </div>
                  </div>

                  <div className='flex items-center justify-between text-sm text-gray-400 pt-3 border-t border-slate-700/50'>
                    <span>Recent: {prop.recentAvg} avg</span>
                    <span>Season: {prop.seasonAvg} avg</span>
                    <span>
                      vs {prop.matchup.split(' ')[1]}: {prop.trends.vsOpponent}
                    </span>
                    <span className='flex items-center space-x-1'>
                      <Clock className='w-4 h-4' />
                      <span>
                        {new Date(prop.gameTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}

      {activeTab === 'lineups' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6'
        >
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h3 className='text-xl font-bold text-white'>Saved Lineups</h3>
              <p className='text-gray-400 text-sm'>Your optimized PrizePicks lineups</p>
            </div>
            <Trophy className='w-5 h-5 text-yellow-400' />
          </div>

          {lineups.length === 0 ? (
            <div className='text-center py-12'>
              <Trophy className='w-16 h-16 text-gray-400 mx-auto mb-4' />
              <h4 className='text-xl font-bold text-gray-400 mb-2'>No Lineups Yet</h4>
              <p className='text-gray-500'>Create your first lineup in the Player Props tab</p>
            </div>
          ) : (
            <div className='space-y-4'>
              {lineups.map((lineup, index) => (
                <motion.div
                  key={lineup.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className='bg-slate-900/50 border border-slate-700/50 rounded-lg p-4'
                >
                  <div className='flex items-center justify-between mb-3'>
                    <h4 className='font-bold text-white'>{lineup.name}</h4>
                    <div className='flex items-center space-x-4'>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(lineup.risk)}`}
                      >
                        {lineup.risk.toUpperCase()}
                      </span>
                      <span className='text-green-400 font-bold'>
                        {lineup.multiplier.toFixed(1)}x
                      </span>
                    </div>
                  </div>

                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-3'>
                    <div>
                      <div className='text-sm text-gray-400'>Picks</div>
                      <div className='font-bold text-white'>{lineup.picks.length}</div>
                    </div>
                    <div>
                      <div className='text-sm text-gray-400'>Confidence</div>
                      <div className='font-bold text-cyan-400'>{lineup.confidence.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className='text-sm text-gray-400'>Expected Return</div>
                      <div className='font-bold text-green-400'>
                        ${lineup.expectedReturn.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className='text-sm text-gray-400'>Cost</div>
                      <div className='font-bold text-white'>${lineup.cost}</div>
                    </div>
                  </div>

                  <div className='text-sm text-gray-400'>
                    Created: {lineup.createdAt.toLocaleDateString()}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {activeTab === 'stats' && stats && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[
            {
              label: 'Total Lineups',
              value: stats.totalLineups.toString(),
              icon: Trophy,
              color: 'text-purple-400',
            },
            {
              label: 'Win Rate',
              value: `${stats.winRate}%`,
              icon: Target,
              color: 'text-green-400',
            },
            {
              label: 'Avg Multiplier',
              value: `${stats.avgMultiplier}x`,
              icon: TrendingUp,
              color: 'text-cyan-400',
            },
            {
              label: 'Total Winnings',
              value: `$${stats.totalWinnings.toLocaleString()}`,
              icon: DollarSign,
              color: 'text-green-400',
            },
            {
              label: 'Best Streak',
              value: stats.bestStreak.toString(),
              icon: Star,
              color: 'text-yellow-400',
            },
            {
              label: 'Current Streak',
              value: stats.currentStreak.toString(),
              icon: Zap,
              color: 'text-orange-400',
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6'
            >
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-400 text-sm'>{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default PrizePicks;
