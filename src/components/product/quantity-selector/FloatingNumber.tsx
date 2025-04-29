
import React from 'react';

interface FloatingNumberProps {
  show: boolean;
  value: string;
}

const FloatingNumber: React.FC<FloatingNumberProps> = ({ show, value }) => {
  if (!show) return null;
  
  return (
    <div 
      className="absolute text-orange-500 font-bold text-xl"
      style={{ 
        left: '50%', 
        top: '-20px',
        animation: 'float-up 1s ease-out forwards',
        opacity: 1,
        transform: 'translateX(-50%)'
      }}
    >
      {value}
    </div>
  );
};

export default FloatingNumber;
