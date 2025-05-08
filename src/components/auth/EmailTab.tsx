import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, Check, X, AlertCircle, Info, Loader2, Mail, Shield, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/components/theme-provider";

interface EmailTabProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  showSubmitButton?: boolean;
}

const premiumDomains = [
  { name: 'Gmail', domain: 'gmail.com', url: 'https://gmail.com' },
  { name: 'Yahoo', domain: 'yahoo.com', url: 'https://yahoo.com' },
  { name: 'Outlook', domain: 'outlook.com', url: 'https://outlook.com' },
  { name: 'iCloud', domain: 'icloud.com', url: 'https://icloud.com' },
  { name: 'ProtonMail', domain: 'protonmail.com', url: 'https://protonmail.com' },
  { name: 'AOL', domain: 'aol.com', url: 'https://aol.com' },
  { name: 'Zoho', domain: 'zoho.com', url: 'https://zoho.com' },
  { name: 'Tutanota', domain: 'tutanota.com', url: 'https://tutanota.com' },
];

const disposableDomainPatterns = [
  /10minutemail/, /mailinator/, /tempmail/, /guerrillamail/, /yopmail/, /throwawaymail/,
  /tempinbox/, /fakeinbox/, /mailnesia/, /dispostable/, /mailnull/, /spamgourmet/,
  /mytemp.email/, /sharklasers/, /trashmail/, /mailcatch/, /discard.email/, /temp-mail/
];

// Common email typos to suggest corrections for
const commonTypos: Record<string, string> = {
  'gmail.co': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gnail.com': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'hotmail.co': 'hotmail.com',
  'hotmal.com': 'hotmail.com',
  'yahoomail.com': 'yahoo.com',
  'yaho.com': 'yahoo.com',
  'yahooo.com': 'yahoo.com',
  'ymail.co': 'ymail.com',
  'outloo.com': 'outlook.com',
  'outlok.com': 'outlook.com',
  'iclod.com': 'icloud.com',
  'icoud.com': 'icloud.com'
};

