import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Terminal,
  Bot,
  Database,
  Wrench,
  Activity,
  BarChart3,
  FileText,
  Settings,
  Brain,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "Commands",
    href: "/commands",
    icon: Terminal,
    badge: null,
  },
  {
    name: "Agents",
    href: "/agents",
    icon: Bot,
    badge: "5",
  },
  {
    name: "Memory Bank",
    href: "/memory-bank",
    icon: Database,
    badge: null,
  },
  {
    name: "TypeScript Repair",
    href: "/typescript-repair",
    icon: Wrench,
    badge: "26K",
  },
  {
    name: "Performance",
    href: "/performance",
    icon: Activity,
    badge: null,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    badge: null,
  },
  {
    name: "Logs",
    href: "/logs",
    icon: FileText,
    badge: null,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    badge: null,
  },
];

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen, agents } = useAppStore();

  const runningAgents = agents.filter(
    (agent) => agent.status === "running",
  ).length;

  return (
    <motion.div
      className={cn(
        "fixed left-0 top-0 h-full bg-card border-r border-border z-50 transition-all duration-300 ease-in-out",
        sidebarOpen ? "w-64" : "w-16",
      )}
      initial={false}
      animate={{ width: sidebarOpen ? 256 : 64 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <motion.div
          className="flex items-center space-x-3"
          initial={false}
          animate={{ opacity: sidebarOpen ? 1 : 0 }}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          {sidebarOpen && (
            <div>
              <h1 className="text-lg font-bold text-foreground">Cursor AI</h1>
              <p className="text-xs text-muted-foreground">
                A1Betting Platform
              </p>
            </div>
          )}
        </motion.div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg hover:bg-accent transition-colors"
          title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isAgentsPage = item.href === "/agents";
          const displayBadge =
            isAgentsPage && runningAgents > 0
              ? runningAgents.toString()
              : item.badge;

          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group relative",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={cn(
                      "w-5 h-5 transition-colors",
                      isActive ? "text-primary-foreground" : "",
                    )}
                  />

                  {sidebarOpen && (
                    <motion.span
                      className="font-medium"
                      initial={false}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {item.name}
                    </motion.span>
                  )}

                  {displayBadge && (
                    <motion.div
                      className={cn(
                        "ml-auto px-2 py-0.5 text-xs font-medium rounded-full",
                        sidebarOpen
                          ? "relative"
                          : "absolute left-full ml-2 whitespace-nowrap",
                        isActive
                          ? "bg-primary-foreground text-primary"
                          : isAgentsPage && runningAgents > 0
                            ? "bg-green-500 text-white animate-pulse"
                            : "bg-muted text-muted-foreground",
                      )}
                      initial={false}
                      animate={{
                        opacity: 1,
                        scale:
                          isAgentsPage && runningAgents > 0 ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        scale: {
                          duration: 2,
                          repeat: runningAgents > 0 ? Infinity : 0,
                          repeatType: "reverse",
                        },
                      }}
                    >
                      {displayBadge}
                    </motion.div>
                  )}

                  {!sidebarOpen && (
                    <motion.div
                      className="absolute left-full ml-2 px-3 py-2 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50"
                      initial={false}
                    >
                      <span className="text-sm font-medium">{item.name}</span>
                      {displayBadge && (
                        <span
                          className={cn(
                            "ml-2 px-2 py-0.5 text-xs rounded-full",
                            isAgentsPage && runningAgents > 0
                              ? "bg-green-500 text-white"
                              : "bg-muted text-muted-foreground",
                          )}
                        >
                          {displayBadge}
                        </span>
                      )}
                    </motion.div>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Status Panel */}
      {sidebarOpen && (
        <motion.div
          className="p-4 border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                System Status
              </span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-500">Online</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Active Agents</span>
                <span className="text-foreground font-medium">
                  {runningAgents}/5
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Memory Bank</span>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span className="text-green-500">Healthy</span>
                </div>
              </div>
            </div>

            <motion.button
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Zap className="w-4 h-4" />
              <span>Quick Command</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
