
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

  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to home if user is already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

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
    setCurrentScreen('success');
  };

  const handleContinueToDashboard = () => {
    console.log('Redirecting to homepage...');
    navigate('/'); // This will redirect to the home page (mobile multi-step transfer)
  };

  // Don't render if user is already authenticated
  if (user) {
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
