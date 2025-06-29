import { useEffect, useState } from 'react';
import { RealTimeData, RealTimeDataService } from '../services/realTimeDataService';

// Real-time data hook that fetches live data from backend
export const useRealtimeData = () => {
    const [data, setData] = useState<RealTimeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const service = RealTimeDataService.getInstance();

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await service.fetchRealTimeData();
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
                console.error('Failed to fetch real-time data:', err);
            } finally {
                setLoading(false);
            }
        };

        // Initial fetch
        fetchData();

        // Set up interval for real-time updates
        const interval = setInterval(fetchData, 30000); // Every 30 seconds
        return () => clearInterval(interval);
    }, []);

    return { data, loading, error };
};

// Alias for consistency with naming in QuantumSportsPlatform
export const useRealTimeData = useRealtimeData;
