
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Language, Location, LanguageContextType } from '@/types/language';

// Default supported languages
export const supportedLanguages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: 'us' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: 'es' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: 'fr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: 'de' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: 'it' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: 'pt' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: 'ru' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: 'cn' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: 'jp' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: 'kr' },
];

// Default supported locations
export const supportedLocations: Location[] = [
  { code: 'US', name: 'United States', flag: 'us' },
  { code: 'GB', name: 'United Kingdom', flag: 'gb' },
  { code: 'CA', name: 'Canada', flag: 'ca' },
  { code: 'AU', name: 'Australia', flag: 'au' },
  { code: 'DE', name: 'Germany', flag: 'de' },
  { code: 'FR', name: 'France', flag: 'fr' },
  { code: 'ES', name: 'Spain', flag: 'es' },
  { code: 'IT', name: 'Italy', flag: 'it' },
  { code: 'JP', name: 'Japan', flag: 'jp' },
  { code: 'CN', name: 'China', flag: 'cn' },
];

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to get stored preferences or use defaults
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const storedLanguage = localStorage.getItem('preferredLanguage');
    if (storedLanguage) {
      return JSON.parse(storedLanguage) as Language;
    }
    
    // Try to detect browser language
    const browserLang = navigator.language.split('-')[0];
    const detectedLang = supportedLanguages.find(lang => lang.code === browserLang);
    
    return detectedLang || supportedLanguages[0];
  });
  
  const [currentLocation, setCurrentLocation] = useState<Location>(() => {
    const storedLocation = localStorage.getItem('preferredLocation');
    if (storedLocation) {
      return JSON.parse(storedLocation) as Location;
    }
    
    // Default to US if no preference
    return supportedLocations[0];
  });
  
  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('preferredLanguage', JSON.stringify(currentLanguage));
  }, [currentLanguage]);
  
  useEffect(() => {
    localStorage.setItem('preferredLocation', JSON.stringify(currentLocation));
  }, [currentLocation]);
  
  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    // In a real app, you'd implement i18n translation loading here
    document.documentElement.lang = language.code;
  };
  
  const setLocation = (location: Location) => {
    setCurrentLocation(location);
  };
  
  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, currentLocation, setLocation }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
