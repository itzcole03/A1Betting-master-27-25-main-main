import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Bot,
  Cpu,
  Activity,
  Zap,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { formatDate, formatPercentage, generateId } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { useAgents } from "@/hooks/useApi";
import type { Agent, AgentTask } from "@/types";

export default function Agents() {
  const {
    setCurrentPage,
    agentTasks,
    addAgentTask,
    updateAgentTask,
    addLog,
    addNotification,
  } = useAppStore();

  const {
    agents,
    startAgent: apiStartAgent,
    stopAgent: apiStopAgent,
  } = useAgents();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  useEffect(() => {
    setCurrentPage("agents");
  }, [setCurrentPage]);

  const startAgent = async (agent: Agent) => {
    try {
      const result = await apiStartAgent(agent.id);

      // Create a new task
      const task: AgentTask = {
        id: result.taskId || generateId(),
        agentId: agent.id,
        name: `${agent.name} Analysis`,
        description: `Executing ${agent.name} capabilities`,
        status: "running",
        progress: 0,
        startTime: new Date(),
      };

      addAgentTask(task);

      addLog({
        level: "info",
        source: "Agents",
        message: `Started agent: ${agent.name}`,
      });

      addNotification({
        title: "Agent Started",
        message: `${agent.name} is now running`,
        type: "info",
      });

      // Simulate progress updates (real implementation would get these via WebSocket)
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);

          updateAgentTask(task.id, {
            status: "completed",
            progress: 100,
            endTime: new Date(),
            result: "Task completed successfully",
          });

          addNotification({
            title: "Agent Completed",
            message: `${agent.name} finished successfully`,
            type: "success",
          });

          addLog({
            level: "info",
            source: "Agents",
            message: `Agent completed: ${agent.name}`,
          });
        } else {
          updateAgentTask(task.id, { progress });
        }
      }, 800);
    } catch (error) {
      addNotification({
        title: "Agent Error",
        message: `Failed to start ${agent.name}: ${error}`,
        type: "error",
      });

      addLog({
        level: "error",
        source: "Agents",
        message: `Failed to start agent ${agent.name}: ${error}`,
      });
    }
  };

  const stopAgent = async (agent: Agent) => {
    try {
      await apiStopAgent(agent.id);

      // Find and update running tasks
      const runningTasks = agentTasks.filter(
        (task) => task.agentId === agent.id && task.status === "running",
      );

      runningTasks.forEach((task) => {
        updateAgentTask(task.id, {
          status: "failed",
          endTime: new Date(),
          result: "Task stopped by user",
        });
      });

      addLog({
        level: "info",
        source: "Agents",
        message: `Stopped agent: ${agent.name}`,
      });

      toast.success(`${agent.name} stopped`);
    } catch (error) {
      toast.error(`Failed to stop ${agent.name}`);
    }
  };

  const resetAgent = async (agent: Agent) => {
    try {
      // Stop agent first if running
      if (agent.status === "running") {
        await apiStopAgent(agent.id);
      }

      addLog({
        level: "info",
        source: "Agents",
        message: `Reset agent: ${agent.name}`,
      });

      toast.success(`${agent.name} reset`);
    } catch (error) {
      toast.error(`Failed to reset ${agent.name}`);
    }
  };

  const getStatusColor = (status: Agent["status"]) => {
    switch (status) {
      case "running":
        return "text-blue-500 bg-blue-500/10";
      case "completed":
        return "text-green-500 bg-green-500/10";
      case "error":
        return "text-red-500 bg-red-500/10";
      default:
        return "text-gray-500 bg-gray-500/10";
    }
  };

  const getStatusIcon = (status: Agent["status"]) => {
    switch (status) {
      case "running":
        return <Activity className="w-4 h-4 animate-pulse" />;
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "error":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Cpu className="w-4 h-4" />;
    }
  };

  const getAgentIcon = (type: Agent["type"]) => {
    switch (type) {
      case "typescript-repair":
        return "🔧";
      case "ml-performance":
        return "🧠";
      case "security-audit":
        return "🛡️";
      case "performance":
        return "⚡";
      case "a1betting-architect":
        return "🏗️";
      default:
        return "🤖";
    }
  };

  const runningAgents = agents.filter((agent) => agent.status === "running");
  const recentTasks = agentTasks.slice(0, 10);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Agents</h1>
          <p className="text-muted-foreground">
            Manage and monitor specialized AI agents for different tasks
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Bot className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Agents</p>
                <p className="text-xl font-bold text-foreground">
                  {agents.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Activity className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Running</p>
                <p className="text-xl font-bold text-foreground">
                  {runningAgents.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tasks Today</p>
                <p className="text-xl font-bold text-foreground">
                  {agentTasks.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-xl font-bold text-foreground">
                  {formatPercentage(0.92)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agents List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-4"
        >
          <h2 className="text-xl font-semibold text-foreground">
            Available Agents
          </h2>

          <div className="space-y-4">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{getAgentIcon(agent.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {agent.name}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}
                        >
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(agent.status)}
                            <span className="capitalize">{agent.status}</span>
                          </div>
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">
                        {agent.description}
                      </p>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">
                          Capabilities:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {agent.capabilities.map((capability, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-background text-xs rounded-md text-muted-foreground"
                            >
                              {capability}
                            </span>
                          ))}
                        </div>
                      </div>

                      {agent.lastRun && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Last run: {formatDate(agent.lastRun)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {agent.status === "idle" && (
                      <motion.button
                        onClick={() => startAgent(agent)}
                        className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play className="w-4 h-4" />
                        <span>Start</span>
                      </motion.button>
                    )}

                    {agent.status === "running" && (
                      <motion.button
                        onClick={() => stopAgent(agent)}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Pause className="w-4 h-4" />
                        <span>Stop</span>
                      </motion.button>
                    )}

                    {(agent.status === "completed" ||
                      agent.status === "error") && (
                      <motion.button
                        onClick={() => resetAgent(agent)}
                        className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Reset</span>
                      </motion.button>
                    )}

                    <motion.button
                      onClick={() => setSelectedAgent(agent)}
                      className="p-2 hover:bg-accent rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Settings className="w-4 h-4 text-muted-foreground" />
                    </motion.button>
                  </div>
                </div>

                {/* Progress for running tasks */}
                {agent.status === "running" && (
                  <div className="mt-4">
                    {agentTasks
                      .filter(
                        (task) =>
                          task.agentId === agent.id &&
                          task.status === "running",
                      )
                      .map((task) => (
                        <div key={task.id} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              {task.name}
                            </span>
                            <span className="text-foreground font-medium">
                              {task.progress.toFixed(0)}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <motion.div
                              className="h-full bg-primary rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${task.progress}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold text-foreground">
            Recent Tasks
          </h2>

          <div className="bg-card border border-border rounded-lg p-4 max-h-96 overflow-y-auto">
            {recentTasks.length > 0 ? (
              <div className="space-y-3">
                {recentTasks.map((task) => {
                  const agent = agents.find((a) => a.id === task.agentId);

                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 bg-background rounded-lg space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">
                            {agent ? getAgentIcon(agent.type) : "🤖"}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {task.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {agent?.name}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            task.status === "completed"
                              ? "text-green-500 bg-green-500/10"
                              : task.status === "running"
                                ? "text-blue-500 bg-blue-500/10"
                                : task.status === "failed"
                                  ? "text-red-500 bg-red-500/10"
                                  : "text-gray-500 bg-gray-500/10"
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>

                      {task.status === "running" && (
                        <div className="w-full bg-muted rounded-full h-1">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-300"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                      )}

                      {task.startTime && (
                        <p className="text-xs text-muted-foreground">
                          {formatDate(task.startTime)}
                        </p>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Zap className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No recent tasks</p>
                <p className="text-sm text-muted-foreground">
                  Start an agent to see tasks here
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
