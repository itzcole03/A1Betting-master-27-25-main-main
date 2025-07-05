import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  User,
  Command,
  CommandHistory,
  Agent,
  AgentTask,
  SystemMetrics,
  TypeScriptStats,
  PerformanceMetrics,
  MemoryBankStatus,
  AppSettings,
  WorkspaceSettings,
  Notification,
  LogEntry,
} from "@/types";

interface AppState {
  // User & Auth
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;

  // Commands
  commands: Command[];
  commandHistory: CommandHistory[];
  setCommands: (commands: Command[]) => void;
  addCommandToHistory: (command: CommandHistory) => void;
  updateCommandStatus: (
    id: string,
    status: CommandHistory["status"],
    output?: string,
  ) => void;

  // Agents
  agents: Agent[];
  agentTasks: AgentTask[];
  setAgents: (agents: Agent[]) => void;
  addAgentTask: (task: AgentTask) => void;
  updateAgentTask: (id: string, updates: Partial<AgentTask>) => void;
  updateAgentStatus: (id: string, status: Agent["status"]) => void;

  // System Monitoring
  systemMetrics: SystemMetrics | null;
  typeScriptStats: TypeScriptStats | null;
  performanceMetrics: PerformanceMetrics | null;
  memoryBankStatus: MemoryBankStatus | null;
  setSystemMetrics: (metrics: SystemMetrics) => void;
  setTypeScriptStats: (stats: TypeScriptStats) => void;
  setPerformanceMetrics: (metrics: PerformanceMetrics) => void;
  setMemoryBankStatus: (status: MemoryBankStatus) => void;

  // UI State
  sidebarOpen: boolean;
  currentPage: string;
  loading: boolean;
  setSidebarOpen: (open: boolean) => void;
  setCurrentPage: (page: string) => void;
  setLoading: (loading: boolean) => void;

  // Settings
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (
    notification: Omit<Notification, "id" | "timestamp" | "read">,
  ) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;

  // Logs
  logs: LogEntry[];
  addLog: (log: Omit<LogEntry, "id" | "timestamp">) => void;
  clearLogs: () => void;

  // Real-time status
  isConnected: boolean;
  lastUpdate: Date | null;
  setConnected: (connected: boolean) => void;
  setLastUpdate: (date: Date) => void;
}

const defaultWorkspaceSettings: WorkspaceSettings = {
  directory: "./workspace",
  autoSetup: true,
  requiredFiles: [
    "package.json",
    ".cursorrules",
    "src",
    "cursor-ai-config.json",
  ],
  setupCommands: [
    "npm install",
    "mkdir -p src/memory-bank",
    "mkdir -p logs",
    "touch .env",
  ],
  initialized: false,
  lastValidation: null,
};

const defaultSettings: AppSettings = {
  theme: "dark",
  notifications: true,
  autoSave: true,
  refreshInterval: 5000,
  debugMode: false,
  apiEndpoint: "http://localhost:8000",
  maxLogHistory: 1000,
  preferredAgent: "typescript-repair",
  workspace: defaultWorkspaceSettings,
};

const defaultCommands: Command[] = [
  {
    id: "1",
    name: "Plan Mode",
    command: "plan",
    description: "Enter strategic planning mode with memory context",
    category: "planning",
    icon: "brain",
    enabled: true,
  },
  {
    id: "2",
    name: "Agent Mode",
    command: "agent",
    description: "Execute with full AI agent capabilities",
    category: "execution",
    icon: "zap",
    enabled: true,
  },
  {
    id: "6",
    name: "TypeScript Repair",
    command: "fix typescript errors",
    description: "Fix 26,797 → <100 errors",
    category: "execution",
    icon: "wrench",
    enabled: true,
  },
  {
    id: "7",
    name: "Security Audit",
    command: "security audit",
    description: "Financial platform security check",
    category: "monitoring",
    icon: "shield",
    enabled: true,
  },
  {
    id: "8",
    name: "Performance Check",
    command: "performance check",
    description: "System performance analysis",
    category: "monitoring",
    icon: "activity",
    enabled: true,
  },
  {
    id: "13",
    name: "Autonomous Mode",
    command: "autonomous development mode",
    description: "Pure autonomous recursive development",
    category: "autonomous",
    icon: "cpu",
    enabled: true,
  },
];

