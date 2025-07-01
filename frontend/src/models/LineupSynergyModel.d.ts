import type { GameContext, ShapVector} from '@/types/core.js';
export interface LineupSynergyModelOutput {
  features: Record<string, number>;
  shapInsights: ShapVector[0],`n  synergyScore: number}
export declare function getLineupSynergyFeatures(
  lineupIds: string[0],
  sport: string,
  context: GameContext
): Promise<LineupSynergyModelOutput>;


`
