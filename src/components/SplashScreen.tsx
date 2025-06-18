
import React, { useState, useEffect } from 'react';
import { Globe, Shield, Lock, CheckCircle } from 'lucide-react';

interface SplashScreenProps {
  isVisible: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ isVisible }) => {
  const [progress, setProgress] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Language detection
  useEffect(() => {
    const detectLanguage = () => {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.includes('fr')) return 'fr';
      if (browserLang.includes('ht')) return 'ht';
      return 'en';
    };
    setCurrentLanguage(detectLanguage());
  }, []);

  // Smooth progress bar
  useEffect(() => {
    if (!isVisible) return;

    const duration = 3000; // 3 seconds total
    const increment = 100 / (duration / 50); // Update every 50ms

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + increment;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [isVisible]);

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
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center z-50 text-gray-800">
      {/* Main Content */}
      <div className="text-center z-10 px-6 max-w-md mx-auto">
        {/* Logo and App Name */}
        <div className="flex items-center justify-center space-x-3 mb-3">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200">
            <Globe className="w-8 h-8 text-gray-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-wide text-gray-700">
            GLOBAL TRANSFÈ
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-gray-600 text-sm mb-8 font-medium">
          {getTagline()}
        </p>

        {/* Trust Badges */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="flex items-center space-x-1 bg-white border border-gray-200 rounded-full px-3 py-1 shadow-sm">
            <Shield className="w-3 h-3 text-gray-500" />
            <span className="text-xs text-gray-600">Encrypted</span>
          </div>
          <div className="flex items-center space-x-1 bg-white border border-gray-200 rounded-full px-3 py-1 shadow-sm">
            <Lock className="w-3 h-3 text-gray-500" />
            <span className="text-xs text-gray-600">Secure</span>
          </div>
          <div className="flex items-center space-x-1 bg-white border border-gray-200 rounded-full px-3 py-1 shadow-sm">
            <CheckCircle className="w-3 h-3 text-gray-500" />
            <span className="text-xs text-gray-600">2FA</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8 overflow-hidden">
          <div 
            className="bg-gray-400 h-full rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Partner Logos Section */}
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <div className="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
              <span className="text-xs font-bold text-gray-600">MC</span>
            </div>
            <div className="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
              <span className="text-xs font-bold text-gray-600">PP</span>
            </div>
            <div className="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
              <span className="text-xs font-bold text-gray-600">BRH</span>
            </div>
          </div>
          <p className="text-gray-500 text-xs">Trusted Partners</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
        {/* Partnership Message */}
        <p className="text-gray-500 text-xs mb-2">
          {getPartnershipMessage()}
        </p>
        
        {/* Made in Message */}
        <p className="text-gray-600 text-xs mb-2 font-medium">
          {getMadeInMessage()}
        </p>
        
        {/* Compliance Badges */}
        <div className="flex items-center justify-center space-x-3 mb-2">
          <span className="text-gray-400 text-xs bg-white border border-gray-200 px-2 py-1 rounded shadow-sm">PCI-DSS</span>
          <span className="text-gray-400 text-xs bg-white border border-gray-200 px-2 py-1 rounded shadow-sm">ISO 27001</span>
          <span className="text-gray-400 text-xs bg-white border border-gray-200 px-2 py-1 rounded shadow-sm">GDPR</span>
        </div>
        
        {/* Version */}
        <p className="text-gray-400 text-xs">
          v2.1.0
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
