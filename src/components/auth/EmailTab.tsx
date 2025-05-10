'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Mail, Check, X, Loader2, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from "@/components/theme-provider";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import EmailSuggestions from './EmailSuggestions';
import EmailValidationMessage from './EmailValidationMessage';
import {
  premiumDomains,
  normalizeEmail,
  generateSuggestions,
  getValidationMessage,
  checkForTypos
} from './EmailUtils';

interface EmailTabProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  showSubmitButton?: boolean;
}

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

const getDomainFromEmail = (email: string): string | null => {
  const match = email.match(/@([\w.-]+\.\w+)/);
  return match ? match[1].toLowerCase() : null;
};

// Special case handling for domains that need different favicon URLs
const getFaviconUrl = (domain: string): string => {
  const normalizedDomain = domain.toLowerCase().trim();

  // Handle Gmail (including common typos)
  const gmailVariants = [
    'gmail.com',        
    'googlemail.com',   
    'gmail.co',         
    'gmail.c',        
    'gmail.',         
    'gmail',         
  ];

  if (gmailVariants.includes(normalizedDomain)) {
    return 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico';
  }

  // Rest of the logic for other domains...
  const specialDomains: Record<string, string> = {
    'protonmail.com': 'proton.me',
    'hotmail.com': 'outlook.live.com',
    'live.com': 'outlook.live.com',
    'outlook.com': 'outlook.live.com',
  };

  const faviconDomain = specialDomains[normalizedDomain] || normalizedDomain;
  return `https://www.google.com/s2/favicons?sz=32&domain=${faviconDomain}`;
};

