import type {
  WorkspaceValidation,
  RequiredFile,
  WorkspaceSettings,
} from "@/types";
import { apiService } from "@/services/api";

// Default required files and directories for the Cursor AI workspace
export const DEFAULT_REQUIRED_FILES: RequiredFile[] = [
  {
    path: "package.json",
    type: "file",
    required: true,
    description: "Node.js project configuration",
    template: `{
  "name": "cursor-ai-workspace",
  "version": "1.0.0",
  "description": "Cursor AI development workspace",
  "scripts": {
    "dev": "npm run dev",
    "build": "npm run build",
    "test": "npm run test"
  },
  "dependencies": {}
}`,
  },
  {
    path: ".cursorrules",
    type: "file",
    required: true,
    description: "Cursor AI rules and configuration",
    template: `# Cursor AI Workspace Rules

## Development Guidelines
- Follow TypeScript best practices
- Use proper error handling
- Implement comprehensive logging
- Follow the existing code style

## AI Agent Instructions
- Focus on autonomous development
- Prioritize TypeScript error fixing
- Maintain code quality standards
- Document all major changes

## Memory Bank Integration
- Keep context files updated
- Use structured logging
- Maintain development history
`,
  },
  {
    path: "src",
    type: "directory",
    required: true,
    description: "Source code directory",
  },
  {
    path: "src/memory-bank",
    type: "directory",
    required: false,
    description: "Memory bank storage for AI context",
  },
  {
    path: "logs",
    type: "directory",
    required: false,
    description: "Application logs directory",
  },
  {
    path: ".env.example",
    type: "file",
    required: false,
    description: "Environment variables template",
    template: `# Cursor AI Workspace Environment Variables

# API Configuration
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000

# Development Settings
NODE_ENV=development
DEBUG=true

# Workspace Settings
WORKSPACE_DIR=./workspace
AUTO_SETUP=true
`,
  },
  {
    path: "cursor-ai-config.json",
    type: "file",
    required: true,
    description: "Cursor AI workspace configuration",
    template: `{
  "workspace": {
    "name": "Cursor AI Development Workspace",
    "version": "1.0.0",
    "autoSetup": true,
    "features": {
      "typeScriptRepair": true,
      "mlPerformance": true,
      "securityAudit": true,
      "performanceOptimization": true,
      "memoryBank": true
    },
    "agents": {
      "enabled": true,
      "autoStart": false,
      "defaultAgent": "typescript-repair"
    },
    "development": {
      "hotReload": true,
      "autoSave": true,
      "debugging": true
    }
  }
}`,
  },
];

export const DEFAULT_SETUP_COMMANDS = [
  "npm install",
  "mkdir -p src/memory-bank",
  "mkdir -p logs",
  "touch .env",
];

/**
 * Validates a workspace directory for required files and setup
 */
