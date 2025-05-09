
import React, { useState } from 'react';
import { Fingerprint, KeyRound, ShieldCheck } from 'lucide-react';

interface PasskeyTabProps {
  onSubmit?: (e: React.FormEvent) => void;
  showSubmitButton?: boolean;
}

const PasskeyTab = ({ onSubmit, showSubmitButton = false }: PasskeyTabProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      setIsLoading(true);
      // Simulate loading for demonstration
      setTimeout(() => {
        setIsLoading(false);
        onSubmit(e);
      }, 1000);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Centered message */}
      <div className="text-center mb-3">
        <p className="text-sm text-muted-foreground">
          Please use a passkey to continue
        </p>
      </div>

      <div className="rounded-lg border border-[#eaeaea] bg-[#f9f9f9] p-4">
        <div className="flex flex-col items-center justify-center py-4">
          <div 
            className={`mb-4 bg-[#ffeae8] p-3 rounded-full transition-all duration-500 ${
              isHovered ? 'animate-pulse-glow' : ''
            }`}
          >
            <Fingerprint className={`h-6 w-6 text-[#ff4747] transition-transform duration-300 ${
              isHovered ? 'scale-110' : ''
            }`} />
          </div>
          <h3 className="font-medium text-base mb-1 text-center">Use a passkey</h3>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Sign in without a password using your biometrics or security key
          </p>
          
          <button
            type="button"
            onClick={handleSubmit}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={isLoading}
            className="bg-[#ff4747] hover:bg-[#ff2727] text-white font-medium py-2.5 px-4 rounded-lg transition-all flex items-center justify-center w-full relative overflow-hidden"
          >
            {isLoading ? (
              <>
                <span className="absolute inset-0 bg-black/10"></span>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <KeyRound className={`h-4 w-4 mr-2 transition-transform ${isHovered ? 'animate-subtle-pulse' : ''}`} />
                <span>Continue with Passkey</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Benefits */}
      <div className="mt-2 border-t border-[#eaeaea] pt-3">
        <h4 className="text-sm font-medium mb-2">Why use a passkey?</h4>
        <ul className="space-y-2">
          <li className="flex items-center text-sm text-muted-foreground">
            <div className="h-5 w-5 mr-2 flex items-center justify-center text-green-500">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <span>More secure than passwords</span>
          </li>
          <li className="flex items-center text-sm text-muted-foreground">
            <div className="h-5 w-5 mr-2 flex items-center justify-center text-green-500">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <span>Works across your devices</span>
          </li>
          <li className="flex items-center text-sm text-muted-foreground">
            <div className="h-5 w-5 mr-2 flex items-center justify-center text-green-500">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <span>Fast sign-in with biometrics</span>
          </li>
        </ul>
      </div>
      
      {/* Animation Styles */}
      <style>
        {`
        @keyframes subtlePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-subtle-pulse {
          animation: subtlePulse 1.5s infinite;
        }
        
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 rgba(255, 71, 71, 0.4); }
          50% { box-shadow: 0 0 10px rgba(255, 71, 71, 0.7); }
        }
        .animate-pulse-glow {
          animation: pulseGlow 1.5s infinite;
        }
      `}
      </style>
    </div>
  );
};

export default PasskeyTab;
