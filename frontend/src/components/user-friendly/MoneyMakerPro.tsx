import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Brain,
  Target,
  TrendingUp,
  Zap,
  RefreshCw,
  Eye,
  Save,
  Filter,
} from 'lucide-react';
import { lineupTracker } from '../../services/lineupTrackingService';
import toast from 'react-hot-toast';
import QuantumFilters from '../filters/QuantumFilters';
import FluentLiveFilters from '../filters/FluentLiveFilters';
import { useFilters, ALL_SPORTS, PRIMARY_SPORTS, MISC_SPORTS } from '../../hooks/useFilters';
import { useFluentFilters, useFilteredResults } from '../../hooks/useFluentFilters';
import { useQuantumPredictions } from '../../hooks/useQuantumPredictions';

interface BettingConfig {
  investment: number;
  strategy: string;
  confidence: number;
  portfolio: number;
  sports: string;
  riskLevel: string;
  timeFrame: string;
  leagues: string[];
  maxOdds: number;
  minOdds: number;
  playerTypes: string;
  weatherFilter: boolean;
  injuryFilter: boolean;
  lineMovement: string;
}

interface MoneyMakerResults {
  investment: number;
  multiplier: number;
  payout: number;
  accuracy: number;
  picks: Array<{
    game: string;
    pick: string;
    confidence: number;
    odds: string;
    neural: string;
    reason: string;
  }>;
  quantumBoost: boolean;
  processingTime: string;
  neuralNetworks: number;
  filters: BettingConfig;
}

