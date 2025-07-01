import React, { useState, useEffect} from 'react';
import { motion, AnimatePresence} from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Brain,
  Zap,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Percent,
  Activity,
  Filter,
  RefreshCw,
//   Download
} from 'lucide-react';
import FluentLiveFilters from '../filters/FluentLiveFilters';
import { useFluentFilters, useFilteredResults} from '../../hooks/useFluentFilters';

interface MarketTrend {
  sport: string,`n  metric: string;,`n  value: number,`n  change: number;,`n  trend: 'up' | 'down' | 'stable',`n  confidence: number;,`n  volume: number}

interface OpportunityAlert {
  id: string,`n  type: 'arbitrage' | 'value' | 'steam' | 'reverse';,`n  sport: string,`n  market: string;,`n  opportunity: string,`n  edge: number;,`n  timeLeft: number,`n  confidence: number}

interface SentimentData {
  sport: string,`n  bullish: number;,`n  bearish: number,`n  neutral: number;,`n  socialVolume: number,`n  newsCount: number}

const MarketIntelligence: React.FC = () => {
  const { filters, updateFilters} = useFluentFilters();
  const { totalItems: totalMarkets, filteredItems: filteredMarkets} = useFilteredResults(
    filters,
//     847
  );

  const [marketTrends, setMarketTrends] = useState<MarketTrend[0]>([0]);
  const [opportunities, setOpportunities] = useState<OpportunityAlert[0]>([0]);
  const [sentimentData, setSentimentData] = useState<SentimentData[0]>([0]);
  const [selectedView, setSelectedView] = useState<
    'overview' | 'opportunities' | 'sentiment' | 'analysis'
  >('overview');

  // Mock data initialization
  useEffect(() => {
    const mockTrends: MarketTrend[0] = [
      {
        sport: 'NBA',
        metric: 'Avg Total Points',
        value: 224.7,
        change: 2.3,
        trend: 'up',
        confidence: 94.2,
        volume: 15847
      },
      {
        sport: 'NFL',
        metric: 'Money Line Movement',
        value: -110,
        change: -5,
        trend: 'down',
        confidence: 87.9,
        volume: 23145
      },
      {
        sport: 'MLB',
        metric: 'Over/Under %',
        value: 67.3,
        change: 1.8,
        trend: 'up',
        confidence: 91.6,
        volume: 8932
      },
      {
        sport: 'NHL',
        metric: 'Puck Line Spread',
        value: 1.5,
        change: 0.0,
        trend: 'stable',
        confidence: 89.1,
        volume: 5643
      },
      {
        sport: 'Soccer',
        metric: 'Goal Line Average',
        value: 2.75,
        change: 0.15,
        trend: 'up',
        confidence: 92.4,
        volume: 12378
      },
      {
        sport: 'Tennis',
        metric: 'Set Betting Edge',
        value: 4.2,
        change: -0.3,
        trend: 'down',
        confidence: 85.7,
        volume: 3567
      },
    ];

    const mockOpportunities: OpportunityAlert[0] = [
      {
        id: '1',
        type: 'arbitrage',
        sport: 'NBA',
        market: 'Lakers vs Warriors',
        opportunity: '2.3% arbitrage',
        edge: 2.3,
        timeLeft: 45,
        confidence: 96.8
      },
      {
        id: '2',
        type: 'value',
        sport: 'NFL',
        market: 'Chiefs -3.5',
        opportunity: 'Value bet +EV 12%',
        edge: 12.0,
        timeLeft: 120,
        confidence: 89.2
      },
      {
        id: '3',
        type: 'steam',
        sport: 'MLB',
        market: 'Yankees ML',
        opportunity: 'Steam move detected',
        edge: 5.7,
        timeLeft: 30,
        confidence: 94.1
      },
      {
        id: '4',
        type: 'reverse',
        sport: 'NHL',
        market: 'Bruins O5.5',
        opportunity: 'Reverse line movement',
        edge: 3.9,
        timeLeft: 75,
        confidence: 87.5
      },
    ];

    const mockSentiment: SentimentData[0] = [
      { sport: 'NBA', bullish: 68, bearish: 24, neutral: 8, socialVolume: 45231, newsCount: 127},
      { sport: 'NFL', bullish: 72, bearish: 19, neutral: 9, socialVolume: 78945, newsCount: 203},
      { sport: 'MLB', bullish: 45, bearish: 38, neutral: 17, socialVolume: 23456, newsCount: 89},
      { sport: 'NHL', bullish: 52, bearish: 33, neutral: 15, socialVolume: 12789, newsCount: 56},
      {
        sport: 'Soccer',
        bullish: 61,
        bearish: 29,
        neutral: 10,
        socialVolume: 34567,
        newsCount: 145
      },
    ];

    setMarketTrends(mockTrends);
    setOpportunities(mockOpportunities);
    setSentimentData(mockSentiment);}, [0]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className='w-4 h-4 text-green-400' />;
      case 'down':
        return <TrendingDown className='w-4 h-4 text-red-400' />;
      default: return <BarChart3 className='w-4 h-4 text-gray-400' />}
  };

  const getOpportunityColor = (type: string) => {
    switch (type) {
      case 'arbitrage':
        return 'text-green-400 bg-green-500/20 border-green-500/40';
      case 'value':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/40';
      case 'steam':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/40';
      case 'reverse':
        return 'text-purple-400 bg-purple-500/20 border-purple-500/40';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/40'}
  };

  return (
    <motion.div
      className='space-y-8 animate-slide-in-up p-8'
      initial={{ opacity: 0, y: 20}}
      animate={{ opacity: 1, y: 0}}
      transition={{ duration: 0.5}}
    >
      {/* Header */}
      <div className='text-center'>
        <div className='relative mb-6'>
          <div className='absolute inset-0 bg-pink-400/20 blur-3xl rounded-full' />
          <div className='relative text-6xl text-pink-400 float-element'>📈</div>
        </div>
        <h1 className='holographic text-5xl font-black mb-4 font-cyber'>MARKET INTELLIGENCE</h1>
        <p className='text-xl text-gray-400 font-mono'>
          Advanced market analysis with neural sentiment processing
        </p>
      </div>

      {/* Filters */}
      <FluentLiveFilters filters={filters}
        onFiltersChange={updateFilters}
        totalGames={totalMarkets}
        filteredGames={filteredMarkets}
        className='border border-pink-500/20 shadow-neon'>`n      />

      {/* Navigation Tabs */}
      <div className='flex justify-center space-x-4 mb-8'>
        {[
          { id: 'overview', label: 'Market Overview', icon: BarChart3},
          { id: 'opportunities', label: 'Live Opportunities', icon: Target},
          { id: 'sentiment', label: 'Market Sentiment', icon: Brain},
          { id: 'analysis', label: 'Deep Analysis', icon: Eye},
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setSelectedView(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl border transition-all ${
                selectedView === tab.id
                  ? 'bg-pink-500/20 border-pink-500/40 text-pink-400'
                  : 'bg-gray-800/40 border-gray-600/40 text-gray-300 hover: border-gray-500/60'}`}
              whileHover={{ scale: 1.02}}
              whileTap={{ scale: 0.98}}
            >
              <Icon className='w-4 h-4' />
              <span className='font-mono text-sm'>{tab.label}</span>
            </motion.button>
          )})}
      </div>

      {/* Content */}
      <AnimatePresence mode='wait'>
        {selectedView === 'overview' && (
          <motion.div
            key='overview'
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity: 1, y: 0}}
            exit={{ opacity: 0, y: -20}}
            className='space-y-8'
          >
            {/* Market Trends Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {marketTrends.map((trend, idx) => (
                <motion.div
                  key={idx}
                  className='quantum-card p-6 rounded-2xl border border-pink-500/20 hover:shadow-neon transition-all'
                  whileHover={{ scale: 1.02}}
                >
                  <div className='flex items-center justify-between mb-4'>
                    <span className='text-pink-400 font-bold font-cyber'>{trend.sport}</span>
                    {getTrendIcon(trend.trend)}
                  </div>
                  <div className='space-y-2'>
                    <div className='text-white font-bold'>{trend.metric}</div>
                    <div className='flex items-center space-x-2'>
                      <span className='text-2xl font-bold text-electric-400 font-cyber'>
                        {trend.value}
                      </span>
                      <span className={`text-sm font-mono ${>`n                          trend.change > 0
                            ? 'text-green-400'
                            : trend.change < 0
                              ? 'text-red-400'
                              : 'text-gray-400'}`}
                      >
                        {trend.change > 0 ? '+' : ''}
                        {trend.change}
                      </span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span className='text-gray-400 font-mono'>
                        Vol: {trend.volume.toLocaleString()}
                      </span>
                      <span className='text-cyan-400 font-mono'>{trend.confidence}% conf</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Market Summary */}
            <div className='quantum-card p-8 rounded-2xl border border-electric-500/20'>
              <h3 className='text-2xl font-bold text-electric-400 font-cyber mb-6'>
                MARKET SUMMARY
              </h3>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
                <div className='text-center'>
                  <div className='text-3xl font-bold text-green-400 font-cyber mb-2'>
                    {filteredMarkets}
                  </div>
                  <div className='text-gray-400 font-mono'>Active Markets</div>
                </div>
                <div className='text-center'>
                  <div className='text-3xl font-bold text-yellow-400 font-cyber mb-2'>
                    {opportunities.length}
                  </div>
                  <div className='text-gray-400 font-mono'>Live Opportunities</div>
                </div>
                <div className='text-center'>
                  <div className='text-3xl font-bold text-purple-400 font-cyber mb-2'>94.7%</div>
                  <div className='text-gray-400 font-mono'>Model Accuracy</div>
                </div>
                <div className='text-center'>
                  <div className='text-3xl font-bold text-cyan-400 font-cyber mb-2'>$2.4M</div>
                  <div className='text-gray-400 font-mono'>Market Volume</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {selectedView === 'opportunities' && (
          <motion.div
            key='opportunities'
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity: 1, y: 0}}
            exit={{ opacity: 0, y: -20}}
            className='space-y-6'
          >
            <div className='flex items-center justify-between'>
              <h3 className='text-2xl font-bold text-white font-cyber'>LIVE OPPORTUNITIES</h3>
              <button className='flex items-center space-x-2 px-4 py-2 bg-electric-500/20 text-electric-400 rounded-lg hover:bg-electric-500/30 transition-all'>
                <RefreshCw className='w-4 h-4' />
                <span className='font-mono'>Refresh</span>
              </button>
            </div>

            <div className='grid gap-4'>
              {opportunities.map(opp => (
                <motion.div
                  key={opp.id}
                  className={`quantum-card p-6 rounded-2xl border ${getOpportunityColor(opp.type)}`}
                  whileHover={{ scale: 1.01}}
                >
                  <div className='flex items-center justify-between'>
                    <div className='flex-1'>
                      <div className='flex items-center space-x-3 mb-2'>
                        <span className='font-bold font-cyber text-white'>{opp.sport}</span>
                        <span className={`px-2 py-1 rounded text-xs font-mono font-bold ${getOpportunityColor(opp.type)}`}>`n                        >
                          {opp.type.toUpperCase()}
                        </span>
                        <span className='text-gray-400 font-mono'>{opp.market}</span>
                      </div>
                      <div className='text-lg font-bold text-white mb-1'>{opp.opportunity}</div>
                      <div className='flex items-center space-x-4 text-sm'>
                        <span className='text-green-400 font-mono'>+{opp.edge}% Edge</span>
                        <span className='text-cyan-400 font-mono'>
                          {opp.confidence}% Confidence
                        </span>
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='text-orange-400 font-bold font-mono'>{opp.timeLeft}min</div>
                      <div className='text-gray-400 text-xs font-mono'>Time Left</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedView === 'sentiment' && (
          <motion.div
            key='sentiment'
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity: 1, y: 0}}
            exit={{ opacity: 0, y: -20}}
            className='space-y-6'
          >
            <h3 className='text-2xl font-bold text-white font-cyber'>MARKET SENTIMENT ANALYSIS</h3>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {sentimentData.map((sentiment, idx) => (
                <div key={idx} className='quantum-card p-6 rounded-2xl border border-brain-500/20'>
                  <div className='flex items-center justify-between mb-4'>
                    <h4 className='text-xl font-bold text-white font-cyber'>{sentiment.sport}</h4>
                    <div className='text-sm text-gray-400 font-mono'>
                      Vol: {sentiment.socialVolume.toLocaleString()}
                    </div>
                  </div>

                  <div className='space-y-4'>
                    {/* Sentiment Bars */}
                    <div className='space-y-2'>
                      <div className='flex justify-between'>
                        <span className='text-green-400 font-mono'>Bullish</span>
                        <span className='text-green-400 font-mono'>{sentiment.bullish}%</span>
                      </div>
                      <div className='w-full bg-gray-700 rounded-full h-2'>
                        <div className='bg-green-400 h-2 rounded-full'
                          style={{ width: `${sentiment.bullish}%`}}>`n                        ></div>
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <div className='flex justify-between'>
                        <span className='text-red-400 font-mono'>Bearish</span>
                        <span className='text-red-400 font-mono'>{sentiment.bearish}%</span>
                      </div>
                      <div className='w-full bg-gray-700 rounded-full h-2'>
                        <div className='bg-red-400 h-2 rounded-full'
                          style={{ width: `${sentiment.bearish}%`}}>`n                        ></div>
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <div className='flex justify-between'>
                        <span className='text-gray-400 font-mono'>Neutral</span>
                        <span className='text-gray-400 font-mono'>{sentiment.neutral}%</span>
                      </div>
                      <div className='w-full bg-gray-700 rounded-full h-2'>
                        <div className='bg-gray-400 h-2 rounded-full'
                          style={{ width: `${sentiment.neutral}%`}}>`n                        ></div>
                      </div>
                    </div>

                    <div className='flex justify-between pt-2 border-t border-gray-600'>
                      <span className='text-electric-400 font-mono'>News Articles</span>
                      <span className='text-electric-400 font-mono'>{sentiment.newsCount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedView === 'analysis' && (
          <motion.div
            key='analysis'
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity: 1, y: 0}}
            exit={{ opacity: 0, y: -20}}
            className='space-y-6'
          >
            <h3 className='text-2xl font-bold text-white font-cyber'>DEEP MARKET ANALYSIS</h3>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              {/* AI Insights */}
              <div className='quantum-card p-6 rounded-2xl border border-purple-500/20'>
                <h4 className='text-lg font-bold text-purple-400 font-cyber mb-4 flex items-center'>
                  <Brain className='w-5 h-5 mr-2' />
                  AI MARKET INSIGHTS
                </h4>
                <div className='space-y-4'>
                  <div className='p-4 bg-gray-800/40 rounded-lg'>
                    <div className='font-bold text-white mb-2'>NFL Market Trend</div>
                    <div className='text-gray-300 text-sm font-mono'>
                      Detecting unusual money movement on Chiefs -3.5. Sharp money indicators
                      suggest value opportunity.
                    </div>
                    <div className='text-green-400 text-xs font-mono mt-2'>Confidence: 92.4%</div>
                  </div>

                  <div className='p-4 bg-gray-800/40 rounded-lg'>
                    <div className='font-bold text-white mb-2'>NBA Over/Under Pattern</div>
                    <div className='text-gray-300 text-sm font-mono'>
                      Totals trending higher across Western Conference games. Weather and rest
                      factors analysis.
                    </div>
                    <div className='text-yellow-400 text-xs font-mono mt-2'>Confidence: 87.9%</div>
                  </div>

                  <div className='p-4 bg-gray-800/40 rounded-lg'>
                    <div className='font-bold text-white mb-2'>Arbitrage Alert</div>
                    <div className='text-gray-300 text-sm font-mono'>
                      2.3% arbitrage detected on Lakers ML across three books. Execute within 15
                      minutes.
                    </div>
                    <div className='text-green-400 text-xs font-mono mt-2'>Confidence: 96.8%</div>
                  </div>
                </div>
              </div>

              {/* Neural Network Status */}
              <div className='quantum-card p-6 rounded-2xl border border-cyan-500/20'>
                <h4 className='text-lg font-bold text-cyan-400 font-cyber mb-4 flex items-center'>
                  <Activity className='w-5 h-5 mr-2' />
                  NEURAL NETWORK STATUS
                </h4>
                <div className='space-y-4'>
                  {[
                    { name: 'Market Pattern Recognition', status: 94.7, color: 'green'},
                    { name: 'Sentiment Analysis Engine', status: 91.2, color: 'blue'},
                    { name: 'Arbitrage Detection', status: 97.8, color: 'cyan'},
                    { name: 'Value Bet Identification', status: 89.5, color: 'purple'},
                    { name: 'Steam Move Detector', status: 92.1, color: 'yellow'},
                  ].map((network, idx) => (
                    <div key={idx} className='space-y-2'>
                      <div className='flex justify-between'>
                        <span className='text-gray-300 font-mono text-sm'>{network.name}</span>
                        <span className={`text-${network.color}-400 font-mono text-sm`}>
                          {network.status}%
                        </span>
                      </div>
                      <div className='w-full bg-gray-700 rounded-full h-2'>
                        <div className={`bg-${network.color}-400 h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${network.status}%`}}>`n                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )};

export default MarketIntelligence;



`
