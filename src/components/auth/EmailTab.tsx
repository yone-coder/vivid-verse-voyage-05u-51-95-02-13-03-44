import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, Check, X } from 'lucide-react';

interface EmailTabProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  showSubmitButton?: boolean;
}

const EmailTab = ({ email, setEmail, onSubmit, showSubmitButton = true }: EmailTabProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  
  const validateEmail = (value: string) => {
    if (!value) return null;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value.length > 3;
    setIsValid(isValidEmail);
    return isValidEmail;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setEmail(newValue);
    if (newValue.length > 2) validateEmail(newValue);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (email) validateEmail(email);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-2 flex items-center justify-between">
        <Label 
          htmlFor="email" 
          className="text-base font-semibold text-gray-800 tracking-wide"
        >
          Your Account
        </Label>
        {isValid !== null && (
          <span className={`text-xs font-medium flex items-center ${isValid ? 'text-green-500' : 'text-red-500'}`}>
            {isValid ? (
              <>
                <Check className="w-3 h-3 mr-1" /> Valid format
              </>
            ) : (
              <>
                <X className="w-3 h-3 mr-1" /> Please check format
              </>
            )}
          </span>
        )}
      </div>
      
      <div className={`relative rounded-lg transition-all duration-300 ${
        isFocused 
          ? 'shadow-[0_0_0_4px_rgba(255,71,71,0.1)]' 
          : 'hover:shadow-[0_0_0_2px_rgba(255,71,71,0.05)]'
      }`}>
        {/* Gradient border */}
        <div className={`absolute inset-0 rounded-lg ${
          isFocused 
            ? 'bg-gradient-to-r from-[#ff4747] via-[#ff9147] to-[#ffcc47] p-[1.5px]' 
            : 'bg-gradient-to-r from-gray-200 to-gray-300 p-[1px]'
        }`}>
          <div className="absolute inset-0 bg-white rounded-lg"></div>
        </div>

        {/* Icon with animated background */}
        <div className={`absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
          isFocused 
            ? 'bg-gradient-to-br from-[#ff4747] to-[#ff9147]'
            : 'bg-gray-100'
        }`}>
          <User className={`h-4 w-4 transition-colors ${
            isFocused ? 'text-white' : 'text-gray-500'
          }`} />
        </div>

        <Input
          id="email"
          type="text"
          value={email}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          placeholder="Email address or username"
          className={`w-full pl-12 pr-3 py-3 border-none bg-transparent relative z-10 text-base ${
            isValid === false ? 'text-red-600' : 'text-gray-800'
          } placeholder:text-gray-400 focus-visible:ring-0 focus-visible:outline-none`}
          required
        />
      </div>

      {/* Premium badge */}
      <div className="mt-1 flex items-center">
        <span className="text-xs text-gray-500 flex items-center">
          <span className="inline-block w-4 h-4 rounded-full bg-gradient-to-r from-[#ffcc47] to-[#ff9147] mr-1.5"></span>
          Premium Account Protection
        </span>
      </div>

      {showSubmitButton && onSubmit && (
        <div className="mt-6">
          <button 
            type="button"
            onClick={(e) => onSubmit(e)}
            className="w-full relative overflow-hidden group"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-30 -translate-x-full group-hover:animate-[shine_1s_ease_forwards]"></div>
            
            {/* Main button */}
            <div className="flex items-center justify-center bg-gradient-to-r from-[#ff4747] via-[#ff7847] to-[#ff9147] text-white font-semibold py-3.5 px-4 rounded-lg shadow-lg shadow-[#ff4747]/20 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-[#ff4747]/30 group-active:scale-[0.98]">
              <span className="mr-1">Continue</span>
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 7L18 12L13 17M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
          
          <div className="mt-3 text-center">
            <span className="text-xs text-gray-500">
              Secure login powered by <span className="text-[#ff4747] font-medium">AliGuard™</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTab;