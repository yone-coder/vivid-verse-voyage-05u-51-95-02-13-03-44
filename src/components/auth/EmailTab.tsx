import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, Check, X, AlertCircle, Info, Loader2 } from 'lucide-react';

interface EmailTabProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  showSubmitButton?: boolean;
  rememberedEmails?: string[];
  onRememberEmail?: (email: string) => void;
}

// Expanded premium domains list
const premiumDomains = [
  { name: 'Gmail', domain: 'gmail.com', url: 'https://gmail.com', popularity: 10 },
  { name: 'Yahoo', domain: 'yahoo.com', url: 'https://yahoo.com', popularity: 8 },
  { name: 'Outlook', domain: 'outlook.com', url: 'https://outlook.com', popularity: 7 },
  { name: 'iCloud', domain: 'icloud.com', url: 'https://icloud.com', popularity: 6 },
  { name: 'ProtonMail', domain: 'protonmail.com', url: 'https://protonmail.com', popularity: 5 },
  { name: 'AOL', domain: 'aol.com', url: 'https://aol.com', popularity: 4 },
  { name: 'Zoho', domain: 'zoho.com', url: 'https://zoho.com', popularity: 3 },
  { name: 'Hotmail', domain: 'hotmail.com', url: 'https://outlook.com', popularity: 9 },
];

// Common email typos and corrections
const commonTypos = {
  'gmail.con': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'hotmail.con': 'hotmail.com',
  'yaho.com': 'yahoo.com',
  'yahooo.com': 'yahoo.com',
  'outloo.com': 'outlook.com',
  'outlok.com': 'outlook.com',
};

// Expanded disposable domain patterns
const disposableDomainPatterns = [
  /10minutemail/, /mailinator/, /tempmail/, /guerrillamail/, /yopmail/, 
  /throwawaymail/, /dispostable/, /fakeinbox/, /mailnesia/, /mailcatch/,
  /temp-mail/, /tempinbox/, /getnada/, /tempmailo/, /emailondeck/
];

// Common TLDs for suggestions
const commonTLDs = ['com', 'net', 'org', 'edu', 'io', 'co', 'me'];

