,import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, Check, X, AlertCircle } from 'lucide-react';

interface EmailTabProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  showSubmitButton?: boolean;
}

const EmailTab = ({ email, setEmail, onSubmit, showSubmitButton = false }: EmailTabProps) => {
  const [focused, setFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Domain suggestions (prioritized by popularity)
  const premiumDomains = [
    'gmail.com', 'yahoo.com', 'outlook.com', 
    'icloud.com', 'protonmail.com', 'aol.com'
  ];

  // Contextual validation messages
  const getValidationMessage = (email: string) => {
    if (!email) return null;

    if (!email.includes('@')) {
      return 'Missing "@" symbol. Example: user@example.com';
    }

    const [localPart, domainPart] = email.split('@');

    if (!localPart) {
      return 'Please enter your email username (before @)';
    }

    if (!domainPart) {
      return 'Please enter a domain (after @)';
    }

    if (!domainPart.includes('.')) {
      return 'Domain is incomplete. Example: gmail.com';
    }

    if (domainPart.split('.').length < 2 || domainPart.endsWith('.')) {
      return 'Invalid domain format. Example: example.com';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }

    return null;
  };

  const validationMessage = getValidationMessage(email);
  const isValid = !validationMessage && email.length > 0;

  // Generate suggestions
  const generateSuggestions = useCallback((input: string) => {
    if (!input.includes('@')) return [];
    
    const [username, partialDomain] = input.split('@');
    if (!partialDomain || partialDomain.includes('.')) return [];

    return premiumDomains
      .filter(domain => domain.startsWith(partialDomain.toLowerCase()))
      .slice(0, 3)
      .map(domain => `${username}@${domain}`);
  }, []);

  // Debounced validation and suggestions
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (email) {
        const newSuggestions = generateSuggestions(email);
        setSuggestions(newSuggestions);
        setShowSuggestions(newSuggestions.length > 0 && focused);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [email, focused, generateSuggestions]);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setTimeout(() => setShowSuggestions(false), 200);

  const selectSuggestion = (suggestion: string) => {
    setEmail(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const clearInput = () => {
    setEmail('');
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-1">
      {/* Input Field */}
      <div className="relative">
        <User className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
          focused ? 'text-[#ff4747]' : 'text-gray-400'
        }`} />
        
        <Input
  ref={inputRef}
  id="email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  onFocus={handleFocus}
  onBlur={handleBlur}
  placeholder="name@example.com"
  className={`w-full pl-10 pr-10 appearance-none outline-none shadow-none ring-0 focus:outline-none focus:ring-0 ${  
    validationMessage ? 'border-red-300' : isValid ? 'border-green-300' : 'border-gray-300'  
  }`}  
  autoComplete="email"
/>
        
        {email.length > 0 && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear input"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        
        {isValid && (
          <Check className="absolute right-8 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
        )}
      </div>

      {/* Validation Message */}
      {validationMessage && (
        <div className="flex items-start gap-1.5 text-xs text-red-500">
          <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
          <span>{validationMessage}</span>
        </div>
      )}

      {/* Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="mt-1 border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion}
              className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
              onClick={() => selectSuggestion(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}

      {/* Submit Button */}
      {showSubmitButton && onSubmit && (
        <button
          type="button"
          onClick={onSubmit}
          disabled={!isValid}
          className={`w-full mt-4 py-2 rounded-lg transition-colors ${
            isValid ? 'bg-[#ff4747] hover:bg-[#ff2727] text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      )}
    </div>
  );
};

export default EmailTab;