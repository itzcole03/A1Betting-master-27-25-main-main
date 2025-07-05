import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Bell, Search, User, Wifi, WifiOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { formatDate } from "@/lib/utils";
import { toast } from "react-hot-toast";

export default function Header() {
  const {
    notifications,
    isConnected,
    lastUpdate,
    currentPage,
    systemMetrics,
    markNotificationRead,
    clearNotifications,
  } = useAppStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const pageTitles: Record<string, string> = {
    dashboard: "Dashboard",
    commands: "Command Interface",
    agents: "AI Agents",
    "memory-bank": "Memory Bank",
    "typescript-repair": "TypeScript Repair",
    performance: "Performance Monitor",
    analytics: "Analytics",
    logs: "System Logs",
    settings: "Settings",
  };

  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();

    // Smart search routing based on keywords
    if (
      lowerQuery.includes("command") ||
      lowerQuery.includes("terminal") ||
      lowerQuery.includes("execute")
    ) {
      navigate("/commands");
      toast.success(`Navigating to Commands for: "${query}"`);
    } else if (
      lowerQuery.includes("agent") ||
      lowerQuery.includes("ai") ||
      lowerQuery.includes("bot")
    ) {
      navigate("/agents");
      toast.success(`Navigating to Agents for: "${query}"`);
    } else if (
      lowerQuery.includes("typescript") ||
      lowerQuery.includes("error") ||
      lowerQuery.includes("repair")
    ) {
      navigate("/typescript-repair");
      toast.success(`Navigating to TypeScript Repair for: "${query}"`);
    } else if (
      lowerQuery.includes("log") ||
      lowerQuery.includes("debug") ||
      lowerQuery.includes("console")
    ) {
      navigate("/logs");
      toast.success(`Navigating to Logs for: "${query}"`);
    } else if (
      lowerQuery.includes("memory") ||
      lowerQuery.includes("bank") ||
      lowerQuery.includes("file")
    ) {
      navigate("/memory-bank");
      toast.success(`Navigating to Memory Bank for: "${query}"`);
    } else if (
      lowerQuery.includes("performance") ||
      lowerQuery.includes("metric") ||
      lowerQuery.includes("monitor")
    ) {
      navigate("/performance");
      toast.success(`Navigating to Performance for: "${query}"`);
    } else if (
      lowerQuery.includes("analytics") ||
      lowerQuery.includes("chart") ||
      lowerQuery.includes("data")
    ) {
      navigate("/analytics");
      toast.success(`Navigating to Analytics for: "${query}"`);
    } else if (
      lowerQuery.includes("setting") ||
      lowerQuery.includes("config") ||
      lowerQuery.includes("workspace")
    ) {
      navigate("/settings");
      toast.success(`Navigating to Settings for: "${query}"`);
    } else {
      // Default to dashboard with search context
      navigate("/dashboard");
      toast.info(`Searched for: "${query}" - showing Dashboard`);
    }

    setSearchTerm("");
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications && unreadNotifications > 0) {
      // Mark all as read when opening notifications
      notifications
        .filter((n) => !n.read)
        .forEach((n) => markNotificationRead(n.id));
    }
  };

  const handleUserMenuClick = () => {
    navigate("/settings");
    toast.info("Opening user settings");
  };

  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      {/* Left Section - Page Title */}
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            {pageTitles[currentPage] || "Cursor AI GUI"}
          </h1>
          <p className="text-sm text-muted-foreground">
            A1Betting Platform Management Interface
          </p>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-lg mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && searchTerm.trim()) {
                handleSearch(searchTerm.trim());
              }
            }}
            placeholder="Search commands, agents, logs..."
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Right Section - Status & Actions */}
      <div className="flex items-center space-x-4">
        {/* Connection Status */}
        <motion.div
          className="flex items-center space-x-2"
          animate={{
            opacity: isConnected ? 1 : 0.6,
          }}
        >
          {isConnected ? (
            <Wifi className="w-4 h-4 text-green-500" />
          ) : (
            <WifiOff className="w-4 h-4 text-yellow-500" />
          )}
          <span className="text-sm text-muted-foreground">
            {isConnected ? "Live Data" : "Offline Mode"}
          </span>
        </motion.div>

        {/* System Metrics */}
        {systemMetrics && (
          <div className="flex items-center space-x-3 text-sm">
            <div className="flex items-center space-x-1">
              <span className="text-muted-foreground">CPU:</span>
              <span
                className={`font-medium ${
                  systemMetrics.cpu > 80
                    ? "text-red-500"
                    : systemMetrics.cpu > 60
                      ? "text-yellow-500"
                      : "text-green-500"
                }`}
              >
                {systemMetrics.cpu}%
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-muted-foreground">RAM:</span>
              <span
                className={`font-medium ${
                  systemMetrics.memory > 80
                    ? "text-red-500"
                    : systemMetrics.memory > 60
                      ? "text-yellow-500"
                      : "text-green-500"
                }`}
              >
                {systemMetrics.memory}%
              </span>
            </div>
          </div>
        )}

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <motion.button
            onClick={handleNotificationClick}
            className="relative p-2 hover:bg-accent rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            {unreadNotifications > 0 && (
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {unreadNotifications > 9 ? "9+" : unreadNotifications}
              </motion.div>
            )}
          </motion.button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Notifications</h3>
                {notifications.length > 0 && (
                  <button
                    onClick={() => {
                      clearNotifications();
                      toast.success("All notifications cleared");
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    No notifications
                  </div>
                ) : (
                  notifications.slice(0, 10).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b border-border last:border-b-0 ${
                        !notification.read ? "bg-accent/50" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDate(notification.timestamp)}
                          </p>
                        </div>
                        <div
                          className={`w-2 h-2 rounded-full mt-1 ml-2 ${
                            notification.type === "error"
                              ? "bg-red-500"
                              : notification.type === "warning"
                                ? "bg-yellow-500"
                                : notification.type === "success"
                                  ? "bg-green-500"
                                  : "bg-blue-500"
                          }`}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* User Menu */}
        <motion.button
          onClick={handleUserMenuClick}
          className="flex items-center space-x-3 p-2 hover:bg-accent rounded-lg transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-foreground">Developer</div>
            <div className="text-xs text-muted-foreground">Admin</div>
          </div>
        </motion.button>

        {/* Last Update */}
        {lastUpdate && (
          <div className="text-xs text-muted-foreground">
            Last update: {formatDate(lastUpdate)}
          </div>
        )}
      </div>
    </header>
  );
}
