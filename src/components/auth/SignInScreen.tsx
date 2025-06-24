
import React, { useState } from 'react';
import { X, Check, ChevronDown, Globe } from 'lucide-react';

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
      {/* Language Selector Trigger - Top Right */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors active:scale-98"
      >
        <Globe className="w-5 h-5 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">{currentLang.name}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
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

      <style>{`
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

export default function LoginPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('ht');

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

  return (
    <div className="min-h-screen bg-white flex flex-col px-4">
      {/* Top navigation bar */}
      <div className="pt-4 pb-4 flex items-center justify-between">
        {/* Flag icon - Top Left */}
        <div className="flex items-center">
          <img 
            src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.6.6/flags/4x3/${currentLang.country.toLowerCase()}.svg`}
            alt={`${currentLang.name} flag`}
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>

        {/* Language Selector - Top Right */}
        <LanguageSelector />
      </div>

      <div className="flex-1 flex flex-col justify-center w-full p-4">

        {/* Welcome heading */}
        <h1 className="text-3xl font-semibold text-red-500 text-center mb-2">
          Welcome
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-center mb-6">
          Sign in to continue
        </p>

        {/* Red progress bar */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-1 bg-red-500 rounded-full"></div>
        </div>

        {/* All login buttons */}
        <div className="space-y-3 mb-6">
          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-gray-700 font-medium">Continue with Google</span>
          </button>

          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="text-gray-700 font-medium">Continue with Facebook</span>
          </button>

          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5" fill="#000000" viewBox="0 0 24 24">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
            </svg>
            <span className="text-gray-700 font-medium">Continue with Apple</span>
          </button>

          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span className="text-gray-700 font-medium">Continue with Email</span>
          </button>

          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <span className="text-gray-700 font-medium">Continue with Phone Number</span>
          </button>
        </div>

        {/* Security notice */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18,8A6,6 0 0,0 12,2A6,6 0 0,0 6,8H4C2.89,8 2,8.89 2,10V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V10C22,8.89 21.1,8 20,8H18M12,4A4,4 0 0,1 16,8H8A4,4 0 0,1 12,4Z"/>
          </svg>
          <span className="text-gray-500 text-sm">Secure Authentication</span>
        </div>

        {/* Terms and Privacy */}
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          By proceeding, you confirm that you've read and agree to our{' '}
          <span className="text-red-500">Terms of Service</span> and{' '}
          <span className="text-red-500">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
