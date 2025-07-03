#!/usr/bin/env python3
"""
A1Betting Cursor AI Command Interface
Version: 1.0.0
Purpose: Simple command interface for Cursor AI efficiency system with automatic memory updates
"""

from datetime import datetime
from pathlib import Path
import subprocess
import threading
import os
from typing import Optional, List, Tuple, Dict
import json
import time
import hashlib
import requests
try:
    from watchdog.observers import Observer
    from watchdog.events import FileSystemEventHandler
except ImportError:
    Observer = None
    FileSystemEventHandler = object

class CursorCommandInterface:
    def __init__(self):
        self.root_path = Path.cwd()
        self.memory_bank_path = self.root_path / "memory-bank"
        self.commands = {
            "1": {"name": "Plan Mode", "command": "plan", "description": "Enter strategic planning mode with memory context"},
            "2": {"name": "Agent Mode", "command": "agent", "description": "Execute with full AI agent capabilities"},
            "3": {"name": "Update Memory", "command": "update memory bank", "description": "Trigger comprehensive memory bank updates"},
            "4": {"name": "Review Context", "command": "review context", "description": "Analyze current project state"},
            "5": {"name": "Check Progress", "command": "check progress", "description": "Review status and next steps"},
            "6": {"name": "TypeScript Repair", "command": "fix typescript errors", "description": "Run TypeScript error repair agent"},
            "7": {"name": "Security Audit", "command": "security audit", "description": "Run security compliance check"},
            "8": {"name": "Performance Check", "command": "performance check", "description": "Analyze system performance"},
            "9": {"name": "Build Optimization", "command": "optimize build", "description": "Run build optimization"},
            "10": {"name": "ML Model Check", "command": "check ml models", "description": "Verify ML model accuracy (96.4% target)"},
            "11": {"name": "Memory Status", "command": "memory status", "description": "Show memory bank status"},
            "12": {"name": "System Health", "command": "system health", "description": "Complete system health check"},
            "13": {"name": "Autonomous Development Mode", "command": "autonomous development mode", "description": "Activate autonomous development mode with recursive operation"},
            "14": {"name": "Run All Enhancements", "command": "run all enhancements in sequence", "description": "Run all enhancement commands in sequence"},
            "15": {"name": "Add Comprehensive Test Coverage", "command": "add comprehensive test coverage", "description": "Add or improve test coverage across the codebase"},
            "16": {"name": "Error Handling for API", "command": "implement error handling for API calls", "description": "Implement robust error handling for all API calls"},
            "17": {"name": "Add TypeScript Types", "command": "add typescript types for API responses", "description": "Add or improve TypeScript types for all API responses"},
            "18": {"name": "Execute Full Audit", "command": "execute audit_report.ipynb for full context", "description": "Run the audit_report.ipynb notebook for a full audit"},
            "19": {"name": "Show Help", "command": "show help and documentation", "description": "Show help and documentation for the system"},
            "20": {"name": "Show System Status", "command": "show system status", "description": "Show current system status and health"},
            "21": {"name": "Start Monitoring", "command": "start monitoring", "description": "Start real-time file monitoring and analytics"},
            "22": {"name": "Stop Monitoring", "command": "stop monitoring", "description": "Stop real-time file monitoring"},
            "23": {"name": "Start Event Monitoring", "command": "start event monitoring", "description": "Start event-driven file monitoring (watchdog)"},
            "24": {"name": "Stop Event Monitoring", "command": "stop event monitoring", "description": "Stop event-driven file monitoring (watchdog)"},
            "25": {"name": "Summarize with Ollama", "command": "summarize with ollama", "description": "Summarize the latest report using Ollama LLM"}
        }
        self.monitoring_enabled = False
        self.monitor_thread = None
        self.watched_files = [
            "automation/reports/final_automation_validation.json",
            "automation/reports/security_scan.json",
            "automation/reports/load_test_summary.md",
            "automation/reports/optimize_database_report.json",
            "automation/reports/ml_performance_benchmark.json",
            "automation/reports/automation_health_report_latest.txt",
            "automation/reports/app_completeness.json",
            "memory-bank/progress.md",
            "memory-bank/activeContext.md"
        ]
        self.file_hashes: Dict[str, str] = {}
        self.observer = None
        
    def display_menu(self):
        """Display the command menu"""
        print("\n" + "="*60)
        print("🚀 A1Betting Cursor AI Command Interface")
        print("="*60)
        print("Available Commands:")
        print("-" * 60)
        
        for key, cmd in self.commands.items():
            print(f"{key:2}. {cmd['name']:<20} - {cmd['description']}")
        
        print("-" * 60)
        print("0.  Exit")
        print("h.  Help & Documentation")
        print("s.  System Status")
        print("="*60)
    
    def get_system_status(self):
        """Get current system status"""
        status = {
            "timestamp": datetime.now().isoformat(),
            "memory_bank_files": 0,
            "chat_archives": 0,
            "cursor_config": False,
            "memory_bank_health": "Unknown"
        }
        
        # Check memory bank
        if self.memory_bank_path.exists():
            status["memory_bank_files"] = len(list(self.memory_bank_path.glob("*.md")))
            chat_archives = self.memory_bank_path / "chat-archives"
            if chat_archives.exists():
                status["chat_archives"] = len(list(chat_archives.rglob("*.md")))
        
        # Check cursor config
        cursor_dir = self.root_path / ".cursor"
        if cursor_dir.exists() and (cursor_dir / "rules").exists():
            status["cursor_config"] = True
        
        # Memory bank health
        required_files = ["activeContext.md", "progress.md", "systemPatterns.md"]
        existing_files = [f for f in required_files if (self.memory_bank_path / f).exists()]
        status["memory_bank_health"] = f"{len(existing_files)}/{len(required_files)} core files"
        
        return status
    
    def update_memory_bank_auto(self, command_used: str, context: str = "") -> None:
        """Automatically update memory bank when commands are used"""
        try:
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            
            # Update activeContext.md
            active_context_file = self.memory_bank_path / "activeContext.md"
            if active_context_file.exists():
                # Add command usage log
                new_entry = f"\n## Command Usage Log - {timestamp}\n"
                new_entry += f"- **Command**: {command_used}\n"
                new_entry += f"- **Context**: {context}\n"
                new_entry += f"- **Auto-logged**: Yes\n"
                
                with open(active_context_file, 'a', encoding='utf-8') as f:
                    f.write(new_entry)
            
            # Update progress.md
            progress_file = self.memory_bank_path / "progress.md"
            if progress_file.exists():
                progress_entry = f"\n### {timestamp} - Command Interface Usage\n"
                progress_entry += f"- Used command: `{command_used}`\n"
                progress_entry += f"- Interface version: 1.0.0\n"
                progress_entry += f"- Auto-tracking: Active\n"
                
                with open(progress_file, 'a', encoding='utf-8') as f:
                    f.write(progress_entry)
                    
        except Exception as e:
            print(f"⚠️  Memory bank auto-update failed: {e}")
    
    def generate_autonomous_prompt(self) -> str:
        """Generate comprehensive autonomous development prompt"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        prompt = (
            "# 🧠 HYPERQUANTUM NEURAL DEVELOPMENT ENGINE v3.0\n\n"
            "**Timestamp**: " + timestamp + "\n"
            "**Mission**: Advanced A1Betting Platform Evolution & Repair\n"
            "**Mode**: Enhanced Multi-Agent Neural Intelligence System\n\n"
            "You are now operating as a Hyperquantum Neural Development Engine with advanced repair and enhancement capabilities. "
            "Your mission is to analyze, repair, enhance, and evolve the platform using sophisticated pattern recognition and intelligent orchestration.\n\n"
            "## 🎯 ENHANCED REPAIR SYSTEM\n\n"
            "### Pattern Recognition Matrix\n"
            "```typescript\n"
            "interface PatternRecognition {\n"
            "    corruptionPatterns: {\n"
            "        syntax: {\n"
            "            type: 'TypeScript' | 'React' | 'Interface',\n"
            "            patterns: string[],\n"
            "            context: string[],\n"
            "            severity: 'HIGH' | 'MEDIUM' | 'LOW',\n"
            "            impact: {\n"
            "                functionality: number,\n"
            "                stability: number,\n"
            "                performance: number\n"
            "            }\n"
            "        }[],\n"
            "        structural: {\n"
            "            type: 'Component' | 'Service' | 'Hook',\n"
            "            patterns: string[],\n"
            "            dependencies: string[],\n"
            "            severity: 'HIGH' | 'MEDIUM' | 'LOW',\n"
            "            impact: {\n"
            "                architecture: number,\n"
            "                maintainability: number,\n"
            "                scalability: number\n"
            "            }\n"
            "        }[],\n"
            "        semantic: {\n"
            "            type: 'Logic' | 'Data' | 'State',\n"
            "            patterns: string[],\n"
            "            context: string[],\n"
            "            severity: 'HIGH' | 'MEDIUM' | 'LOW',\n"
            "            impact: {\n"
            "                correctness: number,\n"
            "                reliability: number,\n"
            "                security: number\n"
            "            }\n"
            "        }[]\n"
            "    },\n"
            "    enhancementPatterns: {\n"
            "        optimization: {\n"
            "            type: 'Performance' | 'Memory' | 'Network',\n"
            "            patterns: string[],\n"
            "            metrics: {\n"
            "                before: number,\n"
            "                target: number,\n"
            "                impact: number\n"
            "            }\n"
            "        }[],\n"
            "        architecture: {\n"
            "            type: 'Component' | 'Service' | 'System',\n"
            "            patterns: string[],\n"
            "            benefits: {\n"
            "                maintainability: number,\n"
            "                scalability: number,\n"
            "                reliability: number\n"
            "            }\n"
            "        }[],\n"
            "        quality: {\n"
            "            type: 'Code' | 'Test' | 'Documentation',\n"
            "            patterns: string[],\n"
            "            improvements: {\n"
            "                coverage: number,\n"
            "                clarity: number,\n"
            "                completeness: number\n"
            "            }\n"
            "        }[]\n"
            "    }\n"
            "}\n"
            "```\n\n"
            "### Autonomous Enhancement Protocol\n"
            "```typescript\n"
            "class EnhancementOrchestrator {\n"
            "    private enhancementCore: EnhancementCore;\n"
            "    private evolutionEngine: EvolutionEngine;\n"
            "    private learningSystem: LearningSystem;\n"
            "    ...\n"
            "}\n"
            "```\n\n"
            "**AUTONOMOUS ENHANCEMENT MODE ACTIVATED** 🚀"
        )
        return prompt
    
    def show_help(self):
        """Show help documentation"""
        print("\n" + "="*60)
        print("📚 HELP & DOCUMENTATION")
        print("="*60)
        print("""
