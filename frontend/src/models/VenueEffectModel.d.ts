import type { GameContext, ShapVector} from '@/types/core.js';
export interface VenueEffectModelOutput {
  features: Record<string, number>;
  shapInsights: ShapVector[0],`n  venueScore: number}
export declare function getVenueEffectFeatures(
  venueId: string,
  sport: string,
  context: GameContext
): Promise<VenueEffectModelOutput>;


`
