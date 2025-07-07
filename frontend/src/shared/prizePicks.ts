// PrizePicksProps: Structure for a PrizePicks prop card
export interface PrizePicksProps {
  playerId: string;
  playerName: string;
  league: string;
  player_name: string;
  stat_type: string;
  line: number;
  description: string;
  image_url?: string;
  overOdds?: number;
  underOdds?: number;
  start_time?: string;
  status?: string;
}

// PoePropCardContent: Content for a PoeDataBlock of type 'prop_card'
export interface PoePropCardContent {
  playerId?: string;
  playerName?: string;
  player?: string;
  playerImage?: string;
  statType?: string;
  stat?: string;
  line?: number;
  overOdds?: number;
  underOdds?: number;
  lastUpdated?: string;
}

// PoeDataBlock: Block of data from Poe API
export interface PoeDataBlock {
  id: string;
  type: string;
  title: string;
  content: unknown;
  metadata?: Record<string, unknown>;
}

// PoeApiResponse: Response structure from Poe API
export interface PoeApiResponse {
  success: boolean;
  timestamp: number;
  dataBlocks: PoeDataBlock[];
}

export { };
