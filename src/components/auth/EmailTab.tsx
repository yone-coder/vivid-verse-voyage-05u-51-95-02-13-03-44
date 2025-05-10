
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'; import { Input } from "@/components/ui/input"; import { Mail, MailIcon, SparklesIcon, Check, X, Info, InfoIcon, Loader2, AlertTriangle } from 'lucide-react'; import { motion, AnimatePresence } from 'framer-motion'; import { useTheme } from "@/components/theme-provider"; import { supabase } from '@/integrations/supabase/client'; import { toast } from 'sonner';

import EmailSuggestions from './EmailSuggestions'; import EmailValidationMessage from './EmailValidationMessage'; import { premiumDomains, normalizeEmail, generateSuggestions, getValidationMessage } from './EmailUtils';

interface EmailTabProps { email: string; setEmail: (email: string) => void; onSubmit?: (e: React.FormEvent) => void; showSubmitButton?: boolean; }

const containerVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 12, staggerChildren: 0.15, }, }, };

const childVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15, }, }, };

const EmailTab = ({ email, setEmail, onSubmit, showSubmitButton = false }: EmailTabProps) => { const { theme } = useTheme(); const [focused, setFocused] = useState(false); const [showSuggestions, setShowSuggestions] = useState(false); const [suggestions, setSuggestions] = useState<string[]>([]); const [hoveredIndex, setHoveredIndex] = useState(-1); const [submitted, setSubmitted] = useState(false); const [checking, setChecking] = useState(false); const [verifying, setVerifying] = useState(false); const [typoSuggestion, setTypoSuggestion] = useState<string | null>(null); const [showValidationSuccess, setShowValidationSuccess] = useState(false); const [emailExists, setEmailExists] = useState<boolean | null>(null); const [errorMessage, setErrorMessage] = useState<string | null>(null); const inputRef = useRef(null); const suggestionsRef = useRef(null); const debounceRef = useRef<NodeJS.Timeout | null>(null);

useEffect(() => { return () => { setErrorMessage(null); setEmailExists(null); setSubmitted(false); }; }, []);

const validationMessage = useMemo(() => { if (!submitted && (focused || email.length === 0)) return null; return getValidationMessage(email, setTypoSuggestion); }, [email, submitted, focused]);

const isValid = !validationMessage && email.length > 0;

useEffect(() => { if (isValid && email.includes('@') && email.includes('.') && email.length > 8) { setShowValidationSuccess(true); const timer = setTimeout(() => { setShowValidationSuccess(false); }, 1500); return () => clearTimeout(timer); } }, [isValid, email]);

useEffect(() => { if (email.includes('@') && email.includes('.') && email.length > 8) { setChecking(true); const timer = setTimeout(() => { setChecking(false); }, 600); return () => clearTimeout(timer); } }, [email]);

useEffect(() => { if (debounceRef.current) clearTimeout(debounceRef.current); debounceRef.current = setTimeout(() => { const newSuggestions = generateSuggestions(email); setSuggestions(newSuggestions); setShowSuggestions(newSuggestions.length > 0 && focused); setHoveredIndex(-1); }, 180);
return () => { if (debounceRef.current) clearTimeout(debounceRef.current); }; 
}, [email, focused]);

const checkEmailExists = async (emailToCheck: string) => { if (!isValid || !emailToCheck) return false; setVerifying(true); setErrorMessage(null); try { const { data, error } = await supabase.auth.signInWithOtp({ email: emailToCheck, options: { shouldCreateUser: false } }); if (!error || error.message.includes("Email not confirmed")) { setEmailExists(true); setVerifying(false); return true; } } catch {}
try {   const { data, error } = await supabase.from('profiles').select('id').eq('email', emailToCheck).maybeSingle();   const exists = !!data;   setEmailExists(exists);   if (!exists) {     setErrorMessage("This email is not registered");     toast.error("This email is not registered");   }   setVerifying(false);   return exists; } catch {   try {     const { error } = await supabase.auth.signInWithPassword({       email: emailToCheck,       password: "check_if_email_exists_" + Math.random().toString(36)     });     if (error?.message.includes("Invalid login credentials") || error?.message.includes("Email not confirmed")) {       setEmailExists(true);       setVerifying(false);       return true;     } else {       setEmailExists(false);       setErrorMessage("This email is not registered");       setVerifying(false);       return false;     }   } catch {     setErrorMessage("Failed to verify email");     setVerifying(false);     return false;   } } 
};

const handleKeyDown = useCallback((e: React.KeyboardEvent) => { if (!showSuggestions || suggestions.length === 0) return; if (e.key === 'ArrowDown') { e.preventDefault(); setHoveredIndex((i) => (i + 1) % suggestions.length); } else if (e.key === 'ArrowUp') { e.preventDefault(); setHoveredIndex((i) => (i - 1 + suggestions.length) % suggestions.length); } else if (e.key === 'Enter' && hoveredIndex !== -1) { e.preventDefault(); setEmail(normalizeEmail(suggestions[hoveredIndex])); setShowSuggestions(false); inputRef.current?.focus(); } else if (e.key === 'Escape') { e.preventDefault(); setShowSuggestions(false); } }, [showSuggestions, suggestions, hoveredIndex, setEmail]);

const handleFocus = useCallback(() => { setFocused(true); setSubmitted(false); setErrorMessage(null); if (suggestions.length > 0 && email.length > 0) { setShowSuggestions(true); } }, [suggestions.length, email.length]);

const handleBlur = useCallback((e: React.FocusEvent) => { if (suggestionsRef.current?.contains(e.relatedTarget as Node)) return; setTimeout(() => { if (document.activeElement !== inputRef.current && !suggestionsRef.current?.contains(document.activeElement)) { setFocused(false); setShowSuggestions(false); } }, 200); }, []);

const selectSuggestion = useCallback((suggestion: string) => { setEmail(normalizeEmail(suggestion)); setShowSuggestions(false); setTimeout(() => inputRef.current?.focus(), 10); }, [setEmail]);

const clearInput = useCallback(() => { setEmail(''); setSuggestions([]); setEmailExists(null); setErrorMessage(null); inputRef.current?.focus(); }, [setEmail]);

const applyTypoSuggestion = useCallback(() => { if (typoSuggestion) { setEmail(typoSuggestion); setTypoSuggestion(null); } }, [typoSuggestion, setEmail]);

const handleEmailSubmit = async (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); if (isValid) { try { const exists = await checkEmailExists(email); if (exists) { onSubmit?.(e); } else { setErrorMessage("This email is not registered"); toast.error("This email is not registered. Please sign up first."); } } catch { toast.error("Failed to verify email"); } } };

