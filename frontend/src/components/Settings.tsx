import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Key, Palette, Save } from 'lucide-react';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

const Settings: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isCompactView, setIsCompactView] = useState(false);
  const [apiKeys, setApiKeys] = useState({
    sportsRadar: 'zi7atwynSXOAyizHo1L3fR5Yv8mfBX12LccJbCHb',
    theOddsApi: '8684be37505fc5ce63b0337d472af0ee',
  });

  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: 'live_updates',
      label: 'Live Updates',
      description: 'Get real-time notifications for odds changes',
      enabled: true,
    },
    {
      id: 'arbitrage_alerts',
      label: 'Arbitrage Alerts',
      description: 'Instant notifications for arbitrage opportunities',
      enabled: true,
    },
    {
      id: 'model_updates',
      label: 'Model Updates',
      description: 'Notifications when ML models are updated',
      enabled: false,
    },
  ]);

  const handleNotificationToggle = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, enabled: !notification.enabled } : notification
      )
    );
  };

  const handleApiKeyChange = (key: keyof typeof apiKeys, value: string) => {
    setApiKeys(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log('Settings saved:', { isDarkMode, isCompactView, apiKeys, notifications });
  };

  return (
    <div className='space-y-8 animate-slide-in-up'>
      {/* Header */}
      <div className='text-center'>
        <h1 className='holographic text-5xl font-black mb-4 font-cyber'>QUANTUM SETTINGS</h1>
        <p className='text-xl text-gray-300'>
          Configure your neural interface and system preferences
        </p>
      </div>

      {/* Theme Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='quantum-card p-8 rounded-2xl'
      >
        <h3 className='text-2xl font-bold mb-6 flex items-center text-white'>
          <Palette className='w-6 h-6 mr-3 text-purple-400' />
          Appearance Settings
        </h3>

        <div className='space-y-6'>
          <div className='flex items-center justify-between'>
            <div>
              <div className='text-lg font-semibold text-white'>Dark Mode</div>
              <div className='text-sm text-gray-400'>Use dark theme for the interface</div>
            </div>
            <motion.button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                isDarkMode ? 'bg-electric-500' : 'bg-gray-600'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className='absolute top-1 w-6 h-6 bg-white rounded-full'
                animate={{ x: isDarkMode ? 30 : 2 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          </div>

          <div className='flex items-center justify-between'>
            <div>
              <div className='text-lg font-semibold text-white'>Compact View</div>
              <div className='text-sm text-gray-400'>Use a more condensed interface layout</div>
            </div>
            <motion.button
              onClick={() => setIsCompactView(!isCompactView)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                isCompactView ? 'bg-electric-500' : 'bg-gray-600'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className='absolute top-1 w-6 h-6 bg-white rounded-full'
                animate={{ x: isCompactView ? 30 : 2 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className='quantum-card p-8 rounded-2xl'
      >
        <h3 className='text-2xl font-bold mb-6 flex items-center text-white'>
          <Bell className='w-6 h-6 mr-3 text-blue-400' />
          Notification Settings
        </h3>

        <div className='space-y-4'>
          {notifications.map(notification => (
            <div
              key={notification.id}
              className='flex items-center justify-between p-4 bg-slate-800/50 rounded-xl'
            >
              <div>
                <div className='text-lg font-semibold text-white'>{notification.label}</div>
                <div className='text-sm text-gray-400'>{notification.description}</div>
              </div>
              <motion.button
                onClick={() => handleNotificationToggle(notification.id)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  notification.enabled ? 'bg-electric-500' : 'bg-gray-600'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className='absolute top-1 w-6 h-6 bg-white rounded-full'
                  animate={{ x: notification.enabled ? 30 : 2 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* API Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='quantum-card p-8 rounded-2xl'
      >
        <h3 className='text-2xl font-bold mb-6 flex items-center text-white'>
          <Key className='w-6 h-6 mr-3 text-yellow-400' />
          API Configuration
        </h3>

        <div className='space-y-6'>
          <div>
            <label className='block text-lg font-semibold text-white mb-2'>
              SportsRadar API Key
            </label>
            <input
              type='password'
              value={apiKeys.sportsRadar}
              onChange={e => handleApiKeyChange('sportsRadar', e.target.value)}
              className='w-full p-4 bg-slate-800 border border-slate-600 rounded-xl text-white focus:border-electric-400 focus:outline-none font-mono'
              placeholder='Enter your SportsRadar API key'
            />
          </div>

          <div>
            <label className='block text-lg font-semibold text-white mb-2'>The Odds API Key</label>
            <input
              type='password'
              value={apiKeys.theOddsApi}
              onChange={e => handleApiKeyChange('theOddsApi', e.target.value)}
              className='w-full p-4 bg-slate-800 border border-slate-600 rounded-xl text-white focus:border-electric-400 focus:outline-none font-mono'
              placeholder='Enter your The Odds API key'
            />
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <div className='text-center'>
        <motion.button
          onClick={handleSaveSettings}
          className='px-12 py-4 bg-gradient-to-r from-electric-400 to-neon-blue text-black font-bold text-xl rounded-2xl hover:shadow-neon transition-all duration-300 font-cyber'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Save className='w-6 h-6 mr-3 inline' />
          SAVE QUANTUM SETTINGS
        </motion.button>
      </div>
    </div>
  );
};

export default Settings;
