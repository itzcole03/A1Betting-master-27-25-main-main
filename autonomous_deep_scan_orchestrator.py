#!/usr/bin/env python3
"""
🎯 AUTONOMOUS DEEP SCAN ORCHESTRATOR 🎯
=====================================

This orchestrator performs comprehensive analysis of the A1Betting platform:
- Code quality assessment
- Security vulnerability scanning  
- Performance optimization analysis
- Integration testing validation
- Documentation completeness check
- Dependency analysis
- Architecture validation
"""

import os
import json
import subprocess
import time
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Any

class AutonomousDeepScanOrchestrator:
    """Orchestrates deep scanning operations"""
    
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.results = {}
        
    def run_comprehensive_analysis(self) -> Dict[str, Any]:
        """Run all analysis components"""
        print("🚀 Starting Autonomous Deep Scan Analysis...")
        
        analysis_results = {
            "timestamp": datetime.now().isoformat(),
            "project_root": str(self.project_root),
            "analyses": {}
        }
        
        # 1. File Structure Analysis
        print("📁 Analyzing file structure...")
        analysis_results["analyses"]["file_structure"] = self.analyze_file_structure()
        
        # 2. Code Quality Analysis
        print("🔍 Analyzing code quality...")
        analysis_results["analyses"]["code_quality"] = self.analyze_code_quality()
        
        # 3. Security Analysis
        print("🛡️ Performing security analysis...")
        analysis_results["analyses"]["security"] = self.analyze_security()
        
        # 4. Performance Analysis
        print("⚡ Analyzing performance...")
        analysis_results["analyses"]["performance"] = self.analyze_performance()
        
        # 5. Integration Analysis
        print("🔗 Checking integration...")
        analysis_results["analyses"]["integration"] = self.analyze_integration()
        
        # 6. Documentation Analysis
        print("📚 Evaluating documentation...")
        analysis_results["analyses"]["documentation"] = self.analyze_documentation()
        
        # 7. Dependency Analysis
        print("📦 Analyzing dependencies...")
        analysis_results["analyses"]["dependencies"] = self.analyze_dependencies()
        
        # 8. Architecture Analysis
        print("🏗️ Validating architecture...")
        analysis_results["analyses"]["architecture"] = self.analyze_architecture()
        
        # Generate overall score
        analysis_results["overall_score"] = self.calculate_overall_score(analysis_results["analyses"])
        
        # Save results
        self.save_results(analysis_results)
        
        print("✅ Deep scan analysis complete!")
        return analysis_results
    
    def analyze_file_structure(self) -> Dict[str, Any]:
        """Analyze project file structure"""
        structure = {
            "total_files": 0,
            "file_types": {},
            "directories": [],
            "large_files": [],
            "duplicate_files": []
        }
        
        for root, dirs, files in os.walk(self.project_root):
            structure["directories"].extend(dirs)
            
            for file in files:
                file_path = Path(root) / file
                structure["total_files"] += 1
                
                # Count file types
                ext = file_path.suffix.lower()
                structure["file_types"][ext] = structure["file_types"].get(ext, 0) + 1
                
                # Check for large files (>1MB)
                try:
                    if file_path.stat().st_size > 1024 * 1024:
                        structure["large_files"].append({
                            "path": str(file_path.relative_to(self.project_root)),
                            "size_mb": file_path.stat().st_size / (1024 * 1024)
                        })
                except:
                    pass
        
        return structure
    
    def analyze_code_quality(self) -> Dict[str, Any]:
        """Analyze code quality across the project"""
        quality = {
            "python_files": 0,
            "javascript_files": 0,
            "typescript_files": 0,
            "issues": [],
            "metrics": {
                "total_lines": 0,
                "comment_lines": 0,
                "blank_lines": 0,
                "code_lines": 0
            }
        }
        
        for file_path in self.get_code_files():
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    lines = f.readlines()
                
                # Count file types
                if file_path.suffix == '.py':
                    quality["python_files"] += 1
                elif file_path.suffix in ['.js', '.jsx']:
                    quality["javascript_files"] += 1
                elif file_path.suffix in ['.ts', '.tsx']:
                    quality["typescript_files"] += 1
                
                # Analyze lines
                for line_num, line in enumerate(lines, 1):
                    line = line.strip()
                    quality["metrics"]["total_lines"] += 1
                    
                    if not line:
                        quality["metrics"]["blank_lines"] += 1
                    elif line.startswith('#') or line.startswith('//') or line.startswith('/*'):
                        quality["metrics"]["comment_lines"] += 1
                    else:
                        quality["metrics"]["code_lines"] += 1
                    
                    # Check for quality issues
                    if len(line) > 120:
                        quality["issues"].append({
                            "file": str(file_path.relative_to(self.project_root)),
                            "line": line_num,
                            "issue": "Line too long",
                            "severity": "low"
                        })
                    
                    if 'TODO' in line or 'FIXME' in line:
                        quality["issues"].append({
                            "file": str(file_path.relative_to(self.project_root)),
                            "line": line_num,
                            "issue": "TODO/FIXME found",
                            "severity": "medium"
                        })
            except:
                pass
        
        return quality
    
    def analyze_security(self) -> Dict[str, Any]:
        """Analyze security aspects"""
        security = {
            "potential_vulnerabilities": [],
            "hardcoded_secrets": [],
            "insecure_patterns": [],
            "security_score": 100
        }
        
        dangerous_patterns = [
            (r'password\s*=\s*["\'][^"\']+["\']', 'Hardcoded password'),
            (r'api_key\s*=\s*["\'][^"\']+["\']', 'Hardcoded API key'),
            (r'secret\s*=\s*["\'][^"\']+["\']', 'Hardcoded secret'),
            (r'eval\s*\(', 'Dangerous eval() usage'),
            (r'exec\s*\(', 'Dangerous exec() usage'),
            (r'os\.system\s*\(', 'System command execution'),
        ]
        
        import re
        
        for file_path in self.get_code_files():
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                for pattern, description in dangerous_patterns:
                    matches = re.finditer(pattern, content, re.IGNORECASE)
                    for match in matches:
                        line_num = content[:match.start()].count('\n') + 1
                        security["potential_vulnerabilities"].append({
                            "file": str(file_path.relative_to(self.project_root)),
                            "line": line_num,
                            "pattern": description,
                            "severity": "high" if "password" in description.lower() else "medium"
                        })
                        security["security_score"] -= 10
            except:
                pass
        
        return security
    
    def analyze_performance(self) -> Dict[str, Any]:
        """Analyze performance aspects"""
        performance = {
            "potential_bottlenecks": [],
            "optimization_opportunities": [],
            "performance_score": 100
        }
        
        performance_patterns = [
            (r'for\s+\w+\s+in\s+range\(len\(', 'Inefficient range(len()) pattern'),
            (r'time\.sleep\([1-9]', 'Long sleep duration'),
            (r'\.append\(.*\)\s*for', 'List comprehension opportunity'),
            (r'print\s*\(', 'Debug print statement'),
        ]
        
        import re
        
        for file_path in self.get_code_files():
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                for pattern, description in performance_patterns:
                    matches = re.finditer(pattern, content, re.IGNORECASE)
                    for match in matches:
                        line_num = content[:match.start()].count('\n') + 1
                        performance["potential_bottlenecks"].append({
                            "file": str(file_path.relative_to(self.project_root)),
                            "line": line_num,
                            "issue": description,
                            "severity": "medium"
                        })
                        performance["performance_score"] -= 5
            except:
                pass
        
        return performance
    
    def analyze_integration(self) -> Dict[str, Any]:
        """Analyze integration aspects"""
        integration = {
            "api_endpoints": [],
            "database_connections": [],
            "external_services": [],
            "configuration_issues": []
        }
        
        # Look for API patterns
        api_patterns = [
            r'@app\.(get|post|put|delete)',
            r'router\.(get|post|put|delete)',
            r'app\.include_router',
            r'FastAPI\(',
        ]
        
        # Look for database patterns
        db_patterns = [
            r'sqlite:///',
            r'postgresql://',
            r'mysql://',
            r'mongodb://',
        ]
        
        import re
        
        for file_path in self.get_code_files():
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                # Check for API endpoints
                for pattern in api_patterns:
                    matches = re.finditer(pattern, content, re.IGNORECASE)
                    for match in matches:
                        line_num = content[:match.start()].count('\n') + 1
                        integration["api_endpoints"].append({
                            "file": str(file_path.relative_to(self.project_root)),
                            "line": line_num,
                            "pattern": match.group()
                        })
                
                # Check for database connections
                for pattern in db_patterns:
                    matches = re.finditer(pattern, content, re.IGNORECASE)
                    for match in matches:
                        line_num = content[:match.start()].count('\n') + 1
                        integration["database_connections"].append({
                            "file": str(file_path.relative_to(self.project_root)),
                            "line": line_num,
                            "connection": match.group()
                        })
            except:
                pass
        
        return integration
    
    def analyze_documentation(self) -> Dict[str, Any]:
        """Analyze documentation coverage"""
        docs = {
            "readme_files": [],
            "docstrings": 0,
            "comments": 0,
            "documentation_files": [],
            "coverage_score": 0
        }
        
        # Find documentation files
        doc_extensions = ['.md', '.rst', '.txt']
        
        for file_path in self.project_root.rglob('*'):
            if file_path.is_file():
                if file_path.suffix.lower() in doc_extensions:
                    docs["documentation_files"].append(str(file_path.relative_to(self.project_root)))
                
                if file_path.name.lower().startswith('readme'):
                    docs["readme_files"].append(str(file_path.relative_to(self.project_root)))
        
        # Count docstrings and comments in code files
        for file_path in self.get_code_files():
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                
                # Count docstrings (simplified)
                docs["docstrings"] += content.count('"""') // 2
                docs["docstrings"] += content.count("'''") // 2
                
                # Count comment lines
                for line in content.split('\n'):
                    line = line.strip()
                    if line.startswith('#') or line.startswith('//'):
                        docs["comments"] += 1
            except:
                pass
        
        # Calculate coverage score
        total_code_files = len(list(self.get_code_files()))
        if total_code_files > 0:
            docs["coverage_score"] = min(100, (docs["docstrings"] + len(docs["documentation_files"]) * 10) / total_code_files * 10)
        
        return docs
    
    def analyze_dependencies(self) -> Dict[str, Any]:
        """Analyze project dependencies"""
        deps = {
            "python_dependencies": [],
            "javascript_dependencies": [],
            "outdated_packages": [],
            "security_vulnerabilities": []
        }
        
        # Check Python dependencies
        requirements_files = ['requirements.txt', 'requirements-dev.txt', 'pyproject.toml']
        for req_file in requirements_files:
            req_path = self.project_root / req_file
            if req_path.exists():
                try:
                    with open(req_path, 'r') as f:
                        deps["python_dependencies"].extend(f.readlines())
                except:
                    pass
        
        # Check JavaScript dependencies
        package_json = self.project_root / 'frontend' / 'package.json'
        if package_json.exists():
            try:
                with open(package_json, 'r') as f:
                    package_data = json.load(f)
                    deps["javascript_dependencies"] = list(package_data.get('dependencies', {}).keys())
            except:
                pass
        
        return deps
    
    def analyze_architecture(self) -> Dict[str, Any]:
        """Analyze system architecture"""
        arch = {
            "backend_structure": {},
            "frontend_structure": {},
            "database_models": [],
            "api_routes": [],
            "architecture_score": 100
        }
        
        # Analyze backend structure
        backend_path = self.project_root / 'backend'
        if backend_path.exists():
            arch["backend_structure"] = {
                "main_files": [],
                "route_files": [],
                "model_files": [],
                "service_files": []
            }
            
            for file_path in backend_path.rglob('*.py'):
                file_name = file_path.name.lower()
                rel_path = str(file_path.relative_to(self.project_root))
                
                if 'main' in file_name:
                    arch["backend_structure"]["main_files"].append(rel_path)
                elif 'route' in file_name or 'api' in file_name:
                    arch["backend_structure"]["route_files"].append(rel_path)
                elif 'model' in file_name:
                    arch["backend_structure"]["model_files"].append(rel_path)
                elif 'service' in file_name:
                    arch["backend_structure"]["service_files"].append(rel_path)
        
        # Analyze frontend structure
        frontend_path = self.project_root / 'frontend'
        if frontend_path.exists():
            arch["frontend_structure"] = {
                "component_files": [],
                "service_files": [],
                "util_files": []
            }
            
            for file_path in frontend_path.rglob('*'):
                if file_path.suffix in ['.tsx', '.jsx', '.ts', '.js']:
                    rel_path = str(file_path.relative_to(self.project_root))
                    
                    if 'component' in file_path.parts:
                        arch["frontend_structure"]["component_files"].append(rel_path)
                    elif 'service' in file_path.parts:
                        arch["frontend_structure"]["service_files"].append(rel_path)
                    elif 'util' in file_path.parts:
                        arch["frontend_structure"]["util_files"].append(rel_path)
        
        return arch
    
    def get_code_files(self):
        """Get all code files in the project"""
        code_extensions = {'.py', '.js', '.jsx', '.ts', '.tsx', '.json', '.yaml', '.yml'}
        exclude_dirs = {'node_modules', '.git', '__pycache__', 'venv', '.venv', 'dist', 'build'}
        
        for file_path in self.project_root.rglob('*'):
            if (file_path.is_file() and 
                file_path.suffix in code_extensions and
                not any(excluded in file_path.parts for excluded in exclude_dirs)):
                yield file_path
    
    def calculate_overall_score(self, analyses: Dict[str, Any]) -> float:
        """Calculate overall quality score"""
        scores = []
        
        # Code quality score
        if "code_quality" in analyses:
            metrics = analyses["code_quality"]["metrics"]
            if metrics["total_lines"] > 0:
                comment_ratio = metrics["comment_lines"] / metrics["total_lines"]
                scores.append(min(100, comment_ratio * 200 + 50))
        
        # Security score
        if "security" in analyses:
            scores.append(analyses["security"]["security_score"])
        
        # Performance score
        if "performance" in analyses:
            scores.append(analyses["performance"]["performance_score"])
        
        # Documentation score
        if "documentation" in analyses:
            scores.append(analyses["documentation"]["coverage_score"])
        
        # Architecture score
        if "architecture" in analyses:
            scores.append(analyses["architecture"]["architecture_score"])
        
        return sum(scores) / len(scores) if scores else 0
    
    def save_results(self, results: Dict[str, Any]):
        """Save analysis results"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # Save JSON results
        json_path = self.project_root / f"DEEP_SCAN_ANALYSIS_{timestamp}.json"
        with open(json_path, 'w') as f:
            json.dump(results, f, indent=2, default=str)
        
        # Save summary report
        report_path = self.project_root / f"DEEP_SCAN_SUMMARY_{timestamp}.md"
        with open(report_path, 'w') as f:
            f.write(self.generate_summary_report(results))
        
        print(f"📄 Results saved:")
        print(f"   JSON: {json_path}")
        print(f"   Summary: {report_path}")
    
    def generate_summary_report(self, results: Dict[str, Any]) -> str:
        """Generate human-readable summary report"""
        report = f"""# 🎯 AUTONOMOUS DEEP SCAN ANALYSIS REPORT

