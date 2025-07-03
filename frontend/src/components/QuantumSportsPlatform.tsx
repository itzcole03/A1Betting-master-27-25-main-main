import {
    Atom,
    BarChart3,
    Bell,
    Brain,
    DollarSign,
    Eye,
    Home,
    Menu,
    Settings,
    Shield,
    Trophy,
    X,
    Zap
} from 'lucide-react';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

// Import components
import { AdminPanel } from './admin/AdminPanel';
import { UniversalAnalytics } from './analytics/UniversalAnalytics';
import { EnhancedWorkingDashboard } from './dashboard/EnhancedWorkingDashboard';
import { SavedLineups } from './lineups/SavedLineups';
import { MarketIntelligence } from './market/MarketIntelligence';
import { MLModelDashboard } from './ml/MLModelDashboard';
import { MoneyMakerPro } from './moneymaker/MoneyMakerPro';
import { PrizePicksPro } from './prizepicks/PrizePicksPro';
import { PropOllama } from './propollama/PropOllama';
import { WorkingRealTimeMonitor } from './realtime/WorkingRealTimeMonitor';
import { UltimateSettingsPage } from './settings/UltimateSettingsPage';

// Custom hook for click outside
const useClickOutside = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, callback]);
};

// Import real services
import { CommandSummaryProvider, useCommandSummary } from '../contexts/CommandSummaryContext';
import { useAuth } from '../hooks/useAuth';
import { useBettingData } from '../hooks/useBettingData';
import { useRealtimeData } from '../hooks/useRealtimeData';
import { useStore } from '../stores/useStore';

// Context for app state
interface AppContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  user: any;
  realTimeData: any;
  notifications: any[];
  theme: string;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

