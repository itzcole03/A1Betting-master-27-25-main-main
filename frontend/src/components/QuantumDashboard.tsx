import { motion} from "framer-  const [realTimeData, setRealTimeData] = useState({";
import React, { useEffect, useState} from 'react';
liveGames: 0,
  predictions: 0,
    accuracy: 0,
      profit: 0,
        neuralActivity: 0,
          quantumCoherence: 0,
            dataPoints: 0,
              processingSpeed: 0,
                confidence: 0,
                  activeBots: 0
  });

// Fetch real-time data from backend
useEffect(() => {
  const fetchRealTimeData = async () => {
    try {
      const [healthResponse, analyticsResponse] = await Promise.all([
        fetch('http://localhost:8000/api/health/all'),
        fetch('http://localhost:8000/api/analytics/advanced')
      ]);

      const healthData = await healthResponse.json();
      const analyticsData = await analyticsResponse.json();

      setRealTimeData({
        liveGames: healthData.models?.active_models || 0,
        predictions: healthData.models?.predictions_today || 0,
        accuracy: healthData.models?.model_accuracy || 0,
        profit: Math.round((analyticsData.performance_analytics?.model_performance?.roi_trend?.slice(-1)[0] || 0) * 100000),
        neuralActivity: healthData.performance?.cpu_usage || 0,
        quantumCoherence: Math.round((healthData.api_metrics?.cache_hit_rate || 0) * 100 * 100) / 100,
        dataPoints: analyticsData.machine_learning_insights?.data_points_processed || 0,
        processingSpeed: healthData.api_metrics?.requests_per_minute || 0,
        confidence: Math.round((analyticsData.machine_learning_insights?.model_confidence || 0) * 100 * 100) / 100,
        activeBots: healthData.models?.active_models || 0
      })} catch (error) {
      console.error('Failed to fetch real-time data:', error)}
  };

  fetchRealTimeData();

  // Refresh data every 30 seconds  
  const interval = setInterval(fetchRealTimeData, 30000);
  Brain,
    Target,
    DollarSign,
    TrendingUp,
    Activity,
    Zap,
    Atom,
    Users,
    Trophy,
//     BarChart3
} from 'lucide-react';

interface MetricCardProps {
  label: string,`n  value: string;,`n  icon: React.ElementType;
  change?: string
  trend?: 'up' | 'down';
  live?: boolean
  variant?: 'neural' | 'quantum' | 'profit' | 'default'}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon: Icon,
  change,
  trend,
  live,
  variant = 'default'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'neural':
        return 'bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-purple-600/20 border-purple-500/40';
      case 'quantum':
        return 'bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-cyan-600/20 border-cyan-500/40';
      case 'profit':
        return 'bg-gradient-to-br from-green-500/20 via-emerald-500/15 to-green-600/20 border-green-500/40';
      default:
        return 'bg-gradient-to-br from-slate-500/20 via-gray-500/15 to-slate-600/20 border-slate-500/40'}
  };

  return (
    <motion.div
      className={`quantum-card p-6 rounded-2xl relative overflow-hidden ${getVariantStyles()}`}
      whileHover={{ scale: 1.02, rotateY: 2}}
      transition={{ duration: 0.3}}
    >
      <div className='flex items-center justify-between mb-4'>
        <div className='p-3 rounded-xl bg-white/10'>
          <Icon className='w-6 h-6' />
        </div>
        {live && (
          <div className='flex items-center space-x-2'>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse' />
            <span className='text-xs text-green-400 font-mono'>LIVE</span>
          </div>
        )}
      </div>

      <div>
        <div className='text-3xl font-bold text-white mb-1'>{value}</div>
        <div className='text-sm text-gray-400 mb-2'>{label}</div>
        {change && (
          <div className={`text-xs font-semibold ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>`n          >
            {trend === 'up' ? '↗' : '↘'} {change}
          </div>
        )}
      </div>

      <div className='absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 animate-pulse opacity-50' />
    </motion.div>
  )};

