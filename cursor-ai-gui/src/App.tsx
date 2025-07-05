import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { useWebSocket } from "@/hooks/useApi";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { realTimeService } from "@/services/realtime";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Commands from "@/pages/Commands";
import Agents from "@/pages/Agents";
import MemoryBank from "@/pages/MemoryBank";
import Performance from "@/pages/Performance";
import TypeScriptRepair from "@/pages/TypeScriptRepair";
import Settings from "@/pages/Settings";
import Analytics from "@/pages/Analytics";
import Logs from "@/pages/Logs";
import LoadingScreen from "@/components/LoadingScreen";

export default function App() {
  const { loading, setLoading, addLog } = useAppStore();

  // Initialize WebSocket connection
  const { isConnected } = useWebSocket();

  // Initialize keyboard shortcuts
  useKeyboardShortcuts();

  useEffect(() => {
    // Initialize the application without loading screen
    const initApp = async () => {
      console.log("App initialization starting...");

      try {
        // Add initialization log
        addLog({
          level: "info",
          source: "App",
          message: "Cursor AI GUI application starting...",
        });

        addLog({
          level: "info",
          source: "App",
          message: "Application initialized successfully",
        });

        addLog({
          level: "info",
          source: "WebSocket",
          message: `WebSocket connection: ${isConnected ? "Connected" : "Connecting..."}`,
        });

        // Start real-time data service for demo/fallback
        realTimeService.start();

        addLog({
          level: "info",
          source: "RealTime",
          message: "Real-time data service started",
        });

        console.log("App initialization completed successfully");
      } catch (error) {
        console.error("App initialization failed:", error);
        addLog({
          level: "error",
          source: "App",
          message: `Initialization failed: ${error}`,
        });
      }
    };

    // Ensure loading is always false
    setLoading(false);
    initApp();

    // Cleanup on unmount
    return () => {
      realTimeService.stop();
    };
  }, [setLoading, addLog, isConnected]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnimatePresence mode="wait">
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/commands" element={<Commands />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/memory-bank" element={<MemoryBank />} />
              <Route path="/typescript-repair" element={<TypeScriptRepair />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Layout>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
