import React, { useState } from 'react';
import { ArrowLeft, X, Check, ChevronDown, Globe, Mail, Lock, Key } from 'lucide-react';

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('ht');
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'ht', name: 'Kreyòl Ayisyen', country: 'HT', countryName: 'Haiti' },
    { code: 'fr', name: 'Français', country: 'FR', countryName: 'France' },
    { code: 'en', name: 'English', country: 'US', countryName: 'United States' },
    { code: 'es', name: 'Español', country: 'ES', countryName: 'Spain' },
    { code: 'pt', name: 'Português', country: 'PT', countryName: 'Portugal' },
    { code: 'de', name: 'Deutsch', country: 'DE', countryName: 'Germany' },
    { code: 'it', name: 'Italiano', country: 'IT', countryName: 'Italy' },
    { code: 'zh', name: '中文', country: 'CN', countryName: 'China' },
    { code: 'ja', name: '日本語', country: 'JP', countryName: 'Japan' },
    { code: 'ar', name: 'العربية', country: 'SA', countryName: 'Saudi Arabia' },
    { code: 'ru', name: 'Русский', country: 'RU', countryName: 'Russia' }
  ];

  const currentLang = languages.find(lang => lang.code === selectedLanguage);

  const handleLanguageSelect = (langCode) => {
    setSelectedLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <>
      {/* Language Selector Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors active:scale-98"
      >
        <Globe className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">{currentLang.name}</span>
        <ChevronDown className="w-3 h-3 text-gray-500" />
      </button>

      {/* Bottom Sheet */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 animate-fade-in" 
            onClick={() => setIsOpen(false)} 
          />

          {/* Bottom Sheet Modal */}
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 animate-slide-up shadow-2xl">
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>

            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Select Language</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Language List */}
            <div className="max-h-96 overflow-y-auto pb-6">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className="flex items-center w-full px-6 py-4 hover:bg-gray-50 transition-colors active:bg-gray-100"
                >
                  <img 
                    src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.6.6/flags/4x3/${lang.country.toLowerCase()}.svg`}
                    alt={`${lang.name} flag`}
                    className="w-8 h-8 rounded-full flex-shrink-0 object-cover"
                  />
                  <div className="flex flex-col items-start flex-1 ml-4">
                    <span className="text-gray-800 font-medium">{lang.name}</span>
                    <span className="text-gray-500 text-sm">{lang.countryName}</span>
                  </div>
                  {lang.code === selectedLanguage && (
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white stroke-2" />
                    </div>
                  )}
                  {lang.code !== selectedLanguage && (
                    <div className="w-6 h-6 flex-shrink-0"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        
        .active\\:scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </>
  );
};

export default function EmailAuthScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('ht');
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  const languages = [
    { code: 'ht', name: 'Kreyòl Ayisyen', country: 'HT', countryName: 'Haiti' },
    { code: 'fr', name: 'Français', country: 'FR', countryName: 'France' },
    { code: 'en', name: 'English', country: 'US', countryName: 'United States' },
    { code: 'es', name: 'Español', country: 'ES', countryName: 'Spain' },
    { code: 'pt', name: 'Português', country: 'PT', countryName: 'Portugal' },
    { code: 'de', name: 'Deutsch', country: 'DE', countryName: 'Germany' },
    { code: 'it', name: 'Italiano', country: 'IT', countryName: 'Italy' },
    { code: 'zh', name: '中文', country: 'CN', countryName: 'China' },
    { code: 'ja', name: '日本語', country: 'JP', countryName: 'Japan' },
    { code: 'ko', name: '한국어', country: 'KR', countryName: 'South Korea' },
    { code: 'ar', name: 'العربية', country: 'SA', countryName: 'Saudi Arabia' },
    { code: 'ru', name: 'Русский', country: 'RU', countryName: 'Russia' }
  ];

  const currentLang = languages.find(lang => lang.code === selectedLanguage);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(value));
  };

  const handleBack = () => {
    // Handle back navigation
    console.log('Navigate back to login screen');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-4">
      {/* Header */}
      <div className="pt-4 pb-6 flex items-center justify-between">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>

        {/* Language Selector */}
        <LanguageSelector />
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-center mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-red-500 rounded-full"></div>
            <div className="w-8 h-1 bg-red-500 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500">Step 2 of 4</p>
      </div>

      <div className="flex-1 flex flex-col justify-center w-full max-w-md mx-auto">
        {/* Welcome heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Enter your email
          </h1>
          <p className="text-gray-600">
            We'll send you a verification code or you can sign in with your password
          </p>
        </div>

        {/* Email Input */}
        <div className="mb-8">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email address"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
            />
            {isEmailValid && (
              <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
            )}
          </div>
        </div>

        {/* Authentication Options */}
        <div className="space-y-3 mb-8">
          <button
            disabled={!isEmailValid}
            className={`w-full flex items-center justify-center gap-3 py-4 px-4 rounded-lg font-medium transition-all ${
              isEmailValid
                ? 'bg-red-500 text-white hover:bg-red-600 active:scale-98'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Lock className="w-5 h-5" />
            <span>Continue with Password</span>
          </button>

          <button
            disabled={!isEmailValid}
            className={`w-full flex items-center justify-center gap-3 py-4 px-4 border-2 rounded-lg font-medium transition-all ${
              isEmailValid
                ? 'border-red-500 text-red-500 hover:bg-red-50 active:scale-98'
                : 'border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Key className="w-5 h-5" />
            <span>Continue with Code</span>
          </button>
        </div>

        {/* Help Text */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            Don't have an account?{' '}
            <button className="text-red-500 font-medium hover:text-red-600">
              Sign up
            </button>
          </p>
          
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18,8A6,6 0 0,0 12,2A6,6 0 0,0 6,8H4C2.89,8 2,8.89 2,10V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V10C22,8.89 21.1,8 20,8H18M12,4A4,4 0 0,1 16,8H8A4,4 0 0,1 12,4Z"/>
            </svg>
            <span className="text-gray-500 text-sm">Your email is secure with us</span>
          </div>
        </div>
      </div>
    </div>
  );
}