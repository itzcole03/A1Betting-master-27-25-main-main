#!/usr/bin/env python3
"""
🔍 GITINGEST VALIDATION SYSTEM
============================
Comprehensive Production Readiness Assessment using GitIngest methodology
"""

import os
import subprocess
import json
from datetime import datetime
from pathlib import Path
import re
from typing import Dict, List, Tuple, Any

class GitIngestValidator:
    """GitIngest-based validation system for production readiness assessment"""
    
    def __init__(self, project_root: str = "."):
        self.project_root = Path(project_root)
        self.validation_results = {}
        self.timestamp = datetime.now().isoformat()
        
    def run_gitingest_analysis(self, source: str, patterns: List[str] = None, 
                              excludes: List[str] = None, max_size: int = 51200) -> Dict:
        """Run GitIngest analysis on specified source with patterns"""
        try:
            output_file = f"gitingest_{source.replace('/', '_').replace('*', 'all')}.txt"
            
            cmd = ["gitingest", source, "-o", output_file]
            
            if patterns:
                for pattern in patterns:
                    cmd.extend(["-i", pattern])
                    
            if excludes:
                for exclude in excludes:
                    cmd.extend(["-e", exclude])
                    
            cmd.extend(["-s", str(max_size)])
            
            result = subprocess.run(cmd, capture_output=True, text=True, cwd=self.project_root)
            
            if result.returncode == 0:
                # Read the generated file
                output_path = self.project_root / output_file
                if output_path.exists():
                    with open(output_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    return {
                        "success": True,
                        "content": content,
                        "file_count": self._extract_file_count(content),
                        "token_estimate": self._extract_token_count(content),
                        "output_file": output_file
                    }
            
            return {
                "success": False,
                "error": result.stderr or result.stdout,
                "returncode": result.returncode
            }
            
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def _extract_file_count(self, content: str) -> int:
        """Extract file count from GitIngest output"""
        match = re.search(r'Files analyzed: (\d+)', content)
        return int(match.group(1)) if match else 0
    
    def _extract_token_count(self, content: str) -> str:
        """Extract token estimate from GitIngest output"""
        match = re.search(r'Estimated tokens: (.+)', content)
        return match.group(1) if match else "0"
    
    def validate_backend_production_readiness(self) -> Dict:
        """Validate backend production readiness"""
        print("🔍 Analyzing Backend Production Components...")
        
        # Core backend files
        backend_analysis = self.run_gitingest_analysis(
            "backend",
            patterns=["main*.py", "production_api.py", "ultra_accuracy_*.py", "security_*.py"],
            excludes=["venv/*", "__pycache__/*", "*.pyc"]
        )
        
        # Security components
        security_analysis = self.run_gitingest_analysis(
            "backend",
            patterns=["auth/*", "security_*.py", "auth.py"],
            excludes=["venv/*", "__pycache__/*"]
        )
        
        # API routes
        routes_analysis = self.run_gitingest_analysis(
            "backend/routes",
            patterns=["*.py"],
            excludes=["__pycache__/*"]
        )
        
        return {
            "backend_core": backend_analysis,
            "security": security_analysis, 
            "routes": routes_analysis,
            "score": self._calculate_backend_score(backend_analysis, security_analysis, routes_analysis)
        }
    
    def validate_frontend_production_readiness(self) -> Dict:
        """Validate frontend production readiness"""
        print("🔍 Analyzing Frontend Production Components...")
        
        # Core app components
        app_analysis = self.run_gitingest_analysis(
            "frontend/src",
            patterns=["App*.tsx", "main.tsx", "index.tsx"],
            excludes=["node_modules/*", "dist/*", "*.test.*"]
        )
        
        # Services (especially real services vs mocks)
        services_analysis = self.run_gitingest_analysis(
            "frontend/src/services",
            patterns=["*ApiService.ts", "*Service.ts", "!*Mock*"],
            excludes=["*.test.*", "*mock*"]
        )
        
        # Components
        components_analysis = self.run_gitingest_analysis(
            "frontend/src/components",
            patterns=["A1Betting*.tsx", "*Platform*.tsx"],
            excludes=["*.test.*", "*.stories.*"]
        )
        
        return {
            "app_core": app_analysis,
            "services": services_analysis,
            "components": components_analysis,
            "score": self._calculate_frontend_score(app_analysis, services_analysis, components_analysis)
        }
    
    def validate_automation_systems(self) -> Dict:
        """Validate automation and autonomous systems"""
        print("🔍 Analyzing Automation & Autonomous Systems...")
        
        # Automation scripts
        automation_analysis = self.run_gitingest_analysis(
            "automation",
            patterns=["*.py"],
            excludes=["__pycache__/*", "*.pyc"]
        )
        
        # Look for autonomous systems
        autonomous_files = []
        automation_dir = self.project_root / "automation" / "scripts"
        if automation_dir.exists():
            autonomous_files = list(automation_dir.glob("*autonomous*.py"))
        
        return {
            "automation": automation_analysis,
            "autonomous_count": len(autonomous_files),
            "autonomous_files": [f.name for f in autonomous_files],
            "score": self._calculate_automation_score(automation_analysis, len(autonomous_files))
        }
    
    def validate_mock_elimination(self) -> Dict:
        """Validate mock elimination progress"""
        print("🔍 Analyzing Mock Elimination Progress...")
        
        # Find mock services
        mock_analysis = self.run_gitingest_analysis(
            "frontend/src",
            patterns=["*Mock*.ts", "*mock*.ts", "mocks/*"],
            excludes=["node_modules/*"]
        )
        
        # Find real services
        real_services_analysis = self.run_gitingest_analysis(
            "frontend/src/services",
            patterns=["real*.ts", "*ApiService.ts"],
            excludes=["*Mock*", "*mock*"]
        )
        
        return {
            "mocks": mock_analysis,
            "real_services": real_services_analysis,
            "score": self._calculate_mock_elimination_score(mock_analysis, real_services_analysis)
        }
    
    def validate_test_coverage(self) -> Dict:
        """Validate test coverage and implementation"""
        print("🔍 Analyzing Test Coverage...")
        
        # Backend tests
        backend_tests = self.run_gitingest_analysis(
            "backend",
            patterns=["test_*.py", "*test*.py"],
            excludes=["venv/*", "__pycache__/*"]
        )
        
        # Frontend tests
        frontend_tests = self.run_gitingest_analysis(
            "frontend",
            patterns=["*.test.*", "*.spec.*"],
            excludes=["node_modules/*", "dist/*"]
        )
        
        return {
            "backend_tests": backend_tests,
            "frontend_tests": frontend_tests,
            "score": self._calculate_test_score(backend_tests, frontend_tests)
        }
    
    def _calculate_backend_score(self, core, security, routes) -> int:
        """Calculate backend readiness score"""
        score = 0
        if core.get("success") and core.get("file_count", 0) > 5:
            score += 40
        if security.get("success") and security.get("file_count", 0) > 2:
            score += 30
        if routes.get("success") and routes.get("file_count", 0) > 3:
            score += 30
        return score
    
    def _calculate_frontend_score(self, app, services, components) -> int:
        """Calculate frontend readiness score"""
        score = 0
        if app.get("success") and app.get("file_count", 0) > 1:
            score += 35
        if services.get("success") and services.get("file_count", 0) > 5:
            score += 35
        if components.get("success") and components.get("file_count", 0) > 10:
            score += 30
        return score
    
    def _calculate_automation_score(self, automation, autonomous_count) -> int:
        """Calculate automation readiness score"""
        score = 0
        if automation.get("success") and automation.get("file_count", 0) > 10:
            score += 50
        if autonomous_count > 3:
            score += 50
        return score
    
    def _calculate_mock_elimination_score(self, mocks, real_services) -> int:
        """Calculate mock elimination progress score"""
        mock_count = mocks.get("file_count", 0)
        real_count = real_services.get("file_count", 0)
        
        if real_count == 0:
            return 0
        
        # Higher score for more real services vs mocks
        ratio = real_count / (mock_count + real_count)
        return int(ratio * 100)
    
    def _calculate_test_score(self, backend_tests, frontend_tests) -> int:
        """Calculate test coverage score"""
        score = 0
        if backend_tests.get("success") and backend_tests.get("file_count", 0) > 5:
            score += 50
        if frontend_tests.get("success") and frontend_tests.get("file_count", 0) > 10:
            score += 50
        return score
    
    def run_comprehensive_validation(self) -> Dict:
        """Run complete validation assessment"""
        print("🚀 GITINGEST COMPREHENSIVE VALIDATION")
        print("="*50)
        
        results = {
            "timestamp": self.timestamp,
            "backend": self.validate_backend_production_readiness(),
            "frontend": self.validate_frontend_production_readiness(),
            "automation": self.validate_automation_systems(),
            "mock_elimination": self.validate_mock_elimination(),
            "testing": self.validate_test_coverage()
        }
        
        # Calculate overall score
        overall_score = (
            results["backend"]["score"] * 0.25 +
            results["frontend"]["score"] * 0.25 +
            results["automation"]["score"] * 0.20 +
            results["mock_elimination"]["score"] * 0.15 +
            results["testing"]["score"] * 0.15
        )
        
        results["overall_score"] = int(overall_score)
        results["production_readiness"] = self._get_readiness_level(overall_score)
        
        return results
    
    def _get_readiness_level(self, score: int) -> str:
        """Get production readiness level based on score"""
        if score >= 90:
            return "🟢 PRODUCTION READY"
        elif score >= 80:
            return "🟡 NEAR PRODUCTION READY"
        elif score >= 70:
            return "🟠 MODERATE READINESS"
        elif score >= 60:
            return "🔴 LIMITED READINESS"
        else:
            return "❌ NOT PRODUCTION READY"
    
    def generate_report(self, results: Dict) -> str:
        """Generate comprehensive validation report"""
        report = f"""
🔍 GITINGEST PRODUCTION READINESS VALIDATION REPORT
================================================
Generated: {results['timestamp']}
Overall Score: {results['overall_score']}/100
Status: {results['production_readiness']}

📊 COMPONENT ANALYSIS
===================

🔧 Backend Readiness: {results['backend']['score']}/100
   • Core Files: {results['backend']['backend_core'].get('file_count', 0)} files analyzed
   • Security: {results['backend']['security'].get('file_count', 0)} files analyzed  
   • Routes: {results['backend']['routes'].get('file_count', 0)} files analyzed

🌐 Frontend Readiness: {results['frontend']['score']}/100
   • App Core: {results['frontend']['app_core'].get('file_count', 0)} files analyzed
   • Services: {results['frontend']['services'].get('file_count', 0)} files analyzed
   • Components: {results['frontend']['components'].get('file_count', 0)} files analyzed

🤖 Automation Readiness: {results['automation']['score']}/100
   • Automation Scripts: {results['automation']['automation'].get('file_count', 0)} files
   • Autonomous Systems: {results['automation']['autonomous_count']} systems detected

🎭 Mock Elimination: {results['mock_elimination']['score']}/100
   • Mock Services: {results['mock_elimination']['mocks'].get('file_count', 0)} remaining
   • Real Services: {results['mock_elimination']['real_services'].get('file_count', 0)} implemented

🧪 Test Coverage: {results['testing']['score']}/100
   • Backend Tests: {results['testing']['backend_tests'].get('file_count', 0)} test files
   • Frontend Tests: {results['testing']['frontend_tests'].get('file_count', 0)} test files

📋 DETAILED ANALYSIS FILES
=========================
"""
        
        # Add file references
        for category, data in results.items():
            if isinstance(data, dict) and "output_file" in str(data):
                for key, value in data.items():
                    if isinstance(value, dict) and value.get("output_file"):
                        report += f"• {key}: {value['output_file']}\n"
        
        report += f"""
🎯 RECOMMENDATIONS
================
"""
        
        if results['overall_score'] < 90:
            report += "• Focus on completing remaining production components\n"
        if results['automation']['score'] < 80:
            report += "• Enhance automation and autonomous systems\n"
        if results['mock_elimination']['score'] < 90:
            report += "• Complete mock service elimination\n"
        if results['testing']['score'] < 80:
            report += "• Improve test coverage and implementation\n"
            
        return report

def main():
    """Main validation execution"""
    validator = GitIngestValidator()
    results = validator.run_comprehensive_validation()
    
    # Generate and save report
    report = validator.generate_report(results)
    
    # Save results
    with open("gitingest_validation_results.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, default=str)
    
    with open("gitingest_validation_report.md", "w", encoding="utf-8") as f:
        f.write(report)
    
    print("\n" + report)
    print(f"\n📄 Detailed results saved to: gitingest_validation_results.json")
    print(f"📄 Report saved to: gitingest_validation_report.md")
    
    return results

if __name__ == "__main__":
    main()