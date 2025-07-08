import React, { useState, Suspense } from 'react';
import { AppShell } from './components/core/AppShell';
import { ErrorBoundary } from './components/core/ErrorBoundary';
import { RefreshCw } from 'lucide-react';

// Core component imports
const Dashboard = React.lazy(() => import('./components/features/dashboard/Dashboard'));

// Trading & Betting components
const MoneyMaker = React.lazy(() => import('./components/features/moneymaker/MoneyMaker'));
const UltimateMoneyMaker = React.lazy(() => import('./components/MoneyMaker/UltimateMoneyMaker'));
const ArbitrageScanner = React.lazy(
  () => import('./components/features/arbitrage/ArbitrageScanner')
);
const PrizePicks = React.lazy(() => import('./components/features/prizepicks/PrizePicks'));
const LineupBuilder = React.lazy(() => import('./components/features/lineup/LineupBuilder'));
const LiveBetting = React.lazy(() => import('./components/features/livebetting/LiveBetting'));

// Analytics & AI components
const Analytics = React.lazy(() => import('./components/features/analytics/Analytics'));
const QuantumAI = React.lazy(() => import('./components/features/quantum/QuantumAI'));
const SHAPAnalysis = React.lazy(() => import('./components/features/shap/SHAPAnalysis'));

// Management components
const BankrollManager = React.lazy(() => import('./components/features/bankroll/BankrollManager'));
const RiskEngine = React.lazy(() => import('./components/features/risk/RiskEngine'));
const Settings = React.lazy(() => import('./components/features/settings/Settings'));

// Intelligence components
const SocialIntelligence = React.lazy(
  () => import('./components/features/social/SocialIntelligence')
);
const NewsHub = React.lazy(() => import('./components/features/news/NewsHub'));
const WeatherStation = React.lazy(() => import('./components/features/weather/WeatherStation'));
const InjuryTracker = React.lazy(() => import('./components/features/injuries/InjuryTracker'));

// Fallback component for features not yet implemented
const ComingSoon = ({ feature }: { feature?: string }) => (
  <div className='flex items-center justify-center h-64'>
    <div className='text-center'>
      <h2 className='text-2xl font-semibold text-cyan-400 mb-4'>Coming Soon</h2>
      <p className='text-gray-400'>
        {feature ? `${feature} feature is under development` : 'This feature is under development'}
      </p>
    </div>
  </div>
);

// Navigation and component mapping
const componentMap: Record<string, React.ComponentType> = {
  // Core
  dashboard: Dashboard,

  // Trading
  moneymaker: UltimateMoneyMaker,
  arbitrage: ArbitrageScanner,
  livebetting: LiveBetting,
  prizepicks: PrizePicks,
  lineup: LineupBuilder,

  // AI Engine
  analytics: Analytics,
  predictions: () => <ComingSoon feature='AI Predictions' />,
  quantum: QuantumAI,
  shap: SHAPAnalysis,
  historical: () => <ComingSoon feature='Historical Data' />,

  // Intelligence
  social: SocialIntelligence,
  news: NewsHub,
  weather: WeatherStation,
  injuries: InjuryTracker,
  streaming: () => <ComingSoon feature='Live Stream' />,

  // Management
  bankroll: BankrollManager,
  risk: RiskEngine,
  sportsbooks: () => <ComingSoon feature='Sportsbooks' />,
  automation: () => <ComingSoon feature='Auto-Pilot' />,
  alerts: () => <ComingSoon feature='Alert Center' />,

  // Tools
  backtesting: () => <ComingSoon feature='Backtesting' />,
  education: () => <ComingSoon feature='Academy' />,
  community: () => <ComingSoon feature='Community Hub' />,

  // Settings
  settings: Settings,
};

const LoadingSpinner = () => (
  <div className='flex items-center justify-center h-64'>
    <RefreshCw className='w-6 h-6 animate-spin text-blue-500' />
    <span className='ml-2 text-gray-600'>Loading...</span>
  </div>
);

const ErrorFallback = ({ error }: { error: Error }) => (
  <div className='flex items-center justify-center h-64'>
    <div className='text-center'>
      <h2 className='text-xl font-semibold text-red-600 mb-2'>Something went wrong</h2>
      <p className='text-gray-600'>{error.message}</p>
    </div>
  </div>
);

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderComponent = () => {
    const Component = componentMap[activeView];
    if (!Component) {
      return <div className='p-8'>Component not found: {activeView}</div>;
    }

    return (
      <Suspense fallback={<LoadingSpinner />}>
        <Component />
      </Suspense>
    );
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <AppShell activeView={activeView} onNavigate={setActiveView}>
        <div className='p-6'>
          <ErrorBoundary>{renderComponent()}</ErrorBoundary>
        </div>
      </AppShell>
    </div>
  );
}

export default App;
