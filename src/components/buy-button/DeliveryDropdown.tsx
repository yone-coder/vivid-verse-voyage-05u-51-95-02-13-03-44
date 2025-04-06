
import React from 'react';
import { Check } from 'lucide-react';

interface DeliveryDropdownProps {
  deliveryOptions: boolean;
  deliveryFeatures: Array<{ icon: React.ReactNode; text: string }>;
}

const DeliveryDropdown = ({ deliveryOptions, deliveryFeatures }: DeliveryDropdownProps) => {
  if (!deliveryOptions) return null;
  
  return (
    <div 
      className="absolute bottom-full mb-1 left-20 bg-white shadow-xl rounded-lg overflow-hidden w-40 z-10"
      style={{ animation: 'slideDown 0.2s ease-out' }}
    >
      {deliveryFeatures.map((option, index) => (
        <div 
          key={index}
          className="px-2 py-1.5 hover:bg-gray-100 cursor-pointer flex items-center space-x-2 transition-all duration-200 hover:translate-x-1"
        >
          <div className={`${index === 0 ? '' : 'animate-pulse'}`}>
            {option.icon}
          </div>
          <span className="text-xs">{option.text}</span>
          {index === 0 && <Check size={12} className="ml-auto text-green-500" />}
          {index === 1 && <span className="text-xs text-orange-500 ml-auto animate-pulse">+$4.99</span>}
        </div>
      ))}
    </div>
  );
};

export default DeliveryDropdown;
