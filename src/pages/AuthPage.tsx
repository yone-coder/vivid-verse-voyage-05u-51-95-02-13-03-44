import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import AuthContainer from '@/components/auth/AuthContainer';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthSocialButtons from '@/components/auth/AuthSocialButtons';
import AuthTabs from '@/components/auth/AuthTabs';
import AuthFooter from '@/components/auth/AuthFooter';

interface AuthPageProps {
  isOverlay?: boolean;
  onClose?: () => void;
}

const AuthPage = ({ isOverlay = false, onClose }: AuthPageProps) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('email');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/for-you');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input based on active tab
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
    } else if (activeTab === 'phone') {
      if (!phone) {
        toast.error("Please enter your phone number.");
        return;
      }
    }

    // Validate password
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    // Extra validation for sign-up
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
        />
      </div>

      <AuthFooter />
    </AuthContainer>
  );
};

export default AuthPage;