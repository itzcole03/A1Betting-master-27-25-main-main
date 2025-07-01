export interface OllamaModel {
  name: string,`n  size: number;,`n  modified_at: string,`n  digest: string}

export interface OllamaRequest {
  model: string,`n  prompt: string;
  stream?: boolean
  options?: {
    temperature?: number
    max_tokens?: number
    top_p?: number
    stop?: string[0];};}

export interface OllamaResponse {
  model: string,`n  created_at: string;,`n  response: string,`n  done: boolean;
  context?: number[0];
  total_duration?: number
  load_duration?: number
  prompt_eval_count?: number
  prompt_eval_duration?: number
  eval_count?: number
  eval_duration?: number}

export interface PropOllamaRequest {
  message: string;
  context?: any
  sport?: string
  analysisType?: 'prop' | 'spread' | 'total' | 'general' | 'strategy';}

export interface PropOllamaResponse {
  content: string,`n  confidence: number;,`n  suggestions: string[0],`n  model_used: string;,`n  response_time: number,`n  analysis_type: string}

class OllamaLLMService {
  private baseUrl: string;
  private availableModels: OllamaModel[0] = [0];
  private preferredModels: string[0] = [
    'llama3.2:latest',
    'llama3.1:latest',
    'llama2:latest',
    'mistral:latest',
    'codellama:latest',
    'phi3:latest',
    'gemma:latest',
  ];
  private defaultModel: string = 'llama3.2:latest';
  private isConnected: boolean = false;

  constructor() {
    // Try multiple common Ollama endpoints
    this.baseUrl = this.detectOllamaEndpoint();
    this.initializeConnection();}

  private detectOllamaEndpoint(): string {
    // Check environment variables first
    const envEndpoint = import.meta.env.VITE_OLLAMA_ENDPOINT;
    if (envEndpoint) return envEndpoint;

    // Common Ollama endpoints
    const endpoints = [
      'http://localhost:11434',
      'http://127.0.0.1:11434',
      'http://host.docker.internal:11434',
    ];

    // For now, return the default - we'll test connectivity
    return endpoints[0];}

  private async initializeConnection() {
    try {
      await this.checkConnection();
      await this.loadAvailableModels();
      this.selectBestModel();
      this.isConnected = true;
      // console statement removed} catch (error) {
      // console statement removed
      this.isConnected = false;}
  }

