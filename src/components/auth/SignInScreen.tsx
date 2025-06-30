
import React, { useState } from 'react';
import MainLoginScreen from './MainLoginScreen';
import EmailAuthScreen from './EmailAuthScreen';
import VerificationCodeScreen from './VerificationCodeScreen';
import { LanguageProvider } from '@/contexts/LanguageContext';

type ScreenType = 'main' | 'email' | 'verification' | 'password';

const SignInScreen: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('main');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [userEmail, setUserEmail] = useState('');

  const handleContinueWithEmail = () => {
    console.log('Navigating to email screen');
    setCurrentScreen('email');
  };

  const handleBackToMain = () => {
    console.log('Navigating back to main screen');
    setCurrentScreen('main');
  };

  const handleContinueWithPassword = (email: string) => {
    console.log('Continue with password for:', email);
    setUserEmail(email);
    // TODO: Navigate to password screen
    setCurrentScreen('password');
  };

  const handleContinueWithCode = (email: string) => {
    console.log('Continue with code for:', email);
    setUserEmail(email);
    setCurrentScreen('verification');
  };

  const handleCreateAccount = (email: string) => {
    console.log('Create account for:', email);
    setUserEmail(email);
    // TODO: Navigate to account creation screen
  };

  const handleSignUpClick = () => {
    console.log('Sign up clicked');
    // TODO: Navigate to sign up screen
  };

  const handleBackFromVerification = () => {
    console.log('Navigating back to email screen from verification');
    setCurrentScreen('email');
  };

  const handleVerificationSuccess = () => {
    console.log('Verification successful, user authenticated');
    // TODO: Navigate to main app or dashboard
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
            initialEmail={userEmail}
          />
        )}
        
        {currentScreen === 'verification' && (
          <VerificationCodeScreen
            email={userEmail}
            onBack={handleBackFromVerification}
            onVerificationSuccess={handleVerificationSuccess}
          />
        )}
        
        {currentScreen === 'password' && (
          <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Password Screen</h1>
              <p className="text-gray-600 mb-4">Password authentication for: {userEmail}</p>
              <button 
                onClick={handleBackFromVerification}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </LanguageProvider>
  );
};

export default SignInScreen;
