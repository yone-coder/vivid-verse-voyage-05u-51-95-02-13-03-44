
import React from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

interface AuthFormProps {
  step: number;
  isSignUp: boolean;
  email: string;
  phone: string;
  countryCode: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
  agreeToTerms: boolean;
  showPassword: boolean;
  activeTab: string;
  setStep: (step: number) => void;
  setActiveTab: (tab: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setCountryCode: (code: string) => void;
  setFullName: (name: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  setRememberMe: (remember: boolean) => void;
  setAgreeToTerms: (agree: boolean) => void;
  setShowPassword: (show: boolean) => void;
  setIsSignUp: (isSignUp: boolean) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

const AuthForm = ({ 
  step, 
  isSignUp,
  email,
  phone,
  countryCode,
  fullName,
  password,
  confirmPassword,
  rememberMe,
  agreeToTerms,
  showPassword,
  activeTab, 
  setStep,
  setActiveTab,
  setEmail,
  setPhone,
  setCountryCode,
  setFullName,
  setPassword,
  setConfirmPassword,
  setRememberMe,
  setAgreeToTerms,
  setShowPassword,
  setIsSignUp,
  onSubmit
}: AuthFormProps) => {
  const goBack = () => setStep(1);
  
  // Only show signin/signup forms when we're in step 2 or a non-email tab is active
  const showAuthForms = step === 2 || activeTab !== 'email';

  return (
    <>
      {showAuthForms && (
        isSignUp ? (
          <SignUpForm
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            agreeToTerms={agreeToTerms}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            setAgreeToTerms={setAgreeToTerms}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            handleSubmit={onSubmit}
            goBack={goBack}
            step={step}
          />
        ) : (
          <SignInForm
            email={email}
            password={password}
            rememberMe={rememberMe}
            setPassword={setPassword}
            setRememberMe={setRememberMe}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            handleSubmit={onSubmit}
            goBack={goBack}
            step={step}
          />
        )
      )}

      {step === 1 && (
        <div className="relative transition-opacity duration-150 mt-4">
          <div className="flex items-center justify-center">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full"></div>
          </div>
          
          <div className="mt-4 text-center">
            <div className="inline-block relative">
              <span className="text-[#999] text-xs">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
              </span>{' '}
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setIsSignUp(!isSignUp);
                }}
                className="relative inline-block group ml-1"
              >
                <span className="text-[#ff4747] font-medium text-xs group-hover:text-[#ff2727] transition-colors">
                  {isSignUp ? "Log in" : "Sign up"}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff4747] group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthForm;
