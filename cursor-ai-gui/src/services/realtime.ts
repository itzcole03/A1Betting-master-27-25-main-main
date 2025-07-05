import { useAppStore } from "@/store/useAppStore";
import type { SystemMetrics, TypeScriptStats, Agent, LogEntry } from "@/types";

class RealTimeDataService {
  private intervals: Map<string, NodeJS.Timeout> = new Map();
  private isActive = false;

  start(): void {
    if (this.isActive) return;

    this.isActive = true;
    console.log("Starting real-time data service...");

    // System metrics every 5 seconds
    this.startInterval(
      "systemMetrics",
      () => {
        this.updateSystemMetrics();
      },
      5000,
    );

    // TypeScript stats every 10 seconds
    this.startInterval(
      "typeScriptStats",
      () => {
        this.updateTypeScriptStats();
      },
      10000,
    );

    // Agent status every 3 seconds
    this.startInterval(
      "agentStatus",
      () => {
        this.updateAgentStatus();
      },
      3000,
    );

    // Generate periodic logs
    this.startInterval(
      "logs",
      () => {
        this.generateRandomLog();
      },
      15000,
    );
  }

  stop(): void {
    this.isActive = false;
    this.intervals.forEach((interval) => {
      clearInterval(interval);
    });
    this.intervals.clear();
    console.log("Stopped real-time data service");
  }

  private startInterval(
    name: string,
    callback: () => void,
    interval: number,
  ): void {
    if (this.intervals.has(name)) {
      clearInterval(this.intervals.get(name)!);
    }

    const intervalId = setInterval(callback, interval);
    this.intervals.set(name, intervalId);
  }

  private updateSystemMetrics(): void {
    const store = useAppStore.getState();

    // Generate realistic CPU usage (20-80%)
    const baseCpu = 30;
    const cpuVariation = Math.sin(Date.now() / 10000) * 20 + Math.random() * 10;
    const cpu = Math.max(10, Math.min(90, baseCpu + cpuVariation));

    // Generate realistic memory usage (30-70%)
    const baseMemory = 45;
    const memoryVariation =
      Math.sin(Date.now() / 15000) * 15 + Math.random() * 5;
    const memory = Math.max(20, Math.min(85, baseMemory + memoryVariation));

    // Generate disk usage (10-30%)
    const disk = 15 + Math.random() * 15;

    const metrics: SystemMetrics = {
      cpu: Math.round(cpu),
      memory: Math.round(memory),
      disk: Math.round(disk),
      network: {
        upload: Math.random() * 50 + 10,
        download: Math.random() * 200 + 50,
      },
      timestamp: new Date(),
    };

    store.setSystemMetrics(metrics);
  }

  private updateTypeScriptStats(): void {
    const store = useAppStore.getState();
    const currentStats = store.typeScriptStats;

    if (!currentStats) return;

    // Simulate gradual error reduction
    const errorReduction = Math.floor(Math.random() * 3) + 1;
    const newErrorsFixed = Math.min(
      currentStats.totalErrors,
      currentStats.errorsFixed + errorReduction,
    );

    const newProgress = Math.min(
      0.99,
      newErrorsFixed / (currentStats.totalErrors - currentStats.target),
    );

    const updatedStats: TypeScriptStats = {
      ...currentStats,
      errorsFixed: newErrorsFixed,
      progress: newProgress,
      filesProcessed:
        currentStats.filesProcessed + Math.floor(Math.random() * 2),
      lastUpdate: new Date(),
    };

    store.setTypeScriptStats(updatedStats);

    // Log progress occasionally
    if (Math.random() < 0.1) {
      store.addLog({
        level: "info",
        source: "TypeScript Repair",
        message: `Fixed ${errorReduction} more errors. Progress: ${(newProgress * 100).toFixed(1)}%`,
      });
    }
  }

