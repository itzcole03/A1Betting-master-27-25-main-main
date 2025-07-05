import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Play,
  Copy,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Terminal,
  Zap,
  Brain,
  Shield,
  Activity,
  Wrench,
  Search,
  Filter,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { formatDate, generateId, copyToClipboard } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { useCommands } from "@/hooks/useApi";
import type { Command, CommandHistory } from "@/types";

export default function Commands() {
  const { setCurrentPage, addLog, addNotification } = useAppStore();

  const {
    commands,
    commandHistory,
    executeCommand: apiExecuteCommand,
    loading,
  } = useCommands();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [runningCommands, setRunningCommands] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    setCurrentPage("commands");
  }, [setCurrentPage]);

  const categories = [
    { id: "all", name: "All Commands", icon: Terminal },
    { id: "planning", name: "Planning", icon: Brain },
    { id: "execution", name: "Execution", icon: Zap },
    { id: "monitoring", name: "Monitoring", icon: Activity },
    { id: "autonomous", name: "Autonomous", icon: Wrench },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const matchesSearch =
      cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || cmd.category === selectedCategory;
    return matchesSearch && matchesCategory && cmd.enabled;
  });

  const executeCommand = async (command: Command) => {
    try {
      setRunningCommands((prev) => new Set(prev).add(command.id));

      addLog({
        level: "info",
        source: "Commands",
        message: `Executing command: ${command.name}`,
      });

      const historyEntry = await apiExecuteCommand(command);

      addNotification({
        title: "Command Started",
        message: `${command.name} is now executing`,
        type: "info",
      });

      addLog({
        level: "info",
        source: "Commands",
        message: `Command started: ${command.name}`,
      });
    } catch (error) {
      addNotification({
        title: "Command Failed",
        message: `Failed to execute ${command.name}`,
        type: "error",
      });
      addLog({
        level: "error",
        source: "Commands",
        message: `Command error: ${error}`,
      });
    } finally {
      setRunningCommands((prev) => {
        const newSet = new Set(prev);
        newSet.delete(command.id);
        return newSet;
      });
    }
  };

  const copyCommand = async (command: string) => {
    try {
      await copyToClipboard(command);
      toast.success("Command copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy command");
    }
  };

  const getStatusIcon = (status: CommandHistory["status"]) => {
    switch (status) {
      case "running":
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "planning":
        return Brain;
      case "execution":
        return Zap;
      case "monitoring":
        return Activity;
      case "autonomous":
        return Wrench;
      default:
        return Terminal;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Command Interface
          </h1>
          <p className="text-muted-foreground">
            Execute commands and monitor their progress in real-time
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search commands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commands Grid */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold text-foreground">
            Available Commands
          </h2>

          <div className="space-y-3">
            {filteredCommands.map((command, index) => {
              const CategoryIcon = getCategoryIcon(command.category);

              return (
                <motion.div
                  key={command.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <CategoryIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {command.name}
                          </h3>
                          <p className="text-sm text-muted-foreground capitalize">
                            {command.category}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">
                        {command.description}
                      </p>

                      <div className="flex items-center space-x-2 text-xs text-muted-foreground bg-background rounded px-2 py-1 font-mono">
                        <Terminal className="w-3 h-3" />
                        <span>{command.command}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <motion.button
                        onClick={() => copyCommand(command.command)}
                        className="p-2 hover:bg-accent rounded-lg transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Copy command"
                      >
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      </motion.button>

                      <motion.button
                        onClick={() => executeCommand(command)}
                        disabled={loading || runningCommands.has(command.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        whileHover={{
                          scale:
                            loading || runningCommands.has(command.id)
                              ? 1
                              : 1.05,
                        }}
                        whileTap={{
                          scale:
                            loading || runningCommands.has(command.id)
                              ? 1
                              : 0.95,
                        }}
                      >
                        {runningCommands.has(command.id) ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                        <span>
                          {runningCommands.has(command.id)
                            ? "Running..."
                            : "Execute"}
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredCommands.length === 0 && (
            <div className="text-center py-12">
              <Terminal className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No commands found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </motion.div>

        {/* Command History */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold text-foreground">
            Command History
          </h2>

          <div className="bg-card border border-border rounded-lg p-4 max-h-96 overflow-y-auto">
            {commandHistory.length > 0 ? (
              <div className="space-y-3">
                {commandHistory.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-start space-x-3 p-3 bg-background rounded-lg"
                  >
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(entry.status)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground truncate">
                          {entry.command.name}
                        </p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {formatDate(entry.timestamp)}
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground mt-1">
                        {entry.command.description}
                      </p>

                      {entry.output && (
                        <div className="mt-2 p-2 bg-muted rounded text-xs font-mono">
                          {entry.output}
                        </div>
                      )}

                      {entry.duration && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Duration: {(entry.duration / 1000).toFixed(2)}s
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No command history</p>
                <p className="text-sm text-muted-foreground">
                  Execute a command to see it here
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
