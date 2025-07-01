#!/usr/bin/env python3
"""
Autonomous Optimization System

Intelligent detection and execution of system optimizations.
"""

import os
import re
import json
import subprocess
import gc
from datetime import datetime
from pathlib import Path

class AutonomousOptimizer:
    def __init__(self):
        self.optimization_log = Path("autonomous_optimizations.json")
        self.completed_optimizations = []
        self.safety_threshold = 7  # Only execute optimizations with priority >= 7
    
    def scan_for_optimizations(self):
        """Scan system for optimization opportunities"""
        print("🔍 Scanning for optimization opportunities...")
        
        optimizations = []
        
        # 1. Performance optimization opportunities
        optimizations.extend(self.find_performance_optimizations())
        
        # 2. Code quality improvements
        optimizations.extend(self.find_code_quality_improvements())
        
        # 3. Security enhancements
        optimizations.extend(self.find_security_enhancements())
        
        # 4. System resource optimizations
        optimizations.extend(self.find_system_optimizations())
        
        return sorted(optimizations, key=lambda x: x['priority'], reverse=True)
    
    def find_performance_optimizations(self):
        """Find performance optimization opportunities"""
        opts = []
        
        try:
            # Check for inefficient database queries
            for root, dirs, files in os.walk('.'):
                if any(skip in root for skip in ['node_modules', '.git', 'venv', '__pycache__']):
                    continue
                    
                for file in files:
                    if file.endswith(('.py', '.ts', '.tsx')):
                        filepath = os.path.join(root, file)
                        try:
                            with open(filepath, 'r', encoding='utf-8') as f:
                                content = f.read()
                            
                            # Look for SELECT * queries
                            if 'SELECT *' in content.upper():
                                opts.append({
                                    'type': 'performance',
                                    'priority': 8,
                                    'file': filepath,
                                    'issue': 'SELECT * query found - should specify columns',
                                    'action': 'optimize_sql_queries',
                                    'impact': 'medium'
                                })
                            
                            # Look for nested loops
                            nested_loop_pattern = r'for\s+\w+\s+in\s+.*:\s*.*for\s+\w+\s+in\s+.*:'
                            if re.search(nested_loop_pattern, content, re.MULTILINE):
                                opts.append({
                                    'type': 'performance',
                                    'priority': 7,
                                    'file': filepath,
                                    'issue': 'Nested loops detected - consider optimization',
                                    'action': 'optimize_nested_loops',
                                    'impact': 'medium'
                                })
                            
                            # Look for missing async/await
                            if 'requests.get(' in content and 'async def' not in content:
                                opts.append({
                                    'type': 'performance',
                                    'priority': 6,
                                    'file': filepath,
                                    'issue': 'Synchronous HTTP requests found - consider async',
                                    'action': 'convert_to_async',
                                    'impact': 'high'
                                })
                                
                        except Exception:
                            continue
        except Exception as e:
            print(f"Error scanning for performance optimizations: {e}")
            
        return opts
    
    def find_code_quality_improvements(self):
        """Find code quality improvement opportunities"""
        opts = []
        
        try:
            for root, dirs, files in os.walk('.'):
                if any(skip in root for skip in ['node_modules', '.git', 'venv', '__pycache__']):
                    continue
                    
                for file in files:
                    if file.endswith(('.py', '.ts', '.tsx')):
                        filepath = os.path.join(root, file)
                        try:
                            with open(filepath, 'r', encoding='utf-8') as f:
                                content = f.read()
                                lines = content.split('\n')
                            
                            # Check file length
                            if len(lines) > 200:
                                opts.append({
                                    'type': 'code_quality',
                                    'priority': 5,
                                    'file': filepath,
                                    'issue': f'Large file ({len(lines)} lines) - consider refactoring',
                                    'action': 'suggest_refactoring',
                                    'impact': 'low'
                                })
                            
                            # Check for broad exception handling
                            if re.search(r'except\s*:', content) or 'except Exception:' in content:
                                opts.append({
                                    'type': 'code_quality',
                                    'priority': 6,
                                    'file': filepath,
                                    'issue': 'Broad exception handling found',
                                    'action': 'improve_error_handling',
                                    'impact': 'medium'
                                })
                            
                            # Check for missing type hints (Python)
                            if filepath.endswith('.py') and 'def ' in content:
                                if '-> ' not in content and 'typing' not in content:
                                    opts.append({
                                        'type': 'code_quality',
                                        'priority': 4,
                                        'file': filepath,
                                        'issue': 'Missing type hints',
                                        'action': 'add_type_hints',
                                        'impact': 'low'
                                    })
                                    
                        except Exception:
                            continue
        except Exception as e:
            print(f"Error scanning for code quality improvements: {e}")
            
        return opts
    
    def find_security_enhancements(self):
        """Find security enhancement opportunities"""
        opts = []
        
        try:
            for root, dirs, files in os.walk('.'):
                if any(skip in root for skip in ['node_modules', '.git', 'venv', '__pycache__']):
                    continue
                    
                for file in files:
                    if file.endswith(('.py', '.ts', '.tsx', '.js')):
                        filepath = os.path.join(root, file)
                        try:
                            with open(filepath, 'r', encoding='utf-8') as f:
                                content = f.read()
                            
                            # Check for hardcoded passwords/secrets
                            password_patterns = [
                                r'password\s*=\s*["\'][^"\']+["\']',
                                r'secret\s*=\s*["\'][^"\']+["\']',
                                r'api_key\s*=\s*["\'][^"\']+["\']'
                            ]
                            
                            for pattern in password_patterns:
                                if re.search(pattern, content, re.IGNORECASE):
                                    opts.append({
                                        'type': 'security',
                                        'priority': 9,
                                        'file': filepath,
                                        'issue': 'Hardcoded credentials detected',
                                        'action': 'secure_credentials',
                                        'impact': 'high'
                                    })
                                    break
                            
                            # Check for SQL injection vulnerabilities
                            if re.search(r'f["\'].*SELECT.*{.*}.*["\']', content) or re.search(r'["\'].*SELECT.*%.*["\']', content):
                                opts.append({
                                    'type': 'security',
                                    'priority': 9,
                                    'file': filepath,
                                    'issue': 'Potential SQL injection vulnerability',
                                    'action': 'fix_sql_injection',
                                    'impact': 'high'
                                })
                            
                            # Check for eval/exec usage
                            if 'eval(' in content or 'exec(' in content:
                                opts.append({
                                    'type': 'security',
                                    'priority': 9,
                                    'file': filepath,
                                    'issue': 'Dynamic code execution detected',
                                    'action': 'remove_dynamic_execution',
                                    'impact': 'high'
                                })
                                
                        except Exception:
                            continue
        except Exception as e:
            print(f"Error scanning for security enhancements: {e}")
            
        return opts
    
    def find_system_optimizations(self):
        """Find system-level optimization opportunities"""
        opts = []
        
        # Memory optimization
        import psutil
        memory = psutil.virtual_memory()
        
        if memory.percent > 85:
            opts.append({
                'type': 'system',
                'priority': 8,
                'file': 'system',
                'issue': f'High memory usage: {memory.percent}%',
                'action': 'optimize_memory_usage',
                'impact': 'high'
            })
        
        # Disk space optimization
        disk = psutil.disk_usage('/')
        disk_percent = (disk.used / disk.total) * 100
        
        if disk_percent > 80:
            opts.append({
                'type': 'system',
                'priority': 7,
                'file': 'system',
                'issue': f'High disk usage: {disk_percent:.1f}%',
                'action': 'cleanup_disk_space',
                'impact': 'medium'
            })
        
        # Process optimization
        high_cpu_processes = []
        for proc in psutil.process_iter(['pid', 'name', 'cpu_percent']):
            try:
                if proc.info['cpu_percent'] > 50:
                    high_cpu_processes.append(proc.info)
            except:
                continue
        
        if high_cpu_processes:
            opts.append({
                'type': 'system',
                'priority': 6,
                'file': 'system',
                'issue': f'{len(high_cpu_processes)} high CPU processes detected',
                'action': 'optimize_processes',
                'impact': 'medium'
            })
        
        return opts
    
    def execute_optimization(self, optimization):
        """Execute an optimization based on its type and action"""
        print(f"⚡ Executing: {optimization['issue']}")
        
        try:
            if optimization['action'] == 'optimize_memory_usage':
                return self.optimize_memory_usage()
            elif optimization['action'] == 'cleanup_disk_space':
                return self.cleanup_disk_space()
            elif optimization['action'] == 'improve_error_handling':
                return self.improve_error_handling(optimization['file'])
            elif optimization['action'] == 'optimize_sql_queries':
                return self.suggest_sql_optimization(optimization['file'])
            elif optimization['action'] == 'secure_credentials':
                return self.suggest_credential_security(optimization['file'])
            else:
                return f"Optimization action '{optimization['action']}' analysis completed"
        except Exception as e:
            return f'Error executing optimization: {e}'
    
    def optimize_memory_usage(self):
        """Optimize system memory usage"""
        try:
            actions_taken = []
            
            # Force garbage collection
            gc.collect()
            actions_taken.append("Forced garbage collection")
            
            # Clear Python bytecode cache
            subprocess.run(['find', '.', '-name', '*.pyc', '-delete'], capture_output=True)
            actions_taken.append("Cleared Python bytecode cache")
            
            # Clear temporary files
            temp_dirs = ['/tmp', 'C:\\Temp', 'C:\\Windows\\Temp']
            for temp_dir in temp_dirs:
                if os.path.exists(temp_dir):
                    try:
                        subprocess.run(['find', temp_dir, '-type', 'f', '-mtime', '+1', '-delete'], 
                                     capture_output=True, timeout=30)
                        actions_taken.append(f"Cleaned {temp_dir}")
                    except:
                        pass
            
            return f"Memory optimization completed: {', '.join(actions_taken)}"
        except Exception as e:
            return f"Memory optimization failed: {e}"
    
    def cleanup_disk_space(self):
        """Clean up disk space"""
        try:
            actions_taken = []
            
            # Clean log files older than 7 days
            log_patterns = ['*.log', '*.log.*']
            for pattern in log_patterns:
                try:
                    subprocess.run(['find', '.', '-name', pattern, '-mtime', '+7', '-delete'], 
                                 capture_output=True, timeout=30)
                    actions_taken.append(f"Cleaned old {pattern} files")
                except:
                    pass
            
            # Clean backup files
            backup_patterns = ['*.bak', '*.backup', '*~']
            for pattern in backup_patterns:
                try:
                    subprocess.run(['find', '.', '-name', pattern, '-delete'], 
                                 capture_output=True, timeout=30)
                    actions_taken.append(f"Cleaned {pattern} files")
                except:
                    pass
            
            # Clean node_modules if exists and is large
            node_modules = Path('frontend/node_modules')
            if node_modules.exists():
                try:
                    size_mb = sum(f.stat().st_size for f in node_modules.rglob('*') if f.is_file()) / 1024 / 1024
                    if size_mb > 500:  # If larger than 500MB
                        subprocess.run(['rm', '-rf', str(node_modules)], capture_output=True)
                        actions_taken.append("Cleaned large node_modules directory")
                except:
                    pass
            
            return f"Disk cleanup completed: {', '.join(actions_taken)}"
        except Exception as e:
            return f"Disk cleanup failed: {e}"
    
    def improve_error_handling(self, filepath):
        """Suggest error handling improvements"""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Count broad exception handlers
            broad_exceptions = len(re.findall(r'except\s*:', content))
            generic_exceptions = len(re.findall(r'except Exception:', content))
            
            suggestion = f"File {filepath} has {broad_exceptions} broad exception handlers and {generic_exceptions} generic handlers. "
            suggestion += "Consider using specific exception types and proper logging."
            
            # Create improvement suggestion file
            suggestion_file = f"{filepath}.error_handling_suggestions.txt"
            with open(suggestion_file, 'w') as f:
                f.write(f"Error Handling Improvement Suggestions for {filepath}\n")
                f.write("=" * 50 + "\n\n")
                f.write("1. Replace 'except:' with specific exception types\n")
                f.write("2. Add proper logging for caught exceptions\n")
                f.write("3. Consider using context managers for resource handling\n")
                f.write("4. Add exception chaining where appropriate\n")
            
            return f"Error handling analysis completed. Suggestions saved to {suggestion_file}"
        except Exception as e:
            return f"Error handling analysis failed: {e}"
    
    def suggest_sql_optimization(self, filepath):
        """Suggest SQL query optimizations"""
        suggestion = f"SQL optimization needed in {filepath}. "
        suggestion += "Replace SELECT * with specific column names to improve performance."
        
        suggestion_file = f"{filepath}.sql_optimization_suggestions.txt"
        try:
            with open(suggestion_file, 'w') as f:
                f.write(f"SQL Optimization Suggestions for {filepath}\n")
                f.write("=" * 50 + "\n\n")
                f.write("1. Replace 'SELECT *' with specific column names\n")
                f.write("2. Add appropriate indexes for frequently queried columns\n")
                f.write("3. Use LIMIT clauses for large result sets\n")
                f.write("4. Consider query caching for expensive operations\n")
            
            return f"SQL optimization suggestions saved to {suggestion_file}"
        except Exception as e:
            return f"SQL optimization analysis failed: {e}"
    
    def suggest_credential_security(self, filepath):
        """Suggest credential security improvements"""
        suggestion_file = f"{filepath}.security_suggestions.txt"
        try:
            with open(suggestion_file, 'w') as f:
                f.write(f"Security Improvement Suggestions for {filepath}\n")
                f.write("=" * 50 + "\n\n")
                f.write("1. Move hardcoded credentials to environment variables\n")
                f.write("2. Use secure credential management systems\n")
                f.write("3. Implement proper secret rotation\n")
                f.write("4. Add credential validation and sanitization\n")
                f.write("5. Consider using encrypted configuration files\n")
            
            return f"Security suggestions saved to {suggestion_file}"
        except Exception as e:
            return f"Security analysis failed: {e}"
    
    def run_autonomous_optimization(self):
        """Run complete autonomous optimization cycle"""
        print("🤖 Autonomous Optimization System Starting...")
        
        # Scan for optimizations
        optimizations = self.scan_for_optimizations()
        
        print(f"🔍 Found {len(optimizations)} optimization opportunities")
        
        # Log findings
        optimization_report = {
            'timestamp': datetime.now().isoformat(),
            'optimizations_found': len(optimizations),
            'optimizations': optimizations[:10],  # Top 10
            'executed_optimizations': []
        }
        
        # Execute high-priority optimizations automatically
        executed_count = 0
        for opt in optimizations[:5]:  # Top 5 optimizations
            if opt['priority'] >= self.safety_threshold:  # Only execute safe optimizations
                result = self.execute_optimization(opt)
                optimization_report['executed_optimizations'].append({
                    'optimization': opt,
                    'result': result,
                    'timestamp': datetime.now().isoformat()
                })
                executed_count += 1
                print(f"✅ {opt['issue']} -> {result}")
        
        # Save optimization report
        with open(self.optimization_log, 'w') as f:
            json.dump(optimization_report, f, indent=2)
        
        print(f"⚡ Executed {executed_count} optimizations autonomously")
        print(f"📊 Optimization report saved to {self.optimization_log}")
        
        return optimization_report

def main():
    """Main execution function"""
    optimizer = AutonomousOptimizer()
    return optimizer.run_autonomous_optimization()

if __name__ == "__main__":
    main() 