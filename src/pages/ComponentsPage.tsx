import React, { useState, useRef } from 'react';
import { ArrowLeft, Mail, Lock, Key, Check, HelpCircle } from 'lucide-react';

const commonEmailDomains = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
  'aol.com',
  'protonmail.com',
  'live.com',
  'msn.com',
  'me.com',
];

// Custom mapping for favicons to fix Gmail icon issue
const faviconOverrides = {
  'gmail.com': 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico',
};

export default function EmailAuthScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('ht');
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [inlineSuggestion, setInlineSuggestion] = useState('');
  const [faviconUrl, setFaviconUrl] = useState(null);
  const suggestionsRef = useRef(null);

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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e) => {
    const value = e.target.value.trim();
    setEmail(value);

    setIsEmailValid(emailRegex.test(value));

    const atIndex = value.indexOf('@');
    if (atIndex > -1) {
      const typedDomainPart = value.slice(atIndex + 1).toLowerCase();

      if (typedDomainPart.length > 0) {
        // Use override favicon URL if exists, else fallback to Google favicon API
        const favicon = faviconOverrides[typedDomainPart] 
          || `https://www.google.com/s2/favicons?domain=${typedDomainPart}`;
        setFaviconUrl(favicon);
      } else {
        setFaviconUrl(null);
      }

      if (typedDomainPart.length === 0) {
        setSuggestions(commonEmailDomains);
        setInlineSuggestion(value + commonEmailDomains[0]);
      } else {
        const filtered = commonEmailDomains.filter(domain =>
          domain.startsWith(typedDomainPart)
        );
        setSuggestions(filtered);
        if (filtered.length > 0) {
          setInlineSuggestion(value.slice(0, atIndex + 1) + filtered[0]);
        } else {
          setInlineSuggestion('');
        }
      }
    } else {
      setSuggestions([]);
      setInlineSuggestion('');
      setFaviconUrl(null);
    }
  };

  const handleKeyDown = (e) => {
    if (!inlineSuggestion) return;

    if ((e.key === 'Tab' || e.key === 'ArrowRight') && email.length < inlineSuggestion.length) {
      e.preventDefault();
      setEmail(inlineSuggestion);
      setIsEmailValid(emailRegex.test(inlineSuggestion));
      setInlineSuggestion('');
      setSuggestions([]);

      const atIndex = inlineSuggestion.indexOf('@');
      if (atIndex > -1) {
        const domain = inlineSuggestion.slice(atIndex + 1).toLowerCase();
        const favicon = faviconOverrides[domain] 
          || `https://www.google.com/s2/favicons?domain=${domain}`;
        setFaviconUrl(favicon);
      }
    }
  };

  const handleSuggestionClick = (domain) => {
    const atIndex = email.indexOf('@');
    const newEmail = atIndex > -1 ? email.slice(0, atIndex + 1) + domain : email + '@' + domain;
    setEmail(newEmail);
    setIsEmailValid(emailRegex.test(newEmail));
    setSuggestions([]);
    setInlineSuggestion('');
    const favicon = faviconOverrides[domain] 
      || `https://www.google.com/s2/favicons?domain=${domain}`;
    setFaviconUrl(favicon);
  };

  const handleBack = () => {
    console.log('Navigate back to login screen');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-4">
      {/* Header */}
      <div className="pt-2 pb-3 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        <h2 className="text-lg font-semibold text-gray-900">
          Welcome Back! Sign In
        </h2>

        <button
          className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
          aria-label="Help"
          onClick={() => alert('Need help? Contact support@example.com')}
          type="button"
        >
          <HelpCircle className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4 px-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 h-1 bg-red-500 rounded-full"></div>
          <div className="flex-1 h-1 bg-red-500 rounded-full"></div>
          <div className="flex-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="flex-1 h-1 bg-gray-300 rounded-full"></div>
        </div>
        <p className="text-center text-sm text-gray-500">Step 2 of 4</p>
      </div>

      {/* Main content container */}
      <div className="flex-1 flex flex-col w-full max-w-md mx-auto relative">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Enter your email
          </h1>
          <p className="text-gray-600">
            We'll send you a verification code or you can sign in with your password
          </p>
        </div>

        <div className="mb-2 relative">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email address
          </label>
          <div className="relative">
            {faviconUrl ? (
              <img
                src={faviconUrl}
                alt="Domain favicon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 rounded"
                onError={() => setFaviconUrl(null)}
              />
            ) : (
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            )}

            {inlineSuggestion &&
              inlineSuggestion.toLowerCase().startsWith(email.toLowerCase()) &&
              email.length < inlineSuggestion.length && (
                <div
                  aria-hidden="true"
                  className="absolute left-10 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-300 select-none whitespace-nowrap"
                  style={{ userSelect: 'none' }}
                >
                  {inlineSuggestion}
                </div>
              )}

            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter your email address"
              autoComplete="email"
              className="relative w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors bg-transparent"
              aria-autocomplete="list"
              aria-expanded={suggestions.length > 0}
              aria-haspopup="listbox"
              aria-controls="email-suggestions"
            />

            {isEmailValid && (
              <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
            )}
          </div>
        </div>

        {suggestions.length > 0 && (
          <div
            id="email-suggestions"
            className="mb-6 mt-1 flex gap-2 overflow-x-auto px-1"
            role="listbox"
            aria-label="Email domain suggestions"
            ref={suggestionsRef}
          >
            {suggestions.map((domain) => (
              <button
                key={domain}
                type="button"
                onClick={() => handleSuggestionClick(domain)}
                className="flex-shrink-0 px-3 py-1 rounded-full border border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-500 transition-colors text-sm whitespace-nowrap"
                role="option"
              >
                @{domain}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-3 mb-8">
          <button
            disabled={!isEmailValid}
            className={`w-full flex items-center justify-center gap-3 py-4 px-4 rounded-lg font-medium transition-all ${
              isEmailValid
                ? 'bg-red-500 text-white hover:bg-red-600 active:scale-98'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            type="button"
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
            type="button"
          >
            <Key className="w-5 h-5" />
            <span>Continue with Code</span>
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            Don't have an account?{' '}
            <button className="text-red-500 font-medium hover:text-red-600" type="button">
              Sign up
            </button>
          </p>

          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18,8A6,6 0 0,0 12,2A6,6 0 0,0 6,8H4C2.89,8 2,8.89 2,10V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V10C22,8.89 21.1,8 20,8H18M12,4A4,4 0 0,1 16,8H8A4,4 0 0,1 12,4Z"/>
            </svg>
            <span className="text-gray-500 text-sm">Your email is secure with us</span>
          </div>
        </div>
      </div>
    </div>
  );
}
