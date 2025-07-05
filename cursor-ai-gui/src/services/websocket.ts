import { useAppStore } from "@/store/useAppStore";
import type {
  SystemMetrics,
  AgentTask,
  LogEntry,
  TypeScriptStats,
} from "@/types";

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private isConnecting = false;

  connect(): void {
    if (
      this.isConnecting ||
      (this.ws && this.ws.readyState === WebSocket.OPEN)
    ) {
      return;
    }

    // Don't try to connect if we've failed too many times
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log(
        "Max WebSocket reconnection attempts reached. Backend may not be available.",
      );
      useAppStore.getState().addLog({
        level: "info",
        source: "WebSocket",
        message:
          "WebSocket connection disabled. Backend not available. Using offline mode.",
      });
      return;
    }

    this.isConnecting = true;
    const wsUrl = (
      import.meta.env.VITE_WS_URL || "ws://localhost:8000"
    ).replace("http", "ws");

    try {
      this.ws = new WebSocket(`${wsUrl}/ws`);

      this.ws.onopen = () => {
        console.log("WebSocket connected");
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        useAppStore.getState().setConnected(true);
        useAppStore.getState().setLastUpdate(new Date());

        // Subscribe to real-time updates
        this.send({
          type: "subscribe",
          channels: [
            "system_metrics",
            "typescript_stats",
            "agent_updates",
            "command_updates",
            "logs",
          ],
        });
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleMessage(data);
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error);
        }
      };

      this.ws.onclose = (event) => {
        console.log("WebSocket disconnected:", event.code, event.reason);
        this.isConnecting = false;
        useAppStore.getState().setConnected(false);

        if (
          !event.wasClean &&
          this.reconnectAttempts < this.maxReconnectAttempts
        ) {
          this.scheduleReconnect();
        }
      };

      this.ws.onerror = (event) => {
        console.error(
          "WebSocket error occurred. This is expected if backend is not running.",
        );
        console.log("WebSocket state:", this.ws?.readyState);
        console.log("WebSocket URL:", wsUrl);
        this.isConnecting = false;
        useAppStore.getState().setConnected(false);

        // Add a user-friendly log entry
        useAppStore.getState().addLog({
          level: "warn",
          source: "WebSocket",
          message:
            "WebSocket connection failed. Backend may not be available. Using fallback data.",
        });
      };
    } catch (error) {
      console.error(
        "Failed to create WebSocket connection:",
        error instanceof Error ? error.message : "Unknown error",
      );
      this.isConnecting = false;

      // Add helpful log entry
      useAppStore.getState().addLog({
        level: "info",
        source: "WebSocket",
        message:
          "WebSocket connection attempt failed. This is normal if backend is not running.",
      });

      this.scheduleReconnect();
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log(
        "Max WebSocket reconnection attempts reached. Switching to offline mode.",
      );
      useAppStore.getState().addLog({
        level: "info",
        source: "WebSocket",
        message: "Switched to offline mode. Backend connection not available.",
      });
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    console.log(
      `Scheduling reconnection attempt ${this.reconnectAttempts} in ${delay}ms`,
    );

    setTimeout(() => {
      this.connect();
    }, delay);
  }

  private handleMessage(data: any): void {
    const store = useAppStore.getState();

    switch (data.type) {
      case "system_metrics":
        if (data.payload) {
          store.setSystemMetrics({
            ...data.payload,
            timestamp: new Date(),
          } as SystemMetrics);
        }
        break;

      case "typescript_stats":
        if (data.payload) {
          store.setTypeScriptStats({
            ...data.payload,
            lastUpdate: new Date(),
          } as TypeScriptStats);
        }
        break;

      case "agent_update":
        if (data.payload) {
          const { agentId, status, task } = data.payload;
          store.updateAgentStatus(agentId, status);

          if (task) {
            if (task.id) {
              store.updateAgentTask(task.id, task);
            } else {
              store.addAgentTask(task);
            }
          }
        }
        break;

      case "command_update":
        if (data.payload) {
          const { commandId, status, output } = data.payload;
          store.updateCommandStatus(commandId, status, output);
        }
        break;

      case "log_entry":
        if (data.payload) {
          store.addLog({
            level: data.payload.level || "info",
            source: data.payload.source || "System",
            message: data.payload.message,
            data: data.payload.data,
          });
        }
        break;

      case "notification":
        if (data.payload) {
          store.addNotification({
            title: data.payload.title,
            message: data.payload.message,
            type: data.payload.type || "info",
          });
        }
        break;

      case "memory_bank_update":
        if (data.payload) {
          store.setMemoryBankStatus({
            ...data.payload,
            lastUpdate: new Date(),
          });
        }
        break;

      case "performance_update":
        if (data.payload) {
          store.setPerformanceMetrics({
            ...data.payload,
            lastUpdate: new Date(),
          });
        }
        break;

      default:
        console.log("Unhandled WebSocket message type:", data.type);
    }

    // Update last update timestamp
    store.setLastUpdate(new Date());
  }

  send(data: any): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close(1000, "Client disconnect");
      this.ws = null;
    }
    useAppStore.getState().setConnected(false);
  }

  // Send command execution request
  executeCommand(command: string, args?: any): void {
    this.send({
      type: "execute_command",
      payload: { command, args },
    });
  }

  // Send agent control request
  controlAgent(agentId: string, action: "start" | "stop" | "restart"): void {
    this.send({
      type: "control_agent",
      payload: { agentId, action },
    });
  }

  // Request specific data updates
  requestUpdate(dataType: string): void {
    this.send({
      type: "request_update",
      payload: { dataType },
    });
  }
}

export const wsService = new WebSocketService();
export default wsService;
