
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TermsCheckboxProps {
  agreeToTerms: boolean;
  setAgreeToTerms: (agree: boolean) => void;
}

const TermsCheckbox = ({ agreeToTerms, setAgreeToTerms }: TermsCheckboxProps) => {
  return (
    <div className="flex items-top space-x-2 mb-5">
      <Checkbox 
        id="terms" 
        checked={agreeToTerms} 
        onCheckedChange={setAgreeToTerms}
        className="data-[state=checked]:bg-[#ff4747] data-[state=checked]:border-[#ff4747] mt-1"
      />
      <Label 
        htmlFor="terms" 
        className="text-xs text-gray-600 cursor-pointer"
      >
        By creating an account, you agree to our{' '}
        <a 
          href="/terms" 
          className="text-[#ff4747] hover:text-[#ff2727] hover:underline"
        >
          Terms of Service
        </a>{' '}
        and{' '}
        <a 
          href="/privacy" 
          className="text-[#ff4747] hover:text-[#ff2727] hover:underline"
        >
          Privacy Policy
        </a>
      </Label>
    </div>
  );
};

export default TermsCheckbox;
