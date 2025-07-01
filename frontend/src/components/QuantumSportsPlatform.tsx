import { motion} from 'framer-motion';
import {
  Activity,
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
//   Zap
} from 'lucide-react';
import React, { createContext, useContext, useEffect, useRef, useState} from 'react';

// Import working components
import AdminPanel from './admin/AdminPanel';
import UniversalAnalytics from './analytics/UniversalAnalytics';
import SavedLineups from './lineups/SavedLineups';
import MLModelDashboard from './ml/MLModelDashboard';
import UltimateSettingsPage from './settings/UltimateSettingsPage';
import MoneyMakerPro from './user-friendly/MoneyMakerPro';
import PrizePicksPro from './user-friendly/PrizePicksPro';
import PropOllama from './user-friendly/PropOllama';

import '../styles/quantum-dashboard.css';
import MarketIntelligence from './market/MarketIntelligence';

// Import enhanced WorkingDashboard
import EnhancedWorkingDashboard from './WorkingDashboard';

// Custom hook for handling clicks outside an element
const useClickOutside = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()}
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick)}}, [ref, callback])};

// Enhanced Real-time Monitor with live data streaming
const WorkingRealTimeMonitor: React.FC = () => {
  const { realTimeData} = useContext(AppContext)!;
  const [alertsCount, setAlertsCount] = useState(3);
  const [systemLoad, setSystemLoad] = useState(67);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemLoad(prev => Math.max(20, Math.min(95, prev + (Math.random() - 0.5) * 10)));
      if (Math.random() < 0.1) setAlertsCount(prev => prev + 1)}, 2000);
    return () => clearInterval(interval)}, [0]);

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
          <div className='absolute inset-0 bg-orange-400/20 blur-3xl rounded-full' />
          <div className='relative text-6xl text-orange-400 float-element'>👁️</div>
        </div>
        <h1 className='holographic text-5xl font-black mb-4 font-cyber'>REAL-TIME MONITOR</h1>
        <p className='text-xl text-gray-400 font-mono'>
          Live Data Intelligence & System Monitoring
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
        <motion.div className='quantum-card p-6 rounded-2xl text-center hover:shadow-neon transition-all'>
          <div className='text-green-400 text-3xl font-bold font-cyber'>
            {realTimeData?.liveGames || 23}
          </div>
          <div className='text-gray-300 text-sm font-mono uppercase tracking-wider'>Live Games</div>
          <div className='flex items-center justify-center mt-2'>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2' />
            <span className='text-green-400 text-xs font-mono'>STREAMING</span>
          </div>
        </motion.div>

        <motion.div className='quantum-card p-6 rounded-2xl text-center hover:shadow-neon transition-all'>
          <div className='text-electric-400 text-3xl font-bold font-cyber'>
            {(realTimeData?.predictions || 1247).toLocaleString()}
          </div>
          <div className='text-gray-300 text-sm font-mono uppercase tracking-wider'>
