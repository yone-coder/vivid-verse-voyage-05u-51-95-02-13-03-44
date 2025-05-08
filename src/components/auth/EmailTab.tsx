import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, Check, X, AlertCircle, Info } from 'lucide-react';

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

  const validationMessage = getValidationMessage(email);
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

  const handleFocus = () => setFocused(true);
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

  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      <Label htmlFor="email" className="block font-semibold text-sm mb-1">
        Email address
        <span className="ml-1 font-normal text-gray-400" title="format: name@example.com">
          <Info className="inline-block h-3.5 w-3.5 ml-0.5 mb-0.5" aria-label="Info" /> 
        </span>
      </Label>

      {/* Input Field */}
      <div className="relative">
        <User
          className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${focused ? 'text-[#ff4747]' : 'text-gray-400'}`}
          title={tooltip}
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

        {/* Clear Button */}
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

        {/* Success Icon */}
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
          className="flex items-start gap-1.5 text-xs text-red-500 mt-0.5"
          id="email-validation-error"
          role="alert"
        >
          <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
          <span>{validationMessage}</span>
        </div>
      )}

      {/* Suggestions Dropdown */}
      {/* Horizontal domain suggestions */}
{showSuggestions && suggestions.length > 0 && (
  <div className="flex flex-wrap items-center gap-2 mt-2 overflow-x-auto">
    {suggestions.map((domain) => (
      <button
        key={domain}
        type="button"
        onClick={() => {
          const [localPart] = email.split('@');
          setEmail(`${localPart}@${domain}`);
          inputRef.current?.focus();
        }}
        className="px-3 py-1.5 rounded-full bg-gray-100 text-sm text-gray-600 hover:bg-[#ff4747]/10 hover:text-[#ff4747] transition-colors"
      >
        {domain}
      </button>
    ))}
  </div>
)}

      {/* Provider Links Row */}
      <div className="flex flex-wrap gap-2 mt-1.5">
        {premiumDomains.map((d) => (
          <a
            href={d.url}
            target="_blank"
            rel="noopener noreferrer"
            key={d.domain}
            className="text-xs text-gray-400 hover:text-[#ff4747] underline"
          >
            {d.name}
          </a>
        ))}
      </div>

      {/* Submit Button */}
      {showSubmitButton && onSubmit && (
        <button
          type="button"
          onClick={onSubmit}
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