
import React from 'react';

interface TermsCheckboxProps {
  agreeToTerms: boolean;
  setAgreeToTerms: (agree: boolean) => void;
}

const TermsCheckbox = ({ agreeToTerms, setAgreeToTerms }: TermsCheckboxProps) => {
  return (
    <div className="flex items-center mb-4">
      <input
        id="terms"
        type="checkbox"
        checked={agreeToTerms}
        onChange={() => setAgreeToTerms(!agreeToTerms)}
        className="h-4 w-4 text-[#ff4747] rounded border-gray-300 focus:ring-[#ff4747]"
        required
      />
      <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
        I agree to the <a href="#" className="text-[#ff4747] hover:underline">Terms of Service</a> and <a href="#" className="text-[#ff4747] hover:underline">Privacy Policy</a>
      </label>
    </div>
  );
};

export default TermsCheckbox;
