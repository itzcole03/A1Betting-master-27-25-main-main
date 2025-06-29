import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Brain,
  Activity,
  Zap,
  Eye,
  PieChart,
  LineChart,
} from 'lucide-react';

interface AnalyticsMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  category: string;
}

interface ModelPerformance {
  name: string;
  accuracy: number;
  status: 'active' | 'training' | 'offline';
  color: string;
}

const UniversalAnalytics: React.FC = () => {
  const [activeView, setActiveView] = useState('overview');
  const [realTimeData, setRealTimeData] = useState({
    accuracy: 87.3,
    dataPoints: 2847592,
    neuralNetworks: 47,
    confidence: 91.5,
    processingSpeed: 12,
  });

  const modelPerformance: ModelPerformance[] = [
    { name: 'XGBoost', accuracy: 89.2, status: 'active', color: 'text-green-400' },
    { name: 'Neural Net', accuracy: 91.7, status: 'active', color: 'text-electric-400' },
    { name: 'Ensemble', accuracy: 94.1, status: 'active', color: 'text-cyan-400' },
    { name: 'Deep Learning', accuracy: 87.8, status: 'training', color: 'text-yellow-400' },
    { name: 'Quantum Core', accuracy: 96.3, status: 'active', color: 'text-purple-400' },
  ];

  const analyticsMetrics: AnalyticsMetric[] = [
    {
      id: '1',
      name: 'Prediction Accuracy',
      value: 94.1,
      change: 2.3,
      trend: 'up',
      category: 'performance',
    },
    {
      id: '2',
      name: 'Data Quality Score',
      value: 98.3,
      change: 0.7,
      trend: 'up',
      category: 'data',
    },
    {
      id: '3',
      name: 'Model Confidence',
      value: 91.5,
      change: -0.2,
      trend: 'down',
      category: 'performance',
    },
    {
      id: '4',
      name: 'Processing Speed',
      value: 12,
      change: -15.2,
      trend: 'up',
      category: 'system',
    },
    { id: '5', name: 'Neural Networks', value: 47, change: 4.4, trend: 'up', category: 'system' },
    { id: '6', name: 'Win Rate', value: 73.2, change: 3.1, trend: 'up', category: 'betting' },
    { id: '7', name: 'ROI', value: 247, change: 12.8, trend: 'up', category: 'betting' },
    { id: '8', name: 'Sharpe Ratio', value: 2.84, change: 0.15, trend: 'up', category: 'betting' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        accuracy: 87.3 + Math.random() * 0.4,
        dataPoints: 2847592 + Math.floor(Math.random() * 1000),
        confidence: 91.5 + Math.random() * 0.8,
        processingSpeed: 12 + Math.random() * 2,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const views = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'models', name: 'Model Performance', icon: Brain },
    { id: 'realtime', name: 'Real-time Data', icon: Activity },
    { id: 'betting', name: 'Betting Analytics', icon: TrendingUp },
  ];

  const renderOverview = () => (
    <div className='space-y-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {analyticsMetrics.slice(0, 4).map(metric => (
          <motion.div
            key={metric.id}
            className='quantum-card p-6 rounded-2xl'
            whileHover={{ scale: 1.02 }}
          >
            <div className='flex justify-between items-start mb-3'>
              <h3 className='text-lg font-bold text-white'>{metric.name}</h3>
              <div
                className={`flex items-center space-x-1 ${
                  metric.trend === 'up'
                    ? 'text-green-400'
                    : metric.trend === 'down'
                      ? 'text-red-400'
                      : 'text-gray-400'
                }`}
              >
                <TrendingUp className='w-4 h-4' />
                <span className='text-sm font-mono'>
                  {metric.change > 0 ? '+' : ''}
                  {metric.change}%
                </span>
              </div>
            </div>
            <div className='text-3xl font-bold text-electric-400 font-cyber mb-2'>
              {metric.category === 'system' && metric.name === 'Processing Speed'
                ? `${metric.value}ms`
                : metric.category === 'betting' && metric.name === 'ROI'
                  ? `+${metric.value}%`
                  : `${metric.value}${metric.name.includes('Rate') || metric.name.includes('Score') || metric.name.includes('Accuracy') || metric.name.includes('Confidence') ? '%' : ''}`}
            </div>
            <div className='text-sm text-gray-400 font-mono capitalize'>
              {metric.category} Metric
            </div>
          </motion.div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className='quantum-card p-8 rounded-2xl'>
          <h3 className='text-2xl font-bold text-white mb-6 font-cyber'>NEURAL NETWORK STATUS</h3>
          <div className='space-y-4'>
            {modelPerformance.slice(0, 3).map((model, index) => (
              <div
                key={index}
                className='flex justify-between items-center p-4 bg-gray-800/30 rounded-xl'
              >
                <div>
                  <div className='font-bold text-white'>{model.name}</div>
                  <div className='text-sm text-gray-400 font-mono'>
                    Status:{' '}
                    <span
                      className={model.status === 'active' ? 'text-green-400' : 'text-yellow-400'}
                    >
                      {model.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className={`text-2xl font-bold font-cyber ${model.color}`}>
                  {model.accuracy.toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='quantum-card p-8 rounded-2xl'>
          <h3 className='text-2xl font-bold text-white mb-6 font-cyber'>REAL-TIME METRICS</h3>
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <span className='text-gray-300 font-mono'>Data Processing</span>
              <span className='text-electric-400 font-bold'>
                {realTimeData.dataPoints.toLocaleString()} points
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-300 font-mono'>Neural Networks</span>
              <span className='text-green-400 font-bold'>
                {realTimeData.neuralNetworks}/47 Active
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-300 font-mono'>Response Time</span>
              <span className='text-cyan-400 font-bold'>
                {realTimeData.processingSpeed.toFixed(1)}ms
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-300 font-mono'>System Confidence</span>
              <span className='text-purple-400 font-bold'>
                {realTimeData.confidence.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModels = () => (
    <div className='space-y-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {modelPerformance.map((model, index) => (
          <motion.div
            key={index}
            className='quantum-card p-6 rounded-2xl'
            whileHover={{ scale: 1.02 }}
          >
            <div className='flex items-center space-x-3 mb-4'>
              <Brain className={`w-6 h-6 ${model.color}`} />
              <h3 className='text-xl font-bold text-white'>{model.name}</h3>
            </div>

            <div className='text-center mb-4'>
              <div className={`text-4xl font-bold font-cyber ${model.color}`}>
                {model.accuracy.toFixed(1)}%
              </div>
              <div className='text-gray-400 font-mono'>Accuracy</div>
            </div>

            <div
              className={`text-center px-4 py-2 rounded-xl ${
                model.status === 'active'
                  ? 'bg-green-500/20 text-green-400'
                  : model.status === 'training'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-red-500/20 text-red-400'
              }`}
            >
              <div className='font-bold font-cyber'>{model.status.toUpperCase()}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className='quantum-card p-8 rounded-2xl'>
        <h3 className='text-2xl font-bold text-white mb-6 font-cyber'>MODEL COMPARISON</h3>
        <div className='space-y-4'>
          {modelPerformance.map((model, index) => (
            <div key={index} className='flex items-center space-x-4'>
              <div className='w-32 text-white font-mono'>{model.name}</div>
              <div className='flex-1 bg-gray-700 rounded-full h-3 overflow-hidden'>
                <motion.div
                  className={`h-full ${model.color.replace('text-', 'bg-')}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${model.accuracy}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
              <div className={`w-16 text-right font-bold ${model.color}`}>
                {model.accuracy.toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRealtime = () => (
    <div className='space-y-8'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <motion.div className='quantum-card p-6 rounded-2xl' whileHover={{ scale: 1.02 }}>
          <div className='text-3xl font-bold text-electric-400 font-cyber'>
            {realTimeData.accuracy.toFixed(1)}%
          </div>
          <div className='text-gray-400 font-mono'>Live Accuracy</div>
        </motion.div>
        <motion.div className='quantum-card p-6 rounded-2xl' whileHover={{ scale: 1.02 }}>
          <div className='text-3xl font-bold text-green-400 font-cyber'>
            {realTimeData.dataPoints.toLocaleString()}
          </div>
          <div className='text-gray-400 font-mono'>Data Points</div>
        </motion.div>
        <motion.div className='quantum-card p-6 rounded-2xl' whileHover={{ scale: 1.02 }}>
          <div className='text-3xl font-bold text-purple-400 font-cyber'>
            {realTimeData.processingSpeed.toFixed(1)}ms
          </div>
          <div className='text-gray-400 font-mono'>Response Time</div>
        </motion.div>
        <motion.div className='quantum-card p-6 rounded-2xl' whileHover={{ scale: 1.02 }}>
          <div className='text-3xl font-bold text-cyan-400 font-cyber'>
            {realTimeData.confidence.toFixed(1)}%
          </div>
          <div className='text-gray-400 font-mono'>Confidence</div>
        </motion.div>
      </div>

      <div className='quantum-card p-8 rounded-2xl'>
        <h3 className='text-2xl font-bold text-white mb-6 font-cyber'>SYSTEM PERFORMANCE</h3>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div>
            <h4 className='text-lg font-bold text-electric-400 mb-4'>Neural Network Load</h4>
            <div className='space-y-3'>
              {[1, 2, 3, 4, 5].map(net => (
                <div key={net} className='flex items-center space-x-3'>
                  <span className='text-gray-400 font-mono w-20'>Net #{net * 9 + 5}</span>
                  <div className='flex-1 bg-gray-700 rounded-full h-2'>
                    <div
                      className='h-full bg-electric-400 rounded-full animate-pulse'
                      style={{ width: `${Math.random() * 40 + 60}%` }}
                    />
                  </div>
                  <span className='text-electric-400 font-mono text-sm'>
                    {(Math.random() * 40 + 60).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className='text-lg font-bold text-electric-400 mb-4'>Data Quality Metrics</h4>
            <div className='space-y-3'>
              <div className='flex justify-between'>
                <span className='text-gray-300'>Completeness</span>
                <span className='text-green-400 font-bold'>99.2%</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-300'>Accuracy</span>
                <span className='text-electric-400 font-bold'>98.7%</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-300'>Consistency</span>
                <span className='text-cyan-400 font-bold'>97.9%</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-300'>Timeliness</span>
                <span className='text-purple-400 font-bold'>99.8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBetting = () => (
    <div className='space-y-8'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {analyticsMetrics
          .filter(m => m.category === 'betting')
          .map(metric => (
            <motion.div
              key={metric.id}
              className='quantum-card p-6 rounded-2xl'
              whileHover={{ scale: 1.02 }}
            >
              <h3 className='text-lg font-bold text-white mb-3'>{metric.name}</h3>
              <div className='text-4xl font-bold text-green-400 font-cyber mb-2'>
                {metric.name === 'ROI'
                  ? `+${metric.value}%`
                  : metric.name === 'Sharpe Ratio'
                    ? metric.value.toFixed(2)
                    : `${metric.value}%`}
              </div>
              <div
                className={`text-sm font-mono ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}
              >
                {metric.change > 0 ? '↗' : '↘'} {Math.abs(metric.change)}% this week
              </div>
            </motion.div>
          ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className='quantum-card p-8 rounded-2xl'>
          <h3 className='text-2xl font-bold text-white mb-6 font-cyber'>PROFIT BREAKDOWN</h3>
          <div className='space-y-4'>
            <div className='flex justify-between items-center p-4 bg-gray-800/30 rounded-xl'>
              <span className='text-gray-300'>NBA Props</span>
              <span className='text-green-400 font-bold'>+$12,450</span>
            </div>
            <div className='flex justify-between items-center p-4 bg-gray-800/30 rounded-xl'>
              <span className='text-gray-300'>NFL Props</span>
              <span className='text-green-400 font-bold'>+$8,720</span>
            </div>
            <div className='flex justify-between items-center p-4 bg-gray-800/30 rounded-xl'>
              <span className='text-gray-300'>MLB Props</span>
              <span className='text-green-400 font-bold'>+$3,580</span>
            </div>
            <div className='flex justify-between items-center p-4 bg-green-500/20 rounded-xl border border-green-500/30'>
              <span className='text-white font-bold'>Total Profit</span>
              <span className='text-green-400 font-bold text-xl'>+$24,750</span>
            </div>
          </div>
        </div>

        <div className='quantum-card p-8 rounded-2xl'>
          <h3 className='text-2xl font-bold text-white mb-6 font-cyber'>RISK METRICS</h3>
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <span className='text-gray-300'>Maximum Drawdown</span>
              <span className='text-red-400 font-bold'>-4.2%</span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-300'>Value at Risk (95%)</span>
              <span className='text-yellow-400 font-bold'>$1,247</span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-300'>Kelly Criterion</span>
              <span className='text-electric-400 font-bold'>12.4%</span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-300'>Confidence Interval</span>
              <span className='text-cyan-400 font-bold'>94.7%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return renderOverview();
      case 'models':
        return renderModels();
      case 'realtime':
        return renderRealtime();
      case 'betting':
        return renderBetting();
      default:
        return renderOverview();
    }
  };

  return (
    <motion.div
      className='space-y-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className='text-center mb-8'>
        <h1 className='text-4xl font-bold text-white mb-4 animate-cyber-pulse holographic font-cyber'>
          ADVANCED ANALYTICS HUB
        </h1>
        <p className='text-purple-400 text-lg font-mono'>
          Deep Learning Performance Metrics & Intelligence
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className='flex justify-center space-x-4 mb-8'>
        {views.map(view => {
          const Icon = view.icon;
          return (
            <motion.button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${
                activeView === view.id
                  ? 'bg-electric-500/20 text-electric-400 border-2 border-electric-500/40'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className='w-5 h-5' />
              <span className='font-bold font-cyber'>{view.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Content */}
      <motion.div
        key={activeView}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    </motion.div>
  );
};

export default UniversalAnalytics;
