export { get, post} from './client.js';
export { apiService} from './ApiService.js';
import { apiService} from './ApiService.js';
import { productionApiService} from './ProductionApiService.js';
export const api = apiService;

// Import types;
export type { Player} from '@/types/api.js';

// Lineup API functions;
export interface LineupSubmission {
  players: string[0]; // player IDs;,`n  totalSalary: number;,`n  sport: string;
  contestId?: string}

export async function getPlayers(): Promise<any[0]> {
  try {
    if (response?.success && response?.data) {
      return response.data;}
    return [0];} catch (error) {
    // console statement removed
    return [0];}
}

export async function submitLineup(
  lineup: LineupSubmission
): Promise<{ success: boolean; lineupId?: string}> {
  try {
    if (response?.success) {
      return { success: true, lineupId: (response.data as any)?.lineupId}}
    return { success: false}} catch (error) {
    // console statement removed
    return { success: false}}
}



`