  private updateAgentStatus(): void {
    const store = useAppStore.getState();
    const agents = store.agents;

    agents.forEach((agent) => {
      // Randomly update agent performance metrics
      if (Math.random() < 0.05) {
        // 5% chance per check
        const tasksCompleted = agent.performance.tasksCompleted + 1;
        const successRate = Math.min(1, agent.performance.successRate + 0.01);
        const averageTime =
          agent.performance.averageTime * 0.98 + Math.random() * 1000 * 0.02;

        // Update agent performance (this would normally come from the backend)
        const updatedAgents = agents.map((a) =>
          a.id === agent.id
            ? {
                ...a,
                performance: {
                  tasksCompleted,
                  successRate,
                  averageTime,
                },
              }
            : a,
        );

        store.setAgents(updatedAgents);
      }
    });
  }

  private generateRandomLog(): void {
    const store = useAppStore.getState();

    const logMessages = [
      "System health check completed successfully",
      "Memory bank synchronization in progress",
      "TypeScript compiler analysis updated",
      "Agent performance metrics collected",
      "WebSocket connection maintained",
      "Cache cleanup completed",
      "Background task queue processed",
      "Database optimization completed",
      "Security scan finished - no issues found",
      "API response time: 145ms",
    ];

    const sources = [
      "System",
      "Memory Bank",
      "TypeScript Repair",
      "Agent Manager",
      "WebSocket",
      "Cache",
      "Background Tasks",
      "Database",
      "Security",
      "API",
    ];

    const levels: Array<"info" | "debug" | "warn"> = [
      "info",
      "info",
      "info",
      "debug",
      "warn",
    ];

    const randomMessage =
      logMessages[Math.floor(Math.random() * logMessages.length)];
    const randomSource = sources[Math.floor(Math.random() * sources.length)];
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];

    store.addLog({
      level: randomLevel,
      source: randomSource,
      message: randomMessage,
    });
  }

  // Simulate specific events
  simulateCommandExecution(commandName: string): void {
    const store = useAppStore.getState();

    store.addLog({
      level: "info",
      source: "Commands",
      message: `Executing command: ${commandName}`,
    });

    // Simulate command completion after random delay
    setTimeout(
      () => {
        const success = Math.random() > 0.1; // 90% success rate

        store.addLog({
          level: success ? "info" : "error",
          source: "Commands",
          message: success
            ? `Command completed successfully: ${commandName}`
            : `Command failed: ${commandName}`,
        });

        store.addNotification({
          title: success ? "Command Completed" : "Command Failed",
          message: `${commandName} ${success ? "executed successfully" : "execution failed"}`,
          type: success ? "success" : "error",
        });
      },
      Math.random() * 3000 + 1000,
    );
  }

  simulateAgentTask(agentId: string, taskName: string): void {
    const store = useAppStore.getState();

    store.addLog({
      level: "info",
      source: "Agents",
      message: `Starting task: ${taskName} for agent ${agentId}`,
    });

    // Simulate task completion
    setTimeout(
      () => {
        store.addLog({
          level: "info",
          source: "Agents",
          message: `Task completed: ${taskName}`,
        });
      },
      Math.random() * 5000 + 2000,
    );
  }

  simulateTypeScriptFix(errorId: string): void {
    const store = useAppStore.getState();

    store.addLog({
      level: "info",
      source: "TypeScript Repair",
      message: `Fixing error: ${errorId}`,
    });

    setTimeout(
      () => {
        store.addLog({
          level: "info",
          source: "TypeScript Repair",
          message: `Error fixed successfully: ${errorId}`,
        });

        // Update stats
        const currentStats = store.typeScriptStats;
        if (currentStats) {
          store.setTypeScriptStats({
            ...currentStats,
            errorsFixed: currentStats.errorsFixed + 1,
            progress: Math.min(
              0.99,
              (currentStats.errorsFixed + 1) /
                (currentStats.totalErrors - currentStats.target),
            ),
            lastUpdate: new Date(),
          });
        }
      },
      Math.random() * 2000 + 500,
    );
  }
}

export const realTimeService = new RealTimeDataService();
export default realTimeService;
