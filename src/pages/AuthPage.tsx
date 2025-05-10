
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import AuthContainer from '@/components/auth/AuthContainer';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthFooter from '@/components/auth/AuthFooter';
import StepOneContent from '@/components/auth/StepOneContent';
import StepTwoContent from '@/components/auth/StepTwoContent';
import { useAuthForm } from '@/hooks/useAuthForm';
import { useEmailCheck } from '@/hooks/useEmailCheck';

interface AuthPageProps {
  isOverlay?: boolean;
  onClose?: () => void;
}

const AuthPage = ({ isOverlay = false, onClose }: AuthPageProps) => {
  // Extract form state and handlers to custom hook
  const {
    formState,
    setActiveTab,
    setEmail,
    setPhone,
    setCountryCode,
    setPassword,
    setConfirmPassword,
    setStep,
    setIsLoading,
    setAgreeToTerms,
    setRememberMe,
    setAuthSuccess,
    setErrorMessage,
    toggleShowPassword,
    toggleAuthMode,
    handlePasswordReset,
    handleGoBack
  } = useAuthForm();
  
  const { checkEmailExists, isCheckingEmail, emailVerified } = useEmailCheck();
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  // Track if email verification has been attempted
  const [verificationAttempted, setVerificationAttempted] = useState(false);

  useEffect(() => {
    // When email changes, reset verification attempted status
    setVerificationAttempted(false);
  }, [formState.email]);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      // Use a timeout to prevent React state update loops
      setTimeout(() => {
        navigate('/for-you');
      }, 0);
    }
  }, [user, navigate]);

  // Auto-verify email when it changes (debounced)
  useEffect(() => {
    const { email, activeTab } = formState;
    
    if (activeTab === 'email' && email && email.includes('@') && email.includes('.')) {
      const timer = setTimeout(() => {
        if (!verificationAttempted) {
          checkEmailExists(email);
          setVerificationAttempted(true);
        }
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [formState.email, formState.activeTab, checkEmailExists, verificationAttempted]);

  // Handle step 1 form submission (email/phone verification)
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { activeTab, email, phone, authMode } = formState;

    // Validate email field
    if (activeTab === 'email') {
      if (!email) {
        toast.error("Please enter your email address.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address.");
        return;
      }
      
      // Only check email existence for sign in if not already verified
      if (authMode === 'signin' && emailVerified === null) {
        setIsLoading(true);
        const exists = await checkEmailExists(email);
        setIsLoading(false);
        
        if (!exists) {
          setErrorMessage("This email is not registered");
          toast.error("This email is not registered. Please sign up first.");
          return;
        }
      }
    }

    // Validate phone field
    if (activeTab === 'phone' && !phone) {
      toast.error("Please enter your phone number.");
      return;
    }

    // Clear any error message when proceeding
    setErrorMessage(null);

    // Proceed to step 2
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 800);
  };

  // Handle step 2 form submission (password verification/signup)
  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { 
      password, confirmPassword, email, 
      authMode, agreeToTerms, rememberMe 
    } = formState;

    // Validate password fields
    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    if (authMode === 'signup' && password !== confirmPassword) {
      toast.error("Passwords don't match.");
      return;
    }

    if (authMode === 'signup' && password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    if (authMode === 'signup' && !agreeToTerms) {
      toast.error("You must agree to the Terms of Service.");
      return;
    }

    // Attempt authentication
    setIsLoading(true);
    setAuthSuccess(false);

    try {
      if (authMode === 'signup') {
        await signUp(email, password);
        setAuthSuccess(true);
      } else {
        // For signin
        await signIn(email, password, rememberMe);
        setAuthSuccess(true);
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error(authMode === 'signin' 
        ? "Login failed. Please check your credentials and try again." 
        : "Signup failed. Please try again.");
      setAuthSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle social login
  const handleSocialLogin = (provider: string) => {
    toast.info(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login is not configured yet`);
  };

  return (
    <AuthContainer isOverlay={isOverlay} onClose={onClose}>
      <AuthHeader
        title={formState.authMode === 'signin' ? "Log in to Mima" : "Sign up for Mima"}
        subtitle={formState.authMode === 'signin' 
          ? "Welcome back! Please log in to your account." 
          : "Join us today! Create your account to get started."}
      />

      <form onSubmit={formState.step === 1 ? handleStep1Submit : handleStep2Submit} className="w-full">
        {formState.step === 1 ? (
          <StepOneContent
            formState={formState}
            setActiveTab={setActiveTab}
            setEmail={setEmail}
            setPhone={setPhone}
            setCountryCode={setCountryCode}
            toggleAuthMode={toggleAuthMode}
            onSubmit={handleStep1Submit}
            handleSocialLogin={handleSocialLogin}
            isCheckingEmail={isCheckingEmail}
            emailVerified={emailVerified}
          />
        ) : (
          <StepTwoContent
            formState={formState}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            setAgreeToTerms={setAgreeToTerms}
            setRememberMe={setRememberMe}
            toggleShowPassword={toggleShowPassword}
            toggleAuthMode={toggleAuthMode}
            handleGoBack={handleGoBack}
            handlePasswordReset={handlePasswordReset}
            onSubmit={handleStep2Submit}
          />
        )}
      </form>

      <AuthFooter />
    </AuthContainer>
  );
};

export default AuthPage;