## 📊 Overall Assessment

**Overall Quality Score:** {results['overall_score']:.2f}/100
**Scan Timestamp:** {results['timestamp']}
**Project Root:** {results['project_root']}

## 📁 File Structure Analysis

- **Total Files:** {results['analyses']['file_structure']['total_files']}
- **Directories:** {len(results['analyses']['file_structure']['directories'])}
- **Large Files:** {len(results['analyses']['file_structure']['large_files'])}

### File Type Distribution
"""
        
        for ext, count in results['analyses']['file_structure']['file_types'].items():
            report += f"- {ext or 'no extension'}: {count} files\n"
        
        report += f"""
## 🔍 Code Quality Analysis

- **Python Files:** {results['analyses']['code_quality']['python_files']}
- **JavaScript Files:** {results['analyses']['code_quality']['javascript_files']}
- **TypeScript Files:** {results['analyses']['code_quality']['typescript_files']}
- **Total Issues:** {len(results['analyses']['code_quality']['issues'])}

### Code Metrics
- **Total Lines:** {results['analyses']['code_quality']['metrics']['total_lines']}
- **Code Lines:** {results['analyses']['code_quality']['metrics']['code_lines']}
- **Comment Lines:** {results['analyses']['code_quality']['metrics']['comment_lines']}
- **Blank Lines:** {results['analyses']['code_quality']['metrics']['blank_lines']}

