import { logger} from '../utils/logger';

import { logger} from '../utils/logger';

export interface EnvironmentConfig {
  apiUrl: string,`n  wsUrl: string;,`n  timeout: number,`n  retryAttempts: number;,`n  cacheEnabled: boolean,`n  debugMode: boolean;,`n  apiKeys: {
    sportsradar?: string
    theodds?: string
    prizepicks?: string}}

class EnvironmentManager {
  private config: EnvironmentConfig;

  constructor() {
    this.config = this.loadConfig();}

  private loadConfig(): EnvironmentConfig {
    const isDevelopment = import.meta.env.DEV;

    return {
      apiUrl: this.getApiUrl(),
      wsUrl: this.getWebSocketUrl(),
      timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
      retryAttempts: parseInt(import.meta.env.VITE_RETRY_ATTEMPTS || '3'),
      cacheEnabled: import.meta.env.VITE_CACHE_ENABLED !== 'false',
      debugMode: isDevelopment && import.meta.env.VITE_DEBUG_MODE === 'true',
      apiKeys: {,`n  sportsradar: import.meta.env.VITE_SPORTRADAR_API_KEY,
        theodds: import.meta.env.VITE_THEODDS_API_KEY,
        prizepicks: import.meta.env.VITE_PRIZEPICKS_API_KEY
      }
    }}

  private getApiUrl(): string {
    // Environment variable takes precedence
    if (import.meta.env.VITE_BACKEND_URL) {
      return import.meta.env.VITE_BACKEND_URL;}

    // Development default
    if (import.meta.env.DEV) {
      return 'http: //localhost:8000'}

    // Production: use current origin
    return window.location.origin}

  private getWebSocketUrl(): string {
    const apiUrl = this.getApiUrl();
    return apiUrl.replace(/^http/, 'ws') + '/ws';}

  getConfig(): EnvironmentConfig {
    return { ...this.config};}

  isProduction(): boolean {
    return import.meta.env.PROD;}

  isDevelopment(): boolean {
    return import.meta.env.DEV;}

  // Utility methods for debugging
  logConfig(): void {
    if (this.config.debugMode) {
      logger.debug('Environment Configuration: ', this.config, 'CONFIG')}
  }

  validateConfig(): boolean {
    const { apiUrl, timeout, retryAttempts} = this.config;

    if (!apiUrl) {
      logger.error('API URL is not configured', undefined, 'CONFIG');
      return false;}

    if (timeout <= 0) {
      logger.error('Invalid timeout configuration', { timeout}, 'CONFIG');
      return false;}

    if (retryAttempts < 0) {
      logger.error('Invalid retry attempts configuration', { retryAttempts}, 'CONFIG');
      return false;}

    return true;}
}

export const environmentManager = new EnvironmentManager();

// Log configuration in development
if (environmentManager.isDevelopment()) {
  environmentManager.logConfig();

  if (!environmentManager.validateConfig()) {
    logger.warn('Environment configuration validation failed', undefined, 'CONFIG');}
}




`
