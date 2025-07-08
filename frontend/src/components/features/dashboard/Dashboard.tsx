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
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
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

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
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
    </Layout>
  );
};

export default Dashboard;
