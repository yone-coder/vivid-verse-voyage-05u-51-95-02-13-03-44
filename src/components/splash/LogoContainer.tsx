
import React from 'react';
import { LogoContainerProps } from './types';

const LogoContainer: React.FC<LogoContainerProps> = ({ 
  className = '', 
  width = '300px', 
  height = '300px',
  children,
  isExiting = false
}) => {
  return (
    <div 
      className={`relative ${className}`}
      style={{
        animation: isExiting 
          ? 'container-ultra-fast-exit 1.1s cubic-bezier(0.895, 0.03, 0.685, 0.22) forwards'
          : undefined,
        willChange: isExiting ? 'transform, opacity, filter' : 'auto'
      }}
      role="img"
      aria-label="Application logo"
    >
      <svg 
        style={{ 
          width, 
          height,
          willChange: 'auto'
        }}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1024 1024"
        aria-hidden="true"
      >
        {children}
      </svg>
    </div>
  );
};

export default LogoContainer;