// Email strength criteria
const getEmailStrength = (email: string): {
  score: number;
  messages: {text: string, positive: boolean}[];
} => {
  if (!email || !email.includes('@')) return { score: 0, messages: [] };
  
  const [localPart, domain] = email.split('@');
  if (!localPart || !domain) return { score: 0, messages: [] };
  
  let score = 0;
  const messages: {text: string, positive: boolean}[] = [];
  
  // Domain checks
  if (domain && domain.includes('.')) {
    score += 2;
    
    // Check for premium domain
    const isPremium = premiumDomains.some(pd => pd.domain === domain.toLowerCase());
    if (isPremium) {
      score += 1;
      messages.push({text: 'Using a recognized email provider', positive: true});
    }
    
    // Check for typos
    const potentialTypo = Object.keys(commonTypos).find(typo => domain.toLowerCase() === typo);
    if (potentialTypo) {
      score -= 1;
      messages.push({text: `Did you mean ${commonTypos[potentialTypo]}?`, positive: false});
    }
    
    // Check for disposable domain
    const isDisposable = disposableDomainPatterns.some(pattern => pattern.test(domain.toLowerCase()));
    if (isDisposable) {
      score -= 3;
      messages.push({text: 'Temporary email addresses are not accepted', positive: false});
    }
  }
  
  // Local part checks
  if (localPart) {
    // Length
    if (localPart.length > 5) {
      score += 1;
    }
    
    // Contains numbers
    if (/\d/.test(localPart)) {
      score += 1;
    }
    
    // Contains special chars
    if (/[._-]/.test(localPart)) {
      score += 1;
      messages.push({text: 'Email contains special characters', positive: true});
    }
    
    // Contains both letters and numbers
    if (/[a-zA-Z]/.test(localPart) && /\d/.test(localPart)) {
      score += 1;
      messages.push({text: 'Good mix of letters and numbers', positive: true});
    }
  }
  
  // Email format validation
  const strictRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (strictRegex.test(email)) {
    score += 2;
  } else {
    score -= 2;
    messages.push({text: 'Invalid email format', positive: false});
  }
  
  return { score, messages };
};

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
  
  // Helper: Normalize and lowercase domain
  const normalizeEmail = (val: string) => {
    const atIndex = val.indexOf('@');
    if (atIndex === -1) return val; // no @ yet, return raw input
    const local = val.slice(0, atIndex);
    const domain = val.slice(atIndex + 1).toLowerCase();
    return `${local}@${domain}`;
  };

  // Helper: Detect disposable provider
  const isDisposableDomain = (domain: string) =>
    disposableDomainPatterns.some((pattern) => pattern.test(domain));

  // Contextual validation
  const getValidationMessage = (email: string) => {
    if (!email) return null;
    if (email.length < 4) return 'Enter at least 4 characters.';
    if (!email.includes('@')) return 'Missing "@" symbol. Example: name@example.com';
    const [localPart, domainPart] = email.split('@');
    if (!localPart) return 'Please enter your email username (before @)';
    if (!domainPart) return 'Please enter a domain (after @)';
    if (domainPart.length < 5) return 'Incomplete domain. Example: gmail.com';
    if (domainPart.split('.').length < 2 || domainPart.endsWith('.'))
      return 'Invalid domain format. Example: example.com';
    if (isDisposableDomain(domainPart)) return 'Please use a permanent, non-disposable email.';
    
    // Check for common typos in domain
    for (const typo in commonTypos) {
      if (domainPart === typo) {
        setTypoSuggestion(`${localPart}@${commonTypos[typo]}`);
        return `Did you mean ${commonTypos[typo]}? (Click to correct)`;
      }
    }
    setTypoSuggestion(null);
    
    // Stricter validation
    const strictRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!strictRegex.test(normalizeEmail(email))) return 'Please enter a valid email address';
    return null;
  };

  const validationMessage = (submitted || (!focused && email.length > 0)) ? getValidationMessage(email) : null;
  const isValid = !validationMessage && email.length > 0;
  const emailStrength = getEmailStrength(email);

  // Generate suggestions as user types
  const generateSuggestions = useCallback((input: string) => {
    const trimmed = input.trim();
    if (trimmed.length < 3) return [];

    let partialDomain = '';
    let username = trimmed;

    if (trimmed.includes('@')) {
      [username, partialDomain] = trimmed.split('@');
      // If domain includes dot, assume complete — don't show suggestions
      if (partialDomain.includes('.')) return [];
    }

    if (!username) return [];

    const lowerPartial = partialDomain?.toLowerCase() || '';
    return premiumDomains
      .filter(({ domain }) => domain.startsWith(lowerPartial))
      .slice(0, 6)
      .map(({ domain }) => `${username}@${domain}`);
  }, []);

  // Simulate validation check
  useEffect(() => {
    if (email.includes('@') && email.includes('.') && email.length > 8) {
      setChecking(true);
      const timer = setTimeout(() => {
        setChecking(false);
        // Show strength meter after checking completes
        setShowStrengthMeter(true);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setShowStrengthMeter(false);
    }
  }, [email]);

  // Debounced validation and suggestions
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
  }, [email, focused, generateSuggestions]);

  // Keyboard navigation (ArrowDown/Up/Enter/Escape)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      setHoveredIndex((i) => (i + 1) % suggestions.length);
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      setHoveredIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
      e.preventDefault();
    } else if (e.key === 'Enter' && hoveredIndex !== -1) {
      setEmail(normalizeEmail(suggestions[hoveredIndex]));
      setShowSuggestions(false);
      inputRef.current?.focus();
      e.preventDefault();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      e.preventDefault();
    }
  };

  const handleFocus = () => {
    setFocused(true);
    setSubmitted(false);
    // Show suggestions if we already have some and the email field has content
    if (suggestions.length > 0 && email.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Don't hide suggestions if we're clicking on them
    if (suggestionsRef.current?.contains(e.relatedTarget as Node)) {
      return;
    }
    
    // Use setTimeout to allow click events on suggestions to fire before hiding them
    setTimeout(() => {
      if (document.activeElement !== inputRef.current && 
          !suggestionsRef.current?.contains(document.activeElement)) {
        setFocused(false);
        setShowSuggestions(false);
      }
    }, 200);
  };

  // Updated to ensure selected suggestion is properly set in the input field
  const selectSuggestion = (suggestion: string) => {
    // Normalize and set the email
    const normalizedEmail = normalizeEmail(suggestion);
    setEmail(normalizedEmail);
    setShowSuggestions(false);
    
    // Ensure we focus the input field after selection
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        setFocused(true);
      }
    }, 10);
  };

  const clearInput = () => {
    setEmail('');
    setSuggestions([]);
    setShowStrengthMeter(false);
    inputRef.current?.focus();
  };

  const applyTypoSuggestion = () => {
    if (typoSuggestion) {
      setEmail(typoSuggestion);
      setTypoSuggestion(null);
    }
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (onSubmit && isValid) onSubmit(e);
  };

  // Strength meter coloration
  const getStrengthColor = (score: number) => {
    if (score < 0) return 'bg-red-500';
    if (score < 3) return 'bg-orange-400';
    if (score < 5) return 'bg-yellow-400';
    if (score < 7) return 'bg-green-400';
    return 'bg-emerald-500';
  };

  const getStrengthWidth = (score: number) => {
    const baseScore = Math.max(0, Math.min(score, 10));
    return `${(baseScore / 10) * 100}%`;
  };

  const getStrengthLabel = (score: number) => {
    if (score < 0) return 'Poor';
    if (score < 3) return 'Weak';
    if (score < 5) return 'Fair';
    if (score < 7) return 'Good';
    return 'Excellent';
  };

  // Theme-aware style constants
  const primaryColor = 'hsl(var(--primary))';
  const primaryHoverColor = theme === 'dark' ? 'hsl(var(--primary-foreground))' : 'hsl(var(--primary))';
  const focusRingColor = 'hsl(var(--ring))';
  const inputBgColor = theme === 'dark' ? 'hsl(var(--input))' : 'hsl(var(--background))';
  const errorColor = 'hsl(var(--destructive))';
  const successColor = 'hsl(var(--success, 142 71% 45%))';

  return (
    <div className="w-full max-w-md mx-auto space-y-2">
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

      {/* Input Field - Cleaned up design */}
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
          style={{
            boxShadow: focused ? `0 0 0 1px ${validationMessage ? 'hsl(var(--destructive))' : isValid ? 'hsl(142, 71%, 45%)' : 'hsl(var(--primary))'}` : 'none',
            transition: 'all 0.2s ease',
          }}
          autoComplete="email"
          aria-invalid={!!validationMessage}
          aria-describedby={validationMessage ? "email-validation-error" : undefined}
        />

        {/* Status Indicators */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {/* Checking Indicator */}
          {checking && (
            <Loader2 className="h-4 w-4 text-muted-foreground animate-spin mr-1" aria-label="Checking email" />
          )}
          
          {/* Clear Button */}
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

          {/* Success Icon */}
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
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-1.5 text-xs text-destructive mt-1.5 bg-destructive/5 px-3 py-1.5 rounded-md border border-destructive/10 overflow-hidden"
            id="email-validation-error"
            role="alert"
          >
            <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
            <span>{validationMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email Strength Meter */}
      <AnimatePresence>
        {showStrengthMeter && isValid && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 space-y-1.5 overflow-hidden"
          >
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-1">
                <Shield className={`h-3.5 w-3.5 ${emailStrength.score < 3 ? 'text-orange-400' : emailStrength.score < 7 ? 'text-yellow-500' : 'text-green-500'}`} />
                <span className="font-medium">Email security: {getStrengthLabel(emailStrength.score)}</span>
              </div>
              <span className="text-muted-foreground">{Math.max(0, Math.min(emailStrength.score, 10))}/10</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full ${getStrengthColor(emailStrength.score)} transition-all duration-500 ease-out`}
                style={{ width: getStrengthWidth(emailStrength.score) }}
              ></div>
            </div>
            
            {/* Email Strength Feedback Messages */}
            <div className="space-y-1">
              {emailStrength.messages.map((msg, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-xs">
                  {msg.positive ? (
                    <Check className="h-3 w-3 text-green-500 mt-0.5" />
                  ) : (
                    <X className="h-3 w-3 text-destructive mt-0.5" />
                  )}
                  <span className={msg.positive ? 'text-green-600 dark:text-green-400' : 'text-destructive'}>
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Domain Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="flex flex-wrap gap-2 mt-2 animate-fadeIn"
        >
          {suggestions.map((sugg, index) => {
            const domain = sugg.split('@')[1];
            const provider = premiumDomains.find(pd => pd.domain === domain);
            
            return (
              <button
                key={sugg}
                type="button"
                onClick={() => selectSuggestion(sugg)}
                onMouseEnter={() => setHoveredIndex(index)}
                className={`flex items-center text-xs px-3 py-1.5 rounded-full transition-all duration-150 ${
                  hoveredIndex === index
                    ? 'bg-primary/10 text-primary shadow-sm'
                    : 'bg-muted text-muted-foreground hover:bg-primary/5 hover:text-primary/90'
                }`}
              >
                @{domain}
                {provider && (
                  <a 
                    href={provider.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="ml-1.5 text-muted-foreground hover:text-foreground"
                    title={`Visit ${provider.name}`}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Submit Button */}
      {showSubmitButton && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
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
              <>
                <span className="relative z-10">Continue</span>
              </>
            )}
          </button>
        </motion.div>
      )}

      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateY(-5px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
        .animate-slideIn {
          animation: slideIn 0.2s ease-in-out;
        }
        `}
      </style>
    </div>
  );
};

export default EmailTab;
