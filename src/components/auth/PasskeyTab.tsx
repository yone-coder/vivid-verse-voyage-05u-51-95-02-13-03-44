
import React from 'react';
import { KeyRound } from 'lucide-react';

interface PasskeyTabProps {
  onSubmit?: (e: React.FormEvent) => void;
}

const PasskeyTab = ({ onSubmit }: PasskeyTabProps) => {
  return (
    <div className="text-center py-3">
      <KeyRound className="h-10 w-10 mx-auto mb-2 text-gray-400" />
      <p className="text-xs text-gray-600">Use a security key or biometric authentication</p>
      {onSubmit && (
        <button 
          type="button" 
          onClick={(e) => onSubmit(e)} 
          className="mt-3 px-5 py-1.5 bg-[#ff4747] text-white rounded-md text-xs font-medium hover:bg-[#ff2727] transition-colors"
        >
          Continue with Passkey
        </button>
      )}
    </div>
  );
};

export default PasskeyTab;
