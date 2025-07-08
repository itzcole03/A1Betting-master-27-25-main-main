import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  DollarSign,
  Clock,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  Filter,
  Eye,
  Target,
  Activity,
  BarChart3,
  ExternalLink,
  Copy,
  CheckCircle,
  Timer,
} from 'lucide-react';
import { Layout } from '../../core/Layout';

interface ArbitrageOpportunity {
  id: string;
  sport: string;
  league: string;
  game: string;
  market: string;
  team1: string;
  team2: string;
  gameTime: Date;
  bookmakers: Array<{
    name: string;
    odds: number;
    side: string;
    url?: string;
  }>;
  profit: number;
  profitPercentage: number;
  requiredStake1: number;
  requiredStake2: number;
  totalStake: number;
  guaranteedProfit: number;
  timeRemaining: number;
  confidence: number;
  status: 'active' | 'expired' | 'taken';
  difficulty: 'easy' | 'medium' | 'hard';
}

interface ArbitrageStats {
  totalOpportunities: number;
  activeOpportunities: number;
  avgProfit: number;
  bestProfit: number;
  totalProfit: number;
  successRate: number;
  avgDuration: number;
}

const ArbitrageScanner: React.FC = () => {
  const [opportunities, setOpportunities] = useState<ArbitrageOpportunity[]>([]);
  const [stats, setStats] = useState<ArbitrageStats | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [filters, setFilters] = useState({
    sport: 'all',
    minProfit: 1,
    maxStake: 10000,
    difficulty: 'all',
  });
  const [selectedOpp, setSelectedOpp] = useState<ArbitrageOpportunity | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadArbitrageData();
    const interval = setInterval(loadArbitrageData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [filters]);

  const loadArbitrageData = async () => {
    setIsScanning(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockOpportunities: ArbitrageOpportunity[] = [
        {
          id: 'arb-001',
          sport: 'Basketball',
          league: 'NBA',
          game: 'Lakers vs Warriors',
          market: 'Moneyline',
          team1: 'Lakers',
          team2: 'Warriors',
          gameTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
          bookmakers: [
            { name: 'DraftKings', odds: 2.15, side: 'Lakers', url: 'https://draftkings.com' },
            { name: 'FanDuel', odds: 2.05, side: 'Warriors', url: 'https://fanduel.com' },
          ],
          profit: 127.45,
          profitPercentage: 2.8,
          requiredStake1: 2326,
          requiredStake2: 2174,
          totalStake: 4500,
          guaranteedProfit: 127.45,
          timeRemaining: 240,
          confidence: 94.5,
          status: 'active',
          difficulty: 'easy',
        },
        {
          id: 'arb-002',
          sport: 'Football',
          league: 'NFL',
          game: 'Chiefs vs Bills',
          market: 'Spread',
          team1: 'Chiefs',
          team2: 'Bills',
          gameTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
          bookmakers: [
            { name: 'BetMGM', odds: 1.95, side: 'Chiefs -3.5', url: 'https://betmgm.com' },
            { name: 'Caesars', odds: 1.98, side: 'Bills +3.5', url: 'https://caesars.com' },
          ],
          profit: 89.32,
          profitPercentage: 1.9,
          requiredStake1: 2387,
          requiredStake2: 2113,
          totalStake: 4500,
          guaranteedProfit: 89.32,
          timeRemaining: 360,
          confidence: 87.2,
          status: 'active',
          difficulty: 'medium',
        },
        {
          id: 'arb-003',
          sport: 'Basketball',
          league: 'NBA',
          game: 'Celtics vs Heat',
          market: 'Total Points',
          team1: 'Over 215.5',
          team2: 'Under 215.5',
          gameTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
          bookmakers: [
            { name: 'PointsBet', odds: 1.92, side: 'Over 215.5', url: 'https://pointsbet.com' },
            { name: 'Unibet', odds: 1.95, side: 'Under 215.5', url: 'https://unibet.com' },
          ],
          profit: 156.78,
          profitPercentage: 3.5,
          requiredStake1: 2294,
          requiredStake2: 2206,
          totalStake: 4500,
          guaranteedProfit: 156.78,
          timeRemaining: 180,
          confidence: 91.8,
          status: 'active',
          difficulty: 'easy',
        },
      ];

      const mockStats: ArbitrageStats = {
        totalOpportunities: 47,
        activeOpportunities: mockOpportunities.length,
        avgProfit: 2.4,
        bestProfit: 4.2,
        totalProfit: 8947.23,
        successRate: 89.6,
        avgDuration: 12.5,
      };

      setOpportunities(mockOpportunities);
      setStats(mockStats);
    } catch (error) {
      console.error('Failed to load arbitrage data:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-400 bg-green-500/20';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'hard':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getTimeColor = (minutes: number) => {
    if (minutes < 5) return 'text-red-400';
    if (minutes < 15) return 'text-yellow-400';
    return 'text-green-400';
  };

  const formatTimeRemaining = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <Layout
      title='Arbitrage Scanner'
      subtitle='Real-Time Arbitrage Opportunities • Guaranteed Profit'
      headerActions={
        <div className='flex items-center space-x-3'>
          {stats && (
            <div className='text-right'>
              <div className='text-sm text-gray-400'>Active Opportunities</div>
              <div className='text-lg font-bold text-green-400'>{stats.activeOpportunities}</div>
            </div>
          )}
          <button
            onClick={loadArbitrageData}
            disabled={isScanning}
            className='flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 rounded-lg text-white font-medium transition-all disabled:opacity-50'
          >
            <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning...' : 'Scan Now'}</span>
          </button>
        </div>
      }
    >
      {/* Stats Overview */}
      {stats && (
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8'>
          {[
            {
              label: 'Active Opps',
              value: stats.activeOpportunities.toString(),
              icon: Zap,
              color: 'text-green-400',
            },
            {
              label: 'Avg Profit',
              value: `${stats.avgProfit}%`,
              icon: TrendingUp,
              color: 'text-purple-400',
            },
            {
              label: 'Best Profit',
              value: `${stats.bestProfit}%`,
              icon: Target,
              color: 'text-yellow-400',
            },
            {
              label: 'Total Profit',
              value: `$${stats.totalProfit.toLocaleString()}`,
              icon: DollarSign,
              color: 'text-green-400',
            },
            {
              label: 'Success Rate',
              value: `${stats.successRate}%`,
              icon: CheckCircle,
              color: 'text-cyan-400',
            },
            {
              label: 'Avg Duration',
              value: `${stats.avgDuration}min`,
              icon: Clock,
              color: 'text-blue-400',
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-4'
            >
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-400 text-xs'>{stat.label}</p>
                  <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6 mb-6'
      >
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-bold text-white'>Scanning Filters</h3>
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
              <option value='basketball'>Basketball</option>
              <option value='football'>Football</option>
              <option value='baseball'>Baseball</option>
              <option value='hockey'>Hockey</option>
            </select>
          </div>

          <div>
            <label className='text-sm text-gray-400 mb-1 block'>Min Profit (%)</label>
            <input
              type='range'
              min='0.5'
              max='10'
              step='0.1'
              value={filters.minProfit}
              onChange={e => setFilters({ ...filters, minProfit: parseFloat(e.target.value) })}
              className='w-full'
            />
            <div className='text-xs text-gray-400 text-center'>{filters.minProfit}%</div>
          </div>

          <div>
            <label className='text-sm text-gray-400 mb-1 block'>Max Stake ($)</label>
            <input
              type='range'
              min='1000'
              max='50000'
              step='1000'
              value={filters.maxStake}
              onChange={e => setFilters({ ...filters, maxStake: parseInt(e.target.value) })}
              className='w-full'
            />
            <div className='text-xs text-gray-400 text-center'>
              ${filters.maxStake.toLocaleString()}
            </div>
          </div>

          <div>
            <label className='text-sm text-gray-400 mb-1 block'>Difficulty</label>
            <select
              value={filters.difficulty}
              onChange={e => setFilters({ ...filters, difficulty: e.target.value })}
              className='w-full px-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400'
            >
              <option value='all'>All Levels</option>
              <option value='easy'>Easy Only</option>
              <option value='medium'>Medium & Below</option>
              <option value='hard'>All Difficulties</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Arbitrage Opportunities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6'
      >
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h3 className='text-xl font-bold text-white'>Live Opportunities</h3>
            <p className='text-gray-400 text-sm'>
              Risk-free profit opportunities updated in real-time
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse'></div>
            <span className='text-green-400 text-sm font-medium'>Live Scanning</span>
          </div>
        </div>

        {opportunities.length === 0 ? (
          <div className='text-center py-12'>
            <Zap className='w-16 h-16 text-gray-400 mx-auto mb-4' />
            <h4 className='text-xl font-bold text-gray-400 mb-2'>No Opportunities Found</h4>
            <p className='text-gray-500'>
              Keep scanning - new arbitrage opportunities appear frequently
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            {opportunities.map((opp, index) => (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className='bg-slate-900/50 border border-slate-700/50 rounded-lg p-6 hover:border-green-500/30 transition-all group'
              >
                <div className='flex items-start justify-between mb-4'>
                  <div>
                    <div className='flex items-center space-x-3 mb-2'>
                      <h4 className='font-bold text-white text-lg'>{opp.game}</h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(opp.difficulty)}`}
                      >
                        {opp.difficulty.toUpperCase()}
                      </span>
                    </div>
                    <div className='flex items-center space-x-4 text-sm text-gray-400'>
                      <span>
                        {opp.sport} • {opp.league}
                      </span>
                      <span>Market: {opp.market}</span>
                      <span
                        className={`flex items-center space-x-1 ${getTimeColor(opp.timeRemaining)}`}
                      >
                        <Timer className='w-4 h-4' />
                        <span>{formatTimeRemaining(opp.timeRemaining)} left</span>
                      </span>
                    </div>
                  </div>

                  <div className='text-right'>
                    <div className='text-2xl font-bold text-green-400'>
                      {opp.profitPercentage.toFixed(1)}%
                    </div>
                    <div className='text-sm text-gray-400'>Guaranteed Profit</div>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
                  {opp.bookmakers.map((book, idx) => (
                    <div key={idx} className='bg-slate-800/50 rounded-lg p-4'>
                      <div className='flex items-center justify-between mb-2'>
                        <div className='font-medium text-white'>{book.name}</div>
                        <button
                          onClick={() => book.url && window.open(book.url, '_blank')}
                          className='flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 text-sm'
                        >
                          <ExternalLink className='w-4 h-4' />
                          <span>Open</span>
                        </button>
                      </div>
                      <div className='flex items-center justify-between'>
                        <span className='text-gray-300'>{book.side}</span>
                        <span className='font-bold text-white'>{book.odds.toFixed(2)}</span>
                      </div>
                      <div className='text-sm text-gray-400 mt-1'>
                        Stake: $
                        {idx === 0 ? opp.requiredStake1.toFixed(0) : opp.requiredStake2.toFixed(0)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-green-500/10 rounded-lg border border-green-500/20'>
                  <div>
                    <div className='text-sm text-gray-400'>Total Stake</div>
                    <div className='font-bold text-white'>${opp.totalStake.toFixed(0)}</div>
                  </div>
                  <div>
                    <div className='text-sm text-gray-400'>Guaranteed Profit</div>
                    <div className='font-bold text-green-400'>
                      +${opp.guaranteedProfit.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className='text-sm text-gray-400'>Confidence</div>
                    <div className='font-bold text-cyan-400'>{opp.confidence.toFixed(1)}%</div>
                  </div>
                  <div>
                    <div className='text-sm text-gray-400'>ROI</div>
                    <div className='font-bold text-purple-400'>
                      {opp.profitPercentage.toFixed(2)}%
                    </div>
                  </div>
                </div>

                <div className='flex items-center justify-between pt-4 border-t border-slate-700/50'>
                  <div className='text-sm text-gray-400'>
                    Game starts: {opp.gameTime.toLocaleString()}
                  </div>
                  <div className='flex items-center space-x-2'>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `Arbitrage: ${opp.game} ${opp.market}\nProfit: ${opp.profitPercentage.toFixed(1)}% ($${opp.guaranteedProfit.toFixed(2)})\nStakes: $${opp.requiredStake1.toFixed(0)} @ ${opp.bookmakers[0].name}, $${opp.requiredStake2.toFixed(0)} @ ${opp.bookmakers[1].name}`,
                          opp.id
                        )
                      }
                      className='flex items-center space-x-1 px-3 py-1 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-sm text-gray-300 transition-colors'
                    >
                      {copiedId === opp.id ? (
                        <CheckCircle className='w-4 h-4 text-green-400' />
                      ) : (
                        <Copy className='w-4 h-4' />
                      )}
                      <span>Copy Details</span>
                    </button>
                    <button
                      onClick={() => setSelectedOpp(opp)}
                      className='px-4 py-2 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 rounded-lg text-white font-medium transition-all group-hover:scale-105'
                    >
                      Execute Arbitrage
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Arbitrage Calculator Modal */}
      {selectedOpp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'
          onClick={() => setSelectedOpp(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className='bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-2xl w-full'
            onClick={e => e.stopPropagation()}
          >
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-xl font-bold text-white'>Arbitrage Calculator</h3>
              <button
                onClick={() => setSelectedOpp(null)}
                className='text-gray-400 hover:text-white'
              >
                ×
              </button>
            </div>

            <div className='space-y-4'>
              <div className='text-center p-4 bg-green-500/20 rounded-lg border border-green-500/30'>
                <div className='text-2xl font-bold text-green-400'>
                  {selectedOpp.profitPercentage.toFixed(2)}% Guaranteed Profit
                </div>
                <div className='text-green-300'>
                  +${selectedOpp.guaranteedProfit.toFixed(2)} on $
                  {selectedOpp.totalStake.toFixed(0)} stake
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {selectedOpp.bookmakers.map((book, idx) => (
                  <div key={idx} className='p-4 bg-slate-900/50 rounded-lg'>
                    <h4 className='font-bold text-white mb-2'>{book.name}</h4>
                    <div className='space-y-2 text-sm'>
                      <div className='flex justify-between'>
                        <span className='text-gray-400'>Bet:</span>
                        <span className='text-white'>{book.side}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-400'>Odds:</span>
                        <span className='text-white'>{book.odds.toFixed(2)}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-400'>Stake:</span>
                        <span className='text-white font-bold'>
                          $
                          {idx === 0
                            ? selectedOpp.requiredStake1.toFixed(2)
                            : selectedOpp.requiredStake2.toFixed(2)}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-400'>Payout:</span>
                        <span className='text-green-400'>
                          $
                          {idx === 0
                            ? (selectedOpp.requiredStake1 * book.odds).toFixed(2)
                            : (selectedOpp.requiredStake2 * book.odds).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className='flex space-x-3'>
                <button
                  onClick={() => setSelectedOpp(null)}
                  className='flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors'
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Here you would integrate with betting automation
                    alert('Arbitrage execution would be implemented here');
                    setSelectedOpp(null);
                  }}
                  className='flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 rounded-lg text-white font-medium transition-all'
                >
                  Execute Arbitrage
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </Layout>
  );
};

export default ArbitrageScanner;
