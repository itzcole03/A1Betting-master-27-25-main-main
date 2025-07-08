import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  AlertTriangle,
  Clock,
  TrendingDown,
  Activity,
  RefreshCw,
  Filter,
  Search,
  User,
  Target,
  BarChart3,
  Calendar,
  MapPin,
  Zap,
  Eye,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Layout } from '../../core/Layout';

interface PlayerInjury {
  id: string;
  playerId: string;
  playerName: string;
  team: string;
  position: string;
  sport: string;
  injuryType: string;
  bodyPart: string;
  severity: 'minor' | 'moderate' | 'major' | 'season_ending';
  status: 'questionable' | 'doubtful' | 'out' | 'probable' | 'healthy';
  injuryDate: Date;
  estimatedReturn: Date | null;
  actualReturn: Date | null;
  gamesAffected: number;
  description: string;
  progressNotes: Array<{
    date: Date;
    note: string;
    source: string;
  }>;
  marketImpact: {
    playerProps: number;
    teamPerformance: number;
    spreadMovement: number;
    totalMovement: number;
  };
  replacementPlayer?: {
    name: string;
    projectedPerformance: number;
  };
  upcomingGames: string[];
}

interface InjuryReport {
  id: string;
  team: string;
  gameId: string;
  reportDate: Date;
  injuries: Array<{
    playerId: string;
    playerName: string;
    status: string;
    probability: number;
  }>;
  teamImpact: number;
  reliability: number;
}

interface InjuryTrend {
  bodyPart: string;
  sport: string;
  totalInjuries: number;
  avgRecoveryTime: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  seasonComparison: number;
}

interface HealthAlert {
  id: string;
  type: 'new_injury' | 'status_change' | 'return_update' | 'market_impact';
  playerId: string;
  playerName: string;
  team: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  affectedMarkets: string[];
  dismissed: boolean;
}