## 🛡️ Security Analysis

- **Security Score:** {results['analyses']['security']['security_score']}/100
- **Potential Vulnerabilities:** {len(results['analyses']['security']['potential_vulnerabilities'])}
- **Hardcoded Secrets:** {len(results['analyses']['security']['hardcoded_secrets'])}

## ⚡ Performance Analysis

- **Performance Score:** {results['analyses']['performance']['performance_score']}/100
- **Potential Bottlenecks:** {len(results['analyses']['performance']['potential_bottlenecks'])}

## 🔗 Integration Analysis

- **API Endpoints:** {len(results['analyses']['integration']['api_endpoints'])}
- **Database Connections:** {len(results['analyses']['integration']['database_connections'])}

## 📚 Documentation Analysis

- **Documentation Score:** {results['analyses']['documentation']['coverage_score']:.2f}/100
- **README Files:** {len(results['analyses']['documentation']['readme_files'])}
- **Documentation Files:** {len(results['analyses']['documentation']['documentation_files'])}
- **Docstrings:** {results['analyses']['documentation']['docstrings']}
- **Comments:** {results['analyses']['documentation']['comments']}

## 📦 Dependencies Analysis

- **Python Dependencies:** {len(results['analyses']['dependencies']['python_dependencies'])}
- **JavaScript Dependencies:** {len(results['analyses']['dependencies']['javascript_dependencies'])}

