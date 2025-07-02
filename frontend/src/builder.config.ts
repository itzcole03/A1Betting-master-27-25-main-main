import { builder } from '@builder.io/react';

// Initialize Builder.io with your API key
builder.init('YOUR_BUILDER_API_KEY'); // Replace with your actual Builder.io API key

// Register your A1Betting components with Builder.io
export const builderConfig = {
  // Your app's base URL for Builder.io to load
  apiKey: 'YOUR_BUILDER_API_KEY',
  
  // Local development URL
  previewUrl: 'http://localhost:4000',
  
  // Production URL (when deployed)
  // previewUrl: 'https://your-domain.com',
  
  // Custom components that Builder.io can use
  customComponents: [
    {
      name: 'A1BettingPlatform',
      component: () => import('../components/QuantumSportsPlatform'),
      inputs: [
        {
          name: 'theme',
          type: 'string',
          defaultValue: 'quantum-dark',
          enum: ['quantum-dark', 'neural-purple', 'cyber-blue', 'quantum-light']
        }
      ]
    },
    {
      name: 'MoneyMakerPro',
      component: () => import('../components/user-friendly/MoneyMakerPro'),
      inputs: []
    },
    {
      name: 'PrizePicksPro', 
      component: () => import('../components/user-friendly/PrizePicksPro'),
      inputs: []
    },
    {
      name: 'MLModelDashboard',
      component: () => import('../components/ml/MLModelDashboard'),
      inputs: []
    }
  ]
};

export default builderConfig;



