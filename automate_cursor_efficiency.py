#!/usr/bin/env python3
"""
A1Betting Cursor AI Efficiency System - Complete Automation Script
Version: 3.0.0
Purpose: Automated setup, testing, and maintenance of the entire efficiency system
"""

import os
import json
import sys
import subprocess
import shutil
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Tuple, Any
import time

class CursorEfficiencyAutomator:
    def __init__(self):
        self.root_path = Path.cwd()
        self.log_file = self.root_path / "automation_log.txt"
        self.results = {}
        
    def log(self, message: str, level: str = "INFO"):
        """Log message with timestamp"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_entry = f"[{timestamp}] [{level}] {message}"
        print(log_entry)
        
        try:
            with open(self.log_file, 'a', encoding='utf-8') as f:
                f.write(log_entry + "\n")
        except Exception as e:
            print(f"Failed to write to log: {e}")

    def create_directory_structure(self) -> bool:
        """Create all required directories"""
        self.log("🏗️  Creating directory structure...")
        
        directories = [
            ".cursor",
            ".cursor/rules",
            ".cursor/agents",
            ".cursor/docs",
            "memory-bank",
            "memory-bank/chat-archives",
            "memory-bank/chat-archives/by-date",
            "memory-bank/chat-archives/by-topic",
            "memory-bank/chat-archives/supervisor-coordination",
            "memory-bank/ingested-context",
            "tools"
        ]
        
        success = True
        for directory in directories:
            dir_path = self.root_path / directory
            try:
                dir_path.mkdir(parents=True, exist_ok=True)
                self.log(f"✅ Created directory: {directory}")
            except Exception as e:
                self.log(f"❌ Failed to create directory {directory}: {e}", "ERROR")
                success = False
                
        return success

    def setup_topic_directories(self) -> bool:
        """Create topic-specific directories"""
        self.log("📁 Setting up topic directories...")
        
        topics = [
            "betting", "ml", "frontend", "backend", "security", 
            "errors", "architecture", "integration", "performance", "agent"
        ]
        
        success = True
        for topic in topics:
            topic_dir = self.root_path / "memory-bank" / "chat-archives" / "by-topic" / topic
            try:
                topic_dir.mkdir(parents=True, exist_ok=True)
                self.log(f"✅ Created topic directory: {topic}")
            except Exception as e:
                self.log(f"❌ Failed to create topic directory {topic}: {e}", "ERROR")
                success = False
                
        return success

    def run_test_suite(self) -> bool:
        """Run the comprehensive test suite"""
        self.log("🧪 Running comprehensive test suite...")
        
        try:
            result = subprocess.run(
                [sys.executable, "run_efficiency_tests.py"],
                capture_output=True,
                text=True,
                timeout=120
            )
            
            if result.returncode == 0:
                self.log("✅ All tests passed successfully!")
                self.log(f"Test output: {result.stdout}")
                return True
            else:
                self.log(f"❌ Tests failed with exit code: {result.returncode}", "ERROR")
                self.log(f"Test errors: {result.stderr}", "ERROR")
                return False
                
        except subprocess.TimeoutExpired:
            self.log("❌ Test suite timed out", "ERROR")
            return False
        except Exception as e:
            self.log(f"❌ Failed to run test suite: {e}", "ERROR")
            return False

    def process_chat_history(self) -> bool:
        """Process existing chat history"""
        self.log("💬 Processing chat history...")
        
        processor_path = self.root_path / "tools" / "chat_history_processor.py"
        if not processor_path.exists():
            self.log("⚠️  Chat history processor not found, skipping", "WARN")
            return True
            
        try:
            result = subprocess.run(
                [sys.executable, str(processor_path)],
                capture_output=True,
                text=True,
                timeout=60
            )
            
            if result.returncode == 0:
                self.log("✅ Chat history processed successfully")
                return True
            else:
                self.log(f"❌ Chat history processing failed: {result.stderr}", "ERROR")
                return False
                
        except Exception as e:
            self.log(f"❌ Error processing chat history: {e}", "ERROR")
            return False

    def validate_json_files(self) -> bool:
        """Validate all JSON configuration files"""
        self.log("🔍 Validating JSON configuration files...")
        
        json_files = [
            ".cursor/modes.json",
            ".cursor/settings.json",
            "memory-bank/chat-history-summary.json"
        ]
        
        success = True
        for file_path in json_files:
            full_path = self.root_path / file_path
            if full_path.exists():
                try:
                    with open(full_path, 'r', encoding='utf-8') as f:
                        json.load(f)
                    self.log(f"✅ Valid JSON: {file_path}")
                except json.JSONDecodeError as e:
                    self.log(f"❌ Invalid JSON {file_path}: {e}", "ERROR")
                    success = False
            else:
                self.log(f"⚠️  JSON file not found: {file_path}", "WARN")
                
        return success

    def check_system_requirements(self) -> bool:
        """Check system requirements and dependencies"""
        self.log("🔧 Checking system requirements...")
        
        # Check Python version
        python_version = sys.version_info
        if python_version.major < 3 or (python_version.major == 3 and python_version.minor < 8):
            self.log(f"❌ Python 3.8+ required, found {python_version.major}.{python_version.minor}", "ERROR")
            return False
        else:
            self.log(f"✅ Python version: {python_version.major}.{python_version.minor}")
            
        # Check required packages
        required_packages = ["json", "pathlib", "subprocess", "datetime"]
        for package in required_packages:
            try:
                __import__(package)
                self.log(f"✅ Package available: {package}")
            except ImportError:
                self.log(f"❌ Missing package: {package}", "ERROR")
                return False
                
        return True

    def optimize_cursor_settings(self) -> bool:
        """Optimize Cursor IDE settings"""
        self.log("⚡ Optimizing Cursor IDE settings...")
        
        settings_file = self.root_path / ".cursor" / "settings.json"
        if not settings_file.exists():
            self.log("❌ Cursor settings file not found", "ERROR")
            return False
            
        try:
            with open(settings_file, 'r', encoding='utf-8') as f:
                settings = json.load(f)
                
            # Verify key optimization settings
            optimizations = {
                "cursor.general.enableBackgroundAgent": True,
                "cursor.rules.autoApply": True,
                "cursor.context.maxTokens": 200000,
                "cursor.agent.maxParallelTasks": 3,
                "cursor.performance.optimizeContext": True
            }
            
            missing_optimizations = []
            for key, expected_value in optimizations.items():
                if key not in settings or settings[key] != expected_value:
                    missing_optimizations.append(key)
                    
            if missing_optimizations:
                self.log(f"⚠️  Missing optimizations: {missing_optimizations}", "WARN")
                return False
            else:
                self.log("✅ All Cursor optimizations configured")
                return True
                
        except Exception as e:
            self.log(f"❌ Error checking Cursor settings: {e}", "ERROR")
            return False

    def verify_memory_bank_integrity(self) -> bool:
        """Verify memory bank file integrity"""
        self.log("🧠 Verifying memory bank integrity...")
        
        required_files = [
            "memory-bank/activeContext.md",
            "memory-bank/progress.md",
            "memory-bank/systemPatterns.md",
            "memory-bank/techContext.md",
            "memory-bank/productContext.md",
            "memory-bank/projectbrief.md",
            "memory-bank/README.md"
        ]
        
        success = True
        for file_path in required_files:
            full_path = self.root_path / file_path
            if full_path.exists():
                try:
                    with open(full_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        if len(content) < 100:
                            self.log(f"⚠️  File may be incomplete: {file_path} ({len(content)} chars)", "WARN")
                        elif "A1Betting" in content:
                            self.log(f"✅ Memory file verified: {file_path}")
                        else:
                            self.log(f"⚠️  Missing A1Betting context: {file_path}", "WARN")
                except Exception as e:
                    self.log(f"❌ Error reading {file_path}: {e}", "ERROR")
                    success = False
            else:
                self.log(f"❌ Missing memory file: {file_path}", "ERROR")
                success = False
                
        return success

    def generate_system_report(self) -> str:
        """Generate comprehensive system status report"""
        self.log("📊 Generating system status report...")
        
        report = f"""
