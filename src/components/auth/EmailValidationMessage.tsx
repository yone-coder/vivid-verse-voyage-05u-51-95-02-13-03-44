
import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Check } from 'lucide-react';

interface EmailValidationMessageProps {
  message: string | null;
  typoSuggestion?: string | null;
  onApplySuggestion?: () => void;
  showWhileTyping?: boolean;
}

const EmailValidationMessage = ({ 
  message, 
  typoSuggestion, 
  onApplySuggestion,
  showWhileTyping = false
}: EmailValidationMessageProps) => {
  if (!message) return null;
  
  // Extract domain from typo suggestion for simpler display
  const extractDomain = () => {
    if (!typoSuggestion) return null;
    const match = typoSuggestion.match(/@([^@]+)$/);
    return match ? match[1] : null;
  };

  const domain = extractDomain();
  
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="flex items-start gap-1.5 text-xs text-destructive mt-1.5 bg-destructive/5 px-3 py-1.5 rounded-md border border-destructive/10 overflow-hidden w-full"
      id="email-validation-error"
      role="alert"
    >
      <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
      
      <span>{message}</span>
      
      {typoSuggestion && onApplySuggestion && (
        <button 
          type="button" 
          onClick={onApplySuggestion} 
          className="flex items-center gap-1 ml-auto text-xs text-primary hover:text-primary/90 hover:underline"
          aria-label="Use corrected email"
        >
          <span>Click to correct</span>
          <Check className="h-3 w-3" />
        </button>
      )}
    </motion.div>
  );
};

export default EmailValidationMessage;