const QuantumDashboard: React.FC = () => {
  const [realTimeData, setRealTimeData] = useState({
    liveGames: 23,
    predictions: 1247,
    accuracy: 87.3,
    profit: 24750,
    neuralActivity: 94.2,
    quantumCoherence: 99.97,
    dataPoints: 2847592,
    processingSpeed: 12,
    confidence: 91.5,
    activeBots: 47
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        liveGames: Math.max(15, prev.liveGames + Math.floor(Math.random() * 5 - 2)),
        predictions: prev.predictions + Math.floor(Math.random() * 100 + 20),
        accuracy: Math.min(99.9, Math.max(95, prev.accuracy + (Math.random() - 0.5) * 0.2)),
        profit: prev.profit + Math.floor(Math.random() * 2000 + 500),
        neuralActivity: Math.min(
          99.9,
          Math.max(90, prev.neuralActivity + (Math.random() - 0.5) * 1)
        ),
        quantumCoherence: Math.min(
          99.99,
          Math.max(99.9, prev.quantumCoherence + (Math.random() - 0.5) * 0.01)
        ),
        dataPoints: prev.dataPoints + Math.floor(Math.random() * 10000 + 5000),
        processingSpeed: Math.max(
          8,
          Math.min(20, prev.processingSpeed + Math.floor(Math.random() * 6 - 3))
        ),
        confidence: Math.min(99, Math.max(85, prev.confidence + (Math.random() - 0.5) * 2))
      }))}, 2000);

    return () => clearInterval(interval)}, [0]);

  return (
    <div className='space-y-8 animate-slide-in-up'>
      {/* Welcome Section */}
      <div className='text-center mb-12'>
        <div className='relative'>
          <h1 className='holographic text-6xl font-black mb-6 font-cyber relative z-10'>
            QUANTUM INTELLIGENCE COMMAND
          </h1>
          <p className='text-2xl text-gray-300 font-light relative z-10'>
            Real-time neural network analysis with quantum enhancement
          </p>
          <div className='text-lg text-electric-400 mt-4 font-mono'>
            {realTimeData.dataPoints.toLocaleString()} data points processed •{' '}
            {realTimeData.activeBots} AI agents active
          </div>
        </div>
      </div>

      {/* Real-Time Metrics Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        <MetricCard label='Neural Activity'
          value={`${isNaN(Number(realTimeData?.neuralActivity)) ? "N/A" : Number(realTimeData?.neuralActivity).toFixed(1)}%`}
          icon={Brain}
          change='+2.1%'
          trend='up'
          live={true}
          variant='neural'>`n        />
        <MetricCard label='Quantum Coherence'
          value={`${isNaN(Number(realTimeData?.quantumCoherence)) ? "N/A" : Number(realTimeData?.quantumCoherence).toFixed(2)}%`}
          icon={Atom}
          change='+0.03%'
          trend='up'
          live={true}
          variant='quantum'>`n        />
        <MetricCard label='Real-Time Accuracy'
          value={`${isNaN(Number(realTimeData?.accuracy)) ? "N/A" : Number(realTimeData?.accuracy).toFixed(1)}%`}
          icon={Target}
          change='+0.4%'
          trend='up'
          live={true}>`n        />
        <MetricCard label='Live Profit Stream'
          value={`$${realTimeData.profit.toLocaleString()}`}
          icon={TrendingUp}
          change='+$2.7K'
          trend='up'
          live={true}
          variant='profit'>`n        />
      </div>

      {/* Status Bar */}
      <div className='quantum-card rounded-2xl p-8'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold text-white font-cyber'>SYSTEM STATUS</h2>
          <div className='flex items-center space-x-2'>
            <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse' />
            <span className='text-green-400 font-bold font-cyber'>ALL SYSTEMS OPTIMAL</span>
          </div>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 text-center'>
          <div>
            <div className='text-3xl font-bold text-blue-400 mb-2'>{realTimeData.liveGames}</div>
            <div className='text-sm text-gray-400 font-mono'>Live Games</div>
          </div>
          <div>
            <div className='text-3xl font-bold text-purple-400 mb-2'>
              {realTimeData.predictions}
            </div>
            <div className='text-sm text-gray-400 font-mono'>Predictions Made</div>
          </div>
          <div>
            <div className='text-3xl font-bold text-yellow-400 mb-2'>
              {realTimeData.processingSpeed}ms
            </div>
            <div className='text-sm text-gray-400 font-mono'>Processing Speed</div>
          </div>
          <div>
            <div className='text-3xl font-bold text-green-400 mb-2'>
              {realTimeData.confidence.toFixed(1)}%
            </div>
            <div className='text-sm text-gray-400 font-mono'>Confidence Level</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <motion.div
          className='quantum-card p-8 rounded-2xl text-center cursor-pointer bg-gradient-to-br from-green-500/20 via-emerald-500/15 to-green-600/20 border-green-500/40'
          whileHover={{ scale: 1.05, rotateY: 5}}
          whileTap={{ scale: 0.95}}
        >
          <div className='text-6xl mb-4'>💰</div>
          <h3 className='text-2xl font-black mb-3 text-green-400 font-cyber'>MONEY MAKER</h3>
          <p className='text-gray-300 mb-6 text-sm'>
            Advanced profit optimization with neural networks
          </p>
          <div className='px-6 py-3 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition-colors'>
            ACTIVATE QUANTUM MODE
          </div>
        </motion.div>

        <motion.div
          className='quantum-card p-8 rounded-2xl text-center cursor-pointer bg-gradient-to-br from-yellow-500/20 via-orange-500/15 to-yellow-600/20 border-yellow-500/40'
          whileHover={{ scale: 1.05, rotateY: 5}}
          whileTap={{ scale: 0.95}}
        >
          <div className='text-6xl mb-4'>🏆</div>
          <h3 className='text-2xl font-black mb-3 text-yellow-400 font-cyber'>PRIZEPICKS PRO</h3>
          <p className='text-gray-300 mb-6 text-sm'>AI-powered prop analysis and optimization</p>
          <div className='px-6 py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors'>
            ANALYZE PROPS
          </div>
        </motion.div>

        <motion.div
          className='quantum-card p-8 rounded-2xl text-center cursor-pointer bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-purple-600/20 border-purple-500/40'
          whileHover={{ scale: 1.05, rotateY: 5}}
          whileTap={{ scale: 0.95}}
        >
          <div className='text-6xl mb-4'>🤖</div>
          <h3 className='text-2xl font-black mb-3 text-purple-400 font-cyber'>PROPGPT NEURAL</h3>
          <p className='text-gray-300 mb-6 text-sm'>AI assistant powered by quantum intelligence</p>
          <div className='px-6 py-3 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-400 transition-colors'>
            CHAT WITH AI
          </div>
        </motion.div>
      </div>
    </div>
  )};

export default QuantumDashboard;




`
