
import React from 'react';
import { AcknowledgmentProps } from './types';

const Acknowledgment: React.FC<AcknowledgmentProps> = ({ 
  className = '',
  madeInText = "Made in Désarmes with",
  authorizedText = "Legalized and authorized by BRH",
  isExiting = false
}) => {
  return (
    <div 
      className={`absolute bottom-8 left-0 right-0 text-center text-white px-6 ${className}`}
      style={{
        animation: isExiting 
          ? 'text-ultra-fast-exit 0.7s cubic-bezier(0.755, 0.05, 0.855, 0.06) forwards'
          : 'text-physics-entry 1s ease-out 7s forwards',
        willChange: isExiting ? 'transform, opacity, filter' : 'auto'
      }}
      role="contentinfo"
      aria-label="Application credits"
    >
      <div style={{ opacity: isExiting ? 1 : 0 }}>
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
