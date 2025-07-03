#!/usr/bin/env python3
"""
Chat History Processor for A1Betting Platform
Integrates with existing export_chats.py and organizes conversations for agent memory
"""

import os
import json
import sqlite3
import hashlib
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Any, Optional
import re

class ChatHistoryProcessor:
    def __init__(self, memory_bank_path: str = "memory-bank"):
        self.memory_bank = Path(memory_bank_path)
        self.chat_archives = self.memory_bank / "chat-archives"
        self.by_date = self.chat_archives / "by-date"
        self.by_topic = self.chat_archives / "by-topic"
        self.supervisor = self.chat_archives / "supervisor-coordination"
        
        # Create all directories
        for dir_path in [self.by_date, self.by_topic, self.supervisor]:
            dir_path.mkdir(parents=True, exist_ok=True)
        
        # Topic categories for A1Betting
        self.topics = {
            "betting": ["betting", "financial", "calculation", "prizepicks", "odds", "wager"],
            "ml": ["machine learning", "tensorflow", "model", "prediction", "accuracy", "training"],
            "frontend": ["react", "typescript", "component", "ui", "frontend", "vite", "quantum"],
            "backend": ["fastapi", "python", "api", "backend", "server", "database", "sqlite"],
            "security": ["security", "auth", "encryption", "validation", "audit", "protection"],
            "errors": ["error", "bug", "fix", "debug", "typescript", "compilation", "`,`n"],
            "architecture": ["architecture", "pattern", "design", "structure", "sophisticated"],
            "integration": ["integration", "api", "websocket", "real-time", "sync"],
            "performance": ["performance", "optimization", "speed", "build", "memory"],
            "agent": ["agent", "supervisor", "coordination", "memory", "context", "cursor"]
        }
    
    def process_existing_chats(self):
        """Process existing chat files from supervisor_chats directory"""
        
        print("Processing existing chat history...")
        
        # Process supervisor chats
        supervisor_files = list(Path("supervisor_chats").glob("*.txt"))
        
        for chat_file in supervisor_files:
            print(f"Processing: {chat_file}")
            self.process_supervisor_chat(chat_file)
        
        # Look for other chat sources
        self.find_and_process_cursor_chats()
        
        print("Chat history processing completed")
    
    def process_supervisor_chat(self, file_path: Path):
        """Process a supervisor chat file"""
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract metadata from filename
            filename = file_path.stem
            if "conversations" in filename:
                parts = filename.split("_")
                if len(parts) >= 3:
                    date_str = parts[-1]
                    chat_type = "conversations"
                else:
                    date_str = datetime.now().strftime("%Y%m%d")
                    chat_type = "conversations"
            else:
                date_str = datetime.now().strftime("%Y%m%d")
                chat_type = "general"
            
            # Create chat record
            chat_record = {
                "source_file": str(file_path),
                "date": date_str,
                "type": chat_type,
                "content": content,
                "topics": self.categorize_content(content),
                "summary": self.create_summary(content),
                "processed_at": datetime.now().isoformat()
            }
            
            # Save by date
            date_dir = self.by_date / date_str
            date_dir.mkdir(exist_ok=True)
            
            date_file = date_dir / f"{chat_type}_{filename}.json"
            with open(date_file, 'w', encoding='utf-8') as f:
                json.dump(chat_record, f, indent=2)
            
            # Save by topic
            for topic in chat_record["topics"]:
                topic_dir = self.by_topic / topic
                topic_dir.mkdir(exist_ok=True)
                
                topic_file = topic_dir / f"{date_str}_{filename}.json"
                with open(topic_file, 'w', encoding='utf-8') as f:
                    json.dump(chat_record, f, indent=2)
            
            # Save supervisor coordination
            if "supervisor" in filename.lower() or "coordination" in content.lower():
                supervisor_file = self.supervisor / f"{date_str}_{filename}.json"
                with open(supervisor_file, 'w', encoding='utf-8') as f:
                    json.dump(chat_record, f, indent=2)
            
            print(f"✅ Processed: {filename} -> Topics: {', '.join(chat_record['topics'])}")
            
        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")
    
    def find_and_process_cursor_chats(self):
        """Find and process Cursor chat files"""
        
        print("🔍 Looking for Cursor chat files...")
        
        # Common Cursor chat locations
        cursor_locations = [
            Path.home() / ".cursor" / "chats",
            Path.home() / "AppData" / "Roaming" / "Cursor" / "chats",
            Path.home() / "Library" / "Application Support" / "Cursor" / "chats",
            Path("~/.cursor/chats").expanduser(),
            Path("./cursor-chats"),  # Local export directory
        ]
        
        for location in cursor_locations:
            if location.exists():
                print(f"Found Cursor chat directory: {location}")
                self.process_cursor_directory(location)
    
    def process_cursor_directory(self, cursor_dir: Path):
        """Process a directory of Cursor chat files"""
        
        # Look for various file types
        chat_files = []
        for pattern in ["*.json", "*.txt", "*.md", "*.sqlite", "*.db"]:
            chat_files.extend(list(cursor_dir.glob(pattern)))
        
        for chat_file in chat_files:
            try:
                if chat_file.suffix.lower() == '.json':
                    self.process_cursor_json(chat_file)
                elif chat_file.suffix.lower() in ['.sqlite', '.db']:
                    self.process_cursor_sqlite(chat_file)
                elif chat_file.suffix.lower() in ['.txt', '.md']:
                    self.process_cursor_text(chat_file)
                    
            except Exception as e:
                print(f"❌ Error processing {chat_file}: {e}")
    
    def process_cursor_json(self, file_path: Path):
        """Process Cursor JSON chat file"""
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # Extract conversation content
            content = self.extract_json_content(data)
            if content:
                self.create_chat_record(file_path, content, "cursor_json")
                
        except Exception as e:
            print(f"❌ Error processing JSON {file_path}: {e}")
    
    def process_cursor_sqlite(self, file_path: Path):
        """Process Cursor SQLite chat database"""
        
        try:
            conn = sqlite3.connect(file_path)
            cursor = conn.cursor()
            
            # Try common table names
            tables = ["conversations", "chats", "messages", "history"]
            
            for table in tables:
                try:
                    cursor.execute(f"SELECT * FROM {table}")
                    rows = cursor.fetchall()
                    
                    if rows:
                        content = self.extract_sqlite_content(rows)
                        if content:
                            self.create_chat_record(file_path, content, "cursor_sqlite")
                        break
                        
                except sqlite3.Error:
                    continue
            
            conn.close()
            
        except Exception as e:
            print(f"❌ Error processing SQLite {file_path}: {e}")
    
    def process_cursor_text(self, file_path: Path):
        """Process Cursor text chat file"""
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if content.strip():
                self.create_chat_record(file_path, content, "cursor_text")
                
        except Exception as e:
            print(f"❌ Error processing text {file_path}: {e}")
    
    def extract_json_content(self, data: Any) -> str:
        """Extract readable content from JSON chat data"""
        
        content_parts = []
        
        if isinstance(data, dict):
            # Look for common chat fields
            for field in ["messages", "conversation", "content", "text"]:
                if field in data:
                    content_parts.append(self.extract_json_content(data[field]))
            
            # Look for message content
            if "role" in data and "content" in data:
                content_parts.append(f"{data['role']}: {data['content']}")
        
        elif isinstance(data, list):
            for item in data:
                content_parts.append(self.extract_json_content(item))
        
        elif isinstance(data, str):
            content_parts.append(data)
        
        return "\n".join(filter(None, content_parts))
    
    def extract_sqlite_content(self, rows: List[tuple]) -> str:
        """Extract readable content from SQLite rows"""
        
        content_parts = []
        
        for row in rows:
            # Convert row to string, filtering out None values
            row_content = " | ".join(str(item) for item in row if item is not None)
            if row_content:
                content_parts.append(row_content)
        
        return "\n".join(content_parts)
    
    def create_chat_record(self, file_path: Path, content: str, source_type: str):
        """Create a standardized chat record"""
        
        # Generate unique ID
        chat_id = hashlib.md5(f"{file_path}{content[:100]}".encode()).hexdigest()[:8]
        
        # Extract date from filename or use current date
        date_match = re.search(r'(\d{8})', file_path.name)
        date_str = date_match.group(1) if date_match else datetime.now().strftime("%Y%m%d")
        
        chat_record = {
            "id": chat_id,
            "source_file": str(file_path),
            "source_type": source_type,
            "date": date_str,
            "content": content,
            "topics": self.categorize_content(content),
            "summary": self.create_summary(content),
            "processed_at": datetime.now().isoformat()
        }
        
        # Save by date
        date_dir = self.by_date / date_str
        date_dir.mkdir(exist_ok=True)
        
        date_file = date_dir / f"{source_type}_{chat_id}.json"
        with open(date_file, 'w', encoding='utf-8') as f:
            json.dump(chat_record, f, indent=2)
        
        # Save by topic
        for topic in chat_record["topics"]:
            topic_dir = self.by_topic / topic
            topic_dir.mkdir(exist_ok=True)
            
            topic_file = topic_dir / f"{date_str}_{chat_id}.json"
            with open(topic_file, 'w', encoding='utf-8') as f:
                json.dump(chat_record, f, indent=2)
        
        print(f"✅ Created record: {chat_id} -> Topics: {', '.join(chat_record['topics'])}")
    
    def categorize_content(self, content: str) -> List[str]:
        """Categorize content based on A1Betting topics"""
        
        content_lower = content.lower()
        found_topics = []
        
        for topic, keywords in self.topics.items():
            if any(keyword in content_lower for keyword in keywords):
                found_topics.append(topic)
        
        return found_topics if found_topics else ["general"]
    
    def create_summary(self, content: str) -> str:
        """Create a brief summary of the content"""
        
        # Extract first few lines or first paragraph
        lines = content.split('\n')
        summary_lines = []
        
        for line in lines[:10]:  # First 10 lines
            if line.strip():
                summary_lines.append(line.strip())
                if len(summary_lines) >= 3:  # Max 3 lines
                    break
        
        summary = " ".join(summary_lines)
        
        # Truncate if too long
        if len(summary) > 200:
            summary = summary[:197] + "..."
        
        return summary
    
    def create_topic_indices(self):
        """Create topic indices for easy navigation"""
        
        print("📋 Creating topic indices...")
        
        for topic in self.topics.keys():
            topic_dir = self.by_topic / topic
            if topic_dir.exists():
                topic_files = list(topic_dir.glob("*.json"))
                
                index = {
                    "topic": topic,
                    "total_conversations": len(topic_files),
                    "files": [str(f.name) for f in topic_files],
                    "created_at": datetime.now().isoformat()
                }
                
                index_file = topic_dir / "index.json"
                with open(index_file, 'w', encoding='utf-8') as f:
                    json.dump(index, f, indent=2)
        
        print("✅ Topic indices created")
    
    def generate_memory_summary(self):
        """Generate overall memory summary for agents"""
        
        print("📊 Generating memory summary...")
        
        # Count conversations by topic
        topic_counts = {}
        total_conversations = 0
        
        for topic in self.topics.keys():
            topic_dir = self.by_topic / topic
            if topic_dir.exists():
                count = len(list(topic_dir.glob("*.json")))
                topic_counts[topic] = count
                total_conversations += count
        
        # Generate summary
        summary = {
            "total_conversations": total_conversations,
            "topic_distribution": topic_counts,
            "date_range": self.get_date_range(),
            "generated_at": datetime.now().isoformat(),
            "memory_bank_structure": {
                "by_date": str(self.by_date),
                "by_topic": str(self.by_topic),
                "supervisor_coordination": str(self.supervisor)
            }
        }
        
        # Save summary
        summary_file = self.memory_bank / "chat-history-summary.json"
        with open(summary_file, 'w', encoding='utf-8') as f:
            json.dump(summary, f, indent=2)
        
        # Create markdown summary for easy reading
        md_summary = f"""# A1Betting Chat History Summary

Generated: {summary['generated_at']}

## Overview
- **Total Conversations**: {summary['total_conversations']}
- **Date Range**: {summary['date_range']}

## Topic Distribution
"""
        
        for topic, count in sorted(topic_counts.items(), key=lambda x: x[1], reverse=True):
            md_summary += f"- **{topic.title()}**: {count} conversations\n"
        
        md_summary += f"""
## Memory Bank Structure
- **By Date**: `{self.by_date}`
- **By Topic**: `{self.by_topic}`
- **Supervisor Coordination**: `{self.supervisor}`

## Usage for Agents
This chat history provides context for:
- Previous problem-solving approaches
- Established architectural decisions
- Successful patterns and solutions
- Multi-agent coordination strategies
- A1Betting platform evolution

Access conversations by topic or date to understand context before making decisions.
"""
        
        md_file = self.memory_bank / "chat-history-summary.md"
        with open(md_file, 'w', encoding='utf-8') as f:
            f.write(md_summary)
        
        print(f"✅ Memory summary generated: {total_conversations} conversations processed")
        return summary
    
    def get_date_range(self) -> str:
        """Get the date range of processed conversations"""
        
        dates = []
        for date_dir in self.by_date.iterdir():
            if date_dir.is_dir():
                dates.append(date_dir.name)
        
        if dates:
            dates.sort()
            return f"{dates[0]} to {dates[-1]}"
        else:
            return "No dates found"

def main():
    """Main execution function"""
    print("A1Betting Chat History Processor")
    print("=" * 50)
    
    processor = ChatHistoryProcessor()
    
    # Process existing chats
    processor.process_existing_chats()
    
    # Create indices and summaries
    processor.create_topic_indices()
    summary = processor.generate_memory_summary()
    
    print("\n✅ Chat history processing completed!")
    print(f"📊 Total conversations: {summary['total_conversations']}")
    print(f"📁 Memory bank organized in: memory-bank/chat-archives/")
    print(f"📋 Summary available: memory-bank/chat-history-summary.md")

if __name__ == "__main__":
    main() 