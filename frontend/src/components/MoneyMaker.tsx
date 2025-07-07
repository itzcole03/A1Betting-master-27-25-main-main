import { motion } from 'framer-motion';
import { Brain, Cpu, Target, Zap } from 'lucide-react';
import React, { useState } from 'react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useAppContext } from '../contexts/AppContext';

interface MoneyMakerConfig {
  investment: number;
  strategy: 'quantum' | 'neural' | 'aggressive' | 'conservative';
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
  homeAdvantage?: boolean;
  travelFatigue?: boolean;
  hotStreaks?: boolean;
  matchupHistory?: boolean;
  fadePublic?: boolean;
  followSharps?: boolean;
}

interface PickResult {
  game: string;
  pick: string;
  confidence: number;
  odds: string;
  neural: string;
  reason: string;
}

interface Results {
  investment: number;
  multiplier: number;
  payout: number;
  accuracy: number;
  picks: PickResult[];
  quantumBoost: boolean;
  processingTime: string;
  neuralNetworks: number;
  filters: MoneyMakerConfig;
}

export const MoneyMaker: React.FC = () => {
  const { loading, setLoading, setNotification } = useAppContext();
  const [config, setConfig] = useState<MoneyMakerConfig>({
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
  const [results, setResults] = useState<Results | null>(null);

  const activateQuantumAI = async () => {
    setLoading(true);
    setNotification('Quantum AI is processing your picks...');
    setTimeout(() => {
      const multiplier = Math.pow(2.1, config.portfolio) * (config.confidence / 100) * 1.2;
      const mockResults: Results = {
        investment: config.investment,
        multiplier: multiplier,
        payout: config.investment * multiplier,
        accuracy: 94.7 + Math.random() * 4,
        picks: [
          {
            game: 'Lakers vs Warriors',
            pick: 'LeBron Over 25.5 Points',
            confidence: 96.2,
            odds: '-110',
            neural: 'Network #23',
            reason: 'Weather optimal, no injuries, line moved 2pts',
          },
          {
            game: 'Chiefs vs Bills',
            pick: 'Mahomes Over 275.5 Yards',
            confidence: 93.7,
            odds: '-105',
            neural: 'Network #15',
            reason: 'Bills defense allows 12% more vs elite QBs',
          },
          {
            game: 'Celtics vs Heat',
            pick: 'Tatum Over 27.5 Points',
            confidence: 91.8,
            odds: '-115',
            neural: 'Network #41',
            reason: 'Miami missing key defender, pace increase',
          },
          {
            game: 'Rams vs 49ers',
            pick: 'Kupp Over 6.5 Receptions',
            confidence: 89.4,
            odds: '-120',
            neural: 'Network #07',
            reason: 'Slot coverage weakness, injury report clean',
          },
        ].slice(0, config.portfolio),
        quantumBoost: true,
        processingTime: '847ms',
        neuralNetworks: 47,
        filters: config,
      };

      setResults(mockResults);
      setLoading(false);
      setNotification('Quantum AI picks are ready!');
    }, 3500);
  };

  return (
    <div className='space-y-8'>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-center'
      >
        <Card className='p-12 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/30'>
          <h1 className='text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-4'>
            QUANTUM MONEY MAKER
          </h1>
          <p className='text-xl text-gray-300 mb-8'>Neural-Enhanced Profit Generation System</p>

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className='text-8xl font-black text-green-400 mb-6'
          >
            $∞
          </motion.div>

          <p className='text-lg text-emerald-400 mb-8'>UNLIMITED NEURAL PROFIT POTENTIAL</p>

          <div className='grid grid-cols-3 gap-8 max-w-2xl mx-auto'>
            <div>
              <div className='text-3xl font-bold text-emerald-400'>∞%</div>
              <div className='text-gray-400'>Neural ROI</div>
            </div>
            <div>
              <div className='text-3xl font-bold text-purple-400'>99.7%</div>
              <div className='text-gray-400'>Quantum Accuracy</div>
            </div>
            <div>
              <div className='text-3xl font-bold text-blue-400'>&lt;1ms</div>
              <div className='text-gray-400'>Neural Response</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Configuration Panel */}
      <Card className='p-8'>
        <div className='flex items-center gap-3 mb-8'>
          <Brain className='h-8 w-8 text-emerald-400' />
          <h2 className='text-3xl font-bold text-emerald-400'>QUANTUM AI CONFIGURATION</h2>
        </div>

        {/* Basic Configuration */}
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8'>
          <div className='space-y-2'>
            <label htmlFor='investment' className='text-sm font-bold text-emerald-400'>
              INVESTMENT ($)
            </label>
            <input
              id='investment'
              type='number'
              value={config.investment}
              onChange={e => setConfig({ ...config, investment: parseInt(e.target.value) || 0 })}
              className='w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white'
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor='strategy' className='text-sm font-bold text-emerald-400'>
              STRATEGY
            </label>
            <select
              id='strategy'
              value={config.strategy}
              onChange={e => setConfig({ ...config, strategy: e.target.value as any })}
              className='w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white'
            >
              <option value='quantum'>Quantum Neural</option>
              <option value='neural'>Neural Network</option>
              <option value='aggressive'>Hyper Aggressive</option>
              <option value='conservative'>Conservative AI</option>
            </select>
          </div>

          <div className='space-y-2'>
            <label htmlFor='confidence' className='text-sm font-bold text-emerald-400'>
              CONFIDENCE
            </label>
            <select
              id='confidence'
              value={config.confidence}
              onChange={e => setConfig({ ...config, confidence: parseInt(e.target.value) })}
              className='w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white'
            >
              <option value={90}>90%+ Safe</option>
              <option value={95}>95%+ Optimal</option>
              <option value={98}>98%+ Elite</option>
              <option value={99}>99%+ Quantum</option>
            </select>
          </div>

          <div className='space-y-2'>
            <label htmlFor='portfolio' className='text-sm font-bold text-emerald-400'>
              PORTFOLIO
            </label>
            <select
              id='portfolio'
              value={config.portfolio}
              onChange={e => setConfig({ ...config, portfolio: parseInt(e.target.value) })}
              className='w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white'
            >
              <option value={2}>2-Neural</option>
              <option value={3}>3-Neural</option>
              <option value={4}>4-Neural</option>
              <option value={5}>5-Neural</option>
              <option value={6}>6-Quantum</option>
            </select>
          </div>

          <div className='space-y-2'>
            <label htmlFor='sports' className='text-sm font-bold text-emerald-400'>
              SPORTS
            </label>
            <select
              id='sports'
              value={config.sports}
              onChange={e => setConfig({ ...config, sports: e.target.value })}
              className='w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white'
            >
              <option value='all'>All Sports</option>
              <option value='nba'>NBA</option>
              <option value='nfl'>NFL</option>
              <option value='mlb'>MLB</option>
              <option value='nhl'>NHL</option>
              <option value='soccer'>Soccer</option>
              <option value='esports'>Esports</option>
            </select>
          </div>

          <div className='space-y-2'>
            <label htmlFor='timeFrame' className='text-sm font-bold text-emerald-400'>
              TIME FRAME
            </label>
            <select
              id='timeFrame'
              value={config.timeFrame}
              onChange={e => setConfig({ ...config, timeFrame: e.target.value })}
              className='w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white'
            >
              <option value='today'>Today</option>
              <option value='tonight'>Tonight</option>
              <option value='weekend'>This Weekend</option>
              <option value='week'>This Week</option>
            </select>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className='border-t border-gray-700 pt-8'>
          <h3 className='text-xl font-bold text-emerald-400 mb-6'>ADVANCED NEURAL FILTERS</h3>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6'>
            {/* Odds Range */}
            <div className='space-y-3'>
              <label htmlFor='minOdds' className='text-sm font-bold text-emerald-400'>
                ODDS RANGE
              </label>
              <div className='grid grid-cols-2 gap-3'>
                <div>
                  <label htmlFor='minOdds' className='text-xs text-gray-400'>
                    Min Odds
                  </label>
                  <input
                    id='minOdds'
                    type='number'
                    value={config.minOdds}
                    onChange={e =>
                      setConfig({ ...config, minOdds: parseInt(e.target.value) || -300 })
                    }
                    className='w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white'
                    placeholder='-300'
                  />
                </div>
                <div>
                  <label htmlFor='maxOdds' className='text-xs text-gray-400'>
                    Max Odds
                  </label>
                  <input
                    id='maxOdds'
                    type='number'
                    value={config.maxOdds}
                    onChange={e =>
                      setConfig({ ...config, maxOdds: parseInt(e.target.value) || -150 })
                    }
                    className='w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white'
                    placeholder='-150'
                  />
                </div>
              </div>
            </div>

            {/* Player Types */}
            <div className='space-y-3'>
              <label htmlFor='playerTypes' className='text-sm font-bold text-emerald-400'>
                PLAYER TYPES
              </label>
              <select
                id='playerTypes'
                value={config.playerTypes}
                onChange={e => setConfig({ ...config, playerTypes: e.target.value })}
                className='w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white'
              >
                <option value='all'>All Participants</option>
                <option value='stars'>Star Players</option>
                <option value='role'>Role Players</option>
                <option value='rookies'>Rookies</option>
                <option value='veterans'>Veterans</option>
                <option value='champions'>Champions</option>
              </select>
            </div>

            {/* Line Movement */}
            <div className='space-y-3'>
              <label htmlFor='lineMovement' className='text-sm font-bold text-emerald-400'>
                LINE MOVEMENT
              </label>
              <select
                id='lineMovement'
                value={config.lineMovement}
                onChange={e => setConfig({ ...config, lineMovement: e.target.value })}
                className='w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white'
              >
                <option value='any'>Any Movement</option>
                <option value='up'>Line Moving Up</option>
                <option value='down'>Line Moving Down</option>
                <option value='stable'>Stable Lines</option>
                <option value='reverse'>Reverse Line Movement</option>
                <option value='sharp'>Sharp Money Movement</option>
              </select>
            </div>
          </div>

          {/* Filter Toggles */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {/* Smart Filters */}
            <div className='space-y-3'>
              <label htmlFor='weatherFilter' className='text-sm font-bold text-emerald-400'>
                SMART FILTERS
              </label>
              <div className='space-y-2'>
                <label
                  htmlFor='weatherFilter'
                  className='flex items-center gap-2 p-2 bg-gray-800 rounded-lg cursor-pointer'
                >
                  <input
                    id='weatherFilter'
                    type='checkbox'
                    checked={config.weatherFilter}
                    onChange={e => setConfig({ ...config, weatherFilter: e.target.checked })}
                    className='form-checkbox text-emerald-500'
                  />
                  <span className='text-sm'>Weather Analysis</span>
                </label>
                <label
                  htmlFor='injuryFilter'
                  className='flex items-center gap-2 p-2 bg-gray-800 rounded-lg cursor-pointer'
                >
                  <input
                    id='injuryFilter'
                    type='checkbox'
                    checked={config.injuryFilter}
                    onChange={e => setConfig({ ...config, injuryFilter: e.target.checked })}
                    className='form-checkbox text-emerald-500'
                  />
                  <span className='text-sm'>Injury Reports</span>
                </label>
              </div>
            </div>

            {/* Venue Analysis */}
            <div className='space-y-3'>
              <label htmlFor='homeAdvantage' className='text-sm font-bold text-emerald-400'>
                VENUE ANALYSIS
              </label>
              <div className='space-y-2'>
                <label
                  htmlFor='homeAdvantage'
                  className='flex items-center gap-2 p-2 bg-gray-800 rounded-lg cursor-pointer'
                >
                  <input
                    id='homeAdvantage'
                    type='checkbox'
                    checked={config.homeAdvantage || false}
                    onChange={e => setConfig({ ...config, homeAdvantage: e.target.checked })}
                    className='form-checkbox text-emerald-500'
                  />
                  <span className='text-sm'>Home Advantage</span>
                </label>
                <label
                  htmlFor='travelFatigue'
                  className='flex items-center gap-2 p-2 bg-gray-800 rounded-lg cursor-pointer'
                >
                  <input
                    id='travelFatigue'
                    type='checkbox'
                    checked={config.travelFatigue || false}
                    onChange={e => setConfig({ ...config, travelFatigue: e.target.checked })}
                    className='form-checkbox text-emerald-500'
                  />
                  <span className='text-sm'>Travel Fatigue</span>
                </label>
              </div>
            </div>

            {/* Trend Analysis */}
            <div className='space-y-3'>
              <label htmlFor='hotStreaks' className='text-sm font-bold text-emerald-400'>
                TREND ANALYSIS
              </label>
              <div className='space-y-2'>
                <label
                  htmlFor='hotStreaks'
                  className='flex items-center gap-2 p-2 bg-gray-800 rounded-lg cursor-pointer'
                >
                  <input
                    id='hotStreaks'
                    type='checkbox'
                    checked={config.hotStreaks || false}
                    onChange={e => setConfig({ ...config, hotStreaks: e.target.checked })}
                    className='form-checkbox text-emerald-500'
                  />
                  <span className='text-sm'>Hot Streaks</span>
                </label>
                <label
                  htmlFor='matchupHistory'
                  className='flex items-center gap-2 p-2 bg-gray-800 rounded-lg cursor-pointer'
                >
                  <input
                    id='matchupHistory'
                    type='checkbox'
                    checked={config.matchupHistory || false}
                    onChange={e => setConfig({ ...config, matchupHistory: e.target.checked })}
                    className='form-checkbox text-emerald-500'
                  />
                  <span className='text-sm'>Matchup History</span>
                </label>
              </div>
            </div>

            {/* Public Sentiment */}
            <div className='space-y-3'>
              <label htmlFor='fadePublic' className='text-sm font-bold text-emerald-400'>
                PUBLIC SENTIMENT
              </label>
              <div className='space-y-2'>
                <label
                  htmlFor='fadePublic'
                  className='flex items-center gap-2 p-2 bg-gray-800 rounded-lg cursor-pointer'
                >
                  <input
                    id='fadePublic'
                    type='checkbox'
                    checked={config.fadePublic || false}
                    onChange={e => setConfig({ ...config, fadePublic: e.target.checked })}
                    className='form-checkbox text-emerald-500'
                  />
                  <span className='text-sm'>Fade Public</span>
                </label>
                <label
                  htmlFor='followSharps'
                  className='flex items-center gap-2 p-2 bg-gray-800 rounded-lg cursor-pointer'
                >
                  <input
                    id='followSharps'
                    type='checkbox'
                    checked={config.followSharps || false}
                    onChange={e => setConfig({ ...config, followSharps: e.target.checked })}
                    className='form-checkbox text-emerald-500'
                  />
                  <span className='text-sm'>Follow Sharps</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Activate Button */}
        <div className='text-center mt-8'>
          <Button
            onClick={activateQuantumAI}
            disabled={loading}
            className='px-12 py-4 text-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
          >
            {loading ? (
              <>
                <Cpu className='mr-2 h-5 w-5 animate-spin' />
                PROCESSING...
              </>
            ) : (
              <>
                <Zap className='mr-2 h-5 w-5' />
                ACTIVATE QUANTUM AI
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Results Display */}
      {results && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className='p-8 border-green-500/40'>
            <div className='text-center mb-8'>
              <h2 className='text-4xl font-black text-green-400 mb-4'>
                QUANTUM AI PORTFOLIO GENERATED
              </h2>
              <div className='flex items-center justify-center gap-6 text-sm'>
                <span className='text-emerald-400'>Processing Time: {results.processingTime}</span>
                <span className='text-purple-400'>Neural Networks: {results.neuralNetworks}</span>
                <span className='text-cyan-400'>Quantum Enhanced: ✓</span>
              </div>
            </div>

            {/* Metrics */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
              <Card className='p-6 text-center'>
                <div className='text-3xl font-bold text-white'>
                  ${results.investment.toLocaleString()}
                </div>
                <div className='text-gray-400 text-sm mt-2'>INVESTMENT</div>
              </Card>
              <Card className='p-6 text-center'>
                <div className='text-3xl font-bold text-emerald-400'>
                  {results.multiplier.toFixed(2)}x
                </div>
                <div className='text-gray-400 text-sm mt-2'>QUANTUM MULTIPLIER</div>
              </Card>
              <Card className='p-6 text-center border-green-500/30'>
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className='text-3xl font-bold text-green-400'
                >
                  ${Math.round(results.payout).toLocaleString()}
                </motion.div>
                <div className='text-gray-400 text-sm mt-2'>PROJECTED PAYOUT</div>
              </Card>
              <Card className='p-6 text-center'>
                <div className='text-3xl font-bold text-purple-400'>
                  {results.accuracy.toFixed(1)}%
                </div>
                <div className='text-gray-400 text-sm mt-2'>AI ACCURACY</div>
              </Card>
            </div>

            {/* Picks */}
            <div className='space-y-4'>
              <h3 className='text-2xl font-bold text-emerald-400 text-center mb-6'>
                NEURAL NETWORK SELECTIONS
              </h3>
              {results.picks.map((pick, i) => (
                <Card key={i} className='p-6'>
                  <div className='flex justify-between items-start mb-4'>
                    <div>
                      <div className='text-xl font-bold text-white mb-1'>{pick.game}</div>
                      <div className='text-sm text-emerald-400'>Generated by {pick.neural}</div>
                    </div>
                    <Badge
                      variant='outline'
                      className='bg-green-500/20 border-green-500/40 text-green-400'
                    >
                      {pick.confidence}% CONFIDENCE
                    </Badge>
                  </div>
                  <div className='space-y-2'>
                    <div className='text-lg font-bold text-emerald-400'>{pick.pick}</div>
                    <div className='text-gray-400'>Odds: {pick.odds}</div>
                    <div className='text-sm text-gray-300 bg-gray-800/50 p-3 rounded-lg'>
                      AI Reasoning: {pick.reason}
                    </div>
                  </div>
                  <div className='mt-4 w-full bg-gray-700 rounded-full h-2 overflow-hidden'>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pick.confidence}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className='h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full'
                    />
                  </div>
                </Card>
              ))}
            </div>

            {/* Execute Button */}
            <div className='text-center mt-8'>
              <Button
                size='lg'
                className='px-12 py-4 text-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
              >
                <Target className='mr-2 h-5 w-5' />
                EXECUTE QUANTUM PORTFOLIO - WIN ${Math.round(results.payout).toLocaleString()}
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};
