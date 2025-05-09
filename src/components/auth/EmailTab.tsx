
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Mail, Check, X, Info, Loader2, AlertTriangle } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from "@/components/theme-provider";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Import our extracted components
import EmailSuggestions from './EmailSuggestions';
import EmailValidationMessage from './EmailValidationMessage';
import { 
  premiumDomains, 
  normalizeEmail, 
  generateSuggestions, 
  getValidationMessage
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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
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
  
  // Clean up error state when component unmounts or tab changes
  useEffect(() => {
    return () => {
      setErrorMessage(null);
      setEmailExists(null);
      setSubmitted(false); // Add this to reset submission state
    };
  }, []);
  
  // Memoize validation message to prevent recalculations on render
  const validationMessage = useMemo(() => {
    if (!submitted && (focused || email.length === 0)) return null;
    return getValidationMessage(email, setTypoSuggestion);
  }, [email, submitted, focused]);
  
  const isValid = !validationMessage && email.length > 0;

  // Show validation success animation
  useEffect(() => {
    if (isValid && email.includes('@') && email.includes('.') && email.length > 8) {
      setShowValidationSuccess(true);
      const timer = setTimeout(() => {
        setShowValidationSuccess(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isValid, email]);

  // Check email format and simulate validation
  useEffect(() => {
    if (email.includes('@') && email.includes('.') && email.length > 8) {
      setChecking(true);
      const timer = setTimeout(() => {
        setChecking(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [email]);

  // Debounced suggestions
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

  // IMPORTANT: Fix TS error - separate checkEmailExists function to break circular dependency
  const checkEmailExists = async (emailToCheck: string): Promise<boolean> => {
    if (!isValid || !emailToCheck) return false;
    
    setVerifying(true);
    setErrorMessage(null);
    
    try {
      console.log("Checking if email exists:", emailToCheck);
      
      // First approach: Check auth.users table via RPC (requires proper function)
      try {
        const { data, error } = await supabase.auth.signInWithOtp({
          email: emailToCheck,
          options: {
            shouldCreateUser: false,
          }
        });
        
        if (!error) {
          console.log("Email exists (OTP method):", emailToCheck);
          setEmailExists(true);
          setVerifying(false);
          return true;
        }

        if (error && error.message && error.message.includes("Email not confirmed")) {
          console.log("Email exists but not confirmed:", emailToCheck);
          setEmailExists(true);
          setVerifying(false);
          return true;
        }

        console.log("OTP check error:", error);
        // Continue to other methods if OTP check fails
      } catch (err) {
        console.error("OTP check error:", err);
        // Continue to other methods
      }
      
      // Second approach: Check profiles table directly
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', emailToCheck)
        .maybeSingle();
      
      if (error) {
        console.error("Database query error:", error);
        
        // Try fallback method if column doesn't exist
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .limit(1);
          
        if (profileError) {
          console.error("Profile table query error:", profileError);
          throw new Error("Could not verify email");
        }
      }
      
      // If we got data back or no specific error about missing column, the email exists
      const exists = !!data;
      console.log("Email lookup result:", data, "Exists:", exists);
      
      setEmailExists(exists);
      
      if (!exists) {
        setErrorMessage("This email is not registered");
        toast.error("This email is not registered");
      }
      
      setVerifying(false);
      return exists;
      
    } catch (err) {
      console.error("Error checking email:", err);
      
      // Final fallback: try auth API directly with invalid password
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: emailToCheck,
          password: "check_if_email_exists_" + Math.random().toString(36)
        });
        
        // If error includes "Invalid login credentials", the email likely exists
        if (error && error.message && error.message.includes("Invalid login credentials")) {
          console.log("Fallback detection - email exists:", emailToCheck);
          setEmailExists(true);
          setVerifying(false);
          return true;
        } else if (error && error.message && error.message.includes("Email not confirmed")) {
          console.log("Email exists but not confirmed:", emailToCheck);
          setEmailExists(true);
          setVerifying(false);
          return true;
        } else {
          console.log("Fallback detection - email doesn't exist:", emailToCheck);
          setEmailExists(false);
          setErrorMessage("This email is not registered");
          setVerifying(false);
          return false;
        }
      } catch (fallbackErr) {
        console.error("Fallback email check failed:", fallbackErr);
        setErrorMessage("Failed to verify email");
        setVerifying(false);
        return false;
      }
    }
  };

  // Handle keyboard navigation for suggestions
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
      if (inputRef.current) inputRef.current.focus();
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
    if (suggestionsRef.current?.contains(e.relatedTarget as Node)) {
      return;
    }
    
    setTimeout(() => {
      if (document.activeElement !== inputRef.current && 
          !suggestionsRef.current?.contains(document.activeElement)) {
        setFocused(false);
        setShowSuggestions(false);
      }
    }, 200);
  }, []);

  const selectSuggestion = useCallback((suggestion: string) => {
    const normalizedEmail = normalizeEmail(suggestion);
    setEmail(normalizedEmail);
    setShowSuggestions(false);
    
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        setFocused(true);
      }
    }, 10);
  }, [setEmail]);

  const clearInput = useCallback(() => {
    setEmail('');
    setSuggestions([]);
    setEmailExists(null);
    setErrorMessage(null);
    if (inputRef.current) inputRef.current.focus();
  }, [setEmail]);

  const applyTypoSuggestion = useCallback(() => {
    if (typoSuggestion) {
      setEmail(typoSuggestion);
      setTypoSuggestion(null);
    }
  }, [typoSuggestion, setEmail]);

  // Extract the submit handler to avoid capturing checkEmailExists in its closure
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    if (isValid) {
      try {
        const exists = await checkEmailExists(email);
        
        if (exists) {
          if (onSubmit) onSubmit(e);
        } else {
          setErrorMessage("This email is not registered");
          toast.error("This email is not registered. Please sign up first.");
        }
      } catch (error) {
        console.error("Email verification error:", error);
        toast.error("Failed to verify email");
      }
    }
  };

  // Use this handler for the submit button
  const handleSubmit = showSubmitButton ? handleEmailSubmit : undefined;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center space-y-2">
      {/* Email input section with better organized instructions */}
      <div className="text-center mb-4">
        <h2 className="text-base font-medium text-foreground mb-1">Email Address</h2>
        <p className="text-sm text-muted-foreground">
          Please enter your email to {emailExists === false ? "create your account" : "continue"}
        </p>
      </div>

      {/* Email Input with icons - made narrower and cleaner */}
      <div className="relative w-full max-w-sm">
        <div className={`absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-5 w-5 transition-all duration-200 ${focused ? 'text-primary' : 'text-muted-foreground'}`}>
          <Mail className="h-[15px] w-[15px]" />
        </div>
        
        <Input
          ref={inputRef}
          id="email"
          type="email"
          spellCheck="false"
          autoCorrect="off"
          autoCapitalize="none"
          value={email}
          onChange={(e) => setEmail(normalizeEmail(e.target.value))}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="name@example.com"
          className={`w-full pl-10 pr-10 h-11 text-sm bg-background transition-all duration-200 rounded-md shadow-sm ${
            validationMessage || errorMessage
              ? 'border-destructive focus:border-destructive focus:ring-destructive/20 bg-destructive/5' 
              : isValid 
                ? 'border-green-500 focus:border-green-600 focus:ring-green-200 bg-green-50/30 dark:bg-green-950/10' 
                : focused 
                  ? 'border-primary/30 focus:border-primary focus:ring-primary/20' 
                  : 'border-input hover:border-input focus:border-input focus:ring-ring/20'
          }`}
          autoComplete="email"
          aria-invalid={!!validationMessage || !!errorMessage}
          aria-describedby={validationMessage ? "email-validation-error" : undefined}
        />

        {/* Status Indicators */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {(checking || verifying) && (
            <Loader2 className="h-4 w-4 text-muted-foreground animate-spin mr-1" aria-label="Checking email" />
          )}
          
          {email.length > 0 && (
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

          {isValid && !checking && !verifying && !errorMessage && (
            <Check
              className={`h-4 w-4 text-green-500 ${
                showValidationSuccess ? 'animate-pulse-success' : 'animate-fadeIn'
              }`}
              aria-label="Valid email"
            />
          )}
        </div>
      </div>

      {/* Typo Suggestion */}
      {typoSuggestion && (
        <button
          type="button"
          onClick={applyTypoSuggestion}
          className="flex items-center gap-1.5 mt-1 text-xs text-primary hover:text-primary/90 hover:underline"
        >
          <span>Did you mean: <strong>{typoSuggestion}</strong>?</span>
          <Check className="h-3 w-3" />
        </button>
      )}

      {/* Error Message - Improved styling */}
      {errorMessage && (
        <div className="flex items-center justify-center gap-1.5 mt-2 p-2 rounded-md bg-destructive/10 text-destructive text-sm max-w-sm">
          <AlertTriangle className="h-4 w-4" />
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Validation Message */}
      <AnimatePresence>
        {validationMessage && !errorMessage && (
          <EmailValidationMessage message={validationMessage} />
        )}
      </AnimatePresence>

      {/* Email Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div ref={suggestionsRef} className="w-full max-w-sm">
          <EmailSuggestions 
            suggestions={suggestions}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            selectSuggestion={selectSuggestion}
            premiumDomains={premiumDomains}
          />
        </div>
      )}

      {/* Submit Button */}
      {showSubmitButton && (
        <button
          type="submit"
          onClick={handleEmailSubmit}
          disabled={!isValid || checking || verifying}
          className={`w-full max-w-sm mt-4 py-2.5 rounded-lg font-medium transition-all duration-200 relative overflow-hidden ${
            isValid && !checking && !verifying
              ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          {checking || verifying ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {verifying ? "Verifying..." : "Checking..."}
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
        
        @keyframes pulseSuccess {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
        .animate-pulse-success {
          animation: pulseSuccess 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default EmailTab;
