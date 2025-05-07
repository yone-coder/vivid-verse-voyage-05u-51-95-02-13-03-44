
import React from 'react';
import { KeyRound } from 'lucide-react';

const PasskeyTab = () => {
  return (
    <div className="text-center py-3">
      <KeyRound className="h-10 w-10 mx-auto mb-2 text-gray-400" />
      <p className="text-xs text-gray-600">Use a security key or biometric authentication</p>
      <button className="mt-3 px-5 py-1.5 bg-gray-100 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors">
        Continue with Passkey
      </button>
    </div>
  );
};

export default PasskeyTab;
