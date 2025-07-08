import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  TrendingUp,
  Activity,
  Cpu,
  BarChart3,
  Eye,
  Target,
  Zap,
  AlertTriangle,
  RefreshCw,
  Settings,
  ChevronDown,
  ChevronUp,
  Filter,
  Download,
} from 'lucide-react';
import { Layout } from '../../core/Layout';

interface ModelMetrics {
  id: string;
  name: string;
  type: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  roi: number;
  sharpeRatio: number;
  status: 'active' | 'training' | 'inactive';
  predictions: number;
  weight: number;
}

interface FeatureImportance {
  feature: string;
  importance: number;
  category: string;
  trend: 'up' | 'down' | 'stable';
}

interface PredictionMetrics {
  totalPredictions: number;
  correctPredictions: number;
  accuracy: number;
  avgConfidence: number;
  avgROI: number;
  topPerformingMarkets: Array<{
    market: string;
    accuracy: number;
    count: number;
  }>;
}

const Analytics: React.FC = () => {
  const [models, setModels] = useState<ModelMetrics[]>([]);
  const [featureImportance, setFeatureImportance] = useState<FeatureImportance[]>([]);
  const [predictionMetrics, setPredictionMetrics] = useState<PredictionMetrics | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('7d');
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadAnalyticsData();
  }, [selectedModel, timeRange]);

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    try {
      // Mock data - replace with real API calls
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockModels: ModelMetrics[] = [
        {
          id: 'xgb-001',
          name: 'XGBoost Ensemble',
          type: 'xgboost',
          accuracy: 97.2,
          precision: 94.8,
          recall: 92.1,
          f1Score: 93.4,
          roi: 23.7,
          sharpeRatio: 1.85,
          status: 'active',
          predictions: 1247,
          weight: 0.35,
        },
        {
          id: 'lstm-001',
          name: 'LSTM Predictor',
          type: 'lstm',
          accuracy: 96.8,
          precision: 93.2,
          recall: 95.1,
          f1Score: 94.1,
          roi: 21.3,
          sharpeRatio: 1.72,
          status: 'active',
          predictions: 987,
          weight: 0.3,
        },
        {
          id: 'nn-001',
          name: 'Neural Network',
          type: 'neural_network',
          accuracy: 95.1,
          precision: 92.7,
          recall: 93.8,
          f1Score: 93.2,
          roi: 18.9,
          sharpeRatio: 1.58,
          status: 'active',
          predictions: 1156,
          weight: 0.25,
        },
        {
          id: 'rf-001',
          name: 'Random Forest',
          type: 'random_forest',
          accuracy: 94.6,
          precision: 91.3,
          recall: 92.4,
          f1Score: 91.8,
          roi: 16.8,
          sharpeRatio: 1.44,
          status: 'active',
          predictions: 892,
          weight: 0.1,
        },
      ];

      const mockFeatures: FeatureImportance[] = [
        { feature: 'Team Recent Form', importance: 0.18, category: 'Performance', trend: 'up' },
        { feature: 'Player Injuries', importance: 0.15, category: 'Health', trend: 'stable' },
        { feature: 'Weather Conditions', importance: 0.12, category: 'Environment', trend: 'up' },
        { feature: 'Home Advantage', importance: 0.11, category: 'Context', trend: 'down' },
        {
          feature: 'Head-to-Head Record',
          importance: 0.09,
          category: 'Historical',
          trend: 'stable',
        },
        { feature: 'Player Props Average', importance: 0.08, category: 'Statistics', trend: 'up' },
        { feature: 'Market Sentiment', importance: 0.07, category: 'Social', trend: 'up' },
        { feature: 'Rest Days', importance: 0.06, category: 'Schedule', trend: 'stable' },
        { feature: 'Travel Distance', importance: 0.05, category: 'Logistics', trend: 'down' },
        { feature: 'Referee Impact', importance: 0.04, category: 'Officials', trend: 'stable' },
      ];

      const mockMetrics: PredictionMetrics = {
        totalPredictions: 4282,
        correctPredictions: 4089,
        accuracy: 95.5,
        avgConfidence: 87.3,
        avgROI: 20.2,
        topPerformingMarkets: [
          { market: 'Player Props', accuracy: 96.8, count: 1547 },
          { market: 'Total Points', accuracy: 94.2, count: 1203 },
          { market: 'Spread', accuracy: 93.7, count: 892 },
          { market: 'Moneyline', accuracy: 91.4, count: 640 },
        ],
      };

      setModels(mockModels);
      setFeatureImportance(mockFeatures);
      setPredictionMetrics(mockMetrics);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDetails = (modelId: string) => {
    setShowDetails(prev => ({
      ...prev,
      [modelId]: !prev[modelId],
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-500/20';
      case 'training':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'inactive':
        return 'text-gray-400 bg-gray-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className='w-4 h-4 text-green-400' />;
      case 'down':
        return <TrendingUp className='w-4 h-4 text-red-400 rotate-180' />;
      case 'stable':
        return <Activity className='w-4 h-4 text-gray-400' />;
      default:
        return null;
    }
  };

  return (
    <Layout
      title='ML Analytics'
      subtitle='47+ Machine Learning Models • Advanced Performance Analytics'
      headerActions={
        <div className='flex items-center space-x-3'>
          <select
            value={timeRange}
            onChange={e => setTimeRange(e.target.value)}
            className='px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400'
          >
            <option value='1d'>Last 24 Hours</option>
            <option value='7d'>Last 7 Days</option>
            <option value='30d'>Last 30 Days</option>
            <option value='90d'>Last 90 Days</option>
          </select>

          <select
            value={selectedModel}
            onChange={e => setSelectedModel(e.target.value)}
            className='px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400'
          >
            <option value='all'>All Models</option>
            {models.map(model => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>

          <button
            onClick={loadAnalyticsData}
            disabled={isLoading}
            className='flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 rounded-lg text-white font-medium transition-all disabled:opacity-50'
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      }
    >
      {/* Overview Metrics */}
      {predictionMetrics && (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6'
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-400 text-sm'>Total Predictions</p>
                <p className='text-2xl font-bold text-white'>
                  {predictionMetrics.totalPredictions.toLocaleString()}
                </p>
                <p className='text-xs text-cyan-300 mt-1'>All models combined</p>
              </div>
              <Target className='w-8 h-8 text-cyan-400' />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6'
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-400 text-sm'>Accuracy</p>
                <p className='text-2xl font-bold text-green-400'>{predictionMetrics.accuracy}%</p>
                <p className='text-xs text-green-300 mt-1'>+2.3% this week</p>
              </div>
              <Brain className='w-8 h-8 text-green-400' />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6'
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-400 text-sm'>Average ROI</p>
                <p className='text-2xl font-bold text-purple-400'>+{predictionMetrics.avgROI}%</p>
                <p className='text-xs text-purple-300 mt-1'>Weighted by confidence</p>
              </div>
              <TrendingUp className='w-8 h-8 text-purple-400' />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6'
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-400 text-sm'>Confidence</p>
                <p className='text-2xl font-bold text-yellow-400'>
                  {predictionMetrics.avgConfidence}%
                </p>
                <p className='text-xs text-yellow-300 mt-1'>Model consensus</p>
              </div>
              <Zap className='w-8 h-8 text-yellow-400' />
            </div>
          </motion.div>
        </div>
      )}

      {/* Model Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6 mb-8'
      >
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h3 className='text-xl font-bold text-white'>Model Performance</h3>
            <p className='text-gray-400 text-sm'>Individual model metrics and ensemble weights</p>
          </div>
          <div className='flex items-center space-x-2'>
            <Cpu className='w-5 h-5 text-purple-400' />
            <span className='text-purple-400 text-sm font-medium'>Ensemble Active</span>
          </div>
        </div>

        <div className='space-y-4'>
          {models.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className='bg-slate-900/50 border border-slate-700/50 rounded-lg overflow-hidden'
            >
              <div
                className='p-4 cursor-pointer hover:bg-slate-800/30 transition-colors'
                onClick={() => toggleDetails(model.id)}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                    <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center'>
                      <Brain className='w-6 h-6 text-white' />
                    </div>
                    <div>
                      <h4 className='font-bold text-white'>{model.name}</h4>
                      <div className='flex items-center space-x-4 text-sm text-gray-400'>
                        <span>Type: {model.type}</span>
                        <span>•</span>
                        <span>Weight: {model.weight * 100}%</span>
                        <span>•</span>
                        <span>{model.predictions} predictions</span>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center space-x-6'>
                    <div className='text-center'>
                      <div className='text-lg font-bold text-green-400'>{model.accuracy}%</div>
                      <div className='text-xs text-gray-400'>Accuracy</div>
                    </div>
                    <div className='text-center'>
                      <div className='text-lg font-bold text-purple-400'>+{model.roi}%</div>
                      <div className='text-xs text-gray-400'>ROI</div>
                    </div>
                    <div className='text-center'>
                      <div className='text-lg font-bold text-cyan-400'>{model.sharpeRatio}</div>
                      <div className='text-xs text-gray-400'>Sharpe</div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(model.status)}`}
                    >
                      {model.status.toUpperCase()}
                    </span>

                    {showDetails[model.id] ? (
                      <ChevronUp className='w-5 h-5 text-gray-400' />
                    ) : (
                      <ChevronDown className='w-5 h-5 text-gray-400' />
                    )}
                  </div>
                </div>
              </div>

              {showDetails[model.id] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className='border-t border-slate-700/50 p-4 bg-slate-900/30'
                >
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    <div>
                      <div className='text-sm text-gray-400'>Precision</div>
                      <div className='text-lg font-bold text-white'>{model.precision}%</div>
                    </div>
                    <div>
                      <div className='text-sm text-gray-400'>Recall</div>
                      <div className='text-lg font-bold text-white'>{model.recall}%</div>
                    </div>
                    <div>
                      <div className='text-sm text-gray-400'>F1 Score</div>
                      <div className='text-lg font-bold text-white'>{model.f1Score}%</div>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <button className='px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm hover:bg-cyan-500/30 transition-colors'>
                        Retrain
                      </button>
                      <button className='px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-sm hover:bg-purple-500/30 transition-colors'>
                        Analyze
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Feature Importance & Market Performance */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Feature Importance */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6'
        >
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h3 className='text-xl font-bold text-white'>Feature Importance</h3>
              <p className='text-gray-400 text-sm'>Global feature impact across all models</p>
            </div>
            <Eye className='w-5 h-5 text-cyan-400' />
          </div>

          <div className='space-y-3'>
            {featureImportance.map((feature, index) => (
              <motion.div
                key={feature.feature}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.05 }}
                className='flex items-center justify-between p-3 bg-slate-900/50 rounded-lg'
              >
                <div className='flex items-center space-x-3'>
                  {getTrendIcon(feature.trend)}
                  <div>
                    <div className='font-medium text-white'>{feature.feature}</div>
                    <div className='text-xs text-gray-400'>{feature.category}</div>
                  </div>
                </div>

                <div className='flex items-center space-x-3'>
                  <div className='w-24 bg-slate-700 rounded-full h-2'>
                    <div
                      className='bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full transition-all duration-500'
                      style={{ width: `${feature.importance * 100}%` }}
                    />
                  </div>
                  <span className='text-sm font-medium text-white w-12 text-right'>
                    {(feature.importance * 100).toFixed(1)}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Market Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
          className='bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6'
        >
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h3 className='text-xl font-bold text-white'>Market Performance</h3>
              <p className='text-gray-400 text-sm'>Accuracy by betting market type</p>
            </div>
            <BarChart3 className='w-5 h-5 text-green-400' />
          </div>

          {predictionMetrics && (
            <div className='space-y-4'>
              {predictionMetrics.topPerformingMarkets.map((market, index) => (
                <motion.div
                  key={market.market}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                  className='p-4 bg-slate-900/50 rounded-lg'
                >
                  <div className='flex items-center justify-between mb-2'>
                    <h4 className='font-medium text-white'>{market.market}</h4>
                    <span className='text-green-400 font-bold'>{market.accuracy}%</span>
                  </div>

                  <div className='flex items-center justify-between text-sm text-gray-400'>
                    <span>{market.count} predictions</span>
                    <div className='w-24 bg-slate-700 rounded-full h-2'>
                      <div
                        className='bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full transition-all duration-500'
                        style={{ width: `${market.accuracy}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default Analytics;
