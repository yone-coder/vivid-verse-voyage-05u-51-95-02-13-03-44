import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, Check, X, Loader2, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import CountryCodeSelect from './CountryCodeSelect';
import { toast } from 'sonner';

// List of common country codes - keep this for dropdown reference
const countryCodes = [
  { code: '+1', country: 'US/Canada' },
  { code: '+44', country: 'UK' },
  { code: '+61', country: 'Australia' },
  { code: '+64', country: 'New Zealand' },
  { code: '+33', country: 'France' },
  { code: '+49', country: 'Germany' },
  { code: '+81', country: 'Japan' },
  { code: '+86', country: 'China' },
  { code: '+91', country: 'India' },
  { code: '+52', country: 'Mexico' },
  { code: '+55', country: 'Brazil' },
  { code: '+27', country: 'South Africa' },
  { code: '+82', country: 'South Korea' },
  { code: '+39', country: 'Italy' },
  { code: '+34', country: 'Spain' },
  { code: '+7', country: 'Russia' },
  { code: '+31', country: 'Netherlands' },
  { code: '+46', country: 'Sweden' },
  { code: '+47', country: 'Norway' },
  { code: '+45', country: 'Denmark' },
  { code: '+41', country: 'Switzerland' },
  { code: '+32', country: 'Belgium' },
  { code: '+43', country: 'Austria' },
  { code: '+66', country: 'Thailand' },
  { code: '+65', country: 'Singapore' },
  { code: '+60', country: 'Malaysia' },
  { code: '+351', country: 'Portugal' },
  { code: '+353', country: 'Ireland' },
  { code: '+972', country: 'Israel' },
  { code: '+971', country: 'UAE' },
  { code: '+966', country: 'Saudi Arabia' },
  { code: '+90', country: 'Turkey' },
  { code: '+48', country: 'Poland' },
  { code: '+36', country: 'Hungary' },
  { code: '+420', country: 'Czech Republic' }
].sort((a, b) => a.country.localeCompare(b.country));

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 12, staggerChildren: 0.15 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

