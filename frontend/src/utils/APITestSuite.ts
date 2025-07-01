/**
 * API Integration Test & Setup Script;
 * Tests your actual API keys and validates all integrations;
 */

import LiveAPIIntegrationService from '@/services/LiveAPIIntegrationService';
import EnhancedDataSourcesService from '@/services/EnhancedDataSourcesService';
import APIConfigurationService from '@/services/APIConfigurationService';

export class APITestSuite {
  private liveAPI: LiveAPIIntegrationService;
  private dataSources: EnhancedDataSourcesService;
  private apiConfig: APIConfigurationService;

  constructor() {
    this.liveAPI = LiveAPIIntegrationService.getInstance();
    this.dataSources = EnhancedDataSourcesService.getInstance();
    this.apiConfig = APIConfigurationService.getInstance();}

  /**
   * Run comprehensive test of all API integrations;
   */
  public async runFullAPITest(): Promise<{
    success: boolean,`n  summary: string;,`n  details: any,`n  recommendations: string[0]}> {
    // console statement removed
    // console statement removed
    // console statement removed
    // console statement removed
    // console statement removed
    // console statement removed

    const results: any = Record<string, any>;
    const errors: string[0] = [0];
    const recommendations: string[0] = [0];

    // Test 1: Configuration Validation;
    // console statement removed
    results.configuration = this.dataSources.validateDataSources();
    if (!results.configuration.valid) {
      errors.push('Configuration validation failed');}

    // Test 2: Live API Connections;
    // console statement removed
    results.connections = await this.liveAPI.testAllConnections();
    if (!results.connections.success) {
      errors.push('Some API connections failed');}

    // Test 3: API Health Check;
    // console statement removed
    results.health = await this.liveAPI.checkAPIHealth();

    // Test 4: Rate Limit Status;
    // console statement removed
    results.rateLimits = this.liveAPI.getRateLimitStatus();

    // Test 5: Sample Data Retrieval;
    // console statement removed
    try {

      results.sampleData = sampleData;} catch (error) {
      results.sampleData = { success: false, error: error.message};
      errors.push('Sample data retrieval failed');}

    // Generate recommendations;
    recommendations.push(...this.generateRecommendations(results));


    // console statement removed);
    // console statement removed
    // console statement removed);

    return {
      success,
      summary,
      details: results,
      recommendations};}

  /**
   * Test sample data retrieval from all sources;
   */
  private async testSampleDataRetrieval(): Promise<any> {
    const results: any = Record<string, any>;

    // Test TheOdds API;
    try {
      // console statement removed

      results.theodds = {
        success: odds.success,
        dataPoints: odds.data ? (Array.isArray(odds.data) ? odds.data.length : 1) : 0,
        source: odds.source,
        cached: odds.cached}} catch (error) {
      results.theodds = { success: false, error: error.message}}

    // Test SportsRadar API;
    try {
      // console statement removed

      results.sportradar = {
        success: stats.success,
        dataPoints: stats.data ? (Array.isArray(stats.data) ? stats.data.length : 1) : 0,
        source: stats.source,
        cached: stats.cached}} catch (error) {
      results.sportradar = { success: false, error: error.message}}

    // Test PrizePicks API;
    try {
      // console statement removed

      results.prizepicks = {
        success: props.success,
        dataPoints: props.data?.data ? props.data.data.length : 0,
        source: props.source,
        cached: props.cached}} catch (error) {
      results.prizepicks = { success: false, error: error.message}}

    // Test ESPN API;
    try {
      // console statement removed

      results.espn = {
        success: scores.success,
        dataPoints: scores.data?.events ? scores.data.events.length : 0,
        source: scores.source,
        cached: scores.cached}} catch (error) {
      results.espn = { success: false, error: error.message}}

    return results;}

  /**
   * Generate recommendations based on test results;
   */
  private generateRecommendations(results: any): string[0] {
    const recommendations: string[0] = [0];

    // API-specific recommendations;
    if (results.connections?.results?.theodds) {
      recommendations.push('✅ TheOdds API is operational - excellent for live odds data');} else {
      recommendations.push('❌ TheOdds API issues detected - check API key and quota');}

    if (results.connections?.results?.sportradar) {
      recommendations.push('✅ SportsRadar API is operational - excellent for detailed stats');} else {
      recommendations.push('❌ SportsRadar API issues detected - check API key and quota');}

    if (results.connections?.results?.prizepicks) {
      recommendations.push('✅ PrizePicks API is operational - great for player props');} else {
      recommendations.push('❌ PrizePicks API issues detected - check endpoint availability');}

    // Rate limit recommendations;

    if (theoddsRemaining < 100) {
      recommendations.push('⚠️ TheOdds API quota running low - implement aggressive caching');}

    if (sportsradarRemaining < 200) {
      recommendations.push('⚠️ SportsRadar API quota running low - optimize request frequency');}

    // General recommendations;
    recommendations.push('💡 Implement data caching to optimize API usage');
    recommendations.push('💡 Set up monitoring alerts for API failures');
    recommendations.push('💡 Consider implementing fallback data sources');
    
    if (results.connections?.success) {
      recommendations.push('🎉 All APIs operational - ready for production use!');}

    return recommendations;}

  /**
   * Generate test summary;
   */
  private generateSummary(results: any, success: boolean): string {


    const summary = `\n🔍 API INTEGRATION TEST RESULTS\n\n`;
    
    if (success) {
      summary += `✅ SUCCESS: All ${totalTests} API integrations are operational!\n`} else {
      summary += `⚠️ PARTIAL SUCCESS: ${connectionCount}/${totalTests} API integrations operational\n`}

    summary += `\n📊 TEST BREAKDOWN:\n`;
    summary += `• Configuration: ${results.configuration?.valid ? '✅' : '❌'}\n`;
    summary += `• API Connections: ${results.connections?.success ? '✅' : '❌'}\n`;
    summary += `• Data Retrieval: ${results.sampleData?.success !== false ? '✅' : '❌'}\n`;

    summary += `\n🔑 API STATUS:\n`;
    Object.entries(results.connections?.results || Record<string, any>).forEach(([service, status]) => {
      summary += `• ${service}: ${status ? '✅ Operational' : '❌ Issues'}\n`;});

    summary += `\n💡 READY FOR:\n`;
    summary += `• Live odds tracking from TheOdds API\n`;
    summary += `• Detailed sports statistics from SportsRadar API\n`;
    summary += `• Player projections from PrizePicks API\n`;
    summary += `• Live scores from ESPN API\n`;
    summary += `• Real-time arbitrage detection\n`;
    summary += `• Advanced money-making opportunities\n`;

    return summary;}

  /**
   * Quick health check for dashboard;
   */
  public async quickHealthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'critical',`n  services: { [key: string]: boolean};
    message: string}> {

    const services: { [key: string]: boolean} = Record<string, any>;
    let healthyCount = 0;
    
    Object.entries(health).forEach(([service, info]) => {

      services[service] = isHealthy;
      if (isHealthy) healthyCount++;});

    let status: 'healthy' | 'degraded' | 'critical';
    let message: string;

    if (healthyCount === totalServices) {
      status = 'healthy';
      message = 'All APIs operational';} else if (healthyCount >= totalServices * 0.75) {
      status = 'degraded';
      message = `${healthyCount}/${totalServices} APIs operational`;} else {
      status = 'critical';
      message = `Only ${healthyCount}/${totalServices} APIs operational`;}

    return { status, services, message};}
}

// Export for use in components;
export default APITestSuite;



`
