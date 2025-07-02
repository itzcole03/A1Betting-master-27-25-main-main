import { BuilderComponent, builder } from '@builder.io/react';
import React from 'react';
import { useLocation } from 'react-router-dom';

// Import your main app component
import QuantumSportsPlatform from './QuantumSportsPlatform';

// Initialize Builder.io
builder.init('YOUR_BUILDER_API_KEY'); // Replace with your actual API key

interface BuilderIntegrationProps {
  model?: string;
  content?: any;
}

const BuilderIntegration: React.FC<BuilderIntegrationProps> = ({ 
  model = 'page', 
  content 
}) => {
  const location = useLocation();
  
  // If Builder.io content exists, render it
  if (content) {
    return (
      <div className="builder-wrapper">
        <BuilderComponent model={model} content={content} />
      </div>
    );
  }

  // Otherwise, render the default A1Betting platform
  return <QuantumSportsPlatform />;
};

export default BuilderIntegration; 