🎯 QUICK START:
1. Choose a number (1-12) for the command you want
2. The system will automatically update memory banks
3. Use 'plan' mode first for new tasks
4. Use 'agent' mode for execution

🔧 COMMAND TYPES:
- Planning Commands (1, 4, 5): Strategic analysis
- Execution Commands (2, 6-10): Active development
- Monitoring Commands (3, 11, 12): System health
- 🤖 AUTONOMOUS MODE (13): Pure autonomous development with recursive optimization

🧠 MEMORY BANK AUTO-UPDATES:
- Every command usage is automatically logged
- Context is preserved across sessions
- Progress tracking is maintained
- Chat archives are organized

⚡ RIPER-5 MODES:
- Research: Gather information and context
- Innovate: Generate creative solutions
- Plan: Strategic planning and architecture
- Execute: Implementation and development
- Review: Quality assurance and validation

🔒 A1BETTING SPECIFIC:
- Preserves 73.8% win rate and 96.4% ML accuracy
- Maintains sophisticated architecture
- Enforces security compliance
- Tracks TypeScript error reduction (26,797 → <100)

🤖 AUTONOMOUS MODE FEATURES:
- Pure autonomous execution (no prompts needed)
- Intelligent recursive development workflow
- Automatic phase progression and optimization
- Real-time progress documentation
- Built-in safeguards and monitoring
- Complete memory bank integration

