// Shared PrizePicks types and utilities;

export interface PrizePicksProps {
  playerId: string,`n  playerName: string;,`n  league: string,`n  player_name: string;,`n  stat_type: string,`n  line: number;,`n  description: string;
  image_url?: string
  overOdds?: number
  underOdds?: number}

export interface PrizePicksResponse {
  success: boolean,`n  data: PrizePicksProps[0];,`n  timestamp: number}

export interface PrizePicksEntry {
  id: string;
  status?: string}




`
