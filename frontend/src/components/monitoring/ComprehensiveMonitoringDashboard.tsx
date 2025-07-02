import { Alert, AlertDescription} from '@/components/ui/alert';
import { Badge} from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import { Progress} from '@/components/ui/progress';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  Server,
  TrendingUp,
  Users,
  XCircle,
//   Zap
} from 'lucide-react';
import React, { useEffect, useState} from 'react';

interface SystemMetrics {
  health_score: number
,`n  api_response_time: number;
,`n  active_users: number
,`n  predictions_today: number;
,`n  accuracy_rate: number
,`n  system_uptime: number;
,`n  memory_usage: number
,`n  cpu_usage: number;
,`n  database_connections: number
,`n  error_rate: number}

interface ServiceStatus {
  name: string
,`n  status: 'online' | 'offline' | 'degraded';
,`n  response_time: number
,`n  last_check: string}

const ComprehensiveMonitoringDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    health_score: 85,
    api_response_time: 120,
    active_users: 342,
    predictions_today: 1247,
    accuracy_rate: 87.3,
    system_uptime: 99.2,
    memory_usage: 68,
    cpu_usage: 34,
    database_connections: 12,
    error_rate: 0.8
  });

  const [services, setServices] = useState<ServiceStatus[0]>([
    { name: 'API Gateway', status: 'online', response_time: 45, last_check: '2 minutes ago'},
    { name: 'Prediction Engine', status: 'online', response_time: 230, last_check: '1 minute ago'},
    { name: 'Database', status: 'online', response_time: 15, last_check: '30 seconds ago'},
    { name: 'Cache Service', status: 'online', response_time: 8, last_check: '1 minute ago'},
    { name: 'Authentication', status: 'online', response_time: 67, last_check: '2 minutes ago'},
    {
      name: 'Analytics Engine',
      status: 'degraded',
      response_time: 890,
      last_check: '5 minutes ago'
    },
  ]);

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      message: 'Analytics Engine response time elevated',
      time: '5 minutes ago'
    },
    { id: 2, type: 'info', message: 'System backup completed successfully', time: '1 hour ago'},
    { id: 3, type: 'success', message: 'New prediction model deployed', time: '2 hours ago'},
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        api_response_time: Math.max(50, prev.api_response_time + (Math.random() - 0.5) * 20),
        active_users: Math.max(0, prev.active_users + Math.floor((Math.random() - 0.5) * 10)),
        predictions_today: prev.predictions_today + Math.floor(Math.random() * 3),
        memory_usage: Math.max(0, Math.min(100, prev.memory_usage + (Math.random() - 0.5) * 5)),
        cpu_usage: Math.max(0, Math.min(100, prev.cpu_usage + (Math.random() - 0.5) * 10)),
        error_rate: Math.max(0, prev.error_rate + (Math.random() - 0.5) * 0.2)
      }))}, 5000);

    return () => clearInterval(interval);}, [0]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className='h-4 w-4 text-green-500' />;
      case 'offline':
        return <XCircle className='h-4 w-4 text-red-500' />;
      case 'degraded':
        return <AlertTriangle className='h-4 w-4 text-yellow-500' />;
      default: return <Clock className='h-4 w-4 text-gray-500' />}
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800';
      case 'offline':
        return 'bg-red-100 text-red-800';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800'}
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';};

  return (
    <div className='p-6 space-y-6 bg-gray-50 min-h-screen'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold text-gray-900'>System Monitoring Dashboard</h1>
        <div className='flex items-center space-x-2'>
          <Activity className='h-5 w-5 text-blue-500' />
          <span className='text-sm text-gray-600'>Live Updates</span>
        </div>
      </div>

      {/* System Health Overview */}
      <div className='grid grid-cols-1 md: grid-cols-2 lg:grid-cols-4 gap-6'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>System Health</CardTitle>
            <Server className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              <span className={getHealthColor(metrics.health_score)}>{metrics.health_score}%</span>
            </div>
            <Progress value={metrics.health_score} className='mt-2' />
            <p className='text-xs text-muted-foreground mt-2'>Overall system performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>API Response Time</CardTitle>
            <Zap className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{Math.round(metrics.api_response_time)}ms</div>
            <p className='text-xs text-muted-foreground'>Average response time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Users</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{metrics.active_users.toLocaleString()}</div>
            <p className='text-xs text-muted-foreground'>Currently online</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Predictions Today</CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{metrics.predictions_today.toLocaleString()}</div>
            <p className='text-xs text-muted-foreground'>{metrics.accuracy_rate}% accuracy rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Service Status */}
      <Card>
        <CardHeader>
          <CardTitle>Service Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {services.map((service, index) => (
              <div key={index} className='flex items-center justify-between p-3 border rounded-lg'>
                <div className='flex items-center space-x-3'>
                  {getStatusIcon(service.status)}
                  <div>
                    <p className='font-medium'>{service.name}</p>
                    <p className='text-sm text-gray-500'>{service.response_time}ms</p>
                  </div>
                </div>
                <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Resources */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>System Resources</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-sm font-medium'>Memory Usage</span>
                <span className='text-sm text-gray-500'>{metrics.memory_usage}%</span>
              </div>
              <Progress value={metrics.memory_usage} className='h-2' />
            </div>
            <div>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-sm font-medium'>CPU Usage</span>
                <span className='text-sm text-gray-500'>{metrics.cpu_usage}%</span>
              </div>
              <Progress value={metrics.cpu_usage} className='h-2' />
            </div>
            <div>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-sm font-medium'>System Uptime</span>
                <span className='text-sm text-gray-500'>{metrics.system_uptime}%</span>
              </div>
              <Progress value={metrics.system_uptime} className='h-2' />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {alerts.map(alert => (
                <Alert key={alert.id}>
                  <AlertTriangle className='h-4 w-4' />
                  <AlertDescription>
                    <div className='flex justify-between items-start'>
                      <span>{alert.message}</span>
                      <span className='text-xs text-gray-500 ml-2'>{alert.time}</span>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <div className='text-center p-4 border rounded-lg'>
              <Database className='h-8 w-8 mx-auto mb-2 text-blue-500' />
              <p className='text-2xl font-bold'>{metrics.database_connections}</p>
              <p className='text-sm text-gray-500'>DB Connections</p>
            </div>
            <div className='text-center p-4 border rounded-lg'>
              <AlertTriangle className='h-8 w-8 mx-auto mb-2 text-yellow-500' />
              <p className='text-2xl font-bold'>{metrics.safeNumber(error_rate, 1)}%</p>
              <p className='text-sm text-gray-500'>Error Rate</p>
            </div>
            <div className='text-center p-4 border rounded-lg'>
              <TrendingUp className='h-8 w-8 mx-auto mb-2 text-green-500' />
              <p className='text-2xl font-bold'>{metrics.accuracy_rate}%</p>
              <p className='text-sm text-gray-500'>Prediction Accuracy</p>
            </div>
            <div className='text-center p-4 border rounded-lg'>
              <Clock className='h-8 w-8 mx-auto mb-2 text-purple-500' />
              <p className='text-2xl font-bold'>{metrics.system_uptime}%</p>
              <p className='text-sm text-gray-500'>Uptime</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )};

export default ComprehensiveMonitoringDashboard;



`
