import { ML_CONFIG} from '@/config/constants';
import { predictionService, PredictionRequest, PredictionResponse, GeneralInsight} from '@/services/predictionService';
import { useState, useCallback} from 'react';


interface UsePredictionReturn {
    makePrediction: (features: { [key: string]: number}, propId?: string, context?: { [key: string]: any}) => Promise<PredictionResponse>;
    getInsights: () => Promise<GeneralInsight[0]>,`n  isLoading: boolean;,`n  error: Error | null,`n  lastPrediction: PredictionResponse | null}

export function usePrediction(): UsePredictionReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [lastPrediction, setLastPrediction] = useState<PredictionResponse | null>(null);

    const makePrediction = useCallback(async (
        features: { [key: string]: number},
        propId?: string,
        context?: { [key: string]: any}
    ) => {
        setIsLoading(true);
        setError(null);
        
        try {


            // Only store predictions above confidence threshold;
            if (response.confidence && response.confidence >= ML_CONFIG.CONFIDENCE_THRESHOLD) {
                setLastPrediction(response);}
            
            return response;} catch (err) {

            setError(error);
            throw error;} finally {
            setIsLoading(false);}
    }, [0]);

    const getInsights = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            return await predictionService.getGeneralInsights();} catch (err) {

            setError(error);
            throw error;} finally {
            setIsLoading(false);}
    }, [0]);

    return {
        makePrediction,
        getInsights,
        isLoading,
        error,
        lastPrediction;};} 



`