const EmailTab = ({ email, setEmail, onSubmit, showSubmitButton = false }: EmailTabProps) => {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [submitted, setSubmitted] = useState(false);
  const [checking, setChecking] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [validationTimer, setValidationTimer] = useState(false);
  const [lastTypedAt, setLastTypedAt] = useState<number>(Date.now());
  const [typoSuggestion, setTypoSuggestion] = useState<string | null>(null);
  const [showValidationSuccess, setShowValidationSuccess] = useState(false);
  const [emailExists, setEmailExists] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [faviconError, setFaviconError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [emailDomain, setEmailDomain] = useState<string | null>(null);
  const verificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    return () => {
      setErrorMessage(null);
      setEmailExists(null);
      setSubmitted(false);
      if (verificationTimeoutRef.current) {
        clearTimeout(verificationTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (email.includes('@')) {
      const typo = checkForTypos(email);
      setTypoSuggestion(typo);
    } else {
      setTypoSuggestion(null);
    }

    const domain = getDomainFromEmail(email);  
    setEmailDomain(domain);
    // Reset favicon error when domain changes
    setFaviconError(false);

    // Reset email verification state when email changes
    if (emailExists !== null) {
      setEmailExists(null);
      setErrorMessage(null);
    }

    // Set hasInteracted to true if user has typed anything
    if (email.length > 0) {
      setHasInteracted(true);
    }

  }, [email]);

  const validationMessage = useMemo(() => {
    if (email.length === 0) return null;
    return getValidationMessage(email, setTypoSuggestion);
  }, [email]);

  const isValid = !validationMessage && email.length > 0;

  useEffect(() => {
    if (isValid && email.includes('@') && email.includes('.') && email.length > 8) {
      setShowValidationSuccess(true);
      const timer = setTimeout(() => {
        setShowValidationSuccess(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isValid, email]);

  // Auto-verify the email when valid and not focused
  useEffect(() => {
    if (isValid && !focused && !checking && !verifying && email.includes('@') && email.includes('.') && emailExists === null) {
      // Delayed verification to prevent too many requests
      if (verificationTimeoutRef.current) {
        clearTimeout(verificationTimeoutRef.current);
      }
      
      verificationTimeoutRef.current = setTimeout(() => {
        checkEmailExists(email);
      }, 800);
    }
    
    return () => {
      if (verificationTimeoutRef.current) {
        clearTimeout(verificationTimeoutRef.current);
      }
    };
  }, [isValid, focused, email, checking, verifying, emailExists]);

  // Auto-blur the input field only after user stops typing (inactivity)
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout | null = null;
    
    // Only setup the timer when conditions are met
    if (isValid && focused && email.toLowerCase().endsWith('.com') && email.includes('@') && email.length > 10) {
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
  }, [isValid, email, focused, lastTypedAt]);

  useEffect(() => {
    if (!focused && email.includes('@') && email.includes('.') && email.length > 8) {
      setChecking(true);
      const timer = setTimeout(() => {
        setChecking(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [email, focused]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const newSuggestions = generateSuggestions(email);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0 && focused);
      setHoveredIndex(-1);
    }, 180);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [email, focused]);

  const checkEmailExists = async (emailToCheck: string): Promise<boolean> => {
    if (!isValid || !emailToCheck) return false;
    setVerifying(true);
    setErrorMessage(null);
    try {
      // First try to check if the user exists in auth
      const { error } = await supabase.auth.signInWithOtp({
        email: emailToCheck,
        options: { shouldCreateUser: false },
      });
      
      if (!error) {
        setEmailExists(true);
        setVerifying(false);
        return true;
      }

      // Then check if the email exists in profiles table
      const { data: profileData } = await supabase  
        .from('profiles')  
        .select('id')  
        .eq('email', emailToCheck)  
        .maybeSingle();  

      const exists = !!profileData;  
      setEmailExists(exists);  
      if (!exists) {
        // The user doesn't exist in the database
        setErrorMessage(null); // Don't show error when not focused
      }
      setVerifying(false);  
      return exists;  
    } catch (err) {  
      console.error("Error checking email:", err);  
      setErrorMessage("Failed to verify email");  
      setVerifying(false);  
      return false;  
    }
  };

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    // Update the last typed timestamp on any key press
    setLastTypedAt(Date.now());
    
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHoveredIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHoveredIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter' && hoveredIndex !== -1) {
      e.preventDefault();
      setEmail(normalizeEmail(suggestions[hoveredIndex]));
      setShowSuggestions(false);
      inputRef.current?.focus();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setShowSuggestions(false);
    }
  }, [showSuggestions, suggestions, hoveredIndex, setEmail]);

  const handleFocus = useCallback(() => {
    setFocused(true);
    setSubmitted(false);
    setErrorMessage(null);
    
    // Reset validation timer when focusing
    setValidationTimer(false);

    if (suggestions.length > 0 && email.length > 0) {
      setShowSuggestions(true);
    }
  }, [suggestions.length, email.length]);

  const handleBlur = useCallback((e: React.FocusEvent) => {
    setTimeout(() => {
      if (
        document.activeElement !== inputRef.current &&
        !suggestionsRef.current?.contains(document.activeElement)
      ) {
        setFocused(false);
        setShowSuggestions(false);
        // Reset validation timer state when blurring
        setValidationTimer(false);
      }
    }, 200);
  }, []);

  const selectSuggestion = useCallback((suggestion: string) => {
    setEmail(normalizeEmail(suggestion));
    setShowSuggestions(false);
    setTimeout(() => inputRef.current?.focus(), 10);
  }, [setEmail]);

  const clearInput = useCallback(() => {
    setEmail('');
    setSuggestions([]);
    setEmailExists(null);
    setErrorMessage(null);
    inputRef.current?.focus();
  }, [setEmail]);

  const applyTypoSuggestion = useCallback(() => {
    if (typoSuggestion) {
      setEmail(typoSuggestion);
      setTypoSuggestion(null);
    }
  }, [typoSuggestion, setEmail]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (isValid) {
      try {
        const exists = await checkEmailExists(email);
        if (onSubmit) onSubmit(e);
      } catch {
        toast.error("Failed to verify email");
      }
    }
  };

  const handleFaviconError = () => {
    setFaviconError(true);
  };

  const handleSubmit = showSubmitButton ? handleEmailSubmit : undefined;

  // Generate dynamic header text based on the component state
  const getDynamicHeaderText = () => {
    if (!hasInteracted) {
      return "Please enter your email to create your account.";
    }
    
    if (verifying) {
      return "Verifying your email address...";
    }
    
    if (checking) {
      return "Checking your email...";
    }
    
    if (emailExists === true) {
      return "Welcome back! Please continue to your account.";
    }
    
    if (emailExists === false) {
      return "No account found. Let's create one for you.";
    }
    
    if (validationMessage) {
      return "Please enter a valid email address.";
    }
    
    if (isValid && email.length > 0) {
      return "Great! You can create your account now.";
    }
    
    if (email.length > 0) {
      return "Please complete your email address.";
    }
    
    return "Please enter your email to create your account.";
  };
  
  // Generate dynamic subheader text based on the component state
  const getDynamicSubheaderText = () => {
    if (verifying) {
      return "This will only take a moment.";
    }
    
    if (emailExists === true) {
      return "Use the button below to sign in.";
    }
    
    if (emailExists === false) {
      return "We'll set up a new account with this email.";
    }
    
    if (validationMessage) {
      return "The email address format appears to be incorrect.";
    }
    
    if (isValid && emailExists === null && email.length > 0) {
      return "Wait for email verification to continue.";
    }
    
    if (isValid && email.length > 0) {
      return "Click continue when you're ready.";
    }
    
    if (typoSuggestion) {
      return "Did you mean to type something else?";
    }
    
    return "We'll use this to set up your account.";
  };

  // Render function for the right icon based on all states
  const renderRightIcon = () => {
    // If checking or verifying, show spinner
    if (checking || verifying) {
      return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />;
    }
    
    // If valid email with no verification result yet, show spinner when not focused
    if (isValid && emailExists === null && !focused) {
      return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />;
    }
    
    // Don't show loading spinner when actively typing
    const timeElapsedSinceLastType = Date.now() - lastTypedAt;
    if (timeElapsedSinceLastType < 1000 && focused) {
      return null;
    }
    
    // Case: Email exists in database, show green check in circle when not focused
    if (isValid && emailExists === true && !focused) {
      return (
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500 animate-fadeIn">
          <Check className="h-3 w-3 text-white" />
        </div>
      );
    }
    
    // Case: Email doesn't exist, show red X in circle when not focused
    if (isValid && emailExists === false && !focused) {
      return (
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500 animate-fadeIn">
          <X className="h-3 w-3 text-white" />
        </div>
      );
    }
    
    // Case: Valid email when focused
    if (isValid && focused) {
      return <Check className="h-4 w-4 text-green-500 animate-fadeIn" />;
    }
    
    // Clear button when input has content and is focused
    if (email.length > 0 && focused) {
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
        <div className="relative">  
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">  
            {emailDomain ? (
              faviconError ? (
                <Mail className="h-4 w-4 text-muted-foreground" />
              ) : (
                <img
                  src={getFaviconUrl(emailDomain)}
                  alt="domain"
                  className="h-4 w-4 rounded-sm object-contain"
                  onError={handleFaviconError}
                />
              )
            ) : (
              <Mail className="h-4 w-4 text-muted-foreground" />
            )}
          </div>

          <Input  
            ref={inputRef}  
            id="email"  
            type="email"  
            value={email}  
            onChange={(e) => {
              setEmail(normalizeEmail(e.target.value));
              setLastTypedAt(Date.now());
            }}  
            onFocus={handleFocus}  
            onBlur={handleBlur}  
            onKeyDown={handleKeyDown}  
            placeholder="john.doe@example.com"  
            autoComplete="email"  
            className={`w-full pl-10 pr-10 h-11 text-sm transition-all duration-300 ease-in-out rounded-md shadow-sm ${  
              validationMessage || errorMessage  
                ? 'border-destructive focus:border-destructive bg-destructive/5'  
                : isValid && emailExists === false && !focused
                  ? 'border-red-500 focus:border-red-600 bg-red-50/30'
                : isValid && emailExists === true && !focused
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

        <div className="relative mt-1">  
          <AnimatePresence>  
            {(validationMessage || typoSuggestion) && !errorMessage && (  
              <EmailValidationMessage  
                message={validationMessage}  
                typoSuggestion={typoSuggestion}  
                onApplySuggestion={applyTypoSuggestion}  
                showWhileTyping={true}  
              />  
            )}  
          </AnimatePresence>  
        </div>  

        {errorMessage && (  
          <div className="flex items-center gap-2 mt-2 p-2 rounded-md bg-destructive/10 text-destructive text-sm">  
            <AlertTriangle className="h-4 w-4" />  
            <span className="font-medium">{errorMessage}</span>  
          </div>  
        )}  

        {showSuggestions && suggestions.length > 0 && (  
          <div ref={suggestionsRef} className="w-full max-w-sm mt-2">  
            <EmailSuggestions  
              suggestions={suggestions}  
              hoveredIndex={hoveredIndex}  
              setHoveredIndex={setHoveredIndex}  
              selectSuggestion={selectSuggestion}  
              premiumDomains={premiumDomains}  
            />  
          </div>  
        )}  
      </div>  

      {showSubmitButton && (  
  <button  
    type="submit"  
    onClick={handleEmailSubmit}  
    disabled={!isValid || checking || verifying || emailExists === null}  
    className={`w-full max-w-sm mt-4 py-2.5 rounded-lg font-medium transition-all duration-300 ${  
      isValid && emailExists !== null && !checking && !verifying 
        ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
        : 'bg-muted text-muted-foreground cursor-not-allowed opacity-70'  
    }`}  
  >  
    {verifying ? "Verifying..." : 
     checking ? "Checking..." : 
     emailExists === false ? "Create Account" : 
     emailExists === true ? "Sign In" : 
     "Continue"}  
  </button>  
)}
    </div>
  );
};

export default EmailTab;