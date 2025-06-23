
import React, { useState, useEffect, useCallback } from 'react';
import { Eye, EyeOff, ArrowRight, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSelector from '@/components/common/LanguageSelector';
import CompactPhoneInput from '@/components/ui/compact-phone-input';
import { toast } from 'sonner';

const SignInScreen: React.FC = () => {
  const { signIn, signUp, checkUserExists, isLoading } = useAuth();
  const { t } = useLanguage();
  
  const [step, setStep] = useState<'contact' | 'signin' | 'signup'>('contact');
  const [contactType, setContactType] = useState<'email' | 'phone'>('email');
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [emailValidation, setEmailValidation] = useState<{
    state: 'valid' | 'invalid' | null;
    message: string;
  }>({ state: null, message: '' });
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    rememberMe: false
  });

  // Simple email validation
  const validateEmail = useCallback((email: string) => {
    if (!email) {
      setEmailValidation({ state: null, message: '' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidFormat = emailRegex.test(email);
    
    if (!isValidFormat) {
      setEmailValidation({ 
        state: 'invalid', 
        message: 'Please enter a valid email address' 
      });
      return;
    }

    setEmailValidation({ 
      state: 'valid', 
      message: '' 
    });
  }, []);

  // Debounced email validation
  useEffect(() => {
    if (contactType === 'email' && formData.email) {
      const timeoutId = setTimeout(() => {
        validateEmail(formData.email);
      }, 500);
      
      return () => clearTimeout(timeoutId);
    }
  }, [formData.email, contactType, validateEmail]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEmailSuggestionSelect = (suggestion: string) => {
    handleInputChange('email', suggestion);
    validateEmail(suggestion);
  };

  const handleContactStep = async () => {
    const contactValue = contactType === 'email' ? formData.email : formData.phone;
    
    if (!contactValue) {
      toast.error(`Please enter your ${contactType}`);
      return;
    }

    if (contactType === 'email') {
      if (emailValidation.state !== 'valid') {
        toast.error('Please enter a valid email address');
        return;
      }
    } else {
      const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(formData.phone)) {
        toast.error('Please enter a valid phone number');
        return;
      }
    }

    setIsCheckingUser(true);
    
    try {
      if (contactType === 'email') {
        const exists = await checkUserExists(formData.email);
        setUserExists(exists);
        
        if (exists) {
          setStep('signin');
          toast.info('Welcome back! Please enter your password.');
        } else {
          setStep('signup');
          toast.info('New here? Let\'s create your account.');
        }
      } else {
        setUserExists(false);
        setStep('signup');
        toast.info('New here? Let\'s create your account.');
      }
    } catch (error) {
      console.error('Error checking user:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsCheckingUser(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 'signup' && formData.password !== formData.confirmPassword) {
      toast.error(t('auth.passwordMismatch'));
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      const authEmail = contactType === 'email' ? formData.email : formData.phone;
      
      if (step === 'signin') {
        await signIn(authEmail, formData.password, formData.rememberMe);
      } else {
        await signUp(authEmail, formData.password);
      }
    } catch (error) {
      // Error handling is done in AuthContext
    }
  };

  const goBackToContact = () => {
    setStep('contact');
    setUserExists(null);
    setEmailValidation({ state: null, message: '' });
    setFormData(prev => ({ ...prev, password: '', confirmPassword: '', firstName: '', lastName: '' }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm" />
            </div>
            <span className="text-xl font-semibold text-gray-900">TransferApp</span>
          </div>
          <div className="flex justify-center mb-6">
            <LanguageSelector variant="compact" />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              {step === 'contact' ? 'Welcome' : 
               step === 'signin' ? 'Welcome back' :
               'Create account'}
            </h1>
            <p className="text-gray-600">
              {step === 'contact' ? 'Enter your contact info to get started' : 
               step === 'signin' ? 'Enter your password to continue' :
               'Complete your account setup'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={step === 'contact' ? (e) => { e.preventDefault(); handleContactStep(); } : handleSubmit} className="space-y-5">
            {/* Contact Step */}
            {step === 'contact' && (
              <>
                {/* Contact Type Switcher */}
                <div className="flex bg-gray-100 rounded-lg p-1 mb-5">
                  <button
                    type="button"
                    onClick={() => setContactType('email')}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-3 rounded-md text-sm font-medium transition-all ${
                      contactType === 'email' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setContactType('phone')}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-3 rounded-md text-sm font-medium transition-all ${
                      contactType === 'phone' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    <span>Phone</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact" className="text-sm font-medium text-gray-700">
                    {contactType === 'email' ? 'Email address' : 'Phone number'}
                  </Label>
                  {contactType === 'email' ? (
                    <Input
                      id="contact"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="h-12 text-base"
                      placeholder="Enter your email"
                      required
                      disabled={isCheckingUser}
                      showValidation={true}
                      validationState={emailValidation.state}
                      validationMessage={emailValidation.message}
                      showEmailSuggestions={true}
                      onEmailSuggestionSelect={handleEmailSuggestionSelect}
                      autoComplete="email"
                      spellCheck={false}
                    />
                  ) : (
                    <CompactPhoneInput
                      value={formData.phone}
                      onChange={(value) => handleInputChange('phone', value)}
                      disabled={isCheckingUser}
                    />
                  )}
                </div>
              </>
            )}

            {/* Sign In Step */}
            {step === 'signin' && (
              <>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    {contactType === 'email' ? 'Email address' : 'Phone number'}
                  </Label>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                      {contactType === 'email' ? formData.email : formData.phone}
                    </div>
                    <button
                      type="button"
                      onClick={goBackToContact}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Change
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="h-12 text-base pr-10"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <input
                      id="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <Label htmlFor="rememberMe" className="text-sm text-gray-700">
                      Remember me
                    </Label>
                  </div>
                  <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Forgot password?
                  </button>
                </div>
              </>
            )}

            {/* Sign Up Step */}
            {step === 'signup' && (
              <>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    {contactType === 'email' ? 'Email address' : 'Phone number'}
                  </Label>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                      {contactType === 'email' ? formData.email : formData.phone}
                    </div>
                    <button
                      type="button"
                      onClick={goBackToContact}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Change
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      First name
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="h-12 text-base"
                      placeholder="First name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Last name
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="h-12 text-base"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="h-12 text-base pr-10"
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="h-12 text-base pr-10"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-700 rounded-lg mt-6"
              disabled={isLoading || isCheckingUser || (contactType === 'email' && step === 'contact' && emailValidation.state !== 'valid')}
            >
              {isLoading || isCheckingUser ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {step === 'contact' ? 'Continue' : 
                   step === 'signin' ? 'Sign in' : 'Create account'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Simple footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Secure • Trusted • Fast
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInScreen;