const handleSubmit = showSubmitButton ? handleEmailSubmit : undefined;

return (
<motion.header className="text-center mb-4" variants={containerVariants} initial="hidden" animate="visible" > <motion.h2 className="text-base font-semibold text-foreground mb-1" variants={childVariants}> Let’s get started </motion.h2> <motion.p className="text-sm text-muted-foreground" variants={childVariants}> Please enter your email to {emailExists === false ? "create your account" : "continue"}. </motion.p> </motion.header>
<Input ref={inputRef} id="email" type="email" spellCheck="false" autoCorrect="off" autoCapitalize="none" value={email} onChange={(e) => setEmail(normalizeEmail(e.target.value))} onFocus={handleFocus} onBlur={handleBlur} onKeyDown={handleKeyDown} placeholder="john.doe@example.com" className={w-full pl-10 pr-10 h-11 text-sm bg-background transition-all duration-300 ease-in-out rounded-md shadow-sm focus:shadow-md ${ validationMessage || errorMessage ? 'border-destructive focus:border-destructive focus:ring-destructive/20 bg-destructive/5' : isValid ? 'border-green-500 focus:border-green-600 focus:ring-green-200 bg-green-50/30 dark:bg-green-950/10' : focused ? 'border-primary/30 focus:border-primary focus:ring-primary/20' : 'border-input hover:border-input focus:border-input focus:ring-ring/20' }} autoComplete="email" aria-invalid={!!validationMessage || !!errorMessage} aria-describedby={validationMessage ? 'email-validation-error' : undefined} /> {(checking || verifying) && } {isValid && !checking && !verifying && !errorMessage && ( <Check className={h-4 w-4 text-green-500 absolute right-3 top-3.5 ${showValidationSuccess ? 'animate-bounce' : 'animate-fadeIn'}} aria-label="Valid email" /> )} {email.length > 0 && (    )} {typoSuggestion && (  Did you mean: {typoSuggestion}?   )} {errorMessage && (
{errorMessage}
)}  {validationMessage && !errorMessage && (  )}  {showSuggestions && suggestions.length > 0 && (

)} {showSubmitButton && ( <button type="submit" disabled={!isValid || checking || verifying} className={w-full max-w-sm mt-4 py-2.5 rounded-lg font-medium transition-all duration-200 relative overflow-hidden ${ isValid && !checking && !verifying ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow' : 'bg-muted text-muted-foreground cursor-not-allowed' }} > {checking || verifying ? (   {verifying ? "Verifying..." : "Checking..."}  ) : ( Continue )}  )}
); };

export default EmailTab;

