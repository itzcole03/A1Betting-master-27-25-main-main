import React, { useState, Suspense } from 'react';
import { AppShell } from './components/core/AppShell';
import { RefreshCw } from 'lucide-react';

// Import Master App for full integration
const MasterApp = React.lazy(() => import('./MasterApp'));

// Lazy load feature components
const Dashboard = React.lazy(() => import('./components/features/dashboard/EnhancedDashboard'));
const MoneyMaker = React.lazy(() => import('./components/features/moneymaker/MoneyMaker'));
const Analytics = React.lazy(() => import('./components/features/analytics/Analytics'));
const PrizePicks = React.lazy(() => import('./components/features/prizepicks/PrizePicks'));
const ArbitrageScanner = React.lazy(
  () => import('./components/features/arbitrage/ArbitrageScanner')
);
const LiveBetting = React.lazy(() => import('./components/features/livebetting/LiveBetting'));
const BankrollManager = React.lazy(() => import('./components/features/bankroll/BankrollManager'));
const RiskEngine = React.lazy(() => import('./components/features/risk/RiskEngine'));
const SocialIntelligence = React.lazy(
  () => import('./components/features/social/SocialIntelligence')
);
const SHAPAnalysis = React.lazy(() => import('./components/features/shap/SHAPAnalysis'));
const QuantumAI = React.lazy(() => import('./components/features/quantum/QuantumAI'));
const NewsHub = React.lazy(() => import('./components/features/news/NewsHub'));
const WeatherStation = React.lazy(() => import('./components/features/weather/WeatherStation'));
const InjuryTracker = React.lazy(() => import('./components/features/injuries/InjuryTracker'));
const LineupBuilder = React.lazy(() => import('./components/features/lineup/LineupBuilder'));
const Settings = React.lazy(() => import('./components/features/settings/Settings'));
const SportsManager = React.lazy(() => import('./components/features/sports/SportsManager'));

// Placeholder components for features not yet implemented
const PlaceholderComponent: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <div className='flex items-center justify-center min-h-96'>
    <div className='text-center'>
      <div className='w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4'>
        <RefreshCw className='w-8 h-8 text-white animate-spin' />
      </div>
      <h2 className='text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2'>
        {title}
      </h2>
      <p className='text-gray-400'>{description}</p>
      <div className='mt-4 text-sm text-gray-500'>
        This feature is being consolidated and will be available soon.
      </div>
    </div>
  </div>
);

// Component mapping for navigation
const componentMap: Record<string, React.ComponentType> = {
  dashboard: Dashboard,
  moneymaker: MoneyMaker,
  analytics: Analytics,
  prizepicks: PrizePicks,
  arbitrage: ArbitrageScanner,
  livebetting: LiveBetting,
  bankroll: BankrollManager,
  risk: RiskEngine,
  social: SocialIntelligence,
  shap: SHAPAnalysis,
  quantum: QuantumAI,
  news: NewsHub,
  weather: WeatherStation,
  injuries: InjuryTracker,
  lineup: LineupBuilder,
  predictions: () => (
    <PlaceholderComponent title='AI Predictions' description='Advanced prediction algorithms' />
  ),
  historical: () => (
    <PlaceholderComponent title='Historical Data' description='Advanced historical analysis' />
  ),
  streaming: () => (
    <PlaceholderComponent title='Live Stream' description='HD streams & real-time data' />
  ),
  sportsbooks: () => <PlaceholderComponent title='Sportsbooks' description='Account management' />,
  automation: () => (
    <PlaceholderComponent title='Auto-Pilot' description='Betting automation & rules' />
  ),
  alerts: () => (
    <PlaceholderComponent title='Alert Center' description='Advanced alert management' />
  ),
  backtesting: () => (
    <PlaceholderComponent title='Backtesting' description='Strategy testing & validation' />
  ),
  education: () => (
    <PlaceholderComponent title='Academy' description='Education & training center' />
  ),
  community: () => (
    <PlaceholderComponent title='Community Hub' description='Social trading & leaderboards' />
  ),
  settings: Settings,
  sports: SportsManager,
};

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [useMasterApp, setUseMasterApp] = useState(true); // Enable Master App by default

  // Check if user wants to use enhanced Master App
  if (useMasterApp) {
    return (
      <Suspense
        fallback={
          <div className='min-h-screen bg-slate-900 flex items-center justify-center'>
            <div className='text-center'>
              <RefreshCw className='w-16 h-16 animate-spin text-cyan-400 mx-auto mb-4' />
              <div className='text-white text-xl mb-2'>Loading Master App...</div>
              <div className='text-gray-400 text-sm'>Initializing all systems and services</div>
              <button
                onClick={() => setUseMasterApp(false)}
                className='mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors'
              >
                Use Basic App
              </button>
            </div>
          </div>
        }
      >
        <MasterApp
          enablePrototypeFeatures={true}
          enableAdvancedAnalytics={true}
          enableQuantumFeatures={true}
          enableMLEnhancements={true}
        />
      </Suspense>
    );
  }

  // Fallback to basic app
  const ActiveComponent = componentMap[activeView] || Dashboard;

  return (
    <div className='min-h-screen bg-slate-900'>
      <div className='p-4 bg-slate-800 border-b border-slate-700'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-white font-bold'>A1 Betting Platform (Basic Mode)</h1>
            <p className='text-gray-400 text-sm'>Some features may be limited</p>
          </div>
          <button
            onClick={() => setUseMasterApp(true)}
            className='px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-lg text-white font-medium transition-all'
          >
            Enable Master App
          </button>
        </div>
      </div>

      <AppShell activeView={activeView} onNavigate={setActiveView}>
        <Suspense
          fallback={
            <div className='flex items-center justify-center h-96'>
              <RefreshCw className='w-8 h-8 animate-spin text-purple-400' />
            </div>
          }
        >
          <ActiveComponent />
        </Suspense>
      </AppShell>
    </div>
  );
}
