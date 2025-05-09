
import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Phone, Check, X, AlertTriangle, Loader2 } from 'lucide-react';
import { useTheme } from "@/components/theme-provider";
import { supabase } from '@/integrations/supabase/client';
import CountryCodeSelect from './CountryCodeSelect';
import { toast } from 'sonner';

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
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [checking, setChecking] = useState(false);
  const [verified, setVerified] = useState(false);
  const [showValidationSuccess, setShowValidationSuccess] = useState(false);
  const [phoneExists, setPhoneExists] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Clean up error state when component unmounts or tab changes
  useEffect(() => {
    return () => {
      setErrorMessage(null);
      setPhoneExists(null);
    };
  }, []);
  
  // Validation logic
  const validatePhone = (phoneNumber: string): boolean => {
    // Simple validation: at least 7 digits
    return /^[0-9]{7,}$/.test(phoneNumber.replace(/\D/g, ''));
  };
  
  const isValid = validatePhone(phone);

  // Format phone number as user types
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only digits, spaces, and some special characters
    const formatted = value.replace(/[^\d\s()+.-]/g, '');
    setPhone(formatted);
    
    if (errorMessage) setErrorMessage(null);
  };

  // Handle focus state
  const handleFocus = () => {
    setFocused(true);
    setSubmitted(false);
    setErrorMessage(null);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const clearInput = () => {
    setPhone('');
    setPhoneExists(null);
    setErrorMessage(null);
    if (inputRef.current) inputRef.current.focus();
  };

  // Check if phone exists in database
  const checkPhoneExists = async () => {
    if (!isValid || !phone) return false;
    
    setChecking(true);
    setErrorMessage(null);
    
    try {
      console.log("Checking if phone exists:", countryCode + phone);
      
      // Query profiles table for the phone number
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('phone', countryCode + phone)
        .maybeSingle();
      
      if (error) {
        console.error("Phone check error:", error);
        setErrorMessage("Failed to verify phone number");
        setChecking(false);
        return false;
      }
      
      // If we got data back, the phone exists
      const exists = !!data;
      console.log("Phone lookup result:", exists);
      setPhoneExists(exists);
      
      if (!exists) {
        setErrorMessage("This phone number is not registered");
      }
      
      setChecking(false);
      return exists;
      
    } catch (error) {
      console.error("Error checking phone:", error);
      setErrorMessage("Failed to verify phone number");
      setChecking(false);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    if (isValid) {
      try {
        const exists = await checkPhoneExists();
        
        if (exists) {
          if (onSubmit) onSubmit(e);
        } else {
          setErrorMessage("This phone number is not registered");
          toast.error("This phone number is not registered. Please sign up first.");
        }
      } catch (error) {
        console.error("Phone verification error:", error);
        toast.error("Failed to verify phone number");
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      {/* Phone input section with better organized instructions */}
      <div className="text-center mb-4">
        <h2 className="text-base font-medium text-foreground mb-1">Phone Number</h2>
        <p className="text-sm text-muted-foreground">
          Please enter your phone to {phoneExists === false ? "create your account" : "continue"}
        </p>
      </div>

      {/* Phone input field */}
      <div className="flex gap-2">
        {/* Country code select */}
        <div className="flex-shrink-0 w-24">
          <CountryCodeSelect 
            value={countryCode} 
            onChange={setCountryCode} 
          />
        </div>
        
        {/* Phone number input */}
        <div className="relative flex-grow">
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-5 w-5 transition-all duration-200 ${focused ? 'text-primary' : 'text-muted-foreground'}`}>
            <Phone className="h-[15px] w-[15px]" />
          </div>
          
          <Input
            ref={inputRef}
            id="phone"
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="000-000-0000"
            className={`w-full pl-10 pr-10 h-11 text-sm bg-background transition-all duration-200 rounded-md shadow-sm ${
              !isValid && submitted
                ? 'border-destructive focus:border-destructive focus:ring-destructive/20 bg-destructive/5' 
                : isValid 
                  ? 'border-green-500 focus:border-green-600 focus:ring-green-200 bg-green-50/30 dark:bg-green-950/10' 
                  : focused 
                    ? 'border-primary/30 focus:border-primary focus:ring-primary/20' 
                    : 'border-input hover:border-input focus:border-input focus:ring-ring/20'
            }`}
            inputMode="tel"
            autoComplete="tel"
          />

          {/* Status indicators */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {checking && (
              <Loader2 className="h-4 w-4 text-muted-foreground animate-spin mr-1" aria-label="Checking phone" />
            )}
            
            {phone.length > 0 && (
              <button
                type="button"
                onClick={clearInput}
                tabIndex={0}
                className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-full p-1 transition-colors"
                aria-label="Clear input"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}

            {isValid && !checking && !errorMessage && (
              <Check
                className="h-4 w-4 text-green-500 animate-fadeIn"
                aria-label="Valid phone"
              />
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="flex items-center justify-center gap-1.5 mt-2 p-2 rounded-md bg-destructive/10 text-destructive text-sm">
          <AlertTriangle className="h-4 w-4" />
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Validation message for invalid phone */}
      {!isValid && submitted && !errorMessage && (
        <div className="flex items-center justify-center gap-1.5 mt-2 p-2 rounded-md bg-destructive/10 text-destructive text-sm">
          <AlertTriangle className="h-4 w-4" />
          <span className="font-medium">Please enter a valid phone number</span>
        </div>
      )}

      {/* Submit Button */}
      {showSubmitButton && (
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!isValid || checking}
          className={`w-full mt-4 py-2.5 rounded-lg font-medium transition-all duration-200 relative overflow-hidden ${
            isValid && !checking
              ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          {checking ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Verifying...
            </span>
          ) : (
            <span className="relative z-10">Continue</span>
          )}
        </button>
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PhoneTab;
