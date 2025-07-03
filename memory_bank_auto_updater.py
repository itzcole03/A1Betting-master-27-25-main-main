#!/usr/bin/env python3
"""
A1Betting Memory Bank Auto-Updater
Version: 1.0.0
Purpose: Intelligent automatic memory bank updates during Cursor AI operations
"""

import time
import threading
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, List, Optional, Any

class MemoryBankAutoUpdater:
    def __init__(self, memory_bank_path: Optional[Path] = None):
        self.root_path = Path.cwd()
        self.memory_bank_path = memory_bank_path or self.root_path / "memory-bank"
        self.chat_archives_path = self.memory_bank_path / "chat-archives"
        self.monitoring = False
        self.update_thread = None
        self.last_update = datetime.now()
        self.update_queue: List[Dict[str, Any]] = []
        
        # Ensure directories exist
        self.memory_bank_path.mkdir(exist_ok=True)
        self.chat_archives_path.mkdir(exist_ok=True)
        (self.chat_archives_path / "by-date").mkdir(exist_ok=True)
        (self.chat_archives_path / "by-topic").mkdir(exist_ok=True)
        
    def start_monitoring(self) -> None:
        """Start automatic memory bank monitoring"""
        if not self.monitoring:
            self.monitoring = True
            self.update_thread = threading.Thread(target=self._monitor_loop, daemon=True)
            self.update_thread.start()
            print("🧠 Memory Bank Auto-Updater started")
    
    def stop_monitoring(self) -> None:
        """Stop automatic memory bank monitoring"""
        self.monitoring = False
        if self.update_thread:
            self.update_thread.join(timeout=5)
        print("🧠 Memory Bank Auto-Updater stopped")
    
    def _monitor_loop(self) -> None:
        """Main monitoring loop"""
        while self.monitoring:
            try:
                self._process_update_queue()
                time.sleep(30)  # Check every 30 seconds
            except Exception as e:
                print(f"⚠️  Memory monitoring error: {e}")
                time.sleep(60)  # Wait longer on error
    
    def _process_update_queue(self) -> None:
        """Process queued memory updates"""
        if not self.update_queue:
            return
            
        # Process all queued updates
        updates_to_process = self.update_queue.copy()
        self.update_queue.clear()
        
        for update in updates_to_process:
            try:
                self._apply_memory_update(update)
            except Exception as e:
                print(f"⚠️  Failed to apply memory update: {e}")
    
    def _apply_memory_update(self, update: Dict[str, Any]) -> None:
        """Apply a single memory update"""
        update_type = update.get("type", "general")
        timestamp = update.get("timestamp", datetime.now())
        content = update.get("content", "")
        context = update.get("context", "")
        
        if update_type == "command_usage":
            self._update_command_usage(update)
        elif update_type == "ai_interaction":
            self._update_ai_interaction(update)
        elif update_type == "code_change":
            self._update_code_change(update)
        elif update_type == "progress":
            self._update_progress(update)
        elif update_type == "context":
            self._update_active_context(update)
    
    def log_command_usage(self, command: str, description: str = "", success: bool = True) -> None:
        """Log command usage for memory tracking"""
        update = {
            "type": "command_usage",
            "timestamp": datetime.now(),
            "command": command,
            "description": description,
            "success": success,
            "session_id": self._get_session_id()
        }
        self.update_queue.append(update)
    
    def log_ai_interaction(self, interaction_type: str, content: str, context: str = "") -> None:
        """Log AI interaction for memory tracking"""
        update = {
            "type": "ai_interaction",
            "timestamp": datetime.now(),
            "interaction_type": interaction_type,
            "content": content,
            "context": context,
            "session_id": self._get_session_id()
        }
        self.update_queue.append(update)
    
    def log_code_change(self, file_path: str, change_type: str, description: str = "") -> None:
        """Log code changes for memory tracking"""
        update = {
            "type": "code_change",
            "timestamp": datetime.now(),
            "file_path": file_path,
            "change_type": change_type,
            "description": description,
            "session_id": self._get_session_id()
        }
        self.update_queue.append(update)
    
    def log_progress(self, milestone: str, details: str = "", completion: float = 0.0) -> None:
        """Log progress for memory tracking"""
        update = {
            "type": "progress",
            "timestamp": datetime.now(),
            "milestone": milestone,
            "details": details,
            "completion": completion,
            "session_id": self._get_session_id()
        }
        self.update_queue.append(update)
    
    def update_active_context(self, focus: str, priority: str = "medium", notes: str = "") -> None:
        """Update active context for memory tracking"""
        update = {
            "type": "context",
            "timestamp": datetime.now(),
            "focus": focus,
            "priority": priority,
            "notes": notes,
            "session_id": self._get_session_id()
        }
        self.update_queue.append(update)
    
    def _update_command_usage(self, update: Dict[str, Any]) -> None:
        """Update command usage in memory bank"""
        timestamp = update["timestamp"].strftime("%Y-%m-%d %H:%M:%S")
        command = update["command"]
        description = update.get("description", "")
        success = update.get("success", True)
        
        # Update activeContext.md
        active_context_file = self.memory_bank_path / "activeContext.md"
        entry = f"\n## Command Usage - {timestamp}\n"
        entry += f"- **Command**: `{command}`\n"
        entry += f"- **Description**: {description}\n"
        entry += f"- **Status**: {'✅ Success' if success else '❌ Failed'}\n"
        entry += f"- **Auto-logged**: Yes\n"
        
        self._append_to_file(active_context_file, entry)
        
        # Archive in chat history
        date_str = update["timestamp"].strftime("%Y-%m-%d")
        archive_file = self.chat_archives_path / "by-date" / f"{date_str}.md"
        self._append_to_file(archive_file, entry)
    
    def _update_ai_interaction(self, update: Dict[str, Any]) -> None:
        """Update AI interaction in memory bank"""
        timestamp = update["timestamp"].strftime("%Y-%m-%d %H:%M:%S")
        interaction_type = update["interaction_type"]
        content = update["content"]
        context = update.get("context", "")
        
        # Categorize by topic
        topic = self._categorize_interaction(content, context)
        topic_file = self.chat_archives_path / "by-topic" / f"{topic}.md"
        
        entry = f"\n## AI Interaction - {timestamp}\n"
        entry += f"- **Type**: {interaction_type}\n"
        entry += f"- **Content**: {content[:200]}{'...' if len(content) > 200 else ''}\n"
        entry += f"- **Context**: {context}\n"
        entry += f"- **Auto-categorized**: {topic}\n"
        
        self._append_to_file(topic_file, entry)
    
    def _update_code_change(self, update: Dict[str, Any]) -> None:
        """Update code changes in memory bank"""
        timestamp = update["timestamp"].strftime("%Y-%m-%d %H:%M:%S")
        file_path = update["file_path"]
        change_type = update["change_type"]
        description = update.get("description", "")
        
        # Update progress.md
        progress_file = self.memory_bank_path / "progress.md"
        entry = f"\n### Code Change - {timestamp}\n"
        entry += f"- **File**: `{file_path}`\n"
        entry += f"- **Type**: {change_type}\n"
        entry += f"- **Description**: {description}\n"
        entry += f"- **Auto-tracked**: Yes\n"
        
        self._append_to_file(progress_file, entry)
    
    def _update_progress(self, update: Dict[str, Any]) -> None:
        """Update progress in memory bank"""
        timestamp = update["timestamp"].strftime("%Y-%m-%d %H:%M:%S")
        milestone = update["milestone"]
        details = update.get("details", "")
        completion = update.get("completion", 0.0)
        
        # Update progress.md
        progress_file = self.memory_bank_path / "progress.md"
        entry = f"\n### Progress Update - {timestamp}\n"
        entry += f"- **Milestone**: {milestone}\n"
        entry += f"- **Completion**: {completion:.1%}\n"
        entry += f"- **Details**: {details}\n"
        entry += f"- **Auto-tracked**: Yes\n"
        
        self._append_to_file(progress_file, entry)
    
    def _update_active_context(self, update: Dict[str, Any]) -> None:
        """Update active context in memory bank"""
        timestamp = update["timestamp"].strftime("%Y-%m-%d %H:%M:%S")
        focus = update["focus"]
        priority = update.get("priority", "medium")
        notes = update.get("notes", "")
        
        # Update activeContext.md
        active_context_file = self.memory_bank_path / "activeContext.md"
        entry = f"\n## Context Update - {timestamp}\n"
        entry += f"- **Focus**: {focus}\n"
        entry += f"- **Priority**: {priority}\n"
        entry += f"- **Notes**: {notes}\n"
        entry += f"- **Auto-updated**: Yes\n"
        
        self._append_to_file(active_context_file, entry)
    
    def _categorize_interaction(self, content: str, context: str) -> str:
        """Categorize AI interaction by topic"""
        content_lower = (content + " " + context).lower()
        
        # A1Betting specific categories
        if any(term in content_lower for term in ["typescript", "error", "fix", "compile"]):
            return "typescript-repair"
        elif any(term in content_lower for term in ["ml", "model", "accuracy", "prediction"]):
            return "ml-models"
        elif any(term in content_lower for term in ["security", "auth", "betting", "financial"]):
            return "security-compliance"
        elif any(term in content_lower for term in ["performance", "optimization", "build"]):
            return "performance"
        elif any(term in content_lower for term in ["frontend", "react", "component", "ui"]):
            return "frontend"
        elif any(term in content_lower for term in ["backend", "api", "fastapi", "server"]):
            return "backend"
        elif any(term in content_lower for term in ["database", "sqlite", "query", "data"]):
            return "database"
        elif any(term in content_lower for term in ["test", "testing", "coverage", "qa"]):
            return "testing"
        elif any(term in content_lower for term in ["deploy", "production", "release"]):
            return "deployment"
        else:
            return "general"
    
    def _append_to_file(self, file_path: Path, content: str) -> None:
        """Safely append content to a file"""
        try:
            # Create file if it doesn't exist
            if not file_path.exists():
                file_path.parent.mkdir(parents=True, exist_ok=True)
                file_path.write_text(f"# {file_path.stem.title()}\n\nAuto-generated memory bank file.\n")
            
            with open(file_path, 'a', encoding='utf-8') as f:
                f.write(content)
        except Exception as e:
            print(f"⚠️  Failed to write to {file_path}: {e}")
    
    def _get_session_id(self) -> str:
        """Generate a session ID for tracking"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        return f"session_{timestamp}"
    
    def get_memory_status(self) -> Dict[str, Any]:
        """Get current memory bank status"""
        status = {
            "monitoring": self.monitoring,
            "last_update": self.last_update.isoformat(),
            "queue_size": len(self.update_queue),
            "memory_files": 0,
            "chat_archives": 0,
            "recent_activity": []
        }
        
        # Count memory files
        if self.memory_bank_path.exists():
            status["memory_files"] = len(list(self.memory_bank_path.glob("*.md")))
        
        # Count chat archives
        if self.chat_archives_path.exists():
            status["chat_archives"] = len(list(self.chat_archives_path.rglob("*.md")))
        
        # Get recent activity (last 24 hours)
        cutoff = datetime.now() - timedelta(hours=24)
        for update in self.update_queue:
            if update.get("timestamp", datetime.min) > cutoff:
                status["recent_activity"].append({
                    "type": update.get("type", "unknown"),
                    "timestamp": update.get("timestamp", datetime.now()).isoformat(),
                    "description": update.get("description", "")[:100]
                })
        
        return status

# Global instance for easy access
auto_updater = MemoryBankAutoUpdater()

def start_auto_updater() -> None:
    """Start the global auto updater"""
    auto_updater.start_monitoring()

def stop_auto_updater() -> None:
    """Stop the global auto updater"""
    auto_updater.stop_monitoring()

def log_command(command: str, description: str = "", success: bool = True) -> None:
    """Convenient function to log command usage"""
    auto_updater.log_command_usage(command, description, success)

def log_ai_action(action_type: str, content: str, context: str = "") -> None:
    """Convenient function to log AI actions"""
    auto_updater.log_ai_interaction(action_type, content, context)

def log_progress(milestone: str, details: str = "", completion: float = 0.0) -> None:
    """Convenient function to log progress"""
    auto_updater.log_progress(milestone, details, completion)

def update_context(focus: str, priority: str = "medium", notes: str = "") -> None:
    """Convenient function to update context"""
    auto_updater.update_active_context(focus, priority, notes)

if __name__ == "__main__":
    # Test the auto updater
    print("🧠 Testing Memory Bank Auto-Updater...")
    
    start_auto_updater()
    
    # Test logging
    log_command("plan", "Testing command logging", True)
    log_ai_action("code_generation", "Generated test code", "Testing memory system")
    log_progress("Memory System Setup", "Auto-updater implemented", 0.8)
    update_context("Memory Bank Testing", "high", "Implementing auto-update system")
    
    # Show status
    status = auto_updater.get_memory_status()
    print(f"📊 Memory Status: {status}")
    
    print("✅ Memory Bank Auto-Updater test complete!")
    
    # Keep running for a bit to test monitoring
    time.sleep(5)
    stop_auto_updater() 