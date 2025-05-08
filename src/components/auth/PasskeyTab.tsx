
import React from 'react';
import { Key } from 'lucide-react';

interface PasskeyTabProps {
  onSubmit?: (e: React.FormEvent) => void;
  showSubmitButton?: boolean;
}

const PasskeyTab = ({ onSubmit, showSubmitButton = false }: PasskeyTabProps) => {
  return (
    <div className="text-center py-6">
      <div className="bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
        <Key className="h-8 w-8 text-[#ff4747]" />
      </div>
      <h3 className="text-lg font-medium mb-2">Sign in with passkey</h3>
      <p className="text-sm text-gray-600 mb-4">
        Use your device's biometric authentication or PIN
      </p>
      
      {showSubmitButton && onSubmit && (
        <button 
          type="button"
          onClick={(e) => onSubmit(e)}
          className="w-full flex items-center justify-center bg-[#ff4747] text-white font-medium py-3 px-4 rounded-md hover:bg-[#ff2727] transition-all focus:outline-none focus:ring-2 focus:ring-[#ff4747] focus:ring-offset-2"
        >
          Continue with Passkey
        </button>
      )}
    </div>
  );
};

export default PasskeyTab;
