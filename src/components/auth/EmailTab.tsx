import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, Check, X, AlertCircle, Info } from 'lucide-react';

// Types and constants moved to the top for better organization
interface EmailTabProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  showSubmitButton?: boolean;
}

interface EmailProvider {
  name: string;
  domain: string;
  url: string;
}

// Constants moved outside component for better performance
const PREMIUM_DOMAINS: EmailProvider[] = [
  { name: 'Gmail', domain: 'gmail.com', url: 'https://gmail.com' },
  { name: 'Yahoo', domain: 'yahoo.com', url: 'https://yahoo.com' },
  { name: 'Outlook', domain: 'outlook.com', url: 'https://outlook.com' },
  { name: 'iCloud', domain: 'icloud.com', url: 'https://icloud.com' },
  { name: 'ProtonMail', domain: 'protonmail.com', url: 'https://protonmail.com' },
  { name: 'AOL', domain: 'aol.com', url: 'https://aol.com' },
];

const DISPOSABLE_DOMAIN_PATTERNS = [
  /10minutemail/, /mailinator/, /tempmail/, /guerrillamail/, /yopmail/
];

const DEBOUNCE_DELAY = 180; // ms
const TOOLTIP_TEXT = "We'll never share your email. Format: name@example.com";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EmailTab = ({ email, setEmail, onSubmit, showSubmitButton = false }: EmailTabProps) => {
  // State management
  const [focused, setFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [submitted, setSubmitted] = useState(false);
  
  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Helper functions
  const normalizeEmail = (val: string): string => {
    const atIndex = val.indexOf('@');
    if (atIndex === -1) return val; // no @ yet, return raw input
    
    const local = val.slice(0, atIndex);
    const domain = val.slice(atIndex + 1).toLowerCase();
    return `${local}@${domain}`;
  };

  const isDisposableDomain = (domain: string): boolean =>
    DISPOSABLE_DOMAIN_PATTERNS.some(pattern => pattern.test(domain));

  // Email validation logic
  const getValidationMessage = useCallback((emailValue: string): string | null => {
    if (!emailValue) return null;
    if (emailValue.length < 4) return 'Enter at least 4 characters.';
    if (!emailValue.includes('@')) return 'Missing "@" symbol. Example: name@example.com';
    
    const [localPart, domainPart] = emailValue.split('@');
    
    if (!localPart) return 'Please enter your email username (before @)';
    if (!domainPart) return 'Please enter a domain (after @)';
    if (domainPart.length < 5) return 'Incomplete domain. Example: gmail.com';
    if (domainPart.split('.').length < 2 || domainPart.endsWith('.'))
      return 'Invalid domain format. Example: example.com';
    if (isDisposableDomain(domainPart)) return 'Please use a permanent, non-disposable email.';
    
    // Stricter validation
    if (!EMAIL_REGEX.test(normalizeEmail(emailValue))) 
      return 'Please enter a valid email address';
      
    return null;
  }, []);

  // Domain suggestion logic
  const generateSuggestions = useCallback((input: string): string[] => {
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
    return PREMIUM_DOMAINS
      .filter(({ domain }) => domain.startsWith(lowerPartial))
      .slice(0, 6)
      .map(({ domain }) => domain);
  }, []);

  // Derived state
  const validationMessage = (submitted || (!focused && email.length > 0)) 
    ? getValidationMessage(email) 
    : null;
    
  const isValid = !validationMessage && email.length > 0;

  // Effects
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    
    debounceRef.current = setTimeout(() => {
      const newSuggestions = generateSuggestions(email);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0 && focused);
      setHoveredIndex(-1);
    }, DEBOUNCE_DELAY);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [email, focused, generateSuggestions]);

  // Event handlers
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;
    
    switch (e.key) {
      case 'ArrowDown':
        setHoveredIndex((i) => (i + 1) % suggestions.length);
        e.preventDefault();
        break;
      case 'ArrowUp':
        setHoveredIndex((i) => (i - ­1 + suggestions.length) % suggestions.length);
        e.preventDefault();
        break;
      case 'Enter':
        if (hoveredIndex !== -1) {
          const [localPart] = email.split('@');
          setEmail(`${localPart}@${suggestions[hoveredIndex]}`);
          setShowSuggestions(false);
          inputRef.current?.focus();
          e.preventDefault();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        e.preventDefault();
        break;
    }
  };

  const handleFocus = () => {
    setFocused(true);
    setSubmitted(false);
  };

  const handleBlur = () => setTimeout(() => setShowSuggestions(false), 200);

  const clearInput = () => {
    setEmail('');
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (onSubmit) onSubmit(e);
  };

  const selectDomainSuggestion = (domain: string) => {
    const [localPart] = email.split('@');
    setEmail(`${localPart}@${domain}`);
    inputRef.current?.focus();
  };

  // Component rendering
  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      <Label htmlFor="email" className="block font-semibold text-sm mb-1">
        Email address
        <span className="ml-1 font-normal text-gray-400" title={TOOLTIP_TEXT}>
          <Info className="inline-block h-3.5 w-3.5 ml-0.5 mb-0.5" aria-label="Info" />
        </span>
      </Label>

      {/* Input Field */}
      <div className="relative">
        <User
          className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${focused ? 'text-[#ff4747]' : 'text-gray-400'}`}
          title={TOOLTIP_TEXT}
          aria-label="Email icon"
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
          className={`w-full pl-10 pr-10 transition-all focus:outline-none focus:ring-0 ${
            validationMessage ? 'border-red-300' : isValid ? 'border-green-300' : 'border-gray-300'
          }`}
          autoComplete="email"
          aria-invalid={!!validationMessage}
          aria-describedby={validationMessage ? "email-validation-error" : undefined}
        />

        {/* Status icons */}
        {email.length > 0 && (
          <button
            type="button"
            onClick={clearInput}
            tabIndex={0}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear input"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {isValid && (
          <Check
            className="absolute right-8 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500"
            aria-label="Valid email"
          />
        )}
      </div>

      {/* Validation Message */}
      {validationMessage && (
        <div
          className="flex items-start gap-1.5 text-xs text-red-500 mt-1"
          id="email-validation-error"
          role="alert"
        >
          <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
          <span>{validationMessage}</span>
        </div>
      )}

      {/* Domain Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1.5">
          {suggestions.map((domain) => (
            <button
              key={domain}
              type="button"
              onClick={() => selectDomainSuggestion(domain)}
              className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-[#ff4747]/10 hover:text-[#ff4747] transition-colors"
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
          disabled={!isValid}
          className={`w-full mt-4 py-2 rounded-lg font-medium transition-colors ${
            isValid
              ? 'bg-[#ff4747] hover:bg-[#ff2727] text-white'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      )}
    </div>
  );
};

export default EmailTab;