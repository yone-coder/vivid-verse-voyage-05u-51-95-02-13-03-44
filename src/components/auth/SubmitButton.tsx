
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  isLoading: boolean;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const SubmitButton = ({ isLoading, label, onClick, disabled = false }: SubmitButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Button
      type="submit"
      onClick={onClick}
      disabled={disabled || isLoading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      className={`
        w-full flex items-center justify-center 
        bg-[#ff4747] hover:bg-[#ff2727] text-white font-medium 
        py-3 px-4 rounded-lg transition-all duration-300 
        relative overflow-hidden h-12 
        shadow-sm hover:shadow-md 
        focus:ring-2 focus:ring-offset-1 focus:ring-[#ff4747]/50 dark:focus:ring-offset-gray-900 
        group ${isPressed ? 'transform scale-[0.98]' : ''}
        ${disabled || isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
      `}
      aria-label={isLoading ? "Loading..." : label}
    >
      {isLoading ? (
        <>
          {/* Loading animation background */}
          <span className="absolute inset-0 bg-black/5 animate-pulse-subtle"></span>
          
          {/* Loading spinner with pulse effect */}
          <div className="animate-pulse-fade">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        </>
      ) : (
        <span className="flex items-center gap-2 relative z-10">
          {label}
          <ArrowRight className={`h-4 w-4 transition-transform duration-300 
            ${isHovered ? 'translate-x-1' : ''}`} 
          />
        </span>
      )}
      
      {/* Ripple effect on button - visible when not loading */}
      {!isLoading && (
        <span className="absolute inset-0 overflow-hidden rounded-lg">
          <span className={`absolute inset-0 -translate-x-full ${
            isHovered ? 'animate-ripple' : ''
          } bg-white/20 rounded-lg`}></span>
        </span>
      )}

      {/* Pulsing glow effect on hover */}
      {isHovered && !isLoading && (
        <span className="absolute inset-0 -z-10 animate-glow rounded-lg"></span>
      )}
      
      {/* Animation styles */}
      <style>
        {`
        @keyframes ripple {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
        .animate-ripple {
          animation: ripple 1s linear;
        }
        
        @keyframes pulseFade {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-fade {
          animation: pulseFade 1.5s infinite ease-in-out;
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 4px 2px rgba(255, 71, 71, 0.3); }
          50% { box-shadow: 0 0 8px 4px rgba(255, 71, 71, 0.5); }
        }
        .animate-glow {
          animation: glow 1.5s infinite ease-in-out;
        }
        
        @keyframes pulseSubtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
        .animate-pulse-subtle {
          animation: pulseSubtle 1.5s infinite ease-in-out;
        }
      `}
      </style>
    </Button>
  );
};

export default SubmitButton;
