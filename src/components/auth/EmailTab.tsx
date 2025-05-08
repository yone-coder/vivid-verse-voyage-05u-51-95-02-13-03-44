import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, Check, X, AlertCircle, Info, Loader2 } from 'lucide-react';

interface EmailTabProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  showSubmitButton?: boolean;
}

const premiumDomains = [
  { name: 'Gmail', domain: 'gmail.com', url: 'https://gmail.com' },
  { name: 'Yahoo', domain: 'yahoo.com', url: 'https://yahoo.com' },
  { name: 'Outlook', domain: 'outlook.com', url: 'https://outlook.com' },
  { name: 'iCloud', domain: 'icloud.com', url: 'https://icloud.com' },
  { name: 'ProtonMail', domain: 'protonmail.com', url: 'https://protonmail.com' },
  { name: 'AOL', domain: 'aol.com', url: 'https://aol.com' },
];

const disposableDomainPatterns = [
  /10minutemail/, /mailinator/, /tempmail/, /guerrillamail/, /yopmail/
];

const EmailTab = ({ email, setEmail, onSubmit, showSubmitButton = false }: EmailTabProps) => {
  const [focused, setFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [submitted, setSubmitted] = useState(false);
  const [checking, setChecking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Helper: Normalize and lowercase domain
  const normalizeEmail = (val: string) => {
    const atIndex = val.indexOf('@');
    if (atIndex === -1) return val; // no @ yet, return raw input
    const local = val.slice(0, atIndex);
    const domain = val.slice(atIndex + 1).toLowerCase();
    return `${local}@${domain}`;
  };

  // Helper: Detect disposable provider
  const isDisposableDomain = (domain: string) =>
    disposableDomainPatterns.some((pattern) => pattern.test(domain));

  // Contextual validation
  const getValidationMessage = (email: string) => {
    if (!email) return null;
    if (email.length < 4) return 'Enter at least 4 characters.';
    if (!email.includes('@')) return 'Missing "@" symbol. Example: name@example.com';
    const [localPart, domainPart] = email.split('@');
    if (!localPart) return 'Please enter your email username (before @)';
    if (!domainPart) return 'Please enter a domain (after @)';
    if (domainPart.length < 5) return 'Incomplete domain. Example: gmail.com';
    if (domainPart.split('.').length < 2 || domainPart.endsWith('.'))
      return 'Invalid domain format. Example: example.com';
    if (isDisposableDomain(domainPart)) return 'Please use a permanent, non-disposable email.';
    // Stricter validation
    const strictRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!strictRegex.test(normalizeEmail(email))) return 'Please enter a valid email address';
    return null;
  };

  const validationMessage = (submitted || (!focused && email.length > 0)) ? getValidationMessage(email) : null;
  const isValid = !validationMessage && email.length > 0;

  // Suggest domains as user types
  const generateSuggestions = useCallback((input: string) => {
    const trimmed = input.trim();
    if (trimmed.length < 3) return [];

    let partialDomain = '';
    let username = trimmed;

    if (trimmed.includes('@')) {
      [username, partialDomain] = trimmed.split('@');
      // If domain includes dot, assume complete — don't show suggestions
      if (partialDomain.includes('.')) return [];
    }

    if (!username) return [];

    const lowerPartial = partialDomain.toLowerCase();
    return premiumDomains
      .filter(({ domain }) => domain.startsWith(lowerPartial))
      .slice(0, 6)
      .map(({ domain }) => domain);
  }, []);

  // Simulate validation check
  useEffect(() => {
    if (email.includes('@') && email.includes('.') && email.length > 8) {
      setChecking(true);
      const timer = setTimeout(() => {
        setChecking(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [email]);

  // Debounced validation and suggestions
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const newSuggestions = generateSuggestions(email);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0 && focused);
      setHoveredIndex(-1);
    }, 180);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [email, focused, generateSuggestions]);

  // Keyboard navigation (ArrowDown/Up/Enter/Escape)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      setHoveredIndex((i) => (i + 1) % suggestions.length);
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      setHoveredIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
      e.preventDefault();
    } else if (e.key === 'Enter' && hoveredIndex !== -1) {
      setEmail(suggestions[hoveredIndex]);
      setShowSuggestions(false);
      inputRef.current?.focus();
      e.preventDefault();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      e.preventDefault();
    }
  };

  const handleFocus = () => {
    setFocused(true);
    setSubmitted(false);
  };

  const handleBlur = () => setTimeout(() => setShowSuggestions(false), 200);

  const selectSuggestion = (suggestion: string) => {
    setEmail(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const clearInput = () => {
    setEmail('');
    setSuggestions([]);
    inputRef.current?.focus();
  };

  // Tooltip on input icon
  const tooltip = "We'll never share your email. Format: name@example.com";

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (onSubmit && isValid) onSubmit(e);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      <Label htmlFor="email" className="block font-medium text-sm mb-1.5 text-gray-700 flex items-center">
        Email address
        <div className="relative group ml-1.5">
          <Info 
            className="h-3.5 w-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" 
            aria-label="Info" 
          />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-48 p-2 bg-gray-800 text-xs text-white rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
            {tooltip}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
          </div>
        </div>
      </Label>

      {/* Input Field */}
      <div className="relative">
        <div className={`absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-5 w-5 transition-all duration-200 ${focused ? 'text-[#ff4747]' : 'text-gray-400'}`}>
          <User className="h-[15px] w-[15px]" />
        </div>
        
        <Input
          ref={inputRef}
          id="email"
          type="email"
          spellCheck="false"
          autoCorrect="off"
          autoCapitalize="none"
          value={email}
          onChange={(e) => setEmail(normalizeEmail(e.target.value))}
          onFocus={handleFocus}
          onBlur={() => {
            setFocused(false);
            handleBlur();
          }}
          onKeyDown={handleKeyDown}
          placeholder="name@example.com"
          className={`w-full pl-10 pr-10 h-11 text-sm transition-all duration-200 focus:ring-1 focus:ring-offset-0 focus:outline-none shadow-sm ${
            validationMessage 
              ? 'border-red-300 focus:border-red-400 focus:ring-red-200 bg-red-50' 
              : isValid 
                ? 'border-green-300 focus:border-green-400 focus:ring-green-200 bg-green-50' 
                : focused 
                  ? 'border-[#ff4747]/30 focus:border-[#ff4747] focus:ring-[#ff4747]/20' 
                  : 'border-gray-200 hover:border-gray-300 focus:border-gray-400 focus:ring-gray-200'
          }`}
          autoComplete="email"
          aria-invalid={!!validationMessage}
          aria-describedby={validationMessage ? "email-validation-error" : undefined}
        />

        {/* Status Indicators */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {/* Checking Indicator */}
          {checking && (
            <Loader2 className="h-4 w-4 text-gray-400 animate-spin mr-1" aria-label="Checking email" />
          )}
          
          {/* Clear Button */}
          {email.length > 0 && (
            <button
              type="button"
              onClick={clearInput}
              tabIndex={0}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-colors"
              aria-label="Clear input"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Success Icon */}
          {isValid && !checking && (
            <Check
              className="h-4 w-4 text-green-500 animate-fadeIn"
              aria-label="Valid email"
            />
          )}
        </div>
      </div>

      {/* Validation Message */}
      {validationMessage && (
        <div
          className="flex items-start gap-1.5 text-xs text-red-500 mt-1.5 bg-red-50 px-3 py-1.5 rounded border border-red-100 animate-slideIn"
          id="email-validation-error"
          role="alert"
        >
          <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
          <span>{validationMessage}</span>
        </div>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="flex flex-wrap gap-2 mt-2 animate-fadeIn"
        >
          {suggestions.map((domain, index) => (
            <button
              key={domain}
              type="button"
              onClick={() => {
                const [localPart] = email.split('@');
                setEmail(`${localPart}@${domain}`);
                inputRef.current?.focus();
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              className={`text-xs px-3 py-1.5 rounded-full transition-all duration-150 ${
                hoveredIndex === index
                  ? 'bg-[#ff4747]/10 text-[#ff4747] shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-[#ff4747]/5 hover:text-[#ff4747]/90'
              }`}
            >
              @{domain}
            </button>
          ))}
        </div>
      )}

      {/* Submit Button */}
      {showSubmitButton && (
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!isValid || checking}
          className={`w-full mt-4 py-2.5 rounded-lg font-medium transition-all duration-200 relative overflow-hidden ${
            isValid && !checking
              ? 'bg-[#ff4747] hover:bg-[#ff2727] text-white shadow-sm hover:shadow'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {checking ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Checking...
            </span>
          ) : (
            <>
              <span className="relative z-10">Continue</span>
              {isValid && (
                <div className="absolute inset-0 bg-[#ff2727] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></div>
              )}
            </>
          )}
        </button>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateY(-5px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
        .animate-slideIn {
          animation: slideIn 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default EmailTab;