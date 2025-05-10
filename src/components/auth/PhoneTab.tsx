
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Phone, Check, X, Loader2 } from 'lucide-react';
import CountryCodeSelect from './CountryCodeSelect';

interface PhoneTabProps {
  phone: string;
  setPhone: (phone: string) => void;
  countryCode: string;
  setCountryCode: (code: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  showSubmitButton?: boolean;
}

const PhoneTab = ({ 
  phone, 
  setPhone, 
  countryCode, 
  setCountryCode, 
  onSubmit,
  showSubmitButton = false
}: PhoneTabProps) => {
  const [focused, setFocused] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Basic phone validation
  useEffect(() => {
    // Simple validation - at least 5 digits
    const valid = /^\d{5,}$/.test(phone);
    setIsValid(valid);
  }, [phone]);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
    
    // Check phone number when user finishes typing
    if (phone.length > 0) {
      setIsChecking(true);
      setTimeout(() => {
        setIsChecking(false);
      }, 800);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const value = e.target.value.replace(/\D/g, '');
    setPhone(value);
  };

  const clearInput = () => {
    setPhone('');
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && onSubmit) {
      onSubmit(e);
    }
  };

  // Render the right icon based on input state
  const renderRightIcon = () => {
    if (isChecking) {
      return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />;
    }
    
    if (phone.length > 0) {
      if (!focused) {
        return isValid ? 
          <Check className="h-4 w-4 text-green-500" /> : 
          <X className="h-4 w-4 text-red-500" />;
      } else {
        return (
          <button 
            type="button" 
            onClick={clearInput} 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >  
            <X className="h-3.5 w-3.5" />  
          </button>
        );
      }
    }
    
    return null;
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-sm mb-4">
        <div className="flex">
          <CountryCodeSelect 
            value={countryCode} 
            onChange={setCountryCode} 
            className="w-24 flex-shrink-0"
          />
          
          <div className="relative flex-grow ml-2">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Phone className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <Input  
              ref={inputRef}  
              id="phone"  
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              value={phone}  
              onChange={handlePhoneChange}  
              onFocus={handleFocus}  
              onBlur={handleBlur}  
              placeholder="Phone number"  
              className={`w-full pl-10 pr-10 h-11 transition-all ${  
                !isValid && phone.length > 0
                  ? 'border-destructive focus:border-destructive'  
                  : isValid 
                    ? 'border-green-500 focus:border-green-600'  
                    : ''  
              }`}  
            />  
            
            <div className="absolute right-3 top-1/2 -translate-y-1/2">  
              {renderRightIcon()}
            </div>  
          </div>
        </div>
        
        {phone.length > 0 && !isValid && !focused && (
          <div className="mt-1 text-xs text-destructive">
            Please enter a valid phone number
          </div>
        )}
      </div>
      
      {showSubmitButton && (  
        <button  
          type="submit"  
          onClick={handleSubmit}  
          disabled={!isValid || isChecking}  
          className={`w-full max-w-sm py-2.5 rounded-lg font-medium transition-all ${  
            isValid && !isChecking
              ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
              : 'bg-muted text-muted-foreground cursor-not-allowed'  
          }`}  
        >  
          {isChecking ? "Verifying..." : "Continue"}  
        </button>  
      )}
    </div>
  );
};

export default PhoneTab;
