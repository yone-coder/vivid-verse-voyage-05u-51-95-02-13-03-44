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

  // Only redirect if user is authenticated AND we're not in the success flow AND not loading
  useEffect(() => {
    if (user && !isLoading && currentScreen !== 'success') {
      // If we just signed in successfully, show success screen first
      if (currentScreen === 'password' || currentScreen === 'verification') {
        setCurrentScreen('success');
        return;
      }
      // Otherwise redirect normally
      navigate('/');
    }
  }, [user, isLoading, navigate, currentScreen]);

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
    // Don't set to success here - let the useEffect handle it based on user state
    console.log('Sign in completed, user state will update and trigger success screen');
  };

  const handleContinueToDashboard = () => {
    console.log('Redirecting to homepage...');
    skipSuccessScreen();
  };

  // Don't render if user is already authenticated and we're not showing success screen and not loading
  if (user && !isLoading && currentScreen !== 'success') {
    return null;
  }

  return (
    <>
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
    </>
  );
}
