
import React from 'react';

const FloatingNumberStyles: React.FC = () => {
  return (
    <style>
      {`
      @keyframes float-up {
        0% {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        100% {
          opacity: 0;
          transform: translateX(-50%) translateY(-30px);
        }
      }
      `}
    </style>
  );
};

export default FloatingNumberStyles;
