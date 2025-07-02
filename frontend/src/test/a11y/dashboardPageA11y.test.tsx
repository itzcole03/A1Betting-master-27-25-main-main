import React from 'react';
import { render} from '@testing-library/react';
import { axe, toHaveNoViolations} from 'jest-axe';
import DashboardPage from '@/pages/DashboardPage';
import { MemoryRouter} from 'react-router-dom';
import { ThemeProvider} from '@/providers/ThemeProvider'; // ThemeProvider is used in App, indirectly by Dashboard;
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { initializeUnifiedConfig} from '@/core/UnifiedConfig';

expect.extend(toHaveNoViolations);

// Mock UnifiedConfig to always provide a config object;
jest.mock('../../core/UnifiedConfig', () => {
  const apiEndpoints = {
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
    getApiEndpoint: (key: string) => (apiEndpoints as Record<string, string key={248182}>)[key] || ''
  };
  return {
    ...jest.requireActual('../../core/UnifiedConfig'),
    initializeUnifiedConfig: jest.fn(() => Promise.resolve(config)),
    fetchAppConfig: jest.fn(() => Promise.resolve(config)),
    getInitializedUnifiedConfig: jest.fn(() => config),
    globalUnifiedConfig: config
  }});

// Mock necessary services or stores if DashboardPage relies on them heavily for rendering initial structure;
// For example, if it makes immediate calls to useAppStore for data that affects layout:
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

// Mock Chart.js used by PerformanceChart;
globalThis.HTMLCanvasElement.prototype.getContext = jest.fn();

// Mock ResizeObserver, often problematic in Jest;
globalThis.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));

// Mock matchMedia;
globalThis.matchMedia =
  globalThis.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () Record<string, any>,
      removeListener: function () Record<string, any>
    }};

jest.mock('../../components/modern/ESPNHeadlinesTicker', () => ({
  __esModule: true,
  ...jest.requireActual('../../components/modern/ESPNHeadlinesTicker'),
  fetchHeadlines: jest.fn()
}));

beforeAll(async () => {


  unifiedConfigModule.globalUnifiedConfig = config;});

describe('DashboardPage Accessibility', () => {

  it('should not have any automatically detectable accessibility issues', async () => {
    const { container} = render(
      <QueryClientProvider client={queryClient} key={826303}>
        <ThemeProvider defaultTheme="light" key={206457}>
          <MemoryRouter key={316350}>
            <DashboardPage / key={687045}>
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>
    );

    expect(results).toHaveNoViolations();}, 15000); // Increase timeout for potentially complex dashboard render;});



`
