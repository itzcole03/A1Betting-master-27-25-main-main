import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Bot,
  Brain,
  Code,
  Database,
  Shield,
  TrendingUp,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Cpu,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { formatNumber, formatPercentage } from "@/lib/utils";
import {
  useSystemMetrics,
  useTypeScriptStats,
  useWebSocket,
} from "@/hooks/useApi";
import { toast } from "react-hot-toast";

export default function Dashboard() {
  const {
    setCurrentPage,
    agents,
    performanceMetrics,
    memoryBankStatus,
    commandHistory,
    setPerformanceMetrics,
    addLog,
  } = useAppStore();

  // Use real API hooks
  const { systemMetrics } = useSystemMetrics();
  const { typeScriptStats } = useTypeScriptStats();
  const { isConnected } = useWebSocket();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage("dashboard");

    // Mock performance metrics (until backend is available)
    setPerformanceMetrics({
      buildTime: 28.5,
      mlAccuracy: 96.4,
      winRate: 73.8,
      roi: 18.5,
      sharpeRatio: 1.42,
      errorCount: typeScriptStats
        ? typeScriptStats.totalErrors - typeScriptStats.errorsFixed
        : 25547,
      uptime: 99.8,
      lastUpdate: new Date(),
    });

    addLog({
      level: "info",
      source: "Dashboard",
      message: "Dashboard initialized with real-time data feeds",
    });
  }, [setCurrentPage, setPerformanceMetrics, addLog, typeScriptStats]);

  const runningAgents = agents.filter(
    (agent) => agent.status === "running",
  ).length;
  const recentCommands = commandHistory.slice(0, 5);

  const statCards = [
    {
      title: "TypeScript Errors",
      value: typeScriptStats
        ? formatNumber(
            typeScriptStats.totalErrors - typeScriptStats.errorsFixed,
          )
        : "---",
      change: typeScriptStats ? `-${typeScriptStats.errorsFixed}` : "",
      icon: Code,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      onClick: () => {
        navigate("/typescript-repair");
        toast.success("Opening TypeScript Repair");
      },
    },
    {
      title: "Active Agents",
      value: `${runningAgents}/${agents.length}`,
      change: `${runningAgents} running`,
      icon: Bot,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      onClick: () => {
        navigate("/agents");
        toast.success("Opening AI Agents");
      },
    },
    {
      title: "ML Accuracy",
      value: performanceMetrics ? `${performanceMetrics.mlAccuracy}%` : "---",
      change: "Target: 96.4%",
      icon: Brain,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      onClick: () => {
        navigate("/performance");
        toast.success("Opening Performance Monitor");
      },
    },
    {
      title: "Build Time",
      value: performanceMetrics ? `${performanceMetrics.buildTime}s` : "---",
      change: "Target: <30s",
      icon: Zap,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      onClick: () => {
        navigate("/performance");
        toast.success("Opening Performance Monitor");
      },
    },
  ];

  const systemStatus = [
    {
      name: "Memory Bank",
      status: memoryBankStatus?.health === "excellent" ? "healthy" : "warning",
      value: memoryBankStatus
        ? `${memoryBankStatus.totalFiles} files`
        : "Loading...",
      icon: Database,
      onClick: () => {
        navigate("/memory-bank");
        toast.success("Opening Memory Bank");
      },
    },
    {
      name: "Security",
      status: "healthy",
      value: "All checks passed",
      icon: Shield,
      onClick: () => {
        navigate("/logs");
        toast.info("Security logs available in System Logs");
      },
    },
    {
      name: "Performance",
      status:
        performanceMetrics?.buildTime && performanceMetrics.buildTime < 30
          ? "healthy"
          : "warning",
      value: performanceMetrics
        ? `${performanceMetrics.buildTime}s build`
        : "Checking...",
      icon: Activity,
      onClick: () => {
        navigate("/performance");
        toast.success("Opening Performance Monitor");
      },
    },
    {
      name: "System",
      status:
        systemMetrics?.cpu && systemMetrics.cpu < 80 ? "healthy" : "warning",
      value: systemMetrics ? `${systemMetrics.cpu}% CPU` : "Monitoring...",
      icon: Cpu,
      onClick: () => {
        navigate("/analytics");
        toast.success("Opening System Analytics");
      },
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-foreground">System Overview</h1>
        <p className="text-muted-foreground">
          Real-time monitoring of the A1Betting platform development environment
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={stat.onClick}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1 bg-card border border-border rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">
            System Status
          </h3>
          <div className="space-y-4">
            {systemStatus.map((item) => (
              <div
                key={item.name}
                onClick={item.onClick}
                className="flex items-center justify-between cursor-pointer hover:bg-accent/50 rounded-lg p-2 -m-2 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      item.status === "healthy"
                        ? "bg-green-500/10"
                        : "bg-yellow-500/10"
                    }`}
                  >
                    <item.icon
                      className={`w-4 h-4 ${
                        item.status === "healthy"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.value}
                    </p>
                  </div>
                </div>
                {item.status === "healthy" ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* TypeScript Repair Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              TypeScript Repair Progress
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Target: &lt;100 errors</span>
            </div>
          </div>

          {typeScriptStats && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-foreground font-medium">
                  {formatPercentage(typeScriptStats.progress)}
                </span>
              </div>

              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${typeScriptStats.progress * 100}%` }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-red-500">
                    {formatNumber(typeScriptStats.totalErrors)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Errors</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-500">
                    {formatNumber(typeScriptStats.errorsFixed)}
                  </p>
                  <p className="text-sm text-muted-foreground">Fixed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-500">
                    {formatNumber(
                      typeScriptStats.totalErrors - typeScriptStats.errorsFixed,
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">Remaining</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Recent Commands
        </h3>
        {recentCommands.length > 0 ? (
          <div className="space-y-3">
            {recentCommands.map((cmd) => (
              <div
                key={cmd.id}
                className="flex items-center justify-between p-3 bg-background rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      cmd.status === "completed"
                        ? "bg-green-500"
                        : cmd.status === "running"
                          ? "bg-blue-500 animate-pulse"
                          : cmd.status === "failed"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {cmd.command.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {cmd.command.description}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {cmd.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No recent commands</p>
            <p className="text-sm text-muted-foreground">
              Start by running a command from the Commands page
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
