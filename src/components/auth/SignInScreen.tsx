
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLoginScreen from './MainLoginScreen';
import EmailAuthScreen from './EmailAuthScreen';
import PasswordAuthScreen from './PasswordAuthScreen';
import VerificationCodeScreen from './VerificationCodeScreen';
import AccountCreationScreen from './AccountCreationScreen';
import SuccessScreen from './SuccessScreen';
import ResetPasswordScreen from './ResetPasswordScreen';

type ScreenType = 'login' | 'email' | 'password' | 'verification' | 'create-account' | 'success' | 'forgot-password';

export default function LoginPage() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');
  const [selectedLanguage, setSelectedLanguage] = useState('ht');
  const [emailForPassword, setEmailForPassword] = useState('');

  const navigate = useNavigate();

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
    } else if (currentScreen === 'create-account') {
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

  const handleCreateAccount = (email: string) => {
    setEmailForPassword(email);
    setCurrentScreen('create-account');
  };

  const handleSignInSuccess = () => {
    console.log('Sign in completed successfully');
    setCurrentScreen('success');
  };

  const handleAccountCreated = () => {
    console.log('Account created successfully');
    setCurrentScreen('success');
  };

  const handleContinueToDashboard = () => {
    console.log('Manual redirect to homepage from success screen');
    navigate('/');
  };

  const handleSignUpClick = () => {
    setCurrentScreen('create-account');
  };

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
          onCreateAccount={handleCreateAccount}
          onSignUpClick={handleSignUpClick}
          initialEmail={emailForPassword}
        />
      )}
      
      {currentScreen === 'password' && (
  <PasswordAuthScreen 
    email={emailForPassword} 
    onBack={handleBack}
    onSignInSuccess={handleSignInSuccess}
    onForgotPasswordClick={() => setCurrentScreen('forgot-password')} // 👈 add this line
  />
)}

{currentScreen === 'forgot-password' && (
  <ResetPasswordScreen 
    email={emailForPassword}
    onBack={() => setCurrentScreen('password')}
  />
)}
      
      {currentScreen === 'verification' && (
        <VerificationCodeScreen 
          email={emailForPassword} 
          onBack={handleBack}
          onVerificationSuccess={handleSignInSuccess}
        />
      )}
      
      {currentScreen === 'create-account' && (
        <AccountCreationScreen
          email={emailForPassword}
          onBack={handleBack}
          onAccountCreated={handleAccountCreated}
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
