// Core Application Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "developer" | "user";
  avatar?: string;
  lastLogin: Date;
}

// Command System Types
export interface Command {
  id: string;
  name: string;
  command: string;
  description: string;
  category: "planning" | "execution" | "monitoring" | "autonomous";
  icon: string;
  enabled: boolean;
  lastUsed?: Date;
}

export interface CommandHistory {
  id: string;
  command: Command;
  timestamp: Date;
  status: "pending" | "running" | "completed" | "failed";
  output?: string;
  duration?: number;
}

// Memory Bank Types
export interface MemoryBankFile {
  id: string;
  name: string;
  path: string;
  content: string;
  lastModified: Date;
  size: number;
  type: "markdown" | "json" | "text";
}

export interface MemoryBankStatus {
  totalFiles: number;
  chatArchives: number;
  codebaseContext: boolean;
  lastUpdate: Date;
  health: "excellent" | "good" | "warning" | "error";
}

// System Monitoring Types
export interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: {
    upload: number;
    download: number;
  };
  timestamp: Date;
}

export interface TypeScriptError {
  id: string;
  file: string;
  line: number;
  column: number;
  message: string;
  code: string;
  severity: "error" | "warning" | "info";
  fixed: boolean;
}

export interface TypeScriptStats {
  totalErrors: number;
  errorsFixed: number;
  filesProcessed: number;
  target: number;
  progress: number;
  lastUpdate: Date;
}

// Agent Types
export interface Agent {
  id: string;
  name: string;
  type:
    | "typescript-repair"
    | "ml-performance"
    | "security-audit"
    | "performance"
    | "a1betting-architect";
  status: "idle" | "running" | "completed" | "error";
  description: string;
  capabilities: string[];
  lastRun?: Date;
  performance: {
    tasksCompleted: number;
    successRate: number;
    averageTime: number;
  };
}

export interface AgentTask {
  id: string;
  agentId: string;
  name: string;
  description: string;
  status: "pending" | "running" | "completed" | "failed";
  progress: number;
  startTime?: Date;
  endTime?: Date;
  result?: string;
  errors?: string[];
}

// Performance Types
export interface PerformanceMetrics {
  buildTime: number;
  mlAccuracy: number;
  winRate: number;
  roi: number;
  sharpeRatio: number;
  errorCount: number;
  uptime: number;
  lastUpdate: Date;
}

export interface PerformanceTarget {
  metric: string;
  current: number;
  target: number;
  status: "on-track" | "at-risk" | "critical";
  trend: "improving" | "stable" | "declining";
}

// Security Types
export interface SecurityScan {
  id: string;
  timestamp: Date;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  complianceScore: number;
  recommendations: string[];
  status: "passed" | "failed" | "warning";
}

// Analytics Types
export interface AnalyticsData {
  commandUsage: Record<string, number>;
  agentPerformance: Record<string, number>;
  errorTrends: Array<{ date: Date; count: number }>;
  performanceHistory: Array<{ date: Date; metrics: PerformanceMetrics }>;
  userActivity: Array<{ date: Date; actions: number }>;
}

// Workspace Types
export interface WorkspaceSettings {
  directory: string;
  autoSetup: boolean;
  requiredFiles: string[];
  setupCommands: string[];
  initialized: boolean;
  lastValidation: Date | null;
}

export interface WorkspaceValidation {
  isValid: boolean;
  missingFiles: string[];
  missingDirectories: string[];
  setupRequired: boolean;
  errors: string[];
  suggestions: string[];
}

export interface RequiredFile {
  path: string;
  type: "file" | "directory";
  required: boolean;
  description: string;
  template?: string;
}

// Settings Types
export interface AppSettings {
  theme: "dark" | "light" | "auto";
  notifications: boolean;
  autoSave: boolean;
  refreshInterval: number;
  debugMode: boolean;
  apiEndpoint: string;
  maxLogHistory: number;
  preferredAgent: string;
  workspace: WorkspaceSettings;
}

// File System Types
export interface FileNode {
  id: string;
  name: string;
  path: string;
  type: "file" | "directory";
  size?: number;
  children?: FileNode[];
  lastModified: Date;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Navigation Types
export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  badge?: string | number;
  children?: NavigationItem[];
}

// Theme Types
export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
  };
  fonts: {
    sans: string;
    mono: string;
    cyber: string;
  };
}

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: Date;
  read: boolean;
  actions?: Array<{
    label: string;
    action: () => void;
  }>;
}

// Log Types
export interface LogEntry {
  id: string;
  timestamp: Date;
  level: "debug" | "info" | "warn" | "error";
  source: string;
  message: string;
  data?: any;
}

// Export helper types
export type Status = "idle" | "loading" | "success" | "error";
export type Theme_Mode = "light" | "dark" | "system";
export type SortDirection = "asc" | "desc";
export type FilterOperator =
  | "equals"
  | "contains"
  | "startsWith"
  | "endsWith"
  | "greaterThan"
  | "lessThan";
