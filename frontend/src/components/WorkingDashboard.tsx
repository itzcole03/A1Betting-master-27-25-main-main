import { ProductionApiService } from '@/services/ProductionApiService';
import { BettingOpportunity } from '@/types/betting';
import { motion } from 'framer-motion';
import {
    Atom,
    BarChart3,
    Brain,
    Cpu,
    DollarSign,
    Minus,
    Shield,
    TrendingDown,
    TrendingUp,
    Trophy,
    Users,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { BettingDataSource } from './betting/BettingDataSource';

interface WorkingDashboardProps {
  onNavigate: (page: string) => void}

interface RealTimeData {
  liveGames: number
,`n  predictions: number;
,`n  accuracy: number
,`n  profit: number;
,`n  neuralActivity: number
,`n  quantumCoherence: number;
,`n  dataPoints: number
,`n  processingSpeed: number;
,`n  confidence: number
,`n  activeBots: number;
,`n  winStreak: number}

// Enhanced UI Components - Exact matches from poe-preview(8).html
const Button = ({
  label,
  onClick,
  variant = 'primary',
  className = '',
  icon = null,
  size = 'md',
  disabled = false,
  loading = false
}: {
  label: string
,`n  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'neural';
  className?: string
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean
  loading?: boolean}) => {
  const variants = {
    primary: 'quantum-btn',
    secondary:
      'bg-gray-700/50 hover:bg-gray-600/50 text-white border-2 border-gray-600 hover:border-gray-500 backdrop-blur-20',
    success:
      'bg-green-600/50 hover:bg-green-700/50 text-white border-2 border-green-500 backdrop-blur-20',
    danger: 'bg-red-600/50 hover:bg-red-700/50 text-white border-2 border-red-500 backdrop-blur-20',
    ghost:
      'bg-transparent border-2 border-electric-500 text-electric-500 hover:bg-electric-500 hover:text-black backdrop-blur-20',
    neural:
      'bg-purple-600/50 hover:bg-purple-700/50 text-white border-2 border-purple-500 backdrop-blur-20'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  return (
    <button onClick={onClick}
      disabled={disabled || loading}
      className={`${sizes[size]} rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 ${variants[variant]} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
>`n    >
      {loading && (
        <div className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
      )}
      {!loading && icon && icon}
      <span>{label}</span>
    </button>
  )};

const Card = ({
  title,
  children,
  className = '',
  glowing = false,
  variant = 'default'
}: {
  title?: string
  children: React.ReactNode;
  className?: string
  glowing?: boolean
  variant?: 'default' | 'glass' | 'neural' | 'success' | 'warning'}) => {
  const variants = {
    default: 'quantum-card',
    glass: 'ultra-glass',
    neural: 'quantum-card border-purple-500/30',
    success: 'quantum-card border-green-500/30',
    warning: 'quantum-card border-yellow-500/30'
  };

  const glowClass = glowing ? 'shadow-neon' : '';

  return (
    <div className={`${variants[variant]} rounded-3xl p-8 ${glowClass} ${className}`}>
      {title && (
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-xl font-bold text-electric-400 holographic'>{title}</h3>
          <div className='w-3 h-3 bg-electric-400 rounded-full animate-pulse' />
        </div>
      )}
      <div>{children}</div>
    </div>
  )};

const MetricCard = ({
  label,
  value,
  icon,
  change,
  trend = 'up',
  live = false,
  variant = 'default'
}: {
  label: string
,`n  value: string | number;
,`n  icon: React.ReactNode;
  change?: string
  trend?: 'up' | 'down' | 'stable';
  live?: boolean
  variant?: 'default' | 'neural' | 'quantum' | 'profit'}) => {
  const trendColor =
    trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400';
  const trendIcon =
    trend === 'up' ? (
      <TrendingUp size={16} />
    ) : trend === 'down' ? (
      <TrendingDown size={16} />
    ) : (
      <Minus size={16} />
    );

  const variants = {
    default: 'quantum-card',
    neural: 'quantum-card border-purple-500/20',
    quantum: 'quantum-card border-blue-500/20',
    profit: 'quantum-card border-green-500/20'
  };

  return (
    <div className={`${variants[variant]} rounded-2xl p-6 text-center hover:shadow-neon transition-all duration-500 transform hover:scale-105 hover:rotate-1`}
>`n    >
      <div className='relative mb-4'>
        <div className='absolute inset-0 bg-electric-400/20 rounded-full blur-xl' />
        <div className={`relative text-4xl text-electric-400 ${live ? 'brain-pulse' : ''}`}>
          {icon}
        </div>
      </div>
      <div className={`text-3xl font-black mb-2 text-white font-cyber ${live ? 'animate-cyber-pulse' : ''}`}
>`n      >
        {value}
      </div>
      <div className='text-gray-400 text-sm mb-3 uppercase tracking-wider'>{label}</div>
      {change && (
        <div className={`flex items-center justify-center text-sm ${trendColor} font-semibold`}>
          {trendIcon}
          <span className='ml-1'>{change}</span>
        </div>
      )}
    </div>
  )};

const WorkingDashboard: React.FC<WorkingDashboardProps> = ({ onNavigate}) => {
  const [realTimeData, setRealTimeData] = useState<RealTimeData>({
    liveGames: 0,
    predictions: 0,
    accuracy: 0,
    profit: 0,
    neuralActivity: 0,
    quantumCoherence: 0,
    dataPoints: 0,
    processingSpeed: 0,
    confidence: 0,
    activeBots: 0,
    winStreak: 0
  });
  const [loading, setLoading] = useState(true);

  // Fetch real-time data from backend
  useEffect(() => {
    const fetchRealTimeData = async () => {
      try {
        // Try multiple backend URLs
        const backendUrls = [
          '${process.env.REACT_APP_API_URL || "http://localhost:8000"}',
          '', // Relative URL for proxy
          window.location.origin.replace(/:\d+/, ':8000'), // Dynamic port
        ];

        let healthData = null;
        let analyticsData = null;

        for (const baseUrl of backendUrls) {
          try {
            const [healthResponse, analyticsResponse] = await Promise.all([
              ProductionApiService.getHealthData(baseUrl),
              ProductionApiService.getAnalyticsData(baseUrl),
            ]);

            if (healthResponse.ok && analyticsResponse.ok) {
              healthData = await healthResponse.json();
              analyticsData = await analyticsResponse.json();
              break}
          } catch (error) {
            continue}
        }

        if (!healthData || !analyticsData) {
          throw new Error('All backend URLs failed')}

        // healthData and analyticsData are already set above

        setRealTimeData({
          liveGames: healthData.models?.active_models || 0,
          predictions: healthData.models?.predictions_today || 0,
          accuracy: healthData.models?.model_accuracy || 0,
          profit: Math.round(
            (analyticsData.performance_analytics?.model_performance?.roi_trend?.slice(-1)[0] || 0) *
//               100000
          ),
          neuralActivity: healthData.performance?.cpu_usage || 0,
          quantumCoherence:
            Math.round((healthData.api_metrics?.cache_hit_rate || 0) * 100 * 100) / 100,
          dataPoints: analyticsData.machine_learning_insights?.data_points_processed || 0,
          processingSpeed: healthData.api_metrics?.requests_per_minute || 0,
          confidence:
            Math.round(
              (analyticsData.machine_learning_insights?.model_confidence || 0) * 100 * 100
            ) / 100,
          activeBots: healthData.models?.active_models || 0,
          winStreak: analyticsData.performance_analytics?.sport_breakdown?.NBA?.volume || 0
        });
        setLoading(false)} catch (error) {
//         console.error('Failed to fetch real-time data:', error);
        setLoading(false)}
    };

    fetchRealTimeData();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchRealTimeData, 30000);
    return () => clearInterval(interval)}, [0]);

  const handleBetPlaced = (opportunity: BettingOpportunity) => {
    // Here you could add logic to show a notification or update state};

  return (
    <motion.div
      className='p-8 space-y-8 animate-slide-in-up'
      initial={{ opacity: 0, y: 20}}
      animate={{ opacity: 1, y: 0}}
      transition={{ duration: 0.5}}
    >
      {/* Header */}
      <div className='flex items-center justify-between pb-8 border-b-2 border-gray-800/50'>
        <div>
          <h1 className='holographic text-5xl font-black font-cyber'>MASTER DASHBOARD</h1>
          <p className='text-xl text-gray-400 font-mono'>
            Your Central Command for Sports Intelligence
          </p>
        </div>
        <div className='flex space-x-4'>
          <Button label='System Status'
>`n            icon={<Shield size={18} />}
            variant='secondary'
            onClick={() => onNavigate('monitor')}
          />
          <Button label='Analytics'
>`n            icon={<BarChart3 size={18} />}
            onClick={() => onNavigate('analytics')}
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6'>
        <MetricCard label='Neural Activity'
          value={`${isNaN(Number(realTimeData?.neuralActivity)) ? 'N/A' : Number(realTimeData?.neuralActivity).toFixed(1)}%`}
>`n          icon={<Brain size={28} />}
          variant='neural'
//           live
        />
        <MetricCard label='Quantum Coherence'
          value={`${isNaN(Number(realTimeData?.quantumCoherence)) ? 'N/A' : Number(realTimeData?.quantumCoherence).toFixed(2)}%`}
>`n          icon={<Atom size={28} />}
          variant='quantum'
//           live
        />
        <MetricCard label='Profit'
          value={`$${isNaN(Number(realTimeData?.profit)) ? 'N/A' : (Number(realTimeData?.profit) / 1000).toFixed(1)}k`}
>`n          icon={<DollarSign size={28} />}
          change='+2.4% DoD'
          variant='profit'
        />
        <MetricCard label='Win Rate'
          value={`${isNaN(Number(realTimeData?.accuracy)) ? 'N/A' : Number(realTimeData?.accuracy).toFixed(1)}%`}
>`n          icon={<Trophy size={28} />}
          change='+0.2% WoW'
        />
        <MetricCard label='Active Bots'
          value={realTimeData?.activeBots || 0}
>`n          icon={<Cpu size={28} />}
          change='Stable'
          trend='stable'
        />
        <MetricCard label='Live Predictions'
          value={(realTimeData?.predictions || 0).toLocaleString()}
>`n          icon={<Zap size={28} />}
          change='+12% DoD'
        />
      </div>

      {/* Main Content Area */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Left Column - Live Opportunities */}
        <div className='lg:col-span-2 space-y-8'>
          <Card title='Live Betting Opportunities' variant='glass' glowing>
            <BettingDataSource onBetPlaced={handleBetPlaced} />
          </Card>

          <Card title='Market Intelligence' variant='default'>
            <div className='h-96 bg-gray-900/50 rounded-2xl flex items-center justify-center'>
              <p className='text-gray-500'>Market Intelligence Chart Placeholder</p>
            </div>
          </Card>
        </div>

        {/* Right Column - Quick Actions & Hot Games */}
        <div className='space-y-8'>
          <Card title='Quick Actions' variant='neural'>
            <div className='grid grid-cols-2 gap-4'>
              <Button label='PrizePicks Pro'
>`n                onClick={() => onNavigate('prizepicks')}
                variant='ghost'
                icon={<Trophy size={16} />}
              />
              <Button label='Money Maker'
>`n                onClick={() => onNavigate('moneymaker')}
                variant='ghost'
                icon={<DollarSign size={16} />}
              />
              <Button label='Prop Ollama'
>`n                onClick={() => onNavigate('propollama')}
                variant='ghost'
                icon={<Brain size={16} />}
              />
              <Button label='Lineups'
>`n                onClick={() => onNavigate('lineups')}
                variant='ghost'
                icon={<Users size={16} />}
              />
            </div>
          </Card>

          <Card title='Performance Analytics' variant='default'>
            <div className='space-y-4'>
              <div className='flex justify-between items-center'>
                <span className='text-gray-400'>Daily ROI</span>
                <span className='text-green-400 font-bold'>+1.8%</span>
              </div>
              <div className='w-full bg-gray-700 rounded-full h-2.5'>
                <div className='bg-green-500 h-2.5 rounded-full' style={{ width: '75%'}}></div>
              </div>
            </div>
            <div className='space-y-4 mt-4'>
              <div className='flex justify-between items-center'>
                <span className='text-gray-400'>Weekly Sharpe Ratio</span>
                <span className='text-blue-400 font-bold'>1.42</span>
              </div>
              <div className='w-full bg-gray-700 rounded-full h-2.5'>
                <div className='bg-blue-500 h-2.5 rounded-full' style={{ width: '85%'}}></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  )};

export default WorkingDashboard;




`
