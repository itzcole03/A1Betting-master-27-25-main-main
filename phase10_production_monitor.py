#!/usr/bin/env python3
"""
Phase 10: Production Monitoring & Optimization System
Comprehensive monitoring for A1Betting platform production deployment
"""

import asyncio
import logging
import json
import time
import psutil
import aiohttp
from datetime import datetime, timezone
from typing import Dict, List, Any, Optional
from dataclasses import dataclass, asdict
from enum import Enum
import sqlite3
from pathlib import Path

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('production_monitor.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class HealthStatus(Enum):
    HEALTHY = "healthy"
    WARNING = "warning"
    CRITICAL = "critical"
    DOWN = "down"

@dataclass
class SystemMetrics:
    timestamp: str
    cpu_usage: float
    memory_usage: float
    disk_usage: float
    network_io: Dict[str, int]
    active_connections: int
    response_time: float
    error_rate: float
    uptime: float

@dataclass
class UserMetrics:
    timestamp: str
    total_users: int
    active_users_24h: int
    active_users_7d: int
    new_registrations: int
    user_retention_rate: float
    avg_session_duration: float
    feature_usage: Dict[str, int]

@dataclass
class BusinessMetrics:
    timestamp: str
    predictions_generated: int
    arbitrage_opportunities_found: int
    user_engagement_score: float
    average_confidence_score: float
    successful_predictions: int
    total_revenue: float
    conversion_rate: float

class ProductionMonitor:
    def __init__(self):
        self.db_path = "production_metrics.db"
        self.api_base_url = "http://localhost:8000"
        self.frontend_url = "http://localhost:3000"
        self.monitoring_interval = 60  # seconds
        self.alert_thresholds = {
            'cpu_usage': 80.0,
            'memory_usage': 85.0,
            'disk_usage': 90.0,
            'response_time': 2000.0,  # ms
            'error_rate': 5.0,  # %
            'uptime': 99.0  # %
        }
        self.init_database()

    def init_database(self):
        """Initialize SQLite database for metrics storage"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # System metrics table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS system_metrics (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    timestamp TEXT NOT NULL,
                    cpu_usage REAL,
                    memory_usage REAL,
                    disk_usage REAL,
                    network_io TEXT,
                    active_connections INTEGER,
                    response_time REAL,
                    error_rate REAL,
                    uptime REAL
                )
            ''')
            
            # User metrics table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS user_metrics (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    timestamp TEXT NOT NULL,
                    total_users INTEGER,
                    active_users_24h INTEGER,
                    active_users_7d INTEGER,
                    new_registrations INTEGER,
                    user_retention_rate REAL,
                    avg_session_duration REAL,
                    feature_usage TEXT
                )
            ''')
            
            # Business metrics table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS business_metrics (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    timestamp TEXT NOT NULL,
                    predictions_generated INTEGER,
                    arbitrage_opportunities_found INTEGER,
                    user_engagement_score REAL,
                    average_confidence_score REAL,
                    successful_predictions INTEGER,
                    total_revenue REAL,
                    conversion_rate REAL
                )
            ''')
            
            conn.commit()
            conn.close()
            logger.info("Database initialized successfully")
            
        except Exception as e:
            logger.error(f"Database initialization failed: {e}")

    async def collect_system_metrics(self) -> SystemMetrics:
        """Collect system performance metrics"""
        try:
            # CPU and Memory
            cpu_usage = psutil.cpu_percent(interval=1)
            memory = psutil.virtual_memory()
            disk = psutil.disk_usage('/')
            
            # Network I/O
            network = psutil.net_io_counters()
            network_io = {
                'bytes_sent': network.bytes_sent,
                'bytes_recv': network.bytes_recv,
                'packets_sent': network.packets_sent,
                'packets_recv': network.packets_recv
            }
            
            # API Response Time
            response_time = await self.measure_api_response_time()
            
            # Error Rate (mock for now)
            error_rate = await self.calculate_error_rate()
            
            # Uptime
            uptime = time.time() - psutil.boot_time()
            
            return SystemMetrics(
                timestamp=datetime.now(timezone.utc).isoformat(),
                cpu_usage=cpu_usage,
                memory_usage=memory.percent,
                disk_usage=disk.percent,
                network_io=network_io,
                active_connections=len(psutil.net_connections()),
                response_time=response_time,
                error_rate=error_rate,
                uptime=uptime
            )
            
        except Exception as e:
            logger.error(f"Failed to collect system metrics: {e}")
            return None

    async def measure_api_response_time(self) -> float:
        """Measure API response time"""
        try:
            start_time = time.time()
            async with aiohttp.ClientSession() as session:
                async with session.get(f"{self.api_base_url}/health") as response:
                    await response.text()
            return (time.time() - start_time) * 1000  # Convert to ms
        except Exception as e:
            logger.error(f"Failed to measure API response time: {e}")
            return 9999.0  # High value to indicate failure

    async def calculate_error_rate(self) -> float:
        """Calculate current error rate"""
        try:
            # This would typically query logs or metrics from the last hour
            # For now, return a mock value
            return 0.5  # 0.5% error rate
        except Exception as e:
            logger.error(f"Failed to calculate error rate: {e}")
            return 0.0

    async def collect_user_metrics(self) -> UserMetrics:
        """Collect user engagement metrics"""
        try:
            # Mock user metrics - in production, this would query the database
            return UserMetrics(
                timestamp=datetime.now(timezone.utc).isoformat(),
                total_users=150,
                active_users_24h=45,
                active_users_7d=89,
                new_registrations=8,
                user_retention_rate=78.5,
                avg_session_duration=12.3,  # minutes
                feature_usage={
                    'predictions': 234,
                    'arbitrage': 156,
                    'analytics': 89,
                    'portfolio': 67
                }
            )
        except Exception as e:
            logger.error(f"Failed to collect user metrics: {e}")
            return None

    async def collect_business_metrics(self) -> BusinessMetrics:
        """Collect business performance metrics"""
        try:
            # Mock business metrics - in production, this would query the database
            return BusinessMetrics(
                timestamp=datetime.now(timezone.utc).isoformat(),
                predictions_generated=234,
                arbitrage_opportunities_found=45,
                user_engagement_score=8.2,
                average_confidence_score=0.76,
                successful_predictions=178,
                total_revenue=0.0,  # Not implemented yet
                conversion_rate=23.4
            )
        except Exception as e:
            logger.error(f"Failed to collect business metrics: {e}")
            return None

    def store_metrics(self, system_metrics: SystemMetrics, user_metrics: UserMetrics, business_metrics: BusinessMetrics):
        """Store metrics in database"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            if system_metrics:
                cursor.execute('''
                    INSERT INTO system_metrics 
                    (timestamp, cpu_usage, memory_usage, disk_usage, network_io, 
                     active_connections, response_time, error_rate, uptime)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    system_metrics.timestamp,
                    system_metrics.cpu_usage,
                    system_metrics.memory_usage,
                    system_metrics.disk_usage,
                    json.dumps(system_metrics.network_io),
                    system_metrics.active_connections,
                    system_metrics.response_time,
                    system_metrics.error_rate,
                    system_metrics.uptime
                ))
            
            if user_metrics:
                cursor.execute('''
                    INSERT INTO user_metrics 
                    (timestamp, total_users, active_users_24h, active_users_7d, 
                     new_registrations, user_retention_rate, avg_session_duration, feature_usage)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    user_metrics.timestamp,
                    user_metrics.total_users,
                    user_metrics.active_users_24h,
                    user_metrics.active_users_7d,
                    user_metrics.new_registrations,
                    user_metrics.user_retention_rate,
                    user_metrics.avg_session_duration,
                    json.dumps(user_metrics.feature_usage)
                ))
            
            if business_metrics:
                cursor.execute('''
                    INSERT INTO business_metrics 
                    (timestamp, predictions_generated, arbitrage_opportunities_found, 
                     user_engagement_score, average_confidence_score, successful_predictions, 
                     total_revenue, conversion_rate)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    business_metrics.timestamp,
                    business_metrics.predictions_generated,
                    business_metrics.arbitrage_opportunities_found,
                    business_metrics.user_engagement_score,
                    business_metrics.average_confidence_score,
                    business_metrics.successful_predictions,
                    business_metrics.total_revenue,
                    business_metrics.conversion_rate
                ))
            
            conn.commit()
            conn.close()
            logger.info("Metrics stored successfully")
            
        except Exception as e:
            logger.error(f"Failed to store metrics: {e}")

    def check_health_status(self, system_metrics: SystemMetrics) -> HealthStatus:
        """Determine overall system health status"""
        if not system_metrics:
            return HealthStatus.DOWN
        
        critical_issues = 0
        warning_issues = 0
        
        # Check each metric against thresholds
        if system_metrics.cpu_usage > self.alert_thresholds['cpu_usage']:
            critical_issues += 1
        elif system_metrics.cpu_usage > self.alert_thresholds['cpu_usage'] * 0.8:
            warning_issues += 1
            
        if system_metrics.memory_usage > self.alert_thresholds['memory_usage']:
            critical_issues += 1
        elif system_metrics.memory_usage > self.alert_thresholds['memory_usage'] * 0.8:
            warning_issues += 1
            
        if system_metrics.response_time > self.alert_thresholds['response_time']:
            critical_issues += 1
        elif system_metrics.response_time > self.alert_thresholds['response_time'] * 0.8:
            warning_issues += 1
            
        if system_metrics.error_rate > self.alert_thresholds['error_rate']:
            critical_issues += 1
        elif system_metrics.error_rate > self.alert_thresholds['error_rate'] * 0.8:
            warning_issues += 1
        
        if critical_issues > 0:
            return HealthStatus.CRITICAL
        elif warning_issues > 0:
            return HealthStatus.WARNING
        else:
            return HealthStatus.HEALTHY

    async def send_alert(self, status: HealthStatus, metrics: SystemMetrics):
        """Send alerts for critical issues"""
        if status in [HealthStatus.CRITICAL, HealthStatus.DOWN]:
            alert_message = f"""
🚨 CRITICAL ALERT - A1Betting Production System

Status: {status.value.upper()}
Timestamp: {datetime.now(timezone.utc).isoformat()}

System Metrics:
- CPU Usage: {metrics.cpu_usage if metrics else 'N/A'}%
- Memory Usage: {metrics.memory_usage if metrics else 'N/A'}%
- Response Time: {metrics.response_time if metrics else 'N/A'}ms
- Error Rate: {metrics.error_rate if metrics else 'N/A'}%

Immediate action required!
            """
            logger.critical(alert_message)
            # In production, this would send to Slack, email, or SMS

    def generate_health_report(self) -> Dict[str, Any]:
        """Generate comprehensive health report"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Get latest metrics
            cursor.execute('SELECT * FROM system_metrics ORDER BY timestamp DESC LIMIT 1')
            latest_system = cursor.fetchone()
            
            cursor.execute('SELECT * FROM user_metrics ORDER BY timestamp DESC LIMIT 1')
            latest_user = cursor.fetchone()
            
            cursor.execute('SELECT * FROM business_metrics ORDER BY timestamp DESC LIMIT 1')
            latest_business = cursor.fetchone()
            
            # Calculate trends (last 24 hours)
            cursor.execute('''
                SELECT AVG(cpu_usage), AVG(memory_usage), AVG(response_time), AVG(error_rate)
                FROM system_metrics 
                WHERE timestamp > datetime('now', '-24 hours')
            ''')
            trends = cursor.fetchone()
            
            conn.close()
            
            return {
                'timestamp': datetime.now(timezone.utc).isoformat(),
                'status': 'operational',
                'latest_metrics': {
                    'system': latest_system,
                    'user': latest_user,
                    'business': latest_business
                },
                'trends_24h': {
                    'avg_cpu': trends[0] if trends[0] else 0,
                    'avg_memory': trends[1] if trends[1] else 0,
                    'avg_response_time': trends[2] if trends[2] else 0,
                    'avg_error_rate': trends[3] if trends[3] else 0
                }
            }
            
        except Exception as e:
            logger.error(f"Failed to generate health report: {e}")
            return {'status': 'error', 'message': str(e)}

    async def monitoring_loop(self):
        """Main monitoring loop"""
        logger.info("🚀 Starting Production Monitoring System")
        logger.info(f"Monitoring interval: {self.monitoring_interval} seconds")
        
        while True:
            try:
                # Collect all metrics
                system_metrics = await self.collect_system_metrics()
                user_metrics = await self.collect_user_metrics()
                business_metrics = await self.collect_business_metrics()
                
                # Store metrics
                self.store_metrics(system_metrics, user_metrics, business_metrics)
                
                # Check health status
                health_status = self.check_health_status(system_metrics)
                
                # Send alerts if necessary
                if health_status in [HealthStatus.CRITICAL, HealthStatus.DOWN]:
                    await self.send_alert(health_status, system_metrics)
                
                # Log status
                logger.info(f"Health Status: {health_status.value} | "
                          f"CPU: {system_metrics.cpu_usage if system_metrics else 'N/A'}% | "
                          f"Memory: {system_metrics.memory_usage if system_metrics else 'N/A'}% | "
                          f"Response: {system_metrics.response_time if system_metrics else 'N/A'}ms")
                
                # Wait for next interval
                await asyncio.sleep(self.monitoring_interval)
                
            except Exception as e:
                logger.error(f"Monitoring loop error: {e}")
                await asyncio.sleep(self.monitoring_interval)

async def main():
    """Main entry point"""
    monitor = ProductionMonitor()
    
    # Generate initial health report
    health_report = monitor.generate_health_report()
    logger.info(f"Initial Health Report: {json.dumps(health_report, indent=2)}")
    
    # Start monitoring loop
    await monitor.monitoring_loop()

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("Production monitoring stopped by user")
    except Exception as e:
        logger.error(f"Production monitoring failed: {e}") 