export async function validateWorkspace(
  directory: string,
  requiredFiles: RequiredFile[] = DEFAULT_REQUIRED_FILES,
): Promise<WorkspaceValidation> {
  try {
    const validation: WorkspaceValidation = {
      isValid: true,
      missingFiles: [],
      missingDirectories: [],
      setupRequired: false,
      errors: [],
      suggestions: [],
    };

    // Check if directory exists and is accessible
    try {
      await apiService.validateWorkspaceDirectory(directory);
    } catch (error) {
      validation.isValid = false;
      validation.errors.push(`Directory not accessible: ${directory}`);
      validation.suggestions.push(
        "Ensure the directory exists and has proper permissions",
      );
      return validation;
    }

    // Check for required files and directories
    for (const required of requiredFiles) {
      const exists = await checkFileExists(directory, required.path);

      if (!exists && required.required) {
        validation.isValid = false;
        if (required.type === "file") {
          validation.missingFiles.push(required.path);
        } else {
          validation.missingDirectories.push(required.path);
        }
      }
    }

    // Set setup required flag
    validation.setupRequired =
      validation.missingFiles.length > 0 ||
      validation.missingDirectories.length > 0;

    // Add suggestions based on missing items
    if (validation.missingFiles.length > 0) {
      validation.suggestions.push(
        "Run workspace setup to create missing files",
      );
    }
    if (validation.missingDirectories.length > 0) {
      validation.suggestions.push(
        "Create missing directories for proper workspace structure",
      );
    }

    return validation;
  } catch (error) {
    return {
      isValid: false,
      missingFiles: [],
      missingDirectories: [],
      setupRequired: true,
      errors: [
        `Validation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      ],
      suggestions: ["Check directory permissions and try again"],
    };
  }
}

/**
 * Sets up a workspace with required files and directories
 */
export async function setupWorkspace(
  directory: string,
  requiredFiles: RequiredFile[] = DEFAULT_REQUIRED_FILES,
  setupCommands: string[] = DEFAULT_SETUP_COMMANDS,
): Promise<{ success: boolean; message: string; errors: string[] }> {
  const errors: string[] = [];

  try {
    // Create required directories
    for (const required of requiredFiles) {
      if (required.type === "directory") {
        try {
          await apiService.createWorkspaceDirectory(directory, required.path);
        } catch (error) {
          errors.push(
            `Failed to create directory ${required.path}: ${error instanceof Error ? error.message : "Unknown error"}`,
          );
        }
      }
    }

    // Create required files with templates
    for (const required of requiredFiles) {
      if (required.type === "file" && required.template) {
        try {
          const exists = await checkFileExists(directory, required.path);
          if (!exists) {
            await apiService.createWorkspaceFile(
              directory,
              required.path,
              required.template,
            );
          }
        } catch (error) {
          errors.push(
            `Failed to create file ${required.path}: ${error instanceof Error ? error.message : "Unknown error"}`,
          );
        }
      }
    }

    // Run setup commands
    for (const command of setupCommands) {
      try {
        await apiService.executeWorkspaceCommand(directory, command);
      } catch (error) {
        errors.push(
          `Failed to execute command "${command}": ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    }

    const success = errors.length === 0;
    return {
      success,
      message: success
        ? "Workspace setup completed successfully"
        : "Workspace setup completed with some errors",
      errors,
    };
  } catch (error) {
    return {
      success: false,
      message: "Workspace setup failed",
      errors: [
        `Setup failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      ],
    };
  }
}

/**
 * Gets workspace information and status
 */
export async function getWorkspaceInfo(directory: string): Promise<{
  directory: string;
  exists: boolean;
  initialized: boolean;
  files: string[];
  size: number;
  lastModified: Date | null;
}> {
  try {
    const info = await apiService.getWorkspaceInfo(directory);
    return {
      directory,
      exists: true,
      initialized: await checkFileExists(directory, "cursor-ai-config.json"),
      files: info.files || [],
      size: info.size || 0,
      lastModified: info.lastModified ? new Date(info.lastModified) : null,
    };
  } catch (error) {
    return {
      directory,
      exists: false,
      initialized: false,
      files: [],
      size: 0,
      lastModified: null,
    };
  }
}

/**
 * Checks if a file exists in the workspace
 */
async function checkFileExists(
  workspaceDir: string,
  filePath: string,
): Promise<boolean> {
  try {
    await apiService.checkWorkspaceFile(workspaceDir, filePath);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Gets the default workspace directory based on the current environment
 */
export function getDefaultWorkspaceDirectory(): string {
  if (typeof window !== "undefined") {
    // Browser environment - use relative path
    return "./workspace";
  }

  // Node.js environment - use absolute path
  return process.cwd() + "/workspace";
}

/**
 * Validates a workspace directory path
 */
export function validateWorkspacePath(path: string): {
  valid: boolean;
  error?: string;
} {
  if (!path || path.trim() === "") {
    return { valid: false, error: "Workspace directory cannot be empty" };
  }

  if (path.includes("..")) {
    return {
      valid: false,
      error: "Workspace directory cannot contain relative paths",
    };
  }

  if (!/^[a-zA-Z0-9\-_./\\:]+$/.test(path)) {
    return {
      valid: false,
      error: "Workspace directory contains invalid characters",
    };
  }

  return { valid: true };
}

/**
 * Normalizes a workspace directory path
 */
export function normalizeWorkspacePath(path: string): string {
  return path
    .replace(/\\/g, "/") // Convert backslashes to forward slashes
    .replace(/\/+/g, "/") // Remove duplicate slashes
    .replace(/\/$/, ""); // Remove trailing slash
}
