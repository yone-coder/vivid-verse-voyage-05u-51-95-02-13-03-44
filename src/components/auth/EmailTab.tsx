import React, {
  useState, useRef, useEffect, useCallback, useMemo
} from 'react';
import { Input } from "@/components/ui/input";
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from "@/components/theme-provider";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

import EmailSuggestions from './EmailSuggestions';
import EmailValidationMessage from './EmailValidationMessage';
import {
  normalizeEmail,
  generateSuggestions,
  getValidationMessage,
} from './EmailUtils';

interface EmailTabProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  showSubmitButton?: boolean;
}

const EmailTab = ({ email, setEmail, onSubmit, showSubmitButton = false }: EmailTabProps) => {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [submitted, setSubmitted] = useState(false);
  const [checking, setChecking] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [typoSuggestion, setTypoSuggestion] = useState<string | null>(null);
  const [showValidationSuccess, setShowValidationSuccess] = useState(false);
  const [emailExists, setEmailExists] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const validationMessage = useMemo(() => {
    if (!submitted && (focused || email.length === 0)) return null;
    return getValidationMessage(email, setTypoSuggestion);
  }, [email, submitted, focused]);

  const isValid = !validationMessage && email.length > 0;

  // Suggestion logic (debounced only on email)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const newSuggestions = generateSuggestions(email);
      setSuggestions(newSuggestions);
    }, 180);
    return () => debounceRef.current && clearTimeout(debounceRef.current);
  }, [email]);

  // Show/hide suggestions based on focus
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

  useEffect(() => {
    if (email.includes('@') && email.includes('.') && email.length > 8) {
      setChecking(true);
      const timer = setTimeout(() => setChecking(false), 600);
      return () => clearTimeout(timer);
    }
  }, [email]);

  const handleFocus = useCallback(() => {
    setFocused(true);
    setSubmitted(false);
    setErrorMessage(null);
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent) => {
    const next = e.relatedTarget as Node | null;
    if (!suggestionsRef.current?.contains(next)) {
      setFocused(false);
      setShowSuggestions(false);
    }
  }, []);

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

  const selectSuggestion = useCallback((suggestion: string) => {
    setEmail(normalizeEmail(suggestion));
    setShowSuggestions(false);
    setTimeout(() => inputRef.current?.focus(), 10);
  }, [setEmail]);

  const checkEmailExists = async (emailToCheck: string) => {
    if (!isValid || !emailToCheck) return false;
    setVerifying(true);
    setErrorMessage(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: emailToCheck,
        options: { shouldCreateUser: false }
      });
      if (!error || error.message.includes("Email not confirmed")) {
        setEmailExists(true);
        return true;
      }
    } catch {}

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
      return false;
    } finally {
      setVerifying(false);
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
    <form onSubmit={handleEmailSubmit}>
      <motion.header className="text-center mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-base font-semibold text-foreground mb-1">Let’s get started</h2>
        <p className="text-sm text-muted-foreground">
          Please enter your email to {emailExists === false ? "create your account" : "continue"}.
        </p>
      </motion.header>

      <div className="relative">
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
          className={`w-full pl-10 pr-10 h-11 text-sm transition-all duration-300 rounded-md shadow-sm 
            ${errorMessage || validationMessage ? 'border-destructive bg-destructive/5' :
              isValid ? 'border-green-500 bg-green-50/30 dark:bg-green-950/10' :
                focused ? 'border-primary/30' : 'border-input'}`}
        />
        {isValid && !checking && !verifying && (
          <Check className="h-4 w-4 text-green-500 absolute right-3 top-3.5" />
        )}
      </div>

      <div className="mt-2 text-sm">
        {errorMessage ? (
          <EmailValidationMessage type="error" message={errorMessage} />
        ) : validationMessage ? (
          <EmailValidationMessage type="warning" message={validationMessage} />
        ) : typoSuggestion ? (
          <EmailValidationMessage type="suggestion" message={`Did you mean ${typoSuggestion}?`} />
        ) : null}
      </div>

      {showSuggestions && (
        <EmailSuggestions
          suggestions={suggestions}
          hoveredIndex={hoveredIndex}
          onSelect={selectSuggestion}
          onHover={setHoveredIndex}
          ref={suggestionsRef}
        />
      )}

      {showSubmitButton && (
        <button
          type="submit"
          disabled={!isValid || checking || verifying}
          className={`w-full mt-4 py-2.5 rounded-lg font-medium transition-all duration-200
            ${isValid && !checking && !verifying
              ? 'bg-primary text-white hover:bg-primary/90'
              : 'bg-muted text-muted-foreground cursor-not-allowed'}`}
        >
          {checking || verifying ? (verifying ? "Verifying..." : "Checking...") : "Continue"}
        </button>
      )}
    </form>
  );
};

export default EmailTab;