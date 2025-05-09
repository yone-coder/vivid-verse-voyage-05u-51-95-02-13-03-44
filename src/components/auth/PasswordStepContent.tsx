
import React from 'react';
import PasswordField from './PasswordField';
import ConfirmPasswordField from './ConfirmPasswordField';
import TermsCheckbox from './TermsCheckbox';
import RememberMeToggle from './RememberMeToggle';
import { AlertCircle } from 'lucide-react';

interface PasswordStepContentProps {
  authMode: 'signin' | 'signup';
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  agreeToTerms: boolean;
  setAgreeToTerms: (agree: boolean) => void;
  rememberMe: boolean;
  setRememberMe: (remember: boolean) => void;
  handlePasswordReset: () => void;
}

const PasswordStepContent = ({
  authMode,
  password,
  setPassword,
  showPassword,
  toggleShowPassword,
  confirmPassword,
  setConfirmPassword,
  agreeToTerms,
  setAgreeToTerms,
  rememberMe,
  setRememberMe,
  handlePasswordReset
}: PasswordStepContentProps) => {
  // Validate form based on auth mode
  const hasPasswordError = authMode === 'signup' && password.length > 0 && password.length < 8;
  const hasConfirmPasswordError = authMode === 'signup' && confirmPassword.length > 0 && password !== confirmPassword;
  const hasTermsError = authMode === 'signup' && !agreeToTerms;
  
  return (
    <div className="w-full max-w-md mx-auto px-4 mb-6">
      <PasswordField
        id="password"
        label="Password"
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        toggleShowPassword={toggleShowPassword}
        hasConfirmation={authMode === 'signup'}
      />

      {hasPasswordError && (
        <div className="flex items-center gap-1.5 mt-1 mb-3 text-xs text-red-500">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>Password must be at least 8 characters long</span>
        </div>
      )}

      {authMode === 'signup' && (
        <>
          <ConfirmPasswordField
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            password={password}
            showPassword={showPassword}
          />
          
          <TermsCheckbox
            agreeToTerms={agreeToTerms}
            setAgreeToTerms={setAgreeToTerms}
          />

          {hasTermsError && (
            <div className="flex items-center gap-1.5 mt-1 mb-3 text-xs text-red-500">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>You must agree to the Terms of Service</span>
            </div>
          )}
        </>
      )}

      {authMode === 'signin' && (
        <div className="flex items-center justify-between mb-6">
          <RememberMeToggle
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
          />
          <div className="text-sm">
            <button 
              type="button"
              onClick={handlePasswordReset}
              className="font-medium text-[#ff4747] hover:text-[#ff2727] transition-colors cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordStepContent;
