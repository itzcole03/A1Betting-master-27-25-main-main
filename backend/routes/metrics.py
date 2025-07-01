import time
import psutil
from datetime import datetime
from typing import Dict, Any
from fastapi import APIRouter

router = APIRouter()

class PerformanceMetrics:
    def __init__(self):
        self.start_time = time.time()
        self.request_count = 0
        self.error_count = 0
        self.response_times = []
    
    def record_request(self, response_time: float, is_error: bool = False):
        """Record a request for metrics"""
        self.request_count += 1
        if is_error:
            self.error_count += 1
        self.response_times.append(response_time)
        
        # Keep only last 1000 response times
        if len(self.response_times) > 1000:
            self.response_times = self.response_times[-1000:]
    
    def get_metrics(self) -> Dict[str, Any]:
        """Get current performance metrics"""
        current_time = time.time()
        uptime = current_time - self.start_time
        
        # Calculate response time statistics
        avg_response_time = sum(self.response_times) / len(self.response_times) if self.response_times else 0
        
        # System metrics
        cpu_percent = psutil.cpu_percent()
        memory = psutil.virtual_memory()
        
        return {
            "timestamp": datetime.now().isoformat(),
            "uptime_seconds": uptime,
            "request_count": self.request_count,
            "error_count": self.error_count,
            "error_rate": (self.error_count / self.request_count * 100) if self.request_count > 0 else 0,
            "average_response_time_ms": avg_response_time * 1000,
            "requests_per_second": self.request_count / uptime if uptime > 0 else 0,
            "system_metrics": {
                "cpu_usage_percent": cpu_percent,
                "memory_usage_percent": memory.percent,
                "memory_available_gb": memory.available / (1024**3)
            }
        }

# Global metrics instance
performance_metrics = PerformanceMetrics()

@router.get("/metrics")
async def get_performance_metrics():
    """Get current performance metrics"""
    return performance_metrics.get_metrics()

@router.get("/metrics/prometheus")
async def get_prometheus_metrics():
    """Get metrics in Prometheus format"""
    metrics = performance_metrics.get_metrics()
    
    prometheus_format = f"""# HELP requests_total Total number of requests
# TYPE requests_total counter
requests_total {metrics['request_count']}

# HELP errors_total Total number of errors
# TYPE errors_total counter
errors_total {metrics['error_count']}

# HELP response_time_seconds Average response time
# TYPE response_time_seconds gauge
response_time_seconds {metrics['average_response_time_ms'] / 1000}

# HELP cpu_usage_percent CPU usage percentage
# TYPE cpu_usage_percent gauge
cpu_usage_percent {metrics['system_metrics']['cpu_usage_percent']}

# HELP memory_usage_percent Memory usage percentage
# TYPE memory_usage_percent gauge
memory_usage_percent {metrics['system_metrics']['memory_usage_percent']}
"""
    
    return prometheus_format
