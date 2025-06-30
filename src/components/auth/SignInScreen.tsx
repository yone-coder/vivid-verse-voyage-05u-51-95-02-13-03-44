
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
          />
        )}
      </div>
    </LanguageProvider>
  );
};

export default SignInScreen;
