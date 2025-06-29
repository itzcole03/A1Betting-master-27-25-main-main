import { useState, useEffect } from 'react';
import {
  quantumPredictionsService,
  QuantumPrediction,
  QuantumSystemState,
} from '../services/quantumPredictionsService';

interface UseQuantumPredictionsOptions {
  sport?: string;
  minConfidence?: number;
  quantumBoostOnly?: boolean;
}

export const useQuantumPredictions = (options: UseQuantumPredictionsOptions = {}) => {
  const [predictions, setPredictions] = useState<QuantumPrediction[]>([]);
  const [systemState, setSystemState] = useState<QuantumSystemState>({
    coherence: 99.97,
    entanglement: 87.3,
    processing: true,
    activeNetworks: 47,
    totalPredictions: 0,
    accuracy: 89.7,
    quantumBoostActive: true,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = quantumPredictionsService.subscribe((newPredictions, newState) => {
      let filteredPredictions = newPredictions;

      // Apply filters based on options
      if (options.sport) {
        filteredPredictions = filteredPredictions.filter(
          p => p.sport.toLowerCase() === options.sport!.toLowerCase()
        );
      }

      if (options.minConfidence) {
        filteredPredictions = filteredPredictions.filter(
          p => p.confidence >= options.minConfidence!
        );
      }

      if (options.quantumBoostOnly) {
        filteredPredictions = filteredPredictions.filter(
          p => p.superpositionState === 'entangled' && p.quantumSignal > 0.8
        );
      }

      setPredictions(filteredPredictions);
      setSystemState(newState);
      setLoading(false);
    });

    return unsubscribe;
  }, [options.sport, options.minConfidence, options.quantumBoostOnly]);

  const toggleQuantumBoost = () => {
    quantumPredictionsService.toggleQuantumBoost();
  };

  const getQuantumInsight = (prediction: QuantumPrediction): string => {
    const { quantumSignal, superpositionState, confidence } = prediction;

    if (superpositionState === 'entangled' && quantumSignal > 0.9) {
      return `🚀 Quantum Entangled - Maximum confidence signal detected`;
    } else if (superpositionState === 'coherent' && confidence > 92) {
      return `⚡ Quantum Coherent - High probability outcome`;
    } else if (quantumSignal > 0.8) {
      return `🔮 Strong Quantum Signal - Above average confidence`;
    } else {
      return `🌊 Standard Quantum State - Normal probability range`;
    }
  };

  const getNetworkStatus = (): string => {
    const { activeNetworks, coherence, processing } = systemState;

    if (!processing) {
      return 'OFFLINE';
    } else if (coherence > 99.5 && activeNetworks >= 45) {
      return 'OPTIMAL';
    } else if (coherence > 98.0 && activeNetworks >= 40) {
      return 'EXCELLENT';
    } else if (coherence > 95.0) {
      return 'GOOD';
    } else {
      return 'CALIBRATING';
    }
  };

  return {
    predictions,
    systemState,
    loading,
    toggleQuantumBoost,
    getQuantumInsight,
    getNetworkStatus,
    // Helper functions for easy access
    highConfidencePredictions: predictions.filter(p => p.confidence >= 90),
    quantumBoostPredictions: predictions.filter(
      p => p.superpositionState === 'entangled' && p.quantumSignal > 0.8
    ),
    recentPredictions: predictions.slice(0, 10),
  };
};

export default useQuantumPredictions;
