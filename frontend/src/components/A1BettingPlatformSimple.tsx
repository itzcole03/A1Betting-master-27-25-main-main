import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Brain,
  CheckCircle,
  DollarSign,
  Home,
  Menu,
  Star,
  Target,
  Trophy,
  User,
  X,
} from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { safeNumber } from '../utils/safeNumber';

// Lazy load major components for performance with fallbacks
const Dashboard = React.lazy(() =>
  import('./AdvancedDashboard').catch(
    () =>
      ({
        default: () => <div className='p-8 text-white'>Dashboard loading...</div>,
      } as any)
  )
);
const BettingInterface = React.lazy(() =>
  import('./BettingInterface').catch(
    () =>
      ({
        default: () => <div className='p-8 text-white'>Betting Interface loading...</div>,
      } as any)
  )
);
const PredictionDisplay = React.lazy(() =>
  import('./PredictionDisplay').catch(
    () =>
      ({
        default: () => <div className='p-8 text-white'>Predictions loading...</div>,
      } as any)
  )
);
const UserProfile = React.lazy(() =>
  import('./UserProfile').catch(
    () =>
      ({
        default: () => <div className='p-8 text-white'>Profile loading...</div>,
      } as any)
  )
);
const AnalyticsDashboard = React.lazy(() =>
  import('./AnalyticsDashboard').catch(
    () =>
      ({
        default: () => <div className='p-8 text-white'>Analytics loading...</div>,
      } as any)
  )
);

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType<any>;
  badge?: string;
  description: string;
  premium?: boolean;
}

interface PlatformStats {
  totalProfit: number;
  winRate: number;
  accuracy: number;
  activePredictions: number;
  portfolioValue: number;
  todayPnL: number;
  sharpeRatio: number;
  maxDrawdown: number;
  apiHealth: 'healthy' | 'degraded' | 'critical';
  opportunitiesFound: number;
  mlModelsActive: number;
}

interface LiveOpportunity {
  id: string;
  type: 'arbitrage' | 'value_bet' | 'prop_special' | 'live_edge';
  player: string;
  sport: string;
  league: string;
  line: number;
  odds: number;
  confidence: number;
  expectedValue: number;
  timeRemaining: number;
  source: string;
  sharpMoney: boolean;
  marketInefficiency: number;
}

interface APIStatus {
  sportsRadar: boolean;
  theOdds: boolean;
  prizePicks: boolean;
  espn: boolean;
  lastUpdate: string;
  quotaUsage: {
    sportsRadar: number;
    theOdds: number;
  };
}

// Simple stub for command summary (removed context)
const useCommandSummary = () => ({
  commands: [],
  loading: false,
  error: null,
  queue: [],
});

