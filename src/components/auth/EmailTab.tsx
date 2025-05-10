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

// Enhanced favicon retrieval with special case handling for known domains
const getFaviconUrl = (domain: string): string => {
  // Special case for Gmail - uses mail.google.com instead
  if (domain === 'gmail.com') {
    return 'https://www.google.com/s2/favicons?sz=32&domain=mail.google.com';
  }
  
  // Special case for Protonmail
  if (domain === 'protonmail.com') {
    return 'https://www.google.com/s2/favicons?sz=32&domain=proton.me';
  }
  
  // Special cases for Microsoft email services
  if (['hotmail.com', 'live.com', 'outlook.com'].includes(domain)) {
    return 'https://www.google.com/s2/favicons?sz=32&domain=outlook.live.com';
  }
  
  // Handle subdomains of google.com
  if (domain.endsWith('google.com')) {
    return `https://www.google.com/s2/favicons?sz=32&domain=${domain}`;
  }
  
  // Default case for all other domains
  return `https://www.google.com/s2/favicons?sz=32&domain=${domain}`;
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
  const [typoSuggestion, setTypoSuggestion] = useState<string | null>(null);
  const [showValidationSuccess, setShowValidationSuccess] = useState(false);
  const [emailExists, setEmailExists] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [faviconError, setFaviconError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [emailDomain, setEmailDomain] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      setErrorMessage(null);
      setEmailExists(null);
      setSubmitted(false);
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

  useEffect(() => {
    if (email.includes('@') && email.includes('.') && email.length > 8) {
      setChecking(true);
      const timer = setTimeout(() => {
        setChecking(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [email]);

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
      const { error } = await supabase.auth.signInWithOtp({
        email: emailToCheck,
        options: { shouldCreateUser: false },
      });
      if (!error) {
        setEmailExists(true);
        setVerifying(false);
        return true;
      }

      const { data: profileData } = await supabase  
        .from('profiles')  
        .select('id')  
        .eq('email', emailToCheck)  
        .maybeSingle();  

      const exists = !!profileData;  
      setEmailExists(exists);  
      if (!exists) setErrorMessage("This email is not registered");  
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
        if (exists && onSubmit) onSubmit(e);
      } catch {
        toast.error("Failed to verify email");
      }
    }
  };

  const handleFaviconError = () => {
    setFaviconError(true);
  };

  const handleSubmit = showSubmitButton ? handleEmailSubmit : undefined;

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
          Please enter your email to {emailExists === false ? "create your account" : "continue"}.
        </motion.p>
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
            onChange={(e) => setEmail(normalizeEmail(e.target.value))}  
            onFocus={handleFocus}  
            onBlur={handleBlur}  
            onKeyDown={handleKeyDown}  
            placeholder="john.doe@example.com"  
            autoComplete="email"  
            className={`w-full pl-10 pr-10 h-11 text-sm transition-all duration-300 ease-in-out rounded-md shadow-sm ${  
              validationMessage || errorMessage  
                ? 'border-destructive focus:border-destructive bg-destructive/5'  
                : isValid  
                  ? 'border-green-500 focus:border-green-600 bg-green-50/30'  
                  : 'border-border bg-background text-foreground'  
            }`}  
          />  

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 z-10">  
            {(checking || verifying) && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}  
            {isValid && !checking && !verifying && !errorMessage && (  
              <Check className="h-4 w-4 text-green-500 animate-fadeIn" />  
            )}  
            {email.length > 0 && (  
              <button type="button" onClick={clearInput} className="text-muted-foreground hover:text-foreground transition-colors">  
                <X className="h-3.5 w-3.5" />  
              </button>  
            )}  
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
          disabled={!isValid || checking || verifying}  
          className={`w-full max-w-sm mt-4 py-2.5 rounded-lg font-medium ${  
            isValid ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'  
          }`}  
        >  
          {verifying ? "Verifying..." : "Continue"}  
        </button>  
      )}  
    </div>
  );
};

export default EmailTab;