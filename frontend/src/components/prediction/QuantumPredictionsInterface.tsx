import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Atom,
  Zap,
  Target,
  Brain,
  TrendingUp,
  BarChart3,
  Settings,
  Eye,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Layers,
  Network,
  Cpu,
  Activity,
} from 'lucide-react';

interface QuantumPredictionRequest {
  event_id: string;
  sport: string;
  features: Record<string, number>;
  target_accuracy: number;
  optimization_strategy: string;
  uncertainty_method: string;
}

interface QuantumPredictionResult {
  event_id: string;
  prediction: {
    base_prediction: number;
    quantum_correction: number;
    final_prediction: number;
    uncertainty_bounds: [number, number];
  };
  quantum_metrics: {
    entanglement_score: number;
    coherence_measure: number;
    quantum_advantage: number;
    fidelity: number;
    decoherence_time: number;
    entangled_features: string[];
  };
  processing_metrics: {
    total_processing_time: number;
    feature_engineering_time: number;
    prediction_time: number;
  };
}

const QuantumPredictionsInterface: React.FC = () => {
  const [predictionRequest, setPredictionRequest] = useState<QuantumPredictionRequest>({
    event_id: '',
    sport: 'basketball',
    features: {},
    target_accuracy: 0.95,
    optimization_strategy: 'quantum_ensemble',
    uncertainty_method: 'deep_ensembles',
  });

  const [predictionResult, setPredictionResult] = useState<QuantumPredictionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [quantumState, setQuantumState] = useState({
    superposition: 0,
    entanglement: 0,
    coherence: 0,
    decoherence: 0,
  });

  // Simulate quantum state changes
  useEffect(() => {
    const interval = setInterval(() => {
      setQuantumState(prev => ({
        superposition: Math.max(0, Math.min(100, prev.superposition + (Math.random() - 0.5) * 10)),
        entanglement: Math.max(0, Math.min(100, prev.entanglement + (Math.random() - 0.5) * 8)),
        coherence: Math.max(0, Math.min(100, prev.coherence + (Math.random() - 0.5) * 5)),
        decoherence: Math.max(0, Math.min(100, prev.decoherence + (Math.random() - 0.5) * 3)),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const generateQuantumPrediction = useCallback(async () => {
    if (!predictionRequest.event_id) {
      alert('Please enter an event ID');
      return;
    }

    setIsProcessing(true);
    setProcessingStage('Initializing quantum processors...');

    // Simulate quantum processing stages
    const stages = [
      'Preparing quantum superposition...',
      'Entangling feature vectors...',
      'Applying quantum gates...',
      'Measuring quantum states...',
      'Calculating quantum corrections...',
      'Finalizing prediction...',
    ];

    for (let i = 0; i < stages.length; i++) {
      setProcessingStage(stages[i]);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Generate mock prediction result
    const basePrediction = Math.random() * 100;
    const quantumCorrection = (Math.random() - 0.5) * 10;
    const finalPrediction = basePrediction + quantumCorrection;

    const result: QuantumPredictionResult = {
      event_id: predictionRequest.event_id,
      prediction: {
        base_prediction: basePrediction,
        quantum_correction: quantumCorrection,
        final_prediction: finalPrediction,
        uncertainty_bounds: [finalPrediction - 5, finalPrediction + 5],
      },
      quantum_metrics: {
        entanglement_score: Math.random() * 0.9 + 0.1,
        coherence_measure: Math.random() * 0.8 + 0.2,
        quantum_advantage: Math.random() * 0.3 + 0.1,
        fidelity: Math.random() * 0.1 + 0.9,
        decoherence_time: Math.random() * 100 + 50,
        entangled_features: ['player_performance', 'weather_conditions', 'team_dynamics'],
      },
      processing_metrics: {
        total_processing_time: Math.random() * 2000 + 1000,
        feature_engineering_time: Math.random() * 500 + 200,
        prediction_time: Math.random() * 300 + 100,
      },
    };

    setPredictionResult(result);
    setIsProcessing(false);
    setProcessingStage('');
  }, [predictionRequest]);

  const addSampleFeatures = () => {
    setPredictionRequest(prev => ({
      ...prev,
      features: {
        player_performance: 85.5,
        weather_temperature: 72,
        team_momentum: 0.65,
        injury_impact: 0.2,
        venue_advantage: 0.8,
        recent_form: 4.2,
      },
    }));
  };

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
          <div className='absolute inset-0 bg-cyan-400/20 blur-3xl rounded-full' />
          <div className='relative text-6xl text-cyan-400 float-element'>⚛️</div>
        </div>
        <h1 className='holographic text-5xl font-black mb-4 font-cyber'>QUANTUM PREDICTIONS</h1>
        <p className='text-xl text-gray-400 font-mono'>
          Quantum-enhanced prediction engine with superposition algorithms
        </p>
      </div>

      {/* Quantum Status */}
      <div className='quantum-card p-6 rounded-2xl border border-cyan-500/20'>
        <h3 className='text-lg font-bold text-cyan-400 font-cyber mb-4'>QUANTUM STATE MONITOR</h3>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {Object.entries(quantumState).map(([key, value]) => (
            <div key={key} className='text-center p-4 bg-gray-800/40 rounded-xl'>
              <div className='text-2xl font-bold text-cyan-400 font-cyber'>{value.toFixed(1)}%</div>
              <div className='text-sm text-gray-400 font-mono capitalize'>{key}</div>
              <div className='w-full bg-gray-700 rounded-full h-2 mt-2'>
                <div
                  className='bg-cyan-400 h-2 rounded-full transition-all duration-500'
                  style={{ width: `${value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Configuration */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className='quantum-card p-6 rounded-2xl'>
          <h3 className='text-lg font-bold text-electric-400 font-cyber mb-4'>
            PREDICTION PARAMETERS
          </h3>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-bold mb-2 text-gray-300'>Event ID</label>
              <input
                type='text'
                value={predictionRequest.event_id}
                onChange={e =>
                  setPredictionRequest(prev => ({ ...prev, event_id: e.target.value }))
                }
                placeholder='Enter event identifier'
                className='w-full p-3 rounded-xl border border-gray-600 bg-gray-900/50 text-white'
              />
            </div>

            <div>
              <label className='block text-sm font-bold mb-2 text-gray-300'>Sport</label>
              <select
                value={predictionRequest.sport}
                onChange={e => setPredictionRequest(prev => ({ ...prev, sport: e.target.value }))}
                className='w-full p-3 rounded-xl border border-gray-600 bg-gray-900/50 text-white'
              >
                <option value='basketball'>Basketball</option>
                <option value='football'>Football</option>
                <option value='baseball'>Baseball</option>
                <option value='soccer'>Soccer</option>
                <option value='hockey'>Hockey</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-bold mb-2 text-gray-300'>Target Accuracy</label>
              <input
                type='range'
                min='0.5'
                max='0.99'
                step='0.01'
                value={predictionRequest.target_accuracy}
                onChange={e =>
                  setPredictionRequest(prev => ({
                    ...prev,
                    target_accuracy: parseFloat(e.target.value),
                  }))
                }
                className='w-full'
              />
              <div className='text-center text-cyan-400 font-mono'>
                {(predictionRequest.target_accuracy * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        <div className='quantum-card p-6 rounded-2xl'>
          <h3 className='text-lg font-bold text-purple-400 font-cyber mb-4'>
            QUANTUM CONFIGURATION
          </h3>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-bold mb-2 text-gray-300'>
                Optimization Strategy
              </label>
              <select
                value={predictionRequest.optimization_strategy}
                onChange={e =>
                  setPredictionRequest(prev => ({ ...prev, optimization_strategy: e.target.value }))
                }
                className='w-full p-3 rounded-xl border border-gray-600 bg-gray-900/50 text-white'
              >
                <option value='quantum_ensemble'>Quantum Ensemble</option>
                <option value='neural_architecture_search'>Neural Architecture Search</option>
                <option value='meta_learning'>Meta Learning</option>
                <option value='bayesian_optimization'>Bayesian Optimization</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-bold mb-2 text-gray-300'>
                Uncertainty Method
              </label>
              <select
                value={predictionRequest.uncertainty_method}
                onChange={e =>
                  setPredictionRequest(prev => ({ ...prev, uncertainty_method: e.target.value }))
                }
                className='w-full p-3 rounded-xl border border-gray-600 bg-gray-900/50 text-white'
              >
                <option value='deep_ensembles'>Deep Ensembles</option>
                <option value='bayesian_neural_network'>Bayesian Neural Network</option>
                <option value='monte_carlo_dropout'>Monte Carlo Dropout</option>
                <option value='conformal_prediction'>Conformal Prediction</option>
              </select>
            </div>

            <div className='p-4 bg-purple-500/10 rounded-xl border border-purple-500/30'>
              <h4 className='font-bold text-purple-400 mb-2'>Quantum Features Active</h4>
              <div className='space-y-1 text-sm text-gray-300'>
                <div className='flex items-center space-x-2'>
                  <CheckCircle className='w-4 h-4 text-green-400' />
                  <span>Superposition-based ensemble modeling</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <CheckCircle className='w-4 h-4 text-green-400' />
                  <span>Feature entanglement analysis</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <CheckCircle className='w-4 h-4 text-green-400' />
                  <span>Quantum coherence optimization</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Input */}
      <div className='quantum-card p-6 rounded-2xl'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-bold text-green-400 font-cyber'>FEATURE VECTOR INPUT</h3>
          {Object.keys(predictionRequest.features).length === 0 && (
            <button
              onClick={addSampleFeatures}
              className='px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/40 rounded-lg hover:bg-green-500/30 transition-all'
            >
              Add Sample Features
            </button>
          )}
        </div>

        {Object.keys(predictionRequest.features).length > 0 ? (
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            {Object.entries(predictionRequest.features).map(([key, value]) => (
              <div key={key}>
                <label className='block text-sm font-bold mb-2 text-gray-300 capitalize'>
                  {key.replace('_', ' ')}
                </label>
                <input
                  type='number'
                  step='0.1'
                  value={value}
                  onChange={e =>
                    setPredictionRequest(prev => ({
                      ...prev,
                      features: { ...prev.features, [key]: parseFloat(e.target.value) },
                    }))
                  }
                  className='w-full p-3 rounded-xl border border-gray-600 bg-gray-900/50 text-white'
                />
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-8 text-gray-400'>
            <p>No features configured. Add sample features to get started.</p>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <div className='text-center'>
        <motion.button
          onClick={generateQuantumPrediction}
          disabled={isProcessing || !predictionRequest.event_id}
          className='flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-2xl hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 disabled:opacity-50 mx-auto'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isProcessing ? (
            <>
              <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
              <span>QUANTUM PROCESSING...</span>
            </>
          ) : (
            <>
              <Atom className='w-5 h-5' />
              <span>GENERATE QUANTUM PREDICTION</span>
            </>
          )}
        </motion.button>

        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='mt-4 text-cyan-400 font-mono'
          >
            {processingStage}
          </motion.div>
        )}
      </div>

      {/* Results */}
      {predictionResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='grid grid-cols-1 lg:grid-cols-2 gap-8'
        >
          {/* Prediction Output */}
          <div className='quantum-card p-6 rounded-2xl border border-green-500/20'>
            <h3 className='text-lg font-bold text-green-400 font-cyber mb-4 flex items-center'>
              <Target className='w-5 h-5 mr-2' />
              PREDICTION OUTPUT
            </h3>
            <div className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='text-center p-4 bg-gray-800/40 rounded-xl'>
                  <div className='text-2xl font-bold text-gray-300'>
                    {predictionResult.prediction.base_prediction.toFixed(2)}
                  </div>
                  <div className='text-sm text-gray-400'>Base Prediction</div>
                </div>
                <div className='text-center p-4 bg-gray-800/40 rounded-xl'>
                  <div
                    className={`text-2xl font-bold ${
                      predictionResult.prediction.quantum_correction > 0
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {predictionResult.prediction.quantum_correction > 0 ? '+' : ''}
                    {predictionResult.prediction.quantum_correction.toFixed(2)}
                  </div>
                  <div className='text-sm text-gray-400'>Quantum Correction</div>
                </div>
              </div>

              <div className='bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-6 rounded-2xl border border-cyan-500/30'>
                <div className='text-center'>
                  <div className='text-4xl font-bold text-cyan-400 font-cyber mb-2'>
                    {predictionResult.prediction.final_prediction.toFixed(2)}
                  </div>
                  <div className='text-lg text-white font-bold'>QUANTUM ENHANCED PREDICTION</div>
                  <div className='text-sm text-gray-300 mt-2'>
                    Uncertainty: [{predictionResult.prediction.uncertainty_bounds[0].toFixed(2)},{' '}
                    {predictionResult.prediction.uncertainty_bounds[1].toFixed(2)}]
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quantum Metrics */}
          <div className='quantum-card p-6 rounded-2xl border border-purple-500/20'>
            <h3 className='text-lg font-bold text-purple-400 font-cyber mb-4 flex items-center'>
              <Brain className='w-5 h-5 mr-2' />
              QUANTUM METRICS
            </h3>
            <div className='space-y-3'>
              {Object.entries(predictionResult.quantum_metrics)
                .filter(([key]) => key !== 'entangled_features')
                .map(([key, value]) => (
                  <div
                    key={key}
                    className='flex justify-between items-center p-3 bg-gray-800/40 rounded-lg'
                  >
                    <span className='text-gray-300 font-mono capitalize'>
                      {key.replace('_', ' ')}
                    </span>
                    <span className='text-purple-400 font-bold'>
                      {typeof value === 'number' ? value.toFixed(3) : value}
                    </span>
                  </div>
                ))}
            </div>

            <div className='mt-4 p-4 bg-purple-500/10 rounded-xl border border-purple-500/30'>
              <div className='text-sm font-bold text-purple-400 mb-2'>Entangled Features</div>
              <div className='flex flex-wrap gap-2'>
                {predictionResult.quantum_metrics.entangled_features.map((feature, idx) => (
                  <span
                    key={idx}
                    className='px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs font-mono'
                  >
                    {feature.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuantumPredictionsInterface;
