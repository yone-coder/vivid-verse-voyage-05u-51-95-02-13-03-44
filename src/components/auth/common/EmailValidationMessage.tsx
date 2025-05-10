
import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface EmailValidationMessageProps {
  message: string | null;
}

const EmailValidationMessage = ({ message }: EmailValidationMessageProps) => {
  if (!message) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="flex items-start gap-1.5 text-xs text-destructive mt-1.5 bg-destructive/5 px-3 py-1.5 rounded-md border border-destructive/10 overflow-hidden"
      id="email-validation-error"
      role="alert"
    >
      <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
      <span>{message}</span>
    </motion.div>
  );
};

export default EmailValidationMessage;
