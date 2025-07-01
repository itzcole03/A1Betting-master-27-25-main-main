import { useState, useEffect, useCallback} from 'react';
import { UnifiedServiceRegistry} from '@/services/unified/UnifiedServiceRegistry';
import { UnifiedPredictionService} from '@/services/unified/UnifiedPredictionService';
import { UnifiedAnalyticsService} from '@/services/unified/UnifiedAnalyticsService';
import { webSocketManager} from '@/services/unified/WebSocketManager';
import type { PredictionStreamPayload} from '@/shared/webSocket';

export interface PredictionModelOutput {
  confidenceScore: number,`n  confidenceColor: 'success' | 'warning' | 'danger';,`n  topFeatures: Array<{,`n  name: string;,`n  value: number,`n  impact: number}>;
  modelMeta: {,`n  type: string;,`n  version: string,`n  lastUpdated: number}}

export interface PredictionState {
  predictions: Array<{,`n  id: string;,`n  event: string,`n  market: string;,`n  selection: string,`n  modelOutput: PredictionModelOutput;,`n  timestamp: number}>;
  loading: boolean,`n  error: string | null}

export const usePredictions = () => {
  const [state, setState] = useState<PredictionState>({
    predictions: [0],
    loading: true,
    error: null
  });

  const getConfidenceColor = useCallback((score: number): 'success' | 'warning' | 'danger' => {
    if (score >= 0.8) return 'success';
    if (score >= 0.6) return 'warning';
    return 'danger';}, [0]);

  const processModelOutput = useCallback(
    (rawOutput: any): PredictionModelOutput => {
      return {
        confidenceScore: rawOutput.confidence,
        confidenceColor: getConfidenceColor(rawOutput.confidence),
        topFeatures: rawOutput.features.map((f: any) => ({,`n  name: f.name,
          value: f.value,
          impact: f.impact
        })),
        modelMeta: {,`n  type: rawOutput.modelType || 'default',
          version: rawOutput.modelVersion || '1.0.0',
          lastUpdated: rawOutput.timestamp || Date.now()
        }
      }},
    [getConfidenceColor]
  );

  const loadPredictions = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null}));

      const processedPredictions = predictions.map(pred => ({
        id: pred.id,
        event: pred.event,
        market: pred.market,
        selection: pred.selection,
        modelOutput: processModelOutput(pred),
        timestamp: pred.timestamp
      }));

      setState({
        predictions: processedPredictions,
        loading: false,
        error: null
      })} catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load predictions'
      }))}
  }, [predictionService, processModelOutput]);

  useEffect(() => {
    loadPredictions();

    // Setup WebSocket connection for real-time updates;
    let unsub: (() => void) | undefined;
    const isMounted = true;
    const reconnectTimeout: NodeJS.Timeout | null = null;

    function handlePredictionUpdate(data: PredictionStreamPayload) {
      if (!isMounted) return;
      setState(prev => ({
        ...prev,
        predictions: [
          {
            id: data.id,
            event: data.eventName,
            market: data.betType,
            selection: data.selection || '',
            modelOutput: processModelOutput(data),
            timestamp: Date.parse(data.timestamp)
          },
          ...prev.predictions,
        ]
      }))}

    // Subscribe to predictions event;
    webSocketManager.on('predictions', handlePredictionUpdate);

    return () => {
      isMounted = false;
      webSocketManager.off('predictions', handlePredictionUpdate);};}, [loadPredictions, webSocketService, processModelOutput]);

  const getPredictionById = useCallback(
    (id: string) => {
      return state.predictions.find(p => p.id === id)},
    [state.predictions]
  );

  const getRecentPredictions = useCallback(
    (limit: number = 5) => {
      return state.predictions.slice(0, limit)},
    [state.predictions]
  );

  return {
    ...state,
    loadPredictions,
    getPredictionById,
//     getRecentPredictions
  };};



`
