#!/usr/bin/env python3
"""
A1Betting Cursor AI Efficiency System - Final Validation
Version: 3.0.0
Purpose: Comprehensive system validation that works on all platforms
"""

import os
import json
import sys
from pathlib import Path
from datetime import datetime

def test_system_comprehensive():
    """Run comprehensive system validation"""
    print("=" * 60)
    print("A1BETTING CURSOR AI EFFICIENCY SYSTEM - FINAL VALIDATION")
    print("=" * 60)
    
    root_path = Path.cwd()
    results = []
    
    # Test 1: Core system files
    print("\n[1/8] Testing Core System Files...")
    core_files = [
        (".cursorrules", "Master Cursor rules"),
        (".cursor/modes.json", "Custom agent configurations"), 
        (".cursor/settings.json", "IDE optimization settings"),
        (".cursor/rules/advanced-optimization.mdc", "Advanced optimization rules"),
        (".cursor/rules/memory-bank-integration.mdc", "Memory bank integration"),
        ("CURSOR_EFFICIENCY_GUIDE.md", "Complete usage guide"),
        ("MEMORY_BANK_COMPLETE.md", "Implementation status")
    ]
    
    core_passed = 0
    for file_path, description in core_files:
        if (root_path / file_path).exists():
            size = (root_path / file_path).stat().st_size
            print(f"  [PASS] {description}: {file_path} ({size} bytes)")
            core_passed += 1
        else:
            print(f"  [FAIL] {description}: {file_path} - MISSING")
    
    results.append(("Core System Files", core_passed, len(core_files)))
    
    # Test 2: Memory bank structure
    print("\n[2/8] Testing Memory Bank Structure...")
    memory_files = [
        ("memory-bank/activeContext.md", "Active context"),
        ("memory-bank/progress.md", "Progress tracking"),
        ("memory-bank/systemPatterns.md", "System patterns"),
        ("memory-bank/techContext.md", "Technology context"),
        ("memory-bank/productContext.md", "Product context"),
        ("memory-bank/projectbrief.md", "Project brief"),
        ("memory-bank/README.md", "Usage guide"),
        ("memory-bank/codebase-context.md", "Codebase analysis")
    ]
    
    memory_passed = 0
    for file_path, description in memory_files:
        if (root_path / file_path).exists():
            try:
                with open(root_path / file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                if "A1Betting" in content and len(content) > 500:
                    print(f"  [PASS] {description}: Complete with A1Betting context")
                    memory_passed += 1
                else:
                    print(f"  [WARN] {description}: Incomplete or missing context")
            except Exception as e:
                print(f"  [FAIL] {description}: Error reading file - {e}")
        else:
            print(f"  [FAIL] {description}: {file_path} - MISSING")
    
    results.append(("Memory Bank Files", memory_passed, len(memory_files)))
    
    # Test 3: Directory structure
    print("\n[3/8] Testing Directory Structure...")
    required_dirs = [
        (".cursor", "Cursor configuration"),
        (".cursor/rules", "Cursor rules"),
        ("memory-bank", "Memory bank system"),
        ("memory-bank/chat-archives", "Chat archives"),
        ("memory-bank/chat-archives/by-topic", "Topic organization"),
        ("memory-bank/chat-archives/by-date", "Date organization"),
        ("memory-bank/ingested-context", "Ingested context"),
        ("tools", "Automation tools")
    ]
    
    dirs_passed = 0
    for dir_path, description in required_dirs:
        if (root_path / dir_path).exists() and (root_path / dir_path).is_dir():
            print(f"  [PASS] {description}: {dir_path}")
            dirs_passed += 1
        else:
            print(f"  [FAIL] {description}: {dir_path} - MISSING")
    
    results.append(("Directory Structure", dirs_passed, len(required_dirs)))
    
    # Test 4: JSON configuration validity
    print("\n[4/8] Testing JSON Configuration...")
    json_files = [
        (".cursor/modes.json", "Custom agents"),
        (".cursor/settings.json", "IDE settings"),
        ("memory-bank/chat-history-summary.json", "Chat summary")
    ]
    
    json_passed = 0
    for file_path, description in json_files:
        full_path = root_path / file_path
        if full_path.exists():
            try:
                with open(full_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                print(f"  [PASS] {description}: Valid JSON with {len(str(data))} characters")
                json_passed += 1
            except json.JSONDecodeError as e:
                print(f"  [FAIL] {description}: Invalid JSON - {e}")
        else:
            print(f"  [FAIL] {description}: {file_path} - MISSING")
    
    results.append(("JSON Configuration", json_passed, len(json_files)))
    
    # Test 5: Custom agents configuration
    print("\n[5/8] Testing Custom Agents...")
    modes_file = root_path / ".cursor/modes.json"
    if modes_file.exists():
        try:
            with open(modes_file, 'r', encoding='utf-8') as f:
                config = json.load(f)
            
            if "modes" in config:
                agent_count = len(config["modes"])
                expected_agents = [
                    "a1betting-architect",
                    "typescript-repair-specialist", 
                    "ml-performance-engineer",
                    "security-compliance-auditor"
                ]
                
                found_agents = 0
                for agent in expected_agents:
                    if agent in config["modes"]:
                        print(f"  [PASS] Agent configured: {agent}")
                        found_agents += 1
                    else:
                        print(f"  [FAIL] Agent missing: {agent}")
                
                print(f"  [INFO] Total agents configured: {agent_count}")
                results.append(("Custom Agents", found_agents, len(expected_agents)))
            else:
                print("  [FAIL] No 'modes' key in configuration")
                results.append(("Custom Agents", 0, 1))
        except Exception as e:
            print(f"  [FAIL] Error reading modes.json: {e}")
            results.append(("Custom Agents", 0, 1))
    else:
        print("  [FAIL] modes.json not found")
        results.append(("Custom Agents", 0, 1))
    
    # Test 6: RIPER-5 mode system
    print("\n[6/8] Testing RIPER-5 Mode System...")
    cursorrules_file = root_path / ".cursorrules"
    if cursorrules_file.exists():
        try:
            with open(cursorrules_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            riper_elements = [
                ("PLAN MODE", "Planning capabilities"),
                ("EXECUTE MODE", "Execution capabilities"),
                ("memory-bank", "Memory bank integration"),
                ("A1Betting", "Platform context"),
                ("RIPER", "RIPER system")
            ]
            
            riper_passed = 0
            for element, description in riper_elements:
                if element in content:
                    print(f"  [PASS] {description}: Found '{element}'")
                    riper_passed += 1
                else:
                    print(f"  [FAIL] {description}: Missing '{element}'")
            
            results.append(("RIPER-5 System", riper_passed, len(riper_elements)))
        except Exception as e:
            print(f"  [FAIL] Error reading .cursorrules: {e}")
            results.append(("RIPER-5 System", 0, 1))
    else:
        print("  [FAIL] .cursorrules not found")
        results.append(("RIPER-5 System", 0, 1))
    
    # Test 7: Chat archives organization
    print("\n[7/8] Testing Chat Archives...")
    expected_topics = ["betting", "ml", "frontend", "backend", "security"]
    topics_found = 0
    
    for topic in expected_topics:
        topic_dir = root_path / "memory-bank" / "chat-archives" / "by-topic" / topic
        if topic_dir.exists():
            print(f"  [PASS] Topic directory: {topic}")
            topics_found += 1
        else:
            print(f"  [FAIL] Topic directory missing: {topic}")
    
    # Check for actual chat files
    chat_summary = root_path / "memory-bank" / "chat-history-summary.md"
    if chat_summary.exists():
        print("  [PASS] Chat history summary exists")
        topics_found += 1
    else:
        print("  [FAIL] Chat history summary missing")
    
    results.append(("Chat Archives", topics_found, len(expected_topics) + 1))
    
    # Test 8: Security and compliance
    print("\n[8/8] Testing Security Compliance...")
    security_checks = [
        ("NEVER expose betting algorithms", ".cursorrules"),
        ("environment variables", ".cursorrules"),
        ("audit trails", ".cursorrules"),
        ("security-compliance-auditor", ".cursor/modes.json")
    ]
    
    security_passed = 0
    for check, file_path in security_checks:
        full_path = root_path / file_path
        if full_path.exists():
            try:
                with open(full_path, 'r', encoding='utf-8') as f:
                    content = f.read().lower()
                if check.lower() in content:
                    print(f"  [PASS] Security check: {check}")
                    security_passed += 1
                else:
                    print(f"  [FAIL] Security check missing: {check}")
            except Exception as e:
                print(f"  [FAIL] Error checking {file_path}: {e}")
        else:
            print(f"  [FAIL] File not found for security check: {file_path}")
    
    results.append(("Security Compliance", security_passed, len(security_checks)))
    
    # Generate final summary
    print("\n" + "=" * 60)
    print("FINAL VALIDATION SUMMARY")
    print("=" * 60)
    
    total_passed = sum(passed for _, passed, _ in results)
    total_tests = sum(total for _, _, total in results)
    success_rate = (total_passed / total_tests * 100) if total_tests > 0 else 0
    
    for test_name, passed, total in results:
        status = "PASS" if passed == total else "PARTIAL" if passed > 0 else "FAIL"
        print(f"{test_name:25} {passed:3}/{total:3} [{status:7}]")
    
    print("-" * 60)
    print(f"{'OVERALL SYSTEM STATUS':25} {total_passed:3}/{total_tests:3} [{success_rate:5.1f}%]")
    
    # System status determination
    if success_rate >= 90:
        print("\n[PRODUCTION READY] System is fully operational!")
        print("You can start using the Cursor AI efficiency system immediately.")
        print("\nNext steps:")
        print("1. Start a new Cursor chat")
        print("2. Type 'load memory bank' to activate the system")
        print("3. Use specialized agents like '@a1betting-architect'")
        print("4. Try RIPER-5 modes for enhanced development")
        system_ready = True
    elif success_rate >= 70:
        print("\n[MOSTLY READY] System is largely operational with minor issues.")
        print("The system is usable but some optimizations may be missing.")
        print("\nRecommendation: Address failed tests when convenient.")
        system_ready = True
    else:
        print("\n[NEEDS ATTENTION] System has significant issues.")
        print("Multiple critical components are missing or misconfigured.")
        print("\nRecommendation: Fix failed tests before using the system.")
        system_ready = False
    
    # Save detailed results
    try:
        validation_data = {
            "timestamp": datetime.now().isoformat(),
            "success_rate": success_rate,
            "total_passed": total_passed,
            "total_tests": total_tests,
            "system_ready": system_ready,
            "test_results": [
                {
                    "test_name": name,
                    "passed": passed,
                    "total": total,
                    "success_rate": (passed/total*100) if total > 0 else 0
                }
                for name, passed, total in results
            ]
        }
        
        with open(root_path / "validation_results.json", 'w', encoding='utf-8') as f:
            json.dump(validation_data, f, indent=2)
        print(f"\nDetailed results saved to: validation_results.json")
    except Exception as e:
        print(f"\nFailed to save results: {e}")
    
    print("\n" + "=" * 60)
    return system_ready

def main():
    """Main validation execution"""
    try:
        success = test_system_comprehensive()
        sys.exit(0 if success else 1)
    except Exception as e:
        print(f"Validation failed with error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 