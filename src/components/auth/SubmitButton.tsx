
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

interface SubmitButtonProps {
  isLoading: boolean;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  loadingText?: string;
  successText?: string;
  showSuccess?: boolean;
}

const SubmitButton = ({ 
  isLoading, 
  label, 
  onClick, 
  disabled = false,
  loadingText = "Processing...",
  successText = "Success!",
  showSuccess = false
}: SubmitButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [showSuccessState, setShowSuccessState] = useState(false);

  // Handle success state
  useEffect(() => {
    // Reset success state when loading starts
    if (isLoading) {
      setShowSuccessState(false);
      return;
    }
    
    // Only show success state if showSuccess is true and we're not loading
    if (showSuccess && !isLoading) {
      setShowSuccessState(true);
      
      // Reset success state after a delay
      const timeout = setTimeout(() => {
        setShowSuccessState(false);
      }, 2000);
      
      return () => clearTimeout(timeout);
    } else {
      setShowSuccessState(false);
    }
  }, [showSuccess, isLoading]);

  // Determine the button state labels and styles
  const getButtonLabel = () => {
    if (isLoading) {
      return loadingText;
    } else if (showSuccessState) {
      return successText;
    } else if (disabled) {
      return "Waiting for verification...";
    } else {
      return label;
    }
  };

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
        ${showSuccessState 
          ? 'bg-green-600 hover:bg-green-700' 
          : 'bg-[#ff4747] hover:bg-[#ff2727]'} 
        text-white font-medium 
        py-3 px-4 rounded-lg transition-all duration-300 
        relative overflow-hidden h-12 
        shadow-sm hover:shadow-md 
        focus:ring-2 focus:ring-offset-1 focus:ring-[#ff4747]/50 dark:focus:ring-offset-gray-900 
        group ${isPressed ? 'transform scale-[0.98]' : ''}
        ${disabled || isLoading ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer'}
      `}
      aria-label={getButtonLabel()}
    >
      {isLoading && (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>{loadingText}</span>
        </div>
      )}
      
      {showSuccessState && !isLoading && (
        <>
          {/* Success animation background */}
          <span className="absolute inset-0 bg-green-500/10"></span>
          
          {/* Success content */}
          <div className="flex items-center justify-center gap-2 animate-scale-in">
            <CheckCircle2 className="h-5 w-5" />
            <span>{successText}</span>
          </div>
        </>
      )}
      
      {!isLoading && !showSuccessState && (
        <span className="flex items-center gap-2 relative z-10">
          {disabled ? "Waiting for verification..." : label}
          <ArrowRight className={`h-4 w-4 transition-transform duration-300 
            ${isHovered && !disabled ? 'translate-x-1' : ''}`} 
          />
        </span>
      )}
      
      {/* Ripple effect on button - visible when not loading or disabled */}
      {!isLoading && !showSuccessState && !disabled && (
        <span className="absolute inset-0 overflow-hidden rounded-lg">
          <span className={`absolute inset-0 -translate-x-full ${
            isHovered ? 'animate-ripple' : ''
          } bg-white/20 rounded-lg`}></span>
        </span>
      )}

      {/* Pulsing glow effect on hover */}
      {isHovered && !isLoading && !showSuccessState && !disabled && (
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
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 4px 2px rgba(255, 71, 71, 0.3); }
          50% { box-shadow: 0 0 8px 4px rgba(255, 71, 71, 0.5); }
        }
        .animate-glow {
          animation: glow 1.5s infinite ease-in-out;
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
        `}
      </style>
    </Button>
  );
};

export default SubmitButton;
