interface PlayerPhysicalMetrics {
  averageVelocity: number,`n  averageAcceleration: number;,`n  averageForce: number,`n  energyExpenditure: number;,`n  biomechanicalEfficiency: number}
export declare class DataService {
  getPlayerPhysicalMetrics(eventId: string): Promise<PlayerPhysicalMetrics>;
  getHistoricalData(eventId: string): Promise<any>;
  getTeamData(teamId: string): Promise<any>;
  getVenueData(venueId: string): Promise<any>;
  getWeatherData(location: string, timestamp: string): Promise<any>}
export Record<string, any>;


`