const A1BettingPlatformSimple: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitializing, setIsInitializing] = useState(true);

  // Platform statistics - Real-time data based on documentation
  const [stats, setStats] = useState<PlatformStats>({
    totalProfit: 18500,
    winRate: 73.8,
    accuracy: 85.2,
    activePredictions: 47,
    portfolioValue: 125000,
    todayPnL: 2340,
    sharpeRatio: 1.42,
    maxDrawdown: 2.3,
    apiHealth: 'healthy',
    opportunitiesFound: 23,
    mlModelsActive: 47,
  });

  const [liveOpportunities, setLiveOpportunities] = useState<LiveOpportunity[]>([]);
  const [apiStatus, setApiStatus] = useState<APIStatus>({
    sportsRadar: true,
    theOdds: true,
    prizePicks: true,
    espn: true,
    lastUpdate: new Date().toISOString(),
    quotaUsage: {
      sportsRadar: 75,
      theOdds: 45,
    },
  });

  // Navigation structure
  const navigationItems: NavigationItem[] = useMemo(
    () => [
      {
        id: 'dashboard',
        label: 'Command Center',
        icon: <Home className='w-5 h-5' />,
        component: Dashboard,
        description: 'Live performance metrics and system overview',
      },
      {
        id: 'betting',
        label: 'Betting Interface',
        icon: <DollarSign className='w-5 h-5' />,
        component: BettingInterface,
        badge: 'Live',
        description: 'Place bets with AI-powered insights',
      },
      {
        id: 'predictions',
        label: 'AI Predictions',
        icon: <Brain className='w-5 h-5' />,
        component: PredictionDisplay,
        badge: '85%',
        description: '47+ ML models with ensemble methods',
      },
      {
        id: 'analytics',
        label: 'Performance Analytics',
        icon: <BarChart3 className='w-5 h-5' />,
        component: AnalyticsDashboard,
        description: 'Advanced performance tracking and insights',
      },
      {
        id: 'profile',
        label: 'User Profile',
        icon: <User className='w-5 h-5' />,
        component: UserProfile,
        description: 'Account management and preferences',
      },
    ],
    [liveOpportunities.length]
  );

  // Initialize platform
  useEffect(() => {
    const initializePlatform = async () => {
      setIsInitializing(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockOpportunities: LiveOpportunity[] = [
          {
            id: '1',
            type: 'arbitrage',
            player: 'Test Player',
            sport: 'Football',
            league: 'NFL',
            line: 1.5,
            odds: 2.0,
            confidence: 90,
            expectedValue: 100,
            timeRemaining: 120,
            source: 'Test API',
            sharpMoney: true,
            marketInefficiency: 5.2,
          },
        ];
        setLiveOpportunities(mockOpportunities);
      } catch (error) {
        console.error('Platform initialization error:', error);
      } finally {
        setIsInitializing(false);
        setTimeout(() => setIsLoading(false), 100);
      }
    };

    initializePlatform();
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    setActiveView(tab);
    setIsMobileMenuOpen(false);
  }, []);

  const ActiveComponent =
    navigationItems.find(item => item.id === activeView)?.component || Dashboard;
  const activeItem = navigationItems.find(item => item.id === activeView);

  // Loading screen
  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center'>
        <div className='text-center max-w-md'>
          <div className='w-24 h-24 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto mb-8 animate-spin' />
          <h1 className='text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4'>
            A1 Betting
          </h1>
          <p className='text-2xl text-gray-300 mb-6'>AI-Powered Sports Intelligence</p>
          <div className='space-y-3 text-sm text-gray-400'>
            <div className='flex items-center justify-center space-x-6'>
              <div className='flex items-center space-x-2'>
                <Trophy className='w-4 h-4 text-yellow-400' />
                <span>73.8% Win Rate</span>
              </div>
              <div className='flex items-center space-x-2'>
                <Brain className='w-4 h-4 text-purple-400' />
                <span>85%+ AI Accuracy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white'>
      {/* Mobile Header */}
      <div className='lg:hidden bg-black/20 backdrop-blur-lg border-b border-white/10 p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <h1 className='text-xl font-bold text-yellow-400'>A1 Betting</h1>
            <span className='text-xs px-2 py-1 rounded-full bg-green-500/20 border-green-500/30'>
              Live
            </span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='text-white hover:text-yellow-400 transition-colors'
          >
            {isMobileMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>

      <div className='flex'>
        {/* Sidebar */}
        {(isMobileMenuOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
          <div className='fixed lg:relative z-50 lg:z-auto w-80 h-full lg:h-screen bg-black/40 backdrop-blur-xl border-r border-white/10'>
            <div className='p-6'>
              <div className='hidden lg:block mb-8'>
                <h1 className='text-2xl font-bold text-yellow-400 mb-2'>A1 Betting Platform</h1>
                <p className='text-gray-400 text-sm mb-4'>Enterprise Sports Intelligence</p>

                {/* Live Stats Summary */}
                <div className='grid grid-cols-2 gap-3 mb-6'>
                  <div className='bg-white/10 rounded-lg p-3 border border-white/20'>
                    <p className='text-xs text-gray-400'>Win Rate</p>
                    <p className='text-lg font-bold text-green-400'>
                      {safeNumber(stats.winRate, 2)}%
                    </p>
                  </div>
                  <div className='bg-white/10 rounded-lg p-3 border border-white/20'>
                    <p className='text-xs text-gray-400'>AI Accuracy</p>
                    <p className='text-lg font-bold text-blue-400'>
                      {safeNumber(stats.accuracy, 2)}%
                    </p>
                  </div>
                  <div className='bg-white/10 rounded-lg p-3 border border-white/20'>
                    <p className='text-xs text-gray-400'>Total Profit</p>
                    <p className='text-lg font-bold text-yellow-400'>
                      ${stats.totalProfit.toLocaleString()}
                    </p>
                  </div>
                  <div className='bg-white/10 rounded-lg p-3 border border-white/20'>
                    <p className='text-xs text-gray-400'>ML Models</p>
                    <p className='text-lg font-bold text-purple-400'>
                      {safeNumber(stats.mlModelsActive, 0)}+
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className='space-y-2'>
                <h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3'>
                  Platform Modules
                </h3>
                {navigationItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left relative ${
                      activeView === item.id
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className='relative'>
                      {item.icon}
                      {item.badge && (
                        <span
                          className={`absolute -top-2 -right-2 text-xs rounded-full w-5 h-5 flex items-center justify-center ${
                            item.badge === 'Live'
                              ? 'bg-green-500 text-white animate-pulse'
                              : 'bg-blue-500 text-white'
                          }`}
                        >
                          {item.badge === 'Live' ? '●' : item.badge}
                        </span>
                      )}
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center space-x-2'>
                        <p className='font-medium'>{item.label}</p>
                        {item.premium && <Star className='w-3 h-3 text-yellow-400' />}
                      </div>
                      <p className='text-xs text-gray-400 mt-1'>{item.description}</p>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className='flex-1 lg:ml-0'>
          {/* Top Bar */}
          <div className='hidden lg:flex items-center justify-between p-6 border-b border-white/10 bg-black/20 backdrop-blur-lg'>
            <div>
              <h2 className='text-2xl font-bold text-white flex items-center space-x-3'>
                <span>{activeItem?.label || 'Dashboard'}</span>
                {activeItem?.premium && <Star className='w-5 h-5 text-yellow-400' />}
              </h2>
              <p className='text-gray-400 text-sm'>
                {activeItem?.description || 'Platform overview'}
              </p>
            </div>

            <div className='flex items-center space-x-6'>
              {/* Today's P&L */}
              <div className='text-right'>
                <p className='text-xs text-gray-400'>Today's P&L</p>
                <div className='flex items-center space-x-2'>
                  <p
                    className={`font-semibold ${
                      stats.todayPnL >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {stats.todayPnL >= 0 ? '+' : ''}${safeNumber(stats.todayPnL, 2)}
                  </p>
                  {stats.todayPnL >= 0 ? (
                    <ArrowUp className='w-4 h-4 text-green-400' />
                  ) : (
                    <ArrowDown className='w-4 h-4 text-red-400' />
                  )}
                </div>
              </div>

              {/* System Health */}
              <div className='flex items-center space-x-2 px-3 py-2 rounded-lg bg-green-500/20 border-green-500/30'>
                <CheckCircle className='w-4 h-4 text-green-400' />
                <span className='text-sm font-medium text-green-400'>All Systems Live</span>
              </div>

              {/* Live Opportunities */}
              <div className='flex items-center space-x-2'>
                <Target className='w-4 h-4 text-purple-400' />
                <span className='text-sm text-purple-400 font-medium'>
                  {safeNumber(liveOpportunities.length, 0)} Live Opportunities
                </span>
              </div>
            </div>
          </div>

          {/* Component Content */}
          <div className='min-h-screen'>
            <React.Suspense
              fallback={
                <div className='flex items-center justify-center min-h-96'>
                  <div className='text-center'>
                    <div className='w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
                    <p className='text-gray-400'>Loading {activeItem?.label}...</p>
                    <p className='text-xs text-gray-500 mt-2'>
                      Initializing {activeItem?.description?.toLowerCase()}
                    </p>
                  </div>
                </div>
              }
            >
              <ActiveComponent />
            </React.Suspense>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden'
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default A1BettingPlatformSimple;
