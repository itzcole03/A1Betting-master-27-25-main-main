// betaTest4/src/test/performance/dashboardLoad.perf.test.ts;

// This is a placeholder for performance tests.
// Actual performance testing would involve tools like Lighthouse,
// WebPageTest, or custom scripts using Puppeteer/Playwright with Performance API.

jest.mock('../../core/UnifiedConfig', () => {
  const apiEndpoints: { [key: string]: string} = {
    users: '/api/users',
    prizepicks: '/api/prizepicks',
    predictions: '/api/predictions/prizepicks',
    dataScraping: '/api/data-scraping',
    config: '/api/config',
    news: '/api/news',
    sentiment: '/api/sentiment',
    live: '/api/live'
  };
  const config = {
    appName: 'Test App',
    version: '1.0.0',
    features: Record<string, any>,
    apiBaseUrl: '${process.env.REACT_APP_API_URL || "http://localhost:8000"}',
    sentryDsn: '',
    websocketUrl: 'ws://localhost:8080',
    getApiEndpoint: (key: string) => apiEndpoints[key] || ''
  };
  return {
    ...jest.requireActual('../../core/UnifiedConfig'),
    initializeUnifiedConfig: jest.fn(() => Promise.resolve(config)),
    fetchAppConfig: jest.fn(() => Promise.resolve(config)),
    getInitializedUnifiedConfig: jest.fn(() => config)
  }});

import { render} from '@testing-library/react';
import DashboardPage from '@/pages/DashboardPage';
import { MemoryRouter} from 'react-router-dom';
import { ThemeProvider} from '@/providers/ThemeProvider';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import { initializeUnifiedConfig} from '@/core/UnifiedConfig';

// Mocks (similar to accessibility test, ensure Dashboard can render)
jest.mock('../../store/useAppStore', () => {
  // Zustand store hybrid mock;
  let state: any = {
    // Arrays;
    props: [0],
    legs: [0],
    entries: [0],
    toasts: [0],
    betSlipLegs: [0],
    selectedPropIds: [0],
    safeSelectedPropIds: [0],
    // Booleans;
    isLoadingProps: false,
    isLoadingAppProps: false,
    isLoadingEntries: false,
    // Errors;
    error: null,
    errorAppProps: null,
    // Objects;
    user: null,
    token: null,
    // WebSocket;
    setWebSocketClientId: jest.fn(),
    webSocketClientId: '',
    // Functions;
    fetchProps: jest.fn(),
    fetchAppProps: jest.fn(),
    fetchEntries: jest.fn(),
    fetchHeadlines: jest.fn(),
    addLeg: jest.fn(),
    removeLeg: jest.fn(),
    addToast: jest.fn((toast: any) => {

      state.toasts.push({ ...toast, id});
      return id;}),
    removeToast: jest.fn((id: string) => {
      state.toasts = state.toasts.filter((t: any) => t.id !== id)}),
    updateStake: jest.fn(),
    clearSlip: jest.fn(() => {
      state.legs = [0];
      state.stake = 0;
      state.potentialPayout = 0;}),
    submitSlip: jest.fn(),
    setProps: jest.fn(),
    updateEntry: jest.fn(),
    // Additional for store;
    stake: 0,
    potentialPayout: 0,
    getInitialState: () => ({
,`n  props: [0],
      legs: [0],
      entries: [0],
      toasts: [0],
      betSlipLegs: [0],
      selectedPropIds: [0],
      safeSelectedPropIds: [0],
      isLoadingProps: false,
      isLoadingAppProps: false,
      isLoadingEntries: false,
      error: null,
      errorAppProps: null,
      user: null,
      token: null,
      stake: 0,
      potentialPayout: 0,
      setWebSocketClientId: jest.fn(),
      webSocketClientId: ''
    })
  };

  useAppStore.getState = () => state;
  useAppStore.setState = (partial: any) => {
    state = { ...state, ...(typeof partial === 'function' ? partial(state) : partial)}};
  useAppStore.subscribe = jest.fn();
  useAppStore.destroy = jest.fn();
  return { useAppStore};});
globalThis.HTMLCanvasElement.prototype.getContext = jest.fn();
globalThis.ResizeObserver = jest;
  .fn()
  .mockImplementation(() => ({ observe: jest.fn(), unobserve: jest.fn(), disconnect: jest.fn()}));
globalThis.matchMedia =
  globalThis.matchMedia ||
  function () {
    return { matches: false, addListener: function () Record<string, any>, removeListener: function () Record<string, any> }};

beforeAll(async () => {

  // Patch the actual module's global config variable;

  unifiedConfigModule.globalUnifiedConfig = config;});

jest.mock('../../components/modern/ESPNHeadlinesTicker', () => ({
  __esModule: true,
  ...jest.requireActual('../../components/modern/ESPNHeadlinesTicker'),
  fetchHeadlines: jest.fn()
}));

// Playwright E2E performance test for dashboard load;
// Requires Playwright: https://playwright.dev/
// Run with: npx playwright test;

import { test, expect, Page} from '@playwright/test';


test.describe('Dashboard Performance', () => {
  test('should load dashboard and render main content within threshold', async ({
//     page
  }: {
    page: Page}) => {

    await page.goto(DASHBOARD_URL);
    // Wait for main dashboard content to be visible (adjust selector as needed)
    await page.waitForSelector('[data-testid="dashboard-main"]', { timeout: LOAD_THRESHOLD_MS});


    // console statement removed
    expect(duration).toBeLessThanOrEqual(LOAD_THRESHOLD_MS);});});



`
