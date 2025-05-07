
import React from 'react';
import { Shield } from 'lucide-react';

const SafetyNotice = () => {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-center">
      <div className="flex items-center justify-center mb-2">
        <Shield className="h-5 w-5 text-[#ff4747] mr-2" />
        <span className="text-sm font-medium">Secure Authentication</span>
      </div>
      <p className="text-xs text-gray-500">
        We prioritize your security and privacy. Your information is encrypted and never shared with third parties.
      </p>
    </div>
  );
};

export default SafetyNotice;
