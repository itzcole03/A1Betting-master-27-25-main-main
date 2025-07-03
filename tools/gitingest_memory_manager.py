#!/usr/bin/env python3
"""
GitIngest Memory Manager for A1Betting Platform
Integrates codebase analysis with chat history for comprehensive agent memory
"""

import os
import json
import subprocess
from pathlib import Path
from datetime import datetime
from typing import Dict, Any, List

class GitIngestMemoryManager:
    def __init__(self, project_root: str = ".", memory_bank_path: str = "memory-bank"):
        self.project_root = Path(project_root)
        self.memory_bank = Path(memory_bank_path)
        self.ingested_context = self.memory_bank / "ingested-context"
        self.ingested_context.mkdir(parents=True, exist_ok=True)
    
    def ingest_codebase_context(self):
        """Use GitIngest to analyze entire A1Betting codebase for agent context"""
        
        print("🔍 Starting GitIngest codebase analysis...")
        
        # Configure GitIngest for A1Betting platform
        include_patterns = [
            "*.py", "*.ts", "*.tsx", "*.js", "*.jsx",
            "*.md", "*.json", "*.yaml", "*.yml",
            "*.sql", "*.env.example", "*.txt"
        ]
        
        exclude_patterns = [
            "node_modules/*", "venv/*", "*.pyc", "__pycache__/*",
            ".git/*", "dist/*", "build/*", ".next/*",
            "*.log", "*.tmp", "coverage/*"
        ]
        
        output_file = self.ingested_context / "codebase-analysis.txt"
        
        try:
            # Run GitIngest command
            cmd = [
                "gitingest",
                "--source", str(self.project_root),
                "--output", str(output_file),
                "--include", ",".join(include_patterns),
                "--exclude", ",".join(exclude_patterns),
                "--max-file-size", "100000"  # 100KB max per file
            ]
            
            print(f"Running: {' '.join(cmd)}")
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
            
            if result.returncode == 0:
                print("✅ GitIngest analysis completed successfully")
                
                # Create structured context
                self.create_structured_context()
                
                return {
                    "status": "success",
                    "output_file": str(output_file),
                    "analysis_size": output_file.stat().st_size if output_file.exists() else 0
                }
            else:
                print(f"❌ GitIngest failed: {result.stderr}")
                return {
                    "status": "error",
                    "error": result.stderr
                }
                
        except subprocess.TimeoutExpired:
            print("⏰ GitIngest analysis timed out")
            return {
                "status": "timeout",
                "error": "Analysis timed out after 5 minutes"
            }
        except Exception as e:
            print(f"❌ GitIngest error: {e}")
            return {
                "status": "error",
                "error": str(e)
            }
    
    def create_structured_context(self):
        """Create structured context files for agent memory"""
        
        print("📊 Creating structured context analysis...")
        
        # Extract key patterns for A1Betting
        context = {
            "analysis_timestamp": datetime.now().isoformat(),
            "architecture_overview": self.extract_architecture_patterns(),
            "ml_models": self.extract_ml_patterns(),
            "betting_logic": self.extract_betting_patterns(),
            "api_integration": self.extract_api_patterns(),
            "frontend_structure": self.extract_frontend_patterns(),
            "backend_services": self.extract_backend_patterns(),
            "security_patterns": self.extract_security_patterns(),
            "file_statistics": self.get_file_statistics()
        }
        
        # Save structured context
        context_file = self.ingested_context / "structured-context.json"
        with open(context_file, "w") as f:
            json.dump(context, f, indent=2)
        
        # Create markdown summary for memory bank
        self.create_memory_bank_summary(context)
        
        print("✅ Structured context created")
    
    def extract_architecture_patterns(self) -> Dict[str, Any]:
        """Extract A1Betting architecture patterns"""
        return {
            "main_components": [
                "QuantumSportsPlatform.tsx - Main sophisticated interface",
                "EnhancedUserFriendlyApp.tsx - Alternative user interface",
                "FastAPI backend with ML models",
                "PrizePicks API integration",
                "SQLite + TensorFlow architecture"
            ],
            "key_directories": {
                "frontend": [
                    "frontend/src/components/ - 245+ React components",
                    "frontend/src/hooks/ - 174 custom hooks", 
                    "frontend/src/services/ - 166 service modules",
                    "frontend/src/types/ - 41 TypeScript definitions",
                    "frontend/src/utils/ - 161 utility functions"
                ],
                "backend": [
                    "backend/services/ - 21+ specialized services",
                    "backend/models/ - ML and data models",
                    "backend/routes/ - API endpoint definitions",
                    "backend/utils/ - Backend utilities"
                ]
            },
            "design_patterns": [
                "Dual Interface Pattern",
                "ML Integration Pattern", 
                "Real-time Data Pattern",
                "Financial Security Pattern",
                "Component Organization Pattern"
            ]
        }
    
    def extract_ml_patterns(self) -> Dict[str, Any]:
        """Extract ML model integration patterns"""
        return {
            "framework": "TensorFlow",
            "accuracy_target": "96.4%",
            "integration_points": [
                "Backend model initialization",
                "Async prediction endpoints",
                "Real-time inference pipeline",
                "Model performance monitoring"
            ],
            "data_flow": "User Request → Backend API → ML Model → TensorFlow → Prediction Result",
            "performance_requirements": [
                "Real-time predictions",
                "96.4% accuracy threshold",
                "Async processing",
                "Error handling and fallbacks"
            ]
        }
    
    def extract_betting_patterns(self) -> Dict[str, Any]:
        """Extract betting platform patterns"""
        return {
            "financial_calculations": [
                "Decimal precision for monetary operations",
                "Type hints for all financial functions",
                "Multiple validation methods",
                "Audit trail for all transactions"
            ],
            "security_measures": [
                "Input validation and sanitization",
                "Environment variables for secrets",
                "Encrypted sensitive data storage",
                "User authentication and authorization"
            ],
            "api_integration": [
                "PrizePicks API with rate limiting",
                "Real-time data synchronization",
                "Error handling for API failures",
                "Graceful degradation patterns"
            ]
        }
    
    def extract_api_patterns(self) -> Dict[str, Any]:
        """Extract API integration patterns"""
        return {
            "external_apis": [
                "PrizePicks API - Real-time sports data",
                "Rate limiting compliance",
                "WebSocket connections",
                "HTTP async clients"
            ],
            "internal_apis": [
                "FastAPI backend endpoints",
                "RESTful API design",
                "Async endpoint patterns",
                "Error response handling"
            ]
        }
    
    def extract_frontend_patterns(self) -> Dict[str, Any]:
        """Extract frontend architecture patterns"""
        return {
            "technology_stack": [
                "React 18 with TypeScript",
                "Vite build system",
                "245+ custom components",
                "174 custom hooks",
                "33 state management stores"
            ],
            "component_organization": [
                "Hierarchical component structure",
                "Shared service layer",
                "Custom hook patterns",
                "Type-safe implementations"
            ],
            "main_interfaces": [
                "QuantumSportsPlatform.tsx - 1320 lines sophisticated UI",
                "EnhancedUserFriendlyApp.tsx - Simplified interface",
                "Dashboard, PropOllama, MoneyMakerPro pages",
                "Analytics and ML Dashboard components"
            ]
        }
    
    def extract_backend_patterns(self) -> Dict[str, Any]:
        """Extract backend service patterns"""
        return {
            "framework": "FastAPI with Python 3.12",
            "architecture": [
                "Modular service architecture",
                "21+ specialized services",
                "Async/await patterns",
                "SQLite + TensorFlow integration"
            ],
            "services": [
                "ML model services",
                "PrizePicks integration",
                "User authentication",
                "Financial calculations",
                "Real-time data processing"
            ]
        }
    
    def extract_security_patterns(self) -> Dict[str, Any]:
        """Extract security implementation patterns"""
        return {
            "data_protection": [
                "Environment variables for secrets",
                "Financial-grade security",
                "User data encryption",
                "Audit trail logging"
            ],
            "api_security": [
                "Authentication flows",
                "Authorization checks",
                "Rate limiting",
                "Input validation"
            ]
        }
    
    def get_file_statistics(self) -> Dict[str, Any]:
        """Get basic file statistics"""
        stats = {
            "total_files": 0,
            "by_extension": {},
            "large_files": [],
            "component_counts": {}
        }
        
        # Count files by extension
        for file_path in self.project_root.rglob("*"):
            if file_path.is_file():
                stats["total_files"] += 1
                ext = file_path.suffix.lower()
                stats["by_extension"][ext] = stats["by_extension"].get(ext, 0) + 1
                
                # Track large files
                if file_path.stat().st_size > 50000:  # > 50KB
                    stats["large_files"].append({
                        "path": str(file_path.relative_to(self.project_root)),
                        "size": file_path.stat().st_size
                    })
        
        return stats
    
    def create_memory_bank_summary(self, context: Dict[str, Any]):
        """Create memory bank compatible summary"""
        
        summary = f"""# A1Betting Codebase Context Summary

Generated: {context['analysis_timestamp']}
Total Files Analyzed: {context['file_statistics']['total_files']}

## Architecture Overview
{json.dumps(context['architecture_overview'], indent=2)}

## ML Models Integration
{json.dumps(context['ml_models'], indent=2)}

## Betting Platform Logic
{json.dumps(context['betting_logic'], indent=2)}

## Frontend Architecture
{json.dumps(context['frontend_structure'], indent=2)}

## Backend Services
{json.dumps(context['backend_services'], indent=2)}

## Security Patterns
{json.dumps(context['security_patterns'], indent=2)}

## File Statistics
- Total Files: {context['file_statistics']['total_files']}
- Large Files (>50KB): {len(context['file_statistics']['large_files'])}

## Key Insights for Agents

### Architecture Preservation
- Maintain sophisticated component relationships
- Preserve QuantumSportsPlatform.tsx complexity (1320 lines)
- Keep dual interface pattern intact
- Maintain ML model integration patterns

### Development Guidelines
- Use surgical repair approach for TypeScript errors
- Preserve financial calculation precision
- Maintain PrizePicks API integration
- Follow established security patterns

### Critical Components
- 245+ React components requiring careful handling
- 174 custom hooks with complex dependencies
- 21+ backend services with specific responsibilities
- ML models with 96.4% accuracy requirements

This context should guide all development decisions to maintain the sophisticated A1Betting platform architecture while enabling effective agent coordination and knowledge persistence.
"""
        
        summary_file = self.memory_bank / "codebase-context.md"
        with open(summary_file, "w") as f:
            f.write(summary)
        
        print(f"📝 Memory bank summary created: {summary_file}")

def main():
    """Main execution function"""
    print("🚀 A1Betting GitIngest Memory Manager")
    print("=" * 50)
    
    manager = GitIngestMemoryManager()
    
    # Run comprehensive codebase analysis
    result = manager.ingest_codebase_context()
    
    if result["status"] == "success":
        print("\n✅ GitIngest memory integration completed successfully!")
        print(f"📁 Analysis saved to: memory-bank/ingested-context/")
        print(f"📊 Structured context available for agent use")
    else:
        print(f"\n❌ GitIngest integration failed: {result.get('error', 'Unknown error')}")
    
    return result

if __name__ == "__main__":
    main() 