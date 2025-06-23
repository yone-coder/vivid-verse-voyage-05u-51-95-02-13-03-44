
import React from 'react';
import { AcknowledgmentProps } from './types';

const Acknowledgment: React.FC<AcknowledgmentProps> = ({ 
  className = '',
  madeInText = "Made in Désarmes with",
  authorizedText = "Legalized and authorized by BRH"
}) => {
  console.log('Acknowledgment component rendering');
  
  return (
    <>
      {/* Bottom center acknowledgment */}
      <div 
        className={`absolute bottom-8 left-0 right-0 text-center text-white px-6 splash-text-animate ${className}`}
        role="contentinfo"
        aria-label="Application credits"
      >
        <div className="animate-fadeIn" style={{ animationDelay: '2s', animationFillMode: 'forwards', opacity: 0 }}>
          <p className="text-sm opacity-90 mb-2">
            {madeInText} <span className="text-pink-200" role="img" aria-label="heart">❤️</span>
          </p>
          <p className="text-xs opacity-80">
            {authorizedText}
          </p>
        </div>
      </div>

      {/* Bottom left authorization - VISIBLE VERSION */}
      <div 
        className="absolute bottom-8 left-6 text-white z-50"
        role="contentinfo"
        aria-label="Authorization"
        style={{ 
          border: '2px solid yellow', // Debug border
          backgroundColor: 'rgba(255, 0, 0, 0.3)' // Debug background
        }}
      >
        <div className="animate-fadeIn flex flex-col items-start" style={{ animationDelay: '2s', animationFillMode: 'forwards', opacity: 0 }}>
          <p className="text-xs opacity-90 mb-2 font-medium">Autorisé par</p>
          <img 
            src="/images/brt-logo.png" 
            alt="BRT Logo" 
            className="h-8 w-auto filter brightness-0 invert"
            onLoad={() => console.log('BRT logo loaded successfully')}
            onError={(e) => {
              console.log('Logo failed to load:', e);
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Acknowledgment;
