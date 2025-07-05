import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Settings as SettingsIcon,
  Save,
  RotateCcw,
  Moon,
  Sun,
  Monitor,
  FolderOpen,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import WorkspaceSelector from "@/components/WorkspaceSelector";
import { toast } from "react-hot-toast";

export default function Settings() {
  const { setCurrentPage, settings, updateSettings } = useAppStore();

  // Ensure workspace settings exist with defaults
  const safeSettings = {
    ...settings,
    workspace: settings.workspace || {
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
    },
  };

  const [localSettings, setLocalSettings] = useState(safeSettings);

  useEffect(() => {
    setCurrentPage("settings");
  }, [setCurrentPage]);

  const saveSettings = () => {
    updateSettings(localSettings);
    toast.success("Settings saved successfully!");
  };

  const resetSettings = () => {
    const defaultSettings = {
      theme: "dark" as const,
      notifications: true,
      autoSave: true,
      refreshInterval: 5000,
      debugMode: false,
      apiEndpoint: "http://localhost:8000",
      maxLogHistory: 1000,
      preferredAgent: "typescript-repair",
      workspace: {
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
      },
    };
    setLocalSettings(defaultSettings);
    updateSettings(defaultSettings);
    toast.success("Settings reset to defaults!");
  };

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "auto", label: "Auto", icon: Monitor },
  ];

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">
              Configure application preferences and system settings
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={resetSettings}
              className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            <button
              onClick={saveSettings}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Workspace Configuration - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-lg p-6 space-y-6"
      >
        <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
          <FolderOpen className="w-5 h-5" />
          <span>Workspace Configuration</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Configure your development workspace directory and setup requirements.
          The workspace will contain all project files, memory bank data, and AI
          agent configurations.
        </p>

        <WorkspaceSelector
          settings={localSettings.workspace}
          onSettingsChange={(workspaceSettings) =>
            setLocalSettings({
              ...localSettings,
              workspace: { ...localSettings.workspace, ...workspaceSettings },
            })
          }
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-lg p-6 space-y-6"
        >
          <h2 className="text-xl font-semibold text-foreground">Appearance</h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Theme
              </label>
              <div className="grid grid-cols-3 gap-3">
                {themeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      setLocalSettings({
                        ...localSettings,
                        theme: option.value as any,
                      })
                    }
                    className={`flex items-center justify-center space-x-2 p-3 rounded-lg border transition-colors ${
                      localSettings.theme === option.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background hover:bg-accent"
                    }`}
                  >
                    <option.icon className="w-4 h-4" />
                    <span className="text-sm">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* System */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-lg p-6 space-y-6"
        >
          <h2 className="text-xl font-semibold text-foreground">System</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Notifications
                </label>
                <p className="text-xs text-muted-foreground">
                  Enable system notifications
                </p>
              </div>
              <button
                onClick={() =>
                  setLocalSettings({
                    ...localSettings,
                    notifications: !localSettings.notifications,
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  localSettings.notifications ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    localSettings.notifications
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Auto Save
                </label>
                <p className="text-xs text-muted-foreground">
                  Automatically save settings
                </p>
              </div>
              <button
                onClick={() =>
                  setLocalSettings({
                    ...localSettings,
                    autoSave: !localSettings.autoSave,
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  localSettings.autoSave ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    localSettings.autoSave ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Debug Mode
                </label>
                <p className="text-xs text-muted-foreground">
                  Enable debug logging
                </p>
              </div>
              <button
                onClick={() =>
                  setLocalSettings({
                    ...localSettings,
                    debugMode: !localSettings.debugMode,
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  localSettings.debugMode ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    localSettings.debugMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* API Configuration */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-lg p-6 space-y-6"
        >
          <h2 className="text-xl font-semibold text-foreground">
            API Configuration
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                API Endpoint
              </label>
              <input
                type="text"
                value={localSettings.apiEndpoint}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    apiEndpoint: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Refresh Interval (ms)
              </label>
              <input
                type="number"
                value={localSettings.refreshInterval}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    refreshInterval: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Max Log History
              </label>
              <input
                type="number"
                value={localSettings.maxLogHistory}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    maxLogHistory: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </motion.div>

        {/* Agent Preferences */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-lg p-6 space-y-6"
        >
          <h2 className="text-xl font-semibold text-foreground">
            Agent Preferences
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Preferred Agent
              </label>
              <select
                value={localSettings.preferredAgent}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    preferredAgent: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="typescript-repair">
                  TypeScript Repair Specialist
                </option>
                <option value="ml-performance">ML Performance Engineer</option>
                <option value="security-audit">
                  Security Compliance Auditor
                </option>
                <option value="performance-optimizer">
                  Performance Optimizer
                </option>
                <option value="a1betting-architect">A1Betting Architect</option>
              </select>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
