import React, { useState, useRef, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, Check, AlertCircle, X, Loader2 } from 'lucide-react';

interface EmailTabProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  showSubmitButton?: boolean;
}

const EmailTab = ({ email, setEmail, onSubmit, showSubmitButton = false }: EmailTabProps) => {
  const [focused, setFocused] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [typing, setTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Common email domains for suggestions
  const commonDomains = ['gmail.com', 'outlook.com', 'yahoo.com', 'icloud.com', 'hotmail.com'];

  useEffect(() => {
    // Validate email format whenever email changes
    if (email.length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValid(emailRegex.test(email));

      // Show the typing indicator while user is typing
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      setTyping(true);
      typingTimeoutRef.current = setTimeout(() => {
        setTyping(false);
      }, 1000);

      // Generate email suggestions if email contains @ but no domain or incomplete domain
      if (email.includes('@') && !email.split('@')[1]?.includes('.')) {
        const username = email.split('@')[0];
        const partialDomain = email.split('@')[1] || '';
        
        const filteredDomains = commonDomains.filter(domain => 
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

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [email]);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
    setShowSuggestions(false);
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

  const getInputStatusClass = () => {
    if (email.length === 0) return 'border-[#eaeaea]';
    if (typing) return 'border-blue-400';
    if (isValid === true) return 'border-green-500';
    if (isValid === false) return 'border-red-500';
    return 'border-[#eaeaea]';
  };

  const getStatusIcon = () => {
    if (email.length === 0) {
      return <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />;
    }
    
    if (typing) {
      return <Loader2 className="absolute right-3 top-3 h-5 w-5 text-blue-400 animate-spin" />;
    }
    
    if (isValid === true) {
      return <Check className="absolute right-3 top-3 h-5 w-5 text-green-500" />;
    }
    
    if (isValid === false) {
      return <AlertCircle className="absolute right-3 top-3 h-5 w-5 text-red-500" />;
    }
    
    return null;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className={`transition-all duration-300 ${focused ? 'transform -translate-y-1' : ''}`}>
        <Label 
          htmlFor="email" 
          className={`block text-base font-medium mb-2 transition-colors duration-300 ${
            focused ? 'text-[#ff4747]' : isValid === true ? 'text-green-600' : isValid === false ? 'text-red-600' : 'text-gray-700'
          }`}
        >
          Email or username
        </Label>
        
        <div className="relative group">
          <div className={`absolute left-0 top-0 w-1 h-full rounded-l-md transition-all duration-300 ${
            focused ? 'bg-[#ff4747]' : isValid === true ? 'bg-green-500' : isValid === false ? 'bg-red-500' : 'bg-transparent'
          }`} />
          
          <User className={`absolute left-3 top-3 h-5 w-5 transition-colors duration-300 ${
            focused ? 'text-[#ff4747]' : isValid === true ? 'text-green-500' : isValid === false ? 'text-red-500' : 'text-gray-400'
          }`} />
          
          {email.length > 0 && (
            <div 
              className="absolute right-12 top-3 cursor-pointer hover:bg-gray-100 p-1 rounded-full"
              onClick={clearInput}
            >
              <X className="h-4 w-4 text-gray-500" />
            </div>
          )}
          
          {getStatusIcon()}
          
          <Input
            ref={inputRef}
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="premium@example.com"
            className={`w-full pl-10 pr-12 py-3 bg-white border-2 rounded-md shadow-sm transition-all duration-300 hover:shadow-md ${getInputStatusClass()} ${
              focused ? 'ring-2 ring-[#ff4747] ring-opacity-50 border-[#ff4747]' : ''
            }`}
            required
            autoComplete="email"
          />
        </div>
        
        {isValid === false && email.length > 0 && !typing && (
          <p className="mt-1 text-sm text-red-500 transition-opacity duration-300 opacity-100">
            Please enter a valid email address
          </p>
        )}
        
        {showSuggestions && (
          <div className="absolute z-10 mt-1 w-full max-w-md bg-white border border-gray-200 rounded-md shadow-lg py-1 animate-fadeIn">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                onClick={() => selectSuggestion(suggestion)}
              >
                <User className="h-4 w-4 mr-2 text-gray-400" />
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        )}
        
        {showSubmitButton && onSubmit && (
          <div className="mt-4 mb-2">
            <button 
              type="button"
              onClick={(e) => onSubmit(e)}
              disabled={!isValid}
              className={`w-full flex items-center justify-center text-white font-medium py-3 px-4 rounded-md transition-all duration-300 ${
                isValid 
                  ? 'bg-[#ff4747] hover:bg-[#ff2727] shadow-md hover:shadow-lg' 
                  : 'bg-gray-300 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-[#ff4747] focus:ring-offset-2`}
            >
              {typing ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Checking...
                </>
              ) : (
                'Next'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailTab;