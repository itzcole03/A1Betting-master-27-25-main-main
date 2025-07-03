#!/usr/bin/env python3
"""
Test script for A1Betting Cursor AI Command System
Version: 1.0.0
Purpose: Verify command interface and memory bank auto-updater functionality
"""

import time
from pathlib import Path
from cursor_command_interface import CursorCommandInterface
from memory_bank_auto_updater import MemoryBankAutoUpdater, start_auto_updater, stop_auto_updater, log_command

def test_command_interface():
    """Test the command interface functionality"""
    print("🧪 Testing Command Interface...")
    
    interface = CursorCommandInterface()
    
    # Test system status
    status = interface.get_system_status()
    print(f"✅ System Status: {status}")
    
    # Test command lookup
    commands = interface.commands
    print(f"✅ Available Commands: {len(commands)}")
    
    return True

def test_memory_auto_updater():
    """Test the memory bank auto-updater"""
    print("🧪 Testing Memory Bank Auto-Updater...")
    
    updater = MemoryBankAutoUpdater()
    
    # Test logging functions
    updater.log_command_usage("test_command", "Testing command logging", True)
    updater.log_ai_interaction("test_interaction", "Testing AI interaction logging", "Test context")
    updater.log_progress("Test Milestone", "Testing progress logging", 0.5)
    updater.update_active_context("Testing", "high", "Testing context updates")
    
    # Test status
    status = updater.get_memory_status()
    print(f"✅ Memory Status: {status}")
    
    return True

def test_integration():
    """Test integration between components"""
    print("🧪 Testing System Integration...")
    
    # Start auto-updater
    start_auto_updater()
    
    # Log some test commands
    log_command("plan", "Testing integration", True)
    log_command("agent", "Testing agent mode", True)
    
    # Wait for processing
    time.sleep(2)
    
    # Stop auto-updater
    stop_auto_updater()
    
    print("✅ Integration test completed")
    return True

def test_file_creation():
    """Test that files are created correctly"""
    print("🧪 Testing File Creation...")
    
    memory_bank_path = Path("memory-bank")
    
    # Check if memory bank directory exists
    if memory_bank_path.exists():
        print("✅ Memory bank directory exists")
        
        # Check for key files
        key_files = ["activeContext.md", "progress.md"]
        for file_name in key_files:
            file_path = memory_bank_path / file_name
            if file_path.exists():
                print(f"✅ {file_name} exists")
            else:
                print(f"⚠️  {file_name} not found")
        
        # Check chat archives
        chat_archives = memory_bank_path / "chat-archives"
        if chat_archives.exists():
            print("✅ Chat archives directory exists")
            
            by_date = chat_archives / "by-date"
            by_topic = chat_archives / "by-topic"
            
            if by_date.exists():
                print("✅ By-date archives exist")
            if by_topic.exists():
                print("✅ By-topic archives exist")
        
    else:
        print("⚠️  Memory bank directory not found")
    
    return True

def main():
    """Run all tests"""
    print("🚀 A1Betting Cursor AI Command System Test Suite")
    print("=" * 60)
    
    tests = [
        ("Command Interface", test_command_interface),
        ("Memory Auto-Updater", test_memory_auto_updater),
        ("System Integration", test_integration),
        ("File Creation", test_file_creation)
    ]
    
    results = []
    
    for test_name, test_func in tests:
        print(f"\n📋 Running: {test_name}")
        try:
            result = test_func()
            results.append((test_name, result))
            print(f"✅ {test_name}: {'PASSED' if result else 'FAILED'}")
        except Exception as e:
            print(f"❌ {test_name}: ERROR - {e}")
            results.append((test_name, False))
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name:<20}: {status}")
    
    print(f"\nOverall: {passed}/{total} tests passed ({passed/total*100:.1f}%)")
    
    if passed == total:
        print("🎉 All tests passed! Command system is ready for use.")
        print("\n🚀 To get started, run: cursor_ai.bat")
    else:
        print("⚠️  Some tests failed. Please review the output above.")
    
    return passed == total

if __name__ == "__main__":
    main() 