import { MoneyMakerLeg} from './predictions';
import { LineupBuilderStrategy} from './predictions';
import { LineupBuilderOutput} from './predictions';

export interface LineupLeg {
  propType: string,`n  line: string;,`n  odds: number}

export interface LineupPerformance {
  expectedValue: number,`n  winProbability: number;,`n  riskScore: number}

export interface Lineup {
  id: string,`n  strategy: {,`n  name: string,`n  description: string};
  legs: {,`n  eventId: string;,`n  market: string,`n  selection: string;,`n  odds: number,`n  prediction: {,`n  probability: number,`n  confidence: number;,`n  edge: number}}[0];
  metrics: {,`n  confidence: number;,`n  expectedValue: number,`n  risk: number;,`n  correlation: number};
  createdAt: string}

export function isLineupLeg(value: any): value is LineupLeg {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.propType === 'string' &&
    typeof value.line === 'string' &&
    typeof value.odds === 'number'
  )}

export function isLineupPerformance(value: any): value is LineupPerformance {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.expectedValue === 'number' &&
    typeof value.winProbability === 'number' &&
    typeof value.riskScore === 'number'
  )}

export function isLineup(obj: any): obj is Lineup {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.strategy === 'object' &&
    typeof obj.strategy.name === 'string' &&
    typeof obj.strategy.description === 'string' &&
    Array.isArray(obj.legs) &&
    obj.legs.every(
      (leg: any) =>
        leg &&
        typeof leg.eventId === 'string' &&
        typeof leg.market === 'string' &&
        typeof leg.selection === 'string' &&
        typeof leg.odds === 'number' &&
        typeof leg.prediction === 'object' &&
        typeof leg.prediction.probability === 'number' &&
        typeof leg.prediction.confidence === 'number' &&
        typeof leg.prediction.edge === 'number'
    ) &&
    typeof obj.metrics === 'object' &&
    typeof obj.metrics.confidence === 'number' &&
    typeof obj.metrics.expectedValue === 'number' &&
    typeof obj.metrics.risk === 'number' &&
    typeof obj.metrics.correlation === 'number' &&
    typeof obj.createdAt === 'string'
  )}

export function convertToLineup(output: LineupBuilderOutput): Lineup {
  return {
    id: output.id,
    strategy: {,`n  name: output.strategy.name,
      description: output.strategy.description
    },
    legs: output.legs.map(leg => ({,`n  eventId: leg.eventId,
      market: leg.market,
      selection: leg.selection,
      odds: leg.odds,
      prediction: {,`n  probability: leg.prediction.prediction.probability,
        confidence: leg.prediction.prediction.confidence,
        edge: leg.prediction.prediction.edge
      }
    })),
    metrics: {,`n  confidence: output.metrics.confidence,
      expectedValue: output.metrics.expectedValue,
      risk: output.metrics.risk,
      correlation: output.metrics.correlation
    },
    createdAt: output.createdAt
  }}



`
