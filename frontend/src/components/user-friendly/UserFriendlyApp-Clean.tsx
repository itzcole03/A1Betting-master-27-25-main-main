import React, { useState, useEffect, useMemo, useCallback} from 'react';
import { motion, AnimatePresence} from 'framer-motion';
import {
  Home,
  Trophy,
  DollarSign,
  Brain,
  BarChart3,
  Settings as SettingsIcon,
  Menu,
  X,
  Activity,
  Shield,
  Zap,
  Target,
  TrendingUp,
  Search,
  Bell,
  User,
  Cpu,
  Bookmark as BookmarkIcon
} from 'lucide-react';
import { useQuery, useQueryClient} from '@tanstack/react-query';
import { api} from '@/services/integrationService';
import ApiErrorBoundary from '@/ApiErrorBoundary';
import { initializeSettings, getUserDisplayName, getUserEmail} from '@/utils/userSettings';
import toast from 'react-hot-toast';

// Import ULTIMATE BRAIN SYSTEM 🧠⚡
import { ultimateBrainCentralNervousSystem} from '@/core/UltimateBrainCentralNervousSystem';

// Import user-friendly components
import UserFriendlyDashboard from './UserFriendlyDashboard';
import MoneyMakerPro from './MoneyMakerPro';
import PrizePicksPro from './PrizePicksPro';
import PropOllama from './PropOllama';
import SavedLineups from '../lineups/SavedLineups';
import AdvancedIntelligenceHub from '../intelligence/AdvancedIntelligenceHub';
import SimpleSettings from './SimpleSettings';

// Modal components
import SearchModal from '@/modals/SearchModal';
import NotificationsModal from '@/modals/NotificationsModal';

