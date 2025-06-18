
import React, { useState, useEffect } from 'react';
import { Globe, Shield, Lock, CheckCircle, MapPin } from 'lucide-react';

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
      { text: 'Connecting to secure servers...', duration: 300 },
      { text: 'Loading services for Haiti 🇭🇹...', duration: 400 },
      { text: 'Verifying security protocols...', duration: 350 },
      { text: 'Finalizing your transfer experience...', duration: 450 }
    ];

    const stepsHt = [
      { text: 'Konekte ak sèvè yo ki an sekirite...', duration: 300 },
      { text: 'Ap chaje sèvis yo pou Ayiti 🇭🇹...', duration: 400 },
      { text: 'Ap verifye pwotokòl sekirite yo...', duration: 350 },
      { text: 'Ap finalise eksperyans transfè w la...', duration: 450 }
    ];

    const stepsFr = [
      { text: 'Connexion aux serveurs sécurisés...', duration: 300 },
      { text: 'Chargement des services pour Haïti 🇭🇹...', duration: 400 },
      { text: 'Vérification des protocoles de sécurité...', duration: 350 },
      { text: 'Finalisation de votre expérience de transfert...', duration: 450 }
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

  const getMadeInMessage = () => {
    switch (currentLanguage) {
      case 'ht': return 'Fèt nan Désarmes 🇭🇹';
      case 'fr': return 'Conçu à Désarmes 🇭🇹';
      default: return 'Made in Désarmes 🇭🇹';
    }
  };

  const getPartnershipMessage = () => {
    switch (currentLanguage) {
      case 'ht': return 'Nan patnèrya ak KPD 🤝';
      case 'fr': return 'En partenariat avec KPD 🤝';
      default: return 'In Partnership with KPD 🤝';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-red-600 flex flex-col items-center justify-center z-50 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="text-center z-10 px-6 max-w-md mx-auto">
        {/* Location indicator */}
        <div className="flex items-center justify-center space-x-2 mb-4 opacity-80">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Haiti 🇭🇹</span>
        </div>

        {/* Welcome message */}
        <p className="text-white/90 text-sm mb-2 font-light">
          {getWelcomeMessage()}
        </p>

        {/* Logo and App Name */}
        <div className="flex items-center justify-center space-x-3 mb-3">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
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
        <div className="flex items-center justify-center space-x-4 mb-6">
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
            className="bg-white h-full rounded-full transition-all duration-300 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-white/80 text-sm mb-8 min-h-[20px] animate-pulse">
          {loadingText}
        </p>

        {/* Partner Logos Section */}
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
              <span className="text-xs font-bold">MC</span>
            </div>
            <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
              <span className="text-xs font-bold">PP</span>
            </div>
            <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
              <span className="text-xs font-bold">BRH</span>
            </div>
          </div>
          <p className="text-white/60 text-xs">Trusted Partners</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
        {/* Partnership Message */}
        <p className="text-white/70 text-xs mb-2">
          {getPartnershipMessage()}
        </p>
        
        {/* Made in Message */}
        <p className="text-white/70 text-xs mb-2 font-medium">
          {getMadeInMessage()}
        </p>
        
        {/* Compliance Badges */}
        <div className="flex items-center justify-center space-x-3 mb-2">
          <span className="text-white/50 text-xs bg-white/10 px-2 py-1 rounded">PCI-DSS</span>
          <span className="text-white/50 text-xs bg-white/10 px-2 py-1 rounded">ISO 27001</span>
          <span className="text-white/50 text-xs bg-white/10 px-2 py-1 rounded">GDPR</span>
        </div>
        
        {/* Version */}
        <p className="text-white/40 text-xs">
          v2.1.0
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
