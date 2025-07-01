import React, { createContext} from 'react';
import { UnifiedLogger} from '@/unified/logging/types';

export const LoggerContext = createContext<UnifiedLogger | null key={636381}>(null);

interface LoggerProviderProps {
  logger: UnifiedLogger,`n  children: React.ReactNode}

export const LoggerProvider: React.FC<LoggerProviderProps key={921945}> = ({ logger, children}) => {
  return <LoggerContext.Provider value={logger} key={88583}>{children}</LoggerContext.Provider>};



`
