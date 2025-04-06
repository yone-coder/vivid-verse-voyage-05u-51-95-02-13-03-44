
import React from 'react';
import { TrendingUp } from 'lucide-react';

interface SocialProofProps {
  showSocialProof: boolean;
  currentSocialProofMessage: string;
  slideAnimations: {left: boolean, right: boolean, top: boolean, bottom: boolean};
  showPriceIncrease: boolean;
}

const SocialProof = ({ showSocialProof, currentSocialProofMessage, slideAnimations, showPriceIncrease }: SocialProofProps) => {
  return (
    <>
      <div 
        className={`absolute -top-10 left-4 bg-white shadow-lg rounded-lg px-2 py-1 flex items-center space-x-2 
                   transition-all duration-500 ${showSocialProof ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                   ${slideAnimations.left ? 'slide-left' : ''}
                   ${slideAnimations.right ? 'slide-right' : ''}
                   ${slideAnimations.top ? 'slide-top' : ''}
                   ${slideAnimations.bottom ? 'slide-bottom' : ''}`}
        style={{ animation: showSocialProof ? 'fadeIn 0.5s ease-out' : 'none' }}
      >
        <div className="flex -space-x-1 animate-pulse">
          <div className="w-4 h-4 rounded-full bg-gray-300 border-2 border-white animate-[pulse_1s_ease-in-out_infinite]"></div>
          <div className="w-4 h-4 rounded-full bg-gray-400 border-2 border-white animate-[bounce_1.5s_ease-in-out_infinite]"></div>
          <div className="w-4 h-4 rounded-full bg-gray-500 border-2 border-white animate-[ping_2s_ease-in-out_infinite]"></div>
        </div>
        <p className="text-xs font-medium text-gray-700">
          <span className="inline-flex items-center">
            <span className="animate-pulse text-red-500 mr-1">•</span>
            {currentSocialProofMessage}
          </span>
        </p>
      </div>
      
      {showPriceIncrease && (
        <div className="absolute -top-16 right-4 bg-amber-50 border border-amber-200 shadow-lg rounded-lg px-2 py-1 flex items-center space-x-2"
             style={{ animation: 'slideDown 0.3s ease-out, pulse 2s infinite' }}>
          <TrendingUp className="text-amber-500 animate-bounce" size={14} />
          <p className="text-xs font-medium text-amber-800 animate-pulse">
            Price increased due to high demand!
          </p>
        </div>
      )}
    </>
  );
};

export default SocialProof;
