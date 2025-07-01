#!/usr/bin/env python3
"""
Extract supervisor/coordinator chat conversations from Cursor's databases
Focus on conversations where Cursor AI was supervising or coordinating AI agent work
"""

import sqlite3
import json
import os
from pathlib import Path
from datetime import datetime
import re

def is_supervisor_conversation(key, value):
    """Check if a conversation involves AI supervision or coordination"""
    if not value or not isinstance(value, str):
        return False
    
    key_lower = str(key).lower() if key else ""
    value_lower = value.lower()
    
    # Supervisor/coordinator keywords in key
    supervisor_key_indicators = [
        "supervisor", "coordinate", "orchestrat", "manage", "direct",
        "agent", "copilot", "ai", "assistant", "chat", "conversation"
    ]
    
    if any(indicator in key_lower for indicator in supervisor_key_indicators):
        return True
    
    # Look for supervisor conversation patterns in content
    supervisor_patterns = [
        # Direct supervision language
        r"let me help you coordinate",
        r"i'll supervise", r"i'll oversee", r"i'll guide",
        r"as your supervisor", r"coordinating with",
        r"managing the", r"orchestrating",
        
        # Agent coordination patterns
        r"agent.*work", r"copilot.*agent", r"ai.*agent",
        r"coordinate.*agent", r"supervise.*agent",
        r"manage.*copilot", r"direct.*ai",
        
        # Task delegation patterns
        r"delegate.*to", r"assign.*task", r"coordinate.*task",
        r"oversee.*implementation", r"guide.*development",
        
        # Multi-agent patterns
        r"multiple.*agent", r"team.*agent", r"agent.*collaboration",
        r"agent.*coordination", r"agent.*management",
        
        # Workflow supervision
        r"workflow.*coordination", r"process.*supervision",
        r"step.*by.*step.*guidance", r"coordinated.*approach",
        
        # Meta-conversations about AI work
        r"how.*should.*we.*approach", r"let.*me.*coordinate.*this",
        r"i'll.*manage.*the.*workflow", r"coordinating.*our.*efforts"
    ]
    
    # Check for supervisor patterns
    for pattern in supervisor_patterns:
        if re.search(pattern, value_lower):
            return True
    
    # Look for structured conversations with role-based coordination
    if any(phrase in value_lower for phrase in [
        "role:", "assistant:", "supervisor:", "coordinator:",
        "agent_role", "coordination", "supervision", "orchestration"
    ]):
        # Additional checks for actual coordination content
        if any(coord_word in value_lower for coord_word in [
            "coordinate", "supervise", "manage", "direct", "guide",
            "orchestrate", "delegate", "assign", "oversee"
        ]):
            return True
    
    # Look for conversations about AI agent development/management
    ai_agent_patterns = [
        r"ai.*agent.*development", r"copilot.*agent.*work",
        r"agent.*implementation", r"multi.*agent.*system",
        r"agent.*coordination.*system", r"ai.*workflow.*management"
    ]
    
    for pattern in ai_agent_patterns:
        if re.search(pattern, value_lower):
            return True
    
    return False

def extract_supervisor_conversations():
    """Extract conversations where AI was acting as supervisor"""
    print("Extracting Supervisor/Coordinator Chat Conversations")
    print("=" * 60)
    
    appdata = os.environ.get('APPDATA', '')
    if not appdata:
        print("APPDATA environment variable not found")
        return []
    
    # Focus on databases most likely to contain chat data
    global_db = Path(appdata) / 'Cursor' / 'User' / 'globalStorage' / 'state.vscdb'
    workspace_storage = Path(appdata) / 'Cursor' / 'User' / 'workspaceStorage'
    
    supervisor_conversations = []
    
    # Process global storage first (highest likelihood)
    if global_db.exists():
        print(f"Processing global storage: {global_db}")
        conversations = extract_from_database(global_db)
        supervisor_conversations.extend(conversations)
        print(f"  Found {len(conversations)} supervisor conversations")
    
    # Process workspace storage databases
    if workspace_storage.exists():
        print(f"\nProcessing workspace storage databases...")
        processed_count = 0
        for db_file in workspace_storage.rglob("*.vscdb"):
            if db_file.is_file():
                conversations = extract_from_database(db_file)
                if conversations:
                    supervisor_conversations.extend(conversations)
                    print(f"  {db_file.name}: {len(conversations)} supervisor conversations")
                processed_count += 1
                
                # Limit processing to avoid overwhelming output
                if processed_count >= 10:
                    print(f"  ... (processed first 10 databases)")
                    break
    
    return supervisor_conversations

