
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  isLoading: boolean;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const SubmitButton = ({ isLoading, label, onClick, disabled = false }: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full flex items-center justify-center bg-[#ff4747] hover:bg-[#ff2727] text-white font-medium py-3 px-4 rounded-lg transition-all relative overflow-hidden h-12 shadow-sm hover:shadow-md focus:ring-2 focus:ring-offset-1 focus:ring-[#ff4747]/50 dark:focus:ring-offset-gray-900 group"
    >
      {isLoading ? (
        <>
          {/* Loading animation background */}
          <span className="absolute inset-0 bg-black/5"></span>
          
          {/* Loading spinner with pulse effect */}
          <div className="animate-pulse-fade">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        </>
      ) : (
        <span className="flex items-center gap-2">
          {label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      )}
      
      {/* Ripple effect on button - visible when not loading */}
      {!isLoading && (
        <span className="absolute inset-0 overflow-hidden rounded-lg">
          <span className="absolute inset-0 -translate-x-full hover:animate-ripple bg-white/20"></span>
        </span>
      )}
      
      {/* Animation styles */}
      <style jsx>{`
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
      `}</style>
    </Button>
  );
};

export default SubmitButton;
