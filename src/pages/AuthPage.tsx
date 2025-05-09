
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowRight, AlertTriangle } from 'lucide-react';

import AuthContainer from '@/components/auth/AuthContainer';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthSocialButtons from '@/components/auth/AuthSocialButtons';
import AuthTabs from '@/components/auth/AuthTabs';
import AuthFooter from '@/components/auth/AuthFooter';
import PasswordStepContent from '@/components/auth/PasswordStepContent';
import SubmitButton from '@/components/auth/SubmitButton';
import BackButton from '@/components/auth/BackButton';
import { supabase } from '@/integrations/supabase/client';

interface AuthPageProps {
  isOverlay?: boolean;
  onClose?: () => void;
}

const AuthPage = ({ isOverlay = false, onClose }: AuthPageProps) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authSuccess, setAuthSuccess] = useState(false);

  const [activeTab, setActiveTab] = useState('email');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [emailExists, setEmailExists] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/for-you');
    }
  }, [user, navigate]);

  // Simplified function signature with explicit return type
  const checkEmailExists = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      console.log("Checking if email exists:", email);
      
      // Try using OTP method to check if email exists
      try {
        const { data, error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            shouldCreateUser: false,
          }
        });
        
        if (!error) {
          console.log("Email exists (OTP method):", email);
          setIsLoading(false);
          return true;
        }

        if (error && error.message && error.message.includes("Email not confirmed")) {
          console.log("Email exists but not confirmed:", email);
          setIsLoading(false);
          return true;
        }

        console.log("OTP check error:", error);
      } catch (err) {
        console.error("OTP check error:", err);
      }
      
      // Check profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .maybeSingle();
      
      if (error) {
        console.error("Database query error:", error);
        
        // Check if profiles table exists by doing a sample query
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .limit(1);
          
        if (profileError) {
          console.error("Profile table query error:", profileError);
          // Continue to next method
        } else if (profileData) {
          // Table exists but email wasn't found
          setIsLoading(false);
          return false;
        }
      } else {
        // If we got data back, the email exists
        const exists = !!data;
        console.log("Email lookup result:", data, "Exists:", exists);
        setIsLoading(false);
        return exists;
      }
      
      // Final fallback: try auth API directly with invalid password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: "check_if_email_exists_" + Math.random().toString(36)
      });
      
      // If error includes "Invalid login credentials", the email likely exists
      if (signInError && signInError.message.includes("Invalid login credentials")) {
        console.log("Fallback detection - email exists:", email);
        setIsLoading(false);
        return true;
      } else if (signInError && signInError.message.includes("Email not confirmed")) {
        console.log("Email exists but not confirmed:", email);
        setIsLoading(false);
        return true;
      }
      
      console.log("Email doesn't exist:", email);
      setIsLoading(false);
      return false;
      
    } catch (error) {
      console.error("Error checking email:", error);
      setIsLoading(false);
      return false;
    }
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      
      // Only check if email exists when in signin mode
      if (authMode === 'signin') {
        setIsLoading(true);
        const exists = await checkEmailExists(email);
        if (!exists) {
          setErrorMessage("This email is not registered");
          toast.error("This email is not registered. Please sign up first.");
          setIsLoading(false);
          return;
        }
        setEmailExists(true);
      }
    }

    if (activeTab === 'phone' && !phone) {
      toast.error("Please enter your phone number.");
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 800);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    setIsLoading(true);
    setAuthSuccess(false); // Reset success state before attempting auth

    try {
      if (authMode === 'signup') {
        await signUp(email, password);
        setAuthSuccess(true); // Only set success if no error was thrown
      } else {
        // For signin
        await signIn(email, password, rememberMe);
        setAuthSuccess(true); // Only set success if no error was thrown
        // If successful, user will be redirected by the context effect
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error(authMode === 'signin' 
        ? "Login failed. Please check your credentials and try again." 
        : "Signup failed. Please try again.");
      setAuthSuccess(false); // Ensure success state is false on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    setErrorMessage(null);
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePasswordReset = () => {
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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage(null);
    setAuthSuccess(false); // Reset success state when toggling auth mode
  };

  return (
    <AuthContainer isOverlay={isOverlay} onClose={onClose}>
      <AuthHeader
        title={authMode === 'signin' ? "Log in to Mima" : "Sign up for Mima"}
        subtitle={authMode === 'signin' ? "Welcome back! Please log in to your account." : "Join us today! Create your account to get started."}
      />

      <form onSubmit={step === 1 ? handleStep1Submit : handleStep2Submit} className="w-full">
        {step === 1 && (
          <div className="w-full mb-4 space-y-3">
            <AuthSocialButtons handleSocialLogin={(provider) => toast.info(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login is not configured yet`)} />

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
              onSubmit={handleStep1Submit}
              step={step}
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
        )}

        {step === 2 && (
          <div className="w-full mb-4 space-y-3">
            <BackButton onClick={handleGoBack} />

            <div className="mb-4">
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
                onClick={toggleAuthMode}
                className="text-sm font-medium text-[#ff4747] hover:text-[#ff2727] hover:underline"
              >
                {authMode === 'signin' ? "Sign up" : "Sign in"}
              </button>
            </div>
          </div>
        )}
      </form>

      <AuthFooter />
    </AuthContainer>
  );
};

export default AuthPage;