interface PhoneTabProps {
  phone: string;
  setPhone: (phone: string) => void;
  countryCode: string;
  setCountryCode: (countryCode: string) => void;
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
  const [isFocused, setIsFocused] = useState(false);
  const [checking, setChecking] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [phoneExists, setPhoneExists] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastTypedAt, setLastTypedAt] = useState<number>(Date.now());
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [showValidationSuccess, setShowValidationSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Phone validation
  const validatePhone = (phoneNumber: string): string | null => {
    if (!phoneNumber) return null;
    if (phoneNumber.length < 3) return "Please enter a valid phone number";
    
    // Basic validation to ensure only digits and allowed formatting characters
    const validChars = phoneNumber.replace(/[^\d-\s()]/g, '');
    if (validChars.length !== phoneNumber.length) {
      return "Phone number can only contain digits, spaces, or characters like - and ()";
    }

    // Check if there are enough digits
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    if (digitsOnly.length < 5) {
      return "Phone number must have at least 5 digits";
    }

    return null;
  };

  // Format phone number as user types
  const formatPhoneNumber = (value: string): string => {
    // Allow only digits, spaces, hyphens, parentheses
    const cleaned = value.replace(/[^\d\s\-()]/g, '');
    
    // Use regex to format numbers
    let formatted = cleaned;
    
    // Format based on country code
    if (countryCode === '+1') {
      // US format: (XXX) XXX-XXXX
      const digitsOnly = cleaned.replace(/\D/g, '');
      if (digitsOnly.length > 0) {
        formatted = digitsOnly.replace(/(\d{3})(\d{3})?(\d{4})?/, (_, p1, p2, p3) => {
          let result = '(' + p1 + ')';
          if (p2) result += ' ' + p2;
          if (p3) result += '-' + p3;
          return result;
        });
      }
    } else {
      // Generic international format: keep spaces and hyphens as typed
      formatted = cleaned;
    }
    
    return formatted;
  };

  // Determine if phone is valid
  const isValid = validatePhone(phone) === null && phone.length > 0;

  // Update phone number with proper formatting
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
    setLastTypedAt(Date.now());
    
    // Set hasInteracted to true if user has typed anything
    if (formatted.length > 0) {
      setHasInteracted(true);
    }
    
    // Reset verification status when phone changes
    if (phoneExists !== null) {
      setPhoneExists(null);
      setErrorMessage(null);
    }
  };

  // Focus effects
  const handleFocus = () => {
    setIsFocused(true);
    setErrorMessage(null);
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Trigger checking animation if phone is valid
    if (isValid) {
      setChecking(true);
      setTimeout(() => {
        setChecking(false);
        // Simulate verification completed (in a real app, you would verify against your database)
        simulatePhoneVerification();
      }, 800);
    }
  };

  // Clear the input
  const clearInput = useCallback(() => {
    setPhone('');
    setPhoneExists(null);
    setErrorMessage(null);
    inputRef.current?.focus();
  }, [setPhone]);

  // Auto-blur the input field only after user stops typing (inactivity)
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout | null = null;

    // Only setup the timer when conditions are met
    if (isValid && isFocused && phone.replace(/\D/g, '').length >= 10) {
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
  }, [isValid, phone, isFocused, lastTypedAt]);

  // Simulated phone verification (in a real app, you would verify with an API call)
  const simulatePhoneVerification = () => {
    setVerifying(true);
    
    // Simulate API delay
    setTimeout(() => {
      // For demo purposes, we'll consider phone numbers ending with even digits as "existing"
      const lastDigit = phone.replace(/\D/g, '').slice(-1);
      const exists = parseInt(lastDigit) % 2 === 0;
      setPhoneExists(exists);
      setVerifying(false);
    }, 1000);
  };

  // Show validation success animation briefly
  useEffect(() => {
    if (isValid && !showValidationSuccess) {
      setShowValidationSuccess(true);
      const timer = setTimeout(() => {
        setShowValidationSuccess(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isValid, showValidationSuccess]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    
    // Proceed with verification if not verified yet
    if (phoneExists === null) {
      simulatePhoneVerification();
      return;
    }
    
    // Continue with form submission
    if (onSubmit) {
      onSubmit(e);
    }
  };

  // Generate dynamic header text based on the component state
  const getDynamicHeaderText = () => {
    if (!hasInteracted) {
      return "Enter your phone number to continue.";
    }

    if (verifying) {
      return isRetrying 
        ? "Retrying phone verification..." 
        : "Verifying your phone number...";
    }

    if (checking) {
      return "Checking your phone number...";
    }

    if (phoneExists === true) {
      return "Welcome back! Please continue to your account.";
    }

    if (phoneExists === false) {
      return "No account found. Let's create one for you.";
    }

    if (validatePhone(phone)) {
      return "Please enter a valid phone number.";
    }

    if (isValid && phone.length > 0) {
      return "Great! You can continue now.";
    }

    if (phone.length > 0) {
      return "Please complete your phone number.";
    }

    return "Please enter your phone number to continue.";
  };

  // Generate dynamic subheader text based on the component state
  const getDynamicSubheaderText = () => {
    if (verifying) {
      return isRetrying 
        ? "We're trying once more to verify your account." 
        : "This will only take a moment.";
    }

    if (phoneExists === true) {
      return "Use the button below to sign in.";
    }

    if (phoneExists === false) {
      return "We'll set up a new account with this phone number.";
    }

    if (validatePhone(phone)) {
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
    // If checking, verifying or retrying, show spinner
    if (checking || verifying || isRetrying) {
      return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />;
    }

    // If valid phone with no verification result yet, show spinner when not focused
    if (isValid && phoneExists === null && !isFocused) {
      return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />;
    }

    // Don't show loading spinner when actively typing
    const timeElapsedSinceLastType = Date.now() - lastTypedAt;
    if (timeElapsedSinceLastType < 1000 && isFocused) {
      return null;
    }

    // Case: Phone exists in database, show green check in circle when not focused
    if (isValid && phoneExists === true && !isFocused) {
      return (
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500 animate-fadeIn">
          <Check className="h-3 w-3 text-white" />
        </div>
      );
    }

    // Case: Phone doesn't exist, show red X in circle when not focused
    if (isValid && phoneExists === false && !isFocused) {
      return (
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500 animate-fadeIn">
          <X className="h-3 w-3 text-white" />
        </div>
      );
    }

    // Case: Valid phone when focused
    if (isValid && isFocused) {
      return <Check className="h-4 w-4 text-green-500 animate-fadeIn" />;
    }

    // Clear button when input has content and is focused
    if (phone.length > 0 && isFocused) {
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
  const validationMessage = validatePhone(phone);
  
  return (
    <div className="flex flex-col items-center w-full">
      <motion.header
        className="text-center mb-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 className="text-base font-semibold text-foreground mb-1" variants={childVariants}>
          Let's get started
        </motion.h2>
        <motion.p className="text-sm text-muted-foreground" variants={childVariants}>
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

      <div className="relative w-full max-w-sm">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex items-center space-x-2">
            <div className="w-24">
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className={`w-full ${
                  isFocused ? 'border-[#ff4747] ring-2 ring-[#ff4747]/30' : 'border-input'
                }`}>
                  <SelectValue placeholder="+1" />
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-72">
                    {countryCodes.map((item) => (
                      <SelectItem key={item.code} value={item.code}>
                        <span>{item.code} ({item.country})</span>
                      </SelectItem>
                    ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-grow relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <Phone className="h-4 w-4 text-muted-foreground" />
              </div>
              
              <Input
                ref={inputRef}
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Phone number"
                className={`w-full pl-10 pr-10 h-11 text-sm transition-all duration-300 ease-in-out rounded-md shadow-sm ${
                  validationMessage || errorMessage
                    ? 'border-destructive focus:border-destructive bg-destructive/5'
                    : isValid && phoneExists === false && !isFocused
                      ? 'border-red-500 focus:border-red-600 bg-red-50/30'
                    : isValid && phoneExists === true && !isFocused
                      ? 'border-green-500 focus:border-green-600 bg-green-50/30'
                    : isValid
                      ? 'border-green-500 focus:border-green-600 bg-green-50/30'
                      : 'border-border bg-background text-foreground'
                }`}
                autoFocus
              />
              
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 z-10">
                {renderRightIcon()}
              </div>
            </div>
          </div>
          
          <div className="relative mt-1">
            <AnimatePresence>
              {validationMessage && !errorMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs text-destructive mt-1 flex items-start gap-1"
                >
                  <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" />
                  <span>{validationMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!validationMessage && (
            <p className="text-xs text-muted-foreground mt-1">
              We'll send a verification code to this number
            </p>
          )}
          
          {errorMessage && (
            <div className="flex items-center gap-2 mt-2 p-2 rounded-md bg-destructive/10 text-destructive text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}
          
          {showSubmitButton && (
            <Button 
              type="submit" 
              className={`w-full mt-4 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                (isValid && !checking && !verifying)
                  ? 'bg-[#ff4747] text-white hover:bg-[#ff2727]' 
                  : 'bg-muted text-muted-foreground cursor-not-allowed opacity-70'
              }`}
              disabled={!isValid || checking || verifying}
            >
              {verifying ? (isRetrying ? "Retrying..." : "Verifying...") : 
               checking ? "Checking..." : 
               phoneExists === false ? "Create Account" : 
               phoneExists === true ? "Sign In" : 
               "Continue"}
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PhoneTab;
