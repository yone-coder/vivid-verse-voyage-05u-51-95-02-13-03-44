import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, Mail, HelpCircle, Check, X } from 'lucide-react';

const COMMON_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'protonmail.com',
  'proton.me',
  'icloud.com',
];

// Your new email SVG converted to base64 data URL
const EMAIL_SVG = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij4KPHBhdGggZmlsbD0iI2QxYzRlOSIgZD0iTTQyLjQ0OSw5LjI2NEwyNi4zNTUsMjIuMDg4Yy0xLjQwMSwxLjExNy0zLjQwNCwxLjExMi00LjgtMC4wMUw1LjUzNSw5LjE5OElDNC45MDksOC43MjEsNCw5LjE2MSw0LDkuOTQxdjUuNjAzdjE5LjczMmMwLDIuMDc2LDEuNzA2LDMuNzU4LDMuODEsMy43NThINDAuMTljMi4xMDQsMCwzLjgxLTEuNjgzLDMuODEtMy43NThWOS45OTUJQzQ0LDkuMjA1LDQzLjA3Miw4Ljc2Nyw0Mi40NDksOS4yNjR6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzdjNGRmZiIgZD0iTTM1LjQyOSwxNC44NThsLTEzLjc5LDEwLjk4OGMtMS40LDEuMTE1LTMuMzk5LDEuMTEyLTQuNzk2LTAuMDA3TDQsMTUuNTQ1djE5LjczMgljMCwyLjA3NiwxLjcwNiwzLjc1OCwzLjgxLDMuNzU4aDI3LjYxOVYxNC44NTh6Ij48L3BhdGg+Cjwvc3ZnPg==';

const GMAIL_SVG = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij4KPHBhdGggZmlsbD0iIzRjYWY1MCIgZD0iTTQ1LDE2LjJsLTUsMi43NWwtNSw0Ljc1TDM1LDQwaDdjMS42NTcsMCwzLTEuMzQzLDMtM1YxNi4yeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMxZTg4ZTUiIGQ9Ik0zLDE2LjJsMy42MTQsMS43MUwxMywyMy43VjQwSDZjLTEuNjU3LDAtMy0xLjM0My0zLTNWMTYuMnoiPjwvcGF0aD4KPHBvbHlnb24gZmlsbD0iI2U1MzkzNSIgcG9pbnRzPSIzNSwxMS4yIDI0LDE5LjQ1IDEzLDExLjIgMTIsMTcgMTMsMjMuNyAyNCwzMS45NSAzNSwyMy43IDM2LDE3Ij48L3BvbHlnb24+PHBhdGggZmlsbD0iI2M2MjgyOCIgZD0iTTMsMTIuMjk4VjE2LjJsMTAsNy41VjExLjJMOS44NzYsOC44NTlDOS4xMzIsOC4zMDEsOC4yMjgsOCw3LjI5OCw4aDBDNC45MjQsOCwzLDkuOTI0LDMsMTIuMjk4eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmYmMwMmQiIGQ9Ik00NSwxMi4yOThWMTYuMmwtMTAsNy42VjExLjJsMy4xMjQtMi4zNDFDMzguODY4LDguMzAxLDM5Ljc3Miw4LDQwLjcwMiw4aDAgQzQzLjA3Niw4LDQ1LDkuOTI0LDQ1LDEyLjI5OHoiPjwvcGF0aD4KPC9zdmc+';

const FAVICON_OVERRIDES: Record<string, string> = {
  'gmail.com': GMAIL_SVG,
  'yahoo.com': 'https://s.yimg.com/rz/l/favicon.ico',
  'outlook.com': 'https://outlook.com/favicon.ico',
  'hotmail.com': 'https://outlook.com/favicon.ico',
  'icloud.com': 'https://www.icloud.com/favicon.ico',
  'protonmail.com': EMAIL_SVG,
  'proton.me': EMAIL_SVG,
};

// Email checking states - like a traffic light system
type EmailCheckState = 'unchecked' | 'checking' | 'exists' | 'not-exists' | 'error';

interface EmailAuthScreenProps {
  onBack: () => void;
  selectedLanguage: string;
  onContinueWithPassword: (email: string) => void;
  onContinueWithCode: (email: string) => void;
  initialEmail?: string;
}