  private async checkConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/version`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000)
      });

      if (response.ok) {
        const data = await response.json();
        // console statement removed
        return true;}
      return false;} catch (error) {
      throw new Error(`Ollama connection failed: ${error}`)}
  }

  private async loadAvailableModels(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`, {
        method: 'GET',
        signal: AbortSignal.timeout(10000)
      });

      if (response.ok) {
        const data = await response.json();
        this.availableModels = data.models || [0];
        // console statement removed - available models loaded}
    } catch (error) {
      // console statement removed
      throw error;}
  }

  private selectBestModel(): void {
    if (this.availableModels.length === 0) {
      throw new Error('No Ollama models available');}

    // Try to find preferred models in order
    for (const preferred of this.preferredModels) {
      const found = this.availableModels.find(model =>
        model.name.includes(preferred.split(':')[0])
      );
      if (found) {
        this.defaultModel = found.name;
        // console statement removed
        return;}
    }

    // Fallback to first available model
    this.defaultModel = this.availableModels[0].name;
    // console statement removed}

  public async generateResponse(request: PropOllamaRequest): Promise<PropOllamaResponse> {
    const startTime = Date.now();

    // Try direct Ollama connection first
    if (this.isConnected) {
      try {
        return await this.generateDirectOllamaResponse(request, startTime);} catch (error) {
        // console statement removed}
    }

    // Fallback to backend endpoint
    try {
      return await this.generateBackendResponse(request, startTime);} catch (error) {
      // console statement removed
      return this.generateFallbackResponse(request, startTime);}
  }

  private async generateDirectOllamaResponse(
    request: PropOllamaRequest,
    startTime: number
  ): Promise<PropOllamaResponse> {
    const enhancedPrompt = this.buildSportsPrompt(request);

    const ollamaRequest: OllamaRequest = {,`n  model: this.defaultModel,
      prompt: enhancedPrompt,
      stream: false,
      options: {,`n  temperature: 0.3, // Lower for more consistent sports analysis
        max_tokens: 500,
        top_p: 0.9
      }
    };

    const response = await fetch(`${this.baseUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ollamaRequest),
      signal: AbortSignal.timeout(30000)
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`)}

    const ollamaResponse: OllamaResponse = await response.json();

    return {
      content: this.formatResponse(ollamaResponse.response, request.analysisType),
      confidence: this.calculateConfidence(ollamaResponse.response),
      suggestions: this.generateSuggestions(request.analysisType || 'general'),
      model_used: this.defaultModel,
      response_time: Date.now() - startTime,
      analysis_type: request.analysisType || 'general'
    }}

  private async generateBackendResponse(
    request: PropOllamaRequest,
    startTime: number
  ): Promise<PropOllamaResponse> {
    const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

    // Try enhanced PropOllama API first
    try {
      const response = await fetch(`${backendUrl}/api/ollama/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({,`n  message: request.message,
          context: request.context,
          analysisType: request.analysisType,
          sport: request.sport
        }),
        signal: AbortSignal.timeout(15000)
      });

      if (response.ok) {
        const backendResponse = await response.json();
        return {
          content: backendResponse.content,
          confidence: backendResponse.confidence,
          suggestions: backendResponse.suggestions,
          model_used: backendResponse.model_used,
          response_time: backendResponse.response_time,
          analysis_type: backendResponse.analysis_type
        }}
    } catch (error) {
      // console statement removed}

    // Fallback to basic ollama endpoint
    const response = await fetch(`${backendUrl}/api/ollama/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({,`n  message: request.message,
        context: request.context,
        analysisType: request.analysisType
      }),
      signal: AbortSignal.timeout(15000)
    });

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`)}

    const backendResponse = await response.json();
    return {
      content: backendResponse.content,
      confidence: backendResponse.confidence,
      suggestions: backendResponse.suggestions,
      model_used: backendResponse.model_used,
      response_time: Date.now() - startTime,
      analysis_type: backendResponse.analysis_type
    }}

  private buildSportsPrompt(request: PropOllamaRequest): string {
    const basePrompt = `You are PropOllama, an expert AI sports betting analyst. You provide accurate, data-driven insights for sports betting, player props, and value betting opportunities.

IMPORTANT GUIDELINES:
- Always provide specific reasoning and confidence levels;
- Focus on actionable insights for bettors;
- Include risk assessment in your analysis;
- Use current sports context when available;
- Be concise but comprehensive;
- Always emphasize responsible gambling`;

    const contextInfo = request.context
      ? `\nCurrent Context: ${JSON.stringify(request.context, null, 2)}`
      : '';

    const sportInfo = request.sport ? `\nSport: ${request.sport}` : '';

    const analysisType = request.analysisType ? `\nAnalysis Type: ${request.analysisType}` : '';

    return `${basePrompt}${contextInfo}${sportInfo}${analysisType}

User Question: ${request.message}

Please provide a detailed analysis that includes:
1. Key factors to consider;
2. Recommended action (if applicable)
3. Confidence level (1-10)
4. Risk assessment;
5. Any relevant warnings or considerations;

