import React, { useState, Suspense } from 'react';
import { AppShell } from './components/core/AppShell';
import { RefreshCw } from 'lucide-react';

// Lazy load feature components
const Dashboard = React.lazy(() => import('./components/features/dashboard/Dashboard'));
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
  lineup: () => (
    <PlaceholderComponent title='Lineup Builder' description='Smart lineup optimization' />
  ),
  predictions: () => (
    <PlaceholderComponent title='AI Predictions' description='Advanced prediction algorithms' />
  ),
  quantum: () => (
    <PlaceholderComponent title='Quantum AI' description='Quantum-enhanced neural networks' />
  ),
  shap: () => (
    <PlaceholderComponent title='SHAP Analysis' description='Model explainability & insights' />
  ),
  historical: () => (
    <PlaceholderComponent title='Historical Data' description='Advanced historical analysis' />
  ),
  social: () => (
    <PlaceholderComponent title='Social Intel' description='Social sentiment analysis' />
  ),
  news: () => <PlaceholderComponent title='News Hub' description='Real-time sports news' />,
  weather: () => (
    <PlaceholderComponent title='Weather Station' description='Weather impact analysis' />
  ),
  injuries: () => (
    <PlaceholderComponent title='Injury Tracker' description='Player injury monitoring' />
  ),
  streaming: () => (
    <PlaceholderComponent title='Live Stream' description='HD streams & real-time data' />
  ),
  bankroll: () => (
    <PlaceholderComponent title='Bankroll Manager' description='Portfolio & risk management' />
  ),
  risk: () => <PlaceholderComponent title='Risk Engine' description='Advanced risk assessment' />,
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
};

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const ActiveComponent = componentMap[activeView] || Dashboard;

  return (
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
  );
}
