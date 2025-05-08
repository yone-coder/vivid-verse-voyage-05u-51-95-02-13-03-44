import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, Check, X } from 'lucide-react';

interface EmailTabProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  showSubmitButton?: boolean;
}

const EmailTab = ({ email, setEmail, onSubmit, showSubmitButton = false }: EmailTabProps) => {
  const [focused, setFocused] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Prioritized list of email domains (most popular first)
  const premiumDomains = [
    'gmail.com',     // Most common
    'yahoo.com',
    'outlook.com',
    'icloud.com',
    'hotmail.com',
    'protonmail.com',
    'aol.com',
  ];

  // Generate email suggestions
  const generateSuggestions = useCallback((inputEmail: string) => {
    if (!inputEmail.includes('@')) return []; // Only suggest after '@' is typed

    const [username, partialDomain] = inputEmail.split('@');
    if (!partialDomain || partialDomain.includes('.')) return []; // Skip if domain is complete

    const lowerPartial = partialDomain.toLowerCase();
    
    // Filter domains that match the partial input (case-insensitive)
    const matchedDomains = premiumDomains.filter(domain => 
      domain.toLowerCase().startsWith(lowerPartial)
    );

    // Remove duplicates and limit to 5 suggestions
    const uniqueSuggestions = Array.from(new Set(matchedDomains))
      .slice(0, 5)
      .map(domain => `${username}@${domain}`);

    return uniqueSuggestions;
  }, []);

  // Debounced validation & suggestion generation
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (email.length > 0) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValid(emailRegex.test(email));

        const newSuggestions = generateSuggestions(email);
        setSuggestions(newSuggestions);
        setShowSuggestions(newSuggestions.length > 0 && focused);
      } else {
        setIsValid(null);
        setShowSuggestions(false);
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
    <div className="w-full max-w-md mx-auto">
      <Label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
        Email or username
      </Label>
      
      <div className="relative">
        <User className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${
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
          className={`w-full pl-10 pr-10 py-2 bg-white border border-gray-200 rounded-lg transition-all duration-200 ${
            focused ? 'ring-1 ring-[#ff4747] border-[#ff4747]' : 
            isValid === true ? 'border-gray-300' : 
            isValid === false ? 'border-red-300' : 'border-gray-200'
          }`}
          required
          autoComplete="email"
        />
        
        {email.length > 0 && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear input"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        
        {isValid === true && email.length > 0 && (
          <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
        )}
      </div>
      
      {isValid === false && email.length > 0 && (
        <p className="mt-1 text-xs text-red-500">
          Please enter a valid email address
        </p>
      )}
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg py-1">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
              onClick={() => selectSuggestion(suggestion)}
              onKeyDown={(e) => e.key === 'Enter' && selectSuggestion(suggestion)}
              tabIndex={0}
              role="option"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
      
      {showSubmitButton && onSubmit && (
        <div className="mt-4">
          <button 
            type="button"
            onClick={onSubmit}
            disabled={!isValid}
            className={`w-full flex items-center justify-center text-white font-medium py-2 px-4 rounded-lg transition-all ${
              isValid 
                ? 'bg-[#ff4747] hover:bg-[#ff2727]' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailTab;