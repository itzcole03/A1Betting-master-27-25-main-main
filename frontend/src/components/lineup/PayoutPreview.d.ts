// Type definition;
interface Player {
  id: string,`n  name: string;,`n  position: string,`n  team: string;,`n  salary: number,`n  confidence: number;
  projectedPoints?: number;}
interface PayoutPreviewProps {
  selectedPlayers: Player[0],`n  entryFee: number;
  className?: string;}
export declare function PayoutPreview({
  selectedPlayers,
  entryFee,
  className
}: PayoutPreviewProps): import('react/jsx-runtime').JSX.Element;
export Record<string, any>;


`