const EmailAuthScreen: React.FC<EmailAuthScreenProps> = ({
  onBack,
  selectedLanguage,
  onContinueWithPassword,
  onContinueWithCode,
  initialEmail = '',
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDomain, setCurrentDomain] = useState('');
  const [faviconUrl, setFaviconUrl] = useState('');
  const [showFavicon, setShowFavicon] = useState(false);
  const [showDomainSuggestions, setShowDomainSuggestions] = useState(false);
  
  // New state for email checking - this tracks the backend verification
  const [emailCheckState, setEmailCheckState] = useState<EmailCheckState>('unchecked');
  const [lastCheckedEmail, setLastCheckedEmail] = useState('');
  
  const emailInputRef = useRef<HTMLInputElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Function to check email with backend API
  const checkEmailExists = useCallback(async (emailToCheck: string): Promise<boolean> => {
    try {
      const response = await fetch('https://supabase-y8ak.onrender.com/api/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailToCheck }),
      });

      const data = await response.json();
      
      if (data.success) {
        return data.exists;
      } else {
        throw new Error(data.message || 'Failed to check email');
      }
    } catch (error) {
      console.error('Error checking email:', error);
      throw error;
    }
  }, []);

  // Debounced email checking - waits for user to stop typing before checking
  const debouncedEmailCheck = useCallback((emailToCheck: string) => {
    // Clear any existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set new timeout - this is like waiting for someone to stop knocking
    debounceTimeoutRef.current = setTimeout(async () => {
      // Only check if email is valid and different from last checked
      if (emailRegex.test(emailToCheck) && emailToCheck !== lastCheckedEmail) {
        setEmailCheckState('checking');
        
        try {
          const exists = await checkEmailExists(emailToCheck);
          setEmailCheckState(exists ? 'exists' : 'not-exists');
          setLastCheckedEmail(emailToCheck);
        } catch (error) {
          setEmailCheckState('error');
          setLastCheckedEmail(emailToCheck);
        }
      }
    }, 800); // Wait 800ms after user stops typing - good balance between responsiveness and API efficiency
  }, [checkEmailExists, lastCheckedEmail]);

  // Extract domain from email
  const extractDomain = (emailValue: string): string => {
    if (!emailValue.includes('@')) return '';
    const parts = emailValue.split('@');
    if (parts.length !== 2) return '';
    const domain = parts[1].trim();
    return domain.includes('.') && domain.length > 3 ? domain : '';
  };

  // Function to update favicon based on email value
  const updateFavicon = (emailValue: string) => {
    const domain = extractDomain(emailValue);
    setCurrentDomain(domain);

    if (domain) {
      const url = FAVICON_OVERRIDES[domain] || `https://www.google.com/s2/favicons?domain=${domain}&sz=20`;
      setFaviconUrl(url);
      setShowFavicon(true);
    } else {
      setFaviconUrl('');
      setShowFavicon(false);
    }
  };

  // Update domain and favicon when email changes
  useEffect(() => {
    updateFavicon(email);
  }, [email]);

  // Handle autofill detection with multiple strategies
  useEffect(() => {
    const input = emailInputRef.current;
    if (!input) return;

    const syncWithDOM = () => {
      const domValue = input.value;
      if (domValue !== email && domValue.length > 0) {
        setEmail(domValue);
        updateFavicon(domValue);
        return true;
      }
      return false;
    };

    const handleFocus = () => {
      setTimeout(syncWithDOM, 50);
      setTimeout(syncWithDOM, 200);
      setTimeout(syncWithDOM, 500);
    };

    const handleBlur = () => {
      syncWithDOM();
    };

    const handleInput = (e: Event) => {
      syncWithDOM();
    };

    const handleChange = (e: Event) => {
      syncWithDOM();
    };

    const observer = new MutationObserver(() => {
      syncWithDOM();
    });

    observer.observe(input, {
      attributes: true,
      attributeFilter: ['value']
    });

    const pollInterval = setInterval(() => {
      syncWithDOM();
    }, 100);

    const stopPolling = setTimeout(() => {
      clearInterval(pollInterval);
    }, 5000);

    input.addEventListener('focus', handleFocus);
    input.addEventListener('blur', handleBlur);
    input.addEventListener('input', handleInput);
    input.addEventListener('change', handleChange);

    setTimeout(syncWithDOM, 100);

    return () => {
      clearInterval(pollInterval);
      clearTimeout(stopPolling);
      observer.disconnect();
      input.removeEventListener('focus', handleFocus);
      input.removeEventListener('blur', handleBlur);
      input.removeEventListener('input', handleInput);
      input.removeEventListener('change', handleChange);
    };
  }, [email]);

  // Validate email format and trigger backend checking
  useEffect(() => {
    const isValid = emailRegex.test(email);
    setIsEmailValid(isValid);

    // Reset check state when email becomes invalid
    if (!isValid) {
      setEmailCheckState('unchecked');
      setLastCheckedEmail('');
    } else {
      // Trigger debounced email checking for valid emails
      debouncedEmailCheck(email);
    }
  }, [email, debouncedEmailCheck]);

  // Initialize with initial email
  useEffect(() => {
    if (initialEmail) {
      setIsEmailValid(emailRegex.test(initialEmail));
    }
  }, [initialEmail]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  const handleEmailChange = (value: string) => {
    setEmail(value);

    // Show domain suggestions when user types @ at the end or has @ but no domain yet
    const atIndex = value.lastIndexOf('@');
    if (atIndex !== -1) {
      const afterAt = value.slice(atIndex + 1);
      setShowDomainSuggestions(afterAt === '' || (!afterAt.includes('.') && afterAt.length < 15));
    } else {
      setShowDomainSuggestions(false);
    }
  };

  const handleDomainClick = (domain: string) => {
    const atIndex = email.lastIndexOf('@');
    const localPart = atIndex === -1 ? email : email.slice(0, atIndex);
    const newEmail = `${localPart}@${domain}`;
    setEmail(newEmail);
    setShowDomainSuggestions(false);
    emailInputRef.current?.focus();
  };

  const handleContinueWithPassword = async () => {
    // Only allow password continuation if email exists in database
    if (!isEmailValid || isLoading || emailCheckState !== 'exists') return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Brief delay for UX
      onContinueWithPassword(email);
    } catch (error) {
      console.error('Error continuing with password:', error);
      onContinueWithPassword(email);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueWithCode = () => {
    // Allow code verification for both existing and new emails
    if (!isEmailValid || isLoading || emailCheckState === 'checking') return;
    onContinueWithCode(email);
  };

  const handleFaviconError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setShowFavicon(false);
  };

  const handleFaviconLoad = () => {
    // Icon loaded successfully
  };

  // Determine what to show in the right side of input based on email check state
  const getRightSideIcon = () => {
    if (isLoading) {
      // Show spinner when doing final authentication - this happens after email check is complete
      return (
        <div className="w-5 h-5">
          <svg className="animate-spin text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        </div>
      );
    }

    if (emailCheckState === 'checking') {
      // Show blue spinner when actively checking email existence with backend
      return (
        <div className="w-5 h-5">
          <svg className="animate-spin text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        </div>
      );
    }

    if (emailCheckState === 'exists') {
      // Show green checkmark when email exists in database - user can log in
      return <Check className="w-5 h-5 text-green-500" />;
    }

    if (emailCheckState === 'not-exists') {
      // Show red X when email is not found in database - clearer feedback than no icon
      return <X className="w-5 h-5 text-red-500" />;
    }

    if (emailCheckState === 'error') {
      // Show exclamation mark for API errors - different from "not found"
      return (
        <div className="w-5 h-5">
          <svg className="text-orange-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </div>
      );
    }

    // For unchecked state, show nothing - user hasn't entered a valid email yet
    return null;
  };

  // Determine button states based on email check status
  const getPasswordButtonState = () => {
    if (!isEmailValid) return { disabled: true, text: 'Continue with Password' };
    if (emailCheckState === 'checking') return { disabled: true, text: 'Checking...' };
    if (emailCheckState === 'exists') return { disabled: false, text: 'Continue with Password' };
    if (emailCheckState === 'not-exists') return { disabled: true, text: 'Account Not Found' };
    if (emailCheckState === 'error') return { disabled: true, text: 'Check Connection' };
    return { disabled: true, text: 'Continue with Password' };
  };

  const getCodeButtonState = () => {
    if (!isEmailValid) return { disabled: true, text: 'Send Verification Code' };
    if (emailCheckState === 'checking') return { disabled: true, text: 'Checking...' };
    if (emailCheckState === 'exists') return { disabled: false, text: 'Send Login Code' };
    if (emailCheckState === 'not-exists') return { disabled: false, text: 'Create Account' };
    if (emailCheckState === 'error') return { disabled: false, text: 'Send Verification Code' };
    return { disabled: true, text: 'Send Verification Code' };
  };

  const passwordButtonState = getPasswordButtonState();
  const codeButtonState = getCodeButtonState();

  return (
    <div className="min-h-screen bg-white flex flex-col px-4">
      {/* Header */}
      <div className="pt-2 pb-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
          aria-label="Go back"
          disabled={isLoading}
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        <h2 className="text-lg font-semibold text-gray-900">
          Continue with Email
        </h2>

        <button
          className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
          aria-label="Help"
          onClick={() => alert('Need help? Contact support@example.com')}
          type="button"
          disabled={isLoading}
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
      </div>

      {/* Main content container */}
      <div className="flex-1 flex flex-col w-full max-w-md mx-auto relative">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            What's your email?
          </h1>
          <p className="text-gray-600">
            We'll check if you have an account or create a new one
          </p>
        </div>

        {/* Email input */}
        <div className="mb-2 relative">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email address
          </label>
          <div className="relative">
            {/* Left side - Email icon or Favicon */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10">
              {showFavicon && faviconUrl ? (
                <img
                  src={faviconUrl}
                  alt={`${currentDomain} favicon`}
                  className="w-full h-full object-contain"
                  onError={handleFaviconError}
                  onLoad={handleFaviconLoad}
                />
              ) : (
                <Mail className="w-full h-full text-gray-400" />
              )}
            </div>

            {/* Right side - Status icon based on email check state */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
              {getRightSideIcon()}
            </div>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="Enter your email address"
              autoComplete="email"
              ref={emailInputRef}
              disabled={isLoading}
              className="relative w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors bg-transparent disabled:opacity-50"
            />
          </div>
        </div>

        {/* Domain suggestions as buttons - only show when typing @ */}
        {showDomainSuggestions && (
          <div className="mb-6 flex flex-wrap gap-3">
            {COMMON_DOMAINS.map((domainOption) => (
              <button
                key={domainOption}
                type="button"
                onClick={() => handleDomainClick(domainOption)}
                disabled={isLoading}
                className="px-3 py-1 rounded-full border border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-600 transition-colors active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                @{domainOption}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-3 mb-8">
          {/* Password button - only enabled when email exists */}
          <button
            disabled={passwordButtonState.disabled || isLoading}
            onClick={handleContinueWithPassword}
            className={`w-full flex items-center justify-center gap-3 py-4 px-4 rounded-lg font-medium transition-all ${
              !passwordButtonState.disabled && !isLoading
                ? 'bg-red-500 text-white hover:bg-red-600 active:scale-98'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            type="button"
          >
            <Mail className="w-5 h-5" />
            <span>{passwordButtonState.text}</span>
          </button>

          {/* Code button - enabled for both existing and new emails */}
          <button
            disabled={codeButtonState.disabled || isLoading}
            onClick={handleContinueWithCode}
            className={`w-full flex items-center justify-center gap-3 py-4 px-4 border-2 rounded-lg font-medium transition-all ${
              !codeButtonState.disabled && !isLoading
                ? 'border-red-500 text-red-500 hover:bg-red-50 active:scale-98'
                : 'border-gray-300 text-gray-400 cursor-not-allowed'
            }`}
            type="button"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            <span>{codeButtonState.text}</span>
          </button>
        </div>

        {/* Status message based on email check state */}
        {emailCheckState === 'error' && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm text-center">
              Connection issue. You can still continue with verification code.
            </p>
          </div>
        )}

        <div className="text-center">
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => alert('Redirect to sign up')}
                className="text-red-500 hover:underline font-medium focus:outline-none"
                disabled={isLoading}
              >
                Sign up
              </button>
            </p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M18,8A6,6 0 0,0 12,2A6,6 0 0,0 6,8H4C2.89,8 2,8.89 2,10V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V10C22,8.89 21.1,8 20,8H18M12,4A4,4 0 0,1 16,8H8A4,4 0 0,1 12,4Z" />
            </svg>
            <span className="text-gray-500 text-sm">Your email is safe with us</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailAuthScreen;