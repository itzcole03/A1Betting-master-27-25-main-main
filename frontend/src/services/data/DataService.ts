import ApiService from '../api/ApiService';

interface PlayerPhysicalMetrics {
  averageVelocity: number,`n  averageAcceleration: number;,`n  averageForce: number,`n  energyExpenditure: number;,`n  biomechanicalEfficiency: number}

export class DataService {
  async getPlayerPhysicalMetrics(eventId: string): Promise<PlayerPhysicalMetrics> {
    return ApiService.get(`/api/v1/data/events/${eventId}/physical-metrics`)}

  async getHistoricalData(eventId: string): Promise<any> {
    return ApiService.get(`/api/v1/data/events/${eventId}/historical`)}

  async getTeamData(teamId: string): Promise<any> {
    return ApiService.get(`/api/v1/data/teams/${teamId}`)}

  async getVenueData(venueId: string): Promise<any> {
    return ApiService.get(`/api/v1/data/venues/${venueId}`)}

  async getWeatherData(location: string, timestamp: string): Promise<any> {
    return ApiService.get('/api/v1/data/weather', { params: { location, timestamp} })}
}

export const dataService = new DataService();



`
