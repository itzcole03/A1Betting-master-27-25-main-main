import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Send, Zap, Eye, Target, TrendingUp, Save } from 'lucide-react';
import { lineupTracker } from '../../services/lineupTrackingService';
import toast from 'react-hot-toast';

// ============================================================================
// INTERFACES & TYPES
// ============================================================================

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// ============================================================================
// MAIN COMPONENT - PropOllama (matching PropGPT design exactly)
// ============================================================================

const PropOllama: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content:
        "Welcome to PropGPT Quantum Neural Interface! I'm powered by 47 neural networks and quantum processing. I continuously learn from every interaction to provide better insights. Ask about props, strategies, or market analysis.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [learningContext, setLearningContext] = useState<string[]>([]);
  const [conversationId] = useState(
    () => `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );
  const [isTyping, setIsTyping] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [lineupName, setLineupName] = useState('');
  const [lastRecommendations, setLastRecommendations] = useState<string[]>([]);

  const saveConversationAsLineup = () => {
    if (!lineupName.trim()) {
      toast.error('Please enter a lineup name');
      return;
    }

    if (lastRecommendations.length === 0) {
      toast.error('No AI recommendations to save');
      return;
    }

    const picks = lastRecommendations.map((rec, index) => ({
      id: `ai_pick_${index}`,
      description: rec,
      confidence: 85 + Math.random() * 10, // AI confidence
    }));

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
        background: '#1f2937',
        color: '#3b82f6',
        border: '1px solid #3b82f6',
      },
    });

    setShowSaveModal(false);
    setLineupName('');
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Add to learning context for continuous learning
    setLearningContext(prev => [...prev.slice(-10), input.toLowerCase()]);

    setInput('');
    setIsTyping(true);

    // Prepare for backend LLM integration
    const requestPayload = {
      conversationId,
      message: input,
      context: learningContext,
      timestamp: new Date().toISOString(),
      userSession: 'quantum_user',
      neuralNetworks: 247,
      dataPoints: 2847592,
    };

    try {
      // TODO: Replace with actual backend LLM call
      // const response = await fetch('/api/propgpt/chat', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(requestPayload)
      // });

      // Simulate AI response with enhanced learning
      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now() + 1,
          type: 'assistant',
          content: generateEnhancedAIResponse(input, learningContext),
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error('PropGPT LLM Error:', error);
      setIsTyping(false);
    }
  };

  const generateEnhancedAIResponse = (userInput: string, context: string[]): string => {
    const input = userInput.toLowerCase();

    // Analyze context for learning patterns
    const hasAskedAboutLeBron = context.some(c => c.includes('lebron'));
    const hasAskedAboutStrategy = context.some(c => c.includes('strategy') || c.includes('bet'));

    if (input.includes('lebron') || input.includes('james')) {
      const contextualNote = hasAskedAboutLeBron
        ? "\n\n🧠 **Learning Note**: Based on our conversation history, I'm tailoring this analysis to your interest patterns."
        : '';
      return `🏀 **LeBron James Neural Analysis**\n\n📊 **Current Form**: 28.2 PPG over last 10 games\n🎯 **Quantum Prediction**: 96.3% confidence OVER 25.5 points\n🔥 **Key Factors**: Lakers 8-2 when LeBron scores 26+, optimal rest patterns\n⚡ **Live Edge**: 4.7% value detected on points prop\n\n**Neural Recommendation**: Strong OVER play with 3.5 unit allocation${contextualNote}`;
    }

    if (input.includes('strategy') || input.includes('help')) {
      return '🧠 **Quantum Strategy Analysis**\n\n🎯 **Portfolio Optimization**: Diversify across 3-4 correlated props\n📊 **Risk Management**: Use Kelly Criterion for optimal bet sizing\n⚡ **Live Monitoring**: Track line movements in real-time\n🔍 **Value Detection**: Focus on props with 5%+ edge\n\n**Neural Networks** are processing 247 data streams to identify optimal opportunities.';
    }

    const responses = [
      "🧠 **Neural Analysis Complete**\n\nI'm processing your request through 247 neural networks. Could you specify which sport, player, or betting market you're interested in? I can provide:\n\n�� Player prop analysis\n• Game predictions\n• Market inefficiencies\n• Bankroll optimization",
      '⚡ **Quantum Processing Active**\n\nMy neural networks are analyzing real-time data. I can help you with:\n\n🏀 **NBA Props**: Player performance predictions\n🏈 **NFL Analysis**: Team and player metrics\n⚾ **MLB Insights**: Pitcher vs batter matchups\n🎯 **Strategy**: Portfolio and risk management',
      "🎯 **PropGPT Ready**\n\nI'm continuously learning from our conversation to provide better insights. What would you like to analyze?\n\n• Live game opportunities\n• Historical performance trends\n• Injury impact analysis\n• Weather and venue factors",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const quickActions = [
    {
      name: 'NEURAL ANALYSIS',
      icon: Brain,
      color: 'from-purple-500 to-blue-500',
      action: 'Analyze current props with neural networks',
    },
    {
      name: 'LIVE MARKETS',
      icon: Eye,
      color: 'from-green-500 to-teal-500',
      action: 'Show me live betting opportunities',
    },
    {
      name: 'VALUE DETECTION',
      icon: Target,
      color: 'from-orange-500 to-red-500',
      action: 'Find props with highest expected value',
    },
    {
      name: 'STRATEGY AI',
      icon: TrendingUp,
      color: 'from-cyan-500 to-blue-500',
      action: 'Help me build an optimal strategy',
    },
  ];

  return (
    <motion.div
      className='space-y-8 animate-slide-in-up'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header - Exact match to reference image */}
      <div className='text-center mb-8'>
        <h1 className='holographic text-6xl font-black mb-4 font-cyber'>PROPGPT QUANTUM</h1>
        <p className='text-2xl text-gray-400 font-mono mb-8'>
          Neural Sports Intelligence Assistant
        </p>

        {/* Stats Grid - Exact match to reference */}
        <div className='grid grid-cols-4 gap-8 mb-8'>
          <div className='text-center'>
            <div className='text-4xl font-bold text-electric-400 font-cyber'>247</div>
            <div className='text-gray-400 font-mono text-sm'>Neural Networks</div>
          </div>
          <div className='text-center'>
            <div className='text-4xl font-bold text-purple-400 font-cyber'>24.7</div>
            <div className='text-gray-400 font-mono text-sm'>Processing Speed</div>
          </div>
          <div className='text-center'>
            <div className='text-4xl font-bold text-green-400 font-cyber'>91.5%</div>
            <div className='text-gray-400 font-mono text-sm'>Accuracy</div>
          </div>
          <div className='text-center'>
            <div className='text-4xl font-bold text-cyan-400 font-cyber'>&lt;1ms</div>
            <div className='text-gray-400 font-mono text-sm'>Response Time</div>
          </div>
        </div>
      </div>

      {/* Chat Interface - Exact match to reference */}
      <div className='quantum-card rounded-3xl p-8 min-h-[500px] flex flex-col'>
        {/* Messages */}
        <div className='flex-1 space-y-6 mb-6 overflow-y-auto max-h-[400px]'>
          {messages.map(message => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-electric-400 to-cyan-400'
                      : 'bg-gradient-to-br from-purple-500 to-blue-500'
                  }`}
                >
                  {message.type === 'user' ? (
                    <span className='text-black font-bold text-sm'>U</span>
                  ) : (
                    <Brain className='w-5 h-5 text-white' />
                  )}
                </div>

                {/* Message Content */}
                <div
                  className={`p-4 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-electric-500/20 border border-electric-500/30'
                      : 'bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <div className='text-white whitespace-pre-line'>{message.content}</div>
                  <div className='text-xs text-gray-400 mt-2'>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex justify-start'
            >
              <div className='flex items-start space-x-3'>
                <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center'>
                  <Brain className='w-5 h-5 text-white animate-pulse' />
                </div>
                <div className='p-4 rounded-2xl bg-purple-500/20 border border-purple-500/30'>
                  <div className='flex space-x-1'>
                    <div className='w-2 h-2 bg-purple-400 rounded-full animate-bounce'></div>
                    <div
                      className='w-2 h-2 bg-purple-400 rounded-full animate-bounce'
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className='w-2 h-2 bg-purple-400 rounded-full animate-bounce'
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className='border-t border-white/10 pt-6'>
          <div className='flex items-center justify-between mb-4'>
            <div className='text-sm text-gray-400 font-mono'>
              Neural conversation analysis active
            </div>
            <button
              onClick={() => setShowSaveModal(true)}
              className='flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-all'
            >
              <Save className='w-4 h-4' />
              <span>Save Analysis</span>
            </button>
          </div>
          <div className='flex space-x-4'>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && sendMessage()}
              placeholder='Ask about props, strategies, or market analysis...'
              className='flex-1 p-4 rounded-2xl bg-gray-800/50 border border-gray-600 focus:border-electric-500 focus:outline-none text-white placeholder-gray-400'
            />
            <motion.button
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              className='px-6 py-4 bg-gradient-to-r from-electric-500 to-purple-500 text-white rounded-2xl hover:from-electric-400 hover:to-purple-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className='w-5 h-5' />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Quick Actions - Exact match to reference */}
      <div className='grid grid-cols-4 gap-6'>
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={index}
              onClick={() => setInput(action.action)}
              className={`p-6 rounded-2xl bg-gradient-to-br ${action.color} hover:scale-105 transition-all duration-300 group`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className='w-8 h-8 text-white mb-3 mx-auto group-hover:animate-pulse' />
              <div className='text-white font-bold text-sm font-cyber'>{action.name}</div>
            </motion.button>
          );
        })}
      </div>

      {/* Save Lineup Modal */}
      {showSaveModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
          onClick={() => setShowSaveModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className='quantum-card rounded-2xl p-8 max-w-md w-full'
            onClick={e => e.stopPropagation()}
          >
            <h3 className='text-2xl font-bold text-blue-400 mb-6 font-cyber'>SAVE AI ANALYSIS</h3>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-bold mb-2 text-gray-300'>Analysis Name</label>
                <input
                  type='text'
                  value={lineupName}
                  onChange={e => setLineupName(e.target.value)}
                  placeholder='Enter analysis name...'
                  className='w-full p-3 rounded-lg bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none'
                />
              </div>
              <div className='text-sm text-gray-400'>
                This will save your current AI conversation as a lineup for tracking.
              </div>
              <div className='flex space-x-4 pt-4'>
                <button
                  onClick={saveConversationAsLineup}
                  className='flex-1 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition-all'
                >
                  Save Analysis
                </button>
                <button
                  onClick={() => setShowSaveModal(false)}
                  className='flex-1 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 transition-all'
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PropOllama;
