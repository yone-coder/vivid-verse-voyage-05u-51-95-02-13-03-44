
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Phone, Check, X, Loader2, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import CountryCodeSelect from './CountryCodeSelect';
import { supabase } from '@/integrations/supabase/client';

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
  // State management
  const [focused, setFocused] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [validationTimer, setValidationTimer] = useState(false);
  const [lastTypedAt, setLastTypedAt] = useState<number>(Date.now());
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [phoneExists, setPhoneExists] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showValidationSuccess, setShowValidationSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const checkAttemptsRef = useRef<number>(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const verificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setErrorMessage(null);
      setPhoneExists(null);
      setSubmitted(false);
      if (verificationTimeoutRef.current) {
        clearTimeout(verificationTimeoutRef.current);
      }
    };
  }, []);

  // Phone validation and state reset when phone changes
  useEffect(() => {
    // Basic phone validation - at least 5 digits
    const valid = /^\d{5,}$/.test(phone);
    setIsValid(valid);
    
    if (phoneExists !== null) {
      setPhoneExists(null);
      setErrorMessage(null);
      // Reset check attempts when phone changes
      checkAttemptsRef.current = 0;
    }

    // Set hasInteracted to true if user has typed anything
    if (phone.length > 0) {
      setHasInteracted(true);
    }
  }, [phone, phoneExists]);

  // Show success indicator briefly when validation passes
  useEffect(() => {
    if (isValid && phone.length > 0) {
      setShowValidationSuccess(true);
      const timer = setTimeout(() => {
        setShowValidationSuccess(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isValid, phone]);

  // Auto-verify the phone when valid and not focused
  useEffect(() => {
    if (isValid && !focused && !isChecking && !isVerifying && phone.length > 0 && phoneExists === null) {
      // Delayed verification to prevent too many requests
      if (verificationTimeoutRef.current) {
        clearTimeout(verificationTimeoutRef.current);
      }

      verificationTimeoutRef.current = setTimeout(() => {
        verifyPhoneExists(countryCode + phone);
      }, 800);
    }

    return () => {
      if (verificationTimeoutRef.current) {
        clearTimeout(verificationTimeoutRef.current);
      }
    };
  }, [isValid, focused, phone, countryCode, isChecking, isVerifying, phoneExists]);

  // Auto-blur the input field after user stops typing (inactivity)
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout | null = null;

    // Only setup the timer when conditions are met
    if (isValid && focused && phone.length > 7) {
      // Set a timer to check for inactivity
      inactivityTimer = setTimeout(() => {
        // Check if user has been inactive since the timer started
        const timeElapsedSinceLastType = Date.now() - lastTypedAt;

        // If it's been more than 1.5 seconds since the last keystroke, blur the input
        if (timeElapsedSinceLastType >= 1500) {
          if (inputRef.current && document.activeElement === inputRef.current) {
            inputRef.current.blur();
          }
        }
      }, 1500);
    }

    // Clean up the timer
    return () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
    };
  }, [isValid, phone, focused, lastTypedAt]);

  // Show checking animation when input is blurred
  useEffect(() => {
    if (!focused && phone.length > 0) {
      setIsChecking(true);
      const timer = setTimeout(() => {
        setIsChecking(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [phone, focused]);

  // Verify if phone number exists in the database
  const verifyPhoneExists = async (fullPhoneNumber: string): Promise<void> => {
    if (!isValid || !fullPhoneNumber) return;
    
    setIsVerifying(true);
    setErrorMessage(null);
    
    try {
      // Simulate phone verification with Supabase
      // In a real app, you'd use a proper phone verification API
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('phone', fullPhoneNumber)
        .maybeSingle();
      
      if (error) {
        console.error("Phone verification error:", error);
        // If we get a database error, assume the phone doesn't exist
        setPhoneExists(false);
      } else {
        // If we get data, the phone exists
        setPhoneExists(!!data);
      }
      
      checkAttemptsRef.current = 0;
    } catch (err) {
      console.error("Phone verification error:", err);
      setErrorMessage("Failed to verify phone number");
      // Default to treating as new user on errors
      setPhoneExists(false);
    } finally {
      setIsVerifying(false);
      setIsRetrying(false);
    }
  };

  const handleFocus = useCallback(() => {
    setFocused(true);
    setSubmitted(false);
    setErrorMessage(null);

    // Reset validation timer when focusing
    setValidationTimer(false);
  }, []);

  const handleBlur = useCallback(() => {
    setFocused(false);
    
    // Reset validation timer state when blurring
    setValidationTimer(false);
    
    // Check phone number when user finishes typing
    if (phone.length > 0) {
      setIsChecking(true);
      setTimeout(() => {
        setIsChecking(false);
      }, 800);
    }
  }, [phone]);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const value = e.target.value.replace(/\D/g, '');
    setPhone(value);
    setLastTypedAt(Date.now());
  }, [setPhone]);

  const clearInput = useCallback(() => {
    setPhone('');
    setPhoneExists(null);
    setErrorMessage(null);
    inputRef.current?.focus();
  }, [setPhone]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    if (isValid) {
      try {
        // If we already know the phone status, skip verification
        if (phoneExists === null) {
          await verifyPhoneExists(countryCode + phone);
        }
        
        if (onSubmit) {
          // Proceed with form submission regardless of phone existence status
          onSubmit(e);
        }
      } catch (error) {
        console.error("Submit error:", error);
        toast.error("Failed to verify phone number");
        
        // Still allow submission even on error
        if (onSubmit) {
          onSubmit(e);
        }
      }
    }
  };

  // Generate dynamic header text based on the component state
  const getDynamicHeaderText = () => {
    if (!hasInteracted) {
      return "Please enter your phone number to continue.";
    }

    if (isVerifying) {
      return isRetrying 
        ? "Retrying phone verification..." 
        : "Verifying your phone number...";
    }

    if (isChecking) {
      return "Checking your phone number...";
    }

    if (phoneExists === true) {
      return "Welcome back! Please continue to your account.";
    }

    if (phoneExists === false) {
      return "No account found. Let's create one for you.";
    }

    if (!isValid && phone.length > 0) {
      return "Please enter a valid phone number.";
    }

    if (isValid && phone.length > 0) {
      return "Great! You can continue now.";
    }

    return "Please enter your phone number to continue.";
  };

  // Generate dynamic subheader text based on the component state
  const getDynamicSubheaderText = () => {
    if (isVerifying) {
      return isRetrying 
        ? "We're trying once more to verify your account." 
        : "This will only take a moment.";
    }

    if (phoneExists === true) {
      return "Use the button below to sign in.";
    }

    if (phoneExists === false) {
      return "We'll set up a new account with this number.";
    }

    if (!isValid && phone.length > 0) {
      return "The phone number format appears to be incorrect.";
    }

    if (isValid && phoneExists === null && phone.length > 0) {
      return "Wait for phone verification to continue.";
    }

    if (isValid && phone.length > 0) {
      return "Click continue when you're ready.";
    }

    return "We'll use this to set up your account.";
  };

  // Render function for the right icon based on all states
  const renderRightIcon = () => {
    // If checking or verifying, show spinner
    if (isChecking || isVerifying || isRetrying) {
      return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />;
    }

    // If valid phone with no verification result yet, show spinner when not focused
    if (isValid && phoneExists === null && !focused) {
      return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />;
    }

    // Don't show loading spinner when actively typing
    const timeElapsedSinceLastType = Date.now() - lastTypedAt;
    if (timeElapsedSinceLastType < 1000 && focused) {
      return null;
    }

    // Case: Phone exists in database, show green check in circle when not focused
    if (isValid && phoneExists === true && !focused) {
      return (
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500 animate-fadeIn">
          <Check className="h-3 w-3 text-white" />
        </div>
      );
    }

    // Case: Phone doesn't exist, show red X in circle when not focused
    if (isValid && phoneExists === false && !focused) {
      return (
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500 animate-fadeIn">
          <X className="h-3 w-3 text-white" />
        </div>
      );
    }

    // Case: Valid phone when focused
    if (isValid && focused) {
      return <Check className="h-4 w-4 text-green-500 animate-fadeIn" />;
    }

    // Clear button when input has content and is focused
    if (phone.length > 0 && focused) {
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

    return null;
  };

  const headerText = getDynamicHeaderText();
  const subheaderText = getDynamicSubheaderText();

  return (
    <div className="flex flex-col items-center w-full">
      <motion.header
        className="text-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
      >
        <motion.h2 
          className="text-base font-semibold text-foreground mb-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.1 }}
        >
          Let's get started
        </motion.h2>
        <motion.p 
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.2 }}
        >
          {headerText}
        </motion.p>
        <AnimatePresence mode="wait">
          <motion.p 
            key={subheaderText}
            className="text-xs text-muted-foreground mt-1 h-4"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            {subheaderText}
          </motion.p>
        </AnimatePresence>
      </motion.header>

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
              onKeyDown={() => setLastTypedAt(Date.now())}
              placeholder="Phone number"  
              className={`w-full pl-10 pr-10 h-11 transition-all duration-300 ease-in-out ${  
                !isValid && phone.length > 0
                  ? 'border-destructive focus:border-destructive bg-destructive/5'  
                : isValid && phoneExists === false && !focused
                  ? 'border-red-500 focus:border-red-600 bg-red-50/30'
                : isValid && phoneExists === true && !focused
                  ? 'border-green-500 focus:border-green-600 bg-green-50/30'
                : isValid  
                  ? 'border-green-500 focus:border-green-600 bg-green-50/30'  
                  : 'border-border bg-background text-foreground'  
              }`}  
            />  
            
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 z-10">  
              {renderRightIcon()}
            </div>  
          </div>
        </div>

        {errorMessage && (  
          <div className="flex items-center gap-2 mt-2 p-2 rounded-md bg-destructive/10 text-destructive text-sm">  
            <AlertTriangle className="h-4 w-4" />  
            <span className="font-medium">{errorMessage}</span>  
          </div>  
        )}  
      </div>
      
      {showSubmitButton && (  
        <button  
          type="submit"  
          onClick={handlePhoneSubmit}  
          disabled={!isValid || (isChecking && phoneExists === null) || (isVerifying && phoneExists === null) || (phoneExists === null)}  
          className={`w-full max-w-sm py-2.5 rounded-lg font-medium transition-all duration-300 ${  
            (isValid && !isChecking && !isVerifying && phoneExists !== null)
              ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
              : 'bg-muted text-muted-foreground cursor-not-allowed opacity-70'  
          }`}  
        >  
          {isVerifying ? (isRetrying ? "Retrying..." : "Verifying...") : 
           isChecking ? "Checking..." : 
           phoneExists === false ? "Create Account" : 
           phoneExists === true ? "Sign In" : 
           "Continue"}  
        </button>  
      )}
    </div>
  );
};

export default PhoneTab;
