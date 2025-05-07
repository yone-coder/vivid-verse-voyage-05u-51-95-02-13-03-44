
import React from 'react';
import { AlertCircle, Shield, Lock } from 'lucide-react';

const SafetyNotice = () => {
  return (
    <div className="p-4 bg-[#f9f9f9] flex items-start border border-[#eaeaea] rounded-md max-w-4xl mx-auto w-full mt-6">
      <div className="flex flex-col space-y-3 w-full">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-[#ff4747] mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-xs text-gray-700">
            For account security, never share your password or verification codes. Our representatives will never ask for this information.
          </p>
        </div>
        
        <div className="flex items-start">
          <Shield className="h-5 w-5 text-[#47a3ff] mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-xs text-gray-700">
            Your data is protected with industry-standard encryption and security measures.
          </p>
        </div>
        
        <div className="flex items-start">
          <Lock className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-xs text-gray-700">
            Enable two-factor authentication for additional security on your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SafetyNotice;
