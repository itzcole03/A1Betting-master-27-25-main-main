import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { toast } from "react-hot-toast";

export function useKeyboardShortcuts() {
  const navigate = useNavigate();
  const { setSidebarOpen, sidebarOpen, clearLogs, clearNotifications } =
    useAppStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if user is typing in an input/textarea
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // Ctrl/Cmd + key combinations
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case "b":
            event.preventDefault();
            setSidebarOpen(!sidebarOpen);
            toast.info(`Sidebar ${!sidebarOpen ? "opened" : "closed"}`);
            break;
          case "k":
            event.preventDefault();
            // Focus search in header
            const searchInput = document.querySelector(
              'input[placeholder*="Search"]',
            ) as HTMLInputElement;
            if (searchInput) {
              searchInput.focus();
              toast.info("Search focused");
            }
            break;
          case "1":
            event.preventDefault();
            navigate("/dashboard");
            toast.info("Dashboard opened");
            break;
          case "2":
            event.preventDefault();
            navigate("/commands");
            toast.info("Commands opened");
            break;
          case "3":
            event.preventDefault();
            navigate("/agents");
            toast.info("Agents opened");
            break;
          case "4":
            event.preventDefault();
            navigate("/memory-bank");
            toast.info("Memory Bank opened");
            break;
          case "5":
            event.preventDefault();
            navigate("/typescript-repair");
            toast.info("TypeScript Repair opened");
            break;
          case "6":
            event.preventDefault();
            navigate("/performance");
            toast.info("Performance opened");
            break;
          case "7":
            event.preventDefault();
            navigate("/analytics");
            toast.info("Analytics opened");
            break;
          case "8":
            event.preventDefault();
            navigate("/logs");
            toast.info("Logs opened");
            break;
          case "9":
            event.preventDefault();
            navigate("/settings");
            toast.info("Settings opened");
            break;
        }
      }

      // Alt + key combinations
      if (event.altKey) {
        switch (event.key) {
          case "c":
            event.preventDefault();
            clearLogs();
            toast.success("Logs cleared");
            break;
          case "n":
            event.preventDefault();
            clearNotifications();
            toast.success("Notifications cleared");
            break;
        }
      }

      // Single key shortcuts (when not typing)
      switch (event.key) {
        case "?":
          event.preventDefault();
          showKeyboardShortcuts();
          break;
        case "Escape":
          // Close any open dropdowns/modals
          const notifications = document.querySelector(
            "[data-notifications-dropdown]",
          );
          if (notifications) {
            // Trigger click outside to close
            document.dispatchEvent(
              new MouseEvent("mousedown", { bubbles: true }),
            );
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [navigate, setSidebarOpen, sidebarOpen, clearLogs, clearNotifications]);
}

function showKeyboardShortcuts() {
  const shortcuts = [
    { keys: "Ctrl/Cmd + B", action: "Toggle Sidebar" },
    { keys: "Ctrl/Cmd + K", action: "Focus Search" },
    { keys: "Ctrl/Cmd + 1-9", action: "Navigate to Pages" },
    { keys: "Alt + C", action: "Clear Logs" },
    { keys: "Alt + N", action: "Clear Notifications" },
    { keys: "?", action: "Show Shortcuts" },
    { keys: "Esc", action: "Close Dropdowns" },
  ];

  const shortcutsText = shortcuts
    .map((s) => `${s.keys}: ${s.action}`)
    .join("\n");

  toast.success(`Keyboard Shortcuts:\n${shortcutsText}`, {
    duration: 8000,
    style: {
      whiteSpace: "pre-line",
      maxWidth: "400px",
    },
  });
}
