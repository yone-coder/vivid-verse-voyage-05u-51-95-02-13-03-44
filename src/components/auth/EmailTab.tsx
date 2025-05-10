
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AtSign } from "lucide-react";
import { validateEmail, findEmailProvider } from './EmailUtils';
import EmailValidationMessage from './EmailValidationMessage';
import EmailSuggestions from './EmailSuggestions';
import EmailStrengthMeter from './EmailStrengthMeter';

interface EmailTabProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit?: ((e: React.FormEvent) => void) | undefined;
  showSubmitButton?: boolean;
}

const EmailTab: React.FC<EmailTabProps> = ({ 
  email, 
  setEmail, 
  onSubmit, 
  showSubmitButton = false 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [emailStrength, setEmailStrength] = useState(0);
  const [validationMessage, setValidationMessage] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Validate email and update UI states
  useEffect(() => {
    if (!email) {
      setValidationMessage("");
      setSuggestions([]);
      setShowSuggestions(false);
      setEmailStrength(0);
      return;
    }

    // Clear previous timeout
    if (typingTimeout) {
      window.clearTimeout(typingTimeout);
    }

    // Set typing state
    setIsTyping(true);

    // Set new timeout
    const timeoutId = window.setTimeout(() => {
      setIsTyping(false);
      
      // Validate email
      const { isValid, message, suggestions: emailSuggestions } = validateEmail(email);
      setValidationMessage(message);
      
      // Only show suggestions if email is not empty and has @ symbol
      const shouldShowSuggestions = email.includes('@') && email.split('@')[1] !== '';
      setShowSuggestions(shouldShowSuggestions && emailSuggestions.length > 0);
      setSuggestions(emailSuggestions);
      
      // Calculate email strength (0-100)
      let strength = 0;
      
      if (email.length > 5) strength += 20;
      if (email.includes('@')) strength += 30;
      if (email.split('@')[1]?.includes('.')) strength += 20;
      if (isValid) strength += 30;
      
      setEmailStrength(strength);
    }, 300);

    setTypingTimeout(Number(timeoutId));
  }, [email]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setEmail(suggestion);
    setShowSuggestions(false);
  };

  // Get email provider info for icon
  const emailProvider = findEmailProvider(email);

  return (
    <div className="space-y-1">
      <div className="relative">
        <div className="flex items-center">
          <Label 
            htmlFor="email" 
            className="text-sm font-medium text-muted-foreground mb-1.5 ml-1"
          >
            Email
          </Label>
          <EmailStrengthMeter strength={emailStrength} />
        </div>
        
        <div className="relative flex items-center">
          <div className="absolute left-3 flex items-center text-muted-foreground">
            {emailProvider ? (
              <img 
                src={emailProvider.icon} 
                alt={`${emailProvider.name} icon`}
                className="w-4 h-4"
              />
            ) : (
              <AtSign className="w-4 h-4" />
            )}
          </div>
          
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full pl-9 pr-4"
            value={email}
            onChange={handleEmailChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoComplete="email"
          />
        </div>
        
        {showSuggestions && (
          <EmailSuggestions 
            suggestions={suggestions} 
            onSelect={handleSuggestionClick}
          />
        )}
        
        {validationMessage && !isTyping && (
          <EmailValidationMessage message={validationMessage} />
        )}
      </div>
      
      {showSubmitButton && onSubmit && (
        <Button 
          onClick={(e) => {
            e.preventDefault();
            if (onSubmit) onSubmit(e as React.FormEvent);
          }} 
          type="submit" 
          className="w-full mt-4"
        >
          Continue with Email
        </Button>
      )}
    </div>
  );
};

export default EmailTab;
