#!/bin/bash

# A1Betting Frontend-Backend Integration Optimization Implementation Script
# This script helps implement the optimization recommendations systematically

set -e

echo "🚀 A1Betting Integration Optimization Implementation"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -f "frontend/package.json" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

# Determine if we're in root or need to navigate
if [ -f "frontend/package.json" ]; then
    FRONTEND_DIR="frontend"
    BACKEND_DIR="backend"
else
    FRONTEND_DIR="."
    BACKEND_DIR="../backend"
fi

print_info "Starting integration optimization implementation..."

# Step 1: Create enhanced API client
print_info "Step 1: Creating enhanced API client..."

mkdir -p "$FRONTEND_DIR/src/services"
mkdir -p "$FRONTEND_DIR/src/types"
mkdir -p "$FRONTEND_DIR/src/config"

# Create enhanced API client
cat > "$FRONTEND_DIR/src/services/enhancedApiClient.ts" << 'EOF'
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
          config.headers.Authorization = `Bearer ${token}`;
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
EOF

print_status "Enhanced API client created"

# Step 2: Create standardized types
print_info "Step 2: Creating standardized API types..."

cat > "$FRONTEND_DIR/src/types/apiTypes.ts" << 'EOF'
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
EOF

print_status "API types created"

# Step 3: Create cache service
print_info "Step 3: Creating cache service..."

cat > "$FRONTEND_DIR/src/services/cacheService.ts" << 'EOF'
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
EOF

print_status "Cache service created"

# Step 4: Create WebSocket service
print_info "Step 4: Creating WebSocket service..."

cat > "$FRONTEND_DIR/src/services/websocketService.ts" << 'EOF'
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
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
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
EOF

print_status "WebSocket service created"

# Step 5: Create environment manager
print_info "Step 5: Creating environment manager..."

cat > "$FRONTEND_DIR/src/config/environment.ts" << 'EOF'
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
EOF

print_status "Environment manager created"

# Step 6: Create backend response formatter (if backend directory exists)
if [ -d "$BACKEND_DIR" ]; then
    print_info "Step 6: Creating backend response formatter..."
    
    mkdir -p "$BACKEND_DIR/utils"
    
    cat > "$BACKEND_DIR/utils/response_formatter.py" << 'EOF'
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
EOF

    print_status "Backend response formatter created"
else
    print_warning "Backend directory not found, skipping backend formatter creation"
fi

# Step 7: Create updated environment file
print_info "Step 7: Creating updated environment configuration..."

if [ ! -f "$FRONTEND_DIR/.env" ]; then
    cat > "$FRONTEND_DIR/.env" << 'EOF'
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
EOF

    print_status "Environment file created"
else
    print_warning "Environment file already exists, skipping creation"
fi

# Step 8: Create integration test
print_info "Step 8: Creating integration test..."

mkdir -p "$FRONTEND_DIR/src/tests"

cat > "$FRONTEND_DIR/src/tests/integration.test.ts" << 'EOF'
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
EOF

print_status "Integration test created"

# Step 9: Update package.json scripts if needed
print_info "Step 9: Checking package.json scripts..."

if [ -f "$FRONTEND_DIR/package.json" ]; then
    # Check if test script exists
    if ! grep -q '"test"' "$FRONTEND_DIR/package.json"; then
        print_warning "Consider adding test scripts to package.json"
    fi
    print_status "Package.json checked"
fi

# Final summary
echo ""
echo "🎉 Integration Optimization Implementation Complete!"
echo "=================================================="
print_status "Enhanced API client created with retry logic"
print_status "Standardized API types defined"
print_status "Cache service with TTL support implemented"
print_status "WebSocket service with auto-reconnection created"
print_status "Environment manager for configuration created"
if [ -d "$BACKEND_DIR" ]; then
    print_status "Backend response formatter created"
fi
print_status "Integration tests added"
print_status "Environment configuration updated"

echo ""
print_info "Next Steps:"
echo "1. Review and test the new services"
echo "2. Update existing API calls to use the enhanced client"
echo "3. Configure environment variables with actual API keys"
echo "4. Run integration tests: npm test"
echo "5. Update backend endpoints to use standardized responses"
echo ""
print_info "For detailed implementation guide, see: FRONTEND_BACKEND_INTEGRATION_OPTIMIZATION.md"
EOF 