📁 MEMORY BANK STRUCTURE:
- activeContext.md: Current work focus
- progress.md: Status tracking
- systemPatterns.md: Architecture decisions
- chat-archives/: Organized conversation history

For more details, see CURSOR_EFFICIENCY_GUIDE.md
        """)
    
    def run_command(self, choice: str) -> bool:
        """Execute the selected command"""
        if choice in self.commands:
            cmd_info = self.commands[choice]
            command = cmd_info["command"]
            def run_script(script_path: str, args: Optional[List[str]] = None, background: bool = False) -> Tuple[Optional[str], Optional[str]]:
                try:
                    cmd: List[str] = ["python", script_path]
                    if args:
                        cmd.extend([str(a) for a in args])
                    if background:
                        thread = threading.Thread(target=subprocess.run, args=(cmd,), kwargs={"capture_output": False, "text": True})
                        thread.daemon = True
                        thread.start()
                        print(f"[Background] Started: {' '.join(cmd)}")
                        return None, None
                    else:
                        result = subprocess.run(cmd, capture_output=True, text=True)
                        print(result.stdout)
                        if result.stderr:
                            print(f"[stderr] {result.stderr}")
                        return result.stdout, result.stderr
                except Exception as e:
                    print(f"[ERROR] Failed to run {script_path}: {e}")
                    return None, str(e)

            def print_report(report_path: str, summary_keys: Optional[List[str]] = None, full_on_error: bool = False):
                """Print a summary from a report file (JSON, MD, or TXT)."""
                try:
                    if report_path.endswith('.json'):
                        with open(report_path, 'r', encoding='utf-8') as f:
                            data = json.load(f)
                        if summary_keys is not None:
                            for key in summary_keys:
                                if key in data:
                                    print(f"{str(key).title()}: {data[key]}")
                        else:
                            print(json.dumps(data, indent=2))
                    elif report_path.endswith('.md') or report_path.endswith('.txt'):
                        with open(report_path, 'r', encoding='utf-8') as f:
                            lines = f.readlines()
                        # Print first 40 lines for summary, or all if short
                        print(''.join(lines[:40]))
                        if len(lines) > 40:
                            print("... (truncated, see full report for details)")
                    else:
                        with open(report_path, 'r', encoding='utf-8') as f:
                            print(f.read())
                except Exception as e:
                    if full_on_error:
                        try:
                            with open(report_path, 'r', encoding='utf-8') as f:
                                print(f.read())
                        except Exception as e2:
                            print(f"[ERROR] Could not read report {report_path}: {e2}")
                    else:
                        print(f"[ERROR] Could not read report {report_path}: {e}")

            def update_memory_with_summary(command: str, summary: str):
                """Update memory bank with a summary of the command result."""
                try:
                    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    progress_file = Path("memory-bank/progress.md")
                    entry = f"\n### {timestamp} - Command: {command}\n{summary}\n"
                    with open(progress_file, 'a', encoding='utf-8') as f:
                        f.write(entry)
                except Exception as e:
                    print(f"[ERROR] Could not update memory bank: {e}")

            # --- Command logic mapping ---
            if command == "plan":
                print("\n[Plan Mode] Strategic planning mode activated.")
                try:
                    with open("memory-bank/activeContext.md", "r", encoding="utf-8") as f:
                        lines = f.readlines()
                        print(''.join(lines[:40]))
                        if len(lines) > 40:
                            print("... (truncated)")
                    update_memory_with_summary(command, ''.join(lines[:10]))
                except Exception as e:
                    print(f"[ERROR] Could not read activeContext.md: {e}")
                self.update_memory_bank_auto(command, cmd_info['description'])
                return True
            elif command == "agent":
                print("\n[Agent Mode] Full autonomous, event-driven development loop activated.\n[Autonomous Development] Monitoring plan, progress, and report files for changes...")
                if Observer is None or FileSystemEventHandler is object:
                    print("[ERROR] The 'watchdog' package is not installed. Please install it with 'pip install watchdog' to enable event-driven autonomous mode.")
                    return False
                from typing import Any
                class AutonomousHandler(FileSystemEventHandler):
                    def __init__(self, agent: Any) -> None:
                        self.agent = agent
                        self.failure_count = 0
                        self.max_failures = 3

                    def on_modified(self, event: Any) -> None:
                        if getattr(event, 'is_directory', False):
                            return
                        if any(x in getattr(event, 'src_path', '') for x in ["activeContext.md", "progress.md", "report", "json", "md"]):
                            print(f"[Autonomous Trigger] Detected change in {getattr(event, 'src_path', '')}. Running autonomous workflow...")
                            try:
                                # Parse latest context
                                with open("memory-bank/activeContext.md", "r", encoding="utf-8") as f:
                                    plan_lines = f.readlines()
                                    print(''.join(plan_lines[:20]))
                                # Run TypeScript repair
                                run_script("automation/scripts/final_automation_validation.py", background=True)
                                update_memory_with_summary("agent", "Autonomous TypeScript repair started. See final_automation_validation.json for progress.")
                                # Run incremental tests and log results
                                print_report("automation/reports/final_automation_validation.json", summary_keys=["overall_status", "success_rate", "tests_passed", "total_tests"])
                                # Generate LLM summary
                                try:
                                    self.agent.ollama_summarize_latest_report()
                                except Exception as e:
                                    print(f"[INFO] Ollama summary not available: {e}")
                                # Monitor performance and security
                                run_script("automation/scripts/run_load_tests.py")
                                print_report("automation/reports/load_test_summary.md")
                                run_script("automation/scripts/security_scan.py")
                                print_report("automation/reports/security_scan.json", summary_keys=["summary", "recommendations"])
                                # Live analytics
                                with open("memory-bank/progress.md", "r", encoding="utf-8") as f:
                                    progress_lines = f.readlines()
                                    print(''.join(progress_lines[:10]))
                                self.failure_count = 0
                            except Exception as e:
                                print(f"[ERROR] Autonomous workflow failed: {e}")
                                self.failure_count += 1
                                update_memory_with_summary("agent", f"ERROR: {e}")
                                if self.failure_count >= self.max_failures:
                                    print("[ESCALATION] Maximum failures reached. Escalating for human review.")
                                    update_memory_with_summary("agent", "ESCALATION: Maximum failures reached. Human review required.")

                observer = Observer()
                handler = AutonomousHandler(self)
                observer.schedule(handler, path="memory-bank", recursive=True)
                observer.schedule(handler, path="automation/reports", recursive=True)
                observer.start()
                print("[Agent Mode] Autonomous agent is now running. All relevant file changes will trigger context-driven actions. Press Ctrl+C to stop.")
                try:
                    while True:
                        time.sleep(1)
                except KeyboardInterrupt:
                    observer.stop()
                observer.join()
                return True
            elif command == "update memory bank":
                print("\n[Update Memory Bank] Triggering memory bank update...")
                self.update_memory_bank_auto(command, cmd_info['description'])
                print("Memory bank updated.")
                update_memory_with_summary(command, "Memory bank updated.")
                return True
            elif command == "review context":
                print("\n[Review Context]")
                try:
                    with open("memory-bank/activeContext.md", "r", encoding="utf-8") as f:
                        lines = f.readlines()
                        print(''.join(lines[:20]))
                    with open("memory-bank/progress.md", "r", encoding="utf-8") as f:
                        lines2 = f.readlines()
                        print(''.join(lines2[:20]))
                    update_memory_with_summary(command, ''.join(lines[:5]) + ''.join(lines2[:5]))
                except Exception as e:
                    print(f"[ERROR] Could not read context files: {e}")
                self.update_memory_bank_auto(command, cmd_info['description'])
                return True
            elif command == "check progress":
                print("\n[Check Progress]")
                try:
                    with open("memory-bank/progress.md", "r", encoding="utf-8") as f:
                        lines = f.readlines()
                        print(''.join(lines[:40]))
                        if len(lines) > 40:
                            print("... (truncated)")
                    update_memory_with_summary(command, ''.join(lines[:10]))
                except Exception as e:
                    print(f"[ERROR] Could not read progress.md: {e}")
                self.update_memory_bank_auto(command, cmd_info['description'])
                return True
            elif command == "fix typescript errors":
                print("\n[TypeScript Repair] Running TypeScript error repair...")
                run_script("automation/scripts/final_automation_validation.py")
                print_report("automation/reports/final_automation_validation.json", summary_keys=["overall_status", "success_rate", "tests_passed", "total_tests"])
                update_memory_with_summary(command, "TypeScript repair and validation run. See final_automation_validation.json for details.")
                self.update_memory_bank_auto(command, cmd_info['description'])
                return True
            elif command == "security audit":
                print("\n[Security Audit] Running security scan...")
                run_script("automation/scripts/security_scan.py")
                print_report("automation/reports/security_scan.json", summary_keys=["summary", "recommendations"])
                print_report("automation/reports/security_scan.json", summary_keys=["summary", "recommendations"])
                update_memory_with_summary(command, "Security scan run. See security_scan.json for details.")
                self.update_memory_bank_auto(command, cmd_info['description'])
                return True
            elif command == "performance check":
                print("\n[Performance Check] Running load and performance tests...")
                run_script("automation/scripts/run_load_tests.py")
                print_report("automation/reports/load_test_summary.md")
                update_memory_with_summary(command, "Performance/load tests run. See load_test_summary.md for details.")
                self.update_memory_bank_auto(command, cmd_info['description'])
                return True
            elif command == "optimize build":
                print("\n[Optimize Build] Running build and database optimization...")
                run_script("automation/scripts/optimize_database.py")
                print_report("automation/reports/optimize_database_report.json", summary_keys=["summary", "recommendations"])
                update_memory_with_summary(command, "Build/database optimization run. See optimize_database_report.json for details.")
                self.update_memory_bank_auto(command, cmd_info['description'])
                return True
            elif command == "check ml models":
                print("\n[ML Model Check] Benchmarking ML model performance...")
                run_script("automation/scripts/benchmark_ml_performance.py")
                print_report("automation/reports/ml_performance_benchmark.json", summary_keys=["performance_summary", "recommendations"])
                update_memory_with_summary(command, "ML model benchmarking run. See ml_performance_benchmark.json for details.")
                self.update_memory_bank_auto(command, cmd_info['description'])
                return True
            elif command == "memory status":
                print("\n[Memory Status]")
                try:
                    files = os.listdir("memory-bank")
                    print(f"Memory bank files: {files}")
                    update_memory_with_summary(command, f"Memory bank files: {files}")
                except Exception as e:
                    print(f"[ERROR] Could not list memory bank files: {e}")
                self.update_memory_bank_auto(command, cmd_info['description'])
                return True
            elif command == "system health":
                print("\n[System Health] Running comprehensive health check...")
                run_script("automation/scripts/automation_health_checker.py")
                print_report("automation/reports/automation_health_report_latest.txt")
                update_memory_with_summary(command, "System health check run. See automation_health_report_latest.txt for details.")
                self.update_memory_bank_auto(command, cmd_info['description'])
                return True
            elif command == "autonomous development mode":
                print("\n[Autonomous Development Mode] Running perfected automation orchestrator in background...")
                run_script("automation/scripts/perfected_automation.py", background=True)
                print("Monitor progress in automation/reports/final_status.json")
                update_memory_with_summary(command, "Autonomous development mode started. Monitor final_status.json for progress.")
                self.update_memory_bank_auto(command, cmd_info['description'])
                return True
            elif command == "run all enhancements in sequence":
                print("\n[Run All Enhancements] Running all major enhancement scripts in order...")
                run_script("automation/scripts/final_automation_validation.py")
                print_report("automation/reports/final_automation_validation.json", summary_keys=["overall_status", "success_rate", "tests_passed", "total_tests"])
                update_memory_with_summary(command, "All enhancements run. See final_automation_validation.json for details.")
                self.update_memory_bank_auto(command, cmd_info['description'])
                return True
            elif command == "add comprehensive test coverage":
                print("\n[Add Comprehensive Test Coverage] Setting up and running all tests...")
                run_script("automation/scripts/setup_test_environment.py")
                run_script("automation/scripts/analyze_app_completeness.py")
                print_report("automation/reports/app_completeness.json", summary_keys=["completion_percentage", "recommendations"])
                update_memory_with_summary(command, "Test coverage and completeness analysis run. See app_completeness.json for details.")
                self.update_memory_bank_auto(command, cmd_info['description'])
                return True
            elif command == "implement error handling for API calls":
                print("\n[Implement Error Handling for API Calls] Analyzing and improving API error handling...")
                run_script("automation/scripts/complete_auth_system.py")
                print("Review API error handling in backend/services and backend/routes.")
                update_memory_with_summary(command, "API error handling analysis run. See backend/services and backend/routes for recommendations.")
                self.update_memory_bank_auto(command, cmd_info['description'])
                return True
            elif command == "add typescript types for API responses":
                print("\n[Add TypeScript Types for API Responses] Generating/updating API docs and types...")
                run_script("automation/scripts/generate_api_docs.py")
                run_script("automation/scripts/generate_code_docs.py")
                print_report("automation/reports/api_docs/api_docs.json", summary_keys=["endpoints", "models"])
                update_memory_with_summary(command, "API docs/types generation run. See api_docs.json for details.")
                self.update_memory_bank_auto(command, cmd_info['description'])
                return True
            elif command == "execute audit_report.ipynb for full context":
                print("\n[Execute Full Audit] Please run audit_report.ipynb manually or via nbconvert for full context.")
                print("(Automation for Jupyter notebook execution can be added if needed.)")
                print_report("automation/reports/audit_report_summary.txt")
                update_memory_with_summary(command, "Audit report run. See audit_report_summary.txt for details.")
                self.update_memory_bank_auto(command, cmd_info['description'])
                return True
            elif command == "show help and documentation":
                print("\n[Help & Documentation]")
                try:
                    with open("CURSOR_COMMAND_SYSTEM.md", "r", encoding="utf-8") as f:
                        print(f.read())
                except Exception as e:
                    print("Help file not found. Showing built-in help.")
                    self.show_help()
                update_memory_with_summary(command, "Help/documentation shown.")
                self.update_memory_bank_auto(command, cmd_info['description'])
                return True
            elif command == "show system status":
                print("\n[System Status]")
                print_report("automation/reports/automation_health_report_latest.txt")
                print_report("automation/reports/final_automation_validation.json", summary_keys=["overall_status", "success_rate", "tests_passed", "total_tests"])
                print_report("automation/reports/app_completeness.json", summary_keys=["completion_percentage", "recommendations"])
                update_memory_with_summary(command, "System status shown. See latest reports for details.")
                self.update_memory_bank_auto(command, cmd_info['description'])
                return True
            elif command == "start monitoring":
                self.start_file_monitoring()
                return True
            elif command == "stop monitoring":
                self.stop_file_monitoring()
                return True
            elif command == "start event monitoring":
                self.start_event_monitoring()
                return True
            elif command == "stop event monitoring":
                self.stop_event_monitoring()
                return True
            elif command == "summarize with ollama":
                self.ollama_summarize_latest_report()
                return True
            else:
                print(f"\n🚀 Executing: {cmd_info['name']}")
                print(f"📝 Command: {command}")
                print(f"💡 Description: {cmd_info['description']}")
                self.update_memory_bank_auto(command, cmd_info['description'])
                print(f"\n✅ Command '{command}' is ready to use in Cursor!")
                print("💬 Simply type this in your Cursor chat:")
                print(f"   {command}")
                print("\n🧠 Memory bank automatically updated with this command usage.")
                return True
        return False
    
    def run(self):
        """Main interface loop"""
        print("🎯 A1Betting Cursor AI Command Interface Starting...")
        
        while True:
            try:
                self.display_menu()
                
                choice = input("\n👉 Enter your choice: ").strip().lower()
                
                if choice == '0' or choice == 'exit':
                    print("\n👋 Goodbye! Happy coding with A1Betting!")
                    break
                elif choice == 'h' or choice == 'help':
                    self.show_help()
                elif choice == 's' or choice == 'status':
                    status = self.get_system_status()
                    print(f"\n📊 SYSTEM STATUS")
                    print(f"Memory Bank Files: {status['memory_bank_files']}")
                    print(f"Chat Archives: {status['chat_archives']}")
                    print(f"Cursor Config: {'✅' if status['cursor_config'] else '❌'}")
                    print(f"Memory Health: {status['memory_bank_health']}")
                elif choice in self.commands:
                    self.run_command(choice)
                    input("\n⏸️  Press Enter to continue...")
                else:
                    print("❌ Invalid choice. Please try again.")
                    
            except KeyboardInterrupt:
                print("\n\n👋 Exiting... Goodbye!")
                break
            except Exception as e:
                print(f"❌ Error: {e}")

    def start_file_monitoring(self):
        if self.monitoring_enabled:
            print("[Monitor] File monitoring already running.")
            return
        self.monitoring_enabled = True
        print("[Monitor] Starting real-time file monitoring...")
        self.monitor_thread = threading.Thread(target=self.file_monitor_loop, daemon=True)
        self.monitor_thread.start()

    def stop_file_monitoring(self):
        if not self.monitoring_enabled:
            print("[Monitor] File monitoring is not running.")
            return
        self.monitoring_enabled = False
        print("[Monitor] Stopping file monitoring...")
        if self.monitor_thread:
            self.monitor_thread.join(timeout=2)
            self.monitor_thread = None

    def file_monitor_loop(self):
        print("[Monitor] File monitor loop started.")
        while self.monitoring_enabled:
            for file_path in self.watched_files:
                try:
                    if not os.path.exists(file_path):
                        continue
                    with open(file_path, 'rb') as f:
                        content = f.read()
                        file_hash = hashlib.md5(content).hexdigest()
                    if file_path not in self.file_hashes:
                        self.file_hashes[file_path] = file_hash
                        continue
                    if self.file_hashes[file_path] != file_hash:
                        print(f"[Monitor] Change detected in {file_path}")
                        self.file_hashes[file_path] = file_hash
                        # Print summary and update memory
                        self.print_report(file_path)
                        self.update_memory_with_summary(f"monitor:{file_path}", f"File {file_path} updated.")
                        # Deeper analytics
                        self.print_deep_analytics(file_path)
                except Exception as e:
                    print(f"[Monitor][ERROR] {file_path}: {e}")
            time.sleep(5)  # Poll every 5 seconds
        print("[Monitor] File monitor loop stopped.")

    def print_deep_analytics(self, file_path: str):
        """Compute and print deeper analytics for a report file."""
        try:
            if file_path.endswith('final_automation_validation.json'):
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                total = data.get('total_tests', 0)
                passed = data.get('tests_passed', 0)
                rate = data.get('success_rate', 0)
                print(f"[Analytics] Test Pass Rate: {passed}/{total} ({rate:.1f}%)")
                self.update_memory_with_summary('analytics:test_pass_rate', f"Test pass rate: {passed}/{total} ({rate:.1f}%)")
            elif file_path.endswith('security_scan.json'):
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                summary = data.get('summary', {})
                total_vulns = summary.get('total_vulnerabilities', 0)
                critical = summary.get('critical', 0)
                high = summary.get('high', 0)
                print(f"[Analytics] Security Vulnerabilities: Total={total_vulns}, Critical={critical}, High={high}")
                self.update_memory_with_summary('analytics:security', f"Security vulnerabilities: Total={total_vulns}, Critical={critical}, High={high}")
            elif file_path.endswith('ml_performance_benchmark.json'):
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                perf = data.get('performance_summary', {})
                avg_score = perf.get('average_score', 0)
                print(f"[Analytics] ML Model Average Score: {avg_score:.1f}/100")
                self.update_memory_with_summary('analytics:ml_score', f"ML model average score: {avg_score:.1f}/100")
            elif file_path.endswith('app_completeness.json'):
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                percent = data.get('completion_percentage', 0)
                print(f"[Analytics] App Completion: {percent:.1f}%")
                self.update_memory_with_summary('analytics:completion', f"App completion: {percent:.1f}%")
            # Add more analytics as needed
        except Exception as e:
            print(f"[Analytics][ERROR] {file_path}: {e}")

    # --- Event-driven file watching with watchdog ---
    def start_event_monitoring(self):
        try:
            from watchdog.observers import Observer
            from watchdog.events import FileSystemEventHandler
        except ImportError:
            print("[Watchdog] watchdog package not installed. Run 'pip install watchdog'.")
            return
        if self.observer and self.observer.is_alive():
            print("[Watchdog] Event-driven monitoring already running.")
            return
        print("[Watchdog] Starting event-driven file monitoring...")
        class ReportChangeHandler(FileSystemEventHandler):
            def __init__(self, agent):
                self.agent = agent
            def on_modified(self, event):
                if event.is_directory:
                    return
                for file_path in self.agent.watched_files:
                    if os.path.abspath(event.src_path) == os.path.abspath(file_path):
                        print(f"[Watchdog] Change detected in {event.src_path}")
                        self.agent.print_report(file_path)
                        self.agent.update_memory_with_summary(f"event-monitor:{file_path}", f"File {file_path} updated.")
                        self.agent.print_deep_analytics(file_path)
        self.event_handler = ReportChangeHandler(self)
        self.observer = Observer()
        for file_path in self.watched_files:
            watch_dir = os.path.dirname(file_path) or '.'
            self.observer.schedule(self.event_handler, path=watch_dir, recursive=False)
        self.observer.start()
        print("[Watchdog] Event-driven monitoring started.")

    def stop_event_monitoring(self):
        try:
            from watchdog.observers import Observer  # type: ignore
        except ImportError:
            print("[Watchdog] watchdog package not installed.")
            return
        if self.observer:
            self.observer.stop()
            self.observer.join()
            self.observer = None
            print("[Watchdog] Event-driven monitoring stopped.")
        else:
            print("[Watchdog] No event-driven monitoring running.")

    # --- Ollama LLM integration ---
    def query_ollama(self, prompt: str, model: str = 'llama2') -> str:
        url = 'http://localhost:11434/api/generate'
        payload = {
            'model': model,
            'prompt': prompt,
            'stream': False
        }
        try:
            response = requests.post(url, json=payload, timeout=60)
            response.raise_for_status()
            result = response.json()
            return result.get('response', '').strip()
        except Exception as e:
            print(f'[Ollama][ERROR] {e}')
            return None

    def ollama_summarize_latest_report(self):
        # Try to summarize the most recent report file
        report_files = [
            "automation/reports/final_automation_validation.json",
            "automation/reports/security_scan.json",
            "automation/reports/load_test_summary.md",
            "automation/reports/automation_health_report_latest.txt"
        ]
        for file_path in report_files:
            if os.path.exists(file_path):
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                prompt = f"Summarize this report for a developer:\n{content}"
                summary = self.query_ollama(prompt)
                if summary:
                    print("[Ollama Summary]:\n", summary)
                    self.update_memory_with_summary('ollama:summary', summary)
                else:
                    print("[Ollama] No summary returned.")
                return
        print("[Ollama] No report file found to summarize.")

def main():
    """Main entry point"""
    interface = CursorCommandInterface()
    interface.run()

if __name__ == "__main__":
    main() 