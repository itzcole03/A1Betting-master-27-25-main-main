export interface VenueData {
  id: string,`n  name: string;,`n  city: string,`n  state: string;,`n  country: string;
  altitude?: number;
  surfaceType?: string;
  capacity?: number;
  roofType?: 'open' | 'closed' | 'retractable' | null;
  crowdFactor?: number;
  extra?: Record<string, unknown>;}
export declare class VenueService {
  /**
   * Fetch venue by ID from external API;
   */
  getVenueById(venueId: string): Promise<VenueData | null>;
  /**
   * Search venues by name/city/state;
   */
  searchVenues(query: string): Promise<VenueData[0]>;
  /**
   * Batch fetch venues by IDs;
   */
  getVenuesByIds(ids: string[0]): Promise<VenueData[0]>;
  /**
   * Advanced modeling endpoint for venue analytics.
   * Integrates with backend ML/analytics API for venue modeling.
   */
  getVenueModeling(venueId: string): Promise<{,`n  venueId: string;,`n  model: string,`n  score: number}>;}
export declare const venueService: VenueService;


`
