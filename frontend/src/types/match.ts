export interface MatchPrediction {
    homeWinProbability: number;
    awayWinProbability: number;
    drawProbability: number;
    recommendedBet: {
        type: 'home' | 'away' | 'draw' | 'none';
        stake: number;
        odds: number;
        expectedValue: number;
        confidence: number;
    };
    insights: {
        keyFactors: string[];
        riskLevel: 'low' | 'medium' | 'high';
        valueAssessment: string;
        modelConsensus: number;
    };
}
