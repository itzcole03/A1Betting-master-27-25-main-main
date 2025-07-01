#!/usr/bin/env python3
"""
Extract and analyze chat data from Cursor's value columns
"""

import sqlite3
import json
import os
from pathlib import Path
import re
from datetime import datetime

def extract_from_database(db_path):
    """Extract data from ItemTable and cursorDiskKV tables"""
    try:
        conn = sqlite3.connect(str(db_path))
        cursor = conn.cursor()
        
        results = {
            "database": str(db_path),
            "chat_data": [],
            "total_records": 0
        }
        
        # Check both tables
        for table_name in ["ItemTable", "cursorDiskKV"]:
            try:
                # Get all columns first
                cursor.execute(f"PRAGMA table_info({table_name});")
                columns = [col[1] for col in cursor.fetchall()]
                
                if "value" in columns:
                    # Get all records with their keys if available
                    if "key" in columns:
                        cursor.execute(f"SELECT key, value FROM {table_name};")
                    else:
                        cursor.execute(f"SELECT value FROM {table_name};")
                    
                    rows = cursor.fetchall()
                    results["total_records"] += len(rows)
                    
                    for row in rows:
                        if len(row) == 2:
                            key, value = row
                        else:
                            key = None
                            value = row[0]
                        
                        if value and isinstance(value, str):
                            # Look for chat-related content
                            if is_chat_related(key, value):
                                chat_entry = {
                                    "table": table_name,
                                    "key": key,
                                    "value": value,
                                    "parsed_data": try_parse_json(value)
                                }
                                results["chat_data"].append(chat_entry)
                                
            except Exception as e:
                print(f"Error processing table {table_name}: {e}")
        
        conn.close()
        return results
        
    except Exception as e:
        print(f"Error processing database {db_path}: {e}")
        return None

def is_chat_related(key, value):
    """Check if a key-value pair might contain chat data"""
    if not value:
        return False
    
    # Convert to lowercase for checking
    key_lower = str(key).lower() if key else ""
    value_lower = str(value).lower()
    
    # Check for chat-related keywords in key
    chat_key_indicators = [
        "chat", "conversation", "message", "dialog", "ai", "assistant",
        "cursor", "copilot", "history", "thread", "session"
    ]
    
    if any(indicator in key_lower for indicator in chat_key_indicators):
        return True
    
    # Check for chat-related content in value
    chat_content_indicators = [
        "role", "content", "message", "user", "assistant", "system",
        "conversation", "chat", "ai", "implement", "create", "build",
        "function", "component", "api", "error", "debug", "fix"
    ]
    
    # Look for JSON-like structures that might contain chat data
    if any(indicator in value_lower for indicator in chat_content_indicators):
        # Additional checks for structured data
        if any(pattern in value for pattern in ['"role":', '"content":', '"message":', '"user":', '"assistant":']):
            return True
        
        # Check for code patterns
        if any(pattern in value for pattern in ["```", "function", "const", "import", "export", "class"]):
            return True
        
        # Check for implementation discussion patterns
        if any(pattern in value_lower for pattern in ["how to", "need to", "should", "would", "could", "implement", "create"]):
            return True
    
    return False

def try_parse_json(value):
    """Try to parse a value as JSON"""
    try:
        return json.loads(value)
    except:
        # Try to extract JSON from within the string
        json_pattern = r'\{.*\}'
        matches = re.findall(json_pattern, value, re.DOTALL)
        for match in matches:
            try:
                return json.loads(match)
            except:
                continue
        return None