const defaultAgents: Agent[] = [
  {
    id: "typescript-repair",
    name: "TypeScript Repair Specialist",
    type: "typescript-repair",
    status: "idle",
    description: "Systematic TypeScript error reduction specialist",
    capabilities: [
      "Corruption pattern detection",
      "Template literal repair",
      "Import path resolution",
      "Syntax error fixes",
    ],
    performance: {
      tasksCompleted: 0,
      successRate: 0,
      averageTime: 0,
    },
  },
  {
    id: "ml-performance",
    name: "ML Performance Engineer",
    type: "ml-performance",
    status: "idle",
    description: "Machine learning model performance specialist",
    capabilities: [
      "Model accuracy monitoring",
      "Performance optimization",
      "TensorFlow pipeline maintenance",
      "Prediction validation",
    ],
    performance: {
      tasksCompleted: 0,
      successRate: 0,
      averageTime: 0,
    },
  },
  {
    id: "security-audit",
    name: "Security Compliance Auditor",
    type: "security-audit",
    status: "idle",
    description: "Financial platform security specialist",
    capabilities: [
      "Security vulnerability scanning",
      "Compliance validation",
      "Audit trail verification",
      "Financial data protection",
    ],
    performance: {
      tasksCompleted: 0,
      successRate: 0,
      averageTime: 0,
    },
  },
  {
    id: "performance-optimizer",
    name: "Performance Optimizer",
    type: "performance",
    status: "idle",
    description: "System performance optimization specialist",
    capabilities: [
      "Build time optimization",
      "Bundle size reduction",
      "Memory usage optimization",
      "Database query optimization",
    ],
    performance: {
      tasksCompleted: 0,
      successRate: 0,
      averageTime: 0,
    },
  },
  {
    id: "a1betting-architect",
    name: "A1Betting Architect",
    type: "a1betting-architect",
    status: "idle",
    description: "Platform architecture and ML integration specialist",
    capabilities: [
      "Architecture preservation",
      "Component integration",
      "ML model integration",
      "System design optimization",
    ],
    performance: {
      tasksCompleted: 0,
      successRate: 0,
      averageTime: 0,
    },
  },
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User & Auth
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),

      // Commands
      commands: defaultCommands,
      commandHistory: [],
      setCommands: (commands) => set({ commands }),
      addCommandToHistory: (command) => {
        const { commandHistory, settings } = get();
        const newHistory = [command, ...commandHistory].slice(
          0,
          settings.maxLogHistory,
        );
        set({ commandHistory: newHistory });
      },
      updateCommandStatus: (id, status, output) => {
        const { commandHistory } = get();
        const updatedHistory = commandHistory.map((cmd) =>
          cmd.id === id
            ? {
                ...cmd,
                status,
                output,
                duration:
                  status === "completed"
                    ? Date.now() - cmd.timestamp.getTime()
                    : undefined,
              }
            : cmd,
        );
        set({ commandHistory: updatedHistory });
      },

      // Agents
      agents: defaultAgents,
      agentTasks: [],
      setAgents: (agents) => set({ agents }),
      addAgentTask: (task) => {
        const { agentTasks } = get();
        set({ agentTasks: [task, ...agentTasks] });
      },
      updateAgentTask: (id, updates) => {
        const { agentTasks } = get();
        const updatedTasks = agentTasks.map((task) =>
          task.id === id ? { ...task, ...updates } : task,
        );
        set({ agentTasks: updatedTasks });
      },
      updateAgentStatus: (id, status) => {
        const { agents } = get();
        const updatedAgents = agents.map((agent) =>
          agent.id === id ? { ...agent, status, lastRun: new Date() } : agent,
        );
        set({ agents: updatedAgents });
      },

      // System Monitoring
      systemMetrics: null,
      typeScriptStats: null,
      performanceMetrics: null,
      memoryBankStatus: null,
      setSystemMetrics: (systemMetrics) => set({ systemMetrics }),
      setTypeScriptStats: (typeScriptStats) => set({ typeScriptStats }),
      setPerformanceMetrics: (performanceMetrics) =>
        set({ performanceMetrics }),
      setMemoryBankStatus: (memoryBankStatus) => set({ memoryBankStatus }),

      // UI State
      sidebarOpen: true,
      currentPage: "dashboard",
      loading: false,
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setCurrentPage: (currentPage) => set({ currentPage }),
      setLoading: (loading) => set({ loading }),

      // Settings
      settings: defaultSettings,
      updateSettings: (newSettings) => {
        const { settings } = get();
        set({ settings: { ...settings, ...newSettings } });
      },

      // Notifications
      notifications: [],
      addNotification: (notification) => {
        const { notifications } = get();
        const newNotification: Notification = {
          ...notification,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date(),
          read: false,
        };
        set({ notifications: [newNotification, ...notifications] });
      },
      markNotificationRead: (id) => {
        const { notifications } = get();
        const updatedNotifications = notifications.map((notif) =>
          notif.id === id ? { ...notif, read: true } : notif,
        );
        set({ notifications: updatedNotifications });
      },
      clearNotifications: () => set({ notifications: [] }),

      // Logs
      logs: [],
      addLog: (log) => {
        const { logs, settings } = get();
        const newLog: LogEntry = {
          ...log,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date(),
        };
        const newLogs = [newLog, ...logs].slice(0, settings.maxLogHistory);
        set({ logs: newLogs });
      },
      clearLogs: () => set({ logs: [] }),

      // Real-time status
      isConnected: false,
      lastUpdate: null,
      setConnected: (isConnected) => set({ isConnected }),
      setLastUpdate: (lastUpdate) => set({ lastUpdate }),
    }),
    {
      name: "cursor-ai-gui-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        settings: state.settings,
        sidebarOpen: state.sidebarOpen,
        commandHistory: state.commandHistory.slice(0, 50), // Only persist recent history
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