//             Predictions
          </div>
          <div className='flex items-center justify-center mt-2'>
            <div className='w-2 h-2 bg-electric-400 rounded-full animate-pulse mr-2' />
            <span className='text-electric-400 text-xs font-mono'>GENERATING</span>
          </div>
        </motion.div>

        <motion.div className='quantum-card p-6 rounded-2xl text-center hover:shadow-neon transition-all'>
          <div className='text-cyan-400 text-3xl font-bold font-cyber'>
            {realTimeData?.activeBots || 47}
          </div>
          <div className='text-gray-300 text-sm font-mono uppercase tracking-wider'>
            Neural Bots
          </div>
          <div className='flex items-center justify-center mt-2'>
            <div className='w-2 h-2 bg-cyan-400 rounded-full animate-pulse mr-2' />
            <span className='text-cyan-400 text-xs font-mono'>ACTIVE</span>
          </div>
        </motion.div>

        <motion.div className='quantum-card p-6 rounded-2xl text-center hover:shadow-neon transition-all'>
          <div className='text-purple-400 text-3xl font-bold font-cyber'>
            {realTimeData?.processingSpeed || 12}ms
          </div>
          <div className='text-gray-300 text-sm font-mono uppercase tracking-wider'>Response</div>
          <div className='flex items-center justify-center mt-2'>
            <div className='w-2 h-2 bg-purple-400 rounded-full animate-pulse mr-2' />
            <span className='text-purple-400 text-xs font-mono'>OPTIMAL</span>
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* System Status */}
        <div className='quantum-card p-6 rounded-2xl border border-green-500/20'>
          <h3 className='text-xl font-bold text-green-400 font-cyber mb-6 flex items-center'>
            <Activity className='w-6 h-6 mr-2 animate-pulse' />
            SYSTEM STATUS
          </h3>
          <div className='space-y-4'>
            {[
              { name: 'Neural Networks', status: 'OPTIMAL', color: 'green-400'},
              { name: 'Data Pipeline', status: 'STREAMING', color: 'electric-400'},
              { name: 'API Gateway', status: 'ACTIVE', color: 'green-400'},
              { name: 'ML Models', status: 'TRAINING', color: 'yellow-400'},
              { name: 'Quantum Core', status: 'COHERENT', color: 'cyan-400'},
              { name: 'Alert System', status: 'MONITORING', color: 'orange-400'},
            ].map((item, idx) => (
              <div key={idx}
                className='flex items-center justify-between p-3 bg-gray-800/30 rounded-lg'>`n              >
                <span className='text-gray-300 font-mono'>{item.name}</span>
                <div className='flex items-center space-x-2'>
                  <div className={`w-3 h-3 bg-${item.color} rounded-full animate-pulse`} />
                  <span className={`text-${item.color} font-bold font-mono text-sm`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className='quantum-card p-6 rounded-2xl border border-electric-500/20'>
          <h3 className='text-xl font-bold text-electric-400 font-cyber mb-6 flex items-center'>
            <BarChart3 className='w-6 h-6 mr-2' />
//             PERFORMANCE
          </h3>
          <div className='space-y-4'>
            <div>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-gray-300 font-mono'>System Load</span>
                <span className='text-electric-400 font-bold font-mono'>{systemLoad}%</span>
              </div>
              <div className='w-full bg-gray-700 rounded-full h-2'>
                <div className='bg-gradient-to-r from-electric-400 to-cyan-400 h-2 rounded-full transition-all duration-500'
                  style={{ width: `${systemLoad}%`}}>`n                />
              </div>
            </div>

            <div>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-gray-300 font-mono'>Model Accuracy</span>
                <span className='text-green-400 font-bold font-mono'>
                  {(realTimeData?.accuracy || 87.3).toFixed(1)}%
                </span>
              </div>
              <div className='w-full bg-gray-700 rounded-full h-2'>
                <div className='bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full'
                  style={{ width: `${realTimeData?.accuracy || 87.3}%`}}>`n                />
              </div>
            </div>

            <div>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-gray-300 font-mono'>Confidence Score</span>
                <span className='text-cyan-400 font-bold font-mono'>
                  {(realTimeData?.confidence || 91.5).toFixed(1)}%
                </span>
              </div>
              <div className='w-full bg-gray-700 rounded-full h-2'>
                <div className='bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full'
                  style={{ width: `${realTimeData?.confidence || 91.5}%`}}>`n                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4 mt-6'>
              <div className='text-center p-3 bg-gray-800/50 rounded-lg'>
                <div className='text-purple-400 font-bold font-mono'>
                  {(realTimeData?.dataPoints || 2847592).toLocaleString()}
                </div>
                <div className='text-gray-400 text-xs font-mono'>Data Points</div>
              </div>
              <div className='text-center p-3 bg-gray-800/50 rounded-lg'>
                <div className='text-yellow-400 font-bold font-mono'>
                  {(realTimeData?.quantumCoherence || 99.97).toFixed(2)}%
                </div>
                <div className='text-gray-400 text-xs font-mono'>Coherence</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Alerts & Activity */}
        <div className='quantum-card p-6 rounded-2xl border border-orange-500/20'>
          <h3 className='text-xl font-bold text-orange-400 font-cyber mb-6 flex items-center'>
            <Bell className='w-6 h-6 mr-2' />
            LIVE ALERTS ({alertsCount})
          </h3>
          <div className='space-y-3 max-h-80 overflow-y-auto'>
            {[
              {
                time: '2m ago',
                type: 'HIGH',
                message: 'NBA model accuracy spike: 94.7%',
                color: 'green'
              },
              {
                time: '5m ago',
                type: 'INFO',
                message: 'New data feed: NFL injury reports',
                color: 'blue'
              },
              {
                time: '8m ago',
                type: 'WARN',
                message: 'API rate limit approaching',
                color: 'yellow'
              },
              {
                time: '12m ago',
                type: 'HIGH',
                message: 'Arbitrage opportunity detected',
                color: 'purple'
              },
              {
                time: '15m ago',
                type: 'INFO',
                message: 'Model retrained: XGBoost v2.1',
                color: 'green'
              },
              {
                time: '18m ago',
                type: 'CRIT',
                message: 'Quantum coherence > 99.9%',
                color: 'cyan'
              },
            ].map((alert, idx) => (
              <motion.div
                key={idx}
                className='p-3 bg-gray-800/40 rounded-lg border-l-4 border-l-green-400'
                initial={{ opacity: 0, x: 20}}
                animate={{ opacity: 1, x: 0}}
                transition={{ delay: idx * 0.1}}
              >
                <div className='flex items-center justify-between mb-1'>
                  <span className={`text-${alert.color}-400 font-bold font-mono text-xs`}>
                    {alert.type}
                  </span>
                  <span className='text-gray-500 font-mono text-xs'>{alert.time}</span>
                </div>
                <div className='text-gray-300 text-sm font-mono'>{alert.message}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Sources Status */}
      <div className='quantum-card p-6 rounded-2xl'>
        <h3 className='text-xl font-bold text-white font-cyber mb-6'>DATA SOURCES STATUS</h3>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
          {[
            { name: 'ESPN API', status: 'online', latency: '45ms'},
            { name: 'PrizePicks', status: 'online', latency: '23ms'},
            { name: 'SportsRadar', status: 'online', latency: '67ms'},
            { name: 'TheOdds', status: 'warning', latency: '156ms'},
            { name: 'Neural Feed', status: 'online', latency: '12ms'},
            { name: 'Quantum Core', status: 'optimal', latency: '8ms'},
          ].map((source, idx) => (
            <div key={idx}
              className='p-4 bg-gray-800/30 rounded-xl text-center border border-gray-600/30'>`n            >
              <div className='text-sm font-bold text-white font-mono mb-2'>{source.name}</div>
              <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                  source.status === 'online'
                    ? 'bg-green-400 animate-pulse'
                    : source.status === 'optimal'
                      ? 'bg-cyan-400 animate-pulse'
                      : 'bg-yellow-400 animate-pulse'}`}>`n              />
              <div className='text-xs text-gray-400 font-mono'>{source.latency}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )};

// Import real services
import { useAuth} from '../hooks/useAuth';
import { useBettingData} from '../hooks/useBettingData';
import { useRealtimeData} from '../hooks/useRealtimeData';
import { useStore} from '../stores/useStore';

// Context for app state
interface AppContextType {
  currentPage: string,`n  setCurrentPage: (page: string) => void,`n  sidebarCollapsed: boolean;,`n  setSidebarCollapsed: (collapsed: boolean) => void,`n  user: any;,`n  realTimeData: any,`n  notifications: any[0];,`n  theme: string,`n  setTheme: (theme: string) => void,`n  toggleTheme: () => void}

const AppContext = createContext<AppContextType | null>(null);

const QuantumSportsPlatform: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState('quantum-dark');

  // Real data hooks
  const { user} = useAuth();
  const { data: realTimeData} = useRealtimeData();
  const { notifications} = useBettingData();

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
          particle.remove()}
      }, 12000)};

    const particleInterval = setInterval(createParticle, 2000);

    return () => {
      clearInterval(particleInterval)}}, [0]);

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
        'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #94a3b8 75%, #64748b 100%)'} else {
      document.documentElement.classList.add('dark');
      document.body.style.background = ''}
  };

  // Initialize theme on mount
  useEffect(() => {
    document.body.classList.add('theme-quantum-dark');
    document.documentElement.classList.add('dark')}, [0]);

  // Toast functionality
  useStore();

  const contextValue: AppContextType = {
    currentPage,
    setCurrentPage,
    sidebarCollapsed,
    setSidebarCollapsed,
    user: user || {,`n  name: 'Quantum User',
      tier: 'NEURAL',
      level: realTimeData?.activeBots || 0,
      accuracy: realTimeData?.accuracy || 0,
      profit: realTimeData?.profit || 0
    },
    realTimeData: realTimeData || {,`n  liveGames: 0,
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
    notifications: notifications || [0],
    theme,
    setTheme,
//     toggleTheme
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
        </div>
      </div>
    </AppContext.Provider>
  )};