def main():
    print("Cursor Chat Data Extractor")
    print("=" * 40)
    
    # Focus on the most promising databases
    appdata = os.environ.get('APPDATA', '')
    if not appdata:
        print("APPDATA environment variable not found")
        return
    
    # Start with global storage (highest data volume)
    global_db = Path(appdata) / 'Cursor' / 'User' / 'globalStorage' / 'state.vscdb'
    workspace_storage = Path(appdata) / 'Cursor' / 'User' / 'workspaceStorage'
    
    all_chat_data = []
    
    # Process global storage first
    if global_db.exists():
        print(f"Processing global storage: {global_db}")
        results = extract_from_database(global_db)
        if results and results["chat_data"]:
            all_chat_data.extend(results["chat_data"])
            print(f"  Found {len(results['chat_data'])} chat-related entries out of {results['total_records']} total records")
    
    # Process workspace storage databases
    if workspace_storage.exists():
        print(f"\nProcessing workspace storage databases...")
        for db_file in workspace_storage.rglob("*.vscdb"):
            if db_file.is_file():
                print(f"Processing: {db_file.name}")
                results = extract_from_database(db_file)
                if results and results["chat_data"]:
                    all_chat_data.extend(results["chat_data"])
                    print(f"  Found {len(results['chat_data'])} chat-related entries")
    
    print(f"\nTotal chat-related entries found: {len(all_chat_data)}")
    
    if all_chat_data:
        # Save raw results
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_file = f"extracted_chat_data_{timestamp}.json"
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(all_chat_data, f, indent=2, ensure_ascii=False, default=str)
        
        print(f"Raw chat data saved to: {output_file}")
        
        # Analyze and categorize the data
        print("\nAnalyzing chat data...")
        
        # Group by type
        by_table = {}
        by_key_pattern = {}
        parsed_conversations = []
        
        for entry in all_chat_data:
            # Group by table
            table = entry["table"]
            if table not in by_table:
                by_table[table] = []
            by_table[table].append(entry)
            
            # Group by key pattern
            key = entry["key"] or "no_key"
            key_pattern = extract_key_pattern(key)
            if key_pattern not in by_key_pattern:
                by_key_pattern[key_pattern] = []
            by_key_pattern[key_pattern].append(entry)
            
            # Try to extract conversation data
            parsed = entry["parsed_data"]
            if parsed:
                conversation = extract_conversation_data(parsed)
                if conversation:
                    conversation["source_key"] = entry["key"]
                    conversation["source_table"] = entry["table"]
                    parsed_conversations.append(conversation)
        
        # Print analysis
        print(f"\nData distribution by table:")
        for table, entries in by_table.items():
            print(f"  {table}: {len(entries)} entries")
        
        print(f"\nData distribution by key pattern:")
        for pattern, entries in by_key_pattern.items():
            print(f"  {pattern}: {len(entries)} entries")
        
        print(f"\nParsed conversations: {len(parsed_conversations)}")
        
        # Save organized results
        organized_output = f"organized_chat_data_{timestamp}.json"
        organized_data = {
            "summary": {
                "total_entries": len(all_chat_data),
                "by_table": {table: len(entries) for table, entries in by_table.items()},
                "by_key_pattern": {pattern: len(entries) for pattern, entries in by_key_pattern.items()},
                "parsed_conversations": len(parsed_conversations)
            },
            "conversations": parsed_conversations,
            "raw_data": all_chat_data
        }
        
        with open(organized_output, 'w', encoding='utf-8') as f:
            json.dump(organized_data, f, indent=2, ensure_ascii=False, default=str)
        
        print(f"Organized data saved to: {organized_output}")
        
        # Show sample conversations
        if parsed_conversations:
            print(f"\nSample conversations (showing first 3):")
            for i, conv in enumerate(parsed_conversations[:3]):
                print(f"\n--- Conversation {i+1} ---")
                print(f"Source: {conv.get('source_table', 'unknown')} / {conv.get('source_key', 'unknown')}")
                print(f"Content preview: {str(conv)[:200]}...")
        
        return organized_output
    else:
        print("No chat-related data found. This might mean:")
        print("1. Chat history is stored in a different format")
        print("2. The data has been cleared or is in a different location") 
        print("3. The search criteria need to be adjusted")
        return None

def extract_key_pattern(key):
    """Extract a pattern from a key for grouping"""
    if not key:
        return "no_key"
    
    # Remove specific IDs and keep the pattern
    pattern = re.sub(r'[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}', 'UUID', key)
    pattern = re.sub(r'[a-f0-9]{32,}', 'HASH', pattern)
    pattern = re.sub(r'\d{10,}', 'TIMESTAMP', pattern)
    
    return pattern

def extract_conversation_data(parsed_data):
    """Try to extract conversation-like data from parsed JSON"""
    if not parsed_data:
        return None
    
    conversation = {}
    
    # Handle different data structures
    if isinstance(parsed_data, dict):
        # Look for common conversation patterns
        if "messages" in parsed_data:
            conversation["messages"] = parsed_data["messages"]
        elif "conversation" in parsed_data:
            conversation = parsed_data["conversation"]
        elif "content" in parsed_data:
            conversation["content"] = parsed_data["content"]
        elif "role" in parsed_data and "content" in parsed_data:
            conversation["messages"] = [parsed_data]
        else:
            # Look for any text content that might be chat-related
            for key, value in parsed_data.items():
                if isinstance(value, str) and len(value) > 50:
                    if any(indicator in value.lower() for indicator in ["implement", "create", "function", "component", "error", "fix"]):
                        conversation[key] = value
    
    elif isinstance(parsed_data, list):
        # Check if it's a list of messages
        if all(isinstance(item, dict) and ("content" in item or "message" in item) for item in parsed_data):
            conversation["messages"] = parsed_data
    
    return conversation if conversation else None

if __name__ == "__main__":
    main() 