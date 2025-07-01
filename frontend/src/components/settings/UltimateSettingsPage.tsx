import React, { useState} from 'react';
import { motion} from 'framer-motion';
import {
  Save,
  Download,
  Undo,
  X,
  User,
  Settings,
  Crown,
  Brain,
  Shield,
  Sliders,
  Trophy,
//   Code
} from 'lucide-react';

interface ProfileData {
  name: string,`n  email: string;,`n  bio: string,`n  location: string;,`n  timezone: string,`n  avatar: string | null;,`n  phone: string,`n  website: string;,`n  social: {,`n  twitter: string;,`n  linkedin: string,`n  discord: string}}

interface Preferences {
  notifications: {,`n  email: boolean;,`n  push: boolean,`n  sms: boolean;,`n  discord: boolean,`n  telegram: boolean};
  privacy: {,`n  profileVisible: boolean;,`n  showStats: boolean,`n  shareAchievements: boolean;,`n  allowAnalytics: boolean};
  display: {,`n  theme: string;,`n  language: string,`n  currency: string;,`n  dateFormat: string,`n  timeFormat: string};
  neural: {,`n  autoOptimize: boolean;,`n  customModels: boolean,`n  dataSharing: boolean;,`n  advancedMetrics: boolean}}

const UltimateSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('preferences');
  const [theme, setTheme] = useState('quantum-dark');

  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Alex Chen',
    email: 'alex@quantumsports.ai',
    bio: 'Quantum sports analyst with 5+ years of neural network experience. Specializing in high-frequency betting strategies and AI-driven profit optimization.',
    location: 'San Francisco, CA',
    timezone: 'PST',
    avatar: null,
    phone: '+1 (555) 123-4567',
    website: 'https://quantumsports.ai',
    social: {,`n  twitter: '@alexchen_ai',
      linkedin: 'alex-chen-quantum',
      discord: 'AlexQuantum#1337'
    }
  });

  const [preferences, setPreferences] = useState<Preferences>({
    notifications: {,`n  email: true,
      push: true,
      sms: false,
      discord: true,
      telegram: false
    },
    privacy: {,`n  profileVisible: true,
      showStats: true,
      shareAchievements: true,
      allowAnalytics: true
    },
    display: {,`n  theme: theme,
      language: 'en',
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h'
    },
    neural: {,`n  autoOptimize: true,
      customModels: false,
      dataSharing: true,
      advancedMetrics: true
    }
  });

  const subscriptionData = {
    currentPlan: 'Quantum Pro',
    planColor: 'text-electric-400',
    planIcon: '⚛️',
    nextBilling: '2024-02-15',
    features: [
      'Unlimited Neural Networks',
      'Quantum Processing',
      'Real-time Analytics',
      'Advanced Prop Analysis',
      'Premium Support',
      'API Access',
      'Custom Models',
      'White-label Options',
    ],
    usage: {,`n  predictions: { used: 8247, limit: 'Unlimited'},
      aiQueries: { used: 1293, limit: 'Unlimited'},
      dataExports: { used: 47, limit: 100},
      apiCalls: { used: 23847, limit: 'Unlimited'}
    }
  };

  const achievements = [
    {
      id: 1,
      name: 'Neural Master',
      icon: '🧠',
      description: 'Used 47 neural networks',
      rarity: 'legendary',
      color: 'text-purple-400'
    },
    {
      id: 2,
      name: 'Quantum Sage',
      icon: '⚛️',
      description: 'Achieved 99%+ accuracy',
      rarity: 'mythic',
      color: 'text-cyan-400'
    },
    {
      id: 3,
      name: 'Profit Prophet',
      icon: '💰',
      description: 'Generated $100K+ profit',
      rarity: 'legendary',
      color: 'text-green-400'
    },
    {
      id: 4,
      name: 'Speed Demon',
      icon: '⚡',
      description: 'Sub-5ms processing',
      rarity: 'epic',
      color: 'text-yellow-400'
    },
    {
      id: 5,
      name: 'Data Wizard',
      icon: '📊',
      description: 'Processed 1M+ data points',
      rarity: 'rare',
      color: 'text-blue-400'
    },
    {
      id: 6,
      name: 'Streak King',
      icon: '🔥',
      description: '50+ win streak',
      rarity: 'epic',
      color: 'text-orange-400'
    },
  ];

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User, color: 'text-electric-400'},
    { id: 'account', name: 'Account', icon: Settings, color: 'text-blue-400'},
    { id: 'subscription', name: 'Subscription', icon: Crown, color: 'text-yellow-400'},
    { id: 'neural', name: 'Neural AI', icon: Brain, color: 'text-purple-400'},
    { id: 'security', name: 'Security', icon: Shield, color: 'text-red-400'},
    { id: 'preferences', name: 'Preferences', icon: Sliders, color: 'text-green-400'},
    { id: 'achievements', name: 'Achievements', icon: Trophy, color: 'text-orange-400'},
    { id: 'api', name: 'API Access', icon: Code, color: 'text-cyan-400'},
  ];

  const exportData = () => {
    const data = {
      profile: profileData,
      preferences: preferences,
      achievements: achievements,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quantum-settings-export.json';
    a.click();
    URL.revokeObjectURL(url);};

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className='space-y-6'>
            <h3 className='text-2xl font-bold text-white font-cyber'>QUANTUM PROFILE</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-bold mb-2 text-electric-400 font-cyber'>
//                   NAME
                </label>
                <input type='text'
                  value={profileData.name}>`n                  onChange={e => setProfileData({ ...profileData, name: e.target.value})}
                  className='w-full p-4 rounded-xl border-2 border-electric-500/30 focus:border-electric-500 bg-gray-900/50'
                />
              </div>
              <div>
                <label className='block text-sm font-bold mb-2 text-electric-400 font-cyber'>
//                   EMAIL
                </label>
                <input type='email'
                  value={profileData.email}>`n                  onChange={e => setProfileData({ ...profileData, email: e.target.value})}
                  className='w-full p-4 rounded-xl border-2 border-electric-500/30 focus:border-electric-500 bg-gray-900/50'
                />
              </div>
              <div className='md:col-span-2'>
                <label className='block text-sm font-bold mb-2 text-electric-400 font-cyber'>
//                   BIO
                </label>
                <textarea value={profileData.bio}>`n                  onChange={e => setProfileData({ ...profileData, bio: e.target.value})}
                  rows={4}
                  className='w-full p-4 rounded-xl border-2 border-electric-500/30 focus:border-electric-500 bg-gray-900/50'
                />
              </div>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className='space-y-8'>
            <h3 className='text-2xl font-bold text-white font-cyber'>QUANTUM PREFERENCES</h3>

            {/* Notifications */}
            <div className='quantum-card p-6 rounded-2xl'>
              <h4 className='text-lg font-bold text-electric-400 mb-4'>Notifications</h4>
              <div className='grid grid-cols-2 gap-4'>
                {Object.entries(preferences.notifications).map(([key, value]) => (
                  <label key={key} className='flex items-center space-x-3'>
                    <input type='checkbox'
                      checked={value}>`n                      onChange={e =>
                        setPreferences({
                          ...preferences,
                          notifications: { ...preferences.notifications, [key]: e.target.checked}
                        })}
                      className='w-4 h-4'
                    />
                    <span className='text-gray-300 font-mono capitalize'>{key}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Display Settings */}
            <div className='quantum-card p-6 rounded-2xl'>
              <h4 className='text-lg font-bold text-electric-400 mb-4'>Display Settings</h4>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-bold mb-2 text-purple-400'>Theme</label>
                  <select value={preferences.display.theme}>`n                    onChange={e => {
                      const newTheme = e.target.value;
                      setTheme(newTheme);
                      setPreferences({
                        ...preferences,
                        display: { ...preferences.display, theme: newTheme}
                      })}}
                    className='w-full p-3 rounded-xl border-2 border-electric-500/30 focus:border-electric-500 bg-gray-900/50'
                  >
                    <option value='quantum-dark'>Quantum Dark</option>
                    <option value='neural-blue'>Neural Blue</option>
                    <option value='cyber-purple'>Cyber Purple</option>
                    <option value='matrix-green'>Matrix Green</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-bold mb-2 text-purple-400'>Currency</label>
                  <select value={preferences.display.currency}>`n                    onChange={e =>
                      setPreferences({
                        ...preferences,
                        display: { ...preferences.display, currency: e.target.value}
                      })}
                    className='w-full p-3 rounded-xl border-2 border-electric-500/30 focus:border-electric-500 bg-gray-900/50'
                  >
                    <option value='USD'>USD ($)</option>
                    <option value='EUR'>EUR (€)</option>
                    <option value='GBP'>GBP (£)</option>
                    <option value='BTC'>BTC (₿)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'subscription':
        return (
          <div className='space-y-6'>
            <h3 className='text-2xl font-bold text-white font-cyber'>QUANTUM SUBSCRIPTION</h3>

            <div className='quantum-card p-8 rounded-2xl border-2 border-electric-500/30'>
              <div className='flex items-center space-x-4 mb-6'>
                <div className='text-4xl'>{subscriptionData.planIcon}</div>
                <div>
                  <h4 className={`text-2xl font-bold ${subscriptionData.planColor} font-cyber`}>
                    {subscriptionData.currentPlan}
                  </h4>
                  <p className='text-gray-400 font-mono'>
                    Next billing: {subscriptionData.nextBilling}
                  </p>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div>
                  <h5 className='text-lg font-bold text-white mb-4'>Features</h5>
                  <div className='space-y-2'>
                    {subscriptionData.features.map((feature, index) => (
                      <div key={index} className='flex items-center space-x-2'>
                        <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                        <span className='text-gray-300 font-mono'>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className='text-lg font-bold text-white mb-4'>Usage</h5>
                  <div className='space-y-3'>
                    {Object.entries(subscriptionData.usage).map(([key, data]) => (
                      <div key={key}>
                        <div className='flex justify-between text-sm mb-1'>
                          <span className='text-gray-400 capitalize'>
                            {key.replace(/([A-Z])/g, ' $1')}
                          </span>
                          <span className='text-electric-400'>
                            {data.used} / {data.limit}
                          </span>
                        </div>
                        <div className='w-full bg-gray-700 rounded-full h-2'>
                          <div className='bg-electric-400 h-2 rounded-full'
                            style={{
                              width:
                                data.limit === 'Unlimited'
                                  ? '100%'
                                  : `${(data.used / data.limit) * 100}%`
                            }}>`n                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'account':
        return (
          <div className='space-y-6'>
            <h3 className='text-2xl font-bold text-white font-cyber'>ACCOUNT SETTINGS</h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='quantum-card p-6 rounded-2xl'>
                <h4 className='text-lg font-bold text-blue-400 mb-4'>Contact Information</h4>
                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-bold mb-2 text-gray-300'>Phone</label>
                    <input type='tel'
                      value={profileData.phone}>`n                      onChange={e => setProfileData({ ...profileData, phone: e.target.value})}
                      className='w-full p-3 rounded-xl border border-gray-600 bg-gray-900/50 text-white'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-bold mb-2 text-gray-300'>Website</label>
                    <input type='url'
                      value={profileData.website}>`n                      onChange={e => setProfileData({ ...profileData, website: e.target.value})}
                      className='w-full p-3 rounded-xl border border-gray-600 bg-gray-900/50 text-white'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-bold mb-2 text-gray-300'>Location</label>
                    <input type='text'
                      value={profileData.location}>`n                      onChange={e => setProfileData({ ...profileData, location: e.target.value})}
                      className='w-full p-3 rounded-xl border border-gray-600 bg-gray-900/50 text-white'
                    />
                  </div>
                </div>
              </div>

              <div className='quantum-card p-6 rounded-2xl'>
                <h4 className='text-lg font-bold text-blue-400 mb-4'>Social Connections</h4>
                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-bold mb-2 text-gray-300'>Twitter</label>
                    <input type='text'
                      value={profileData.social.twitter}>`n                      onChange={e =>
                        setProfileData({
                          ...profileData,
                          social: { ...profileData.social, twitter: e.target.value}
                        })}
                      className='w-full p-3 rounded-xl border border-gray-600 bg-gray-900/50 text-white'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-bold mb-2 text-gray-300'>LinkedIn</label>
                    <input type='text'
                      value={profileData.social.linkedin}>`n                      onChange={e =>
                        setProfileData({
                          ...profileData,
                          social: { ...profileData.social, linkedin: e.target.value}
                        })}
                      className='w-full p-3 rounded-xl border border-gray-600 bg-gray-900/50 text-white'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-bold mb-2 text-gray-300'>Discord</label>
                    <input type='text'
                      value={profileData.social.discord}>`n                      onChange={e =>
                        setProfileData({
                          ...profileData,
                          social: { ...profileData.social, discord: e.target.value}
                        })}
                      className='w-full p-3 rounded-xl border border-gray-600 bg-gray-900/50 text-white'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'neural':
        return (
          <div className='space-y-6'>
            <h3 className='text-2xl font-bold text-white font-cyber'>NEURAL AI CONFIGURATION</h3>

            <div className='quantum-card p-6 rounded-2xl border border-purple-500/20'>
              <h4 className='text-lg font-bold text-purple-400 mb-6'>Neural Network Settings</h4>
              <div className='space-y-6'>
                <div className='flex items-center justify-between p-4 bg-gray-800/40 rounded-xl'>
                  <div>
                    <div className='font-bold text-white'>Auto-Optimization</div>
                    <div className='text-sm text-gray-400'>
                      Automatically optimize neural parameters
                    </div>
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input type='checkbox'
                      checked={preferences.neural.autoOptimize}>`n                      onChange={e =>
                        setPreferences({
                          ...preferences,
                          neural: { ...preferences.neural, autoOptimize: e.target.checked}
                        })}
                      className='sr-only peer'
                    />
                    <div className='w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600'></div>
                  </label>
                </div>

                <div className='flex items-center justify-between p-4 bg-gray-800/40 rounded-xl'>
                  <div>
                    <div className='font-bold text-white'>Custom Models</div>
                    <div className='text-sm text-gray-400'>Enable custom neural model training</div>
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input type='checkbox'
                      checked={preferences.neural.customModels}>`n                      onChange={e =>
                        setPreferences({
                          ...preferences,
                          neural: { ...preferences.neural, customModels: e.target.checked}
                        })}
                      className='sr-only peer'
                    />
                    <div className='w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600'></div>
                  </label>
                </div>

                <div className='flex items-center justify-between p-4 bg-gray-800/40 rounded-xl'>
                  <div>
                    <div className='font-bold text-white'>Data Sharing</div>
                    <div className='text-sm text-gray-400'>
                      Share anonymized data to improve models
                    </div>
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input type='checkbox'
                      checked={preferences.neural.dataSharing}>`n                      onChange={e =>
                        setPreferences({
                          ...preferences,
                          neural: { ...preferences.neural, dataSharing: e.target.checked}
                        })}
                      className='sr-only peer'
                    />
                    <div className='w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600'></div>
                  </label>
                </div>

                <div className='flex items-center justify-between p-4 bg-gray-800/40 rounded-xl'>
                  <div>
                    <div className='font-bold text-white'>Advanced Metrics</div>
                    <div className='text-sm text-gray-400'>
                      Show detailed neural network metrics
                    </div>
                  </div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input type='checkbox'
                      checked={preferences.neural.advancedMetrics}>`n                      onChange={e =>
                        setPreferences({
                          ...preferences,
                          neural: { ...preferences.neural, advancedMetrics: e.target.checked}
                        })}
                      className='sr-only peer'
                    />
                    <div className='w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600'></div>
                  </label>
                </div>
              </div>
            </div>

            <div className='quantum-card p-6 rounded-2xl'>
              <h4 className='text-lg font-bold text-purple-400 mb-4'>Neural Performance</h4>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                <div className='text-center p-4 bg-gray-800/40 rounded-xl'>
                  <div className='text-2xl font-bold text-electric-400'>47</div>
                  <div className='text-sm text-gray-400'>Active Models</div>
                </div>
                <div className='text-center p-4 bg-gray-800/40 rounded-xl'>
                  <div className='text-2xl font-bold text-green-400'>94.7%</div>
                  <div className='text-sm text-gray-400'>Avg Accuracy</div>
                </div>
                <div className='text-center p-4 bg-gray-800/40 rounded-xl'>
                  <div className='text-2xl font-bold text-cyan-400'>12ms</div>
                  <div className='text-sm text-gray-400'>Response Time</div>
                </div>
                <div className='text-center p-4 bg-gray-800/40 rounded-xl'>
                  <div className='text-2xl font-bold text-purple-400'>2.4M</div>
                  <div className='text-sm text-gray-400'>Predictions</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className='space-y-6'>
            <h3 className='text-2xl font-bold text-white font-cyber'>SECURITY SETTINGS</h3>

            <div className='quantum-card p-6 rounded-2xl border border-red-500/20'>
              <h4 className='text-lg font-bold text-red-400 mb-6'>Authentication & Access</h4>
              <div className='space-y-6'>
                <div className='p-4 bg-gray-800/40 rounded-xl'>
                  <div className='flex items-center justify-between mb-4'>
                    <div>
                      <div className='font-bold text-white'>Two-Factor Authentication</div>
                      <div className='text-sm text-gray-400'>Add an extra layer of security</div>
                    </div>
                    <button className='px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/40 rounded-lg hover:bg-green-500/30'>
                      Enable 2FA
                    </button>
                  </div>
                </div>

                <div className='p-4 bg-gray-800/40 rounded-xl'>
                  <div className='flex items-center justify-between mb-4'>
                    <div>
                      <div className='font-bold text-white'>API Key Management</div>
                      <div className='text-sm text-gray-400'>Manage your API access keys</div>
                    </div>
                    <button className='px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/40 rounded-lg hover:bg-blue-500/30'>
                      Manage Keys
                    </button>
                  </div>
                </div>

                <div className='p-4 bg-gray-800/40 rounded-xl'>
                  <div className='flex items-center justify-between mb-4'>
                    <div>
                      <div className='font-bold text-white'>Session Management</div>
                      <div className='text-sm text-gray-400'>View and manage active sessions</div>
                    </div>
                    <button className='px-4 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 rounded-lg hover:bg-yellow-500/30'>
                      View Sessions
                    </button>
                  </div>
                </div>

                <div className='p-4 bg-gray-800/40 rounded-xl'>
                  <div className='flex items-center justify-between mb-4'>
                    <div>
                      <div className='font-bold text-white'>Change Password</div>
                      <div className='text-sm text-gray-400'>Update your account password</div>
                    </div>
                    <button className='px-4 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/40 rounded-lg hover:bg-purple-500/30'>
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className='quantum-card p-6 rounded-2xl'>
              <h4 className='text-lg font-bold text-red-400 mb-4'>Privacy Controls</h4>
              <div className='space-y-4'>
                {Object.entries(preferences.privacy).map(([key, value]) => (
                  <div key={key}
                    className='flex items-center justify-between p-3 bg-gray-800/40 rounded-lg'>`n                  >
                    <div>
                      <div className='font-bold text-white capitalize'>
                        {key.replace(/([A-Z])/g, ' $1')}
                      </div>
                      <div className='text-sm text-gray-400'>
                        {key === 'profileVisible' && 'Make your profile visible to other users'}
                        {key === 'showStats' && 'Display your statistics publicly'}
                        {key === 'shareAchievements' && 'Share achievements with the community'}
                        {key === 'allowAnalytics' && 'Allow anonymous usage analytics'}
                      </div>
                    </div>
                    <label className='relative inline-flex items-center cursor-pointer'>
                      <input type='checkbox'
                        checked={value}>`n                        onChange={e =>
                          setPreferences({
                            ...preferences,
                            privacy: { ...preferences.privacy, [key]: e.target.checked}
                          })}
                        className='sr-only peer'
                      />
                      <div className='w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600'></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className='space-y-6'>
            <h3 className='text-2xl font-bold text-white font-cyber'>API ACCESS CONTROL</h3>

            <div className='quantum-card p-6 rounded-2xl border border-cyan-500/20'>
              <h4 className='text-lg font-bold text-cyan-400 mb-6'>API Configuration</h4>
              <div className='space-y-6'>
                <div className='p-4 bg-gray-800/40 rounded-xl'>
                  <div className='mb-4'>
                    <div className='font-bold text-white mb-2'>Primary API Key</div>
                    <div className='flex items-center space-x-4'>
                      <input type='text'
                        value='qnt_1234567890abcdef...'
//                         readOnly
                        className='flex-1 p-3 rounded-lg bg-gray-900 border border-gray-600 text-gray-300 font-mono'>`n                      />
                      <button className='px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 rounded-lg hover:bg-cyan-500/30'>
//                         Copy
                      </button>
                      <button className='px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/40 rounded-lg hover:bg-red-500/30'>
//                         Regenerate
                      </button>
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='p-4 bg-gray-800/40 rounded-xl'>
                    <div className='font-bold text-white mb-4'>Rate Limits</div>
                    <div className='space-y-3'>
                      <div className='flex justify-between'>
                        <span className='text-gray-400'>Requests/Hour</span>
                        <span className='text-cyan-400 font-mono'>10,000</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-400'>Requests/Day</span>
                        <span className='text-cyan-400 font-mono'>100,000</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-400'>Concurrent</span>
                        <span className='text-cyan-400 font-mono'>50</span>
                      </div>
                    </div>
                  </div>

                  <div className='p-4 bg-gray-800/40 rounded-xl'>
                    <div className='font-bold text-white mb-4'>Usage Statistics</div>
                    <div className='space-y-3'>
                      <div className='flex justify-between'>
                        <span className='text-gray-400'>This Hour</span>
                        <span className='text-green-400 font-mono'>247</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-400'>Today</span>
                        <span className='text-green-400 font-mono'>8,934</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-400'>This Month</span>
                        <span className='text-green-400 font-mono'>234,567</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='p-4 bg-gray-800/40 rounded-xl'>
                  <div className='font-bold text-white mb-4'>Endpoint Access</div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {[
                      'Predictions API',
                      'Market Data API',
                      'Neural Models API',
                      'Real-time Feed',
                      'Analytics API',
                      'Quantum Engine',
                    ].map((endpoint, idx) => (
                      <div key={idx}
                        className='flex items-center justify-between p-3 bg-gray-900/50 rounded-lg'>`n                      >
                        <span className='text-gray-300 font-mono'>{endpoint}</span>
                        <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse'></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className='quantum-card p-6 rounded-2xl'>
              <h4 className='text-lg font-bold text-cyan-400 mb-4'>API Documentation</h4>
              <div className='space-y-4'>
                <p className='text-gray-300'>
                  Access comprehensive API documentation and code examples to integrate our neural
                  sports intelligence platform into your applications.
                </p>
                <div className='flex space-x-4'>
                  <button className='flex items-center space-x-2 px-6 py-3 bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 rounded-lg hover:bg-cyan-500/30'>
                    <span>View Docs</span>
                  </button>
                  <button className='flex items-center space-x-2 px-6 py-3 bg-purple-500/20 text-purple-400 border border-purple-500/40 rounded-lg hover:bg-purple-500/30'>
                    <span>Code Examples</span>
                  </button>
                  <button className='flex items-center space-x-2 px-6 py-3 bg-green-500/20 text-green-400 border border-green-500/40 rounded-lg hover:bg-green-500/30'>
                    <span>SDKs</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div className='space-y-6'>
            <h3 className='text-2xl font-bold text-white font-cyber'>QUANTUM ACHIEVEMENTS</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {achievements.map(achievement => (
                <motion.div
                  key={achievement.id}
                  className='quantum-card p-6 rounded-2xl text-center'
                  whileHover={{ scale: 1.05}}
                >
                  <div className='text-4xl mb-3'>{achievement.icon}</div>
                  <h4 className={`text-lg font-bold ${achievement.color} font-cyber`}>
                    {achievement.name}
                  </h4>
                  <p className='text-gray-400 text-sm mt-2'>{achievement.description}</p>
                  <div className={`mt-3 text-xs font-bold uppercase tracking-wider ${achievement.color}`}>`n                  >
                    {achievement.rarity}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      default: return (
          <div className='text-center py-20'>
            <div className='text-gray-500 text-xl font-mono'>
              Select a settings category from the tabs above
            </div>
          </div>
        )}
  };

  return (
    <motion.div
      className='space-y-8'
      initial={{ opacity: 0, y: 20}}
      animate={{ opacity: 1, y: 0}}
      transition={{ duration: 0.5}}
    >
      {/* Header */}
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-white mb-4 animate-cyber-pulse holographic font-cyber'>
          QUANTUM SETTINGS CONTROL
        </h1>
        <p className='text-electric-400 text-lg font-mono'>Configure Your Neural Interface</p>
      </div>

      {/* Navigation Tabs */}
      <div className='flex justify-center'>
        <div className='grid grid-cols-4 gap-2 p-2 quantum-card rounded-2xl'>
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center space-y-2 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? `bg-electric-500/20 ${tab.color} border-2 border-electric-500/40`
                    : 'text-gray-400 hover: text-gray-300'}`}
                whileHover={{ scale: 1.05}}
                whileTap={{ scale: 0.95}}
              >
                <Icon className='w-5 h-5' />
                <span className='text-xs font-bold font-cyber'>{tab.name}</span>
              </motion.button>
            )})}
        </div>
      </div>

      {/* Content */}
      <div className='quantum-card rounded-3xl p-8'>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20}}
          animate={{ opacity: 1, x: 0}}
          transition={{ duration: 0.3}}
        >
          {renderTabContent()}
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className='flex justify-center space-x-6'>
        <motion.button
          onClick={() => Record<string, any>}
          className='flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-500 to-electric-500 text-black font-bold rounded-xl hover:from-green-400 hover:to-electric-400 transition-all duration-300'
          whileHover={{ scale: 1.05}}
          whileTap={{ scale: 0.95}}
        >
          <Save className='w-5 h-5' />
          <span>SAVE QUANTUM CONFIG</span>
        </motion.button>

        <motion.button
          onClick={exportData}
          className='flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-400 hover:to-purple-400 transition-all duration-300'
          whileHover={{ scale: 1.05}}
          whileTap={{ scale: 0.95}}
        >
          <Download className='w-5 h-5' />
          <span>EXPORT DATA</span>
        </motion.button>

        <motion.button
          onClick={() => Record<string, any>}
          className='flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl hover:from-red-400 hover:to-pink-400 transition-all duration-300'
          whileHover={{ scale: 1.05}}
          whileTap={{ scale: 0.95}}
        >
          <Undo className='w-5 h-5' />
          <span>RESET SETTINGS</span>
        </motion.button>
      </div>
    </motion.div>
  )};

export default UltimateSettingsPage;



`
