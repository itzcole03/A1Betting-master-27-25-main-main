#!/usr/bin/env python3
"""
Autonomous Testing & Validation System

Continuous testing, validation, and quality assurance automation.
"""

import subprocess
import json
import time
import requests
import psutil
from datetime import datetime
from pathlib import Path

class AutonomousTester:
    def __init__(self):
        self.test_log = Path("autonomous_test_results.json")
        self.performance_benchmarks = {
            'api_response_time': 500,  # milliseconds
            'memory_usage': 80,        # percentage
            'cpu_usage': 70,           # percentage
            'test_success_rate': 95    # percentage
        }
    
    def run_comprehensive_tests(self):
        """Run comprehensive test suite"""
        print("🧪 Running comprehensive test suite...")
        
        test_results = {
            'timestamp': datetime.now().isoformat(),
            'test_suites': {},
            'performance_benchmarks': {},
            'quality_metrics': {},
            'recommendations': []
        }
        
        # Unit tests
        test_results['test_suites']['unit_tests'] = self.run_unit_tests()
        
        # Integration tests
        test_results['test_suites']['integration_tests'] = self.run_integration_tests()
        
        # API health tests
        test_results['test_suites']['api_tests'] = self.run_api_tests()
        
        # Frontend tests
        test_results['test_suites']['frontend_tests'] = self.run_frontend_tests()
        
        # Performance benchmarks
        test_results['performance_benchmarks'] = self.run_performance_benchmarks()
        
        # Code quality metrics
        test_results['quality_metrics'] = self.run_quality_metrics()
        
        # Generate recommendations
        test_results['recommendations'] = self.generate_test_recommendations(test_results)
        
        # Calculate overall test score
        test_results['overall_score'] = self.calculate_test_score(test_results)
        
        # Save test results
        with open(self.test_log, 'a') as f:
            f.write(json.dumps(test_results) + '\n')
        
        return test_results
    
    def run_unit_tests(self):
        """Run unit tests"""
        try:
            print("  📋 Running unit tests...")
            result = subprocess.run(
                ['python', '-m', 'pytest', 'backend/tests/', '-v', '--tb=short', '--json-report', '--json-report-file=test_report.json'],
                capture_output=True, text=True, timeout=600, cwd='.'
            )
            
            # Parse test results
            test_output = result.stdout
            test_errors = result.stderr
            
            # Try to parse JSON report if available
            test_stats = self.parse_pytest_output(test_output)
            
            return {
                'status': 'passed' if result.returncode == 0 else 'failed',
                'return_code': result.returncode,
                'output': test_output[-1000:],  # Last 1000 chars
                'errors': test_errors[-500:] if test_errors else '',  # Last 500 chars
                'stats': test_stats,
                'execution_time': time.time()
            }
        except subprocess.TimeoutExpired:
            return {
                'status': 'timeout',
                'error': 'Unit tests timed out after 10 minutes'
            }
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e)
            }
    
    def run_integration_tests(self):
        """Run integration tests"""
        try:
            print("  🔗 Running integration tests...")
            # Look for integration test files
            integration_files = list(Path('backend').glob('**/test_*integration*.py'))
            
            if not integration_files:
                return {
                    'status': 'skipped',
                    'reason': 'No integration test files found'
                }
            
            result = subprocess.run(
                ['python', '-m', 'pytest'] + [str(f) for f in integration_files] + ['-v'],
                capture_output=True, text=True, timeout=300, cwd='.'
            )
            
            return {
                'status': 'passed' if result.returncode == 0 else 'failed',
                'return_code': result.returncode,
                'files_tested': len(integration_files),
                'output': result.stdout[-1000:],
                'errors': result.stderr[-500:] if result.stderr else ''
            }
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e)
            }
    
    def run_api_tests(self):
        """Run API health and functionality tests"""
        try:
            print("  🌐 Running API tests...")
            api_tests = []
            
            # Test basic health endpoint
            health_test = self.test_api_endpoint('http://localhost:8000/api/health', 'GET')
            api_tests.append(health_test)
            
            # Test other common endpoints if they exist
            endpoints_to_test = [
                ('http://localhost:8000/api/v1/predictions', 'GET'),
                ('http://localhost:8000/api/v1/performance-stats', 'GET'),
                ('http://localhost:8000/docs', 'GET')
            ]
            
            for url, method in endpoints_to_test:
                test_result = self.test_api_endpoint(url, method)
                api_tests.append(test_result)
            
            # Calculate API test summary
            passed_tests = sum(1 for test in api_tests if test['status'] == 'passed')
            total_tests = len(api_tests)
            
            return {
                'status': 'passed' if passed_tests == total_tests else 'partial' if passed_tests > 0 else 'failed',
                'tests_run': total_tests,
                'tests_passed': passed_tests,
                'tests_failed': total_tests - passed_tests,
                'test_details': api_tests
            }
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e)
            }
    
    def test_api_endpoint(self, url, method='GET', timeout=10):
        """Test a single API endpoint"""
        try:
            start_time = time.time()
            
            if method.upper() == 'GET':
                response = requests.get(url, timeout=timeout)
            elif method.upper() == 'POST':
                response = requests.post(url, timeout=timeout)
            else:
                return {'status': 'error', 'error': f'Unsupported method: {method}'}
            
            response_time = (time.time() - start_time) * 1000  # milliseconds
            
            return {
                'status': 'passed' if response.status_code < 400 else 'failed',
                'url': url,
                'method': method,
                'status_code': response.status_code,
                'response_time_ms': response_time,
                'response_size': len(response.content) if hasattr(response, 'content') else 0
            }
        except requests.exceptions.RequestException as e:
            return {
                'status': 'failed',
                'url': url,
                'method': method,
                'error': str(e)
            }
        except Exception as e:
            return {
                'status': 'error',
                'url': url,
                'method': method,
                'error': str(e)
            }
    
    def run_frontend_tests(self):
        """Run frontend tests"""
        try:
            print("  ⚛️ Running frontend tests...")
            frontend_path = Path('frontend')
            
            if not frontend_path.exists():
                return {
                    'status': 'skipped',
                    'reason': 'Frontend directory not found'
                }
            
            # Check if package.json exists
            package_json = frontend_path / 'package.json'
            if not package_json.exists():
                return {
                    'status': 'skipped',
                    'reason': 'package.json not found'
                }
            
            # Try to run npm test
            result = subprocess.run(
                ['npm', 'test', '--', '--watchAll=false', '--passWithNoTests'],
                capture_output=True, text=True, timeout=300, cwd=str(frontend_path)
            )
            
            return {
                'status': 'passed' if result.returncode == 0 else 'failed',
                'return_code': result.returncode,
                'output': result.stdout[-1000:],
                'errors': result.stderr[-500:] if result.stderr else ''
            }
        except subprocess.TimeoutExpired:
            return {
                'status': 'timeout',
                'error': 'Frontend tests timed out'
            }
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e)
            }
    
    def run_performance_benchmarks(self):
        """Run performance benchmarks"""
        try:
            print("  📊 Running performance benchmarks...")
            benchmarks = {}
            
            # API response time benchmark
            api_benchmark = self.benchmark_api_response_time()
            benchmarks['api_response_time'] = api_benchmark
            
            # System resource benchmarks
            system_benchmark = self.benchmark_system_resources()
            benchmarks['system_resources'] = system_benchmark
            
            # Memory usage benchmark
            memory_benchmark = self.benchmark_memory_usage()
            benchmarks['memory_usage'] = memory_benchmark
            
            return benchmarks
        except Exception as e:
            return {'error': str(e)}
    
    def benchmark_api_response_time(self):
        """Benchmark API response time"""
        try:
            response_times = []
            test_url = 'http://localhost:8000/api/health'
            
            # Run 10 requests to get average response time
            for _ in range(10):
                try:
                    start_time = time.time()
                    response = requests.get(test_url, timeout=5)
                    end_time = time.time()
                    
                    if response.status_code == 200:
                        response_times.append((end_time - start_time) * 1000)
                except:
                    pass
            
            if response_times:
                avg_response_time = sum(response_times) / len(response_times)
                return {
                    'average_response_time_ms': avg_response_time,
                    'min_response_time_ms': min(response_times),
                    'max_response_time_ms': max(response_times),
                    'samples': len(response_times),
                    'threshold_ms': self.performance_benchmarks['api_response_time'],
                    'status': 'pass' if avg_response_time < self.performance_benchmarks['api_response_time'] else 'fail'
                }
            else:
                return {
                    'status': 'error',
                    'error': 'No successful API requests'
                }
        except Exception as e:
            return {'error': str(e)}
    
    def benchmark_system_resources(self):
        """Benchmark system resource usage"""
        try:
            # Take measurements over 5 seconds
            cpu_measurements = []
            memory_measurements = []
            
            for _ in range(5):
                cpu_measurements.append(psutil.cpu_percent(interval=1))
                memory_measurements.append(psutil.virtual_memory().percent)
            
            avg_cpu = sum(cpu_measurements) / len(cpu_measurements)
            avg_memory = sum(memory_measurements) / len(memory_measurements)
            
            return {
                'cpu_usage': {
                    'average_percent': avg_cpu,
                    'max_percent': max(cpu_measurements),
                    'threshold_percent': self.performance_benchmarks['cpu_usage'],
                    'status': 'pass' if avg_cpu < self.performance_benchmarks['cpu_usage'] else 'fail'
                },
                'memory_usage': {
                    'average_percent': avg_memory,
                    'max_percent': max(memory_measurements),
                    'threshold_percent': self.performance_benchmarks['memory_usage'],
                    'status': 'pass' if avg_memory < self.performance_benchmarks['memory_usage'] else 'fail'
                }
            }
        except Exception as e:
            return {'error': str(e)}
    
    def benchmark_memory_usage(self):
        """Benchmark memory usage patterns"""
        try:
            memory = psutil.virtual_memory()
            disk = psutil.disk_usage('/')
            
            return {
                'total_memory_gb': memory.total / (1024**3),
                'available_memory_gb': memory.available / (1024**3),
                'memory_usage_percent': memory.percent,
                'disk_usage_percent': (disk.used / disk.total) * 100,
                'disk_free_gb': disk.free / (1024**3)
            }
        except Exception as e:
            return {'error': str(e)}
    
    def run_quality_metrics(self):
        """Run code quality metrics"""
        try:
            print("  📏 Running quality metrics...")
            metrics = {}
            
            # Count lines of code
            metrics['lines_of_code'] = self.count_lines_of_code()
            
            # Count test files
            metrics['test_coverage'] = self.estimate_test_coverage()
            
            # Check for common issues
            metrics['code_issues'] = self.scan_code_issues()
            
            return metrics
        except Exception as e:
            return {'error': str(e)}
    
    def count_lines_of_code(self):
        """Count lines of code in the project"""
        try:
            total_lines = 0
            file_counts = {'python': 0, 'typescript': 0, 'javascript': 0}
            
            for root, dirs, files in os.walk('.'):
                # Skip certain directories
                if any(skip in root for skip in ['node_modules', 'venv', '.git', '__pycache__']):
                    continue
                    
                for file in files:
                    filepath = os.path.join(root, file)
                    try:
                        if file.endswith('.py'):
                            with open(filepath, 'r', encoding='utf-8') as f:
                                lines = len(f.readlines())
                                total_lines += lines
                                file_counts['python'] += lines
                        elif file.endswith(('.ts', '.tsx')):
                            with open(filepath, 'r', encoding='utf-8') as f:
                                lines = len(f.readlines())
                                total_lines += lines
                                file_counts['typescript'] += lines
                        elif file.endswith(('.js', '.jsx')):
                            with open(filepath, 'r', encoding='utf-8') as f:
                                lines = len(f.readlines())
                                total_lines += lines
                                file_counts['javascript'] += lines
                    except:
                        continue
            
            return {
                'total_lines': total_lines,
                'by_language': file_counts
            }
        except Exception as e:
            return {'error': str(e)}
    
    def estimate_test_coverage(self):
        """Estimate test coverage"""
        try:
            test_files = 0
            source_files = 0
            
            for root, dirs, files in os.walk('.'):
                if any(skip in root for skip in ['node_modules', 'venv', '.git', '__pycache__']):
                    continue
                    
                for file in files:
                    if file.endswith(('.py', '.ts', '.tsx', '.js', '.jsx')):
                        if 'test' in file.lower() or 'spec' in file.lower():
                            test_files += 1
                        else:
                            source_files += 1
            
            coverage_ratio = (test_files / source_files * 100) if source_files > 0 else 0
            
            return {
                'test_files': test_files,
                'source_files': source_files,
                'estimated_coverage_percent': coverage_ratio,
                'status': 'good' if coverage_ratio > 30 else 'needs_improvement'
            }
        except Exception as e:
            return {'error': str(e)}
    
    def scan_code_issues(self):
        """Scan for common code issues"""
        try:
            issues = {
                'todo_count': 0,
                'fixme_count': 0,
                'hardcoded_passwords': 0,
                'long_functions': 0
            }
            
            for root, dirs, files in os.walk('.'):
                if any(skip in root for skip in ['node_modules', 'venv', '.git', '__pycache__']):
                    continue
                    
                for file in files:
                    if file.endswith(('.py', '.ts', '.tsx', '.js', '.jsx')):
                        filepath = os.path.join(root, file)
                        try:
                            with open(filepath, 'r', encoding='utf-8') as f:
                                content = f.read()
                                
                            # Count TODOs and FIXMEs
                            issues['todo_count'] += content.upper().count('TODO')
                            issues['fixme_count'] += content.upper().count('FIXME')
                            
                            # Check for potential hardcoded passwords
                            if 'password' in content.lower() and '=' in content:
                                issues['hardcoded_passwords'] += 1
                            
                            # Check for long functions (rough estimate)
                            lines = content.split('\n')
                            in_function = False
                            function_length = 0
                            
                            for line in lines:
                                if 'def ' in line or 'function ' in line:
                                    if function_length > 50:  # Function longer than 50 lines
                                        issues['long_functions'] += 1
                                    in_function = True
                                    function_length = 0
                                elif in_function:
                                    function_length += 1
                                    if line.strip() == '' or line.strip().startswith('#'):
                                        continue
                                    if line.startswith('def ') or line.startswith('class '):
                                        in_function = False
                                        
                        except:
                            continue
            
            return issues
        except Exception as e:
            return {'error': str(e)}
    
    def parse_pytest_output(self, output):
        """Parse pytest output to extract statistics"""
        try:
            stats = {
                'total_tests': 0,
                'passed': 0,
                'failed': 0,
                'skipped': 0,
                'errors': 0
            }
            
            # Look for pytest summary line
            lines = output.split('\n')
            for line in lines:
                if 'passed' in line and ('failed' in line or 'error' in line or 'skipped' in line):
                    # Parse summary line like "5 passed, 2 failed, 1 skipped"
                    parts = line.split()
                    for i, part in enumerate(parts):
                        if part.isdigit() and i + 1 < len(parts):
                            count = int(part)
                            status = parts[i + 1]
                            if 'passed' in status:
                                stats['passed'] = count
                            elif 'failed' in status:
                                stats['failed'] = count
                            elif 'skipped' in status:
                                stats['skipped'] = count
                            elif 'error' in status:
                                stats['errors'] = count
                    break
            
            stats['total_tests'] = stats['passed'] + stats['failed'] + stats['skipped'] + stats['errors']
            return stats
        except Exception:
            return {'total_tests': 0, 'passed': 0, 'failed': 0, 'skipped': 0, 'errors': 0}
    
    def generate_test_recommendations(self, test_results):
        """Generate recommendations based on test results"""
        recommendations = []
        
        # Unit test recommendations
        unit_tests = test_results.get('test_suites', {}).get('unit_tests', {})
        if unit_tests.get('status') == 'failed':
            recommendations.append("Unit tests are failing - review and fix failing tests")
        
        # API test recommendations
        api_tests = test_results.get('test_suites', {}).get('api_tests', {})
        if api_tests.get('status') == 'failed':
            recommendations.append("API tests are failing - check API endpoints and connectivity")
        
        # Performance recommendations
        performance = test_results.get('performance_benchmarks', {})
        api_perf = performance.get('api_response_time', {})
        if api_perf.get('status') == 'fail':
            recommendations.append("API response time is slow - consider optimization")
        
        system_perf = performance.get('system_resources', {})
        if system_perf.get('cpu_usage', {}).get('status') == 'fail':
            recommendations.append("High CPU usage detected - investigate resource-intensive processes")
        
        if system_perf.get('memory_usage', {}).get('status') == 'fail':
            recommendations.append("High memory usage detected - consider memory optimization")
        
        # Quality recommendations
        quality = test_results.get('quality_metrics', {})
        test_coverage = quality.get('test_coverage', {})
        if test_coverage.get('status') == 'needs_improvement':
            recommendations.append("Test coverage is low - add more test cases")
        
        code_issues = quality.get('code_issues', {})
        if code_issues.get('todo_count', 0) > 10:
            recommendations.append(f"High number of TODOs ({code_issues['todo_count']}) - consider addressing them")
        
        if code_issues.get('fixme_count', 0) > 0:
            recommendations.append(f"FIXMEs found ({code_issues['fixme_count']}) - these should be addressed")
        
        return recommendations
    
    def calculate_test_score(self, test_results):
        """Calculate overall test score (0-100)"""
        score = 100
        
        # Deduct points for test failures
        unit_tests = test_results.get('test_suites', {}).get('unit_tests', {})
        if unit_tests.get('status') == 'failed':
            score -= 25
        elif unit_tests.get('status') == 'error':
            score -= 30
        
        api_tests = test_results.get('test_suites', {}).get('api_tests', {})
        if api_tests.get('status') == 'failed':
            score -= 20
        elif api_tests.get('status') == 'partial':
            score -= 10
        
        # Deduct points for performance issues
        performance = test_results.get('performance_benchmarks', {})
        if performance.get('api_response_time', {}).get('status') == 'fail':
            score -= 15
        
        system_perf = performance.get('system_resources', {})
        if system_perf.get('cpu_usage', {}).get('status') == 'fail':
            score -= 10
        if system_perf.get('memory_usage', {}).get('status') == 'fail':
            score -= 10
        
        # Deduct points for quality issues
        quality = test_results.get('quality_metrics', {})
        if quality.get('test_coverage', {}).get('status') == 'needs_improvement':
            score -= 10
        
        return max(0, score)
    
    def analyze_test_trends(self, hours=24):
        """Analyze test result trends"""
        try:
            if not self.test_log.exists():
                return {'error': 'No test history available'}
            
            with open(self.test_log, 'r') as f:
                lines = f.readlines()
            
            # Get recent records
            recent_records = []
            cutoff_time = datetime.now().timestamp() - (hours * 3600)
            
            for line in lines[-50:]:  # Check last 50 records
                try:
                    record = json.loads(line)
                    record_time = datetime.fromisoformat(record['timestamp'].replace('Z', '+00:00'))
                    if record_time.timestamp() > cutoff_time:
                        recent_records.append(record)
                except:
                    continue
            
            if not recent_records:
                return {'error': 'No recent test data'}
            
            # Calculate trends
            test_scores = [r.get('overall_score', 0) for r in recent_records]
            
            trends = {
                'test_runs': len(recent_records),
                'average_score': sum(test_scores) / len(test_scores) if test_scores else 0,
                'latest_score': test_scores[-1] if test_scores else 0,
                'trend': 'stable'
            }
            
            # Determine trend
            if len(test_scores) >= 2:
                if test_scores[-1] > test_scores[0]:
                    trends['trend'] = 'improving'
                elif test_scores[-1] < test_scores[0]:
                    trends['trend'] = 'declining'
            
            return trends
            
        except Exception as e:
            return {'error': str(e)}
    
    def run_autonomous_testing(self):
        """Run complete autonomous testing cycle"""
        print("🤖 Autonomous Testing System Starting...")
        
        # Run comprehensive tests
        test_results = self.run_comprehensive_tests()
        
        # Analyze trends
        trends = self.analyze_test_trends()
        
        # Summary output
        print(f"\n📊 TEST SUMMARY:")
        print(f"Overall Score: {test_results.get('overall_score', 0)}/100")
        print(f"Unit Tests: {test_results.get('test_suites', {}).get('unit_tests', {}).get('status', 'unknown')}")
        print(f"API Tests: {test_results.get('test_suites', {}).get('api_tests', {}).get('status', 'unknown')}")
        print(f"Performance: {test_results.get('performance_benchmarks', {}).get('api_response_time', {}).get('status', 'unknown')}")
        print(f"Trend: {trends.get('trend', 'unknown')}")
        
        if test_results.get('recommendations'):
            print(f"\n💡 RECOMMENDATIONS:")
            for i, rec in enumerate(test_results['recommendations'][:5], 1):
                print(f"{i}. {rec}")
        
        print(f"\n📝 Test results saved to {self.test_log}")
        
        return test_results

def main():
    """Main execution function"""
    import os
    tester = AutonomousTester()
    return tester.run_autonomous_testing()

if __name__ == "__main__":
    main() 