import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from "@/components/theme-provider";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

import EmailSuggestions from './EmailSuggestions';
import EmailValidationMessage from './EmailValidationMessage';
import { normalizeEmail, generateSuggestions, getValidationMessage } from './EmailUtils';

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

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const validationMessage = useMemo(() => {
    if (!submitted && (focused || email.length === 0)) return null;
    return getValidationMessage(email, setTypoSuggestion);
  }, [email, submitted, focused]);

  const isValid = !validationMessage && email.length > 0;

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const newSuggestions = generateSuggestions(email);
      setSuggestions(newSuggestions);
    }, 180);
    return () => debounceRef.current && clearTimeout(debounceRef.current);
  }, [email]);

  useEffect(() => {
    setShowSuggestions(focused && suggestions.length > 0);
  }, [focused, suggestions.length]);

  useEffect(() => {
    if (isValid && email.includes('@') && email.includes('.') && email.length > 8) {
      setShowValidationSuccess(true);
      const timer = setTimeout(() => setShowValidationSuccess(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isValid, email]);

  const checkEmailExists = async (emailToCheck: string) => {
    if (!isValid || !emailToCheck) return false;
    setVerifying(true);
    setErrorMessage(null);
    try {
      const { data } = await supabase.from('profiles').select('id').eq('email', emailToCheck).maybeSingle();
      const exists = !!data;
      setEmailExists(exists);
      if (!exists) {
        setErrorMessage("This email is not registered");
        toast.error("This email is not registered");
      }
      return exists;
    } catch {
      setErrorMessage("Failed to verify email");
      toast.error("Failed to verify email");
      return false;
    } finally {
      setVerifying(false);
    }
  };

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
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
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent) => {
    const nextTarget = e.relatedTarget as Node;
    if (!suggestionsRef.current?.contains(nextTarget)) {
      setFocused(false);
      setShowSuggestions(false);
    }
  }, []);

  const selectSuggestion = (suggestion: string) => {
    setEmail(normalizeEmail(suggestion));
    setShowSuggestions(false);
    setTimeout(() => inputRef.current?.focus(), 10);
  };

  const clearInput = () => {
    setEmail('');
    setSuggestions([]);
    setEmailExists(null);
    setErrorMessage(null);
    inputRef.current?.focus();
  };

  const applyTypoSuggestion = () => {
    if (typoSuggestion) {
      setEmail(typoSuggestion);
      setTypoSuggestion(null);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (isValid) {
      const exists = await checkEmailExists(email);
      if (exists) {
        onSubmit?.(e);
      }
    }
  };

  return (
    <form onSubmit={showSubmitButton ? handleEmailSubmit : undefined} className="space-y-3">
      <motion.header className="text-center mb-4" variants={containerVariants} initial="hidden" animate="visible">
        <motion.h2 className="text-base font-semibold text-foreground mb-1" variants={childVariants}>
          Let’s get started
        </motion.h2>
        <motion.p className="text-sm text-muted-foreground" variants={childVariants}>
          Please enter your email to {emailExists === false ? "create your account" : "continue"}.
        </motion.p>
      </motion.header>

      <div className="relative">
        <Input
          ref={inputRef}
          id="email"
          type="email"
          value={email}
          placeholder="john.doe@example.com"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => setEmail(normalizeEmail(e.target.value))}
          onKeyDown={handleKeyDown}
          autoComplete="email"
          spellCheck={false}
          className={`pl-10 pr-10 h-11 text-sm transition-all duration-300 rounded-md shadow-sm
            ${errorMessage ? 'border-destructive bg-destructive/5 focus:border-destructive' :
              isValid ? 'border-green-500 bg-green-50/30 dark:bg-green-950/10 focus:border-green-600' :
                focused ? 'border-primary/30 focus:border-primary' : 'border-input hover:border-input'}`}
        />

        {checking || verifying ? (
          <Loader2 className="absolute right-3 top-3.5 h-4 w-4 animate-spin text-muted-foreground" />
        ) : isValid && !errorMessage && (
          <Check className={`h-4 w-4 text-green-500 absolute right-3 top-3.5 ${showValidationSuccess ? 'animate-bounce' : 'opacity-100'}`} />
        )}
      </div>

      {/* Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <EmailSuggestions
          ref={suggestionsRef}
          suggestions={suggestions}
          hoveredIndex={hoveredIndex}
          onSelect={selectSuggestion}
          onHover={setHoveredIndex}
        />
      )}

      {/* Validation Messages */}
      {errorMessage ? (
        <EmailValidationMessage type="error" message={errorMessage} />
      ) : validationMessage ? (
        <EmailValidationMessage type="warning" message={validationMessage} />
      ) : typoSuggestion ? (
        <EmailValidationMessage
          type="suggestion"
          message={`Did you mean `}
          suggestion={typoSuggestion}
          onApply={applyTypoSuggestion}
        />
      ) : null}

      {/* Submit button */}
      {showSubmitButton && (
        <button
          type="submit"
          disabled={!isValid || checking || verifying}
          className={`w-full mt-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
            isValid && !checking && !verifying
              ? 'bg-primary text-white hover:bg-primary/90'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          {verifying ? 'Verifying...' : checking ? 'Checking...' : 'Continue'}
        </button>
      )}
    </form>
  );
};

export default EmailTab;