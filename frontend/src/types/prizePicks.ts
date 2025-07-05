export { };

export interface PrizePicksPlayer {
  id: string;
  name: string;
  team: string;
  position: string;
  image_url?: string;
}

export interface PrizePicksProjection {
  id: string;
  playerId: string;
  player?: PrizePicksPlayer;
  statType: string;
  line: number;
  description?: string;
  startTime?: string;
}

export interface PrizePicksData {
  projections: PrizePicksProjection[];
  players: PrizePicksPlayer[];
  leagues: any[];
  lastUpdated: string;
}