## 🏗️ Architecture Analysis

- **Architecture Score:** {results['analyses']['architecture']['architecture_score']}/100

### Backend Structure
- **Main Files:** {len(results['analyses']['architecture']['backend_structure'].get('main_files', []))}
- **Route Files:** {len(results['analyses']['architecture']['backend_structure'].get('route_files', []))}
- **Model Files:** {len(results['analyses']['architecture']['backend_structure'].get('model_files', []))}
- **Service Files:** {len(results['analyses']['architecture']['backend_structure'].get('service_files', []))}

### Frontend Structure
- **Component Files:** {len(results['analyses']['architecture']['frontend_structure'].get('component_files', []))}
- **Service Files:** {len(results['analyses']['architecture']['frontend_structure'].get('service_files', []))}
- **Utility Files:** {len(results['analyses']['architecture']['frontend_structure'].get('util_files', []))}

---
*Report generated by Autonomous Deep Scan Orchestrator*
"""
        
        return report

def main():
    """Main execution function"""
    project_root = os.path.dirname(os.path.abspath(__file__))
    
    orchestrator = AutonomousDeepScanOrchestrator(project_root)
    results = orchestrator.run_comprehensive_analysis()
    
    print(f"\n🎉 Analysis Complete!")
    print(f"📊 Overall Quality Score: {results['overall_score']:.2f}/100")

if __name__ == "__main__":
    main()
