import React, { useState, Suspense } from 'react';
import { AppShell } from './components/core/AppShell';
import { ErrorBoundary } from './components/core/ErrorBoundary';
import { RefreshCw } from 'lucide-react';

// Simple component imports without complex dependencies
const Dashboard = React.lazy(() => import('./components/features/dashboard/Dashboard'));

// Fallback component for features not yet implemented
const ComingSoon = () => (
  <div className='flex items-center justify-center h-64'>
    <div className='text-center'>
      <h2 className='text-2xl font-semibold text-cyan-400 mb-4'>Coming Soon</h2>
      <p className='text-gray-400'>This feature is under development</p>
    </div>
  </div>
);

// Navigation and component mapping
const componentMap: Record<string, React.ComponentType> = {
  dashboard: Dashboard,
  moneymaker: ComingSoon,
  arbitrage: ComingSoon,
  livebetting: ComingSoon,
  prizepicks: ComingSoon,
  lineup: ComingSoon,
  analytics: ComingSoon,
  predictions: ComingSoon,
  quantum: ComingSoon,
  shap: ComingSoon,
  historical: ComingSoon,
  social: ComingSoon,
  news: ComingSoon,
  weather: ComingSoon,
  injuries: ComingSoon,
  streaming: ComingSoon,
  bankroll: ComingSoon,
  risk: ComingSoon,
  sportsbooks: ComingSoon,
  automation: ComingSoon,
  alerts: ComingSoon,
  backtesting: ComingSoon,
  education: ComingSoon,
  community: ComingSoon,
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
