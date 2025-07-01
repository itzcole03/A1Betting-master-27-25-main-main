# A1Betting Frontend-Backend Integration Optimization Implementation Script
# PowerShell version for Windows

param(
    [switch]$SkipBackend = $false
)

Write-Host "🚀 A1Betting Integration Optimization Implementation" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green

function Write-Success {
    param($Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Warning {
    param($Message)
    Write-Host "⚠️ $Message" -ForegroundColor Yellow
}

function Write-Error {
    param($Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

function Write-Info {
    param($Message)
    Write-Host "ℹ️ $Message" -ForegroundColor Blue
}

# Check if we're in the right directory
if (!(Test-Path "package.json") -and !(Test-Path "frontend/package.json")) {
    Write-Error "Please run this script from the project root directory"
    exit 1
}

# Determine directory structure
if (Test-Path "frontend/package.json") {
    $FrontendDir = "frontend"
    $BackendDir = "backend"
}
else {
    $FrontendDir = "."
    $BackendDir = "../backend"
}

Write-Info "Starting integration optimization implementation..."

# Step 1: Create enhanced API client
Write-Info "Step 1: Creating enhanced API client..."

New-Item -ItemType Directory -Force -Path "$FrontendDir/src/services" | Out-Null
New-Item -ItemType Directory -Force -Path "$FrontendDir/src/types" | Out-Null
New-Item -ItemType Directory -Force -Path "$FrontendDir/src/config" | Out-Null

# Create enhanced API client
@"
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class EnhancedApiClient {
  private client: AxiosInstance;
  private retryAttempts = 3;
  private retryDelay = 1000;

  constructor(baseURL: string, timeout = 30000) {
    this.client = axios.create({
      baseURL,
      timeout,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor for auth tokens
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${'${token}'}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor with retry logic
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const config = error.config;
        
        if (!config || config.__retryCount >= this.retryAttempts) {
          return Promise.reject(error);
        }

        config.__retryCount = config.__retryCount || 0;
        config.__retryCount += 1;

        // Retry on network errors or 5xx responses
        if (
          error.code === 'NETWORK_ERROR' ||
          (error.response && error.response.status >= 500)
        ) {
          await new Promise(resolve => 
            setTimeout(resolve, this.retryDelay * config.__retryCount)
          );
          return this.client(config);
        }

        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}
"@ | Out-File -FilePath "$FrontendDir/src/services/enhancedApiClient.ts" -Encoding UTF8

Write-Success "Enhanced API client created"

# Step 2: Create standardized types
Write-Info "Step 2: Creating standardized API types..."

@"
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  timestamp: string;
  requestId?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ErrorResponse {
  success: false;
  error: string;
  details?: any;
  timestamp: string;
  requestId?: string;
}
"@ | Out-File -FilePath "$FrontendDir/src/types/apiTypes.ts" -Encoding UTF8

Write-Success "API types created"

# Step 3: Create cache service
Write-Info "Step 3: Creating cache service..."

@"
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export class CacheService {
  private cache = new Map<string, CacheItem<any>>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    const isExpired = Date.now() - item.timestamp > item.ttl;
    
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  async getOrFetch<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    const cached = this.get<T>(key);
    
    if (cached !== null) {
      return cached;
    }

    const data = await fetchFn();
    this.set(key, data, ttl);
    return data;
  }
}

export const cacheService = new CacheService();
"@ | Out-File -FilePath "$FrontendDir/src/services/cacheService.ts" -Encoding UTF8

Write-Success "Cache service created"

# Step 4: Create WebSocket service
Write-Info "Step 4: Creating WebSocket service..."

@"
export class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 5000;
  private listeners: Map<string, Function[]> = new Map();

  connect(url: string) {
    try {
      this.ws = new WebSocket(url);
      
      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.handleMessage(data);
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.attemptReconnect(url);
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
    }
  }

  private attemptReconnect(url: string) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${'${this.reconnectAttempts}'}/${'${this.maxReconnectAttempts}'})`);
        this.connect(url);
      }, this.reconnectInterval);
    }
  }

  private handleMessage(data: any) {
    const { type, payload } = data;
    const listeners = this.listeners.get(type) || [];
    listeners.forEach(listener => listener(payload));
  }

  subscribe(eventType: string, callback: Function) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType)?.push(callback);
  }

  unsubscribe(eventType: string, callback: Function) {
    const listeners = this.listeners.get(eventType) || [];
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }

  send(type: string, payload: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const webSocketService = new WebSocketService();
"@ | Out-File -FilePath "$FrontendDir/src/services/websocketService.ts" -Encoding UTF8

Write-Success "WebSocket service created"

# Step 5: Create environment manager
Write-Info "Step 5: Creating environment manager..."

@"
export interface EnvironmentConfig {
  apiUrl: string;
  wsUrl: string;
  timeout: number;
  retryAttempts: number;
  cacheEnabled: boolean;
  debugMode: boolean;
  apiKeys: {
    sportsradar?: string;
    theodds?: string;
    prizepicks?: string;
  };
}

class EnvironmentManager {
  private config: EnvironmentConfig;

  constructor() {
    this.config = this.loadConfig();
  }

  private loadConfig(): EnvironmentConfig {
    const isDevelopment = import.meta.env.DEV;

    return {
      apiUrl: this.getApiUrl(),
      wsUrl: this.getWebSocketUrl(),
      timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
      retryAttempts: parseInt(import.meta.env.VITE_RETRY_ATTEMPTS || '3'),
      cacheEnabled: import.meta.env.VITE_CACHE_ENABLED !== 'false',
      debugMode: isDevelopment && import.meta.env.VITE_DEBUG_MODE === 'true',
      apiKeys: {
        sportsradar: import.meta.env.VITE_SPORTRADAR_API_KEY,
        theodds: import.meta.env.VITE_THEODDS_API_KEY,
        prizepicks: import.meta.env.VITE_PRIZEPICKS_API_KEY,
      }
    };
  }

  private getApiUrl(): string {
    if (import.meta.env.VITE_BACKEND_URL) {
      return import.meta.env.VITE_BACKEND_URL;
    }

    if (import.meta.env.DEV) {
      return 'http://localhost:8000';
    }

    return window.location.origin;
  }

  private getWebSocketUrl(): string {
    const apiUrl = this.getApiUrl();
    return apiUrl.replace(/^http/, 'ws') + '/ws';
  }

  getConfig(): EnvironmentConfig {
    return { ...this.config };
  }

  isProduction(): boolean {
    return import.meta.env.PROD;
  }

  isDevelopment(): boolean {
    return import.meta.env.DEV;
  }
}

export const environmentManager = new EnvironmentManager();
"@ | Out-File -FilePath "$FrontendDir/src/config/environment.ts" -Encoding UTF8

Write-Success "Environment manager created"

# Step 6: Create backend response formatter (if backend directory exists)
if ((Test-Path $BackendDir) -and !$SkipBackend) {
    Write-Info "Step 6: Creating backend response formatter..."
    
    New-Item -ItemType Directory -Force -Path "$BackendDir/utils" | Out-Null
    
    @"
from typing import Any, Dict, Optional
from datetime import datetime
from fastapi import Response
from pydantic import BaseModel
import uuid

class ApiResponse(BaseModel):
    success: bool
    data: Any
    message: Optional[str] = None
    error: Optional[str] = None
    timestamp: str
    request_id: Optional[str] = None

def success_response(
    data: Any,
    message: Optional[str] = None,
    request_id: Optional[str] = None
) -> ApiResponse:
    return ApiResponse(
        success=True,
        data=data,
        message=message,
        timestamp=datetime.utcnow().isoformat(),
        request_id=request_id or str(uuid.uuid4())
    )

def error_response(
    error: str,
    data: Any = None,
    request_id: Optional[str] = None
) -> ApiResponse:
    return ApiResponse(
        success=False,
        data=data,
        error=error,
        timestamp=datetime.utcnow().isoformat(),
        request_id=request_id or str(uuid.uuid4())
    )

def paginated_response(
    data: list,
    page: int,
    limit: int,
    total: int,
    message: Optional[str] = None,
    request_id: Optional[str] = None
) -> Dict[str, Any]:
    return {
        "success": True,
        "data": data,
        "message": message,
        "timestamp": datetime.utcnow().isoformat(),
        "request_id": request_id or str(uuid.uuid4()),
        "pagination": {
            "page": page,
            "limit": limit,
            "total": total,
            "totalPages": (total + limit - 1) // limit
        }
    }
"@ | Out-File -FilePath "$BackendDir/utils/response_formatter.py" -Encoding UTF8

    Write-Success "Backend response formatter created"
}
else {
    Write-Warning "Backend directory not found or skipped, skipping backend formatter creation"
}

# Step 7: Create updated environment file
Write-Info "Step 7: Creating updated environment configuration..."

if (!(Test-Path "$FrontendDir/.env")) {
    @"
# A1Betting Frontend Environment Configuration
VITE_BACKEND_URL=http://localhost:8000
VITE_API_TIMEOUT=30000
VITE_RETRY_ATTEMPTS=3
VITE_CACHE_ENABLED=true
VITE_DEBUG_MODE=false

# WebSocket Configuration
VITE_WS_ENABLED=true
VITE_WS_RECONNECT_INTERVAL=5000

# API Keys (replace with actual keys)
VITE_SPORTRADAR_API_KEY=your_key_here
VITE_THEODDS_API_KEY=your_key_here
VITE_PRIZEPICKS_API_KEY=your_key_here

# Performance Settings
VITE_CACHE_TTL_DEFAULT=300000
VITE_CACHE_TTL_ODDS=30000
VITE_CACHE_TTL_PREDICTIONS=600000
"@ | Out-File -FilePath "$FrontendDir/.env" -Encoding UTF8

    Write-Success "Environment file created"
}
else {
    Write-Warning "Environment file already exists, skipping creation"
}

# Step 8: Create integration test
Write-Info "Step 8: Creating integration test..."

New-Item -ItemType Directory -Force -Path "$FrontendDir/src/tests" | Out-Null

@"
import { EnhancedApiClient } from '../services/enhancedApiClient';
import { cacheService } from '../services/cacheService';
import { environmentManager } from '../config/environment';

describe('Integration Tests', () => {
  let apiClient: EnhancedApiClient;

  beforeEach(() => {
    const config = environmentManager.getConfig();
    apiClient = new EnhancedApiClient(config.apiUrl, config.timeout);
  });

  afterEach(() => {
    cacheService.clear();
  });

  test('API client should be initialized correctly', () => {
    expect(apiClient).toBeDefined();
  });

  test('Cache service should store and retrieve data', () => {
    const testData = { test: 'data' };
    cacheService.set('test-key', testData, 1000);
    
    const retrieved = cacheService.get('test-key');
    expect(retrieved).toEqual(testData);
  });

  test('Cache should expire after TTL', async () => {
    const testData = { test: 'data' };
    cacheService.set('test-key', testData, 100); // 100ms TTL
    
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const retrieved = cacheService.get('test-key');
    expect(retrieved).toBeNull();
  });

  test('Environment manager should load configuration', () => {
    const config = environmentManager.getConfig();
    expect(config.apiUrl).toBeDefined();
    expect(config.timeout).toBeGreaterThan(0);
  });
});
"@ | Out-File -FilePath "$FrontendDir/src/tests/integration.test.ts" -Encoding UTF8

Write-Success "Integration test created"

# Final summary
Write-Host ""
Write-Host "🎉 Integration Optimization Implementation Complete!" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green
Write-Success "Enhanced API client created with retry logic"
Write-Success "Standardized API types defined"
Write-Success "Cache service with TTL support implemented"
Write-Success "WebSocket service with auto-reconnection created"
Write-Success "Environment manager for configuration created"
if ((Test-Path $BackendDir) -and !$SkipBackend) {
    Write-Success "Backend response formatter created"
}
Write-Success "Integration tests added"
Write-Success "Environment configuration updated"

Write-Host ""
Write-Info "Next Steps:"
Write-Host "1. Review and test the new services"
Write-Host "2. Update existing API calls to use the enhanced client"
Write-Host "3. Configure environment variables with actual API keys"
Write-Host "4. Run integration tests: npm test"
Write-Host "5. Update backend endpoints to use standardized responses"
Write-Host ""
Write-Info "For detailed implementation guide, see: FRONTEND_BACKEND_INTEGRATION_OPTIMIZATION.md" 