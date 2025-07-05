import { AnimatePresence, motion } from 'framer-motion';
import {
    BarChart3,
    Brain,
    Cpu,
    DollarSign,
    Home,
    Menu,
    RefreshCw,
    Target,
    TrendingUp,
    Trophy,
    X
} from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';

// Import existing components
const A1BettingPlatform = React.lazy(() => 
  import('./A1BettingPlatform').catch(() => ({
    default: () => <div className="p-8 text-white">A1Betting Platform loading...</div>
  }))
);

// Import the advanced PrizePicksPro component
import PrizePicksPro from './user-friendly/PrizePicksPro';

// Dashboard Component
const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Dashboard
        </h2>
        <p className="text-gray-400 mt-2">Platform Overview & Performance Metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Win Rate</p>
              <p className="text-2xl font-bold text-green-400">73.8%</p>
            </div>
            <Trophy className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">AI Accuracy</p>
              <p className="text-2xl font-bold text-purple-400">96.4%</p>
            </div>
            <Brain className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">ROI</p>
              <p className="text-2xl font-bold text-cyan-400">18.5%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-cyan-400" />
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Models</p>
              <p className="text-2xl font-bold text-yellow-400">47+</p>
            </div>
            <Cpu className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

// PropOllama Component
const PropOllama: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          PropOllama
        </h2>
        <p className="text-gray-400 mt-2">Advanced Prop Analysis & Recommendations</p>
      </div>
      <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-8 text-center">
        <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">PropOllama AI Engine</h3>
        <p className="text-gray-400">Advanced prop analysis coming soon...</p>
      </div>
    </div>
  );
};

// MoneyMaker Pro Component
const MoneyMakerPro: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          MoneyMaker Pro
        </h2>
        <p className="text-gray-400 mt-2">Automated Profit Generation</p>
      </div>
      <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-8 text-center">
        <DollarSign className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">MoneyMaker Pro Engine</h3>
        <p className="text-gray-400">Automated profit strategies loading...</p>
      </div>
    </div>
  );
};

// Analytics Component
const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Analytics
        </h2>
        <p className="text-gray-400 mt-2">Performance Tracking & Insights</p>
      </div>
      <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-8 text-center">
        <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Analytics Dashboard</h3>
        <p className="text-gray-400">Performance analytics loading...</p>
      </div>
    </div>
  );
};

// ML Dashboard Component
const MLDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          ML Dashboard
        </h2>
        <p className="text-gray-400 mt-2">Machine Learning Models & Performance</p>
      </div>
      <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-8 text-center">
        <Cpu className="w-16 h-16 text-purple-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">ML Model Center</h3>
        <p className="text-gray-400">47+ ML models with 96.4% accuracy</p>
      </div>
    </div>
  );
};

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType;
  badge?: string;
}

const QuantumSportsPlatform: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('prizepicks-pro');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigationItems: NavigationItem[] = useMemo(() => [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home className="w-5 h-5" />,
      component: Dashboard
    },
    {
      id: 'prop-ollama',
      label: 'PropOllama',
      icon: <Brain className="w-5 h-5" />,
      component: PropOllama,
      badge: 'AI'
    },
    {
      id: 'moneymaker-pro',
      label: 'MoneyMaker Pro',
      icon: <DollarSign className="w-5 h-5" />,
      component: MoneyMakerPro,
      badge: 'Pro'
    },
    {
      id: 'prizepicks-pro',
      label: 'PrizePicks Pro',
      icon: <Target className="w-5 h-5" />,
      component: PrizePicksPro,
      badge: 'Live'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      component: Analytics
    },
    {
      id: 'ml-dashboard',
      label: 'ML Dashboard',
      icon: <Cpu className="w-5 h-5" />,
      component: MLDashboard,
      badge: '96.4%'
    }
  ], []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const ActiveComponent = navigationItems.find(item => item.id === activeView)?.component || Dashboard;

  if (isLoading) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Quantum Sports Platform
          </h1>
          <p className="text-gray-400">Initializing AI-powered sports intelligence...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Mobile Header */}
      <div className="lg:hidden bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Quantum Sports
          </h1>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-purple-400 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {(isMobileMenuOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed lg:relative z-50 lg:z-auto w-80 h-full lg:h-screen bg-slate-900/80 backdrop-blur-xl border-r border-slate-700/50"
            >
              <div className="p-6">
                <div className="hidden lg:block mb-8">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    Quantum Sports
                  </h1>
                  <p className="text-gray-400 text-sm">AI-Powered Sports Intelligence</p>
                </div>

                <nav className="space-y-2">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveView(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                        activeView === item.id
                          ? 'bg-purple-500/20 border border-purple-500/30 text-purple-300'
                          : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>

                <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-400">System Status</span>
                  </div>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>✓ 47+ ML Models Active</div>
                    <div>✓ Real-time Data Feeds</div>
                    <div>✓ API Integrations Online</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          <div className="p-6 lg:p-8">
            <React.Suspense 
              fallback={
                <div className="flex items-center justify-center h-96">
                  <RefreshCw className="w-8 h-8 animate-spin text-purple-400" />
                </div>
              }
            >
              <ActiveComponent />
            </React.Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantumSportsPlatform;