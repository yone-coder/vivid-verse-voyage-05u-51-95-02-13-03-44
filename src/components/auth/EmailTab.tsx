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
  {/* Label (no wrapper needed) */}
  <Label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
    Email or username
  </Label>

  {/* Single relative wrapper (red) - for input + icons */}
  <div className="relative">
    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
    
    <Input
      ref={inputRef}
      id="email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder="name@example.com"
      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg"
      required
      autoComplete="email"
    />

    {/* Clear (X) and validation (✓) icons */}
    {email.length > 0 && (
      <button
        type="button"
        onClick={clearInput}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        <X className="h-4 w-4" />
      </button>
    )}
    {isValid === true && email.length > 0 && (
      <Check className="absolute right-8 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
    )}
  </div>

  {/* Suggestions dropdown (now sibling of input wrapper) */}
  {showSuggestions && (
    <div className="mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
      {suggestions.map((suggestion) => (
        <div key={suggestion} className="px-3 py-2 hover:bg-gray-50 cursor-pointer">
          {suggestion}
        </div>
      ))}
    </div>
  )}

  {/* Next button */}
  {showSubmitButton && (
    <button 
      type="button"
      onClick={onSubmit}
      className="mt-4 w-full bg-[#ff4747] hover:bg-[#ff2727] text-white py-2 px-4 rounded-lg"
    >
      Next
    </button>
  )}
</div>
  );
};

export default EmailTab;