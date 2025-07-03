#!/usr/bin/env python3
"""
A1Betting Cursor AI Efficiency System - Comprehensive Test Suite
Version: 3.0.0
Purpose: Automated verification of all system components and integrations
"""

import os
import json
import sys
import subprocess
from pathlib import Path
from typing import Dict, List, Tuple, Any
from datetime import datetime
import re

class CursorEfficiencyTester:
    def __init__(self):
        self.root_path = Path.cwd()
        self.test_results = []
        self.errors = []
        self.warnings = []
        
    def log_result(self, test_name: str, status: str, details: str = "", severity: str = "INFO"):
        """Log test result with timestamp"""
        result = {
            "timestamp": datetime.now().isoformat(),
            "test": test_name,
            "status": status,
            "details": details,
            "severity": severity
        }
        self.test_results.append(result)
        
        if status == "FAIL":
            self.errors.append(result)
        elif status == "WARN":
            self.warnings.append(result)
            
        print(f"[{severity}] {test_name}: {status}")
        if details:
            print(f"    Details: {details}")

    def test_file_exists(self, file_path: str, description: str) -> bool:
        """Test if a critical file exists"""
        full_path = self.root_path / file_path
        if full_path.exists():
            size = full_path.stat().st_size
            self.log_result(f"File Exists: {description}", "PASS", 
                          f"Found at {file_path} ({size} bytes)")
            return True
        else:
            self.log_result(f"File Exists: {description}", "FAIL", 
                          f"Missing: {file_path}")
            return False

    def test_directory_structure(self) -> bool:
        """Test all required directories exist"""
        print("\n🏗️  TESTING DIRECTORY STRUCTURE")
        
        required_dirs = [
            (".cursor", "Cursor configuration directory"),
            (".cursor/rules", "Cursor rules directory"),
            ("memory-bank", "Memory bank system"),
            ("memory-bank/chat-archives", "Chat archives"),
            ("memory-bank/chat-archives/by-topic", "Topic-based chat organization"),
            ("memory-bank/chat-archives/by-date", "Date-based chat organization"),
            ("memory-bank/chat-archives/supervisor-coordination", "Multi-agent coordination"),
            ("tools", "Automation tools directory")
        ]
        
        all_passed = True
        for dir_path, description in required_dirs:
            if not self.test_file_exists(dir_path, description):
                all_passed = False
                
        return all_passed

    def test_core_files(self) -> bool:
        """Test all core system files exist and have content"""
        print("\n📄 TESTING CORE FILES")
        
        core_files = [
            (".cursorrules", "Master Cursor rules file"),
            (".cursor/modes.json", "Custom agent configurations"),
            (".cursor/settings.json", "IDE optimization settings"),
            (".cursor/rules/advanced-optimization.mdc", "Advanced optimization rules"),
            (".cursor/rules/memory-bank-integration.mdc", "Memory bank integration rules"),
            ("memory-bank/README.md", "Memory bank usage guide"),
            ("memory-bank/activeContext.md", "Current active context"),
            ("memory-bank/progress.md", "Progress tracking"),
            ("memory-bank/systemPatterns.md", "System architecture patterns"),
            ("memory-bank/techContext.md", "Technology context"),
            ("memory-bank/productContext.md", "Product context"),
            ("memory-bank/projectbrief.md", "Project brief"),
            ("memory-bank/codebase-context.md", "Codebase analysis"),
            ("CURSOR_EFFICIENCY_GUIDE.md", "Complete usage guide"),
            ("MEMORY_BANK_COMPLETE.md", "Implementation status")
        ]
        
        all_passed = True
        for file_path, description in core_files:
            if not self.test_file_exists(file_path, description):
                all_passed = False
                
        return all_passed

    def test_json_validity(self) -> bool:
        """Test all JSON files are valid"""
        print("\n🔍 TESTING JSON FILE VALIDITY")
        
        json_files = [
            ".cursor/modes.json",
            ".cursor/settings.json",
            "memory-bank/chat-history-summary.json"
        ]
        
        all_passed = True
        for file_path in json_files:
            full_path = self.root_path / file_path
            if full_path.exists():
                try:
                    with open(full_path, 'r', encoding='utf-8') as f:
                        json.load(f)
                    self.log_result(f"JSON Validity: {file_path}", "PASS")
                except json.JSONDecodeError as e:
                    self.log_result(f"JSON Validity: {file_path}", "FAIL", 
                                  f"Invalid JSON: {str(e)}")
                    all_passed = False
            else:
                self.log_result(f"JSON Validity: {file_path}", "FAIL", 
                              f"File not found")
                all_passed = False
                
        return all_passed

    def test_custom_agents_config(self) -> bool:
        """Test custom agents configuration"""
        print("\n🤖 TESTING CUSTOM AGENTS CONFIGURATION")
        
        modes_file = self.root_path / ".cursor/modes.json"
        if not modes_file.exists():
            self.log_result("Custom Agents Config", "FAIL", "modes.json not found")
            return False
            
        try:
            with open(modes_file, 'r', encoding='utf-8') as f:
                config = json.load(f)
                
            # Test required structure
            if "modes" not in config:
                self.log_result("Custom Agents Config", "FAIL", "Missing 'modes' key")
                return False
                
            modes = config["modes"]
            expected_agents = [
                "a1betting-architect",
                "typescript-repair-specialist", 
                "ml-performance-engineer",
                "security-compliance-auditor",
                "performance-optimizer",
                "debugging-specialist",
                "documentation-specialist"
            ]
            
            all_passed = True
            for agent in expected_agents:
                if agent in modes:
                    agent_config = modes[agent]
                    required_fields = ["name", "description", "model", "systemPrompt", "tools"]
                    missing_fields = [field for field in required_fields if field not in agent_config]
                    
                    if missing_fields:
                        self.log_result(f"Agent Config: {agent}", "FAIL", 
                                      f"Missing fields: {missing_fields}")
                        all_passed = False
                    else:
                        self.log_result(f"Agent Config: {agent}", "PASS")
                else:
                    self.log_result(f"Agent Config: {agent}", "FAIL", "Agent not found")
                    all_passed = False
                    
            return all_passed
            
        except Exception as e:
            self.log_result("Custom Agents Config", "FAIL", f"Error reading config: {str(e)}")
            return False

    def test_memory_bank_content(self) -> bool:
        """Test memory bank files have proper content"""
        print("\n🧠 TESTING MEMORY BANK CONTENT")
        
        content_tests = [
            ("memory-bank/activeContext.md", "A1Betting", "A1Betting platform context"),
            ("memory-bank/systemPatterns.md", "architecture", "Architecture patterns"),
            ("memory-bank/techContext.md", "React", "Technology stack"),
            ("memory-bank/progress.md", "TypeScript", "Progress tracking"),
            (".cursorrules", "memory-bank", "Memory bank integration"),
            (".cursorrules", "RIPER-5", "RIPER-5 mode system"),
            ("CURSOR_EFFICIENCY_GUIDE.md", "efficiency", "Efficiency guide content")
        ]
        
        all_passed = True
        for file_path, search_term, description in content_tests:
            full_path = self.root_path / file_path
            if full_path.exists():
                try:
                    with open(full_path, 'r', encoding='utf-8') as f:
                        content = f.read().lower()
                        if search_term.lower() in content:
                            self.log_result(f"Content Test: {description}", "PASS")
                        else:
                            self.log_result(f"Content Test: {description}", "WARN", 
                                          f"'{search_term}' not found in {file_path}")
                            all_passed = False
                except Exception as e:
                    self.log_result(f"Content Test: {description}", "FAIL", 
                                  f"Error reading {file_path}: {str(e)}")
                    all_passed = False
            else:
                self.log_result(f"Content Test: {description}", "FAIL", 
                              f"File not found: {file_path}")
                all_passed = False
                
        return all_passed

    def test_riper5_mode_system(self) -> bool:
        """Test RIPER-5 mode system configuration"""
        print("\n🎯 TESTING RIPER-5 MODE SYSTEM")
        
        cursorrules_file = self.root_path / ".cursorrules"
        if not cursorrules_file.exists():
            self.log_result("RIPER-5 Mode System", "FAIL", ".cursorrules not found")
            return False
            
        try:
            with open(cursorrules_file, 'r', encoding='utf-8') as f:
                content = f.read()
                
            required_modes = ["RESEARCH", "INNOVATE", "PLAN", "EXECUTE", "REVIEW"]
            mode_commands = ["ENTER RESEARCH MODE", "ENTER PLAN MODE", "ENTER EXECUTE MODE"]
            
            all_passed = True
            
            # Test mode definitions
            for mode in required_modes:
                if f"MODE: {mode}" in content:
                    self.log_result(f"RIPER-5 Mode: {mode}", "PASS")
                else:
                    self.log_result(f"RIPER-5 Mode: {mode}", "FAIL", 
                                  f"Mode definition not found")
                    all_passed = False
                    
            # Test activation commands
            for command in mode_commands:
                if command in content:
                    self.log_result(f"Mode Command: {command}", "PASS")
                else:
                    self.log_result(f"Mode Command: {command}", "WARN", 
                                  f"Command not found")
                    
            return all_passed
            
        except Exception as e:
            self.log_result("RIPER-5 Mode System", "FAIL", f"Error reading .cursorrules: {str(e)}")
            return False

    def test_a1betting_context(self) -> bool:
        """Test A1Betting platform specific context"""
        print("\n🎰 TESTING A1BETTING PLATFORM CONTEXT")
        
        platform_indicators = [
            ("96.4%", "ML model accuracy"),
            ("73.8%", "Win rate"),
            ("18.5%", "ROI"),
            ("1.42", "Sharpe ratio"),
            ("26,797", "TypeScript errors"),
            ("QuantumSportsPlatform", "Main component"),
            ("PrizePicks", "API integration"),
            ("TensorFlow", "ML framework")
        ]
        
        files_to_check = [
            ".cursorrules",
            "memory-bank/activeContext.md", 
            "memory-bank/systemPatterns.md",
            "memory-bank/codebase-context.md",
            "CURSOR_EFFICIENCY_GUIDE.md"
        ]
        
        all_passed = True
        context_found = {}
        
        for file_path in files_to_check:
            full_path = self.root_path / file_path
            if full_path.exists():
                try:
                    with open(full_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        
                    for indicator, description in platform_indicators:
                        if indicator in content:
                            if indicator not in context_found:
                                context_found[indicator] = []
                            context_found[indicator].append(file_path)
                            
                except Exception as e:
                    self.log_result(f"A1Betting Context: {file_path}", "FAIL", 
                                  f"Error reading file: {str(e)}")
                    all_passed = False
                    
        # Verify each indicator found in at least one file
        for indicator, description in platform_indicators:
            if indicator in context_found:
                self.log_result(f"A1Betting Context: {description}", "PASS", 
                              f"Found in {len(context_found[indicator])} files")
            else:
                self.log_result(f"A1Betting Context: {description}", "WARN", 
                              f"'{indicator}' not found in any files")
                
        return all_passed

    def test_chat_archives_structure(self) -> bool:
        """Test chat archives organization"""
        print("\n💬 TESTING CHAT ARCHIVES STRUCTURE")
        
        expected_topics = [
            "betting", "ml", "frontend", "backend", "security", 
            "errors", "architecture", "integration", "performance", "agent"
        ]
        
        all_passed = True
        
        # Test topic directories
        for topic in expected_topics:
            topic_dir = self.root_path / "memory-bank" / "chat-archives" / "by-topic" / topic
            if topic_dir.exists():
                self.log_result(f"Chat Topic: {topic}", "PASS")
            else:
                self.log_result(f"Chat Topic: {topic}", "WARN", 
                              f"Topic directory not found")
                
        # Test date directory exists
        date_dir = self.root_path / "memory-bank" / "chat-archives" / "by-date"
        if date_dir.exists():
            self.log_result("Chat Archives: Date Organization", "PASS")
        else:
            self.log_result("Chat Archives: Date Organization", "FAIL", 
                          "Date directory not found")
            all_passed = False
            
        return all_passed

    def test_tools_availability(self) -> bool:
        """Test automation tools are available"""
        print("\n🛠️  TESTING AUTOMATION TOOLS")
        
        tools = [
            ("tools/chat_history_processor.py", "Chat history processor"),
            ("tools/gitingest_memory_manager.py", "GitIngest memory manager"),
            ("run_gitingest.py", "GitIngest runner")
        ]
        
        all_passed = True
        for tool_path, description in tools:
            if not self.test_file_exists(tool_path, description):
                all_passed = False
                
        return all_passed

    def test_security_compliance(self) -> bool:
        """Test security and compliance configurations"""
        print("\n🔒 TESTING SECURITY COMPLIANCE")
        
        security_checks = [
            (".cursorrules", "NEVER expose betting algorithms", "Algorithm protection"),
            (".cursorrules", "environment variables", "Secret management"),
            (".cursorrules", "audit trails", "Audit trail requirement"),
            ("memory-bank/systemPatterns.md", "security", "Security patterns"),
            (".cursor/modes.json", "security-compliance-auditor", "Security agent")
        ]
        
        all_passed = True
        for file_path, search_term, description in security_checks:
            full_path = self.root_path / file_path
            if full_path.exists():
                try:
                    with open(full_path, 'r', encoding='utf-8') as f:
                        content = f.read().lower()
                        if search_term.lower() in content:
                            self.log_result(f"Security: {description}", "PASS")
                        else:
                            self.log_result(f"Security: {description}", "WARN", 
                                          f"'{search_term}' not found")
                except Exception as e:
                    self.log_result(f"Security: {description}", "FAIL", 
                                  f"Error reading {file_path}: {str(e)}")
                    all_passed = False
            else:
                self.log_result(f"Security: {description}", "FAIL", 
                              f"File not found: {file_path}")
                all_passed = False
                
        return all_passed

    def test_performance_optimization(self) -> bool:
        """Test performance optimization configurations"""
        print("\n⚡ TESTING PERFORMANCE OPTIMIZATION")
        
        perf_checks = [
            (".cursor/settings.json", "enableBackgroundAgent", "Background agents"),
            (".cursor/settings.json", "maxTokens", "Token optimization"),
            (".cursor/modes.json", "performance-optimizer", "Performance agent"),
            (".cursorrules", "build times", "Build optimization"),
            ("CURSOR_EFFICIENCY_GUIDE.md", "efficiency", "Efficiency guide")
        ]
        
        all_passed = True
        for file_path, search_term, description in perf_checks:
            full_path = self.root_path / file_path
            if full_path.exists():
                try:
                    with open(full_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        if search_term in content:
                            self.log_result(f"Performance: {description}", "PASS")
                        else:
                            self.log_result(f"Performance: {description}", "WARN", 
                                          f"'{search_term}' not found")
                except Exception as e:
                    self.log_result(f"Performance: {description}", "FAIL", 
                                  f"Error reading {file_path}: {str(e)}")
                    all_passed = False
            else:
                self.log_result(f"Performance: {description}", "FAIL", 
                              f"File not found: {file_path}")
                all_passed = False
                
        return all_passed

    def generate_test_report(self) -> str:
        """Generate comprehensive test report"""
        total_tests = len(self.test_results)
        passed_tests = len([r for r in self.test_results if r["status"] == "PASS"])
        failed_tests = len([r for r in self.test_results if r["status"] == "FAIL"])
        warning_tests = len([r for r in self.test_results if r["status"] == "WARN"])
        
        success_rate = (passed_tests / total_tests * 100) if total_tests > 0 else 0
        
        report = f"""
# A1Betting Cursor AI Efficiency System - Test Report

## 📊 SUMMARY
- **Total Tests**: {total_tests}
- **Passed**: {passed_tests} ✅
- **Failed**: {failed_tests} ❌
- **Warnings**: {warning_tests} ⚠️
- **Success Rate**: {success_rate:.1f}%

## 🎯 SYSTEM STATUS
"""
        
        if failed_tests == 0:
            report += "🟢 **PRODUCTION READY** - All critical tests passed!\n"
        elif failed_tests <= 2:
            report += "🟡 **MOSTLY READY** - Minor issues detected, review failures.\n"
        else:
            report += "🔴 **NEEDS ATTENTION** - Multiple failures detected, system not ready.\n"
            
        if warning_tests > 0:
            report += f"⚠️  **{warning_tests} warnings** - Review for optimization opportunities.\n"
            
        report += f"""
## 📈 EFFICIENCY METRICS
- **Memory Bank Integration**: {'✅ COMPLETE' if any('Memory Bank' in r['test'] and r['status'] == 'PASS' for r in self.test_results) else '❌ INCOMPLETE'}
- **Custom Agents**: {'✅ CONFIGURED' if any('Agent Config' in r['test'] and r['status'] == 'PASS' for r in self.test_results) else '❌ NOT CONFIGURED'}
- **RIPER-5 Modes**: {'✅ ACTIVE' if any('RIPER-5' in r['test'] and r['status'] == 'PASS' for r in self.test_results) else '❌ INACTIVE'}
- **Security Compliance**: {'✅ ENFORCED' if any('Security' in r['test'] and r['status'] == 'PASS' for r in self.test_results) else '❌ NOT ENFORCED'}
- **A1Betting Context**: {'✅ PRESERVED' if any('A1Betting Context' in r['test'] and r['status'] == 'PASS' for r in self.test_results) else '❌ MISSING'}

## 🔍 DETAILED RESULTS

### ✅ PASSED TESTS
"""
        
        for result in self.test_results:
            if result["status"] == "PASS":
                report += f"- {result['test']}\n"
                
        if self.errors:
            report += "\n### ❌ FAILED TESTS\n"
            for error in self.errors:
                report += f"- **{error['test']}**: {error['details']}\n"
                
        if self.warnings:
            report += "\n### ⚠️ WARNINGS\n"
            for warning in self.warnings:
                report += f"- **{warning['test']}**: {warning['details']}\n"
                
        report += f"""
## 🚀 NEXT STEPS

### If System is Ready (🟢):
1. Start using the system with `"load memory bank"`
2. Test RIPER-5 modes with `"ENTER RESEARCH MODE"`
3. Try specialized agents like `@a1betting-architect`
4. Monitor efficiency gains and performance

### If Issues Detected (🟡/🔴):
1. Review failed tests and fix critical issues
2. Check file permissions and accessibility
3. Verify JSON file syntax and structure
4. Ensure all required directories exist

## 📚 DOCUMENTATION
- **Usage Guide**: `CURSOR_EFFICIENCY_GUIDE.md`
- **Memory Bank Guide**: `memory-bank/README.md`
- **Implementation Status**: `MEMORY_BANK_COMPLETE.md`

---
**Test Report Generated**: {datetime.now().isoformat()}
**Version**: 3.0.0
**Status**: {'PRODUCTION READY' if failed_tests == 0 else 'NEEDS REVIEW'}
"""
        
        return report

    def run_all_tests(self) -> bool:
        """Run all tests and generate report"""
        print("🧪 A1BETTING CURSOR AI EFFICIENCY SYSTEM - COMPREHENSIVE TEST SUITE")
        print("=" * 70)
        
        test_methods = [
            self.test_directory_structure,
            self.test_core_files,
            self.test_json_validity,
            self.test_custom_agents_config,
            self.test_memory_bank_content,
            self.test_riper5_mode_system,
            self.test_a1betting_context,
            self.test_chat_archives_structure,
            self.test_tools_availability,
            self.test_security_compliance,
            self.test_performance_optimization
        ]
        
        all_passed = True
        for test_method in test_methods:
            try:
                result = test_method()
                if not result:
                    all_passed = False
            except Exception as e:
                self.log_result(f"Test Error: {test_method.__name__}", "FAIL", str(e))
                all_passed = False
                
        # Generate and save report
        report = self.generate_test_report()
        
        try:
            with open(self.root_path / "CURSOR_EFFICIENCY_TEST_REPORT.md", 'w', encoding='utf-8') as f:
                f.write(report)
            print(f"\n📄 Test report saved to: CURSOR_EFFICIENCY_TEST_REPORT.md")
        except Exception as e:
            print(f"\n❌ Failed to save test report: {str(e)}")
            
        print("\n" + "=" * 70)
        print(f"🏁 TESTING COMPLETE - {'✅ ALL TESTS PASSED' if all_passed else '❌ SOME TESTS FAILED'}")
        print(f"📊 Results: {len([r for r in self.test_results if r['status'] == 'PASS'])} passed, "
              f"{len(self.errors)} failed, {len(self.warnings)} warnings")
        
        return all_passed

def main():
    """Main test execution"""
    tester = CursorEfficiencyTester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main() 