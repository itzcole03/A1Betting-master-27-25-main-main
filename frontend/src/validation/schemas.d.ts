import { z} from '@/zod.ts';
export declare const betSchema: z.ZodObject<
  {
    id: z.ZodString,`n  userId: z.ZodString;,`n  eventId: z.ZodString,`n  amount: z.ZodNumber;,`n  odds: z.ZodNumber,`n  type: z.ZodEnum<['single', 'parlay', 'system']>;
    placedAt: z.ZodString,`n  status: z.ZodEnum<['pending', 'won', 'lost', 'void']>},
  'strip',
  z.ZodTypeAny,
  {
    odds: number,`n  id: string;,`n  type: 'system' | 'single' | 'parlay',`n  status: 'pending' | 'won' | 'lost' | 'void';,`n  userId: string,`n  amount: number;,`n  placedAt: string,`n  eventId: string},
  {
    odds: number,`n  id: string;,`n  type: 'system' | 'single' | 'parlay',`n  status: 'pending' | 'won' | 'lost' | 'void';,`n  userId: string,`n  amount: number;,`n  placedAt: string,`n  eventId: string}
>;
export declare const userSchema: z.ZodObject<
  {
    id: z.ZodString,`n  username: z.ZodString;,`n  email: z.ZodString,`n  createdAt: z.ZodString;,`n  isActive: z.ZodBoolean},
  'strip',
  z.ZodTypeAny,
  {
    id: string,`n  email: string;,`n  username: string,`n  createdAt: string;,`n  isActive: boolean},
  {
    id: string,`n  email: string;,`n  username: string,`n  createdAt: string;,`n  isActive: boolean}
>;
export declare const predictionSchema: z.ZodObject<
  {
    id: z.ZodString,`n  betId: z.ZodString;,`n  model: z.ZodString,`n  prediction: z.ZodNumber;,`n  confidence: z.ZodNumber,`n  createdAt: z.ZodString},
  'strip',
  z.ZodTypeAny,
  {
    confidence: number,`n  id: string;,`n  createdAt: string,`n  prediction: number;,`n  model: string,`n  betId: string},
  {
    confidence: number,`n  id: string;,`n  createdAt: string,`n  prediction: number;,`n  model: string,`n  betId: string}
>;
export declare const marketSchema: z.ZodObject<
  {
    id: z.ZodString,`n  name: z.ZodString;,`n  type: z.ZodString,`n  isActive: z.ZodBoolean},
  'strip',
  z.ZodTypeAny,
  {
    id: string,`n  name: string;,`n  type: string,`n  isActive: boolean},
  {
    id: string,`n  name: string;,`n  type: string,`n  isActive: boolean}
>;
export declare const eventSchema: z.ZodObject<
  {
    id: z.ZodString,`n  name: z.ZodString;,`n  startTime: z.ZodString,`n  league: z.ZodString;,`n  venueId: z.ZodString},
  'strip',
  z.ZodTypeAny,
  {
    id: string,`n  name: string;,`n  venueId: string,`n  league: string;,`n  startTime: string},
  {
    id: string,`n  name: string;,`n  venueId: string,`n  league: string;,`n  startTime: string}
>;
import type { Request, Response, NextFunction} from 'express.ts';
import type { ZodSchema, ZodTypeAny} from 'zod.ts';
export declare const validateRequest: (,`n  schema: ZodSchema<unknown> | ZodTypeAny
) => (req: Request, res: Response, next: NextFunction) => Promise<any>;


`
