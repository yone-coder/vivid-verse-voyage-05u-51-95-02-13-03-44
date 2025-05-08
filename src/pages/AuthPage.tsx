
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Import new component structure
import AuthContainer from '@/components/auth/AuthContainer';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthSocialButtons from '@/components/auth/AuthSocialButtons';
import AuthTabs from '@/components/auth/AuthTabs';
import AuthForm from '@/components/auth/AuthForm';
import AuthFooter from '@/components/auth/AuthFooter';

interface AuthPageProps {
  isOverlay?: boolean;
  onClose?: () => void;
}

const AuthPage = ({ isOverlay = false, onClose }: AuthPageProps) => {
  // State management for the auth flow
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('email'); // 'email', 'phone', or 'passkey'
  const [step, setStep] = useState(1); // Multi-step process
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Auth context
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/for-you');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      // Basic validation
      if (!email && activeTab === 'email') {
        toast.error("Please enter your email address.");
        return;
      }
      // Simple email validation for email tab
      if (activeTab === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          toast.error("Please enter a valid email address.");
          return;
        }
      }
      // Phone validation for phone tab
      if (activeTab === 'phone' && !phone) {
        toast.error("Please enter your phone number.");
        return;
      }
      setStep(2); // Move to password step
    } else {
      // Password validation
      if (!password) {
        toast.error("Please enter a password.");
        return;
      }
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters.");
        return;
      }

      // For signup, validate confirm password and terms
      if (isSignUp) {
        if (password !== confirmPassword) {
          toast.error("Passwords don't match.");
          return;
        }
        if (!agreeToTerms) {
          toast.error("You must agree to the terms of service.");
          return;
        }
      }

      setIsLoading(true);
      try {
        if (isSignUp) {
          await signUp(email, password);
        } else {
          await signIn(email, password, rememberMe);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        toast.error("Authentication failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSocialLogin = async (provider: 'github' | 'twitter' | 'google' | 'facebook' | 'apple') => {
    toast.info(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login is not configured yet`);
  };

  return (
    <AuthContainer isOverlay={isOverlay} onClose={onClose}>
      <AuthHeader title={isSignUp ? "Create an account" : "Log in to Mima"} />
      
      <div className="w-full mb-4 space-y-3">
        <AuthSocialButtons handleSocialLogin={handleSocialLogin} />
        
        <AuthTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          isSignUp={isSignUp}
          fullName={fullName}
          setFullName={setFullName}
          onSubmit={handleSubmit}
          step={step}
        />
        
        <AuthForm 
          step={step}
          isSignUp={isSignUp}
          email={email}
          phone={phone}
          countryCode={countryCode}
          fullName={fullName}
          password={password}
          confirmPassword={confirmPassword}
          rememberMe={rememberMe}
          agreeToTerms={agreeToTerms}
          showPassword={showPassword}
          activeTab={activeTab}
          setStep={setStep}
          setActiveTab={setActiveTab}
          setEmail={setEmail}
          setPhone={setPhone}
          setCountryCode={setCountryCode}
          setFullName={setFullName}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          setRememberMe={setRememberMe}
          setAgreeToTerms={setAgreeToTerms}
          setShowPassword={setShowPassword}
          setIsSignUp={setIsSignUp}
          onSubmit={handleSubmit}
        />
      </div>
      
      <AuthFooter />
    </AuthContainer>
  );
};

export default AuthPage;
