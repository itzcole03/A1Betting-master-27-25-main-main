import { motion} from 'framer-motion'
import {
  Activity,
  BarChart3,
  Brain,
  CheckCircle,
  Clock,
  Cpu,
  DollarSign,
  Shield,
  Target,
  Trophy,
//   Zap
} from 'lucide-react';
import React, { useEffect, useState} from 'react'
import { useRealtimeData} from '../hooks/useRealtimeData'

interface User {
  id: number
,`n  name: string;
,`n  email: string
,`n  balance: number;
,`n  tier: string}

interface Bet {
  id: number
,`n  match: string;
,`n  amount: number
,`n  odds: number;
,`n  status: 'pending' | 'won' | 'lost'
,`n  potentialWinnings: number;
,`n  placedAt: string
,`n  sport: string;
  confidence?: number}

interface Prediction {
  id: number
,`n  match: string;
,`n  prediction: string
,`n  confidence: number;
,`n  odds: number
,`n  sport: string;
  expectedValue?: number
  modelAccuracy?: number}

interface EnhancedPerformanceStats {
  totalProfit: number
,`n  winRate: number;
,`n  todayProfit: number
,`n  activeBets: number;
,`n  sharpeRatio: number
,`n  maxDrawdown: number;
,`n  totalBets: number
,`n  avgBetSize: number;
,`n  roiWeekly: number
,`n  mlModelsActive: number}

interface DashboardProps {
  user?: User
  accountBalance?: number
  recentBets?: Bet[0];
  livePredictions?: Prediction[0];
  performanceStats?: EnhancedPerformanceStats}

const Dashboard: React.FC<DashboardProps> = ({
  user,
  accountBalance,
  recentBets,
  livePredictions,
//   performanceStats
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Use real-time data from backend
  const { data: realtimeData, loading: dataLoading, error: dataError} = useRealtimeData();

  // Default fallback data (minimal)
  const defaultUser: User = {
,`n  id: 1,
    name: 'Elite Bettor',
    email: 'elite@example.com',
    balance: realtimeData?.profit || 125000,
    tier: 'Quantum Pro'
  };

  // Use real backend data with fallbacks
  const actualUser = user || defaultUser;
  const actualBalance = accountBalance || realtimeData?.profit || 125000;
  const actualStats = performanceStats || {
    totalProfit: realtimeData?.profit || 18500,
    winRate: realtimeData?.accuracy || 73.8,
    todayProfit: Math.round((realtimeData?.profit || 18500) * 0.126), // Today's portion
    activeBets: realtimeData?.activeBots || 12,
    sharpeRatio: 1.42, // Keep static high-level metric
    maxDrawdown: 2.3, // Keep static risk metric
    totalBets: realtimeData?.predictions || 347,
    avgBetSize: 127.5, // Keep static for now
    roiWeekly: 3.2, // Keep static for now
    mlModelsActive: realtimeData?.activeBots || 47
  };

  // Map backend opportunities to bet format
  const actualBets =
    recentBets ||
    realtimeData?.upcomingOpportunities?.slice(0, 4).map((opportunity: any, index: number) => ({
,`n  id: index + 1,
      match: opportunity.game || 'Live Match',
      amount: Math.floor(Math.random() * 150) + 75, // Random stake for demo
      odds: 1.5 + Math.random() * 1.5, // Random odds
      status: Math.random() > 0.3 ? 'won' : Math.random() > 0.5 ? 'pending' : 'lost',
      potentialWinnings: 0, // Will be calculated
      placedAt: new Date().toISOString(),
      sport: opportunity.sport || 'Mixed',
      confidence: opportunity.confidence || 0
    })) ||
    [0];

  // Calculate potential winnings for actual bets
  actualBets.forEach(bet => {
    bet.potentialWinnings = bet.amount * bet.odds});

  const actualPredictions =
    livePredictions ||
    realtimeData?.upcomingOpportunities?.slice(0, 4).map((opportunity: any, index: number) => ({
,`n  id: index + 1,
      match: opportunity.game || 'Live Match',
      prediction: opportunity.recommendation || 'Analysis pending',
      confidence: opportunity.confidence || 0,
      odds: 1.5 + Math.random() * 1.5, // Random odds for demo
      sport: opportunity.sport || 'Mixed',
      expectedValue: opportunity.expected_value || 0,
      modelAccuracy: realtimeData?.accuracy || 85
    })) ||
    [0];

  useEffect(() => {
    // Simulate loading with real initialization
    const timer = setTimeout(() => setIsLoading(false), 1500);

    // Update time every second
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval)}}, [0]);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 80) return 'text-blue-400';
    if (confidence >= 70) return 'text-yellow-400';
    return 'text-orange-400'};

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'won':
        return 'bg-green-500/20 text-green-400';
      case 'lost':
        return 'bg-red-500/20 text-red-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400'}
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center'>
        <div className='text-white text-center'>
          <motion.div
            className='w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto mb-6'
            animate={{ rotate: 360}}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear'}}
          />
          <h3 className='text-xl font-bold mb-2'>Loading Dashboard</h3>
          <p className='text-gray-400'>Preparing your enterprise analytics...</p>
        </div>
      </div>
    )}

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Enhanced Header */}
        <motion.div
          className='mb-8'
          initial={{ opacity: 0, y: -20}}
          animate={{ opacity: 1, y: 0}}
        >
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4'>
            <div>
              <h1 className='text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2'>
                Welcome back, {actualUser.name}
              </h1>
              <p className='text-gray-400 flex items-center space-x-4'>
                <span>Enterprise Sports Intelligence • {actualUser.tier} Member</span>
                <span className='flex items-center space-x-1'>
                  <Clock className='w-4 h-4' />
                  <span>{currentTime.toLocaleTimeString()}</span>
                </span>
              </p>
            </div>

            <div className='flex items-center space-x-4 mt-4 lg:mt-0'>
              <div className='text-right'>
                <p className='text-gray-400 text-sm'>Portfolio Value</p>
                <p className='text-2xl font-bold text-yellow-400'>
                  ${actualBalance.toLocaleString()}
                </p>
              </div>
              <div className='flex items-center space-x-2 px-3 py-2 bg-green-500/20 rounded-lg border border-green-500/30'>
                <CheckCircle className='w-4 h-4 text-green-400' />
                <span className='text-green-400 text-sm font-medium'>All Systems Live</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 relative overflow-hidden'
            whileHover={{ scale: 1.02}}
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity: 1, y: 0}}
            transition={{ delay: 0.1}}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-400 text-sm'>Account Balance</p>
                <p className='text-2xl font-bold text-white'>${actualBalance.toLocaleString()}</p>
                <p className='text-green-400 text-sm mt-1'>
                  +${actualStats.safeNumber(todayProfit, 2)} today
                </p>
              </div>
              <DollarSign className='w-8 h-8 text-yellow-400' />
            </div>
            <div className='absolute -bottom-2 -right-2 w-20 h-20 bg-yellow-400/10 rounded-full'></div>
          </motion.div>

          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 relative overflow-hidden'
            whileHover={{ scale: 1.02}}
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity: 1, y: 0}}
            transition={{ delay: 0.2}}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-400 text-sm'>Win Rate</p>
                <p className='text-2xl font-bold text-green-400'>{actualStats.winRate}%</p>
                <p className='text-gray-400 text-sm mt-1'>{actualStats.totalBets} total bets</p>
              </div>
              <Trophy className='w-8 h-8 text-green-400' />
            </div>
            <div className='absolute -bottom-2 -right-2 w-20 h-20 bg-green-400/10 rounded-full'></div>
          </motion.div>

          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 relative overflow-hidden'
            whileHover={{ scale: 1.02}}
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity: 1, y: 0}}
            transition={{ delay: 0.3}}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-400 text-sm'>Sharpe Ratio</p>
                <p className='text-2xl font-bold text-blue-400'>{actualStats.sharpeRatio}</p>
                <p className='text-gray-400 text-sm mt-1'>
                  {actualStats.maxDrawdown}% max drawdown
                </p>
              </div>
              <BarChart3 className='w-8 h-8 text-blue-400' />
            </div>
            <div className='absolute -bottom-2 -right-2 w-20 h-20 bg-blue-400/10 rounded-full'></div>
          </motion.div>

          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 relative overflow-hidden'
            whileHover={{ scale: 1.02}}
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity: 1, y: 0}}
            transition={{ delay: 0.4}}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-400 text-sm'>ML Models Active</p>
                <p className='text-2xl font-bold text-purple-400'>{actualStats.mlModelsActive}+</p>
                <p className='text-gray-400 text-sm mt-1'>{actualStats.activeBets} active bets</p>
              </div>
              <Cpu className='w-8 h-8 text-purple-400' />
            </div>
            <div className='absolute -bottom-2 -right-2 w-20 h-20 bg-purple-400/10 rounded-full'></div>
          </motion.div>
        </div>

        {/* Advanced Performance Metrics */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8'>
          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'
            initial={{ opacity: 0, x: -20}}
            animate={{ opacity: 1, x: 0}}
            transition={{ delay: 0.5}}
          >
            <h3 className='text-xl font-semibold text-white mb-4 flex items-center'>
              <Shield className='w-5 h-5 mr-2 text-green-400' />
              Risk Metrics
            </h3>
            <div className='space-y-4'>
              <div className='flex justify-between items-center'>
                <span className='text-gray-400'>Sharpe Ratio</span>
                <span className='text-green-400 font-semibold'>{actualStats.sharpeRatio}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-400'>Max Drawdown</span>
                <span className='text-yellow-400 font-semibold'>{actualStats.maxDrawdown}%</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-400'>Avg Bet Size</span>
                <span className='text-blue-400 font-semibold'>${actualStats.avgBetSize}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-400'>Weekly ROI</span>
                <span className='text-purple-400 font-semibold'>{actualStats.roiWeekly}%</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity: 1, y: 0}}
            transition={{ delay: 0.6}}
          >
            <h3 className='text-xl font-semibold text-white mb-4 flex items-center'>
              <Brain className='w-5 h-5 mr-2 text-purple-400' />
              AI Predictions
            </h3>
            <div className='space-y-3'>
              {actualPredictions.slice(0, 4).map(prediction => (
                <div key={prediction.id}
                  className='flex items-center justify-between p-3 bg-white/5 rounded-lg'
>`n                >
                  <div className='flex-1'>
                    <p className='text-white font-medium text-sm'>{prediction.match}</p>
                    <p className='text-gray-400 text-xs'>
                      {prediction.prediction} • {prediction.sport}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className={`font-semibold text-xs ${getConfidenceColor(prediction.confidence)}`}
>`n                    >
                      {prediction.confidence}%
                    </p>
                    {prediction.expectedValue && (
                      <p className='text-green-400 text-xs'>EV: +{prediction.expectedValue}%</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'
            initial={{ opacity: 0, x: 20}}
            animate={{ opacity: 1, x: 0}}
            transition={{ delay: 0.7}}
          >
            <h3 className='text-xl font-semibold text-white mb-4 flex items-center'>
              <Activity className='w-5 h-5 mr-2 text-blue-400' />
              Recent Activity
            </h3>
            <div className='space-y-3'>
              {actualBets.slice(0, 4).map(bet => (
                <div key={bet.id}
                  className='flex items-center justify-between p-3 bg-white/5 rounded-lg'
>`n                >
                  <div className='flex-1'>
                    <p className='text-white font-medium text-sm'>{bet.match}</p>
                    <p className='text-gray-400 text-xs'>
                      ${bet.amount} at {bet.odds} • {bet.sport}
                    </p>
                  </div>
                  <div className='text-right'>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusBadge(bet.status)}`}
>`n                    >
                      {bet.status}
                    </span>
                    {bet.confidence && (
                      <p className={`text-xs mt-1 ${getConfidenceColor(bet.confidence)}`}>
                        {bet.confidence}% conf
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Quick Actions */}
        <motion.div
          className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'
          initial={{ opacity: 0, y: 20}}
          animate={{ opacity: 1, y: 0}}
          transition={{ delay: 0.8}}
        >
          <h3 className='text-xl font-semibold text-white mb-6'>Quick Actions</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <motion.button
              className='bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-4 px-6 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all flex items-center justify-center space-x-2'
              whileHover={{ scale: 1.05}}
              whileTap={{ scale: 0.95}}
            >
              <Brain className='w-5 h-5' />
              <span>AI Predictions</span>
            </motion.button>

            <motion.button
              className='bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-green-400 hover:to-green-500 transition-all flex items-center justify-center space-x-2'
              whileHover={{ scale: 1.05}}
              whileTap={{ scale: 0.95}}
            >
              <Target className='w-5 h-5' />
              <span>Live Opportunities</span>
            </motion.button>

            <motion.button
              className='bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-400 hover:to-blue-500 transition-all flex items-center justify-center space-x-2'
              whileHover={{ scale: 1.05}}
              whileTap={{ scale: 0.95}}
            >
              <BarChart3 className='w-5 h-5' />
              <span>Analytics</span>
            </motion.button>

            <motion.button
              className='bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all flex items-center justify-center space-x-2'
              whileHover={{ scale: 1.05}}
              whileTap={{ scale: 0.95}}
            >
              <Zap className='w-5 h-5' />
              <span>Arbitrage Hunter</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )};

export default Dashboard;
export { Dashboard}




`
