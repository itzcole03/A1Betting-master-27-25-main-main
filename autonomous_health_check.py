#!/usr/bin/env python3
"""
Autonomous Health Check System

Continuous monitoring and self-assessment for A1Betting platform.
"""

import time
import subprocess
import json
import psutil
import requests
from datetime import datetime
from pathlib import Path

class AutonomousHealthChecker:
    def __init__(self):
        self.health_log = Path("autonomous_health_log.json")
        self.alert_thresholds = {
            'cpu_usage': 80,
            'memory_usage': 85,
            'disk_usage': 90,
            'api_response_time': 1000,  # milliseconds
            'test_failure_rate': 5      # percentage
        }
    
    def autonomous_health_check(self):
        """Execute comprehensive health assessment"""
        health_report = {
            'timestamp': datetime.now().isoformat(),
            'tests_status': 'checking',
            'api_status': 'checking',
            'database_status': 'checking',
            'performance_metrics': {},
            'system_health': {},
            'recommendations': []
        }
        
        # Test suite validation
        try:
            print("🧪 Running test suite validation...")
            result = subprocess.run(['python', '-m', 'pytest', 'backend/tests/', '-q'], 
                                  capture_output=True, text=True, timeout=300, cwd='.')
            health_report['tests_status'] = 'passing' if result.returncode == 0 else 'failing'
            health_report['test_details'] = result.stdout
            
            if result.returncode != 0:
                health_report['recommendations'].append("Test failures detected - review test output")
                
        except Exception as e:
            health_report['tests_status'] = f'error: {e}'
            health_report['recommendations'].append("Test execution failed - check environment")
        
        # API health check
        try:
            print("🌐 Checking API health...")
            start_time = time.time()
            response = requests.get('http://localhost:8000/api/health', timeout=10)
            response_time = (time.time() - start_time) * 1000
            
            health_report['api_status'] = 'healthy' if response.status_code == 200 else 'unhealthy'
            health_report['api_response_time'] = response_time
            
            if response_time > self.alert_thresholds['api_response_time']:
                health_report['recommendations'].append("API response time is slow - consider optimization")
                
        except Exception as e:
            health_report['api_status'] = f'error: {e}'
            health_report['recommendations'].append("API not accessible - check backend service")
        
        # System performance metrics
        try:
            print("📊 Gathering system metrics...")
            cpu_percent = psutil.cpu_percent(interval=1)
            memory = psutil.virtual_memory()
            disk = psutil.disk_usage('/')
            
            health_report['performance_metrics'] = {
                'cpu_percent': cpu_percent,
                'memory_percent': memory.percent,
                'disk_percent': (disk.used / disk.total) * 100,
                'memory_available_gb': memory.available / (1024**3),
                'disk_free_gb': disk.free / (1024**3)
            }
            
            # Generate performance recommendations
            if cpu_percent > self.alert_thresholds['cpu_usage']:
                health_report['recommendations'].append(f"High CPU usage: {cpu_percent}% - consider optimization")
            
            if memory.percent > self.alert_thresholds['memory_usage']:
                health_report['recommendations'].append(f"High memory usage: {memory.percent}% - consider cleanup")
                
            if (disk.used / disk.total) * 100 > self.alert_thresholds['disk_usage']:
                health_report['recommendations'].append("High disk usage - consider cleanup")
                
        except Exception as e:
            health_report['performance_metrics'] = {'error': str(e)}
        
        # Database connectivity check
        try:
            print("🗄️ Checking database connectivity...")
            # Simple file-based check for SQLite (production would use PostgreSQL)
            db_files = list(Path('.').glob('**/*.db'))
            health_report['database_status'] = 'connected' if db_files else 'no_database_found'
            
            if not db_files:
                health_report['recommendations'].append("No database files found - verify database setup")
                
        except Exception as e:
            health_report['database_status'] = f'error: {e}'
        
        # Overall system health assessment
        health_score = self.calculate_health_score(health_report)
        health_report['system_health'] = {
            'overall_score': health_score,
            'status': 'excellent' if health_score >= 90 else 'good' if health_score >= 75 else 'needs_attention',
            'critical_issues': len([r for r in health_report['recommendations'] if 'error' in r.lower()]),
            'optimization_opportunities': len(health_report['recommendations'])
        }
        
        # Log health report
        with open(self.health_log, 'a') as f:
            f.write(json.dumps(health_report) + '\n')
        
        print(f"✅ Health check complete - Score: {health_score}/100")
        print(f"📋 Recommendations: {len(health_report['recommendations'])}")
        
        return health_report
    
    def calculate_health_score(self, report):
        """Calculate overall system health score (0-100)"""
        score = 100
        
        # Deduct points for issues
        if report['tests_status'] != 'passing':
            score -= 20
        
        if report['api_status'] != 'healthy':
            score -= 25
        
        if report['database_status'] != 'connected':
            score -= 15
        
        # Performance deductions
        metrics = report.get('performance_metrics', {})
        if isinstance(metrics.get('cpu_percent'), (int, float)):
            if metrics['cpu_percent'] > 80:
                score -= 10
        
        if isinstance(metrics.get('memory_percent'), (int, float)):
            if metrics['memory_percent'] > 85:
                score -= 15
        
        if isinstance(metrics.get('disk_percent'), (int, float)):
            if metrics['disk_percent'] > 90:
                score -= 15
        
        return max(0, score)
    
    def get_health_trends(self, hours=24):
        """Analyze health trends over specified hours"""
        try:
            if not self.health_log.exists():
                return {'error': 'No health history available'}
            
            with open(self.health_log, 'r') as f:
                lines = f.readlines()
            
            # Get recent records
            recent_records = []
            cutoff_time = datetime.now().timestamp() - (hours * 3600)
            
            for line in lines[-100:]:  # Check last 100 records
                try:
                    record = json.loads(line)
                    record_time = datetime.fromisoformat(record['timestamp'].replace('Z', '+00:00'))
                    if record_time.timestamp() > cutoff_time:
                        recent_records.append(record)
                except:
                    continue
            
            if not recent_records:
                return {'error': 'No recent health data'}
            
            # Calculate trends
            health_scores = []
            api_response_times = []
            
            for record in recent_records:
                if 'system_health' in record and 'overall_score' in record['system_health']:
                    health_scores.append(record['system_health']['overall_score'])
                
                if 'api_response_time' in record and isinstance(record['api_response_time'], (int, float)):
                    api_response_times.append(record['api_response_time'])
            
            trends = {
                'health_trend': 'stable',
                'performance_trend': 'stable',
                'current_health_score': health_scores[-1] if health_scores else 0,
                'average_health_score': sum(health_scores) / len(health_scores) if health_scores else 0,
                'health_records_analyzed': len(recent_records)
            }
            
            # Determine trends
            if len(health_scores) >= 2:
                if health_scores[-1] > health_scores[0]:
                    trends['health_trend'] = 'improving'
                elif health_scores[-1] < health_scores[0]:
                    trends['health_trend'] = 'declining'
            
            if len(api_response_times) >= 2:
                if api_response_times[-1] < api_response_times[0]:
                    trends['performance_trend'] = 'improving'
                elif api_response_times[-1] > api_response_times[0]:
                    trends['performance_trend'] = 'declining'
            
            return trends
            
        except Exception as e:
            return {'error': str(e)}

def main():
    """Main execution function"""
    print("🤖 Autonomous Health Check System Starting...")
    
    checker = AutonomousHealthChecker()
    
    # Run health check
    health_report = checker.autonomous_health_check()
    
    # Analyze trends
    trends = checker.get_health_trends()
    
    # Summary output
    print(f"\n📊 HEALTH SUMMARY:")
    print(f"Status: {health_report['tests_status']} | API: {health_report['api_status']}")
    print(f"Overall Score: {health_report['system_health']['overall_score']}/100")
    print(f"Trend: {trends.get('health_trend', 'unknown')}")
    
    if health_report['recommendations']:
        print(f"\n💡 RECOMMENDATIONS:")
        for i, rec in enumerate(health_report['recommendations'][:5], 1):
            print(f"{i}. {rec}")
    
    return health_report

if __name__ == "__main__":
    main() 