'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

import { EmailValidationMessage } from '@/components/forms/EmailField/EmailValidationMessage';
import { getValidationMessage } from '@/components/forms/EmailField/EmailUtils';
import { EmailFieldProps } from '@/components/forms/EmailField/EmailFieldProps';

export function EmailField({
  email,
  setEmail,
  submitted,
  errorMessage,
  className,
}: EmailFieldProps) {
  const [focused, setFocused] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [typoSuggestion, setTypoSuggestion] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (email.length === 0) {
      setValidationMessage('');
      setTypoSuggestion('');
      return;
    }

    const message = getValidationMessage(email, setTypoSuggestion);
    setValidationMessage(message);
  }, [email]);

  const handleTypoSuggestionClick = useCallback(() => {
    if (!typoSuggestion) return;
    const suggestionDomain = typoSuggestion.split('@')[1];
    const emailParts = email.split('@');
    if (emailParts.length !== 2) return;

    const correctedEmail = `${emailParts[0]}@${suggestionDomain}`;
    setEmail(correctedEmail);
    setTypoSuggestion('');
    inputRef.current?.focus();
  }, [typoSuggestion, email, setEmail]);

  return (
    <div className={twMerge('w-full', className)}>
      <div className="relative">
        <input
          ref={inputRef}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="you@example.com"
          aria-label="Email address"
          className={twMerge(
            'peer w-full appearance-none rounded-md border px-4 py-2 text-sm text-white placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
            errorMessage
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-600'
          )}
        />

        {typoSuggestion && (
          <button
            type="button"
            onClick={handleTypoSuggestionClick}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-blue-400 hover:underline"
          >
            Did you mean <strong>{typoSuggestion}</strong>?
          </button>
        )}
      </div>

      <AnimatePresence>
        {validationMessage && !errorMessage && (
          <EmailValidationMessage message={validationMessage} />
        )}
      </AnimatePresence>

      {errorMessage && (
        <p className="mt-2 text-sm text-red-500" id="email-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}