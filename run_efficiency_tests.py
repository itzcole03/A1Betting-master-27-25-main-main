#!/usr/bin/env python3
"""
A1Betting Cursor AI Efficiency System - Test Runner
Simplified version that will execute comprehensive tests
"""

import os
import json
import sys
from pathlib import Path
from datetime import datetime

def test_system():
    """Run comprehensive system tests"""
    print("A1BETTING CURSOR AI EFFICIENCY SYSTEM - AUTOMATED TESTS")
    print("=" * 60)
    
    root_path = Path.cwd()
    results = []
    
    # Test 1: Core files exist
    print("\n📄 Testing Core Files...")
    core_files = [
        ".cursorrules",
        ".cursor/modes.json", 
        ".cursor/settings.json",
        "memory-bank/activeContext.md",
        "memory-bank/progress.md",
        "CURSOR_EFFICIENCY_GUIDE.md"
    ]
    
    for file_path in core_files:
        if (root_path / file_path).exists():
            size = (root_path / file_path).stat().st_size
            print(f"✅ {file_path} ({size} bytes)")
            results.append(("PASS", file_path, f"{size} bytes"))
        else:
            print(f"❌ {file_path} - MISSING")
            results.append(("FAIL", file_path, "Missing"))
    
    # Test 2: JSON validity
    print("\n🔍 Testing JSON Files...")
    json_files = [".cursor/modes.json", ".cursor/settings.json"]
    
    for file_path in json_files:
        full_path = root_path / file_path
        if full_path.exists():
            try:
                with open(full_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                print(f"✅ {file_path} - Valid JSON")
                results.append(("PASS", f"JSON: {file_path}", "Valid"))
            except json.JSONDecodeError as e:
                print(f"❌ {file_path} - Invalid JSON: {e}")
                results.append(("FAIL", f"JSON: {file_path}", str(e)))
        else:
            print(f"❌ {file_path} - File not found")
            results.append(("FAIL", f"JSON: {file_path}", "Not found"))
    
    # Test 3: Custom agents configuration
    print("\n🤖 Testing Custom Agents...")
    modes_file = root_path / ".cursor/modes.json"
    if modes_file.exists():
        try:
            with open(modes_file, 'r', encoding='utf-8') as f:
                config = json.load(f)
            
            if "modes" in config:
                agent_count = len(config["modes"])
                print(f"✅ Custom agents configured: {agent_count} agents")
                results.append(("PASS", "Custom Agents", f"{agent_count} agents"))
                
                # Check specific agents
                expected_agents = ["a1betting-architect", "typescript-repair-specialist"]
                for agent in expected_agents:
                    if agent in config["modes"]:
                        print(f"  ✅ {agent} - Configured")
                    else:
                        print(f"  ❌ {agent} - Missing")
            else:
                print("❌ No 'modes' key in configuration")
                results.append(("FAIL", "Custom Agents", "No modes key"))
        except Exception as e:
            print(f"❌ Error reading modes.json: {e}")
            results.append(("FAIL", "Custom Agents", str(e)))
    
    # Test 4: Memory bank content
    print("\n🧠 Testing Memory Bank...")
    memory_files = [
        "memory-bank/activeContext.md",
        "memory-bank/systemPatterns.md", 
        "memory-bank/progress.md"
    ]
    
    for file_path in memory_files:
        full_path = root_path / file_path
        if full_path.exists():
            try:
                with open(full_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                if "A1Betting" in content:
                    print(f"✅ {file_path} - Contains A1Betting context")
                    results.append(("PASS", f"Memory: {file_path}", "Has context"))
                else:
                    print(f"⚠️  {file_path} - Missing A1Betting context")
                    results.append(("WARN", f"Memory: {file_path}", "Missing context"))
            except Exception as e:
                print(f"❌ {file_path} - Error reading: {e}")
                results.append(("FAIL", f"Memory: {file_path}", str(e)))
        else:
            print(f"❌ {file_path} - Missing")
            results.append(("FAIL", f"Memory: {file_path}", "Missing"))
    
    # Test 5: RIPER-5 mode system
    print("\n🎯 Testing RIPER-5 Modes...")
    cursorrules_file = root_path / ".cursorrules"
    if cursorrules_file.exists():
        try:
            with open(cursorrules_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            riper_modes = ["RESEARCH", "INNOVATE", "PLAN", "EXECUTE", "REVIEW"]
            found_modes = []
            for mode in riper_modes:
                if f"MODE: {mode}" in content or f"{mode} MODE" in content:
                    found_modes.append(mode)
                    
            if len(found_modes) >= 3:
                print(f"✅ RIPER-5 modes found: {', '.join(found_modes)}")
                results.append(("PASS", "RIPER-5 Modes", f"{len(found_modes)} modes"))
            else:
                print(f"⚠️  Limited RIPER-5 modes: {', '.join(found_modes)}")
                results.append(("WARN", "RIPER-5 Modes", f"Only {len(found_modes)} modes"))
        except Exception as e:
            print(f"❌ Error reading .cursorrules: {e}")
            results.append(("FAIL", "RIPER-5 Modes", str(e)))
    
    # Generate summary
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    
    passed = len([r for r in results if r[0] == "PASS"])
    failed = len([r for r in results if r[0] == "FAIL"])
    warnings = len([r for r in results if r[0] == "WARN"])
    total = len(results)
    
    print(f"Total Tests: {total}")
    print(f"✅ Passed: {passed}")
    print(f"❌ Failed: {failed}")
    print(f"⚠️  Warnings: {warnings}")
    
    success_rate = (passed / total * 100) if total > 0 else 0
    print(f"Success Rate: {success_rate:.1f}%")
    
    # System status
    if failed == 0:
        print("\n🟢 SYSTEM STATUS: PRODUCTION READY")
        print("✅ All critical components are properly configured")
        print("🚀 You can start using the Cursor AI efficiency system!")
    elif failed <= 2:
        print("\n🟡 SYSTEM STATUS: MOSTLY READY")
        print("⚠️  Minor issues detected, but system is usable")
        print("🔧 Review failed tests and fix when convenient")
    else:
        print("\n🔴 SYSTEM STATUS: NEEDS ATTENTION")
        print("❌ Multiple critical issues detected")
        print("🛠️  Fix failed tests before using the system")
    
    # Usage instructions
    print("\n🎯 NEXT STEPS:")
    if failed == 0:
        print("1. Start a new Cursor chat")
        print("2. Type 'load memory bank' to activate the system")
        print("3. Use RIPER-5 modes: 'ENTER RESEARCH MODE'")
        print("4. Try specialized agents: '@a1betting-architect'")
    else:
        print("1. Review failed tests above")
        print("2. Check file permissions and paths")
        print("3. Re-run tests after fixes")
    
    # Save results
    try:
        report_data = {
            "timestamp": datetime.now().isoformat(),
            "total_tests": total,
            "passed": passed,
            "failed": failed,
            "warnings": warnings,
            "success_rate": success_rate,
            "status": "READY" if failed == 0 else "NEEDS_ATTENTION",
            "results": results
        }
        
        with open(root_path / "test_results.json", 'w', encoding='utf-8') as f:
            json.dump(report_data, f, indent=2)
        print(f"\n📄 Detailed results saved to: test_results.json")
    except Exception as e:
        print(f"\n❌ Failed to save results: {e}")
    
    return failed == 0

if __name__ == "__main__":
    success = test_system()
    sys.exit(0 if success else 1) 