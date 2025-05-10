
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
  isCheckingEmail?: boolean;
  emailVerified?: boolean | null;
}

const StepOneContent: React.FC<StepOneContentProps> = ({
  formState,
  setActiveTab,
  setEmail,
  setPhone,
  setCountryCode,
  toggleAuthMode,
  onSubmit,
  handleSocialLogin,
  isCheckingEmail = false,
  emailVerified = null
}) => {
  const { 
    activeTab, email, phone, countryCode, authMode, isLoading, 
    authSuccess, errorMessage
  } = formState;
  
  // Determine if the continue button should be disabled
  const isContinueDisabled = () => {
    if (activeTab === 'email') {
      // For email tab: disable if email is empty OR if we're checking email
      // But ENABLE if email is verified (regardless of whether checking is complete)
      if (email.trim().length === 0) return true;
      if (isCheckingEmail) return true;
      
      // Important: If emailVerified is explicitly true, enable the button
      if (emailVerified === true) return false;
      
      // If email verification is needed but not complete, disable button
      return emailVerified === null;
    } else if (activeTab === 'phone') {
      // For phone tab: disable if phone is empty
      return phone.trim().length === 0;
    } else if (activeTab === 'passkey') {
      // For passkey tab: enable the continue button (passkey logic is handled separately)
      return false;
    }
    return false;
  };

  // Make sure we display the proper button state based on verification
  const getButtonLabel = () => {
    if (isLoading) {
      return authMode === 'signin' ? "Verifying..." : "Checking...";
    }
    
    if (activeTab === 'email' && isCheckingEmail) {
      return "Verifying Email...";
    }
    
    return "Continue";
  };

  const getLoadingText = () => {
    if (activeTab === 'email' && isCheckingEmail) {
      return "Verifying Email...";
    }
    return authMode === 'signin' ? "Verifying..." : "Checking...";
  };
  
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
        isLoading={isLoading || isCheckingEmail} 
        label={getButtonLabel()}
        loadingText={getLoadingText()}
        showSuccess={authSuccess}
        successText="Verified!"
        disabled={isContinueDisabled()}
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
