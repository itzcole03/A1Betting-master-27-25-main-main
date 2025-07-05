import axios, { AxiosInstance, AxiosResponse } from "axios";
import type {
  Command,
  Agent,
  AgentTask,
  TypeScriptError,
  SystemMetrics,
  PerformanceMetrics,
  SecurityScan,
  LogEntry,
} from "@/types";

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem("auth_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized
          localStorage.removeItem("auth_token");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      },
    );
  }

  // System endpoints
  async getSystemMetrics(): Promise<SystemMetrics> {
    const response = await this.client.get("/api/system/metrics");
    return response.data;
  }

  async getSystemHealth(): Promise<{
    status: string;
    checks: Record<string, boolean>;
  }> {
    const response = await this.client.get("/api/system/health");
    return response.data;
  }

  // Command endpoints
  async executeCommand(
    command: string,
    args?: Record<string, any>,
  ): Promise<{ id: string; status: string }> {
    const response = await this.client.post("/api/commands/execute", {
      command,
      args,
    });
    return response.data;
  }

  async getCommandHistory(limit = 50): Promise<any[]> {
    const response = await this.client.get(
      `/api/commands/history?limit=${limit}`,
    );
    return response.data;
  }

  async getCommandStatus(
    id: string,
  ): Promise<{ status: string; output?: string; error?: string }> {
    const response = await this.client.get(`/api/commands/${id}/status`);
    return response.data;
  }

  // TypeScript repair endpoints
  async getTypeScriptErrors(): Promise<TypeScriptError[]> {
    const response = await this.client.get("/api/typescript/errors");
    return response.data;
  }

  async getTypeScriptStats(): Promise<{
    totalErrors: number;
    errorsFixed: number;
    filesProcessed: number;
    progress: number;
    lastUpdate: string;
  }> {
    const response = await this.client.get("/api/typescript/stats");
    return response.data;
  }

  async startTypeScriptRepair(): Promise<{ taskId: string }> {
    const response = await this.client.post("/api/typescript/repair/start");
    return response.data;
  }

  async fixTypeScriptError(
    errorId: string,
  ): Promise<{ success: boolean; message: string }> {
    const response = await this.client.post(
      `/api/typescript/errors/${errorId}/fix`,
    );
    return response.data;
  }

  // Agent endpoints
  async getAgents(): Promise<Agent[]> {
    const response = await this.client.get("/api/agents");
    return response.data;
  }

  async startAgent(agentId: string): Promise<{ taskId: string }> {
    const response = await this.client.post(`/api/agents/${agentId}/start`);
    return response.data;
  }

  async stopAgent(agentId: string): Promise<{ success: boolean }> {
    const response = await this.client.post(`/api/agents/${agentId}/stop`);
    return response.data;
  }

  async getAgentTasks(agentId?: string): Promise<AgentTask[]> {
    const url = agentId ? `/api/agents/${agentId}/tasks` : "/api/agents/tasks";
    const response = await this.client.get(url);
    return response.data;
  }

  async getAgentStatus(
    agentId: string,
  ): Promise<{ status: string; currentTask?: any }> {
    const response = await this.client.get(`/api/agents/${agentId}/status`);
    return response.data;
  }

  // Memory bank endpoints
  async getMemoryBankStatus(): Promise<{
    totalFiles: number;
    chatArchives: number;
    codebaseContext: boolean;
    lastUpdate: string;
    health: string;
    size: number;
  }> {
    const response = await this.client.get("/api/memory-bank/status");
    return response.data;
  }

  async getMemoryBankFiles(): Promise<any[]> {
    const response = await this.client.get("/api/memory-bank/files");
    return response.data;
  }

  async getMemoryBankFile(
    path: string,
  ): Promise<{ content: string; metadata: any }> {
    const response = await this.client.get(
      `/api/memory-bank/files/${encodeURIComponent(path)}`,
    );
    return response.data;
  }

  async updateMemoryBank(): Promise<{ success: boolean }> {
    const response = await this.client.post("/api/memory-bank/update");
    return response.data;
  }

  // Performance endpoints
  async getPerformanceMetrics(): Promise<PerformanceMetrics> {
    const response = await this.client.get("/api/performance/metrics");
    return response.data;
  }

  async startPerformanceTest(): Promise<{ testId: string }> {
    const response = await this.client.post("/api/performance/test/start");
    return response.data;
  }

  // Security endpoints
  async getSecurityStatus(): Promise<SecurityScan> {
    const response = await this.client.get("/api/security/status");
    return response.data;
  }

  async runSecurityScan(): Promise<{ scanId: string }> {
    const response = await this.client.post("/api/security/scan");
    return response.data;
  }

  // Logs endpoints
  async getLogs(
    level?: string,
    source?: string,
    limit = 100,
  ): Promise<LogEntry[]> {
    const params = new URLSearchParams();
    if (level) params.append("level", level);
    if (source) params.append("source", source);
    params.append("limit", limit.toString());

    const response = await this.client.get(`/api/logs?${params}`);
    return response.data;
  }

  async exportLogs(format = "json"): Promise<Blob> {
    const response = await this.client.get(
      `/api/logs/export?format=${format}`,
      {
        responseType: "blob",
      },
    );
    return response.data;
  }

  // Analytics endpoints
  async getAnalytics(timeRange = "24h"): Promise<{
    commandUsage: Record<string, number>;
    agentPerformance: Record<string, number>;
    errorTrends: Array<{ date: string; count: number }>;
    systemMetrics: Array<{ date: string; cpu: number; memory: number }>;
  }> {
    const response = await this.client.get(`/api/analytics?range=${timeRange}`);
    return response.data;
  }

  // Real-time WebSocket connection
  connectWebSocket(onMessage: (data: any) => void): WebSocket {
    const wsUrl = (
      import.meta.env.VITE_WS_URL || "ws://localhost:8000"
    ).replace("http", "ws");
    const ws = new WebSocket(`${wsUrl}/ws`);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return ws;
  }

  // File operations
  async uploadFile(
    file: File,
    path: string,
  ): Promise<{ success: boolean; path: string }> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("path", path);

    const response = await this.client.post("/api/files/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }

  async downloadFile(path: string): Promise<Blob> {
    const response = await this.client.get(
      `/api/files/download/${encodeURIComponent(path)}`,
      {
        responseType: "blob",
      },
    );
    return response.data;
  }

  // Workspace operations
  async validateWorkspaceDirectory(
    directory: string,
  ): Promise<{ valid: boolean; message?: string }> {
    const response = await this.client.post("/api/workspace/validate", {
      directory,
    });
    return response.data;
  }

  async getWorkspaceInfo(directory: string): Promise<{
    directory: string;
    files: string[];
    size: number;
    lastModified: string;
    initialized: boolean;
  }> {
    const response = await this.client.get(
      `/api/workspace/info?directory=${encodeURIComponent(directory)}`,
    );
    return response.data;
  }

  async createWorkspaceDirectory(
    workspaceDir: string,
    relativePath: string,
  ): Promise<{ success: boolean }> {
    const response = await this.client.post("/api/workspace/mkdir", {
      workspaceDir,
      path: relativePath,
    });
    return response.data;
  }

  async createWorkspaceFile(
    workspaceDir: string,
    relativePath: string,
    content: string,
  ): Promise<{ success: boolean }> {
    const response = await this.client.post("/api/workspace/create-file", {
      workspaceDir,
      path: relativePath,
      content,
    });
    return response.data;
  }

  async checkWorkspaceFile(
    workspaceDir: string,
    relativePath: string,
  ): Promise<{ exists: boolean; type?: "file" | "directory" }> {
    const response = await this.client.get(
      `/api/workspace/check?workspaceDir=${encodeURIComponent(workspaceDir)}&path=${encodeURIComponent(relativePath)}`,
    );
    return response.data;
  }

  async executeWorkspaceCommand(
    workspaceDir: string,
    command: string,
  ): Promise<{ success: boolean; output?: string; error?: string }> {
    const response = await this.client.post("/api/workspace/execute", {
      workspaceDir,
      command,
    });
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;
