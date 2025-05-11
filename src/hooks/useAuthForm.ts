
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export interface AuthFormState {
  email: string;
  phone: string;
  countryCode: string;
  password: string;
  confirmPassword: string;
  activeTab: string;
  step: number;
  isLoading: boolean;
  showPassword: boolean;
  agreeToTerms: boolean;
  rememberMe: boolean;
  authMode: 'signin' | 'signup';
  authSuccess: boolean;
  emailExists: boolean | null;
  errorMessage: string | null;
}

export const useAuthForm = () => {
  const [formState, setFormState] = useState<AuthFormState>({
    email: '',
    phone: '',
    countryCode: '+1',
    password: '',
    confirmPassword: '',
    activeTab: 'email',
    step: 1,
    isLoading: false,
    showPassword: false,
    agreeToTerms: false,
    rememberMe: false,
    authMode: 'signin',
    authSuccess: false,
    emailExists: null,
    errorMessage: null
  });

  const updateFormState = (updates: Partial<AuthFormState>) => {
    setFormState(prev => ({ ...prev, ...updates }));
  };

  const setActiveTab = (tab: string) => updateFormState({ activeTab: tab });
  const setEmail = (email: string) => updateFormState({ email });
  const setPhone = (phone: string) => updateFormState({ phone });
  const setCountryCode = (countryCode: string) => updateFormState({ countryCode });
  const setPassword = (password: string) => updateFormState({ password });
  const setConfirmPassword = (confirmPassword: string) => updateFormState({ confirmPassword });
  const setStep = (step: number) => updateFormState({ step });
  const setIsLoading = (isLoading: boolean) => updateFormState({ isLoading });
  const setShowPassword = (showPassword: boolean) => updateFormState({ showPassword });
  const setAgreeToTerms = (agreeToTerms: boolean) => updateFormState({ agreeToTerms });
  const setRememberMe = (rememberMe: boolean) => updateFormState({ rememberMe });
  const setAuthMode = (authMode: 'signin' | 'signup') => updateFormState({ authMode });
  const setAuthSuccess = (authSuccess: boolean) => updateFormState({ authSuccess });
  const setEmailExists = (emailExists: boolean | null) => updateFormState({ emailExists });
  const setErrorMessage = (errorMessage: string | null) => updateFormState({ errorMessage });

  const toggleShowPassword = () => setShowPassword(!formState.showPassword);

  const handlePasswordReset = () => {
    const { email } = formState;
    
    if (!email) {
      toast.error("Please enter your email address first.");
      setStep(1);
      return;
    }
    
    setIsLoading(true);
    
    supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    }).then(({ error }) => {
      setIsLoading(false);
      if (error) {
        console.error("Password reset error:", error);
        toast.error("Failed to send password reset link. Please try again.");
      } else {
        toast.success("Password reset link sent to your email.");
      }
    });
  };

  const handleGoBack = () => {
    setErrorMessage(null);
    if (formState.step > 1) {
      setStep(formState.step - 1);
    }
  };

  return {
    formState,
    updateFormState,
    setActiveTab,
    setEmail,
    setPhone,
    setCountryCode,
    setPassword,
    setConfirmPassword,
    setStep,
    setIsLoading,
    setShowPassword,
    setAgreeToTerms,
    setRememberMe,
    setAuthMode,
    setAuthSuccess,
    setEmailExists,
    setErrorMessage,
    toggleShowPassword,
    handlePasswordReset,
    handleGoBack
  };
};
