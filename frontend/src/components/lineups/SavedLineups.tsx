import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Target,
  TrendingUp,
  Brain,
  Eye,
  Download,
  Trash2,
  Play,
  Calendar,
  DollarSign,
  BarChart3,
  Zap,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Search,
  Settings,
  RefreshCw,
  TrendingDown,
  Activity,
} from 'lucide-react';
import { lineupTracker, SavedLineup, LineupStats } from '../../services/lineupTrackingService';

const SavedLineups: React.FC = () => {
  const [savedLineups, setSavedLineups] = useState<SavedLineup[]>([]);
  const [stats, setStats] = useState<LineupStats | null>(null);
  const [selectedType, setSelectedType] = useState<
    'all' | 'money-maker' | 'prizepicks' | 'propollama'
  >('all');
  const [selectedStatus, setSelectedStatus] = useState<
    'all' | 'active' | 'completed' | 'pending' | 'cancelled'
  >('all');
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'confidence' | 'payout'>('newest');

  useEffect(() => {
    loadLineups();

    // Listen for lineup updates
    const handleLineupUpdate = () => loadLineups();
    lineupTracker.on('lineupSaved', handleLineupUpdate);
    lineupTracker.on('lineupUpdated', handleLineupUpdate);
    lineupTracker.on('lineupDeleted', handleLineupUpdate);

    return () => {
      lineupTracker.off('lineupSaved', handleLineupUpdate);
      lineupTracker.off('lineupUpdated', handleLineupUpdate);
      lineupTracker.off('lineupDeleted', handleLineupUpdate);
    };
  }, []);

  const loadLineups = () => {
    const lineups = lineupTracker.getAllLineups();
    const statsData = lineupTracker.getStats();
    setSavedLineups(lineups);
    setStats(statsData);
  };

  const filteredAndSortedLineups = useMemo(() => {
    let filtered = savedLineups.filter(lineup => {
      const typeMatch = selectedType === 'all' || lineup.type === selectedType;
      const statusMatch = selectedStatus === 'all' || lineup.status === selectedStatus;
      const searchMatch =
        searchTerm === '' ||
        lineup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lineup.picks.some(
          pick =>
            pick.player?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pick.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return typeMatch && statusMatch && searchMatch;
    });

    // Sort lineups
    switch (sortBy) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.savedAt).getTime() - new Date(b.savedAt).getTime());
        break;
      case 'confidence':
        filtered.sort((a, b) => (b.metadata?.confidence || 0) - (a.metadata?.confidence || 0));
        break;
      case 'payout':
        filtered.sort((a, b) => b.projectedPayout - a.projectedPayout);
        break;
      default: // newest
        filtered.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());
    }

    return filtered;
  }, [savedLineups, selectedType, selectedStatus, searchTerm, sortBy]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'money-maker':
        return 'text-green-400';
      case 'prizepicks':
        return 'text-yellow-400';
      case 'propollama':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'money-maker':
        return DollarSign;
      case 'prizepicks':
        return Trophy;
      case 'propollama':
        return Brain;
      default:
        return Target;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-electric-400 bg-electric-400/20';
      case 'completed':
        return 'text-green-400 bg-green-400/20';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'cancelled':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getProgressPercentage = (lineup: SavedLineup): number => {
    if (!lineup.progress) return 0;
    return lineup.progress.totalPicks > 0
      ? (lineup.progress.settledPicks / lineup.progress.totalPicks) * 100
      : 0;
  };

  const deleteLineup = (id: string) => {
    lineupTracker.deleteLineup(id);
  };

  const duplicateLineup = (lineup: SavedLineup) => {
    lineupTracker.saveLineup({
      name: `${lineup.name} (Copy)`,
      type: lineup.type,
      picks: lineup.picks,
      entryAmount: lineup.entryAmount,
      projectedPayout: lineup.projectedPayout,
      status: 'pending',
      metadata: lineup.metadata,
    });
  };

  const exportLineups = () => {
    const data = lineupTracker.exportLineups({
      type: selectedType !== 'all' ? selectedType : undefined,
      status: selectedStatus !== 'all' ? selectedStatus : undefined,
    });

    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `saved-lineups-${selectedType}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const renderProgressBar = (lineup: SavedLineup) => {
    if (!lineup.progress) return null;

    const percentage = getProgressPercentage(lineup);
    const { wonPicks, lostPicks, pushPicks, totalPicks } = lineup.progress;

    return (
      <div className='space-y-2'>
        <div className='flex justify-between text-xs text-gray-400'>
          <span>
            Progress: {lineup.progress.settledPicks}/{totalPicks}
          </span>
          <span>{percentage.toFixed(0)}%</span>
        </div>
        <div className='w-full bg-gray-700 rounded-full h-2'>
          <div
            className='bg-gradient-to-r from-green-400 to-electric-400 h-2 rounded-full transition-all duration-300'
            style={{ width: `${percentage}%` }}
          />
        </div>
        {lineup.progress.settledPicks > 0 && (
          <div className='flex justify-between text-xs'>
            <span className='text-green-400'>Won: {wonPicks}</span>
            <span className='text-red-400'>Lost: {lostPicks}</span>
            {pushPicks > 0 && <span className='text-yellow-400'>Push: {pushPicks}</span>}
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.div
      className='space-y-10 animate-slide-in-up'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className='text-center'>
        <div className='relative mb-10'>
          <div className='absolute inset-0 bg-indigo-400/20 blur-3xl rounded-full' />
          <div className='relative text-8xl text-indigo-400 float-element'>📋</div>
        </div>
        <h1 className='holographic text-6xl font-black mb-6 font-cyber'>LINEUP COMMAND CENTER</h1>
        <p className='text-2xl text-gray-400 max-w-4xl mx-auto font-mono'>
          Intelligent tracking and analysis of your quantum-powered betting strategies
        </p>
      </div>

      {/* Stats Dashboard */}
      {stats && (
        <motion.div
          className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className='quantum-card p-4 rounded-xl text-center'>
            <div className='text-2xl font-bold text-electric-400 font-cyber'>
              {stats.totalLineups}
            </div>
            <div className='text-xs text-gray-400 font-mono'>Total</div>
          </div>
          <div className='quantum-card p-4 rounded-xl text-center'>
            <div className='text-2xl font-bold text-yellow-400 font-cyber'>
              {stats.activeLineups}
            </div>
            <div className='text-xs text-gray-400 font-mono'>Active</div>
          </div>
          <div className='quantum-card p-4 rounded-xl text-center'>
            <div className='text-2xl font-bold text-green-400 font-cyber'>
              ${stats.totalWinnings.toLocaleString()}
            </div>
            <div className='text-xs text-gray-400 font-mono'>Winnings</div>
          </div>
          <div className='quantum-card p-4 rounded-xl text-center'>
            <div
              className={`text-2xl font-bold font-cyber ${stats.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}
            >
              {stats.roi.toFixed(1)}%
            </div>
            <div className='text-xs text-gray-400 font-mono'>ROI</div>
          </div>
          <div className='quantum-card p-4 rounded-xl text-center'>
            <div className='text-2xl font-bold text-purple-400 font-cyber'>
              {stats.winRate.toFixed(1)}%
            </div>
            <div className='text-xs text-gray-400 font-mono'>Win Rate</div>
          </div>
          <div className='quantum-card p-4 rounded-xl text-center'>
            <div className='text-2xl font-bold text-blue-400 font-cyber'>
              {stats.averageConfidence.toFixed(1)}%
            </div>
            <div className='text-xs text-gray-400 font-mono'>Avg Conf.</div>
          </div>
          <div className='quantum-card p-4 rounded-xl text-center'>
            <div className='text-2xl font-bold text-cyan-400 font-cyber'>
              {stats.completedLineups}
            </div>
            <div className='text-xs text-gray-400 font-mono'>Completed</div>
          </div>
          <div className='quantum-card p-4 rounded-xl text-center'>
            <div className='text-sm font-bold text-electric-400 font-cyber'>
              {stats.bestPerformingType.replace('-', ' ').toUpperCase()}
            </div>
            <div className='text-xs text-gray-400 font-mono'>Best Type</div>
          </div>
        </motion.div>
      )}

      {/* Filters and Controls */}
      <div className='quantum-card rounded-2xl p-6 space-y-6'>
        <div className='flex flex-wrap gap-4 items-center justify-between'>
          {/* Search */}
          <div className='relative flex-1 min-w-64'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
            <input
              type='text'
              placeholder='Search lineups...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-electric-400 focus:outline-none'
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className='px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-electric-400 focus:outline-none'
          >
            <option value='newest'>Newest First</option>
            <option value='oldest'>Oldest First</option>
            <option value='confidence'>Highest Confidence</option>
            <option value='payout'>Highest Payout</option>
          </select>

          {/* Export */}
          <button
            onClick={exportLineups}
            className='flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-all'
          >
            <Download className='w-4 h-4' />
            <span>Export</span>
          </button>
        </div>

        <div className='flex flex-wrap gap-4'>
          {/* Type Filter */}
          <div className='space-y-2'>
            <label className='text-sm text-gray-400 font-mono'>TYPE</label>
            <div className='flex gap-2'>
              {(['all', 'money-maker', 'prizepicks', 'propollama'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg font-bold transition-all text-sm ${
                    selectedType === type
                      ? 'bg-electric-500/20 text-electric-400 border border-electric-500/40'
                      : 'bg-gray-800/50 text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {type === 'all' ? 'ALL' : type.toUpperCase().replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className='space-y-2'>
            <label className='text-sm text-gray-400 font-mono'>STATUS</label>
            <div className='flex gap-2'>
              {(['all', 'active', 'completed', 'pending', 'cancelled'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-lg font-bold transition-all text-sm ${
                    selectedStatus === status
                      ? 'bg-electric-500/20 text-electric-400 border border-electric-500/40'
                      : 'bg-gray-800/50 text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {status.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lineups Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <AnimatePresence>
          {filteredAndSortedLineups.map(lineup => {
            const TypeIcon = getTypeIcon(lineup.type);
            const progressPercentage = getProgressPercentage(lineup);

            return (
              <motion.div
                key={lineup.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className='quantum-card rounded-2xl p-6 hover:border-electric-500/30 transition-all cursor-pointer'
                onClick={() => setShowDetails(showDetails === lineup.id ? null : lineup.id)}
                whileHover={{ scale: 1.02 }}
              >
                <div className='flex justify-between items-start mb-4'>
                  <div className='flex items-center space-x-3'>
                    <TypeIcon className={`w-6 h-6 ${getTypeColor(lineup.type)}`} />
                    <div>
                      <h3 className='font-bold text-white text-lg truncate'>{lineup.name}</h3>
                      <div className='text-sm text-gray-400 font-mono'>
                        {lineup.type.replace('-', ' ')}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(lineup.status)}`}
                  >
                    {lineup.status.toUpperCase()}
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4 mb-4'>
                  <div>
                    <div className='text-sm text-gray-400'>Entry</div>
                    <div className='text-lg font-bold text-white'>${lineup.entryAmount}</div>
                  </div>
                  <div>
                    <div className='text-sm text-gray-400'>Payout</div>
                    <div className='text-lg font-bold text-green-400'>
                      ${lineup.projectedPayout}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                {lineup.progress && <div className='mb-4'>{renderProgressBar(lineup)}</div>}

                <div className='flex justify-between items-center text-sm mb-4'>
                  <div className='flex items-center space-x-2'>
                    <Calendar className='w-4 h-4 text-gray-400' />
                    <span className='text-gray-400'>{formatTimeAgo(lineup.savedAt)}</span>
                  </div>
                  <div className='text-electric-400 font-mono'>{lineup.picks.length} picks</div>
                </div>

                {lineup.metadata?.confidence && (
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-400'>Confidence:</span>
                    <span className='text-electric-400 font-bold'>
                      {lineup.metadata.confidence.toFixed(1)}%
                    </span>
                  </div>
                )}

                {/* Expanded Details */}
                <AnimatePresence>
                  {showDetails === lineup.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className='mt-6 pt-4 border-t border-white/10'
                    >
                      <div className='space-y-2 mb-4'>
                        {lineup.picks.map((pick, index) => (
                          <div key={index} className='bg-gray-800/30 rounded-lg p-3'>
                            {pick.player ? (
                              <div>
                                <div className='font-bold text-white'>{pick.player}</div>
                                <div className='text-sm text-gray-400'>
                                  {pick.stat} {pick.choice?.toUpperCase()} {pick.line}
                                </div>
                                {pick.confidence && (
                                  <div className='text-xs text-electric-400'>
                                    {pick.confidence.toFixed(1)}% confidence
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div>
                                <div className='text-white'>{pick.description}</div>
                                {pick.confidence && (
                                  <div className='text-xs text-electric-400'>
                                    {pick.confidence.toFixed(1)}% confidence
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className='flex space-x-2'>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            duplicateLineup(lineup);
                          }}
                          className='flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-electric-500/20 text-electric-400 rounded-lg hover:bg-electric-500/30 transition-all'
                        >
                          <Play className='w-4 h-4' />
                          <span>Duplicate</span>
                        </button>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            deleteLineup(lineup.id);
                          }}
                          className='flex items-center justify-center px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all'
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredAndSortedLineups.length === 0 && (
        <motion.div
          className='quantum-card rounded-3xl p-12 text-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className='text-6xl mb-4'>🔍</div>
          <h3 className='text-2xl font-bold text-white font-cyber mb-4'>NO LINEUPS FOUND</h3>
          <p className='text-gray-400 mb-6'>
            No lineups match your current filters. Try adjusting your search criteria.
          </p>
          <button
            onClick={() => {
              setSelectedType('all');
              setSelectedStatus('all');
              setSearchTerm('');
            }}
            className='px-6 py-3 bg-electric-500/20 text-electric-400 rounded-lg hover:bg-electric-500/30 transition-all'
          >
            Clear Filters
          </button>
        </motion.div>
      )}

      {/* Action Panel */}
      <div className='quantum-card rounded-3xl p-8 text-center'>
        <h3 className='text-2xl font-bold text-white font-cyber mb-4'>
          LINEUP INTELLIGENCE CENTER
        </h3>
        <p className='text-gray-400 mb-6'>
          Advanced analytics and management for your quantum-powered betting strategies
        </p>
        <div className='flex justify-center space-x-4'>
          <button
            onClick={exportLineups}
            className='flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-400 hover:to-purple-400 transition-all duration-300 font-cyber'
          >
            <BarChart3 className='w-5 h-5' />
            <span>EXPORT ANALYTICS</span>
          </button>
          <button
            onClick={loadLineups}
            className='flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-500 to-electric-500 text-black font-bold rounded-xl hover:from-green-400 hover:to-electric-400 transition-all duration-300 font-cyber'
          >
            <RefreshCw className='w-5 h-5' />
            <span>REFRESH DATA</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SavedLineups;
