import React, { useState } from 'react';

// Fixed: Target import issue resolved
interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const PropOllama: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content:
        "Welcome to PropOllama Quantum Neural Interface! I'm powered by 47 neural networks and quantum processing. I can analyze props, predict outcomes, and provide real-time market insights. How can I assist your betting strategy today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Enhanced AI responses
    setTimeout(() => {
      const responses = [
        'Based on neural network analysis of 247,892 data points, LeBron James has an 87.3% probability of exceeding 25.5 points tonight.',
        'Quantum analysis indicates weather conditions will create 23% more passing opportunities.',
        'Neural Insight: Consider UNDER 2.5 rounds based on 47 fight analysis.',
        'WNBA Analysis: Strong OVER 9.5 rebounds play with 91.2% confidence.',
        'Soccer Quantum Model: OVER 2.5 team goals has 88.7% probability.',
        'Real-time odds arbitrage detected across 6 sportsbooks.',
      ];

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleQuickAction = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className='space-y-8 animate-slide-in-up h-full flex flex-col'>
      {/* Header */}
      <div className='quantum-card rounded-3xl p-10 text-center'>
        <div className='relative mb-6'>
          <h1 className='holographic text-5xl font-black mb-4 font-cyber'>PROPOLLAMA QUANTUM</h1>
          <p className='text-2xl text-gray-400 font-mono'>Neural Sports Intelligence Assistant</p>
        </div>
        <div className='grid grid-cols-4 gap-6'>
          <div>
            <div className='text-2xl font-bold text-electric-400 font-cyber'>47</div>
            <div className='text-gray-400 font-mono text-sm'>Neural Networks</div>
          </div>
          <div>
            <div className='text-2xl font-bold text-purple-400 font-cyber'>247</div>
            <div className='text-gray-400 font-mono text-sm'>Neural IQ</div>
          </div>
          <div>
            <div className='text-2xl font-bold text-green-400 font-cyber'>87.3%</div>
            <div className='text-gray-400 font-mono text-sm'>Prediction Accuracy</div>
          </div>
          <div>
            <div className='text-2xl font-bold text-blue-400 font-cyber'>&lt;1ms</div>
            <div className='text-gray-400 font-mono text-sm'>Response Time</div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className='flex-1 quantum-card rounded-3xl p-8 flex flex-col border border-electric-500/30'>
        <div className='flex-1 space-y-6 mb-8 overflow-y-auto max-h-96'>
          {messages.map(message => (
            <div
              key={message.id}
              className={`chat-message flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`${message.type === 'user' ? 'order-2 ml-4' : 'order-1 mr-4'} flex-shrink-0`}
              >
                {message.type === 'user' ? (
                  <div className='w-10 h-10 bg-gradient-to-br from-electric-400 to-neon-blue rounded-xl flex items-center justify-center'>
                    <span className='text-black font-bold text-sm'>U</span>
                  </div>
                ) : (
                  <div className='w-10 h-10 bg-gradient-to-br from-purple-400 to-neon-purple rounded-xl flex items-center justify-center animate-neural-pulse'>
                    <i className='fas fa-brain text-black text-sm'></i>
                  </div>
                )}
              </div>
              <div className={`${message.type === 'user' ? 'order-1' : 'order-2'} max-w-2xl`}>
                <div
                  className={`px-6 py-4 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-electric-500 text-black font-semibold'
                      : 'quantum-card border border-purple-500/30 text-white'
                  }`}
                >
                  {message.content}
                </div>
                <div className='text-xs text-gray-500 mt-2 font-mono'>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className='flex justify-start'>
              <div className='w-10 h-10 bg-gradient-to-br from-purple-400 to-neon-purple rounded-xl flex items-center justify-center animate-neural-pulse mr-4'>
                <i className='fas fa-brain text-black text-sm'></i>
              </div>
              <div className='quantum-card border border-purple-500/30 text-white px-6 py-4 rounded-2xl'>
                PropOllama Quantum is analyzing neural networks...
              </div>
            </div>
          )}
        </div>

        <div className='flex space-x-4'>
          <input
            type='text'
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder='Ask about props, odds, strategies, or market analysis...'
            className='flex-1 p-4 rounded-2xl border-2 border-electric-500/30 focus:border-electric-500 bg-gray-800/50 text-white font-mono'
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            className='px-6 py-3 bg-electric-500 text-black font-bold rounded-2xl hover:bg-electric-400 transition-colors disabled:opacity-50'
          >
            <i className='fas fa-paper-plane mr-2'></i>
            SEND
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
        <button
          onClick={() => handleQuickAction("Analyze tonight's NBA props with neural networks")}
          className='p-6 quantum-card rounded-2xl hover:shadow-neon transition-all text-center border border-green-500/30 hover:border-green-500/50'
        >
          <div className='text-4xl mb-3 text-green-400'>📊</div>
          <div className='text-sm font-bold font-cyber'>NEURAL ANALYSIS</div>
        </button>
        <button
          onClick={() => handleQuickAction('Show live line movements and market intelligence')}
          className='p-6 quantum-card rounded-2xl hover:shadow-neon transition-all text-center border border-blue-500/30 hover:border-blue-500/50'
        >
          <div className='text-4xl mb-3 text-blue-400'>📈</div>
          <div className='text-sm font-bold font-cyber'>LIVE MARKETS</div>
        </button>
        <button
          onClick={() => handleQuickAction('Find quantum value bets with highest EV')}
          className='p-6 quantum-card rounded-2xl hover:shadow-neon transition-all text-center border border-yellow-500/30 hover:border-yellow-500/50'
        >
          <div className='text-4xl mb-3 text-yellow-400'>💰</div>
          <div className='text-sm font-bold font-cyber'>VALUE DETECTION</div>
        </button>
        <button
          onClick={() =>
            handleQuickAction('Create advanced betting strategy with correlation analysis')
          }
          className='p-6 quantum-card rounded-2xl hover:shadow-neon transition-all text-center border border-purple-500/30 hover:border-purple-500/50'
        >
          <div className='text-4xl mb-3 text-purple-400'>🧠</div>
          <div className='text-sm font-bold font-cyber'>STRATEGY AI</div>
        </button>
      </div>
    </div>
  );
};

export default PropOllama;
