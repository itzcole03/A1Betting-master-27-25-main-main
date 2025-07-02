import { motion} from 'framer-motion';
import { Brain, Eye, Save, Send, Target, TrendingUp} from 'lucide-react';
import React, { useState} from 'react';
import toast from 'react-hot-toast';
import { api} from '../../services/api/ProductionApiService';
import { lineupTracker} from '../../services/lineupTrackingService';
import { ollamaLLMService} from '../../services/ollamaLLMService';

// ============================================================================
// INTERFACES & TYPES
// ============================================================================

interface Message {
  id: number
,`n  type: 'user' | 'assistant';
,`n  content: string
,`n  timestamp: Date;
  confidence?: number
  model_used?: string}

// ============================================================================
// MAIN COMPONENT - PropOllama with Real LLM Integration
// ============================================================================

const PropOllama: React.FC = () => {
  const [messages, setMessages] = useState<Message[0]>([
    {
      id: 1,
      type: 'assistant',
      content:
        "Welcome to PropOllama AI! I'm your expert sports betting analyst powered by real AI models. I can analyze props, predict outcomes, and provide data-driven insights. Ask me about any sports betting question!",
      timestamp: new Date(),
      confidence: 95,
      model_used: 'PropOllama_v5.0'
    },
  ]);
  const [input, setInput] = useState('');
  const [learningContext, setLearningContext] = useState<string[0]>([0]);
  const [conversationId] = useState(
    () => `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );
  const [isTyping, setIsTyping] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [lineupName, setLineupName] = useState('');
  const [lastRecommendations, setLastRecommendations] = useState<string[0]>([0]);

  const saveConversationAsLineup = () => {
    if (!lineupName.trim()) {
      toast.error('Please enter a lineup name');
      return;}

    if (lastRecommendations.length === 0) {
      toast.error('No AI recommendations to save');
      return;}

    const picks = lastRecommendations.map((rec, index) => ({
      id: `ai_pick_${index}`,
      description: rec,
      confidence: 85 + Math.random() * 10, // AI confidence}));

    const lineupId = lineupTracker.savePropOllamaLineup(
      lineupName,
      picks,
      100, // Default entry amount
      500, // Estimated payout
      85 + Math.random() * 10 // AI confidence
    );

    toast.success(`🤖 PropOllama lineup "${lineupName}" saved!`, {
      duration: 3000,
      style: {
,`n  background: '#1f2937',
        color: '#3b82f6',
        border: '1px solid #3b82f6'
      }
    });

    setShowSaveModal(false);
    setLineupName('');};

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
,`n  id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Add to learning context for continuous learning
    setLearningContext(prev => [...prev.slice(-10), input.toLowerCase()]);

    const currentInput = input;
    setInput('');
    setIsTyping(true);

    try {
      // Real LLM Integration - Try multiple methods for maximum reliability
      let aiResponse: Message;

      try {
        // Method 1: Try direct Ollama service first
        const ollamaResponse = await ollamaLLMService.generateResponse({
          message: currentInput,
          context: learningContext,
          analysisType: detectAnalysisType(currentInput)
        });

        aiResponse = {
          id: Date.now() + 1,
          type: 'assistant',
          content: formatAIResponse(ollamaResponse.content, ollamaResponse.confidence),
          timestamp: new Date(),
          confidence: ollamaResponse.confidence,
          model_used: ollamaResponse.model_used
        };

        // Extract recommendations for lineup saving
        extractRecommendations(ollamaResponse.content);} catch (ollamaError) {
//         console.warn('Ollama service unavailable, trying backend API:', ollamaError);

        // Method 2: Fallback to backend PropOllama API
        try {
          const backendResponse = await api.sendChatMessage(currentInput, {
            conversationId,
            context: learningContext,
            timestamp: new Date().toISOString(),
            analysisType: detectAnalysisType(currentInput)
          });

          aiResponse = {
            id: Date.now() + 1,
            type: 'assistant',
            content: formatAIResponse(
              backendResponse.data.content,
              backendResponse.data.confidence
            ),
            timestamp: new Date(),
            confidence: backendResponse.data.confidence,
            model_used: backendResponse.data.model_used || 'PropOllama_Backend'
          };

          extractRecommendations(backendResponse.data.content);} catch (backendError) {
//           console.warn('Backend API unavailable, using enhanced fallback:', backendError);

          // Method 3: Enhanced intelligent fallback
          aiResponse = {
            id: Date.now() + 1,
            type: 'assistant',
            content: generateIntelligentFallback(currentInput, learningContext),
            timestamp: new Date(),
            confidence: 75,
            model_used: 'PropOllama_Fallback'
          }}
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);} catch (error) {
//       console.error('PropOllama LLM Error:', error);

      // Error fallback
      const errorResponse: Message = {
,`n  id: Date.now() + 1,
        type: 'assistant',
        content: `🤖 I encountered an issue processing your request. However, I can still help you with general sports betting advice!\n\n**Your question:** "${currentInput}"\n\n**General guidance:** Always research team/player stats, consider recent form, check injury reports, and manage your bankroll responsibly.\n\n*Try asking me again or check if Ollama is running locally for full AI analysis.*`,
        timestamp: new Date(),
        confidence: 50,
        model_used: 'Error_Fallback'
      };

      setMessages(prev => [...prev, errorResponse]);
      setIsTyping(false);}
  };

  const detectAnalysisType = (message: string): string => {
    const msg = message.toLowerCase();
    if (msg.includes('prop') || msg.includes('player')) return 'prop';
    if (msg.includes('spread') || msg.includes('line')) return 'spread';
    if (msg.includes('total') || msg.includes('over') || msg.includes('under')) return 'total';
    if (msg.includes('strategy') || msg.includes('bankroll')) return 'strategy';
    return 'general';};

  const formatAIResponse = (content: string, confidence: number): string => {
    return `${content}\n\n🎯 **AI Confidence:** ${confidence}% | 🤖 **Powered by Real PropOllama Models**`};

  const extractRecommendations = (content: string) => {
    // Extract actionable recommendations from AI response
    const lines = content.split('\n');
    const recommendations = lines
      .filter(
        line =>
          line.includes('OVER') ||
          line.includes('UNDER') ||
          line.includes('recommend') ||
          line.includes('play') ||
          line.includes('bet')
      )
      .slice(0, 5); // Limit to 5 recommendations

    if (recommendations.length > 0) {
      setLastRecommendations(recommendations);}
  };

  const generateIntelligentFallback = (userInput: string, context: string[0]): string => {
    const input = userInput.toLowerCase();

    // Analyze context for learning patterns
    const hasAskedAboutLeBron = context.some(c => c.includes('lebron'));
    const hasAskedAboutStrategy = context.some(c => c.includes('strategy') || c.includes('bet'));

    if (input.includes('lebron') || input.includes('james')) {
      const contextualNote = hasAskedAboutLeBron
        ? "\n\n🧠 **Context Note**: I notice you've asked about LeBron before - building on our previous discussion."
        : '';
      return `🏀 **LeBron James Analysis** (Offline Mode)\n\n📊 **Key Factors to Consider: **\n• Recent performance trends\n• Rest days between games\n• Matchup difficulty\n• Team motivation level\n\n🎯 **General Approach:**\n• Check last 10 games stats\n• Look for rest vs back-to-back patterns\n• Consider opponent's defense ranking\n\n⚠️ **Note**: For real-time AI analysis with current data, please ensure Ollama is running locally.${contextualNote}`}

    if (input.includes('strategy') || input.includes('help')) {
      return '🧠 **Sports Betting Strategy** (Offline Mode)\n\n🎯 **Core Principles: **\n• Bankroll Management: Never bet more than 2-5% per play\n• Value Betting: Look for positive expected value\n• Research: Stats, injuries, weather, motivation\n• Record Keeping: Track all bets and results\n\n📊 **Prop Betting Tips:**\n• Focus on player-specific trends\n• Consider game script scenarios\n• Check for line shopping opportunities\n\n🤖 **For AI-powered analysis, please start Ollama locally!**'}

    const responses = [
      `🤖 **PropOllama Analysis** (Offline Mode)\n\nI understand you're asking about: "${userInput}"\n\n**General Betting Guidelines:**\n• Research historical data and trends\n• Consider situational factors (injuries, weather, motivation)\n• Compare odds across multiple sportsbooks\n• Use proper bankroll management\n\n**To enable full AI analysis:**\n1. Install and run Ollama locally\n2. Download a sports analysis model\n3. Ensure Ollama is accessible at localhost:11434\n\n🎯 *I'm ready to provide real AI insights once connected!*`,

      `⚡ **PropOllama Ready** (Limited Mode)\n\nWhile I can't access my full AI models right now, I can still help with general advice!\n\n**For your question about:** "${userInput}"\n\n**Consider these factors:**\n• Recent performance data\n• Head-to-head matchups\n• Injury reports and lineup changes\n• Weather conditions (outdoor sports)\n• Motivation factors\n\n🚨 **Always gamble responsibly and within your means**\n\n*Connect Ollama for full AI-powered analysis!*`,

      `🎯 **PropOllama Intelligence** (Fallback Mode)\n\nI'm analyzing your request: "${userInput}"\n\n**Smart Betting Approach:**\n• Start with statistical research\n• Look for market inefficiencies\n• Consider multiple data sources\n• Track your results over time\n\n**Popular Analysis Areas:**\n• Player props (points, rebounds, assists)\n• Game totals and spreads\n• Live betting opportunities\n• Arbitrage possibilities\n\n🤖 **Full AI analysis available when Ollama is running!**`,
    ];

    return responses[Math.floor(Math.random() * responses.length)];};

  const quickActions = [
    {
      name: 'AI ANALYSIS',
      icon: Brain,
      color: 'from-purple-500 to-blue-500',
      action: 'Analyze current props with AI models'
    },
    {
      name: 'LIVE MARKETS',
      icon: Eye,
      color: 'from-green-500 to-teal-500',
      action: 'Show me live betting opportunities'
    },
    {
      name: 'VALUE DETECTION',
      icon: Target,
      color: 'from-orange-500 to-red-500',
      action: 'Find props with highest expected value'
    },
    {
      name: 'STRATEGY AI',
      icon: TrendingUp,
      color: 'from-cyan-500 to-blue-500',
      action: 'Help me build an optimal strategy'
    },
  ];

  return (
    <motion.div
      className='space-y-8 animate-slide-in-up'
      initial={{ opacity: 0, y: 20}}
      animate={{ opacity: 1, y: 0}}
      transition={{ duration: 0.5}}
    >
      {/* Header - Updated for Real AI */}
      <div className='text-center mb-8'>
        <h1 className='holographic text-6xl font-black mb-4 font-cyber'>PROPOLLAMA AI</h1>
        <p className='text-2xl text-gray-400 font-mono mb-8'>Real AI Sports Betting Assistant</p>

        {/* Stats Grid - Real AI Metrics */}
        <div className='grid grid-cols-4 gap-8 mb-8'>
          <div className='text-center'>
            <div className='text-4xl font-bold text-electric-400 font-cyber'>REAL</div>
            <div className='text-gray-400 font-mono text-sm'>AI Models</div>
          </div>
          <div className='text-center'>
            <div className='text-4xl font-bold text-purple-400 font-cyber'>LIVE</div>
            <div className='text-gray-400 font-mono text-sm'>Analysis</div>
          </div>
          <div className='text-center'>
            <div className='text-4xl font-bold text-green-400 font-cyber'>95%</div>
            <div className='text-gray-400 font-mono text-sm'>Accuracy Goal</div>
          </div>
          <div className='text-center'>
            <div className='text-4xl font-bold text-cyan-400 font-cyber'>FAST</div>
            <div className='text-gray-400 font-mono text-sm'>Response</div>
          </div>
        </div>
      </div>

      {/* Chat Interface - Enhanced with Real AI */}
      <div className='quantum-card rounded-3xl p-8 min-h-[500px] flex flex-col'>
        {/* Messages */}
        <div className='flex-1 space-y-6 mb-6 overflow-y-auto max-h-[400px]'>
          {messages.map(message => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10}}
              animate={{ opacity: 1, y: 0}}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
>`n              >
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-electric-400 to-cyan-400'
                      : 'bg-gradient-to-br from-purple-500 to-blue-500'}`}
>`n                >
                  {message.type === 'user' ? (
                    <span className='text-black font-bold text-sm'>U</span>
                  ) : (
                    <Brain className='w-5 h-5 text-white' />
                  )}
                </div>

                {/* Message Content */}
                <div className={`p-4 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-electric-500/20 border border-electric-500/30'
                      : 'bg-purple-500/20 border border-purple-500/30'}`}
>`n                >
                  <div className='text-white whitespace-pre-line'>{message.content}</div>
                  <div className='text-xs text-gray-400 mt-2 flex justify-between'>
                    <span>{message.timestamp.toLocaleTimeString()}</span>
                    {message.model_used && (
                      <span className='text-purple-400'>Model: {message.model_used}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10}}
              animate={{ opacity: 1, y: 0}}
              className='flex justify-start'
            >
              <div className='flex items-start space-x-3'>
                <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center'>
                  <Brain className='w-5 h-5 text-white animate-pulse' />
                </div>
                <div className='p-4 rounded-2xl bg-purple-500/20 border border-purple-500/30'>
                  <div className='flex space-x-1'>
                    <div className='w-2 h-2 bg-purple-400 rounded-full animate-bounce'></div>
                    <div className='w-2 h-2 bg-purple-400 rounded-full animate-bounce'
                      style={{ animationDelay: '0.1s'}}
>`n                    ></div>
                    <div className='w-2 h-2 bg-purple-400 rounded-full animate-bounce'
                      style={{ animationDelay: '0.2s'}}
>`n                    ></div>
                  </div>
                  <div className='text-xs text-gray-400 mt-2'>PropOllama AI is analyzing...</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className='border-t border-white/10 pt-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='text-sm text-gray-400 font-mono'>
              🤖 Real AI conversation analysis active
            </div>
            <button onClick={() => setShowSaveModal(true)}
              className='flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-all'
            >
              <Save className='w-4 h-4' />
              <span>Save Analysis</span>
            </button>
          </div>
          <div className='flex space-x-4'>
            <input value={input}
>`n              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && sendMessage()}
              placeholder='Ask about props, strategies, or market analysis...'
              className='flex-1 p-4 rounded-2xl bg-gray-800/50 border border-gray-600 focus:border-electric-500 focus:outline-none text-white placeholder-gray-400'
            />
            <motion.button
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              className='px-6 py-4 bg-gradient-to-r from-electric-500 to-purple-500 text-white rounded-2xl hover:from-electric-400 hover:to-purple-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
              whileHover={{ scale: 1.05}}
              whileTap={{ scale: 0.95}}
            >
              <Send className='w-5 h-5' />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='grid grid-cols-4 gap-6'>
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={index}
              onClick={() => setInput(action.action)}
              className={`p-6 rounded-2xl bg-gradient-to-br ${action.color} hover: scale-105 transition-all duration-300 group`}
              whileHover={{ scale: 1.05}}
              whileTap={{ scale: 0.95}}
            >
              <Icon className='w-8 h-8 text-white mb-3 mx-auto group-hover:animate-pulse' />
              <div className='text-white font-bold text-sm font-cyber'>{action.name}</div>
            </motion.button>
          )})}
      </div>

      {/* Save Lineup Modal */}
      {showSaveModal && (
        <motion.div
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
          onClick={() => setShowSaveModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0}}
            animate={{ scale: 1, opacity: 1}}
            className='quantum-card rounded-2xl p-8 max-w-md w-full'
            onClick={e => e.stopPropagation()}
          >
            <h3 className='text-2xl font-bold text-blue-400 mb-6 font-cyber'>SAVE AI ANALYSIS</h3>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-bold mb-2 text-gray-300'>Analysis Name</label>
                <input type='text'
                  value={lineupName}
>`n                  onChange={e => setLineupName(e.target.value)}
                  placeholder='Enter analysis name...'
                  className='w-full p-3 rounded-lg bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none'
                />
              </div>
              <div className='text-sm text-gray-400'>
                This will save your current AI conversation as a lineup for tracking.
              </div>
              <div className='flex space-x-4 pt-4'>
                <button onClick={saveConversationAsLineup}
                  className='flex-1 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition-all'
>`n                >
                  Save Analysis
                </button>
                <button onClick={() => setShowSaveModal(false)}
                  className='flex-1 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 transition-all'
                >
//                   Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )};

export default PropOllama;



`
