
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import AuthSocialButtons from '@/components/auth/AuthSocialButtons';
import AuthTabs from '@/components/auth/AuthTabs';
import TabDivider from '@/components/auth/TabDivider';
import SubmitButton from '@/components/auth/SubmitButton';
import { AuthFormState } from '@/hooks/useAuthForm';

interface StepOneContentProps {
  formState: AuthFormState;
  setActiveTab: (tab: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setCountryCode: (code: string) => void;
  toggleAuthMode: () => void;
  onSubmit: (e: React.FormEvent) => void;
  handleSocialLogin: (provider: string) => void;
}

const StepOneContent: React.FC<StepOneContentProps> = ({
  formState,
  setActiveTab,
  setEmail,
  setPhone,
  setCountryCode,
  toggleAuthMode,
  onSubmit,
  handleSocialLogin
}) => {
  const { 
    activeTab, email, phone, countryCode, authMode, isLoading, 
    authSuccess, errorMessage
  } = formState;
  
  return (
    <div className="w-full mb-4 space-y-3">
      <AuthSocialButtons handleSocialLogin={handleSocialLogin} />
      
      <TabDivider text="OR" />

      <AuthTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        countryCode={countryCode}
        setCountryCode={setCountryCode}
        isSignUp={authMode === 'signup'}
        onSubmit={onSubmit}
        step={1}
      />

      {errorMessage && (
        <div className="flex items-center gap-1.5 mt-1 ml-1 text-xs text-destructive">
          <AlertTriangle className="h-3 w-3" />
          <span>{errorMessage}</span>
        </div>
      )}

      <SubmitButton 
        isLoading={isLoading} 
        label="Continue" 
        loadingText={authMode === 'signin' ? "Verifying..." : "Checking..."}
        showSuccess={authSuccess}
        successText="Verified!"
      />

      <div className="text-center mt-4 flex items-center justify-center space-x-2">
        <span className="text-sm text-gray-600">
          {authMode === 'signin' ? "Don't have an account?" : "Already have an account?"}
        </span>
        <button 
          type="button" 
          onClick={toggleAuthMode}
          className="text-sm font-medium text-[#ff4747] hover:text-[#ff2727] hover:underline"
        >
          {authMode === 'signin' ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default StepOneContent;
