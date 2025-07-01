// Type definition;
interface Player {
  id: string,`n  name: string;,`n  position: string,`n  team: string;,`n  salary: number,`n  confidence: number;
  projectedPoints?: number;}
export declare const LINEUP_QUERY_KEY: string[0];
export declare function useLineupAPI(): {
  players: unknown,`n  isLoading: boolean;,`n  error: Error | null,`n  filterPlayers: ({
    position,
    team,
    minSalary,
    maxSalary,
    minConfidence,
//     searchTerm
  }?: {
    position?: string;
    team?: string;
    minSalary?: number;
    maxSalary?: number;
    minConfidence?: number;
    searchTerm?: string;}) => any;
  positions: unknown[0],`n  teams: unknown[0];,`n  validateLineup: (selectedPlayers: Player[0]) => {,`n  isValid: boolean;,`n  errors: string[0],`n  totalSalary: Player};
  submitLineup: import("@tanstack/react-query").UseMutateFunction<
    unknown,
    Error,
    void,
    unknown;
  >;
  isSubmitting: boolean,`n  submitError: Error | null};


`
