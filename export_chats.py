#!/usr/bin/env python3
"""
Cursor Chat History Export Tool
Searches through SQLite databases in Cursor's workspace storage to find and export chat history.
"""

import sqlite3
import os
import json
import argparse
import re
from datetime import datetime, timedelta
from pathlib import Path
import sys

class CursorChatExporter:
    def __init__(self, storage_path=None):
        """Initialize the chat exporter with the workspace storage path."""
        if storage_path is None:
            # Default Windows path for Cursor workspace storage
            self.storage_path = Path(os.environ.get('APPDATA', '')) / 'Cursor' / 'User' / 'workspaceStorage'
        else:
            self.storage_path = Path(storage_path)
        
        if not self.storage_path.exists():
            print(f"Warning: Storage path does not exist: {self.storage_path}")
    
    def find_sqlite_databases(self):
        """Find all SQLite database files in the workspace storage."""
        db_files = []
        
        if not self.storage_path.exists():
            return db_files
        
        # Search for common SQLite file patterns
        patterns = ['*.db', '*.sqlite', '*.sqlite3', '*state.vscdb']
        
        for pattern in patterns:
            db_files.extend(self.storage_path.rglob(pattern))
        
        # Also check for files without extensions that might be SQLite
        for file_path in self.storage_path.rglob('*'):
            if file_path.is_file() and not file_path.suffix:
                try:
                    # Quick check if it's a SQLite file
                    with open(file_path, 'rb') as f:
                        header = f.read(16)
                        if header.startswith(b'SQLite format 3'):
                            db_files.append(file_path)
                except:
                    pass
        
        return list(set(db_files))  # Remove duplicates
    
    def analyze_database_structure(self, db_path):
        """Analyze the structure of a SQLite database to find chat-related tables."""
        try:
            conn = sqlite3.connect(str(db_path))
            cursor = conn.cursor()
            
            # Get all table names
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
            tables = [row[0] for row in cursor.fetchall()]
            
            chat_tables = []
            for table in tables:
                # Look for tables that might contain chat data
                if any(keyword in table.lower() for keyword in ['chat', 'message', 'conversation', 'history', 'dialog']):
                    chat_tables.append(table)
                    continue
                
                # Analyze table structure for chat-like columns
                try:
                    cursor.execute(f"PRAGMA table_info({table});")
                    columns = [col[1].lower() for col in cursor.fetchall()]
                    
                    chat_indicators = ['message', 'content', 'text', 'timestamp', 'created', 'user', 'role']
                    if any(indicator in ' '.join(columns) for indicator in chat_indicators):
                        chat_tables.append(table)
                except:
                    pass
            
            conn.close()
            return chat_tables
        
        except Exception as e:
            print(f"Error analyzing database {db_path}: {e}")
            return []
    
    def search_table_content(self, db_path, table_name, keywords=None, start_date=None, end_date=None):
        """Search for content in a specific table."""
        try:
            conn = sqlite3.connect(str(db_path))
            cursor = conn.cursor()
            
            # Get table schema
            cursor.execute(f"PRAGMA table_info({table_name});")
            columns_info = cursor.fetchall()
            columns = [col[1] for col in columns_info]
            
            # Build search query
            query = f"SELECT * FROM {table_name}"
            conditions = []
            params = []
            
            # Add keyword search conditions
            if keywords:
                text_columns = []
                for col in columns:
                    if any(text_type in str(col).lower() for text_type in ['text', 'content', 'message', 'data', 'value']):
                        text_columns.append(col)
                
                if text_columns:
                    keyword_conditions = []
                    for keyword in keywords:
                        for col in text_columns:
                            keyword_conditions.append(f"{col} LIKE ?")
                            params.append(f"%{keyword}%")
                    
                    if keyword_conditions:
                        conditions.append(f"({' OR '.join(keyword_conditions)})")
            
            # Add date range conditions
            if start_date or end_date:
                date_columns = []
                for col in columns:
                    if any(date_type in str(col).lower() for date_type in ['date', 'time', 'created', 'updated', 'timestamp']):
                        date_columns.append(col)
                
                for col in date_columns:
                    if start_date:
                        conditions.append(f"{col} >= ?")
                        params.append(start_date.timestamp() * 1000)  # Try milliseconds first
                    if end_date:
                        conditions.append(f"{col} <= ?")
                        params.append(end_date.timestamp() * 1000)
            
            if conditions:
                query += " WHERE " + " AND ".join(conditions)
            
            query += " ORDER BY rowid DESC LIMIT 1000"  # Limit results
            
            cursor.execute(query, params)
            results = cursor.fetchall()
            
            # Convert to dictionaries
            formatted_results = []
            for row in results:
                row_dict = {}
                for i, value in enumerate(row):
                    row_dict[columns[i]] = value
                formatted_results.append(row_dict)
            
            conn.close()
            return formatted_results
        
        except Exception as e:
            print(f"Error searching table {table_name} in {db_path}: {e}")
            return []
    
    def export_chat_history(self, keywords=None, start_date=None, end_date=None, output_file=None):
        """Export chat history based on search criteria."""
        if output_file is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            output_file = f"cursor_chat_export_{timestamp}.json"
        
        print(f"Searching for SQLite databases in: {self.storage_path}")
        
        db_files = self.find_sqlite_databases()
        print(f"Found {len(db_files)} potential database files")
        
        all_results = {
            "export_info": {
                "timestamp": datetime.now().isoformat(),
                "search_keywords": keywords or [],
                "start_date": start_date.isoformat() if start_date else None,
                "end_date": end_date.isoformat() if end_date else None,
                "databases_searched": len(db_files)
            },
            "results": []
        }
        
        for db_file in db_files:
            print(f"\nAnalyzing database: {db_file}")
            
            chat_tables = self.analyze_database_structure(db_file)
            if not chat_tables:
                print(f"  No chat-related tables found")
                continue
            
            print(f"  Found {len(chat_tables)} potential chat tables: {chat_tables}")
            
            db_results = {
                "database_path": str(db_file),
                "tables": {}
            }
            
            for table in chat_tables:
                print(f"  Searching table: {table}")
                
                table_results = self.search_table_content(
                    db_file, table, keywords, start_date, end_date
                )
                
                if table_results:
                    print(f"    Found {len(table_results)} matching records")
                    db_results["tables"][table] = table_results
                else:
                    print(f"    No matching records found")
            
            if db_results["tables"]:
                all_results["results"].append(db_results)
        
        # Save results
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(all_results, f, indent=2, ensure_ascii=False, default=str)
        
        print(f"\nExport completed. Results saved to: {output_file}")
        
        # Print summary
        total_records = sum(
            len(records) for db in all_results["results"] 
            for records in db["tables"].values()
        )
        print(f"Total records found: {total_records}")
        
        return output_file

def main():
    parser = argparse.ArgumentParser(description="Export Cursor chat history from workspace storage")
    parser.add_argument("--storage-path", help="Custom path to workspace storage directory")
    parser.add_argument("--keywords", nargs="+", help="Keywords to search for in chat content")
    parser.add_argument("--start-date", help="Start date (YYYY-MM-DD)")
    parser.add_argument("--end-date", help="End date (YYYY-MM-DD)")
    parser.add_argument("--days-back", type=int, help="Search N days back from today")
    parser.add_argument("--output", help="Output file name")
    
    args = parser.parse_args()
    
    # Parse dates
    start_date = None
    end_date = None
    
    if args.start_date:
        start_date = datetime.strptime(args.start_date, "%Y-%m-%d")
    
    if args.end_date:
        end_date = datetime.strptime(args.end_date, "%Y-%m-%d")
    
    if args.days_back:
        end_date = datetime.now()
        start_date = end_date - timedelta(days=args.days_back)
    
    # Create exporter and run
    exporter = CursorChatExporter(args.storage_path)
    
    print("Cursor Chat History Exporter")
    print("=" * 40)
    
    if args.keywords:
        print(f"Keywords: {', '.join(args.keywords)}")
    if start_date:
        print(f"Start date: {start_date.strftime('%Y-%m-%d')}")
    if end_date:
        print(f"End date: {end_date.strftime('%Y-%m-%d')}")
    
    output_file = exporter.export_chat_history(
        keywords=args.keywords,
        start_date=start_date,
        end_date=end_date,
        output_file=args.output
    )
    
    print(f"\nTo clean and organize the exported data, run:")
    print(f"node clean_history.js {output_file}")

if __name__ == "__main__":
    main() 