# A1Betting Cursor AI Efficiency System - Status Report

## 🎯 AUTOMATION SUMMARY
- **Date**: {datetime.now().isoformat()}
- **Version**: 3.0.0
- **Status**: {'✅ OPERATIONAL' if all(self.results.values()) else '❌ NEEDS ATTENTION'}

## 📈 SYSTEM COMPONENTS

### Core Infrastructure
- **Directory Structure**: {'✅ COMPLETE' if self.results.get('directories', False) else '❌ INCOMPLETE'}
- **Topic Organization**: {'✅ COMPLETE' if self.results.get('topics', False) else '❌ INCOMPLETE'}
- **JSON Configuration**: {'✅ VALID' if self.results.get('json_valid', False) else '❌ INVALID'}

### Memory Bank System
- **File Integrity**: {'✅ VERIFIED' if self.results.get('memory_integrity', False) else '❌ COMPROMISED'}
- **Chat History**: {'✅ PROCESSED' if self.results.get('chat_history', False) else '❌ NOT PROCESSED'}
- **Context Preservation**: {'✅ ACTIVE' if self.results.get('memory_integrity', False) else '❌ INACTIVE'}

### Cursor AI Optimization
- **Settings Optimization**: {'✅ CONFIGURED' if self.results.get('cursor_optimized', False) else '❌ NOT CONFIGURED'}
- **Custom Agents**: {'✅ DEPLOYED' if self.results.get('json_valid', False) else '❌ NOT DEPLOYED'}
- **RIPER-5 Modes**: {'✅ ACTIVE' if self.results.get('tests_passed', False) else '❌ INACTIVE'}

