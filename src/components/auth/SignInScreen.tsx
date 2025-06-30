
import React, { useState } from 'react';
import MainLoginScreen from './MainLoginScreen';
import EmailAuthScreen from './EmailAuthScreen';
import { LanguageProvider } from '@/contexts/LanguageContext';

const SignInScreen: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'main' | 'email'>('main');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleContinueWithEmail = () => {
    setCurrentScreen('email');
  };

  const handleBackToMain = () => {
    setCurrentScreen('main');
  };

  const handleContinueWithPassword = (email: string) => {
    console.log('Continue with password for:', email);
    // TODO: Navigate to password screen
  };

  const handleContinueWithCode = (email: string) => {
    console.log('Continue with code for:', email);
    // TODO: Navigate to verification code screen
  };

  const handleCreateAccount = (email: string) => {
    console.log('Create account for:', email);
    // TODO: Navigate to account creation screen
  };

  const handleSignUpClick = () => {
    console.log('Sign up clicked');
    // TODO: Navigate to sign up screen
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        {currentScreen === 'main' && (
          <MainLoginScreen 
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            onContinueWithEmail={handleContinueWithEmail}
          />
        )}
        {currentScreen === 'email' && (
          <EmailAuthScreen 
            onBack={handleBackToMain}
            selectedLanguage={selectedLanguage}
            onContinueWithPassword={handleContinueWithPassword}
            onContinueWithCode={handleContinueWithCode}
            onCreateAccount={handleCreateAccount}
            onSignUpClick={handleSignUpClick}
          />
        )}
      </div>
    </LanguageProvider>
  );
};

export default SignInScreen;
