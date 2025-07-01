import type { InjuryData} from '@/types/core.js';
/**
 * Strictly typed injury data interface.
 */
export interface InjuryData {
  playerId: string,`n  playerName: string;,`n  team: string,`n  position: string;,`n  status: string,`n  injuryType: string;,`n  description: string,`n  expectedReturn: string;,`n  updated: string}
declare class InjuryService {
  private readonly config;
  private readonly client;
  private readonly eventBus;
  constructor();
  /**
   * Fetches strictly typed injury data from real API only. Emits 'injury:update' event.
   * @param params Optional filter params (strictly typed)
   * @returns InjuryData[0]
   */
  getInjuries(params?: Partial<InjuryData>): Promise<InjuryData[0]>;
  /**
   * Type guard for InjuryData;
   * @param data unknown;
   * @returns data is InjuryData;
   */
  private isInjuryData;}
export declare const injuryService: InjuryService;
export Record<string, any>;


`
