
import React from 'react';
import { AcknowledgmentProps } from './types';

const Acknowledgment: React.FC<AcknowledgmentProps> = ({ 
  className = '',
  madeInText = "Made in Désarmes with",
  authorizedText = "Legalized and authorized by BRH"
}) => {
  return (
    <div 
      className={`absolute bottom-8 left-0 right-0 text-center text-white px-6 ${className}`}
      style={{
        animation: 'text-physics-entry 1s ease-out 7s forwards',
        willChange: 'auto'
      }}
      role="contentinfo"
      aria-label="Application credits"
    >
      <div style={{ opacity: 0 }}>
        <p className="text-sm opacity-90 mb-2">
          {madeInText} <span className="text-pink-200" role="img" aria-label="heart">❤️</span>
        </p>
        <p className="text-xs opacity-80">
          {authorizedText}
        </p>
      </div>
    </div>
  );
};

export default Acknowledgment;
