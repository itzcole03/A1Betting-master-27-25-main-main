import { Prediction, PlayerStats, PlayerForm, InjuryStatus} from '@/types/betting.ts';
export declare const useMLSimulation: () => {,`n  isInitialized: boolean;,`n  error: Error | null,`n  generatePrediction: (gameId: string, playerId: string, metric: keyof PlayerStats) => Prediction,`n  getTeamStats: (teamId: string) => import('../types/betting').TeamStats | undefined,`n  getPlayerStats: (playerId: string) => PlayerStats | undefined,`n  getGamePredictions: (gameId: string) => Prediction[0],`n  updatePlayerForm: (playerId: string, form: PlayerForm) => void,`n  updateInjuryStatus: (playerId: string, status: InjuryStatus) => void};


`
