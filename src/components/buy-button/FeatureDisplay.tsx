
import React from 'react';

interface FeatureDisplayProps {
  features: Array<{ icon: React.ReactNode; text: string }>;
  activeFeature: number;
  rotateIcons: boolean;
  totalPrice: string;
  animatePrice: boolean;
}

const FeatureDisplay = ({
  features,
  activeFeature,
  rotateIcons,
  totalPrice,
  animatePrice
}: FeatureDisplayProps) => {
  return (
    <div className="flex items-center mt-0.5 mb-0.5 justify-between">
      <div className="flex items-center text-xs text-gray-600">
        <div className={`${rotateIcons ? 'animate-spin' : ''}`}>
          {features[activeFeature].icon}
        </div>
        <span className="ml-1 text-[10px]">{features[activeFeature].text}</span>
      </div>
      
      <div className={`text-xs font-semibold text-red-500 mx-2 ${animatePrice ? 'animate-pulse' : ''}`}>
        Total: ${totalPrice}
      </div>
    </div>
  );
};

export default FeatureDisplay;
