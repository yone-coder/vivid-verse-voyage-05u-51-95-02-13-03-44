
import React, { useEffect, useState, useCallback } from 'react';
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
    handlePasswordReset,
    handleGoBack,
    updateFormState
  } = useAuthForm();
  
  const { checkEmailExists, isCheckingEmail, emailVerified, setEmailVerified } = useEmailCheck();
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  // Track verification status separately for synchronization
  const [verificationAttempted, setVerificationAttempted] = useState(false);
  const [verificationInProgress, setVerificationInProgress] = useState(false);

  // Reset verification status when email/tab changes
  useEffect(() => {
    if (formState.activeTab === 'email') {
      setVerificationAttempted(false);
    }
  }, [formState.email, formState.activeTab]);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      // Use a timeout to prevent React state update loops
      setTimeout(() => {
        navigate('/for-you');
      }, 0);
    }
  }, [user, navigate]);

  // Sync verification status with emailVerified
  useEffect(() => {
    if (emailVerified !== null) {
      setVerificationInProgress(false);
      setVerificationAttempted(true);
    }
  }, [emailVerified]);

  // Wrapped email verification in useCallback to prevent recreation
  const verifyEmail = useCallback(async (email: string) => {
    if (!email || !email.includes('@') || !email.includes('.')) return;
    
    setVerificationInProgress(true);
    try {
      await checkEmailExists(email);
    } finally {
      setVerificationAttempted(true);
    }
  }, [checkEmailExists]);
  
  // Auto-verify email with improved debounce
  useEffect(() => {
    const { email, activeTab } = formState;
    
    if (activeTab === 'email' && email && email.includes('@') && email.includes('.')) {
      // Don't try to verify if already in progress or attempted
      if (verificationInProgress || verificationAttempted) return;
      
      const timer = setTimeout(() => {
        verifyEmail(email);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [formState.email, formState.activeTab, verificationInProgress, verificationAttempted, verifyEmail]);

  // Fixed: Determine auth mode based on verification result without causing infinite loops
  useEffect(() => {
    if (emailVerified === true && formState.authMode !== 'signin') {
      updateFormState({ authMode: 'signin' });
    } else if (emailVerified === false && formState.authMode !== 'signup') {
      updateFormState({ authMode: 'signup' });
    }
  }, [emailVerified, formState.authMode, updateFormState]);

  // Handle step 1 form submission (email/phone verification)
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { activeTab, email, phone } = formState;

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
      
      // Always verify email before proceeding, regardless of previous attempts
      setIsLoading(true);
      try {
        await verifyEmail(email);
        
        // Wait for verification to complete
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Check verification result
        if (emailVerified === false) {
          setIsLoading(false);
          toast.info("No account found with this email. Redirecting to signup...");
          setTimeout(() => {
            navigate('/signup');
          }, 1500);
          return; // Exit early, don't proceed to step 2
        }

        if (emailVerified !== true) {
          setIsLoading(false);
          toast.error("Unable to verify email. Please try again.");
          return;
        }
        
        // Only proceed if email exists
        console.log("Email verified successfully, proceeding to step 2");
        
      } catch (error) {
        setIsLoading(false);
        toast.error("Email verification failed. Please try again.");
        return;
      }
    }

    // Validate phone field
    if (activeTab === 'phone' && !phone) {
      toast.error("Please enter your phone number.");
      setIsLoading(false);
      return;
    }

    // Clear any error message when proceeding
    setErrorMessage(null);

    // Proceed to step 2 only if all validations pass
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

  // Determine the title based on email verification
  const getAuthTitle = () => {
    if (emailVerified === true) {
      return "Welcome back";
    } else if (emailVerified === false) {
      return "Create your account";
    }
    return "Continue to Mima";
  };

  // Determine subtitle based on email verification
  const getAuthSubtitle = () => {
    if (emailVerified === true) {
      return "Enter your password to sign in";
    } else if (emailVerified === false) {
      return "Set up your new account";
    }
    return "Enter your email or phone number";
  };

  return (
    <AuthContainer isOverlay={isOverlay} onClose={onClose}>
      <AuthHeader
        title={getAuthTitle()}
        subtitle={getAuthSubtitle()}
      />

      <form onSubmit={formState.step === 1 ? handleStep1Submit : handleStep2Submit} className="w-full">
        {formState.step === 1 ? (
          <StepOneContent
            formState={formState}
            setActiveTab={setActiveTab}
            setEmail={setEmail}
            setPhone={setPhone}
            setCountryCode={setCountryCode}
            onSubmit={handleStep1Submit}
            handleSocialLogin={handleSocialLogin}
            isCheckingEmail={isCheckingEmail || verificationInProgress}
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
