import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  DollarSign,
  Brain,
  Zap,
  Trophy,
  Target,
  Activity,
  BarChart3,
  Clock,
  AlertTriangle,
  Cpu,
  RefreshCw,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { Layout } from '../../core/Layout';

interface MetricCard {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  description: string;
  gradient: string;
}

interface LiveOpportunity {
  id: string;
  game: string;
  type: string;
  confidence: number;
  roi: number;
  stake: number;
  expectedProfit: number;
}

const Dashboard: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [liveOpportunities, setLiveOpportunities] = useState<LiveOpportunity[]>([]);

  // Mock data - replace with real API calls
  const keyMetrics: MetricCard[] = [
    {
      id: 'win-rate',
      title: 'Win Rate',
      value: '73.8%',
      change: '+2.3%',
      changeType: 'positive',
      icon: <Trophy className='w-6 h-6' />,
      description: 'Current prediction accuracy',
      gradient: 'from-green-400 to-green-600',
    },
    {
      id: 'total-profit',
      title: 'Total Profit',
      value: '$18,420',
      change: '+$1,240',
      changeType: 'positive',
      icon: <DollarSign className='w-6 h-6' />,
      description: 'Total realized profits',
      gradient: 'from-purple-400 to-purple-600',
    },
    {
      id: 'ai-accuracy',
      title: 'AI Accuracy',
      value: '96.4%',
      change: '+0.8%',
      changeType: 'positive',
      icon: <Brain className='w-6 h-6' />,
      description: 'ML model performance',
      gradient: 'from-cyan-400 to-cyan-600',
    },
    {
      id: 'live-opportunities',
      title: 'Live Opportunities',
      value: '23',
      change: '+7',
      changeType: 'positive',
      icon: <Zap className='w-6 h-6' />,
      description: 'Active betting opportunities',
      gradient: 'from-yellow-400 to-yellow-600',
    },
    {
      id: 'roi',
      title: 'ROI',
      value: '847%',
      change: '+12%',
      changeType: 'positive',
      icon: <TrendingUp className='w-6 h-6' />,
      description: 'Return on investment',
      gradient: 'from-pink-400 to-pink-600',
    },
    {
      id: 'sharpe-ratio',
      title: 'Sharpe Ratio',
      value: '1.42',
      change: '+0.08',
      changeType: 'positive',
      icon: <BarChart3 className='w-6 h-6' />,
      description: 'Risk-adjusted return',
      gradient: 'from-indigo-400 to-indigo-600',
    },
  ];

  const mlModelStats = [
    { name: 'XGBoost Ensemble', accuracy: '97.2%', status: 'active', weight: '35%' },
    { name: 'Neural Network', accuracy: '96.8%', status: 'active', weight: '30%' },
    { name: 'LSTM Predictor', accuracy: '95.1%', status: 'active', weight: '20%' },
    { name: 'Random Forest', accuracy: '94.6%', status: 'active', weight: '15%' },
  ];

  useEffect(() => {
    // Simulate live opportunities
    const mockOpportunities: LiveOpportunity[] = [
      {
        id: '1',
        game: 'Lakers vs Warriors',
        type: 'Over 225.5 Points',
        confidence: 94.2,
        roi: 23.4,
        stake: 2500,
        expectedProfit: 585,
      },
      {
        id: '2',
        game: 'Chiefs vs Bills',
        type: 'Mahomes 300+ Yards',
        confidence: 89.7,
        roi: 18.2,
        stake: 1800,
        expectedProfit: 327,
      },
      {
        id: '3',
        game: 'Celtics vs Heat',
        type: 'Tatum Over 28.5 Pts',
        confidence: 92.1,
        roi: 15.8,
        stake: 2200,
        expectedProfit: 347,
      },
    ];
    setLiveOpportunities(mockOpportunities);

    // Run functionality test in development
    if (process.env.NODE_ENV === 'development') {
      import('../../../utils/testFunctionality').then(({ logFunctionalityTest }) => {
        logFunctionalityTest();
      });
    }
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    console.log('✅ Refresh button clicked - functionality working!');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);

    console.log('✅ Refresh completed - async functionality working!');
  };

  const getChangeIcon = (changeType: string) => {
    if (changeType === 'positive') return <ChevronUp className='w-4 h-4 text-green-400' />;
    if (changeType === 'negative') return <ChevronDown className='w-4 h-4 text-red-400' />;
    return null;
  };

  return (
    <Layout
      title='Command Center'
      subtitle='Platform Overview & Performance Metrics'
      headerActions={
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className='flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-lg text-white font-medium transition-all disabled:opacity-50'
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      }
    >
      {/* Key Metrics Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {keyMetrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className='group relative overflow-hidden'
          >
            <div className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-all'>
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}
              />

              <div className='relative flex items-start justify-between'>
                <div className='flex-1'>
                  <p className='text-gray-400 text-sm font-medium'>{metric.title}</p>
                  <p className='text-2xl font-bold text-white mt-1'>{metric.value}</p>
                  <div className='flex items-center space-x-1 mt-2'>
                    {getChangeIcon(metric.changeType)}
                    <span
                      className={`text-sm font-medium ${
                        metric.changeType === 'positive'
                          ? 'text-green-400'
                          : metric.changeType === 'negative'
                            ? 'text-red-400'
                            : 'text-gray-400'
                      }`}
                    >
                      {metric.change}
                    </span>
                    <span className='text-xs text-gray-500'>this week</span>
                  </div>
                  <p className='text-xs text-gray-500 mt-1'>{metric.description}</p>
                </div>
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${metric.gradient} bg-opacity-20`}
                >
                  {metric.icon}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Live Opportunities & ML Models */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Live Opportunities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6'
        >
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h3 className='text-xl font-bold text-white'>Live Opportunities</h3>
              <p className='text-gray-400 text-sm'>Real-time betting recommendations</p>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse'></div>
              <span className='text-green-400 text-sm font-medium'>Live</span>
            </div>
          </div>

          <div className='space-y-4'>
            {liveOpportunities.map(opportunity => (
              <div
                key={opportunity.id}
                className='bg-slate-900/30 border border-slate-700/30 rounded-lg p-4 hover:border-cyan-500/30 transition-all'
              >
                <div className='flex items-center justify-between mb-2'>
                  <div className='font-medium text-white'>{opportunity.game}</div>
                  <div className='text-cyan-400 font-bold'>+{opportunity.roi}% ROI</div>
                </div>
                <div className='text-sm text-gray-300 mb-2'>{opportunity.type}</div>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-gray-400'>
                    Stake: ${opportunity.stake.toLocaleString()} • Profit: +$
                    {opportunity.expectedProfit}
                  </span>
                  <span className='text-green-400 font-medium'>
                    {opportunity.confidence}% confidence
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ML Model Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6'
        >
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h3 className='text-xl font-bold text-white'>ML Model Performance</h3>
              <p className='text-gray-400 text-sm'>47+ active machine learning models</p>
            </div>
            <div className='flex items-center space-x-2'>
              <Cpu className='w-5 h-5 text-purple-400' />
              <span className='text-purple-400 text-sm font-medium'>Ensemble</span>
            </div>
          </div>

          <div className='space-y-4'>
            {mlModelStats.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className='bg-slate-900/30 border border-slate-700/30 rounded-lg p-4'
              >
                <div className='flex items-center justify-between mb-2'>
                  <div className='font-medium text-white'>{model.name}</div>
                  <div className='flex items-center space-x-2'>
                    <span className='text-green-400 text-sm font-medium'>{model.accuracy}</span>
                    <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                  </div>
                </div>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-gray-400'>Weight: {model.weight}</span>
                  <span className='text-purple-400'>Active</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* What-If Simulation Engine */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6'
      >
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h3 className='text-xl font-bold text-white'>What-If Simulation Engine</h3>
            <p className='text-gray-400 text-sm'>Test scenarios and optimize strategies</p>
          </div>
          <Calculator className='w-6 h-6 text-purple-400' />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-400 mb-2'>
                Scenario Settings
              </label>
              <div className='space-y-3'>
                <div className='flex items-center justify-between bg-slate-900/50 rounded-lg p-3'>
                  <span className='text-white'>Bankroll Size</span>
                  <select className='bg-slate-700 text-white rounded px-2 py-1 text-sm'>
                    <option>$10,000</option>
                    <option>$25,000</option>
                    <option>$50,000</option>
                    <option>$100,000</option>
                  </select>
                </div>
                <div className='flex items-center justify-between bg-slate-900/50 rounded-lg p-3'>
                  <span className='text-white'>Risk Level</span>
                  <select className='bg-slate-700 text-white rounded px-2 py-1 text-sm'>
                    <option>Conservative</option>
                    <option>Moderate</option>
                    <option>Aggressive</option>
                  </select>
                </div>
                <div className='flex items-center justify-between bg-slate-900/50 rounded-lg p-3'>
                  <span className='text-white'>Time Horizon</span>
                  <select className='bg-slate-700 text-white rounded px-2 py-1 text-sm'>
                    <option>1 Week</option>
                    <option>1 Month</option>
                    <option>3 Months</option>
                    <option>1 Year</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-400 mb-2'>
                Simulation Results
              </label>
              <div className='space-y-3'>
                <div className='bg-slate-900/50 rounded-lg p-3'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-gray-400 text-sm'>Expected Return</span>
                    <span className='text-green-400 font-bold'>+24.7%</span>
                  </div>
                  <div className='w-full bg-slate-700 rounded-full h-2'>
                    <div
                      className='bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full'
                      style={{ width: '75%' }}
                    ></div>
                  </div>
                </div>
                <div className='bg-slate-900/50 rounded-lg p-3'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-gray-400 text-sm'>Win Probability</span>
                    <span className='text-cyan-400 font-bold'>78.3%</span>
                  </div>
                  <div className='w-full bg-slate-700 rounded-full h-2'>
                    <div
                      className='bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full'
                      style={{ width: '78%' }}
                    ></div>
                  </div>
                </div>
                <div className='bg-slate-900/50 rounded-lg p-3'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-gray-400 text-sm'>Max Drawdown</span>
                    <span className='text-yellow-400 font-bold'>-5.2%</span>
                  </div>
                  <div className='w-full bg-slate-700 rounded-full h-2'>
                    <div
                      className='bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full'
                      style={{ width: '25%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6 flex space-x-3'>
          <button className='flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white font-medium transition-all'>
            Run Simulation
          </button>
          <button className='px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors'>
            Export Results
          </button>
        </div>
      </motion.div>

      {/* Live Portfolio Optimization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6'
      >
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h3 className='text-xl font-bold text-white'>Live Portfolio Optimization</h3>
            <p className='text-gray-400 text-sm'>AI-powered real-time portfolio adjustments</p>
          </div>
          <Brain className='w-6 h-6 text-cyan-400' />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='bg-slate-900/50 rounded-lg p-4'>
            <h4 className='text-sm font-medium text-gray-400 mb-3'>Current Allocation</h4>
            <div className='space-y-2'>
              {[
                { category: 'NBA Props', allocation: 35, change: '+2%' },
                { category: 'NFL Spreads', allocation: 25, change: '-1%' },
                { category: 'Arbitrage', allocation: 20, change: '+3%' },
                { category: 'Live Betting', allocation: 15, change: '0%' },
                { category: 'Cash', allocation: 5, change: '-4%' },
              ].map((item, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <span className='text-gray-300 text-sm'>{item.category}</span>
                  <div className='flex items-center space-x-2'>
                    <span className='text-white font-medium'>{item.allocation}%</span>
                    <span
                      className={`text-xs ${
                        item.change.startsWith('+')
                          ? 'text-green-400'
                          : item.change.startsWith('-')
                            ? 'text-red-400'
                            : 'text-gray-400'
                      }`}
                    >
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-slate-900/50 rounded-lg p-4'>
            <h4 className='text-sm font-medium text-gray-400 mb-3'>AI Recommendations</h4>
            <div className='space-y-2'>
              {[
                { action: 'Increase NBA Props', confidence: 92, impact: '+3.2%' },
                { action: 'Reduce NFL Exposure', confidence: 87, impact: '-1.8%' },
                { action: 'Add MLB Arbitrage', confidence: 85, impact: '+2.1%' },
              ].map((rec, index) => (
                <div key={index} className='bg-slate-800/50 rounded-lg p-2'>
                  <div className='flex items-center justify-between mb-1'>
                    <span className='text-white text-sm font-medium'>{rec.action}</span>
                    <span className='text-cyan-400 text-xs'>{rec.confidence}%</span>
                  </div>
                  <div className='text-green-400 text-xs'>{rec.impact} impact</div>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-slate-900/50 rounded-lg p-4'>
            <h4 className='text-sm font-medium text-gray-400 mb-3'>Risk Metrics</h4>
            <div className='space-y-3'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-green-400'>1.47</div>
                <div className='text-xs text-gray-400'>Sharpe Ratio</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-yellow-400'>2.3%</div>
                <div className='text-xs text-gray-400'>VaR (95%)</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-purple-400'>0.89</div>
                <div className='text-xs text-gray-400'>Beta</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6'
      >
        <h3 className='text-xl font-bold text-white mb-4'>System Status</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='text-center'>
            <div className='w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3'>
              <Activity className='w-8 h-8 text-green-400' />
            </div>
            <div className='text-2xl font-bold text-green-400'>100%</div>
            <div className='text-sm text-gray-400'>System Uptime</div>
          </div>
          <div className='text-center'>
            <div className='w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-3'>
              <Clock className='w-8 h-8 text-cyan-400' />
            </div>
            <div className='text-2xl font-bold text-cyan-400'>1.2s</div>
            <div className='text-sm text-gray-400'>Avg Response Time</div>
          </div>
          <div className='text-center'>
            <div className='w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3'>
              <Target className='w-8 h-8 text-purple-400' />
            </div>
            <div className='text-2xl font-bold text-purple-400'>47</div>
            <div className='text-sm text-gray-400'>Active Models</div>
          </div>
        </div>
      </motion.div>

      {/* Strategy Automation Engine */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6 mt-8'
      >
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h3 className='text-xl font-bold text-white'>Strategy Automation Engine</h3>
            <p className='text-gray-400 text-sm'>
              Automated strategy execution with adaptive risk management
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            <div className='w-3 h-3 bg-yellow-400 rounded-full animate-pulse'></div>
            <span className='text-yellow-400 text-sm font-medium'>Auto-Trading</span>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='bg-slate-900/50 rounded-lg p-4'>
            <h4 className='text-sm font-medium text-gray-400 mb-3'>Active Strategies</h4>
            <div className='space-y-3'>
              {[
                {
                  name: 'Momentum Arbitrage',
                  status: 'Running',
                  trades: 23,
                  pnl: '+$2,847',
                  winRate: 89.1,
                  active: true,
                },
                {
                  name: 'Value Line Hunter',
                  status: 'Running',
                  trades: 18,
                  pnl: '+$1,923',
                  winRate: 83.3,
                  active: true,
                },
                {
                  name: 'Correlation Fade',
                  status: 'Paused',
                  trades: 7,
                  pnl: '+$456',
                  winRate: 71.4,
                  active: false,
                },
                {
                  name: 'Live Betting Edge',
                  status: 'Running',
                  trades: 31,
                  pnl: '+$3,122',
                  winRate: 87.1,
                  active: true,
                },
              ].map((strategy, index) => (
                <div key={index} className='bg-slate-800/50 rounded-lg p-3'>
                  <div className='flex items-center justify-between mb-2'>
                    <div className='flex items-center space-x-2'>
                      <div
                        className={`w-2 h-2 rounded-full ${strategy.active ? 'bg-green-400' : 'bg-gray-400'}`}
                      ></div>
                      <span className='text-white font-medium text-sm'>{strategy.name}</span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        strategy.status === 'Running'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {strategy.status}
                    </span>
                  </div>
                  <div className='grid grid-cols-2 gap-2 text-xs'>
                    <div className='text-gray-400'>
                      Trades: <span className='text-white'>{strategy.trades}</span>
                    </div>
                    <div className='text-gray-400'>
                      P&L: <span className='text-green-400'>{strategy.pnl}</span>
                    </div>
                    <div className='text-gray-400'>
                      Win Rate: <span className='text-cyan-400'>{strategy.winRate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-slate-900/50 rounded-lg p-4'>
            <h4 className='text-sm font-medium text-gray-400 mb-3'>Risk Controls</h4>
            <div className='space-y-3'>
              {[
                {
                  control: 'Max Position Size',
                  current: '$2,500',
                  limit: '$5,000',
                  status: 'Safe',
                },
                { control: 'Daily Drawdown', current: '-1.2%', limit: '-5%', status: 'Safe' },
                { control: 'Correlation Limit', current: '0.23', limit: '0.40', status: 'Safe' },
                { control: 'Volatility Filter', current: '18.4%', limit: '25%', status: 'Safe' },
              ].map((control, index) => (
                <div key={index} className='bg-slate-800/50 rounded-lg p-3'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-white font-medium text-sm'>{control.control}</span>
                    <span className='text-green-400 text-xs'>{control.status}</span>
                  </div>
                  <div className='flex items-center justify-between text-xs'>
                    <span className='text-gray-400'>
                      Current: <span className='text-white'>{control.current}</span>
                    </span>
                    <span className='text-gray-400'>
                      Limit: <span className='text-red-400'>{control.limit}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-slate-900/50 rounded-lg p-4'>
            <h4 className='text-sm font-medium text-gray-400 mb-3'>Performance Metrics</h4>
            <div className='space-y-3'>
              <div className='bg-slate-800/50 rounded-lg p-3 text-center'>
                <div className='text-2xl font-bold text-green-400 mb-1'>+18.7%</div>
                <div className='text-xs text-gray-400'>Total Return (MTD)</div>
              </div>
              <div className='bg-slate-800/50 rounded-lg p-3 text-center'>
                <div className='text-2xl font-bold text-cyan-400 mb-1'>2.34</div>
                <div className='text-xs text-gray-400'>Sharpe Ratio</div>
              </div>
              <div className='bg-slate-800/50 rounded-lg p-3 text-center'>
                <div className='text-2xl font-bold text-purple-400 mb-1'>-3.2%</div>
                <div className='text-xs text-gray-400'>Max Drawdown</div>
              </div>
              <div className='space-y-2'>
                {[
                  { metric: 'Win Rate', value: '84.2%' },
                  { metric: 'Avg Trade', value: '+$247' },
                  { metric: 'Profit Factor', value: '2.86' },
                ].map((item, index) => (
                  <div key={index} className='flex items-center justify-between text-xs'>
                    <span className='text-gray-400'>{item.metric}</span>
                    <span className='text-white font-medium'>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Portfolio Intelligence Hub */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6 mt-8'
      >
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h3 className='text-xl font-bold text-white'>Portfolio Intelligence Hub</h3>
            <p className='text-gray-400 text-sm'>
              AI-driven portfolio optimization and rebalancing recommendations
            </p>
          </div>
          <Brain className='w-6 h-6 text-purple-400' />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-slate-900/50 rounded-lg p-4'>
            <h4 className='text-lg font-medium text-white mb-4'>Optimization Signals</h4>
            <div className='space-y-3'>
              {[
                {
                  signal: 'Rebalance NBA Exposure',
                  priority: 'HIGH',
                  action: 'Reduce by 5%',
                  reason: 'Season ending, volatility increasing',
                  impact: '+2.3% expected return',
                  confidence: 91,
                },
                {
                  signal: 'Increase Arbitrage Allocation',
                  priority: 'MEDIUM',
                  action: 'Add $2,500',
                  reason: 'Market inefficiencies detected',
                  impact: '+1.8% expected return',
                  confidence: 87,
                },
                {
                  signal: 'Diversify Sport Exposure',
                  priority: 'LOW',
                  action: 'Add NHL props',
                  reason: 'Low correlation to current holdings',
                  impact: '+0.9% risk reduction',
                  confidence: 73,
                },
              ].map((signal, index) => (
                <div key={index} className='bg-slate-800/50 rounded-lg p-3'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='text-white font-medium text-sm'>{signal.signal}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        signal.priority === 'HIGH'
                          ? 'bg-red-500/20 text-red-400'
                          : signal.priority === 'MEDIUM'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-green-500/20 text-green-400'
                      }`}
                    >
                      {signal.priority}
                    </span>
                  </div>
                  <div className='text-cyan-400 text-sm mb-2'>{signal.action}</div>
                  <div className='text-gray-400 text-xs mb-2'>{signal.reason}</div>
                  <div className='flex items-center justify-between'>
                    <span className='text-green-400 text-xs'>{signal.impact}</span>
                    <span className='text-purple-400 text-xs'>{signal.confidence}% confidence</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-slate-900/50 rounded-lg p-4'>
            <h4 className='text-lg font-medium text-white mb-4'>Smart Alerts</h4>
            <div className='space-y-3'>
              {[
                {
                  type: 'Market Opportunity',
                  message: 'Lakers-Warriors line movement creating arbitrage',
                  timestamp: '2 minutes ago',
                  severity: 'info',
                  action: 'Execute arbitrage strategy',
                },
                {
                  type: 'Risk Warning',
                  message: 'Correlation spike detected in NBA props',
                  timestamp: '5 minutes ago',
                  severity: 'warning',
                  action: 'Reduce position sizing',
                },
                {
                  type: 'Performance Alert',
                  message: 'Value strategy outperforming by 15%',
                  timestamp: '12 minutes ago',
                  severity: 'success',
                  action: 'Consider increasing allocation',
                },
                {
                  type: 'System Update',
                  message: 'New ML model deployed successfully',
                  timestamp: '1 hour ago',
                  severity: 'info',
                  action: 'Review model performance',
                },
              ].map((alert, index) => (
                <div key={index} className='bg-slate-800/50 rounded-lg p-3'>
                  <div className='flex items-center justify-between mb-2'>
                    <span
                      className={`text-sm font-medium ${
                        alert.severity === 'success'
                          ? 'text-green-400'
                          : alert.severity === 'warning'
                            ? 'text-yellow-400'
                            : alert.severity === 'error'
                              ? 'text-red-400'
                              : 'text-cyan-400'
                      }`}
                    >
                      {alert.type}
                    </span>
                    <span className='text-gray-400 text-xs'>{alert.timestamp}</span>
                  </div>
                  <div className='text-white text-sm mb-2'>{alert.message}</div>
                  <div className='text-purple-400 text-xs'>{alert.action}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Dashboard;
