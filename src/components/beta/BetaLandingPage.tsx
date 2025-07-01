import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface BetaSignupData {
  email: string;
  name: string;
  experience: string;
  interests: string[];
}

const BetaLandingPage: React.FC = () => {
  const [signupData, setSignupData] = useState<BetaSignupData>({
    email: '',
    name: '',
    experience: '',
    interests: []
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInterestToggle = (interest: string) => {
    setSignupData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to A1Betting Beta!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for joining our beta program. You'll receive an invitation email within 24 hours 
            with your access credentials and onboarding guide.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">What's Next?</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>✅ Check your email for beta access</li>
              <li>✅ Complete the guided platform tour</li>
              <li>✅ Start exploring predictions and arbitrage</li>
              <li>✅ Provide feedback to help us improve</li>
            </ul>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Go to Platform
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            A1Betting
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-200">
            Professional Sports Intelligence Platform
          </p>
          <div className="inline-block bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold mb-8">
            🚀 BETA LAUNCH - Limited Access
          </div>
        </motion.div>

        {/* Feature Showcase */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
          >
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-white mb-3">AI-Powered Predictions</h3>
            <p className="text-blue-200">
              Advanced machine learning models analyze thousands of data points to generate 
              high-confidence predictions with full explainability.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
          >
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-white mb-3">Real-Time Arbitrage</h3>
            <p className="text-blue-200">
              Scan multiple sportsbooks simultaneously to identify guaranteed profit 
              opportunities with risk assessment and optimal stake calculations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
          >
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-white mb-3">Advanced Analytics</h3>
            <p className="text-blue-200">
              Interactive SHAP explanations, feature importance analysis, and 
              comprehensive performance tracking for informed decision-making.
            </p>
          </motion.div>
        </div>

        {/* Beta Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Join the Beta Program
            </h2>
            <p className="text-blue-200 text-center mb-8">
              Be among the first 50 users to experience the future of sports betting intelligence.
            </p>

            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={signupData.name}
                  onChange={(e) => setSignupData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={signupData.email}
                  onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Betting Experience</label>
                <select
                  required
                  value={signupData.experience}
                  onChange={(e) => setSignupData(prev => ({ ...prev, experience: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select your experience level</option>
                  <option value="beginner">Beginner (0-1 years)</option>
                  <option value="intermediate">Intermediate (1-3 years)</option>
                  <option value="advanced">Advanced (3-5 years)</option>
                  <option value="professional">Professional (5+ years)</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-3">Areas of Interest</label>
                <div className="grid grid-cols-2 gap-3">
                  {['NFL', 'NBA', 'MLB', 'NHL', 'Soccer', 'Tennis', 'Arbitrage', 'Live Betting'].map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        signupData.interests.includes(interest)
                          ? 'bg-blue-500 border-blue-400 text-white'
                          : 'bg-white/20 border-white/30 text-blue-200 hover:bg-white/30'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Processing...
                  </div>
                ) : (
                  'Join Beta Program'
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-blue-200 text-sm">
                By joining, you agree to provide feedback and help us improve the platform. 
                Beta access is limited and subject to approval.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-white">
              <div className="text-3xl font-bold text-blue-400">92%</div>
              <div className="text-blue-200">Arbitrage Detection Rate</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold text-purple-400">76%</div>
              <div className="text-blue-200">Average Prediction Accuracy</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold text-green-400">15%</div>
              <div className="text-blue-200">Average Monthly ROI</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BetaLandingPage; 