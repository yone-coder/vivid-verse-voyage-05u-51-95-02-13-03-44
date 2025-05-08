
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface VerificationStepProps {
  onBack: () => void;
  method: string;
  value: string;
  isSignUp: boolean;
}

const VerificationStep = ({ onBack, method, value, isSignUp }: VerificationStepProps) => {
  const [verificationCode, setVerificationCode] = useState('');

  return (
    <div className="space-y-4">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        <span>Back</span>
      </button>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Verification Required</h3>
        <p className="text-sm text-gray-600">
          We've sent a verification code to{' '}
          <span className="font-medium">{value}</span>
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
            Enter verification code
          </label>
          <Input
            id="code"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter code"
            className="w-full"
          />
        </div>
        
        <Button type="submit" className="w-full bg-[#ff4747] hover:bg-[#ff2727] text-white">
          Verify & Continue
        </Button>
      </div>
    </div>
  );
};

export default VerificationStep;
