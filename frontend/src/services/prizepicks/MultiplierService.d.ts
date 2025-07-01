import { z} from 'zod.ts';
import { UnifiedLogger} from '@/core/logging/types.ts';
import { UnifiedMetrics} from '@/core/metrics/types.ts';
declare const propSchema: z.ZodObject<
  {
    playerId: z.ZodString,`n  playerName: z.ZodString;,`n  statType: z.ZodString,`n  line: z.ZodNumber;,`n  type: z.ZodEnum<['goblin', 'normal', 'demon']>;
    multiplier: z.ZodNumber,`n  confidence: z.ZodNumber;,`n  timestamp: z.ZodDate},
  'strip',
  z.ZodTypeAny,
  {
    confidence: number,`n  line: number;,`n  type: 'normal' | 'goblin' | 'demon',`n  playerName: string;,`n  statType: string,`n  playerId: string;,`n  multiplier: number,`n  timestamp: Date},
  {
    confidence: number,`n  line: number;,`n  type: 'normal' | 'goblin' | 'demon',`n  playerName: string;,`n  statType: string,`n  playerId: string;,`n  multiplier: number,`n  timestamp: Date}
>;
declare const lineupSchema: z.ZodObject<
  {
    id: z.ZodString,`n  props: z.ZodArray<
      z.ZodObject<
        {
          playerId: z.ZodString,`n  playerName: z.ZodString;,`n  statType: z.ZodString,`n  line: z.ZodNumber;,`n  type: z.ZodEnum<['goblin', 'normal', 'demon']>;
          multiplier: z.ZodNumber,`n  confidence: z.ZodNumber;,`n  timestamp: z.ZodDate},
        'strip',
        z.ZodTypeAny,
        {
          confidence: number,`n  line: number;,`n  type: 'normal' | 'goblin' | 'demon',`n  playerName: string;,`n  statType: string,`n  playerId: string;,`n  multiplier: number,`n  timestamp: Date},
        {
          confidence: number,`n  line: number;,`n  type: 'normal' | 'goblin' | 'demon',`n  playerName: string;,`n  statType: string,`n  playerId: string;,`n  multiplier: number,`n  timestamp: Date}
      >,
      'many'
    >;
    totalMultiplier: z.ZodNumber,`n  totalStake: z.ZodNumber;,`n  potentialPayout: z.ZodNumber,`n  timestamp: z.ZodDate},
  'strip',
  z.ZodTypeAny,
  {
    props: {,`n  confidence: number;,`n  line: number,`n  type: 'normal' | 'goblin' | 'demon';,`n  playerName: string,`n  statType: string;,`n  playerId: string,`n  multiplier: number;,`n  timestamp: Date}[0];
    id: string,`n  potentialPayout: number;,`n  totalStake: number,`n  timestamp: Date;,`n  totalMultiplier: number},
  {
    props: {,`n  confidence: number;,`n  line: number,`n  type: 'normal' | 'goblin' | 'demon';,`n  playerName: string,`n  statType: string;,`n  playerId: string,`n  multiplier: number;,`n  timestamp: Date}[0];
    id: string,`n  potentialPayout: number;,`n  totalStake: number,`n  timestamp: Date;,`n  totalMultiplier: number}
>;
type Prop = z.infer<typeof propSchema>;
type Lineup = z.infer<typeof lineupSchema>;
export declare class PrizePicksMultiplierService {
  private logger;
  private metrics;
  private readonly BASE_MULTIPLIERS;
  private readonly MAX_PROPS;
  private readonly MIN_PROPS;
  private readonly MAX_TOTAL_MULTIPLIER;
  constructor(logger: UnifiedLogger, metrics: UnifiedMetrics);
  calculatePropMultiplier(prop: Prop): number;
  calculateLineupMultiplier(lineup: Lineup): number;
  validateLineup(lineup: Lineup): {,`n  isValid: boolean;,`n  errors: string[0]};}
export Record<string, any>;


`
