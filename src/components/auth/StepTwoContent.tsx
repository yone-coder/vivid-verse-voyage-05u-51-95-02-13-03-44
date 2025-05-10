
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/auth/BackButton';
import PasswordStepContent from '@/components/auth/PasswordStepContent';
import SubmitButton from '@/components/auth/SubmitButton';
import { AuthFormState } from '@/hooks/useAuthForm';

interface StepTwoContentProps {
  formState: AuthFormState;
  setPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  setAgreeToTerms: (agree: boolean) => void;
  setRememberMe: (remember: boolean) => void;
  toggleShowPassword: () => void;
  toggleAuthMode: () => void;
  handleGoBack: () => void;
  handlePasswordReset: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const StepTwoContent: React.FC<StepTwoContentProps> = ({
  formState,
  setPassword,
  setConfirmPassword,
  setAgreeToTerms,
  setRememberMe,
  toggleShowPassword,
  toggleAuthMode,
  handleGoBack,
  handlePasswordReset,
  onSubmit
}) => {
  const { 
    activeTab, email, phone, countryCode, password, confirmPassword, 
    showPassword, agreeToTerms, rememberMe, authMode, isLoading, authSuccess 
  } = formState;
  
  const navigate = useNavigate();

  // Handle switch to other authentication page
  const handleAuthModeSwitch = () => {
    if (authMode === 'signin') {
      navigate('/signup');
    } else {
      navigate('/auth');
    }
  };
  
  return (
    <div className="w-full mb-4 space-y-3">
      <BackButton onClick={handleGoBack} />

      <div className="mb-4 text-center">
        <h3 className="text-lg font-semibold mb-1">
          {activeTab === 'email' ? email : `${countryCode} ${phone}`}
        </h3>
        <p className="text-sm text-gray-600">
          Enter your password to continue
        </p>
      </div>

      <PasswordStepContent 
        authMode={authMode}
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        toggleShowPassword={toggleShowPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        agreeToTerms={agreeToTerms}
        setAgreeToTerms={setAgreeToTerms}
        rememberMe={rememberMe}
        setRememberMe={setRememberMe}
        handlePasswordReset={handlePasswordReset}
      />

      <SubmitButton 
        isLoading={isLoading} 
        label={authMode === 'signin' ? "Sign in" : "Create account"}
        loadingText={authMode === 'signin' ? "Signing in..." : "Creating account..."}
        showSuccess={authSuccess}
        successText="Success!"
      />

      <div className="text-center mt-4 flex items-center justify-center space-x-2">
        <span className="text-sm text-gray-600">
          {authMode === 'signin' ? "Don't have an account?" : "Already have an account?"}
        </span>
        <button 
          type="button" 
          onClick={handleAuthModeSwitch}
          className="text-sm font-medium text-[#ff4747] hover:text-[#ff2727] hover:underline"
        >
          {authMode === 'signin' ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default StepTwoContent;
