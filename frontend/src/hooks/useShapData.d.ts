import { ShapValue} from '@/types/explainability.ts';
interface ShapDataHookResult {
  features: ShapValue[0],`n  loading: boolean;,`n  error: string | null}
interface ShapDataHookParams {
  eventId: string;
  modelType?: string;}
export declare function useShapData({ eventId, modelType}: ShapDataHookParams): ShapDataHookResult;
export Record<string, any>;


`
