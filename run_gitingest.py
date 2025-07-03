#!/usr/bin/env python3
"""
Simple script to run GitIngest analysis on A1Betting codebase
"""

print("Starting GitIngest analysis of A1Betting codebase...")

try:
    from gitingest import ingest
    
    # Run GitIngest analysis with proper parameters
    result = ingest(
        source='.',
        include_patterns='*.py,*.ts,*.tsx,*.js,*.jsx,*.md,*.json',
        exclude_patterns='node_modules,venv,__pycache__,.git,dist,build',
        max_file_size=50000
    )
    
    # Handle result based on GitIngest version
    if isinstance(result, tuple):
        summary, tree, content = result
    else:
        content = str(result)
        summary = "GitIngest analysis completed"
        tree = ""
    
    # Ensure memory bank directory exists
    import os
    os.makedirs('memory-bank/ingested-context', exist_ok=True)
    
    # Save to memory bank
    with open('memory-bank/ingested-context/codebase-analysis.txt', 'w', encoding='utf-8') as f:
        f.write(f"{summary}\n\n{tree}\n\n{content}")
    
    # Count files analyzed
    file_count = len([line for line in content.split('FILE:') if line.strip()])
    
    print(f"GitIngest analysis complete!")
    print(f"Files analyzed: {file_count}")
    print(f"Analysis saved to: memory-bank/ingested-context/codebase-analysis.txt")
    
except ImportError:
    print("GitIngest not installed. Using existing analysis files...")
    # Copy existing gitingest files to memory bank
    import shutil
    import os
    os.makedirs('memory-bank/ingested-context', exist_ok=True)
    
    existing_files = ['gitingest.txt', 'gitingest_backend.txt', 'gitingest_frontend_src_components.txt']
    for file in existing_files:
        if os.path.exists(file):
            shutil.copy(file, f'memory-bank/ingested-context/{file}')
            print(f"Copied {file} to memory bank")
    
except Exception as e:
    print(f"Error: {e}")
    print("Using existing GitIngest files...")
    # Copy existing files as fallback
    import shutil
    import os
    os.makedirs('memory-bank/ingested-context', exist_ok=True)
    
    existing_files = ['gitingest.txt', 'gitingest_backend.txt', 'gitingest_frontend_src_components.txt']
    for file in existing_files:
        if os.path.exists(file):
            shutil.copy(file, f'memory-bank/ingested-context/{file}')
            print(f"Copied {file} to memory bank") 