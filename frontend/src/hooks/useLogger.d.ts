import React, { ReactNode} from 'react.ts';
interface LoggerContextType {
  log: (message: string) => void,`n  error: (message: string) => void,`n  warn: (message: string) => void,`n  info: (message: string) => void}
export declare const useLogger: () => LoggerContextType;
interface LoggerProviderProps {
  children: ReactNode}
export declare const LoggerProvider: React.FC<LoggerProviderProps>;
export Record<string, any>;


`
