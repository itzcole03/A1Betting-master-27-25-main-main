import { useState, useEffect} from 'react';

interface Settings {
  darkMode: boolean,`n  useMocks: boolean;,`n  logLevel: 'debug' | 'info' | 'warning' | 'error'}

const defaultSettings: Settings = {,`n  darkMode: false,
  useMocks: false,
  logLevel: 'info'
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(() => {
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;});

  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings));}, [settings]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings}))};

  return { settings, updateSettings};};



`