def extract_from_database(db_path):
    """Extract supervisor conversations from a single database"""
    try:
        conn = sqlite3.connect(str(db_path))
        cursor = conn.cursor()
        
        supervisor_conversations = []
        
        # Check both main tables
        for table_name in ["ItemTable", "cursorDiskKV"]:
            try:
                # Get table schema
                cursor.execute(f"PRAGMA table_info({table_name});")
                columns = [col[1] for col in cursor.fetchall()]
                
                if "value" in columns:
                    # Get records with keys if available
                    if "key" in columns:
                        cursor.execute(f"SELECT key, value FROM {table_name};")
                    else:
                        cursor.execute(f"SELECT value FROM {table_name};")
                    
                    rows = cursor.fetchall()
                    
                    for row in rows:
                        if len(row) == 2:
                            key, value = row
                        else:
                            key = None
                            value = row[0]
                        
                        if value and isinstance(value, str):
                            if is_supervisor_conversation(key, value):
                                conversation = {
                                    "database": str(db_path),
                                    "table": table_name,
                                    "key": key,
                                    "value": value,
                                    "parsed_data": try_parse_json(value),
                                    "relevance_score": calculate_supervisor_relevance(key, value)
                                }
                                supervisor_conversations.append(conversation)
                                
            except Exception as e:
                print(f"  Error processing table {table_name}: {e}")
        
        conn.close()
        return supervisor_conversations
        
    except Exception as e:
        print(f"  Error processing database {db_path}: {e}")
        return []

def try_parse_json(value):
    """Try to parse JSON data"""
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

def calculate_supervisor_relevance(key, value):
    """Calculate relevance score for supervisor conversations"""
    score = 0
    
    key_lower = str(key).lower() if key else ""
    value_lower = str(value).lower()
    
    # High-value supervisor keywords
    high_value_keywords = [
        "supervisor", "coordinate", "orchestrate", "manage workflow",
        "agent coordination", "copilot supervision", "ai management"
    ]
    score += sum(10 for keyword in high_value_keywords if keyword in value_lower)
    
    # Medium-value coordination keywords
    medium_value_keywords = [
        "coordinate", "supervise", "manage", "direct", "guide",
        "orchestrate", "delegate", "assign", "oversee"
    ]
    score += sum(5 for keyword in medium_value_keywords if keyword in value_lower)
    
    # Agent-related keywords
    agent_keywords = [
        "agent", "copilot", "ai assistant", "multi-agent", "agent work"
    ]
    score += sum(3 for keyword in agent_keywords if keyword in value_lower)
    
    # Workflow/process keywords
    workflow_keywords = [
        "workflow", "process", "step by step", "coordination", "collaboration"
    ]
    score += sum(2 for keyword in workflow_keywords if keyword in value_lower)
    
    # Bonus for structured conversations
    if any(pattern in value for pattern in ['"role":', '"content":', '"message":']):
        score += 5
    
    # Bonus for code/implementation discussions
    if "```" in value or any(code_word in value_lower for code_word in ["function", "class", "import", "def "]):
        score += 3
    
    # Length bonus (longer conversations often more valuable)
    if len(value) > 1000:
        score += 2
    if len(value) > 2000:
        score += 3
    
    return score

