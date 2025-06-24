import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Mail, Lock, Key, Check, HelpCircle } from 'lucide-react';
import Lottie from 'lottie-react'; // Import the Lottie component

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

export default function EmailAuthScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('ht');
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);

  // --- Lottie Animation State and Fetching ---
  const [lottieAnimationData, setLottieAnimationData] = useState(null);
  const lottieAnimationUrl = 'https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json'; // Example Lottie URL for a login/sign-in animation

  useEffect(() => {
    // Fetch the Lottie animation JSON from the URL
    fetch(lottieAnimationUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setLottieAnimationData(data);
      })
      .catch(error => {
        console.error("Error fetching Lottie animation:", error);
        // Optionally handle error, e.g., show a placeholder or skip animation
      });
  }, [lottieAnimationUrl]); // Re-fetch if URL changes (though unlikely for a static URL)
  // --- End Lottie Animation State and Fetching ---

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

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handle email input change and update suggestions
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Validate email
    setIsEmailValid(emailRegex.test(value));

    // Generate domain suggestions only if user typed '@' but hasn't completed domain
    const atIndex = value.indexOf('@');
    if (atIndex > -1) {
      const typedDomainPart = value.slice(atIndex + 1).toLowerCase();

      if (typedDomainPart.length === 0) {
        // Show all suggestions if user just typed '@'
        setSuggestions(commonEmailDomains);
        setShowSuggestions(true);
      } else {
        // Filter suggestions based on typed domain part
        const filtered = commonEmailDomains.filter(domain =>
          domain.startsWith(typedDomainPart)
        );
        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
      }
    } else {
      // No '@' typed yet, hide suggestions
      setShowSuggestions(false);
    }
  };

  // Handle selecting a suggestion
  const handleSuggestionClick = (domain) => {
    const atIndex = email.indexOf('@');
    const newEmail = email.slice(0, atIndex + 1) + domain;
    setEmail(newEmail);
    setIsEmailValid(emailRegex.test(newEmail));
    setShowSuggestions(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900">
          Welcome Back! Please Sign In
        </h2>

        {/* Help Button */}
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
      <div className="mb-8 px-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 h-1 bg-red-500 rounded-full"></div>
          <div className="flex-1 h-1 bg-red-500 rounded-full"></div>
          <div className="flex-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="flex-1 h-1 bg-gray-300 rounded-full"></div>
        </div>
        <p className="text-center text-sm text-gray-500">Step 2 of 4</p>
      </div>

      <div className="flex-1 flex flex-col justify-center w-full max-w-md mx-auto relative">
        {/* --- Lottie Animation Section --- */}
        {lottieAnimationData ? ( // Only render Lottie if data is loaded
          <div className="mb-8 flex justify-center items-center">
            <Lottie
              animationData={lottieAnimationData}
              loop={true} // Set to true for continuous loop
              autoplay={true} // Set to true to start animation automatically
              style={{ height: 150, width: 150 }} // Adjust size as needed
            />
          </div>
        ) : (
          // Optional: Add a placeholder or loading indicator while fetching
          <div className="mb-8 flex justify-center items-center h-[150px]">
            <div className="text-gray-400 text-sm">Loading animation...</div>
          </div>
        )}
        {/* --- End Lottie Animation Section --- */}

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
        <div className="mb-8 relative" ref={suggestionsRef}>
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
              autoComplete="email"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
              aria-autocomplete="list"
              aria-controls="email-suggestions"
              aria-expanded={showSuggestions}
              aria-haspopup="listbox"
            />
            {isEmailValid && (
              <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
            )}
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <ul
              id="email-suggestions"
              role="listbox"
              className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-auto"
            >
              {suggestions.map((domain) => (
                <li
                  key={domain}
                  role="option"
                  tabIndex={0}
                  onClick={() => handleSuggestionClick(domain)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSuggestionClick(domain);
                    }
                  }}
                  className="cursor-pointer px-4 py-2 hover:bg-red-100"
                >
                  {email.slice(0, email.indexOf('@') + 1)}<strong>{domain}</strong>
                </li>
              ))}
            </ul>
          )}
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

        {/* Help Text */}
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
