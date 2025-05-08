import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, AlertCircle, CheckCircle } from 'lucide-react';

interface EmailTabProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  showSubmitButton?: boolean;
  isLoading?: boolean;
}

const EmailTab = ({ 
  email, 
  setEmail, 
  onSubmit, 
  showSubmitButton = false,
  isLoading = false
}: EmailTabProps) => {
  const [focused, setFocused] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  
  const validateEmail = (value: string) => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(value);
    const isValidUsername = value.length >= 3 && !value.includes(' ');
    return isValidEmail || isValidUsername;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value) {
      setIsValid(validateEmail(value));
    } else {
      setIsValid(null);
    }
  };

  const getIconColor = () => {
    if (!email) return 'text-gray-400';
    if (isValid === null) return 'text-gray-400';
    return isValid ? 'text-green-500' : 'text-red-500';
  };

  const getBorderColor = () => {
    if (focused) return 'border-[#ff4747]';
    if (!email) return 'border-[#eaeaea]';
    if (isValid === null) return 'border-[#eaeaea]';
    return isValid ? 'border-green-500' : 'border-red-500';
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label 
          htmlFor="email" 
          className="text-base font-medium text-gray-700 transition-all"
        >
          Email or username
        </Label>
        {isValid === false && email && (
          <span className="text-xs text-red-500 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            Invalid format
          </span>
        )}
      </div>
      
      <div className={`relative group rounded-md shadow-sm transition-all duration-300 ${focused ? 'shadow-md' : ''}`}>
        <div className="absolute left-3 top-3 transition-all duration-300">
          {isValid === true && email ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <User className={`h-5 w-5 transition-colors duration-300 ${getIconColor()}`} />
          )}
        </div>
        
        <Input
          id="email"
          type="text"
          value={email}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Email address or username"
          className={`w-full pl-10 pr-3 py-2 transition-all duration-300 ring-offset-2 ${getBorderColor()} focus-visible:ring-[#ff4747]`}
          required
        />
      </div>
      
      {showSubmitButton && onSubmit && (
        <div className="mt-6">
          <button 
            type="button"
            onClick={(e) => onSubmit(e)}
            disabled={isLoading || !email || isValid === false}
            className={`w-full flex items-center justify-center text-white font-medium py-3 px-4 rounded-md transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-[#ff4747] focus:ring-offset-2
              ${isLoading ? 'bg-gray-400 cursor-not-allowed' : email && isValid !== false ? 'bg-[#ff4747] hover:bg-[#ff2727] active:scale-98 hover:-translate-y-0.5 shadow-md hover:shadow-lg' : 'bg-gray-300 cursor-not-allowed'}`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center">
                Next
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailTab;