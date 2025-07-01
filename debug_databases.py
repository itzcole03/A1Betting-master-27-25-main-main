#!/usr/bin/env python3
"""
Debug script to examine SQLite database structures in Cursor storage
"""

import sqlite3
import os
import json
from pathlib import Path

def examine_database(db_path):
    """Examine a single database and return its structure"""
    try:
        conn = sqlite3.connect(str(db_path))
        cursor = conn.cursor()
        
        # Get all table names
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = [row[0] for row in cursor.fetchall()]
        
        db_info = {
            "path": str(db_path),
            "tables": {}
        }
        
        for table in tables:
            try:
                # Get table schema
                cursor.execute(f"PRAGMA table_info({table});")
                columns = cursor.fetchall()
                
                # Get row count
                cursor.execute(f"SELECT COUNT(*) FROM {table};")
                row_count = cursor.fetchone()[0]
                
                # Get sample data (first 3 rows)
                cursor.execute(f"SELECT * FROM {table} LIMIT 3;")
                sample_data = cursor.fetchall()
                
                db_info["tables"][table] = {
                    "columns": [{"name": col[1], "type": col[2]} for col in columns],
                    "row_count": row_count,
                    "sample_data": sample_data
                }
                
            except Exception as e:
                db_info["tables"][table] = {"error": str(e)}
        
        conn.close()
        return db_info
        
    except Exception as e:
        return {"path": str(db_path), "error": str(e)}

def find_all_sqlite_files():
    """Find all SQLite files in various Cursor locations"""
    locations = []
    
    # Standard workspace storage
    appdata = os.environ.get('APPDATA', '')
    if appdata:
        locations.extend([
            Path(appdata) / 'Cursor' / 'User' / 'workspaceStorage',
            Path(appdata) / 'Cursor' / 'User' / 'globalStorage',
            Path(appdata) / 'Cursor' / 'logs',
            Path(appdata) / 'Cursor' / 'CachedData',
            Path(appdata) / 'Cursor'
        ])
    
    # Local app data
    localappdata = os.environ.get('LOCALAPPDATA', '')
    if localappdata:
        locations.extend([
            Path(localappdata) / 'Cursor',
            Path(localappdata) / 'Programs' / 'Cursor'
        ])
    
    db_files = []
    patterns = ['*.db', '*.sqlite', '*.sqlite3', '*.vscdb', '*state*', '*chat*', '*history*']
    
    for location in locations:
        if location.exists():
            print(f"Searching in: {location}")
            for pattern in patterns:
                try:
                    files = list(location.rglob(pattern))
                    db_files.extend(files)
                    if files:
                        print(f"  Found {len(files)} files matching {pattern}")
                except Exception as e:
                    print(f"  Error searching {pattern}: {e}")
    
    # Remove duplicates and check if files are actually SQLite
    unique_files = []
    for file_path in set(db_files):
        if file_path.is_file():
            try:
                with open(file_path, 'rb') as f:
                    header = f.read(16)
                    if header.startswith(b'SQLite format 3'):
                        unique_files.append(file_path)
            except:
                pass
    
    return unique_files

def main():
    print("Cursor Database Structure Analyzer")
    print("=" * 50)
    
    # Find all SQLite files
    print("Searching for SQLite databases...")
    db_files = find_all_sqlite_files()
    print(f"\nFound {len(db_files)} SQLite database files")
    
    if not db_files:
        print("No SQLite databases found. Chat history might be stored differently.")
        return
    
    # Examine each database
    all_db_info = []
    for i, db_file in enumerate(db_files):
        print(f"\n[{i+1}/{len(db_files)}] Examining: {db_file}")
        db_info = examine_database(db_file)
        all_db_info.append(db_info)
        
        # Print summary
        if "error" in db_info:
            print(f"  Error: {db_info['error']}")
        else:
            tables = db_info.get("tables", {})
            print(f"  Tables: {len(tables)}")
            for table_name, table_info in tables.items():
                if "error" not in table_info:
                    print(f"    {table_name}: {table_info['row_count']} rows")
                    # Look for potentially interesting columns
                    columns = [col["name"].lower() for col in table_info.get("columns", [])]
                    interesting = []
                    for keyword in ["message", "content", "text", "chat", "conversation", "history", "data", "value"]:
                        if any(keyword in col for col in columns):
                            interesting.append(keyword)
                    if interesting:
                        print(f"      Interesting columns: {interesting}")
    
    # Save detailed results
    output_file = "database_analysis.json"
    with open(output_file, 'w') as f:
        json.dump(all_db_info, f, indent=2, default=str)
    
    print(f"\nDetailed analysis saved to: {output_file}")
    
    # Look for the most promising databases
    print("\nMost promising databases for chat data:")
    for db_info in all_db_info:
        if "error" not in db_info and db_info.get("tables"):
            score = 0
            reasons = []
            
            for table_name, table_info in db_info["tables"].items():
                if "error" not in table_info:
                    # Score based on table name
                    table_lower = table_name.lower()
                    if any(keyword in table_lower for keyword in ["chat", "message", "conversation", "history"]):
                        score += 10
                        reasons.append(f"Table name '{table_name}' suggests chat data")
                    
                    # Score based on columns
                    columns = [col["name"].lower() for col in table_info.get("columns", [])]
                    for keyword in ["message", "content", "text", "chat", "conversation"]:
                        if any(keyword in col for col in columns):
                            score += 5
                            reasons.append(f"Column suggests {keyword} data")
                    
                    # Score based on row count
                    if table_info.get("row_count", 0) > 0:
                        score += 1
            
            if score > 0:
                print(f"\nScore: {score} - {Path(db_info['path']).name}")
                for reason in reasons:
                    print(f"  - {reason}")

if __name__ == "__main__":
    main() 