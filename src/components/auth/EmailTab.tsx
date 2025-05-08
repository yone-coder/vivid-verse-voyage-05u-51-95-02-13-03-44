import React, { useState, useRef, useEffect } from 'react';
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

  // Premium email domains for suggestions
  const premiumDomains = ['gmail.com', 'outlook.com', 'yahoo.com', 'icloud.com', 'protonmail.com'];

  useEffect(() => {
    // Debounced email validation
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (email.length > 0) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValid(emailRegex.test(email));
        
        // Generate email suggestions
        if (email.includes('@') && !email.split('@')[1]?.includes('.')) {
          const username = email.split('@')[0];
          const partialDomain = email.split('@')[1] || '';
          
          const filteredDomains = premiumDomains.filter(domain => 
            domain.startsWith(partialDomain)
          );
          
          const emailSuggestions = filteredDomains.map(domain => `${username}@${domain}`);
          setSuggestions(emailSuggestions);
          setShowSuggestions(emailSuggestions.length > 0);
        } else {
          setShowSuggestions(false);
        }
      } else {
        setIsValid(null);
        setShowSuggestions(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [email]);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => {
    setFocused(false);
    // Delay hiding suggestions to allow clicks
    setTimeout(() => setShowSuggestions(false), 200);
  };

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
      <div>
        <Label 
          htmlFor="email" 
          className="block text-sm font-medium mb-2 text-gray-700"
        >
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
        
        {showSuggestions && (
          <div className="absolute z-10 mt-1 w-full max-w-md bg-white border border-gray-100 rounded-lg shadow-lg py-1">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                onClick={() => selectSuggestion(suggestion)}
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
              onClick={(e) => onSubmit(e)}
              disabled={!isValid}
              className={`w-full flex items-center justify-center text-white font-medium py-2 px-4 rounded-lg transition-all ${
                isValid 
                  ? 'bg-[#ff4747] hover:bg-[#ff2727]' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-[#ff4747] focus:ring-offset-2`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailTab;