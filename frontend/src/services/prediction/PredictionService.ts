import type { PredictionWithConfidence } from '../../types/confidence';
import type { ContextualInput } from '../../types/filters';
import ApiService from '../api/ApiService';

/**
 * A service for fetching predictions from the backend.
 */
export class PredictionService {

  /**
   * Fetches a prediction with confidence details from the backend.
   * @param eventId - The ID of the event.
   * @param model - The prediction model to use.
   * @param market - The market for the prediction.
   * @param context - Optional contextual information for the prediction.
   * @returns A promise that resolves with the prediction data.
   */
  public async getPredictionWithConfidence(
    eventId: string,
    model: string,
    market: string,
    context?: ContextualInput
  ): Promise<PredictionWithConfidence> {
    try {
      const prediction = await ApiService.get<PredictionWithConfidence>('/api/v1/predict', {
        event_id: eventId,
        model,
        market,
        context,
      });
      return prediction;
    } catch (error) {
      console.error(`Error fetching prediction for event ${eventId}:`, error);
      throw new Error('Failed to fetch prediction.');
    }
  }
}

export const predictionService = new PredictionService();
