import { motion } from 'framer-motion'
import { Activity, BarChart3, Brain, DollarSign, Target, TrendingUp } from 'lucide-react'
import { CommandSummaryProvider } from '../contexts/CommandSummaryContext'

interface AnalyticsData {
  totalBets: number
,`n  winRate: number;
,`n  profit: number
,`n  roi: number;
,`n  avgOdds: number
,`n  accuracy: number}

const CommandSummarySidebar: React.FC = () => {
  const { commands, loading, error } = useCommandSummary();
  return (
    <aside style={{ width: 320, background: '#18181b', color: '#fff', borderLeft: '1px solid #333', padding: 16, overflowY: 'auto', position: 'fixed', right: 0, top: 0, height: '100vh', zIndex: 100 }}>
      <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 12 }}>Live Command Summary</h2>
      {loading && <div>Loading commands...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {commands.map(cmd => (
          <li key={cmd.id} style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600 }}>{cmd.name}</div>
            <div style={{ fontSize: 14, color: '#aaa' }}>{cmd.description}</div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

const Analytics: React.FC = () => {
  const [timeframe, setTimeframe] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock analytics data - would come from real services
  const analyticsData: AnalyticsData = {
,`n  totalBets: 1247,
    winRate: 87.3,
    profit: 24750,
    roi: 34.2,
    avgOdds: 1.85,
    accuracy: 94.2
  };

  const chartData = [
    { name: 'Mon', profit: 1200, bets: 45},
    { name: 'Tue', profit: 2100, bets: 52},
    { name: 'Wed', profit: 800, bets: 38},
    { name: 'Thu', profit: 3200, bets: 61},
    { name: 'Fri', profit: 1500, bets: 43},
    { name: 'Sat', profit: 2800, bets: 67},
    { name: 'Sun', profit: 1900, bets: 54},
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3},
    { id: 'performance', name: 'Performance', icon: TrendingUp},
    { id: 'models', name: 'AI Models', icon: Brain},
    { id: 'risk', name: 'Risk Analysis', icon: Target},
  ];

  return (
    <div className='space-y-8 animate-slide-in-up'>
      {/* Header */}
      <div className='text-center mb-12'>
        <div className='relative mb-8'>
          <div className='absolute inset-0 bg-electric-400/20 blur-3xl rounded-full' />
          <div className='relative text-8xl text-electric-400 mb-6 animate-float'>📊</div>
          <h1 className='holographic text-6xl font-black mb-4 font-cyber'>NEURAL ANALYTICS</h1>
          <p className='text-2xl text-gray-400 font-mono'>
            Quantum Intelligence Performance Dashboard
          </p>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className='quantum-card rounded-3xl p-6 mb-10'>
        <div className='flex flex-wrap gap-4'>
          {['24h', '7d', '30d', '90d', 'all'].map(period => (
            <button key={period}
>`n              onClick={() => setTimeframe(period)}
              className={`px-6 py-3 rounded-2xl transition-all duration-300 font-bold font-cyber ${
                timeframe === period
                  ? 'bg-electric-500/20 border-2 border-electric-500/40 text-electric-400 shadow-neon'
                  : 'bg-gray-800/30 hover:bg-gray-800/50 text-gray-300 border-2 border-transparent hover:border-gray-600'}`}
            >
              {period.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10'>
        <motion.div
          className='quantum-card rounded-2xl p-6 text-center hover:shadow-neon'
          whileHover={{ scale: 1.02}}
        >
          <div className='text-3xl mb-3 text-green-400'>
            <DollarSign className='w-8 h-8 mx-auto' />
          </div>
          <div className='text-2xl font-bold text-green-400 mb-2 font-cyber'>
            ${analyticsData.profit.toLocaleString()}
          </div>
          <div className='text-sm text-gray-400 font-mono'>Total Profit</div>
        </motion.div>

        <motion.div
          className='quantum-card rounded-2xl p-6 text-center hover:shadow-neon'
          whileHover={{ scale: 1.02}}
        >
          <div className='text-3xl mb-3 text-blue-400'>
            <Target className='w-8 h-8 mx-auto' />
          </div>
          <div className='text-2xl font-bold text-blue-400 mb-2 font-cyber'>
            {analyticsData.winRate}%
          </div>
          <div className='text-sm text-gray-400 font-mono'>Win Rate</div>
        </motion.div>

        <motion.div
          className='quantum-card rounded-2xl p-6 text-center hover:shadow-neon'
          whileHover={{ scale: 1.02}}
        >
          <div className='text-3xl mb-3 text-purple-400'>
            <Brain className='w-8 h-8 mx-auto' />
          </div>
          <div className='text-2xl font-bold text-purple-400 mb-2 font-cyber'>
            {analyticsData.accuracy}%
          </div>
          <div className='text-sm text-gray-400 font-mono'>AI Accuracy</div>
        </motion.div>

        <motion.div
          className='quantum-card rounded-2xl p-6 text-center hover:shadow-neon'
          whileHover={{ scale: 1.02}}
        >
          <div className='text-3xl mb-3 text-yellow-400'>
            <TrendingUp className='w-8 h-8 mx-auto' />
          </div>
          <div className='text-2xl font-bold text-yellow-400 mb-2 font-cyber'>
            {analyticsData.roi}%
          </div>
          <div className='text-sm text-gray-400 font-mono'>ROI</div>
        </motion.div>

        <motion.div
          className='quantum-card rounded-2xl p-6 text-center hover:shadow-neon'
          whileHover={{ scale: 1.02}}
        >
          <div className='text-3xl mb-3 text-cyan-400'>
            <Activity className='w-8 h-8 mx-auto' />
          </div>
          <div className='text-2xl font-bold text-cyan-400 mb-2 font-cyber'>
            {analyticsData.totalBets}
          </div>
          <div className='text-sm text-gray-400 font-mono'>Total Bets</div>
        </motion.div>

        <motion.div
          className='quantum-card rounded-2xl p-6 text-center hover:shadow-neon'
          whileHover={{ scale: 1.02}}
        >
          <div className='text-3xl mb-3 text-electric-400'>
            <BarChart3 className='w-8 h-8 mx-auto' />
          </div>
          <div className='text-2xl font-bold text-electric-400 mb-2 font-cyber'>
            {analyticsData.avgOdds}
          </div>
          <div className='text-sm text-gray-400 font-mono'>Avg Odds</div>
        </motion.div>
      </div>

      {/* Navigation Tabs */}
      <div className='quantum-card rounded-3xl p-6 mb-10'>
        <div className='flex flex-wrap gap-4'>
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id}
>`n                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 font-bold font-cyber ${
                  activeTab === tab.id
                    ? 'bg-electric-500/20 border-2 border-electric-500/40 text-electric-400 shadow-neon'
                    : 'bg-gray-800/30 hover:bg-gray-800/50 text-gray-300 border-2 border-transparent hover:border-gray-600'}`}
              >
                <Icon className='w-5 h-5' />
                <span>{tab.name}</span>
              </button>
            )})}
        </div>
      </div>

      {/* Tab Content */}
      <div className='quantum-card rounded-3xl p-10'>
        {activeTab === 'overview' && (
          <div className='space-y-8'>
            <h2 className='text-3xl font-bold text-electric-400 holographic mb-8 font-cyber'>
              PERFORMANCE OVERVIEW
            </h2>

            {/* Performance Chart */}
            <div className='quantum-card rounded-2xl p-8'>
              <h3 className='text-xl font-bold text-white mb-6 font-cyber'>Weekly Performance</h3>
              <div className='h-64 flex items-end justify-between space-x-2'>
                {chartData.map((day, index) => (
                  <div key={day.name} className='flex flex-col items-center flex-1'>
                    <div className='w-full bg-gradient-to-t from-electric-400 to-neon-blue rounded-t-lg mb-2'
                      style={{ height: `${(day.profit / 3200) * 100}%`}}
>`n                    />
                    <div className='text-sm text-gray-400 font-mono'>{day.name}</div>
                    <div className='text-xs text-electric-400 font-bold'>${day.profit}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Insights */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div className='quantum-card rounded-2xl p-6'>
                <h3 className='text-xl font-bold text-green-400 mb-4 font-cyber'>✓ Strengths</h3>
                <ul className='space-y-2 text-gray-300'>
                  <li>• High win rate consistency</li>
                  <li>• Strong AI model accuracy</li>
                  <li>• Excellent risk management</li>
                  <li>• Optimal position sizing</li>
                </ul>
              </div>

              <div className='quantum-card rounded-2xl p-6'>
                <h3 className='text-xl font-bold text-yellow-400 mb-4 font-cyber'>
                  ⚠ Opportunities
                </h3>
                <ul className='space-y-2 text-gray-300'>
                  <li>• Expand to more markets</li>
                  <li>• Increase bet frequency</li>
                  <li>• Add momentum models</li>
                  <li>• Enhance live betting</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className='space-y-8'>
            <h2 className='text-3xl font-bold text-electric-400 holographic mb-8 font-cyber'>
              DETAILED PERFORMANCE
            </h2>
            <div className='text-center text-gray-400 py-20'>
              <Brain className='w-16 h-16 mx-auto mb-4 text-electric-400' />
              <p className='text-xl font-mono'>Advanced performance metrics coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === 'models' && (
          <div className='space-y-8'>
            <h2 className='text-3xl font-bold text-electric-400 holographic mb-8 font-cyber'>
              AI MODEL PERFORMANCE
            </h2>
            <div className='text-center text-gray-400 py-20'>
              <Brain className='w-16 h-16 mx-auto mb-4 text-electric-400' />
              <p className='text-xl font-mono'>Neural network analysis coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === 'risk' && (
          <div className='space-y-8'>
            <h2 className='text-3xl font-bold text-electric-400 holographic mb-8 font-cyber'>
              RISK ANALYSIS
            </h2>
            <div className='text-center text-gray-400 py-20'>
              <Target className='w-16 h-16 mx-auto mb-4 text-electric-400' />
              <p className='text-xl font-mono'>Risk management metrics coming soon...</p>
            </div>
          </div>
        )}
      </div>
      {/* Inject live command summary sidebar */}
      <CommandSummarySidebar />
    </div>
  )};

export default (props: any) => (
  <CommandSummaryProvider>
    <Analytics {...props} />
  </CommandSummaryProvider>
);



`
