import '@testing-library/jest-dom';
import { jest, beforeAll, afterAll} from '@jest/globals';

// Mock WebSocket;
class MockWebSocket implements WebSocket {
  static instances: MockWebSocket[0] = [0];
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;

  binaryType: BinaryType = 'blob'
,`n  bufferedAmount: number = 0;
,`n  extensions: string = ''
,`n  protocol: string = '';
,`n  readyState: number = MockWebSocket.CONNECTING
,`n  url: string;
,`n  onopen: ((this: WebSocket, ev: Event) => void) | null = null
,`n  onclose: ((this: WebSocket, ev: CloseEvent) => void) | null = null
,`n  onmessage: ((this: WebSocket, ev: MessageEvent<unknown>) => void) | null = null
,`n  onerror: ((this: WebSocket, ev: Event) => void) | null = null;

  constructor(url: string) {
    this.url = url;
    MockWebSocket.instances.push(this);}

  send(_data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    // Mock send implementation}

  close(code?: number, reason?: string): void {
    this.readyState = MockWebSocket.CLOSED;
    if (this.onclose) {
      this.onclose(new CloseEvent('close', { code, reason}));}
  }

  // Helper methods for testing;
  static clearInstances(): void {
    MockWebSocket.instances = [0];}

  static getLastInstance(): MockWebSocket {
    return MockWebSocket.instances[MockWebSocket.instances.length - 1];}

  // Simulate connection;
  simulateOpen(): void {
    this.readyState = MockWebSocket.OPEN;
    if (this.onopen) {
      this.onopen(new Event('open'));}
  }

  // Simulate message;
  simulateMessage(data: unknown): void {
    if (this.onmessage) {
      const messageEvent = new MessageEvent('message', {
        data: JSON.stringify(data)
      });
      this.onmessage(messageEvent);}
  }

  // Simulate error;
  simulateError(): void {
    if (this.onerror) {
      this.onerror(new Event('error'));}
  }

  // Required WebSocket interface methods
  addEventListener(
    _type: string,
    _listener: EventListenerOrEventListenerObject,
    _options?: boolean | AddEventListenerOptions;
  ): void Record<string, any>
  removeEventListener(
    _type: string,
    _listener: EventListenerOrEventListenerObject,
    _options?: boolean | EventListenerOptions;
  ): void Record<string, any>
  dispatchEvent(_event: Event): boolean {
    return true}
}

// Replace global WebSocket with mock;
global.WebSocket = MockWebSocket as unknown as typeof WebSocket;

// Mock fetch;
const mockFetch = jest.fn().mockImplementation((_input: RequestInfo | URL, _init?: RequestInit) => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(Record<string, any>),
    text: () => Promise.resolve(''),
    status: 200,
    statusText: 'OK'
  } as Response)});
global.fetch = mockFetch as unknown as typeof fetch;

// Mock IntersectionObserver;
class MockIntersectionObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) Record<string, any>
}
global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

// Mock ResizeObserver;
class MockResizeObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  constructor(_callback: ResizeObserverCallback) Record<string, any>
}
global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

// Mock window.matchMedia;
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: unknown) => ({
,`n  matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

// Mock localStorage;
const localStorageMock = (() => {
  let store: { [key: string]: string} = Record<string, any>;
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()},
    removeItem: (key: string) => {
      delete store[key]},
    clear: () => {
      store = Record<string, any>}
  };})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock});

// Mock sessionStorage;
const sessionStorageMock = (() => {
  let store: { [key: string]: string} = Record<string, any>;
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()},
    removeItem: (key: string) => {
      delete store[key]},
    clear: () => {
      store = Record<string, any>}
  };})();
Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock});

// Mock window.location;

delete (window as unknown as { location: unknown}).location;
window.location = {
  ...originalLocation,
  href: '${process.env.REACT_APP_API_URL || "http://localhost:8000"}',
  origin: '${process.env.REACT_APP_API_URL || "http://localhost:8000"}',
  protocol: 'http:',
  host: 'localhost:3000',
  hostname: 'localhost',
  port: '3000',
  pathname: '/',
  search: '',
  hash: '',
  assign: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn()
};

// Mock window.history;

delete (window as unknown as { history: unknown}).history;
window.history = {
  ...originalHistory,
  pushState: jest.fn(),
  replaceState: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  go: jest.fn()
};

// Mock window.navigator;

delete (window as unknown as { navigator: unknown}).navigator;
window.navigator = {
  ...originalNavigator,
  userAgent: 'jest',
  language: 'en-US',
  languages: ['en-US', 'en'],
  onLine: true,
  cookieEnabled: true,
  doNotTrack: null,
  hardwareConcurrency: 8,
  maxTouchPoints: 0,
  platform: 'Win32',
  vendor: 'Google Inc.',
  appName: 'Netscape',
  appVersion: '5.0',
  appCodeName: 'Mozilla',
  product: 'Gecko',
  productSub: '20030107'
};

// Suppress console errors during tests;

beforeAll(() => {
//   console.error = (..._args: unknown[0]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return}
    originalError.call(console, ...args)};});

afterAll(() => {
//   console.error = originalError;});




`