const MoneyMakerPro: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [config, setConfig] = useState<BettingConfig>({
    investment: 1000,
    strategy: 'quantum',
    confidence: 95,
    portfolio: 4,
    sports: 'all',
    riskLevel: 'moderate',
    timeFrame: 'today',
    leagues: ['nba', 'nfl'],
    maxOdds: -150,
    minOdds: -300,
    playerTypes: 'all',
    weatherFilter: true,
    injuryFilter: true,
    lineMovement: 'any',
  });
  const [results, setResults] = useState<MoneyMakerResults | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [lineupName, setLineupName] = useState('');
  const [showQuantumFilters, setShowQuantumFilters] = useState(false);
  const { filters: oldFilters, updateFilters: updateOldFilters } = useFilters();
  const { filters: fluentFilters, updateFilters: updateFluentFilters } = useFluentFilters();
  const { totalItems: totalOpportunities, filteredItems: filteredOpportunities } =
    useFilteredResults(fluentFilters, 89);
  const {
    predictions: quantumPredictions,
    systemState: quantumState,
    getQuantumInsight,
    getNetworkStatus,
    highConfidencePredictions,
  } = useQuantumPredictions({ minConfidence: 85 });

  const saveLineup = () => {
    if (!results || !lineupName.trim()) {
      toast.error('Please enter a lineup name');
      return;
    }

    const picks = results.picks.map(pick => ({
      id: `pick_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      description: pick.pick,
      confidence: pick.confidence,
    }));

    const lineupId = lineupTracker.saveMoneyMakerLineup(
      lineupName,
      picks,
      results.investment,
      results.payout,
      results.accuracy
    );

    toast.success(`💰 Money Maker lineup "${lineupName}" saved!`, {
      duration: 3000,
      style: {
        background: '#1f2937',
        color: '#10b981',
        border: '1px solid #10b981',
      },
    });

    setShowSaveModal(false);
    setLineupName('');
  };

  const activateQuantumAI = async () => {
    setLoading(true);
    setTimeout(() => {
      // Apply quantum filter bonuses
      const sportsBonus = fluentFilters.sport === 'all' ? 1.15 : 1.05; // Single sport bonus
      const filterBonus = sportsBonus + fluentFilters.confidence / 1000;
      const timeFrameBonus = fluentFilters.timeFrame === 'live' ? 1.15 : 1.0;

      const multiplier =
        Math.pow(2.1, config.portfolio) *
        (config.confidence / 100) *
        1.2 *
        filterBonus *
        timeFrameBonus *
        neuralBonus;

      // Use quantum predictions for picks
      const selectedPredictions = quantumPredictions
        .filter(
          pred => fluentFilters.sport === 'all' || pred.sport.toLowerCase() === fluentFilters.sport
        )
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, config.portfolio);

      const quantumPicks = selectedPredictions.map(pred => ({
        game: pred.game,
        pick: pred.player ? `${pred.player} ${pred.prediction}` : pred.prediction,
        confidence: pred.confidence,
        odds: pred.odds
          ? pred.odds.current > 2.0
            ? `+${Math.round((pred.odds.current - 1) * 100)}`
            : `-${Math.round(100 / (pred.odds.current - 1))}`
          : '-110',
        neural: pred.neuralNetwork,
        reason: getQuantumInsight(pred),
      }));

      setResults({
        investment: config.investment,
        multiplier: multiplier,
        payout: config.investment * multiplier,
        accuracy: quantumState.accuracy,
        picks: quantumPicks,
        quantumBoost: quantumState.quantumBoostActive,
        processingTime: `${Math.floor(500 + Math.random() * 500)}ms`,
        neuralNetworks: quantumState.activeNetworks + (fluentFilters.sport === 'all' ? 36 : 12),
        filters: config,
      });
      setLoading(false);
    }, 3500);
  };

  return (
    <motion.div
      className='space-y-10 animate-slide-in-up'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Enhanced Hero Section */}
      <div className='text-center mb-16 quantum-card rounded-3xl p-16 shadow-neon border-2 border-green-500/30'>
        <div className='relative mb-8'>
          <h1 className='holographic text-7xl font-black mb-6 font-cyber'>QUANTUM MONEY MAKER</h1>
          <div className='text-2xl text-gray-300 font-mono'>
            Neural-Enhanced Profit Generation System
          </div>
        </div>

        <div className='relative mb-8'>
          <div className='absolute inset-0 bg-green-400/20 blur-3xl'></div>
          <div className='relative text-8xl font-black text-green-400 mb-6 animate-cyber-pulse font-cyber'>
            $∞
          </div>
          <div className='text-xl text-electric-400 font-mono'>
            UNLIMITED NEURAL PROFIT POTENTIAL
          </div>
        </div>

        <div className='grid grid-cols-4 gap-8 mb-8'>
          <div className='text-center'>
            <div className='text-4xl font-bold text-electric-400 font-cyber'>∞%</div>
            <div className='text-gray-400 font-mono'>Neural ROI</div>
          </div>
          <div className='text-center'>
            <div className='text-4xl font-bold text-purple-400 font-cyber'>
              {quantumState.accuracy.toFixed(1)}%
            </div>
            <div className='text-gray-400 font-mono'>Quantum Accuracy</div>
          </div>
          <div className='text-center'>
            <div className='text-4xl font-bold text-cyan-400 font-cyber'>
              {quantumState.coherence.toFixed(1)}%
            </div>
            <div className='text-gray-400 font-mono'>Coherence</div>
          </div>
          <div className='text-center'>
            <div className='text-4xl font-bold text-blue-400 font-cyber'>{getNetworkStatus()}</div>
            <div className='text-gray-400 font-mono'>Neural Status</div>
          </div>
        </div>
      </div>

      {/* Unified Quantum Control Center */}
      <motion.div
        className='quantum-card rounded-3xl p-10 border-2 border-electric-500/30 shadow-neon mb-12'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Control Center Header */}
        <div className='flex items-center space-x-4 mb-10'>
          <Brain className='text-4xl text-electric-400 animate-neural-pulse' />
          <div className='flex-1'>
            <h2 className='text-4xl font-bold text-electric-400 holographic font-cyber mb-2'>
              QUANTUM CONTROL CENTER
            </h2>
            <div className='text-gray-400 font-mono'>
              Neural Matrix • AI Configuration • Filter System
            </div>
          </div>
          <div className='flex space-x-3'>
            <motion.button
              onClick={() => setShowQuantumFilters(!showQuantumFilters)}
              className='flex items-center space-x-2 px-4 py-2 rounded-xl bg-electric-500/20 border border-electric-500/40 text-electric-400 hover:bg-electric-500/30 transition-all font-cyber font-bold text-sm'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className={`w-4 h-4 ${showQuantumFilters ? 'animate-pulse' : ''}`} />
              <span>FILTERS</span>
            </motion.button>
          </div>
        </div>

        {/* Core Configuration Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
          {/* Left Panel: Investment & Strategy */}
          <div className='space-y-6'>
            <div className='quantum-card p-6 rounded-2xl border border-green-500/30'>
              <h3 className='text-lg font-bold text-green-400 font-cyber mb-4 flex items-center space-x-2'>
                <DollarSign className='w-5 h-5' />
                <span>INVESTMENT MATRIX</span>
              </h3>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-bold mb-2 text-green-400 font-cyber'>
                    AMOUNT ($)
                  </label>
                  <input
                    type='number'
                    min='100'
                    max='10000'
                    step='100'
                    value={config.investment}
                    onChange={e => setConfig({ ...config, investment: parseInt(e.target.value) })}
                    className='w-full p-3 rounded-xl text-center font-bold text-lg border-2 border-green-500/30 focus:border-green-500 bg-gray-900/50 text-green-400'
                  />
                </div>
                <div>
                  <label className='block text-sm font-bold mb-2 text-green-400 font-cyber'>
                    STRATEGY
                  </label>
                  <select
                    value={config.strategy}
                    onChange={e => setConfig({ ...config, strategy: e.target.value })}
                    className='w-full p-3 rounded-xl border-2 border-green-500/30 focus:border-green-500 bg-gray-900/50 text-white font-cyber'
                  >
                    <option value='quantum'>Quantum Enhanced</option>
                    <option value='aggressive'>Aggressive Growth</option>
                    <option value='conservative'>Conservative Steady</option>
                    <option value='balanced'>Balanced Portfolio</option>
                  </select>
                </div>
              </div>
            </div>

            <div className='quantum-card p-6 rounded-2xl border border-blue-500/30'>
              <h3 className='text-lg font-bold text-blue-400 font-cyber mb-4 flex items-center space-x-2'>
                <Target className='w-5 h-5' />
                <span>PRECISION CONTROLS</span>
              </h3>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-bold mb-3 text-blue-400 font-cyber'>
                    CONFIDENCE: {config.confidence}%
                  </label>
                  <input
                    type='range'
                    min='80'
                    max='99'
                    value={config.confidence}
                    onChange={e => setConfig({ ...config, confidence: parseInt(e.target.value) })}
                    className='w-full h-2 bg-gray-700 rounded-lg appearance-none slider-thumb'
                  />
                  <div className='flex justify-between text-xs text-gray-400 mt-1 font-mono'>
                    <span>Safe (80%)</span>
                    <span>Maximum (99%)</span>
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-bold mb-2 text-blue-400 font-cyber'>
                    PORTFOLIO SIZE
                  </label>
                  <select
                    value={config.portfolio}
                    onChange={e => setConfig({ ...config, portfolio: parseInt(e.target.value) })}
                    className='w-full p-3 rounded-xl border-2 border-blue-500/30 focus:border-blue-500 bg-gray-900/50 text-white font-cyber'
                  >
                    <option value={2}>2 Picks (Safe)</option>
                    <option value={3}>3 Picks (Balanced)</option>
                    <option value={4}>4 Picks (Optimal)</option>
                    <option value={5}>5 Picks (Aggressive)</option>
                    <option value={6}>6 Picks (Maximum)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Quantum Status & Filters */}
          <div className='space-y-6'>
            {/* Quantum Predictions Status */}
            <div className='quantum-card p-6 rounded-2xl border border-cyan-500/30'>
              <h3 className='text-lg font-bold text-cyan-400 font-cyber mb-4 flex items-center space-x-2'>
                <Zap className='w-5 h-5 animate-pulse' />
                <span>QUANTUM NEURAL ENGINE</span>
              </h3>
              <div className='space-y-3'>
                <div className='flex items-center justify-between p-3 bg-gray-800/30 rounded-lg'>
                  <span className='text-gray-300 font-mono text-sm'>Network Status</span>
                  <span className='text-cyan-400 font-cyber font-bold text-sm'>
                    {getNetworkStatus()}
                  </span>
                </div>
                <div className='flex items-center justify-between p-3 bg-gray-800/30 rounded-lg'>
                  <span className='text-gray-300 font-mono text-sm'>Active Predictions</span>
                  <span className='text-electric-400 font-cyber font-bold text-sm'>
                    {quantumPredictions.length}
                  </span>
                </div>
                <div className='flex items-center justify-between p-3 bg-gray-800/30 rounded-lg'>
                  <span className='text-gray-300 font-mono text-sm'>Quantum Boost</span>
                  <span
                    className={`font-cyber font-bold text-sm ${quantumState.quantumBoostActive ? 'text-green-400' : 'text-gray-400'}`}
                  >
                    {quantumState.quantumBoostActive ? 'ACTIVE' : 'STANDBY'}
                  </span>
                </div>
                <div className='text-center p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30'>
                  <div className='text-xs text-cyan-400 font-mono mb-1'>Quantum Coherence</div>
                  <div className='text-lg font-bold text-cyan-400 font-cyber'>
                    {quantumState.coherence.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>

            <FluentLiveFilters
              filters={fluentFilters}
              onFiltersChange={updateFluentFilters}
              totalGames={totalOpportunities}
              filteredGames={filteredOpportunities}
              className='border border-electric-500/20 shadow-neon'
            />

            <div className='quantum-card p-6 rounded-2xl border border-purple-500/30'>
              <h3 className='text-lg font-bold text-purple-400 font-cyber mb-4 flex items-center space-x-2'>
                <TrendingUp className='w-5 h-5' />
                <span>QUICK SETTINGS</span>
              </h3>
              <div className='space-y-4'>
                <div className='flex items-center justify-between p-3 bg-gray-800/30 rounded-lg'>
                  <span className='text-gray-300 font-mono text-sm'>Neural Enhancement</span>
                  <span className='text-green-400 font-cyber font-bold text-sm'>AUTO</span>
                </div>
                <div className='flex items-center justify-between p-3 bg-gray-800/30 rounded-lg'>
                  <span className='text-gray-300 font-mono text-sm'>Risk Protocol</span>
                  <select
                    value={config.riskLevel}
                    onChange={e => setConfig({ ...config, riskLevel: e.target.value })}
                    className='bg-gray-900/50 text-white text-sm rounded px-2 py-1 border border-gray-600 font-cyber'
                  >
                    <option value='conservative'>Conservative</option>
                    <option value='moderate'>Balanced</option>
                    <option value='aggressive'>Aggressive</option>
                    <option value='maximum'>Maximum</option>
                  </select>
                </div>
                <div className='text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/30'>
                  <div className='text-xs text-purple-400 font-mono mb-1'>
                    Advanced Neural Modules
                  </div>
                  <div className='text-sm text-gray-300'>Configure in Admin Panel</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Sections */}
        {showQuantumFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className='border-t border-electric-500/30 pt-8 mt-8'
          >
            <QuantumFilters
              filters={oldFilters}
              onFiltersChange={updateOldFilters}
              showAdvanced={true}
              className='border-2 border-electric-500/30 shadow-neon'
            />
          </motion.div>
        )}

        {showAdvancedFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className='border-t border-purple-500/30 pt-8 mt-8'
          >
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='quantum-card p-6 rounded-2xl border border-purple-500/30'>
                <h4 className='text-lg font-bold text-purple-400 font-cyber mb-4'>
                  NEURAL NETWORKS
                </h4>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between p-3 bg-gray-800/50 rounded-lg'>
                    <span className='text-gray-300 font-mono text-sm'>Active Networks</span>
                    <span className='text-purple-400 font-cyber font-bold'>47</span>
                  </div>
                  <div className='flex items-center justify-between p-3 bg-gray-800/50 rounded-lg'>
                    <span className='text-gray-300 font-mono text-sm'>Processing Power</span>
                    <span className='text-electric-400 font-cyber font-bold'>∞ TFLOPS</span>
                  </div>
                </div>
              </div>

              <div className='quantum-card p-6 rounded-2xl border border-cyan-500/30'>
                <h4 className='text-lg font-bold text-cyan-400 font-cyber mb-4'>DATA STREAMS</h4>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between p-3 bg-gray-800/50 rounded-lg'>
                    <span className='text-gray-300 font-mono text-sm'>Live Sources</span>
                    <span className='text-cyan-400 font-cyber font-bold'>1,247</span>
                  </div>
                  <div className='flex items-center justify-between p-3 bg-gray-800/50 rounded-lg'>
                    <span className='text-gray-300 font-mono text-sm'>Update Rate</span>
                    <span className='text-green-400 font-cyber font-bold'>&lt;1ms</span>
                  </div>
                </div>
              </div>

              <div className='quantum-card p-6 rounded-2xl border border-yellow-500/30'>
                <h4 className='text-lg font-bold text-yellow-400 font-cyber mb-4'>
                  QUANTUM STATUS
                </h4>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between p-3 bg-gray-800/50 rounded-lg'>
                    <span className='text-gray-300 font-mono text-sm'>Entanglement</span>
                    <span className='text-yellow-400 font-cyber font-bold'>ACTIVE</span>
                  </div>
                  <div className='flex items-center justify-between p-3 bg-gray-800/50 rounded-lg'>
                    <span className='text-gray-300 font-mono text-sm'>Coherence</span>
                    <span className='text-electric-400 font-cyber font-bold'>99.7%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quantum Activation Button */}
        <div className='text-center mt-8 pt-8 border-t border-electric-500/30'>
          <motion.button
            onClick={activateQuantumAI}
            disabled={loading}
            className={`px-16 py-6 rounded-2xl font-bold text-2xl transition-all duration-300 ${
              loading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-electric-500 hover:from-green-400 hover:to-electric-400 text-black shadow-neon'
            }`}
            whileHover={!loading ? { scale: 1.05 } : {}}
            whileTap={!loading ? { scale: 0.95 } : {}}
          >
            {loading ? (
              <div className='flex items-center space-x-4'>
                <RefreshCw className='w-7 h-7 animate-spin' />
                <span className='font-cyber'>QUANTUM PROCESSING...</span>
              </div>
            ) : (
              <div className='flex items-center space-x-4'>
                <Zap className='w-7 h-7' />
                <span className='font-cyber'>ACTIVATE QUANTUM AI</span>
              </div>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Results Section */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='quantum-card rounded-3xl p-10 border-2 border-green-500/30'
        >
          <div className='text-center mb-8'>
            <h2 className='text-4xl font-bold text-green-400 holographic font-cyber mb-4'>
              QUANTUM RESULTS GENERATED
            </h2>
            <div className='text-lg text-gray-300 font-mono'>
              Neural networks analyzed {results.neuralNetworks} data streams in{' '}
              {results.processingTime}
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
            <div className='text-center quantum-card p-6 rounded-2xl'>
              <div className='text-3xl font-bold text-green-400 font-cyber mb-2'>
                ${results.investment.toLocaleString()}
              </div>
              <div className='text-gray-400 font-mono'>Investment</div>
            </div>
            <div className='text-center quantum-card p-6 rounded-2xl'>
              <div className='text-3xl font-bold text-electric-400 font-cyber mb-2'>
                {results.multiplier.toFixed(2)}x
              </div>
              <div className='text-gray-400 font-mono'>Neural Multiplier</div>
            </div>
            <div className='text-center quantum-card p-6 rounded-2xl'>
              <div className='text-3xl font-bold text-yellow-400 font-cyber mb-2'>
                ${results.payout.toLocaleString()}
              </div>
              <div className='text-gray-400 font-mono'>Projected Payout</div>
            </div>
          </div>

          <div className='space-y-4'>
            <h3 className='text-2xl font-bold text-white font-cyber mb-4'>
              NEURAL RECOMMENDATIONS
            </h3>
            {results.picks.map((pick, index) => (
              <div key={index} className='quantum-card p-6 rounded-2xl border border-green-500/20'>
                <div className='flex justify-between items-start mb-3'>
                  <div>
                    <div className='text-lg font-bold text-white'>{pick.game}</div>
                    <div className='text-electric-400 font-bold'>{pick.pick}</div>
                  </div>
                  <div className='text-right'>
                    <div className='text-green-400 font-bold text-lg'>
                      {pick.confidence.toFixed(1)}%
                    </div>
                    <div className='text-gray-400 font-mono'>{pick.odds}</div>
                  </div>
                </div>
                <div className='text-sm text-gray-300 mb-2'>{pick.reason}</div>
                <div className='text-xs text-purple-400 font-mono'>Processed by {pick.neural}</div>
              </div>
            ))}
          </div>

          <div className='mt-8 flex justify-center space-x-4'>
            <motion.button
              onClick={() => setShowSaveModal(true)}
              className='flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-400 hover:to-purple-400 transition-all duration-300'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Save className='w-5 h-5' />
              <span>SAVE LINEUP</span>
            </motion.button>
            <motion.button
              className='px-8 py-4 bg-gradient-to-r from-green-500 to-yellow-500 text-black font-bold rounded-xl hover:from-green-400 hover:to-yellow-400 transition-all duration-300'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              EXECUTE NEURAL STRATEGY
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Save Lineup Modal */}
      {showSaveModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
          onClick={() => setShowSaveModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className='quantum-card rounded-2xl p-8 max-w-md w-full'
            onClick={e => e.stopPropagation()}
          >
            <h3 className='text-2xl font-bold text-electric-400 mb-6 font-cyber'>
              SAVE MONEY MAKER LINEUP
            </h3>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-bold mb-2 text-gray-300'>Lineup Name</label>
                <input
                  type='text'
                  value={lineupName}
                  onChange={e => setLineupName(e.target.value)}
                  placeholder='Enter lineup name...'
                  className='w-full p-3 rounded-lg bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:border-electric-400 focus:outline-none'
                />
              </div>
              <div className='flex space-x-4 pt-4'>
                <button
                  onClick={saveLineup}
                  className='flex-1 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-400 transition-all'
                >
                  Save Lineup
                </button>
                <button
                  onClick={() => setShowSaveModal(false)}
                  className='flex-1 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 transition-all'
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MoneyMakerPro;