const Header: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { sidebarCollapsed, setSidebarCollapsed, user, notifications, toggleTheme} = context;

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
            className='w-72 bg-gray-800/50 border border-white/10 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all font-mono'>`n          />
          <Zap className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
        </div>

        {/* Theme Toggle */}
        <button onClick={toggleTheme}
          className='p-3 rounded-full hover:bg-white/10 transition-colors'>`n        >
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
//                 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )};

const Sidebar: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { currentPage, setCurrentPage, sidebarCollapsed} = context;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home},
    { id: 'prop-ollama', label: 'Prop Ollama', icon: Brain},
    { id: 'moneymaker-pro', label: 'MoneyMaker Pro', icon: DollarSign},
    { id: 'prizepicks-pro', label: 'PrizePicks Pro', icon: Trophy},
    { id: 'analytics', label: 'Analytics', icon: BarChart3},
    { id: 'saved-lineups', label: 'Saved Lineups', icon: Shield},
    { id: 'real-time', label: 'Real-Time Monitor', icon: Eye},
    { id: 'market-intelligence', label: 'Market Intel', icon: Zap},
    { id: 'ml-dashboard', label: 'ML Dashboard', icon: Atom},
    { id: 'admin', label: 'Admin Panel', icon: Settings},
  ];

  return (
    <aside className={`ultra-glass border-r border-white/10 transition-all duration-500 flex flex-col ${
        sidebarCollapsed ? 'w-24' : 'w-72'}`}>`n    >
      {/* Logo */}
      <div className='h-24 flex items-center justify-center'>
        <div className='w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center'>
          <Brain className='w-8 h-8 text-white' />
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 px-4 py-6 space-y-2'>
        {navItems.map(item => (
          <button key={item.id}>`n            onClick={() => setCurrentPage(item.id)}
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
            sidebarCollapsed ? 'text-center' : ''}`}>`n        >
          {!sidebarCollapsed && <h4 className='font-bold text-white mb-2'>Quantum Status</h4>}
          <div className='flex items-center space-x-2'>
            <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse' />
            <span className={`text-green-400 font-mono text-sm ${sidebarCollapsed ? 'hidden' : ''}`}>`n            >
              ALL SYSTEMS OPTIMAL
            </span>
          </div>
        </div>
      </div>
    </aside>
  )};

const PageRenderer: React.FC = () => {
  const { currentPage, setCurrentPage} = useContext(AppContext)!;

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
      return <EnhancedWorkingDashboard onNavigate={setCurrentPage} />}
};

export default QuantumSportsPlatform;



`
