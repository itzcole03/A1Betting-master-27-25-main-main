import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Activity,
  TrendingUp,
  Zap,
  Target,
  Settings,
  BarChart3,
  Cpu,
  Layers,
  Network,
  GitBranch,
  Microscope,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Award,
  Gauge,
  Sparkles,
  Eye,
  Calculator,
  Atom,
  Binary,
  Play,
  Pause,
  Radar,
  AlertTriangle,
  XCircle,
  Server,
  Database,
  Cloud,
  Shield,
  Monitor,
  Wifi,
  Clock,
  Users,
  PieChart,
  LineChart,
  Layers3,
  Box,
  Workflow,
  Hexagon,
  ArrowUp,
  ArrowDown,
  Minus,
  ChevronRight,
  Home,
  BarChart2,
  Cog,
  Bell,
  Search,
  Filter,
  Download,
  Share,
  MoreVertical,
} from 'lucide-react';

interface ModelPerformanceMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  roc: number;
  predictionCount: number;
  successRate: number;
  averageConfidence: number;
  modelStatus: string;
  lastUpdated: string;
  trainingTime: number;
  inferenceTime: number;
  memoryUsage: number;
  cpuUsage: number;
  modelVersion: string;
  datasetSize: number;
  featureCount: number;
  hyperparameters: Record<string, any>;
}

interface SystemHealthMetrics {
  overallHealth: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkLatency: number;
  activeConnections: number;
  errorRate: number;
  uptime: number;
  responseTime: number;
  throughput: number;
  lastHealthCheck: string;
  services: Record<string, string>;
  alerts: Array<{ level: string; message: string; timestamp: string }>;
}

