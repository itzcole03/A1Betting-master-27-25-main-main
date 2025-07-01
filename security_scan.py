#!/usr/bin/env python3
"""Security Scanner"""

import os
import re
import json
from pathlib import Path
from datetime import datetime

print('🛡️ Security Vulnerability Scanner')
print('=' * 40)

vulnerabilities = []
files_scanned = 0

for file_path in Path('.').glob('**/*.py'):
    if 'venv' in str(file_path) or '__pycache__' in str(file_path):
        continue
    
    files_scanned += 1
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            
            # Check for hardcoded credentials
            if re.search(r'password.*=.*["\'][^"\']+["\']', content, re.IGNORECASE):
                vulnerabilities.append({'type': 'hardcoded_password', 'file': str(file_path)})
            if re.search(r'api_key.*=.*["\'][^"\']+["\']', content, re.IGNORECASE):
                vulnerabilities.append({'type': 'hardcoded_api_key', 'file': str(file_path)})
            if re.search(r'secret.*=.*["\'][^"\']+["\']', content, re.IGNORECASE):
                vulnerabilities.append({'type': 'hardcoded_secret', 'file': str(file_path)})
            
            # Check for SQL injection
            if re.search(r'execute.*%s', content):
                vulnerabilities.append({'type': 'sql_injection', 'file': str(file_path)})
            
            # Check for dynamic execution
            if re.search(r'eval\s*\(', content):
                vulnerabilities.append({'type': 'eval_usage', 'file': str(file_path)})
            if re.search(r'exec\s*\(', content):
                vulnerabilities.append({'type': 'exec_usage', 'file': str(file_path)})
            
    except Exception:
        continue

print(f'📊 Scan Results:')
print(f'  • Files scanned: {files_scanned}')
print(f'  • Vulnerabilities found: {len(vulnerabilities)}')

if vulnerabilities:
    vuln_types = {}
    for v in vulnerabilities:
        vtype = v['type']
        if vtype not in vuln_types:
            vuln_types[vtype] = 0
        vuln_types[vtype] += 1
    
    print('\n⚠️  Issues by Type:')
    for vtype, count in vuln_types.items():
        print(f'  • {vtype}: {count}')
    
    print('\n🔍 Sample Files:')
    for v in vulnerabilities[:10]:
        print(f'  • {v["type"]} in {v["file"]}')

print('\n✅ Security scan complete') 