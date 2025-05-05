
import React from 'react';
import { AlertCircle } from 'lucide-react';

const SafetyNotice = () => {
  return (
    <div className="p-4 bg-[#f9f9f9] flex items-start border-t border-[#eaeaea] max-w-4xl mx-auto w-full">
      <AlertCircle className="h-5 w-5 text-[#ff4747] mt-0.5 mr-3 flex-shrink-0" />
      <p className="text-xs text-gray-700">
        For account security, never share your password or verification codes. Our representatives will never ask for this information.
      </p>
    </div>
  );
};

export default SafetyNotice;
