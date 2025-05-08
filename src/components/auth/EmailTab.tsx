
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Mail, Check, X, Info, Loader2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/components/theme-provider";

// Import our extracted components
import EmailStrengthMeter from './EmailStrengthMeter';
import EmailSuggestions from './EmailSuggestions';
import EmailValidationMessage from './EmailValidationMessage';
import { 
  premiumDomains, 
  normalizeEmail, 
  generateSuggestions, 
  getEmailStrength,
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
  const [showStrengthMeter, setShowStrengthMeter] = useState(false);
  const [typoSuggestion, setTypoSuggestion] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  
  // Memoize validation message to prevent recalculations on render
  const validationMessage = useMemo(() => {
    if (!submitted && (focused || email.length === 0)) return null;
    return getValidationMessage(email, setTypoSuggestion);
  }, [email, submitted, focused]);
  
  const isValid = !validationMessage && email.length > 0;

  // Memoize email strength to prevent recalculation
  const emailStrength = useMemo(() => getEmailStrength(email), [email]);

  // Check email format and simulate validation
  useEffect(() => {
    if (email.includes('@') && email.includes('.') && email.length > 8) {
      setChecking(true);
      const timer = setTimeout(() => {
        setChecking(false);
        setShowStrengthMeter(true);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setShowStrengthMeter(false);
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
    setShowStrengthMeter(false);
    if (inputRef.current) inputRef.current.focus();
  }, [setEmail]);

  const applyTypoSuggestion = useCallback(() => {
    if (typoSuggestion) {
      setEmail(typoSuggestion);
      setTypoSuggestion(null);
    }
  }, [typoSuggestion, setEmail]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (onSubmit && isValid) onSubmit(e);
  }, [onSubmit, isValid]);

  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      {/* Label with tooltip */}
      <Label htmlFor="email" className="block font-medium text-sm mb-1.5 text-foreground flex items-center">
        Email address
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <div className="relative group ml-1.5">
                <Info 
                  className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" 
                  aria-label="Info" 
                />
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-[220px] p-3">
              <p className="text-xs">We'll never share your email. Format: name@example.com</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Label>

      {/* Email Input with icons */}
      <div className="relative">
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
            validationMessage 
              ? 'border-destructive focus:border-destructive focus:ring-destructive/20 bg-destructive/5' 
              : isValid 
                ? 'border-green-500 focus:border-green-600 focus:ring-green-200 bg-green-50/30 dark:bg-green-950/10' 
                : focused 
                  ? 'border-primary/30 focus:border-primary focus:ring-primary/20' 
                  : 'border-input hover:border-input focus:border-input focus:ring-ring/20'
          }`}
          autoComplete="email"
          aria-invalid={!!validationMessage}
          aria-describedby={validationMessage ? "email-validation-error" : undefined}
        />

        {/* Status Indicators */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {checking && (
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

          {isValid && !checking && (
            <Check
              className="h-4 w-4 text-green-500 animate-fadeIn"
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

      {/* Validation Message */}
      <AnimatePresence>
        {validationMessage && (
          <EmailValidationMessage message={validationMessage} />
        )}
      </AnimatePresence>

      {/* Email Strength Meter */}
      <AnimatePresence>
        {showStrengthMeter && isValid && (
          <EmailStrengthMeter score={emailStrength.score} messages={emailStrength.messages} />
        )}
      </AnimatePresence>

      {/* Email Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div ref={suggestionsRef}>
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
              Checking...
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

export default EmailTab;
