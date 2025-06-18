
import React, { useState, useEffect } from 'react';
import { Globe, Shield, Lock, CheckCircle } from 'lucide-react';

interface SplashScreenProps {
  isVisible: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ isVisible }) => {
  const [loadingText, setLoadingText] = useState('Initializing secure connection...');
  const [progress, setProgress] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Language detection and switching
  useEffect(() => {
    const detectLanguage = () => {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.includes('fr')) return 'fr';
      if (browserLang.includes('ht')) return 'ht';
      return 'en';
    };
    setCurrentLanguage(detectLanguage());
  }, []);

  // Loading progress simulation
  useEffect(() => {
    if (!isVisible) return;

    const steps = [
      { text: 'Connecting to secure servers...', duration: 800 },
      { text: 'Loading services for Haiti 🇭🇹...', duration: 800 },
      { text: 'Finalizing your transfer experience...', duration: 400 }
    ];

    const stepsHt = [
      { text: 'Konekte ak sèvè yo ki an sekirite...', duration: 800 },
      { text: 'Ap chaje sèvis yo pou Ayiti 🇭🇹...', duration: 800 },
      { text: 'Ap finalise eksperyans transfè w la...', duration: 400 }
    ];

    const stepsFr = [
      { text: 'Connexion aux serveurs sécurisés...', duration: 800 },
      { text: 'Chargement des services pour Haïti 🇭🇹...', duration: 800 },
      { text: 'Finalisation de votre expérience de transfert...', duration: 400 }
    ];

    const currentSteps = currentLanguage === 'ht' ? stepsHt : currentLanguage === 'fr' ? stepsFr : steps;

    let currentStep = 0;
    let currentProgress = 0;

    const updateStep = () => {
      if (currentStep < currentSteps.length) {
        setLoadingText(currentSteps[currentStep].text);
        
        const stepProgress = (currentStep + 1) / currentSteps.length * 100;
        const progressInterval = setInterval(() => {
          currentProgress += 2;
          setProgress(Math.min(currentProgress, stepProgress));
          
          if (currentProgress >= stepProgress) {
            clearInterval(progressInterval);
            currentStep++;
            setTimeout(updateStep, currentSteps[currentStep - 1]?.duration || 300);
          }
        }, 20);
      }
    };

    updateStep();
  }, [isVisible, currentLanguage]);

  const getWelcomeMessage = () => {
    switch (currentLanguage) {
      case 'ht': return 'Byenvini nan';
      case 'fr': return 'Bienvenue à';
      default: return 'Welcome to';
    }
  };

  const getTagline = () => {
    switch (currentLanguage) {
      case 'ht': return 'Rapid. Garanti. Ayisyen.';
      case 'fr': return 'Rapide. Sécurisé. Haïtien.';
      default: return 'Fast. Secure. Haitian.';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-red-600 flex flex-col items-center justify-center z-50 text-white">
      {/* Main Content */}
      <div className="text-center z-10 px-6 max-w-md mx-auto">
        {/* Welcome message */}
        <p className="text-white/90 text-sm mb-2 font-light">
          {getWelcomeMessage()}
        </p>

        {/* Logo and App Name */}
        <div className="flex items-center justify-center space-x-3 mb-3">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Globe className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-wide">
            GLOBAL TRANSFÈ
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-white/90 text-sm mb-8 font-medium">
          {getTagline()}
        </p>

        {/* Trust Badges */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className="flex items-center space-x-1 bg-white/10 rounded-full px-3 py-1">
            <Shield className="w-3 h-3" />
            <span className="text-xs">Encrypted</span>
          </div>
          <div className="flex items-center space-x-1 bg-white/10 rounded-full px-3 py-1">
            <Lock className="w-3 h-3" />
            <span className="text-xs">Secure</span>
          </div>
          <div className="flex items-center space-x-1 bg-white/10 rounded-full px-3 py-1">
            <CheckCircle className="w-3 h-3" />
            <span className="text-xs">2FA</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-2 mb-4 overflow-hidden">
          <div 
            className="bg-white h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          >
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-white/80 text-sm mb-8 min-h-[20px]">
          {loadingText}
        </p>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-white/70 text-xs mb-2 font-medium">
          Made in Désarmes 🇭🇹
        </p>
        <p className="text-white/40 text-xs">
          v2.1.0
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