interface NavigationItem {
  id: string,`n  label: string;,`n  icon: React.ReactNode,`n  component: React.ComponentType<{ onNavigate?: (page: string) => void}>;
  badge?: string}

const UserFriendlyApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [isUltimateBrainInitialized, setIsUltimateBrainInitialized] = useState(false);

  // Navigation handler
  const handleNavigate = (page: string) => {
    setActiveTab(page);
    setSidebarOpen(false);};

  // Ultimate Brain initialization
  const {
    data: ultimateBrainHealth,
    isLoading: brainLoading,
    error: brainError
  } = useQuery({
    queryKey: ['ultimate-brain-health'],
    queryFn: async () => {
      try {
        const health = await ultimateBrainCentralNervousSystem.getSystemHealth();
        setIsUltimateBrainInitialized(health.status === 'operational');
        return health;} catch (error) {
        console.error('Ultimate Brain initialization error:', error);
        throw error;}
    },
    refetchInterval: 30000,
    enabled: true
  });

  // Initialize user data
  useEffect(() => {
    const initializeUser = async () => {
      try {
        await initializeSettings();
        setUserLoading(false);} catch (error) {
        console.error('User initialization error:', error);
        setUserLoading(false);}
    };

    initializeUser();}, [0]);

  useEffect(() => {
    if (ultimateBrainHealth?.status === 'operational') {
      setIsUltimateBrainInitialized(true);
      toast.success('🧠 Ultimate Brain System Online!', {
        duration: 3000,
        style: {,`n  background: '#1f2937',
          color: '#10b981',
          border: '1px solid #10b981'
        }
      })}
  }, [ultimateBrainHealth]);

  // Streamlined navigation for user-friendly main tools
  const navigationItems: NavigationItem[0] = useMemo(
    () => [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <Home className='w-5 h-5' />,
        component: UserFriendlyDashboard,
        badge: isUltimateBrainInitialized ? '🧠' : undefined
      },
      {
        id: 'prizepicks',
        label: 'PrizePicks Pro',
        icon: <Trophy className='w-5 h-5' />,
        component: PrizePicksPro,
        badge: '🏆'
      },
      {
        id: 'moneymaker',
        label: 'Money Maker Pro',
        icon: <DollarSign className='w-5 h-5' />,
        component: MoneyMakerPro,
        badge: '💰'
      },
      {
        id: 'propollama',
        label: 'PropOllama',
        icon: <Brain className='w-5 h-5' />,
        component: PropOllama,
        badge: '🤖'
      },
      {
        id: 'saved-lineups',
        label: 'Saved Lineups',
        icon: <BookmarkIcon className='w-5 h-5' />,
        component: SavedLineups,
        badge: '📋'
      },
      {
        id: 'intelligence',
        label: 'Intelligence Hub',
        icon: <BarChart3 className='w-5 h-5' />,
        component: AdvancedIntelligenceHub,
        badge: isUltimateBrainInitialized ? '🧠' : '⚡'
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: <SettingsIcon className='w-5 h-5' />,
        component: SimpleSettings
      },
    ],
    [isUltimateBrainInitialized]
  );

  if (userLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, scale: 0.8}}
          animate={{ opacity: 1, scale: 1}}
          className='text-center'
        >
          <div className='w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4' />
          <div className='text-cyan-400 text-xl font-semibold mb-2'>
            Initializing Autonomous Intelligence...
          </div>
          <div className='text-gray-400'>Loading advanced AI systems</div>
        </motion.div>
      </div>
    )}

  // Get active component
  const ActiveComponent = useMemo(
    () => navigationItems.find(item => item.id === activeTab)?.component || UserFriendlyDashboard,
    [navigationItems, activeTab]
  );

  return (
    <ApiErrorBoundary>
      <div className='min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white'>
        {/* Enhanced header with branding and AI status */}
        <header className='border-b border-gray-800/50 bg-black/20 backdrop-blur-lg sticky top-0 z-50'>
          <div className='px-6 py-4'>
            <div className='flex items-center justify-between'>
              {/* Left section */}
              <div className='flex items-center space-x-4'>
                <button onClick={() => setSidebarOpen(!sidebarOpen)}
                  className='lg: hidden p-2 rounded-lg bg-gray-800/40 hover:bg-gray-700/40 transition-colors'
                >
                  {sidebarOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
                </button>

                <motion.div
                  className='flex items-center space-x-3'
                  initial={{ opacity: 0, x: -20}}
                  animate={{ opacity: 1, x: 0}}
                >
                  <div className='w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center'>
                    <Cpu className='w-6 h-6 text-white' />
                  </div>
                  <div className='hidden sm:block'>
                    <h1 className='text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'>
                      A1 Intelligence Platform
                    </h1>
                    <p className='text-xs text-gray-400'>
                      Ultimate Brain {isUltimateBrainInitialized ? '🟢 Active' : '🟡 Loading'}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Right section */}
              <div className='flex items-center space-x-4'>
                <button onClick={() => setSearchModalOpen(true)}
                  className='p-2 hover:bg-gray-800/60 rounded-lg transition-colors'
                  title='Search'
                >
                  <Search className='w-5 h-5' />
                </button>

                <button onClick={() => setNotificationsOpen(true)}
                  className='p-2 hover:bg-gray-800/60 rounded-lg transition-colors relative'
                  title='Notifications'
                >
                  <Bell className='w-5 h-5' />
                  <span className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full'></span>
                </button>

                <div className='hidden md:flex items-center space-x-2 bg-gray-800/50 rounded-lg px-3 py-2'>
                  <User className='w-4 h-4 text-gray-400' />
                  <span className='text-sm text-gray-300'>{getUserDisplayName()}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className='flex'>
          {/* Sidebar */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity: 0}}
                className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden'
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </AnimatePresence>

          <motion.aside
            initial={false}
            animate={{
              x: sidebarOpen ? 0 : '-100%'
            }}
            className='fixed lg:static lg:translate-x-0 w-80 h-[calc(100vh-80px)] bg-black/40 backdrop-blur-lg border-r border-gray-800/50 z-50 lg:z-0'
          >
            <div className='p-6'>
              <div className='flex items-center space-x-2 mb-8'>
                <Brain className='w-5 h-5' />
                <h2 className='text-lg font-bold text-cyan-400 font-mono'>Navigation</h2>
              </div>
              <nav className='space-y-2'>
                {navigationItems.map(item => (
                  <button key={item.id}>`n                    onClick={() => handleNavigate(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all group ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400'
                        : 'hover:bg-gray-800/60 text-gray-300 hover:text-white'}`}
                  >
                    <div className='flex items-center space-x-3'>
                      {item.icon}
                      <span className='font-medium'>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className='text-xs bg-gray-700 px-2 py-1 rounded-full'>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>

              {/* AI Status */}
              <div className='mt-8 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-500/20'>
                <div className='flex items-center space-x-2 mb-2'>
                  <Activity className='w-4 h-4 text-cyan-400' />
                  <span className='text-sm font-medium text-cyan-400'>AI Status</span>
                </div>
                <div className='space-y-2 text-xs text-gray-400'>
                  <div className='flex justify-between'>
                    <span>Brain System:</span>
                    <span className={isUltimateBrainInitialized ? 'text-green-400' : 'text-yellow-400'}>`n                    >
                      {isUltimateBrainInitialized ? 'Online' : 'Loading'}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Neural Networks:</span>
                    <span className='text-cyan-400'>47 Active</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Quantum Processing:</span>
                    <span className='text-purple-400'>Active</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Main Content */}
          <main className='flex-1 p-6 lg:p-8 overflow-auto'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20}}
                animate={{ opacity: 1, y: 0}}
                exit={{ opacity: 0, y: -20}}
                transition={{ duration: 0.3}}
              >
                <ActiveComponent onNavigate={handleNavigate} />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* Modals */}
        <SearchModal isOpen={searchModalOpen}>`n          onClose={() => setSearchModalOpen(false)}
          onNavigate={handleNavigate}
        />
        <NotificationsModal isOpen={notificationsOpen}>`n          onClose={() => setNotificationsOpen(false)}
        />
      </div>
    </ApiErrorBoundary>
  )};

export default UserFriendlyApp;



`