def save_supervisor_conversations(conversations, output_dir="supervisor_chats"):
    """Save supervisor conversations to organized files"""
    output_path = Path(output_dir)
    output_path.mkdir(exist_ok=True)
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Sort by relevance score
    conversations.sort(key=lambda x: x['relevance_score'], reverse=True)
    
    # Save top conversations
    top_conversations = conversations[:100]  # Top 100 most relevant
    
    # Save JSON data
    with open(output_path / f"supervisor_conversations_{timestamp}.json", 'w', encoding='utf-8') as f:
        json.dump(top_conversations, f, indent=2, ensure_ascii=False, default=str)
    
    # Save readable text format
    with open(output_path / f"supervisor_conversations_{timestamp}.txt", 'w', encoding='utf-8') as f:
        f.write("Supervisor/Coordinator Chat Conversations\n")
        f.write("=" * 60 + "\n\n")
        f.write(f"Total conversations found: {len(conversations)}\n")
        f.write(f"Showing top {min(50, len(conversations))} most relevant conversations\n\n")
        
        for i, conv in enumerate(conversations[:50]):
            f.write(f"=== Conversation {i+1} (Score: {conv['relevance_score']}) ===\n")
            f.write(f"Database: {Path(conv['database']).name}\n")
            f.write(f"Table: {conv['table']}\n")
            f.write(f"Key: {conv['key']}\n\n")
            
            # Clean and format the content
            content = conv['value']
            if len(content) > 2000:
                content = content[:2000] + "... [truncated]"
            
            f.write(f"Content:\n{content}\n\n")
            f.write("=" * 80 + "\n\n")
    
    # Create summary
    summary = {
        "total_conversations": len(conversations),
        "top_10_scores": [conv['relevance_score'] for conv in conversations[:10]],
        "databases_processed": len(set(conv['database'] for conv in conversations)),
        "timestamp": timestamp
    }
    
    with open(output_path / f"supervisor_summary_{timestamp}.json", 'w', encoding='utf-8') as f:
        json.dump(summary, f, indent=2)
    
    # Readable summary
    with open(output_path / f"supervisor_summary_{timestamp}.txt", 'w', encoding='utf-8') as f:
        f.write("Supervisor Chat Recovery Summary\n")
        f.write("=" * 40 + "\n\n")
        f.write(f"Recovery Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write(f"Total supervisor conversations found: {len(conversations)}\n")
        f.write(f"Databases processed: {summary['databases_processed']}\n")
        f.write(f"Top 10 relevance scores: {summary['top_10_scores']}\n\n")
        
        f.write("What to look for in these conversations:\n")
        f.write("- AI coordination and supervision discussions\n")
        f.write("- Multi-agent workflow management\n")
        f.write("- Task delegation and orchestration\n")
        f.write("- AI agent development guidance\n")
        f.write("- Collaborative AI work patterns\n\n")
        
        f.write("Files created:\n")
        f.write(f"- supervisor_conversations_{timestamp}.json (structured data)\n")
        f.write(f"- supervisor_conversations_{timestamp}.txt (readable format)\n")
        f.write(f"- supervisor_summary_{timestamp}.txt (this summary)\n")
    
    print(f"\nSupervisor conversations saved to: {output_path}")
    return output_path

def main():
    print("Cursor Supervisor Chat Recovery Tool")
    print("=" * 50)
    print("Extracting conversations where Cursor AI acted as supervisor/coordinator")
    print()
    
    # Extract supervisor conversations
    conversations = extract_supervisor_conversations()
    
    if not conversations:
        print("\nNo supervisor conversations found.")
        print("This might mean:")
        print("1. The conversations use different terminology")
        print("2. They're stored in a different format")
        print("3. The data has been cleared")
        return
    
    print(f"\nTotal supervisor conversations found: {len(conversations)}")
    
    # Show top few examples
    conversations.sort(key=lambda x: x['relevance_score'], reverse=True)
    print(f"\nTop 3 relevance scores: {[conv['relevance_score'] for conv in conversations[:3]]}")
    
    # Save the conversations
    output_path = save_supervisor_conversations(conversations)
    
    print(f"\n🎉 Supervisor chat recovery complete!")
    print(f"📁 Results saved to: {output_path}")
    print("\n📋 Next steps:")
    print("1. Review supervisor_summary_*.txt for an overview")
    print("2. Read supervisor_conversations_*.txt for the actual conversations")
    print("3. Use supervisor_conversations_*.json for detailed analysis")
    print("\n💡 Focus on the highest-scoring conversations first - they're most likely")
    print("   to contain the supervisor/coordinator interactions you're looking for!")

if __name__ == "__main__":
    main() 