const InjuryTracker: React.FC = () => {
  const [injuries, setInjuries] = useState<PlayerInjury[]>([]);
  const [injuryReports, setInjuryReports] = useState<InjuryReport[]>([]);
  const [injuryTrends, setInjuryTrends] = useState<InjuryTrend[]>([]);
  const [healthAlerts, setHealthAlerts] = useState<HealthAlert[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInjury, setSelectedInjury] = useState<string | null>(null);

  useEffect(() => {
    loadInjuryData();
    const interval = setInterval(loadInjuryData, 600000); // Update every 10 minutes
    return () => clearInterval(interval);
  }, [selectedSport, selectedSeverity]);

  const loadInjuryData = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockInjuries: PlayerInjury[] = [
        {
          id: 'injury-001',
          playerId: 'lebron-james',
          playerName: 'LeBron James',
          team: 'Lakers',
          position: 'SF',
          sport: 'NBA',
          injuryType: 'Ankle Sprain',
          bodyPart: 'Left Ankle',
          severity: 'moderate',
          status: 'questionable',
          injuryDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          estimatedReturn: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          actualReturn: null,
          gamesAffected: 2,
          description:
            'Grade 2 ankle sprain sustained during practice. Player is responding well to treatment.',
          progressNotes: [
            {
              date: new Date(Date.now() - 24 * 60 * 60 * 1000),
              note: 'Limited practice participation, increasing mobility',
              source: 'Team Medical Staff',
            },
            {
              date: new Date(Date.now() - 12 * 60 * 60 * 1000),
              note: 'Pain levels decreased significantly, cleared for light shooting',
              source: 'ESPN',
            },
          ],
          marketImpact: {
            playerProps: -25,
            teamPerformance: -8,
            spreadMovement: 2.5,
            totalMovement: -3,
          },
          replacementPlayer: {
            name: 'Austin Reaves',
            projectedPerformance: 65,
          },
          upcomingGames: ['Lakers vs Warriors', 'Lakers vs Clippers'],
        },
        {
          id: 'injury-002',
          playerId: 'patrick-mahomes',
          playerName: 'Patrick Mahomes',
          team: 'Chiefs',
          position: 'QB',
          sport: 'NFL',
          injuryType: 'Shoulder Strain',
          bodyPart: 'Right Shoulder',
          severity: 'minor',
          status: 'probable',
          injuryDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          estimatedReturn: new Date(Date.now() + 24 * 60 * 60 * 1000),
          actualReturn: null,
          gamesAffected: 0,
          description: 'Minor shoulder strain from contact. Expected to play with no limitations.',
          progressNotes: [
            {
              date: new Date(Date.now() - 24 * 60 * 60 * 1000),
              note: 'Full practice participation, throwing with normal velocity',
              source: 'KC Star',
            },
          ],
          marketImpact: {
            playerProps: -5,
            teamPerformance: -2,
            spreadMovement: 0.5,
            totalMovement: 0,
          },
          upcomingGames: ['Chiefs vs Bills'],
        },
        {
          id: 'injury-003',
          playerId: 'jayson-tatum',
          playerName: 'Jayson Tatum',
          team: 'Celtics',
          position: 'SF',
          sport: 'NBA',
          injuryType: 'Back Tightness',
          bodyPart: 'Lower Back',
          severity: 'minor',
          status: 'probable',
          injuryDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
          estimatedReturn: new Date(Date.now() + 12 * 60 * 60 * 1000),
          actualReturn: null,
          gamesAffected: 0,
          description: "Mild lower back tightness. Listed as probable for tonight's game.",
          progressNotes: [
            {
              date: new Date(Date.now() - 6 * 60 * 60 * 1000),
              note: 'Completed full shootaround, feeling much better',
              source: 'Boston Herald',
            },
          ],
          marketImpact: {
            playerProps: -10,
            teamPerformance: -3,
            spreadMovement: 1,
            totalMovement: -1,
          },
          upcomingGames: ['Celtics vs Heat'],
        },
      ];

      const mockReports: InjuryReport[] = [
        {
          id: 'report-001',
          team: 'Lakers',
          gameId: 'Lakers vs Warriors',
          reportDate: new Date(),
          injuries: [
            {
              playerId: 'lebron-james',
              playerName: 'LeBron James',
              status: 'Questionable',
              probability: 0.6,
            },
            {
              playerId: 'anthony-davis',
              playerName: 'Anthony Davis',
              status: 'Probable',
              probability: 0.9,
            },
          ],
          teamImpact: -12,
          reliability: 0.85,
        },
        {
          id: 'report-002',
          team: 'Chiefs',
          gameId: 'Chiefs vs Bills',
          reportDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
          injuries: [
            {
              playerId: 'patrick-mahomes',
              playerName: 'Patrick Mahomes',
              status: 'Probable',
              probability: 0.95,
            },
          ],
          teamImpact: -2,
          reliability: 0.92,
        },
      ];

      const mockTrends: InjuryTrend[] = [
        {
          bodyPart: 'Ankle',
          sport: 'NBA',
          totalInjuries: 47,
          avgRecoveryTime: 12,
          trend: 'increasing',
          seasonComparison: 15,
        },
        {
          bodyPart: 'Shoulder',
          sport: 'NFL',
          totalInjuries: 23,
          avgRecoveryTime: 8,
          trend: 'stable',
          seasonComparison: -2,
        },
        {
          bodyPart: 'Knee',
          sport: 'NBA',
          totalInjuries: 34,
          avgRecoveryTime: 21,
          trend: 'decreasing',
          seasonComparison: -8,
        },
      ];

      const mockAlerts: HealthAlert[] = [
        {
          id: 'alert-001',
          type: 'status_change',
          playerId: 'lebron-james',
          playerName: 'LeBron James',
          team: 'Lakers',
          message: "Status upgraded from Doubtful to Questionable for tonight's game",
          severity: 'high',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          affectedMarkets: ['Player Props', 'Team Spread', 'Game Total'],
          dismissed: false,
        },
        {
          id: 'alert-002',
          type: 'new_injury',
          playerId: 'jayson-tatum',
          playerName: 'Jayson Tatum',
          team: 'Celtics',
          message: 'New injury reported: Lower back tightness',
          severity: 'medium',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          affectedMarkets: ['Player Props'],
          dismissed: false,
        },
      ];

      setInjuries(mockInjuries);
      setInjuryReports(mockReports);
      setInjuryTrends(mockTrends);
      setHealthAlerts(mockAlerts);
    } catch (error) {
      console.error('Failed to load injury data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const dismissAlert = (alertId: string) => {
    setHealthAlerts(alerts =>
      alerts.map(alert => (alert.id === alertId ? { ...alert, dismissed: true } : alert))
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'season_ending':
        return 'text-red-500 bg-red-500/20';
      case 'major':
        return 'text-red-400 bg-red-500/20';
      case 'moderate':
        return 'text-orange-400 bg-orange-500/20';
      case 'minor':
        return 'text-yellow-400 bg-yellow-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'out':
        return 'text-red-400';
      case 'doubtful':
        return 'text-orange-400';
      case 'questionable':
        return 'text-yellow-400';
      case 'probable':
        return 'text-green-400';
      case 'healthy':
        return 'text-green-500';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'out':
        return <XCircle className='w-4 h-4 text-red-400' />;
      case 'doubtful':
        return <AlertTriangle className='w-4 h-4 text-orange-400' />;
      case 'questionable':
        return <Clock className='w-4 h-4 text-yellow-400' />;
      case 'probable':
        return <CheckCircle className='w-4 h-4 text-green-400' />;
      case 'healthy':
        return <CheckCircle className='w-4 h-4 text-green-500' />;
      default:
        return <Clock className='w-4 h-4 text-gray-400' />;
    }
  };

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500/50 bg-red-500/10';
      case 'high':
        return 'border-orange-500/50 bg-orange-500/10';
      case 'medium':
        return 'border-yellow-500/50 bg-yellow-500/10';
      case 'low':
        return 'border-blue-500/50 bg-blue-500/10';
      default:
        return 'border-gray-500/50 bg-gray-500/10';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingDown className='w-4 h-4 text-red-400 rotate-180' />;
      case 'decreasing':
        return <TrendingDown className='w-4 h-4 text-green-400' />;
      case 'stable':
        return <Activity className='w-4 h-4 text-gray-400' />;
      default:
        return <Activity className='w-4 h-4 text-gray-400' />;
    }
  };

  const filteredInjuries = injuries.filter(injury => {
    const matchesSport = selectedSport === 'all' || injury.sport === selectedSport;
    const matchesSeverity = selectedSeverity === 'all' || injury.severity === selectedSeverity;
    const matchesSearch =
      searchQuery === '' ||
      injury.playerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      injury.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
      injury.injuryType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSport && matchesSeverity && matchesSearch;
  });

  const selectedInjuryData = injuries.find(i => i.id === selectedInjury);
  const sports = [...new Set(injuries.map(i => i.sport))];
  const severities = ['minor', 'moderate', 'major', 'season_ending'];

  return (
    <Layout
      title='Injury Tracker'
      subtitle='Player Health Monitoring • Market Impact Analysis'
      headerActions={
        <div className='flex items-center space-x-3'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
            <input
              type='text'
              placeholder='Search players...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className='pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400'
            />
          </div>

          <select
            value={selectedSport}
            onChange={e => setSelectedSport(e.target.value)}
            className='px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400'
          >
            <option value='all'>All Sports</option>
            {sports.map(sport => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>

          <select
            value={selectedSeverity}
            onChange={e => setSelectedSeverity(e.target.value)}
            className='px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400'
          >
            <option value='all'>All Severities</option>
            {severities.map(severity => (
              <option key={severity} value={severity}>
                {severity.charAt(0).toUpperCase() + severity.slice(1).replace('_', ' ')}
              </option>
            ))}
          </select>

          <button
            onClick={loadInjuryData}
            disabled={isLoading}
            className='flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-lg text-white font-medium transition-all disabled:opacity-50'
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Update</span>
          </button>
        </div>
      }
    >
      {/* Health Alerts */}
      {healthAlerts.filter(a => !a.dismissed).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-8'
        >
          <h3 className='text-lg font-bold text-white mb-4 flex items-center space-x-2'>
            <Heart className='w-5 h-5 text-red-400' />
            <span>Health Alerts</span>
          </h3>

          <div className='space-y-3'>
            {healthAlerts
              .filter(a => !a.dismissed)
              .map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border ${getAlertSeverityColor(alert.severity)}`}
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <div className='flex items-center space-x-2 mb-2'>
                        <span className='font-bold text-white'>{alert.playerName}</span>
                        <span className='text-gray-400'>•</span>
                        <span className='text-gray-400'>{alert.team}</span>
                        <span className='text-xs text-gray-400'>
                          {alert.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className='text-gray-300 mb-2'>{alert.message}</p>
                      <div className='flex flex-wrap gap-1'>
                        {alert.affectedMarkets.map((market, idx) => (
                          <span
                            key={idx}
                            className='px-2 py-1 bg-slate-700/50 text-xs text-gray-300 rounded'
                          >
                            {market}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className='text-gray-400 hover:text-white ml-4'
                    >
                      ×
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      )}

      {/* Injury Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6 mb-8'
      >
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h3 className='text-xl font-bold text-white'>Injury Trends</h3>
            <p className='text-gray-400 text-sm'>Season injury patterns and recovery data</p>
          </div>
          <BarChart3 className='w-5 h-5 text-red-400' />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {injuryTrends.map((trend, index) => (
            <motion.div
              key={`${trend.bodyPart}-${trend.sport}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className='p-4 bg-slate-900/50 rounded-lg border border-slate-700/50'
            >
              <div className='flex items-center justify-between mb-3'>
                <h4 className='font-bold text-white'>{trend.bodyPart}</h4>
                <div className='flex items-center space-x-2'>
                  {getTrendIcon(trend.trend)}
                  <span className='text-xs text-gray-400'>{trend.sport}</span>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-3 text-sm'>
                <div>
                  <div className='text-gray-400'>Total Injuries</div>
                  <div className='text-white font-bold'>{trend.totalInjuries}</div>
                </div>
                <div>
                  <div className='text-gray-400'>Avg Recovery</div>
                  <div className='text-white font-bold'>{trend.avgRecoveryTime} days</div>
                </div>
              </div>

              <div className='mt-3 flex justify-between items-center'>
                <span className='text-xs text-gray-400'>vs Last Season</span>
                <span
                  className={`text-sm font-medium ${
                    trend.seasonComparison > 0 ? 'text-red-400' : 'text-green-400'
                  }`}
                >
                  {trend.seasonComparison > 0 ? '+' : ''}
                  {trend.seasonComparison}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Injuries List and Detail */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6'
        >
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h3 className='text-xl font-bold text-white'>Active Injuries</h3>
              <p className='text-gray-400 text-sm'>Current player injury status</p>
            </div>
            <User className='w-5 h-5 text-red-400' />
          </div>

          <div className='space-y-4'>
            {filteredInjuries.map((injury, index) => (
              <motion.div
                key={injury.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedInjury === injury.id
                    ? 'border-red-500/50 bg-red-500/10'
                    : 'border-slate-700/50 bg-slate-900/50 hover:border-slate-600/50'
                }`}
                onClick={() => setSelectedInjury(selectedInjury === injury.id ? null : injury.id)}
              >
                <div className='flex items-start justify-between mb-3'>
                  <div>
                    <h4 className='font-bold text-white'>{injury.playerName}</h4>
                    <div className='flex items-center space-x-2 text-sm text-gray-400'>
                      <span>{injury.team}</span>
                      <span>•</span>
                      <span>{injury.position}</span>
                      <span>•</span>
                      <span>{injury.sport}</span>
                    </div>
                  </div>

                  <div className='flex items-center space-x-2'>
                    {getStatusIcon(injury.status)}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(injury.severity)}`}
                    >
                      {injury.severity.toUpperCase().replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className='mb-3'>
                  <div className='font-medium text-white'>{injury.injuryType}</div>
                  <div className='text-sm text-gray-400'>{injury.bodyPart}</div>
                </div>

                <div className='flex justify-between items-center text-sm'>
                  <span className={`font-medium ${getStatusColor(injury.status)}`}>
                    {injury.status.toUpperCase()}
                  </span>
                  <span className='text-gray-400'>{injury.gamesAffected} games affected</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {selectedInjuryData && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6'
          >
            <div className='flex items-center justify-between mb-6'>
              <div>
                <h3 className='text-xl font-bold text-white'>Injury Details</h3>
                <p className='text-gray-400 text-sm'>{selectedInjuryData.playerName}</p>
              </div>
              <Eye className='w-5 h-5 text-purple-400' />
            </div>

            {/* Injury Overview */}
            <div className='mb-6'>
              <h4 className='font-medium text-white mb-4'>Overview</h4>
              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <span className='text-gray-400'>Injury:</span>
                  <span className='text-white'>{selectedInjuryData.injuryType}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-400'>Body Part:</span>
                  <span className='text-white'>{selectedInjuryData.bodyPart}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-400'>Injury Date:</span>
                  <span className='text-white'>
                    {selectedInjuryData.injuryDate.toLocaleDateString()}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-400'>Est. Return:</span>
                  <span className='text-white'>
                    {selectedInjuryData.estimatedReturn?.toLocaleDateString() || 'TBD'}
                  </span>
                </div>
              </div>

              <div className='mt-4 p-3 bg-slate-900/50 rounded-lg'>
                <p className='text-gray-300 text-sm'>{selectedInjuryData.description}</p>
              </div>
            </div>

            {/* Market Impact */}
            <div className='mb-6'>
              <h4 className='font-medium text-white mb-4'>Market Impact</h4>
              <div className='space-y-3'>
                <div className='flex items-center justify-between p-3 bg-slate-900/50 rounded-lg'>
                  <span className='text-gray-300'>Player Props</span>
                  <span
                    className={`font-bold ${
                      selectedInjuryData.marketImpact.playerProps < 0
                        ? 'text-red-400'
                        : 'text-green-400'
                    }`}
                  >
                    {selectedInjuryData.marketImpact.playerProps}%
                  </span>
                </div>

                <div className='flex items-center justify-between p-3 bg-slate-900/50 rounded-lg'>
                  <span className='text-gray-300'>Team Performance</span>
                  <span
                    className={`font-bold ${
                      selectedInjuryData.marketImpact.teamPerformance < 0
                        ? 'text-red-400'
                        : 'text-green-400'
                    }`}
                  >
                    {selectedInjuryData.marketImpact.teamPerformance}%
                  </span>
                </div>

                <div className='flex items-center justify-between p-3 bg-slate-900/50 rounded-lg'>
                  <span className='text-gray-300'>Spread Movement</span>
                  <span className='text-orange-400 font-bold'>
                    {selectedInjuryData.marketImpact.spreadMovement} pts
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Notes */}
            <div>
              <h4 className='font-medium text-white mb-4'>Recent Updates</h4>
              <div className='space-y-3'>
                {selectedInjuryData.progressNotes.map((note, index) => (
                  <div key={index} className='p-3 bg-slate-900/50 rounded-lg'>
                    <div className='flex justify-between items-start mb-2'>
                      <span className='text-xs text-gray-400'>
                        {note.date.toLocaleDateString()}
                      </span>
                      <span className='text-xs text-gray-500'>{note.source}</span>
                    </div>
                    <p className='text-sm text-gray-300'>{note.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default InjuryTracker;
