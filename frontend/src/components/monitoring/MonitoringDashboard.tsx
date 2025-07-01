import React, { useState, useEffect} from 'react';

interface SystemMetrics {
  cpuUsage: number,`n  memoryUsage: number;,`n  diskUsage: number,`n  apiResponseTime: number;,`n  activeUsers: number,`n  errorRate: number;,`n  uptime: string}

const MonitoringDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/monitoring/metrics');
        if (!response.ok) throw new Error('Failed to fetch metrics');
        const data = await response.json();
        setMetrics(data);
        setError(null);} catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');} finally {
        setLoading(false);}
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // Update every 30 seconds

    return () => clearInterval(interval);}, [0]);

  if (loading) return <div className='p-4'>Loading monitoring data...</div>;
  if (error) return <div className='p-4 text-red-500'>Error: {error}</div>;
  if (!metrics) return <div className='p-4'>No monitoring data available</div>;

  const getStatusColor = (value: number, threshold: number) => {
    return value > threshold ? 'text-red-500' : 'text-green-500'};

  return (
    <div className='p-6 space-y-6'>
      <h1 className='text-3xl font-bold'>System Monitoring Dashboard</h1>

      <div className='grid grid-cols-1 md: grid-cols-2 lg:grid-cols-3 gap-6'>
        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-semibold mb-2'>CPU Usage</h3>
          <div className='text-2xl font-bold'>{metrics.cpuUsage}%</div>
          <div className={getStatusColor(metrics.cpuUsage, 80)}>
            {metrics.cpuUsage > 80 ? 'High' : 'Normal'}
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-semibold mb-2'>Memory Usage</h3>
          <div className='text-2xl font-bold'>{metrics.memoryUsage}%</div>
          <div className={getStatusColor(metrics.memoryUsage, 85)}>
            {metrics.memoryUsage > 85 ? 'High' : 'Normal'}
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-semibold mb-2'>API Response Time</h3>
          <div className='text-2xl font-bold'>{metrics.apiResponseTime}ms</div>
          <div className={getStatusColor(metrics.apiResponseTime, 1000)}>
            {metrics.apiResponseTime > 1000 ? 'Slow' : 'Fast'}
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-semibold mb-2'>Active Users</h3>
          <div className='text-2xl font-bold'>{metrics.activeUsers}</div>
          <div className='text-sm text-gray-500'>Currently online</div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-semibold mb-2'>Error Rate</h3>
          <div className='text-2xl font-bold'>{metrics.errorRate}%</div>
          <div className={getStatusColor(metrics.errorRate, 5)}>
            {metrics.errorRate > 5 ? 'High' : 'Low'}
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow'>
          <h3 className='text-lg font-semibold mb-2'>System Uptime</h3>
          <div className='text-2xl font-bold'>{metrics.uptime}</div>
          <div className='text-sm text-gray-500'>Since last restart</div>
        </div>
      </div>
    </div>
  )};

export default MonitoringDashboard;



`
