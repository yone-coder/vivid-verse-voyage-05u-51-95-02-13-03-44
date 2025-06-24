
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Mail, HelpCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface EmailAuthScreenProps {
  onBack: () => void;
  selectedLanguage: string;
  onContinueWithPassword: (email: string) => void;
  onContinueWithCode: (email: string) => void;
  initialEmail?: string;
}

const EmailAuthScreen: React.FC<EmailAuthScreenProps> = ({ 
  onBack, 
  selectedLanguage, 
  onContinueWithPassword, 
  onContinueWithCode,
  initialEmail = ''
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { checkUserExists, signUp } = useAuth();
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Update email validation when component mounts or initialEmail changes
  useEffect(() => {
    if (initialEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsEmailValid(emailRegex.test(initialEmail));
    }
  }, [initialEmail]);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(value));
  };

  const handleContinueWithPassword = async () => {
    if (!isEmailValid || isLoading) return;

    setIsLoading(true);
    try {
      const userExists = await checkUserExists(email);
      if (userExists) {
        onContinueWithPassword(email);
      } else {
        // User doesn't exist, create account
        await signUp(email, 'tempPassword123!'); // You might want to collect password first
        toast.success('Account created! Please check your email to verify your account.');
      }
    } catch (error) {
      console.error('Error checking user:', error);
      // Fallback to password screen if check fails
      onContinueWithPassword(email);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueWithCode = () => {
    if (!isEmailValid || isLoading) return;
    onContinueWithCode(email);
  };

  const faviconOverrides: Record<string, string> = {
    'gmail.com': 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico',
  };

  const domain = email.split('@')[1] || '';
  const faviconUrl = faviconOverrides[domain] || `https://www.google.com/s2/favicons?domain=${domain}`;

  return (
    <div className="min-h-screen bg-white flex flex-col px-4">
      {/* Header */}
      <div className="pt-2 pb-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
          aria-label="Go back"
          disabled={isLoading}
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        <h2 className="text-lg font-semibold text-gray-900">
          Continue with Email
        </h2>

        <button
          className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
          aria-label="Help"
          onClick={() => alert('Need help? Contact support@example.com')}
          type="button"
          disabled={isLoading}
        >
          <HelpCircle className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4 px-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 h-1 bg-red-500 rounded-full"></div>
          <div className="flex-1 h-1 bg-red-500 rounded-full"></div>
          <div className="flex-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="flex-1 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Main content container */}
      <div className="flex-1 flex flex-col w-full max-w-md mx-auto relative">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            What's your email?
          </h1>
          <p className="text-gray-600">
            We'll check if you have an account or create a new one
          </p>
        </div>

        {/* Email input */}
        <div className="mb-6 relative">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email address
          </label>
          <div className="relative">
            {faviconUrl && email ? (
              <img
                src={faviconUrl}
                alt="Email provider favicon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 rounded"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            )}

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="Enter your email address"
              autoComplete="email"
              ref={emailInputRef}
              disabled={isLoading}
              className="relative w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors bg-transparent disabled:opacity-50"
            />
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <button
            disabled={!isEmailValid || isLoading}
            onClick={handleContinueWithPassword}
            className={`w-full flex items-center justify-center gap-3 py-4 px-4 rounded-lg font-medium transition-all ${
              isEmailValid && !isLoading
                ? 'bg-red-500 text-white hover:bg-red-600 active:scale-98'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            type="button"
          >
            <Mail className="w-5 h-5" />
            <span>{isLoading ? 'Checking...' : 'Continue with Password'}</span>
          </button>

          <button
            disabled={!isEmailValid || isLoading}
            onClick={handleContinueWithCode}
            className={`w-full flex items-center justify-center gap-3 py-4 px-4 border-2 rounded-lg font-medium transition-all ${
              isEmailValid && !isLoading
                ? 'border-red-500 text-red-500 hover:bg-red-50 active:scale-98'
                : 'border-gray-300 text-gray-400 cursor-not-allowed'
            }`}
            type="button"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span>Send Verification Code</span>
          </button>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18,8A6,6 0 0,0 12,2A6,6 0 0,0 6,8H4C2.89,8 2,8.89 2,10V20A2,2 0 0,0 4,22H20A2,2 0 0,0 22,20V10C22,8.89 21.1,8 20,8H18M12,4A4,4 0 0,1 16,8H8A4,4 0 0,1 12,4Z"/>
            </svg>
            <span className="text-gray-500 text-sm">Your email is safe with us</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailAuthScreen;
