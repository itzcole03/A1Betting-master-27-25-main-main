import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderOpen,
  Check,
  X,
  AlertTriangle,
  Settings,
  Play,
  RefreshCw,
  Info,
  CheckCircle,
  XCircle,
  Folder,
  File,
} from "lucide-react";
import type { WorkspaceSettings, WorkspaceValidation } from "@/types";
import {
  validateWorkspace,
  setupWorkspace,
  getWorkspaceInfo,
  validateWorkspacePath,
  normalizeWorkspacePath,
  DEFAULT_REQUIRED_FILES,
  DEFAULT_SETUP_COMMANDS,
} from "@/utils/workspace";
import { toast } from "react-hot-toast";

interface WorkspaceSelectorProps {
  settings: WorkspaceSettings | undefined;
  onSettingsChange: (settings: Partial<WorkspaceSettings>) => void;
}

const DEFAULT_WORKSPACE_SETTINGS: WorkspaceSettings = {
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

export default function WorkspaceSelector({
  settings,
  onSettingsChange,
}: WorkspaceSelectorProps) {
  const [validation, setValidation] = useState<WorkspaceValidation | null>(
    null,
  );
  const [isValidating, setIsValidating] = useState(false);
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [showValidationDetails, setShowValidationDetails] = useState(false);
  const [workspaceInfo, setWorkspaceInfo] = useState<any>(null);

  // Use safe workspace settings with defaults
  const safeSettings = settings || DEFAULT_WORKSPACE_SETTINGS;

  const handleDirectoryChange = (directory: string) => {
    const normalizedPath = normalizeWorkspacePath(directory);
    const pathValidation = validateWorkspacePath(normalizedPath);

    if (!pathValidation.valid) {
      toast.error(pathValidation.error || "Invalid workspace path");
      return;
    }

    onSettingsChange({
      directory: normalizedPath,
      initialized: false,
      lastValidation: null,
    });
    setValidation(null);
    setWorkspaceInfo(null);
  };

  const handleValidateWorkspace = async () => {
    if (!safeSettings.directory) {
      toast.error("Please enter a workspace directory");
      return;
    }

    setIsValidating(true);
    try {
      const result = await validateWorkspace(
        safeSettings.directory,
        safeSettings.requiredFiles || DEFAULT_REQUIRED_FILES,
      );
      setValidation(result);

      // Also get workspace info
      const info = await getWorkspaceInfo(safeSettings.directory);
      setWorkspaceInfo(info);

      onSettingsChange({
        lastValidation: new Date(),
        initialized: result.isValid && info.initialized,
      });

      if (result.isValid) {
        toast.success("Workspace validation passed!");
      } else {
        toast.error("Workspace validation failed");
      }
    } catch (error) {
      toast.error("Failed to validate workspace");
      console.error("Workspace validation error:", error);
    } finally {
      setIsValidating(false);
    }
  };

  const handleSetupWorkspace = async () => {
    if (!safeSettings.directory) {
      toast.error("Please enter a workspace directory");
      return;
    }

    setIsSettingUp(true);
    try {
      const result = await setupWorkspace(
        safeSettings.directory,
        safeSettings.requiredFiles || DEFAULT_REQUIRED_FILES,
        safeSettings.setupCommands || DEFAULT_SETUP_COMMANDS,
      );

      if (result.success) {
        toast.success("Workspace setup completed!");
        // Re-validate after setup
        await handleValidateWorkspace();
      } else {
        toast.error("Workspace setup completed with errors");
        console.error("Setup errors:", result.errors);
      }
    } catch (error) {
      toast.error("Failed to setup workspace");
      console.error("Workspace setup error:", error);
    } finally {
      setIsSettingUp(false);
    }
  };

  // Auto-validate when directory changes
  useEffect(() => {
    if (safeSettings.directory && safeSettings.autoSetup) {
      const timeoutId = setTimeout(() => {
        handleValidateWorkspace();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [safeSettings.directory]);

  const getValidationIcon = () => {
    if (isValidating) return <RefreshCw className="w-4 h-4 animate-spin" />;
    if (!validation) return <Info className="w-4 h-4" />;
    return validation.isValid ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <XCircle className="w-4 h-4 text-red-500" />
    );
  };

  const getValidationStatus = () => {
    if (isValidating) return "Validating...";
    if (!validation) return "Not validated";
    return validation.isValid ? "Valid workspace" : "Invalid workspace";
  };

  return (
    <div className="space-y-6">
      {/* Directory Input */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">
          Workspace Directory
        </label>
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={safeSettings.directory}
              onChange={(e) => handleDirectoryChange(e.target.value)}
              placeholder="./workspace"
              className="w-full px-3 py-2 pl-10 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <FolderOpen className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
          </div>
          <button
            onClick={handleValidateWorkspace}
            disabled={isValidating || !safeSettings.directory}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {getValidationIcon()}
            <span>Validate</span>
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          Path to your development workspace directory. Will be created if it
          doesn't exist.
        </p>
      </div>

      {/* Auto Setup Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-foreground">
            Auto Setup
          </label>
          <p className="text-xs text-muted-foreground">
            Automatically validate and setup workspace when directory changes
          </p>
        </div>
        <button
          onClick={() =>
            onSettingsChange({ autoSetup: !safeSettings.autoSetup })
          }
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            safeSettings.autoSetup ? "bg-primary" : "bg-muted"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              safeSettings.autoSetup ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Validation Status */}
      {(validation || isValidating) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg border ${
            validation?.isValid
              ? "bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700"
              : "bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getValidationIcon()}
              <div>
                <p
                  className={`text-sm font-medium ${
                    validation?.isValid
                      ? "text-green-800 dark:text-green-200"
                      : "text-red-800 dark:text-red-200"
                  }`}
                >
                  {getValidationStatus()}
                </p>
                {validation && !validation.isValid && (
                  <p
                    className={`text-xs ${
                      validation?.isValid
                        ? "text-green-700 dark:text-green-300"
                        : "text-red-700 dark:text-red-300"
                    }`}
                  >
                    {validation.missingFiles.length +
                      validation.missingDirectories.length}{" "}
                    items need attention
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {validation &&
                !validation.isValid &&
                validation.setupRequired && (
                  <button
                    onClick={handleSetupWorkspace}
                    disabled={isSettingUp}
                    className="px-3 py-1.5 bg-primary text-primary-foreground text-xs rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center space-x-1"
                  >
                    {isSettingUp ? (
                      <RefreshCw className="w-3 h-3 animate-spin" />
                    ) : (
                      <Play className="w-3 h-3" />
                    )}
                    <span>{isSettingUp ? "Setting up..." : "Setup"}</span>
                  </button>
                )}

              <button
                onClick={() => setShowValidationDetails(!showValidationDetails)}
                className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs rounded-md hover:bg-secondary/80 transition-colors flex items-center space-x-1"
              >
                <Info className="w-3 h-3" />
                <span>Details</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Validation Details */}
      <AnimatePresence>
        {showValidationDetails && validation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-card border border-border rounded-lg p-4 space-y-4"
          >
            {/* Missing Files */}
            {validation.missingFiles.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
                  <File className="w-4 h-4 text-red-500" />
                  <span>Missing Files ({validation.missingFiles.length})</span>
                </h4>
                <div className="space-y-1">
                  {validation.missingFiles.map((file) => (
                    <div
                      key={file}
                      className="flex items-center space-x-2 text-xs"
                    >
                      <X className="w-3 h-3 text-red-500" />
                      <span className="text-muted-foreground font-mono">
                        {file}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Directories */}
            {validation.missingDirectories.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
                  <Folder className="w-4 h-4 text-red-500" />
                  <span>
                    Missing Directories ({validation.missingDirectories.length})
                  </span>
                </h4>
                <div className="space-y-1">
                  {validation.missingDirectories.map((dir) => (
                    <div
                      key={dir}
                      className="flex items-center space-x-2 text-xs"
                    >
                      <X className="w-3 h-3 text-red-500" />
                      <span className="text-muted-foreground font-mono">
                        {dir}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Errors */}
            {validation.errors.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span>Errors</span>
                </h4>
                <div className="space-y-1">
                  {validation.errors.map((error, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-2 text-xs"
                    >
                      <X className="w-3 h-3 text-red-500 mt-0.5" />
                      <span className="text-muted-foreground">{error}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {validation.suggestions.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
                  <Info className="w-4 h-4 text-blue-500" />
                  <span>Suggestions</span>
                </h4>
                <div className="space-y-1">
                  {validation.suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-2 text-xs"
                    >
                      <Check className="w-3 h-3 text-blue-500 mt-0.5" />
                      <span className="text-muted-foreground">
                        {suggestion}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Workspace Info */}
      {workspaceInfo && (
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Workspace Information</span>
          </h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-muted-foreground">Status:</span>
              <span
                className={`ml-2 font-medium ${workspaceInfo.initialized ? "text-green-500" : "text-yellow-500"}`}
              >
                {workspaceInfo.initialized ? "Initialized" : "Not Initialized"}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Files:</span>
              <span className="ml-2 font-medium text-foreground">
                {workspaceInfo.files?.length || 0}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Size:</span>
              <span className="ml-2 font-medium text-foreground">
                {workspaceInfo.size
                  ? `${(workspaceInfo.size / 1024).toFixed(1)} KB`
                  : "Unknown"}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Last Modified:</span>
              <span className="ml-2 font-medium text-foreground">
                {workspaceInfo.lastModified
                  ? new Date(workspaceInfo.lastModified).toLocaleDateString()
                  : "Unknown"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