// Email validation regex (comprehensive)
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Memo-ized suggestion item to prevent re-renders
const SuggestionItem = memo(({ 
  suggestion, 
  onClick, 
  isHovered 
}: { 
  suggestion: string; 
  onClick: () => void; 
  isHovered: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${
      isHovered 
        ? 'bg-[#ff4747]/15 text-[#ff4747] shadow-sm' 
        : 'bg-gray-100 text-gray-600 hover:bg-[#ff4747]/10 hover:text-[#ff4747]'
    }`}
  >
    @{suggestion}
  </button>
));

SuggestionItem.displayName = 'SuggestionItem';

const EmailTab = ({ 
  email, 
  setEmail, 
  onSubmit, 
  showSubmitButton = false,
  rememberedEmails = [],
  onRememberEmail
}: EmailTabProps) => {
  const [focused, setFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [submitted, setSubmitted] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [typoDetected, setTypoDetected] = useState<string | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Helper: Normalize and lowercase domain
  const normalizeEmail = useCallback((val: string) => {
    const atIndex = val.indexOf('@');
    if (atIndex === -1) return val; // no @ yet, return raw input
    const local = val.slice(0, atIndex);
    const domain = val.slice(atIndex + 1).toLowerCase();
    return `${local}@${domain}`;
  }, []);

  // Helper: Check for domain typos
  const checkForTypos = useCallback((email: string) => {
    const atIndex = email.indexOf('@');
    if (atIndex === -1) return null;
    
    const domain = email.slice(atIndex + 1).toLowerCase();
    
    // Check for common typos
    if (commonTypos[domain as keyof typeof commonTypos]) {
      return commonTypos[domain as keyof typeof commonTypos];
    }
    
    return null;
  }, []);

  // Helper: Detect disposable provider
  const isDisposableDomain = useCallback((domain: string) =>
    disposableDomainPatterns.some((pattern) => pattern.test(domain)),
  []);

  // Improved contextual validation with detailed messages
  const getValidationMessage = useCallback((email: string) => {
    if (!email) return null;
    if (email.length < 4) return 'Enter at least 4 characters.';
    if (!email.includes('@')) return 'Missing "@" symbol. Example: name@example.com';
    
    const [localPart, domainPart] = email.split('@');
    
    if (!localPart) return 'Please enter your email username (before @)';
    if (localPart.length < 2) return 'Username should be at least 2 characters';
    if (/[^a-zA-Z0-9._-]/.test(localPart)) return 'Username contains invalid characters';
    
    if (!domainPart) return 'Please enter a domain (after @)';
    if (domainPart.length < 5) return 'Incomplete domain. Example: gmail.com';
    if (domainPart.split('.').length < 2 || domainPart.endsWith('.'))
      return 'Invalid domain format. Example: example.com';
    
    const tld = domainPart.split('.').pop();
    if (tld && tld.length < 2) return 'Invalid domain extension';
    
    if (isDisposableDomain(domainPart)) return 'Please use a permanent, non-disposable email.';
    
    // Full strict validation
    if (!emailRegex.test(normalizeEmail(email))) return 'Please enter a valid email address';
    
    return null;
  }, [normalizeEmail, isDisposableDomain]);

  const validationMessage = (submitted || (!focused && email.length > 0)) ? getValidationMessage(email) : null;
  const isValid = !validationMessage && email.length > 0;
  
  // Enhanced suggestions generator with smart matching
  const generateSuggestions = useCallback((input: string) => {
    const trimmed = input.trim();
    if (trimmed.length < 3) return [];

    let partialDomain = '';
    let username = trimmed;

    if (trimmed.includes('@')) {
      [username, partialDomain] = trimmed.split('@');
      
      // If domain is complete (includes dot and valid TLD), don't show suggestions
      if (partialDomain.includes('.') && partialDomain.split('.')[1]?.length >= 2) {
        return [];
      }
    }

    if (!username) return [];

    const lowerPartial = partialDomain.toLowerCase();
    let results: string[] = [];
    
    // First: exact domain starts matching
    const exactMatches = premiumDomains
      .filter(({ domain }) => domain.startsWith(lowerPartial))
      .sort((a, b) => b.popularity - a.popularity)
      .map(({ domain }) => domain);
    
    results = [...exactMatches];
    
    // Second: add fuzzy domain matches if no exact matches and we have a partial domain
    if (results.length === 0 && lowerPartial.length > 0) {
      const fuzzyMatches = premiumDomains
        .filter(({ domain }) => domain.includes(lowerPartial))
        .sort((a, b) => b.popularity - a.popularity)
        .map(({ domain }) => domain);
      
      results = [...fuzzyMatches];
    }
    
    // Third: if no domain entered yet but username exists, suggest top domains
    if (partialDomain === '' && username.length > 0) {
      results = premiumDomains
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 4)
        .map(({ domain }) => domain);
    }
    
    // De-duplicate and limit
    return [...new Set(results)].slice(0, 6);
  }, []);

  // Debounced validation, suggestions, and typo detection
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    
    if (!email) {
      setTypoDetected(null);
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    setIsChecking(true);
    
    debounceRef.current = setTimeout(() => {
      // Check for typos
      const possibleTypo = checkForTypos(email);
      setTypoDetected(possibleTypo);
      
      // Generate suggestions
      const newSuggestions = generateSuggestions(email);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0 && focused);
      setHoveredIndex(-1);
      
      setIsChecking(false);
    }, 180);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [email, focused, generateSuggestions, checkForTypos]);

  // Enhanced keyboard navigation with typeahead
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showSuggestions && suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        setHoveredIndex((i) => (i + 1) % suggestions.length);
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        setHoveredIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
        e.preventDefault();
      } else if (e.key === 'Enter' && hoveredIndex !== -1) {
        applySuggestion(suggestions[hoveredIndex]);
        e.preventDefault();
      } else if (e.key === 'Tab' && hoveredIndex !== -1) {
        applySuggestion(suggestions[hoveredIndex]);
        e.preventDefault();
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
        e.preventDefault();
      }
    } else if (e.key === 'Enter' && isValid && showSubmitButton) {
      handleSubmit(e);
    }
    
    // Handle typo correction with Tab
    if (e.key === 'Tab' && typoDetected) {
      const [localPart] = email.split('@');
      setEmail(`${localPart}@${typoDetected}`);
      setTypoDetected(null);
      e.preventDefault();
    }
  };

  const handleFocus = () => {
    setFocused(true);
    if (email && suggestions.length > 0) {
      setShowSuggestions(true);
    }
    setSubmitted(false);
  };

  const handleBlur = () => {
    // Delayed to allow clicking on suggestions
    setTimeout(() => {
      setFocused(false);
      setShowSuggestions(false);
    }, 200);
  };

  // Apply domain suggestion to email
  const applySuggestion = (domain: string) => {
    const [localPart] = email.split('@');
    setEmail(`${localPart}@${domain}`);
    setShowSuggestions(false);
    setTypoDetected(null);
    inputRef.current?.focus();
  };

  const clearInput = () => {
    setEmail('');
    setSuggestions([]);
    setTypoDetected(null);
    inputRef.current?.focus();
  };

  // Enhanced form submit with validation and optional remembering
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    if (!isValid) {
      inputRef.current?.focus();
      return;
    }
    
    // Remember this email if the callback exists
    if (onRememberEmail && isValid && email) {
      onRememberEmail(email);
    }
    
    if (onSubmit) onSubmit(e);
  };

  // Apply a typo correction
  const applyTypoCorrection = () => {
    if (typoDetected) {
      const [localPart] = email.split('@');
      setEmail(`${localPart}@${typoDetected}`);
      setTypoDetected(null);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      <Label htmlFor="email" className="block font-semibold text-sm mb-1">
        Email address
        <span 
          className="ml-1 font-normal text-gray-400" 
          title="We'll never share your email. Format: name@example.com"
        >
          <Info className="inline-block h-3.5 w-3.5 ml-0.5 mb-0.5" aria-label="Email information" />
        </span>
      </Label>

      {/* Input Field with Enhanced Styling */}
      <div className="relative">
        <User
          className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200 ${
            focused ? 'text-[#ff4747]' : isValid ? 'text-green-500' : 'text-gray-400'
          }`}
          aria-hidden="true"
        />
        
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
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="name@example.com"
          className={`w-full pl-10 pr-10 transition-all duration-200 focus:outline-none focus:ring-1 ${
            isChecking 
              ? 'border-blue-200 focus:ring-blue-200'
              : validationMessage 
                ? 'border-red-300 focus:ring-red-200'
                : isValid 
                  ? 'border-green-300 focus:ring-green-200' 
                  : 'border-gray-300 focus:ring-[#ff4747]/30'
          }`}
          autoComplete="email"
          aria-invalid={!!validationMessage}
          aria-describedby={validationMessage ? "email-validation-error" : undefined}
        />

        {/* Status indicators */}
        {isChecking ? (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400 animate-spin" />
        ) : email.length > 0 ? (
          <button
            type="button"
            onClick={clearInput}
            tabIndex={0}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear input"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}

        {/* Success Icon */}
        {isValid && !isChecking && (
          <Check
            className="absolute right-8 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500"
            aria-label="Valid email"
          />
        )}
      </div>

      {/* Typo Suggestion */}
      {typoDetected && !validationMessage && (
        <div className="flex items-center gap-2 text-xs text-blue-600 mt-1.5 animate-fadeIn">
          <Info className="h-3.5 w-3.5 flex-shrink-0" />
          <span>Did you mean <button 
            onClick={applyTypoCorrection}
            className="font-medium underline underline-offset-2 cursor-pointer hover:text-[#ff4747]"
          >
            {email.split('@')[0]}@{typoDetected}
          </button>?</span>
        </div>
      )}

      {/* Validation Message (Below the Input Field) */}
      {validationMessage && (
        <div
          className="flex items-start gap-1.5 text-xs text-red-500 mt-1.5 animate-fadeIn"
          id="email-validation-error"
          role="alert"
        >
          <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
          <span>{validationMessage}</span>
        </div>
      )}

      {/* Suggestions Dropdown with Improved Layout */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="flex flex-wrap gap-2 mt-2 animate-fadeIn"
          role="listbox"
          aria-label="Email domain suggestions"
        >
          {suggestions.map((domain, index) => (
            <SuggestionItem
              key={domain}
              suggestion={domain}
              isHovered={index === hoveredIndex}
              onClick={() => applySuggestion(domain)}
            />
          ))}
        </div>
      )}

      {/* Submit Button with Enhanced States */}
      {showSubmitButton && (
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!isValid || isChecking}
          className={`w-full mt-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            isValid && !isChecking
              ? 'bg-[#ff4747] hover:bg-[#ff2727] text-white shadow-sm hover:shadow'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isChecking ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Checking...
            </span>
          ) : (
            'Continue'
          )}
        </button>
      )}
      
      {/* Previously Used Emails (if provided) */}
      {rememberedEmails && rememberedEmails.length > 0 && (
        <div className="mt-4">
          <p className="text-xs text-gray-500 mb-1.5">Recent emails:</p>
          <div className="flex flex-wrap gap-2">
            {rememberedEmails.slice(0, 3).map((savedEmail) => (
              <button
                key={savedEmail}
                onClick={() => setEmail(savedEmail)}
                className="text-xs px-3 py-1.5 rounded-full bg-gray-50 text-gray-700 hover:bg-[#ff4747]/5 hover:text-[#ff4747] transition-all flex items-center gap-1.5"
              >
                <User className="h-3 w-3" />
                {savedEmail}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTab;