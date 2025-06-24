
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MainLoginScreen from './MainLoginScreen';
import EmailAuthScreen from './EmailAuthScreen';
import PasswordAuthScreen from './PasswordAuthScreen';
import VerificationCodeScreen from './VerificationCodeScreen';
import SuccessScreen from './SuccessScreen';

type ScreenType = 'login' | 'email' | 'password' | 'verification' | 'success';

// Main LoginPage Component
export default function LoginPage() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');
  const [selectedLanguage, setSelectedLanguage] = useState('ht');
  const [emailForPassword, setEmailForPassword] = useState('');

  const { user, skipSuccessScreen, isLoading } = useAuth();
  const navigate = useNavigate();

  // Handle successful login - show success screen when user is authenticated
  useEffect(() => {
    if (user && !isLoading && currentScreen !== 'success') {
      console.log('User authenticated, showing success screen');
      setCurrentScreen('success');
    }
  }, [user, isLoading, currentScreen]);

  // Handle success screen timeout and redirect
  useEffect(() => {
    if (currentScreen === 'success') {
      const timer = setTimeout(() => {
        console.log('Success screen timeout, redirecting to homepage');
        skipSuccessScreen();
        navigate('/');
      }, 3000); // 3 seconds delay

      return () => clearTimeout(timer);
    }
  }, [currentScreen, navigate, skipSuccessScreen]);

  const handleContinueWithEmail = () => {
    setCurrentScreen('email');
  };

  const handleBack = () => {
    if (currentScreen === 'success') {
      setCurrentScreen('login');
    } else if (currentScreen === 'verification') {
      setCurrentScreen('email');
    } else if (currentScreen === 'password') {
      setCurrentScreen('email');
    } else if (currentScreen === 'email') {
      setCurrentScreen('login');
      setEmailForPassword(''); // Clear email when going back to login
    }
  };

  const handleContinueWithPassword = (email: string) => {
    setEmailForPassword(email);
    setCurrentScreen('password');
  };

  const handleContinueWithCode = (email: string) => {
    setEmailForPassword(email);
    setCurrentScreen('verification');
    console.log('Sending verification code to:', email);
  };

  const handleResendCode = (email: string) => {
    console.log('Resending verification code to:', email);
    // Here you would typically call your API to resend the code
  };

  const handleSignInSuccess = () => {
    console.log('Sign in completed successfully');
    // Don't manually set to success here - let the useEffect handle it based on user state
  };

  const handleContinueToDashboard = () => {
    console.log('Manual redirect to homepage from success screen');
    skipSuccessScreen();
    navigate('/');
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;
  }

  // If user is authenticated and we're not showing success screen, redirect immediately
  if (user && currentScreen !== 'success') {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {currentScreen === 'login' && (
        <MainLoginScreen
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          onContinueWithEmail={handleContinueWithEmail}
        />
      )}
      
      {currentScreen === 'email' && (
        <EmailAuthScreen
          onBack={handleBack}
          selectedLanguage={selectedLanguage}
          onContinueWithPassword={handleContinueWithPassword}
          onContinueWithCode={handleContinueWithCode}
          initialEmail={emailForPassword}
        />
      )}
      
      {currentScreen === 'password' && (
        <PasswordAuthScreen 
          email={emailForPassword} 
          onBack={handleBack}
          onSignInSuccess={handleSignInSuccess}
        />
      )}
      
      {currentScreen === 'verification' && (
        <VerificationCodeScreen 
          email={emailForPassword} 
          onBack={handleBack}
          onResendCode={handleResendCode}
          onVerificationSuccess={handleSignInSuccess}
        />
      )}
      
      {currentScreen === 'success' && (
        <SuccessScreen 
          email={emailForPassword}
          onContinue={handleContinueToDashboard}
        />
      )}
    </div>
  );
}
