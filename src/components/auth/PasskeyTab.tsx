
import React from 'react';
import { Fingerprint, KeyRound, ShieldCheck } from 'lucide-react';

interface PasskeyTabProps {
  onSubmit?: (e: React.FormEvent) => void;
  showSubmitButton?: boolean;
}

const PasskeyTab = ({ onSubmit, showSubmitButton = false }: PasskeyTabProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
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
          <div className="mb-4 bg-[#ffeae8] p-3 rounded-full">
            <Fingerprint className="h-6 w-6 text-[#ff4747]" />
          </div>
          <h3 className="font-medium text-base mb-1 text-center">Use a passkey</h3>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Sign in without a password using your biometrics or security key
          </p>
          
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-[#ff4747] hover:bg-[#ff2727] text-white font-medium py-2.5 px-4 rounded-lg transition-all flex items-center justify-center w-full"
          >
            <KeyRound className="h-4 w-4 mr-2" />
            <span>Continue with Passkey</span>
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
    </div>
  );
};

export default PasskeyTab;