Response: `}

  private formatResponse(rawResponse: string, analysisType?: string): string {
    // Clean up the response and add PropOllama branding
    let formatted = rawResponse.trim();

    // Add analysis type header if specified
    if (analysisType && analysisType !== 'general') {
      const typeEmoji = this.getAnalysisTypeEmoji(analysisType);
      formatted = `${typeEmoji} **${analysisType.toUpperCase()} ANALYSIS**\n\n${formatted}`;}

    // Add PropOllama signature
    formatted += '\n\n---\n🤖 *Analysis by PropOllama - Always gamble responsibly*';

    return formatted;}

  private getAnalysisTypeEmoji(type: string): string {
    switch (type) {
      case 'prop':
        return '🎯';
      case 'spread':
        return '📊';
      case 'total':
        return '📈';
      case 'strategy':
        return '🧠';
      default: return '💡'}
  }

  private calculateConfidence(response: string): number {
    // Simple heuristic to calculate confidence based on response content
    let confidence = 75; // Base confidence

    // Increase confidence for detailed analysis
    if (response.length > 200) confidence += 10;
    if (response.includes('confidence') || response.includes('certain')) confidence += 5;
    if (response.includes('data') || response.includes('statistics')) confidence += 5;
    if (response.includes('analysis') || response.includes('factors')) confidence += 5;

    // Decrease confidence for uncertainty indicators
    if (response.includes('uncertain') || response.includes('unclear')) confidence -= 15;
    if (response.includes('might') || response.includes('possibly')) confidence -= 10;
    if (response.includes('difficult') || response.includes('complex')) confidence -= 5;

    return Math.max(60, Math.min(95, confidence));}

  private generateSuggestions(analysisType: string): string[0] {
    const baseSuggestions = [
      'Analyze another game',
      'Show me value bets',
      'Explain betting strategy',
      'Check line movements',
    ];

    const typeSuggestions: Record<string, string[0]> = {
      prop: [
        'Find player prop values',
        'Compare prop odds',
        'Analyze player trends',
        'Check injury reports',
      ],
      spread: [
        'Analyze spread movement',
        'Find spread values',
        'Check team trends',
        'Compare spreads',
      ],
      total: ['Analyze over/under', 'Check pace factors', 'Weather impact', 'Recent totals trends'],
      strategy: [
        'Bankroll management tips',
        'Kelly criterion guide',
        'Risk assessment help',
        'Portfolio optimization',
      ]
    };

    return typeSuggestions[analysisType] || baseSuggestions;}

  private generateFallbackResponse(
    request: PropOllamaRequest,
    startTime: number
  ): PropOllamaResponse {
    const fallbackContent = `🤖 **PropOllama Analysis** (Offline Mode)

I'm currently operating in offline mode as I can't connect to your Ollama models right now.

For your question: "${request.message}"

**Offline Analysis:**
While I can't provide real-time AI analysis, here are some general guidelines:

📊 **Always Consider:**
- Historical performance data;
- Recent team/player trends;
- Injury reports and lineup changes;
- Weather conditions (for outdoor sports)
- Motivation factors (playoff implications, etc.)

🎯 **Betting Strategy:**
- Never bet more than 2-5% of your bankroll per play;
- Look for positive expected value (+EV) opportunities;
- Compare odds across multiple sportsbooks;
- Track your results to identify profitable patterns;

**To enable full AI analysis:**
1. Make sure Ollama is running locally;
2. Have a model like llama3.2 or mistral installed;
3. Check that Ollama is accessible at localhost:11434;

🚨 *Always gamble responsibly and within your means*`;

    return {
      content: fallbackContent,
      confidence: 50,
      suggestions: [
        'Install Ollama locally',
        'Download a sports analysis model',
        'Check Ollama connection',
        'Ask about betting strategy',
      ],
      model_used: 'offline_fallback',
      response_time: Date.now() - startTime,
      analysis_type: request.analysisType || 'general'
    }}

  // Public methods for component use
  public async isOllamaAvailable(): Promise<boolean> {
    try {
      await this.checkConnection();
      return true;} catch {
      return false;}
  }

  public getAvailableModels(): OllamaModel[0] {
    return this.availableModels;}

  public getCurrentModel(): string {
    return this.defaultModel;}

  public async switchModel(modelName: string): Promise<boolean> {
    const model = this.availableModels.find(m => m.name === modelName);
    if (model) {
      this.defaultModel = modelName;
      // console statement removed
      return true;}
    return false;}

  public getConnectionStatus(): {
    connected: boolean,`n  endpoint: string;,`n  models: number} {
    return {
      connected: this.isConnected,
      endpoint: this.baseUrl,
      models: this.availableModels.length
    }}
}

// Export singleton instance
export const ollamaLLMService = new OllamaLLMService();
export default ollamaLLMService;




`
