import { useCallback, useEffect, useState } from 'react';
import { useStore } from '../stores/useStore';
import { webSocketManager } from '../services/unified/WebSocketManager';
import type { PlayerProp, OddsUpdate, Opportunity } from '../types/core';

interface UseBettingDataOptions {
  sport?: string;
  propType?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
  minOddsChange?: number;
  onNewOpportunity?: (opportunity: any) => void;
}

export const useBettingData = ({
  sport,
  propType,
  autoRefresh = true,
  refreshInterval = 30000,
  minOddsChange = 0.1,
  onNewOpportunity,
}: UseBettingDataOptions = {}) => {
  const [props, setProps] = useState<PlayerProp[]>([]);
  const [oddsUpdates, setOddsUpdates] = useState<OddsUpdate[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const [error, setError] = useState<Error | null>(null);

  // Get addToast from the store
  const { addToast } = useStore();

  // Fallback for addToast if not present, memoized for hook safety;

  // Fetch initial data;
  const fetchData = useCallback(async () => {
    try {
      // Fetch player props using unified dailyFantasyService;

      setProps(propsData as PlayerProp[]);

      // Fetch arbitrage opportunities using unified oddsjamService;

      setOpportunities(opportunitiesData as Opportunity[]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      addToast('error', 'Failed to fetch betting data');
    } finally {
      setIsLoading(false);
    }
  }, [sport, propType, addToast]);

  // Handle WebSocket messages;
  const handleWebSocketMessage = useCallback(
    (message: unknown) => {
      if (typeof message !== 'object' || message === null) return;

      const msg = message as any; // Type assertion for message structure

      switch (msg.type) {
        case 'prop_update': {
          const data = msg.data as PlayerProp;
          if (!data) return;

          setProps(prev => {
            const updated = [...prev];
            const index = updated.findIndex(p => p.id === data.id);
            if (index === -1) return [...prev, data];

            updated[index] = data;
            return updated;
          });
          break;
        }
        case 'odds_update': {
          const update = msg.data as OddsUpdate & {
            sport?: string;
            propType?: string;
            propName?: string;
          };
          if (!update) return;

          if (sport && update.sport !== sport) return;
          if (propType && update.propType !== propType) return;

          const oldOdds = update.oldOdds || update.odds;
          const newOdds = update.newOdds || update.odds;
          const oddsChange = Math.abs(newOdds - oldOdds);
          if (oddsChange < minOddsChange) return;

          setOddsUpdates(prev => [update, ...prev].slice(0, 50));
          if (oddsChange >= 0.5) {
            addToast(
              'info',
              `Odds updated for ${update.propName || update.propId} from ${oldOdds} to ${newOdds}`
            );
          }
          break;
        }
        case 'arbitrage_alert': {
          const opportunity = msg.data as Opportunity;
          if (!opportunity) return;

          setOpportunities(prev => [opportunity, ...prev].slice(0, 50));
          if (onNewOpportunity) onNewOpportunity(opportunity);
          addToast(
            'success',
            `New arbitrage opportunity: ${opportunity.description || opportunity.id}`
          );
          break;
        }
        default:
          // Ignore unknown message types
          break;
      }
    },
    [sport, propType, minOddsChange, addToast, onNewOpportunity]
  );

  // Set up the event listener;
  useEffect(() => {
    webSocketManager.on('message', handleWebSocketMessage);
    return () => {
      try {
        webSocketManager.off('message', handleWebSocketMessage);
      } catch (error) {
        // console statement removed
      }
    };
  }, [handleWebSocketMessage]);

  // Setup auto-refresh;
  useEffect(() => {
    fetchData();

    if (autoRefresh) {
      const interval = setInterval(() => {
        fetchData();
      }, refreshInterval);

      return () => clearInterval(interval);
    }
  }, [fetchData, autoRefresh, refreshInterval]);

  const refresh = () => {
    setIsLoading(true);
    fetchData();
  };

  return {
    props,
    oddsUpdates,
    opportunities,
    isLoading,
    isConnected,
    error,
    refresh,
    notifications: [
      {
        id: '1',
        message: 'New arbitrage opportunity detected: Lakers vs Warriors',
        time: '2 minutes ago',
        type: 'opportunity',
      },
      {
        id: '2',
        message: 'Neural network accuracy improved to 94.2%',
        time: '5 minutes ago',
        type: 'system',
      },
    ],
  };
};