### Testing & Validation
- **Test Suite**: {'✅ PASSED' if self.results.get('tests_passed', False) else '❌ FAILED'}
- **System Requirements**: {'✅ MET' if self.results.get('requirements_met', False) else '❌ NOT MET'}
- **Performance**: {'✅ OPTIMIZED' if self.results.get('cursor_optimized', False) else '❌ NOT OPTIMIZED'}

## 🚀 USAGE INSTRUCTIONS

### If System is Operational (✅):
1. **Start Cursor AI**: Open a new chat session
2. **Load Memory Bank**: Type `"load memory bank"` to activate context
3. **Use RIPER-5 Modes**: Try `"ENTER RESEARCH MODE"` for advanced analysis
4. **Access Specialized Agents**: Use `@a1betting-architect` for platform-specific help
5. **Monitor Performance**: Check efficiency improvements in real-time

### If System Needs Attention (❌):
1. **Review Log**: Check `automation_log.txt` for detailed error information
2. **Fix Issues**: Address any failed components or missing files
3. **Re-run Automation**: Execute `python automate_cursor_efficiency.py` again
4. **Verify Tests**: Run `python run_efficiency_tests.py` to confirm fixes

## 📚 DOCUMENTATION REFERENCES
- **Complete Guide**: `CURSOR_EFFICIENCY_GUIDE.md`
- **Memory Bank Usage**: `memory-bank/README.md`
- **Test Results**: `test_results.json`
- **Automation Log**: `automation_log.txt`

## 🔍 TROUBLESHOOTING
- **Missing Files**: Re-run automation to recreate structure
- **JSON Errors**: Check syntax in `.cursor/modes.json` and `.cursor/settings.json`
- **Memory Issues**: Verify memory bank files contain A1Betting context
- **Performance**: Ensure Cursor settings are optimized for maximum efficiency

---
**Report Generated**: {datetime.now().isoformat()}
**Next Scheduled Check**: {(datetime.now()).strftime('%Y-%m-%d %H:%M:%S')}
"""
        
        try:
            with open(self.root_path / "SYSTEM_STATUS_REPORT.md", 'w', encoding='utf-8') as f:
                f.write(report)
            self.log("✅ System status report generated")
        except Exception as e:
            self.log(f"❌ Failed to generate report: {e}", "ERROR")
            
        return report

    def run_full_automation(self) -> bool:
        """Run complete automation sequence"""
        self.log("🚀 A1BETTING CURSOR AI EFFICIENCY SYSTEM - FULL AUTOMATION")
        self.log("=" * 70)
        
        automation_steps = [
            ("System Requirements", self.check_system_requirements),
            ("Directory Structure", self.create_directory_structure),
            ("Topic Directories", self.setup_topic_directories),
            ("JSON Validation", self.validate_json_files),
            ("Memory Bank Integrity", self.verify_memory_bank_integrity),
            ("Cursor Optimization", self.optimize_cursor_settings),
            ("Chat History Processing", self.process_chat_history),
            ("Test Suite Execution", self.run_test_suite)
        ]
        
        overall_success = True
        
        for step_name, step_function in automation_steps:
            self.log(f"\n🔄 Executing: {step_name}")
            try:
                result = step_function()
                self.results[step_name.lower().replace(" ", "_")] = result
                
                if result:
                    self.log(f"✅ {step_name} completed successfully")
                else:
                    self.log(f"❌ {step_name} failed", "ERROR")
                    overall_success = False
                    
            except Exception as e:
                self.log(f"❌ {step_name} crashed: {e}", "ERROR")
                self.results[step_name.lower().replace(" ", "_")] = False
                overall_success = False
                
        # Generate final report
        self.generate_system_report()
        
        # Final status
        self.log("\n" + "=" * 70)
        if overall_success:
            self.log("🎉 AUTOMATION COMPLETE - SYSTEM READY FOR PRODUCTION!")
            self.log("🚀 Your A1Betting Cursor AI efficiency system is fully operational")
            self.log("📚 Check SYSTEM_STATUS_REPORT.md for complete details")
        else:
            self.log("⚠️  AUTOMATION COMPLETED WITH ISSUES", "WARN")
            self.log("🔧 Review automation_log.txt for detailed error information")
            self.log("🔄 Re-run automation after fixing issues")
            
        return overall_success

def main():
    """Main automation execution"""
    automator = CursorEfficiencyAutomator()
    success = automator.run_full_automation()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main() 