const UltraAdvancedMLDashboard: React.FC = () => {
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [systemHealth, setSystemHealth] = useState<SystemHealthMetrics>({
    overallHealth: 98.7,
    cpuUsage: 67.3,
    memoryUsage: 74.2,
    diskUsage: 45.8,
    networkLatency: 12,
    activeConnections: 247,
    errorRate: 0.03,
    uptime: 99.97,
    responseTime: 15,
    throughput: 1247,
    lastHealthCheck: new Date().toISOString(),
    services: {
      'neural-engine': 'healthy',
      'data-pipeline': 'healthy',
      'model-registry': 'healthy',
      'api-gateway': 'healthy',
    },
    alerts: [],
  });

  const [modelMetrics, setModelMetrics] = useState<ModelPerformanceMetrics[]>([
    {
      accuracy: 94.7,
      precision: 92.1,
      recall: 89.6,
      f1Score: 90.8,
      roc: 0.947,
      predictionCount: 15847,
      successRate: 87.3,
      averageConfidence: 91.2,
      modelStatus: 'active',
      lastUpdated: new Date().toISOString(),
      trainingTime: 3600,
      inferenceTime: 12,
      memoryUsage: 2.4,
      cpuUsage: 23.7,
      modelVersion: 'v2.1.3',
      datasetSize: 250000,
      featureCount: 47,
      hyperparameters: {
        learning_rate: 0.001,
        batch_size: 128,
        epochs: 100,
      },
    },
    {
      accuracy: 91.2,
      precision: 88.9,
      recall: 92.1,
      f1Score: 90.5,
      roc: 0.912,
      predictionCount: 12453,
      successRate: 85.7,
      averageConfidence: 88.9,
      modelStatus: 'training',
      lastUpdated: new Date().toISOString(),
      trainingTime: 7200,
      inferenceTime: 18,
      memoryUsage: 3.1,
      cpuUsage: 45.2,
      modelVersion: 'v2.2.0-beta',
      datasetSize: 400000,
      featureCount: 52,
      hyperparameters: {
        learning_rate: 0.0005,
        batch_size: 256,
        epochs: 150,
      },
    },
  ]);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Simulate real-time updates
        setSystemHealth(prev => ({
          ...prev,
          cpuUsage: Math.max(20, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10)),
          memoryUsage: Math.max(30, Math.min(95, prev.memoryUsage + (Math.random() - 0.5) * 8)),
          networkLatency: Math.max(
            5,
            Math.min(50, prev.networkLatency + (Math.random() - 0.5) * 5)
          ),
          activeConnections: Math.max(
            100,
            Math.min(500, prev.activeConnections + Math.floor((Math.random() - 0.5) * 20))
          ),
          lastHealthCheck: new Date().toISOString(),
        }));

        setModelMetrics(prev =>
          prev.map(model => ({
            ...model,
            accuracy: Math.max(85, Math.min(99, model.accuracy + (Math.random() - 0.5) * 2)),
            predictionCount: model.predictionCount + Math.floor(Math.random() * 100),
            cpuUsage: Math.max(10, Math.min(80, model.cpuUsage + (Math.random() - 0.5) * 10)),
          }))
        );
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400';
      case 'training':
        return 'text-yellow-400';
      case 'inactive':
        return 'text-gray-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const renderOverview = () => (
    <div className='space-y-8'>
      {/* System Health */}
      <div className='quantum-card p-6 rounded-2xl border border-green-500/20'>
        <h3 className='text-xl font-bold text-green-400 font-cyber mb-6 flex items-center'>
          <Activity className='w-6 h-6 mr-2' />
          SYSTEM HEALTH
        </h3>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
          <div className='text-center'>
            <div className='text-3xl font-bold text-green-400 font-cyber mb-2'>
              {systemHealth.overallHealth}%
            </div>
            <div className='text-gray-400 font-mono'>Overall Health</div>
            <div className='w-full bg-gray-700 rounded-full h-2 mt-2'>
              <div
                className='bg-green-400 h-2 rounded-full'
                style={{ width: `${systemHealth.overallHealth}%` }}
              ></div>
            </div>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-bold text-electric-400 font-cyber mb-2'>
              {systemHealth.cpuUsage.toFixed(1)}%
            </div>
            <div className='text-gray-400 font-mono'>CPU Usage</div>
            <div className='w-full bg-gray-700 rounded-full h-2 mt-2'>
              <div
                className='bg-electric-400 h-2 rounded-full'
                style={{ width: `${systemHealth.cpuUsage}%` }}
              ></div>
            </div>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-bold text-purple-400 font-cyber mb-2'>
              {systemHealth.memoryUsage.toFixed(1)}%
            </div>
            <div className='text-gray-400 font-mono'>Memory Usage</div>
            <div className='w-full bg-gray-700 rounded-full h-2 mt-2'>
              <div
                className='bg-purple-400 h-2 rounded-full'
                style={{ width: `${systemHealth.memoryUsage}%` }}
              ></div>
            </div>
          </div>
          <div className='text-center'>
            <div className='text-3xl font-bold text-cyan-400 font-cyber mb-2'>
              {systemHealth.networkLatency}ms
            </div>
            <div className='text-gray-400 font-mono'>Network Latency</div>
            <div className='w-full bg-gray-700 rounded-full h-2 mt-2'>
              <div
                className='bg-cyan-400 h-2 rounded-full'
                style={{ width: `${Math.min(100, systemHealth.networkLatency * 2)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Performance Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {modelMetrics.map((model, idx) => (
          <motion.div
            key={idx}
            className='quantum-card p-6 rounded-2xl border border-purple-500/20 hover:shadow-neon transition-all cursor-pointer'
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedModel(`model-${idx}`)}
          >
            <div className='flex items-center justify-between mb-4'>
              <h4 className='text-lg font-bold text-purple-400 font-cyber'>
                Neural Model {idx + 1}
              </h4>
              <div
                className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(model.modelStatus)} bg-gray-800`}
              >
                {model.modelStatus.toUpperCase()}
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <div className='text-2xl font-bold text-white font-cyber'>
                  {model.accuracy.toFixed(1)}%
                </div>
                <div className='text-gray-400 text-sm'>Accuracy</div>
              </div>
              <div>
                <div className='text-2xl font-bold text-electric-400 font-cyber'>
                  {model.predictionCount.toLocaleString()}
                </div>
                <div className='text-gray-400 text-sm'>Predictions</div>
              </div>
              <div>
                <div className='text-2xl font-bold text-green-400 font-cyber'>
                  {model.f1Score.toFixed(2)}
                </div>
                <div className='text-gray-400 text-sm'>F1 Score</div>
              </div>
              <div>
                <div className='text-2xl font-bold text-cyan-400 font-cyber'>
                  {model.inferenceTime}ms
                </div>
                <div className='text-gray-400 text-sm'>Response</div>
              </div>
            </div>

            <div className='mt-4 pt-4 border-t border-gray-600'>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-400'>Version: {model.modelVersion}</span>
                <span className='text-gray-400'>Features: {model.featureCount}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Services Status */}
      <div className='quantum-card p-6 rounded-2xl'>
        <h3 className='text-xl font-bold text-white font-cyber mb-6'>SERVICES STATUS</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {Object.entries(systemHealth.services).map(([service, status]) => (
            <div key={service} className='p-4 bg-gray-800/30 rounded-xl border border-gray-600/30'>
              <div className='flex items-center justify-between mb-2'>
                <span className='font-bold text-white font-mono capitalize'>
                  {service.replace('-', ' ')}
                </span>
                <div
                  className={`w-3 h-3 rounded-full ${status === 'healthy' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}
                ></div>
              </div>
              <div className='text-xs text-gray-400 font-mono'>{status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderModels = () => (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h3 className='text-2xl font-bold text-white font-cyber'>MODEL MANAGEMENT</h3>
        <div className='flex space-x-4'>
          <button className='flex items-center space-x-2 px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/40 rounded-lg hover:bg-green-500/30'>
            <Play className='w-4 h-4' />
            <span>Deploy New</span>
          </button>
          <button className='flex items-center space-x-2 px-4 py-2 bg-electric-500/20 text-electric-400 border border-electric-500/40 rounded-lg hover:bg-electric-500/30'>
            <RefreshCw className='w-4 h-4' />
            <span>Retrain All</span>
          </button>
        </div>
      </div>

      <div className='space-y-4'>
        {modelMetrics.map((model, idx) => (
          <div key={idx} className='quantum-card p-6 rounded-2xl'>
            <div className='flex items-center justify-between mb-4'>
              <h4 className='text-lg font-bold text-white'>Neural Model {idx + 1}</h4>
              <div className='flex space-x-2'>
                <button className='p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30'>
                  <Settings className='w-4 h-4' />
                </button>
                <button className='p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30'>
                  <Play className='w-4 h-4' />
                </button>
                <button className='p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30'>
                  <Pause className='w-4 h-4' />
                </button>
              </div>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
              <div className='text-center p-3 bg-gray-800/40 rounded-lg'>
                <div className='text-lg font-bold text-green-400'>{model.accuracy.toFixed(1)}%</div>
                <div className='text-xs text-gray-400'>Accuracy</div>
              </div>
              <div className='text-center p-3 bg-gray-800/40 rounded-lg'>
                <div className='text-lg font-bold text-blue-400'>{model.precision.toFixed(1)}%</div>
                <div className='text-xs text-gray-400'>Precision</div>
              </div>
              <div className='text-center p-3 bg-gray-800/40 rounded-lg'>
                <div className='text-lg font-bold text-purple-400'>{model.recall.toFixed(1)}%</div>
                <div className='text-xs text-gray-400'>Recall</div>
              </div>
              <div className='text-center p-3 bg-gray-800/40 rounded-lg'>
                <div className='text-lg font-bold text-cyan-400'>{model.f1Score.toFixed(2)}</div>
                <div className='text-xs text-gray-400'>F1 Score</div>
              </div>
              <div className='text-center p-3 bg-gray-800/40 rounded-lg'>
                <div className='text-lg font-bold text-yellow-400'>{model.inferenceTime}ms</div>
                <div className='text-xs text-gray-400'>Inference</div>
              </div>
              <div className='text-center p-3 bg-gray-800/40 rounded-lg'>
                <div className='text-lg font-bold text-orange-400'>
                  {model.predictionCount.toLocaleString()}
                </div>
                <div className='text-xs text-gray-400'>Predictions</div>
              </div>
            </div>

            <div className='mt-4 p-4 bg-gray-800/30 rounded-lg'>
              <div className='text-sm text-gray-300 mb-2 font-bold'>Hyperparameters</div>
              <div className='grid grid-cols-3 gap-4 text-sm'>
                {Object.entries(model.hyperparameters).map(([key, value]) => (
                  <div key={key} className='flex justify-between'>
                    <span className='text-gray-400'>{key}:</span>
                    <span className='text-electric-400'>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div
      className='space-y-8 animate-slide-in-up p-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className='text-center'>
        <div className='relative mb-6'>
          <div className='absolute inset-0 bg-purple-400/20 blur-3xl rounded-full' />
          <div className='relative text-6xl text-purple-400 float-element'>🧠</div>
        </div>
        <h1 className='holographic text-5xl font-black mb-4 font-cyber'>ML MODEL CENTER</h1>
        <p className='text-xl text-gray-400 font-mono'>
          Advanced machine learning model management and monitoring
        </p>
      </div>

      {/* Controls */}
      <div className='flex justify-center space-x-4'>
        <motion.button
          onClick={() => setSelectedView('overview')}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl border transition-all ${
            selectedView === 'overview'
              ? 'bg-purple-500/20 border-purple-500/40 text-purple-400'
              : 'bg-gray-800/40 border-gray-600/40 text-gray-300 hover:border-gray-500/60'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <BarChart3 className='w-4 h-4' />
          <span className='font-mono'>Overview</span>
        </motion.button>

        <motion.button
          onClick={() => setSelectedView('models')}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl border transition-all ${
            selectedView === 'models'
              ? 'bg-purple-500/20 border-purple-500/40 text-purple-400'
              : 'bg-gray-800/40 border-gray-600/40 text-gray-300 hover:border-gray-500/60'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Brain className='w-4 h-4' />
          <span className='font-mono'>Models</span>
        </motion.button>

        <motion.button
          onClick={() => setAutoRefresh(!autoRefresh)}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl border transition-all ${
            autoRefresh
              ? 'bg-green-500/20 border-green-500/40 text-green-400'
              : 'bg-gray-800/40 border-gray-600/40 text-gray-300'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
          <span className='font-mono'>Auto Refresh</span>
        </motion.button>
      </div>

      {/* Content */}
      {selectedView === 'overview' ? renderOverview() : renderModels()}
    </motion.div>
  );
};

export default UltraAdvancedMLDashboard;
