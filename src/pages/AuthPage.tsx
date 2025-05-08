import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';

import AuthContainer from '@/components/auth/AuthContainer';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthSocialButtons from '@/components/auth/AuthSocialButtons';
import AuthTabs from '@/components/auth/AuthTabs';
import AuthFooter from '@/components/auth/AuthFooter';
import TwoFactorAuth from '@/components/auth/TwoFactorAuth';
import PasswordStepContent from '@/components/auth/PasswordStepContent';
import SubmitButton from '@/components/auth/SubmitButton';
import BackButton from '@/components/auth/BackButton';

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
  const [twoFactorCode, setTwoFactorCode] = useState('');

  const [activeTab, setActiveTab] = useState('email');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const { user, signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/for-you');
    }
  }, [user, navigate]);

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
    }

    if (activeTab === 'phone' && !phone) {
      toast.error("Please enter your phone number.");
      return;
    }

    setStep(2);
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

    if (activeTab === 'email' || activeTab === 'phone') {
      setStep(3);
      toast.info(`Verification code sent to your ${activeTab === 'email' ? 'email' : 'phone'}`);
      return;
    }

    await handleFinalSubmit();
  };

  const handleFinalSubmit = async () => {
    setIsLoading(true);

    try {
      if (activeTab === 'email') {
        await signIn(email, password, rememberMe);
        toast.success("Login successful!");
      } else if (activeTab === 'phone') {
        toast.info("Phone authentication is not fully implemented yet.");
      } else if (activeTab === 'passkey') {
        toast.info("Passkey authentication is not fully implemented yet.");
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePasswordReset = () => {
    toast.info("Password reset functionality not implemented yet.");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <AuthContainer isOverlay={isOverlay} onClose={onClose}>
      <AuthHeader
        title={authMode === 'signin' ? "Log in to Mima" : "Sign up for Mima"}
        subtitle={authMode === 'signin' ? "Welcome back! Please log in to your account." : "Join us today! Create your account to get started."}
      />

      <form onSubmit={step === 1 ? handleStep1Submit : step === 2 ? handleStep2Submit : handleFinalSubmit} className="w-full">
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

            <SubmitButton 
              isLoading={isLoading} 
              label="Continue" 
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
              label={authMode === 'signin' ? "Continue" : "Create account"} 
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

        {step === 3 && (
          <div className="w-full mb-4 space-y-3">
            <BackButton onClick={handleGoBack} />

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">
                Verify your identity
              </h3>
              <p className="text-sm text-gray-600">
                We've sent a verification code to {activeTab === 'email' ? email : `${countryCode} ${phone}`}
              </p>
            </div>

            <TwoFactorAuth 
              twoFactorCode={twoFactorCode} 
              setTwoFactorCode={setTwoFactorCode} 
              activeTab={activeTab}
            />

            <SubmitButton 
              isLoading={isLoading} 
              label="Continue" 
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