const Header: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { sidebarCollapsed, setSidebarCollapsed, user, notifications, toggleTheme } = context;

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  useClickOutside(notificationsRef, () => setShowNotifications(false));
  useClickOutside(userMenuRef, () => setShowUserMenu(false));

  return (
    <header className='ultra-glass border-b border-white/10 h-24 flex items-center px-10 justify-between sticky top-0 z-30'>
      {/* Left side */}
      <div className='flex items-center space-x-6'>
        <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className='p-2 rounded-full hover:bg-white/10 transition-colors'
        >
          {sidebarCollapsed ? <Menu /> : <X />}
        </button>
        <div className='holographic text-3xl font-bold font-cyber tracking-widest'>A1-ULTIMATE</div>
      </div>

      {/* Right side */}
      <div className='flex items-center space-x-6'>
        {/* Search Bar */}
        <div className='relative hidden md:block'>
          <input type='text'
            placeholder='Search players, games, stats...'
            className='w-72 bg-gray-800/50 border border-white/10 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all font-mono'
          />
          <Zap className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
        </div>

        {/* Theme Toggle */}
        <button onClick={toggleTheme}
          className='p-3 rounded-full hover:bg-white/10 transition-colors'
        >
          <Atom className='w-6 h-6' />
        </button>

        {/* Notifications */}
        <div className='relative' ref={notificationsRef}>
          <button onClick={() => setShowNotifications(!showNotifications)}
            className='p-3 rounded-full hover:bg-white/10 transition-colors'
          >
            <Bell className='w-6 h-6' />
            {notifications.length > 0 && (
              <span className='absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-800 animate-pulse' />
            )}
          </button>
          {showNotifications && (
            <div className='absolute right-0 mt-4 w-80 ultra-glass border border-white/10 rounded-xl shadow-lg p-4 z-40'>
              <h4 className='font-bold text-lg mb-2'>Notifications</h4>
              <div className='space-y-2'>
                {notifications.slice(0, 5).map((n: any, i: number) => (
                  <div key={i} className='p-2 bg-gray-800/50 rounded-lg text-sm'>
                    {n.message}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className='relative' ref={userMenuRef}>
          <button onClick={() => setShowUserMenu(!showUserMenu)}
            className='flex items-center space-x-3'
          >
            <div className='w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center font-bold'>
              {user.name.charAt(0)}
            </div>
            <div className='text-left hidden md:block'>
              <div className='font-bold'>{user.name}</div>
              <div className='text-xs text-cyan-400 font-mono'>{user.tier} TIER</div>
            </div>
          </button>
          {showUserMenu && (
            <div className='absolute right-0 mt-4 w-64 ultra-glass border border-white/10 rounded-xl shadow-lg p-4 z-40'>
              <div className='text-center mb-4'>
                <div className='w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center font-bold text-2xl mb-2'>
                  {user.name.charAt(0)}
                </div>
                <h3 className='font-bold text-xl'>{user.name}</h3>
                <p className='text-cyan-400 font-mono'>{user.tier} TIER</p>
              </div>
              <div className='space-y-2'>
                <div className='flex justify-between p-2 bg-gray-800/50 rounded-lg'>
                  <span>Level:</span>
                  <span className='font-bold'>{user.level}</span>
                </div>
                <div className='flex justify-between p-2 bg-gray-800/50 rounded-lg'>
                  <span>Accuracy:</span>
                  <span className='font-bold text-green-400'>{user.accuracy}%</span>
                </div>
                <div className='flex justify-between p-2 bg-gray-800/50 rounded-lg'>
                  <span>Profit:</span>
                  <span className='font-bold text-green-400'>${user.profit.toLocaleString()}</span>
                </div>
              </div>
              <button className='w-full mt-4 py-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors'>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const Sidebar: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { currentPage, setCurrentPage, sidebarCollapsed } = context;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'prop-ollama', label: 'Prop Ollama', icon: Brain },
    { id: 'moneymaker-pro', label: 'MoneyMaker Pro', icon: DollarSign },
    { id: 'prizepicks-pro', label: 'PrizePicks Pro', icon: Trophy },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'saved-lineups', label: 'Saved Lineups', icon: Shield },
    { id: 'real-time', label: 'Real-Time Monitor', icon: Eye },
    { id: 'market-intelligence', label: 'Market Intel', icon: Zap },
    { id: 'ml-dashboard', label: 'ML Dashboard', icon: Atom },
    { id: 'admin', label: 'Admin Panel', icon: Settings },
  ];

  return (
    <aside className={`ultra-glass border-r border-white/10 transition-all duration-500 flex flex-col ${
        sidebarCollapsed ? 'w-24' : 'w-72'}`}
    >
      {/* Logo */}
      <div className='h-24 flex items-center justify-center'>
        <div className='w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center'>
          <Brain className='w-8 h-8 text-white' />
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 px-4 py-6 space-y-2'>
        {navItems.map(item => (
          <button key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
              currentPage === item.id
                ? 'bg-cyan-400/20 text-cyan-300 shadow-lg'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'} ${sidebarCollapsed ? 'justify-center' : ''}`}
          >
            <item.icon className='w-6 h-6' />
            {!sidebarCollapsed && <span className='ml-4 font-semibold'>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className='p-4 border-t border-white/10'>
        <div className={`p-4 rounded-lg bg-gradient-to-br from-gray-700/50 to-gray-800/50 ${
            sidebarCollapsed ? 'text-center' : ''}`}
        >
          {!sidebarCollapsed && <h4 className='font-bold text-white mb-2'>Quantum Status</h4>}
          <div className='flex items-center space-x-2'>
            <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse' />
            <span className={`text-green-400 font-mono text-sm ${sidebarCollapsed ? 'hidden' : ''}`}>
              ALL SYSTEMS OPTIMAL
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

const PageRenderer: React.FC = () => {
  const { currentPage, setCurrentPage } = useContext(AppContext)!;

  switch (currentPage) {
    case 'dashboard':
      return <EnhancedWorkingDashboard onNavigate={setCurrentPage} />;
    case 'prop-ollama':
      return <PropOllama />;
    case 'moneymaker-pro':
      return <MoneyMakerPro />;
    case 'prizepicks-pro':
      return <PrizePicksPro />;
    case 'analytics':
      return <UniversalAnalytics />;
    case 'saved-lineups':
      return <SavedLineups />;
    case 'real-time':
      return <WorkingRealTimeMonitor />;
    case 'market-intelligence':
      return <MarketIntelligence />;
    case 'ml-dashboard':
      return <MLModelDashboard />;
    case 'admin':
      return <AdminPanel />;
    case 'settings':
      return <UltimateSettingsPage />;
    default:
      return <EnhancedWorkingDashboard onNavigate={setCurrentPage} />;
  }
};

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

const QuantumSportsPlatform: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('prizepicks-pro');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState('quantum-dark');

  // Real data hooks
  const { user } = useAuth();
  const { data: realTimeData } = useRealtimeData();
  const { notifications } = useBettingData();

  // Particle effects
  useEffect(() => {
    const createParticle = () => {
      const particlesContainer = document.getElementById('particles');
      if (!particlesContainer) return;

      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = 8 + Math.random() * 4 + 's';
      particlesContainer.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode) {
          particle.remove();
        }
      }, 12000);
    };

    const particleInterval = setInterval(createParticle, 2000);

    return () => {
      clearInterval(particleInterval);
    };
  }, []);

  // Theme functionality
  const toggleTheme = () => {
    const themes = ['quantum-dark', 'neural-purple', 'cyber-blue', 'quantum-light'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);

    // Apply theme to document body
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${nextTheme}`);

    // Handle light theme
    if (nextTheme === 'quantum-light') {
      document.documentElement.classList.remove('dark');
      document.body.style.background =
        'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #94a3b8 75%, #64748b 100%)';
    } else {
      document.documentElement.classList.add('dark');
      document.body.style.background = '';
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    document.body.classList.add('theme-quantum-dark');
    document.documentElement.classList.add('dark');
  }, []);

  // Toast functionality
  useStore();

  const contextValue: AppContextType = {
    currentPage,
    setCurrentPage,
    sidebarCollapsed,
    setSidebarCollapsed,
    user: user || {
      name: 'Quantum User',
      tier: 'NEURAL',
      level: realTimeData?.activeBots || 0,
      accuracy: realTimeData?.accuracy || 0,
      profit: realTimeData?.profit || 0
    },
    realTimeData: realTimeData || {
      liveGames: 0,
      predictions: 0,
      accuracy: 0,
      profit: 0,
      neuralActivity: 0,
      quantumCoherence: 0,
      dataPoints: 0,
      processingSpeed: 0,
      confidence: 0,
      activeBots: 0,
      winStreak: 0,
      marketAnalysis: 'Loading...'
    },
    notifications: notifications || [],
    theme,
    setTheme,
    toggleTheme
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className='quantum-bg text-white font-sans min-h-screen overflow-x-hidden'>
        {/* Particle Background */}
        <div id='particles' className='fixed inset-0 pointer-events-none z-0' />

        {/* Main layout */}
        <div className='flex min-h-screen'>
          <Sidebar />
          <div className='flex-1 flex flex-col transition-all duration-500'>
            <Header />
            <main className='flex-1 p-10'>
              <PageRenderer />
            </main>
            <footer className='ultra-glass border-t border-white/10 py-8'>
              <div className='text-center'>
                <div className='holographic font-bold mb-2 text-lg font-cyber'>
                  A1BETTING ULTIMATE QUANTUM INTELLIGENCE
                </div>
                <div className='text-sm text-gray-400 font-mono'>
                  © 2024 Neural Sports Intelligence Platform • 47 AI Agents • 1024 Qubits • Quantum
                  Enhanced • 🧠 Brain Status: OPTIMAL
                </div>
              </div>
            </footer>
          </div>
          <CommandSummarySidebar />
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default (props: any) => (
  <CommandSummaryProvider>
    <QuantumSportsPlatform {...props} />
  </CommandSummaryProvider>
);

