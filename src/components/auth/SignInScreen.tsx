
import React, { useState, useEffect, useCallback } from 'react';
import { Eye, EyeOff, ArrowRight, Mail, Lock, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSelector from '@/components/common/LanguageSelector';
import CompactPhoneInput from '@/components/ui/compact-phone-input';
import CompactInfoComponent from '@/components/common/CompactInfoComponent';
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

  const getStepIndicator = () => {
    if (step === 'contact') return null;
    
    const steps = 3;
    const currentStep = step === 'signin' ? 2 : step === 'signup' ? 3 : 1;
    
    return (
      <div className="flex items-center justify-center mb-8">
        {Array.from({ length: steps }, (_, index) => (
          <React.Fragment key={index}>
            <div className={`w-3 h-3 rounded-full transition-all ${
              index < currentStep ? 'bg-red-500' : 'bg-gray-300'
            }`} />
            {index < steps - 1 && (
              <div className={`w-8 h-0.5 mx-2 transition-all ${
                index < currentStep - 1 ? 'bg-red-500' : 'bg-gray-300'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Red Circle */}
        <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-8"></div>

        {/* Step Indicator */}
        {getStepIndicator()}

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {step === 'contact' ? 'Welcome' : 
               step === 'signin' ? 'Welcome back' :
               'Let\'s get started'}
            </h1>
            <p className="text-gray-600">
              {step === 'contact' ? 'Choose your preferred sign in method' : 
               step === 'signin' ? 'Enter your password to sign in' :
               'Welcome back! Please continue to your account. Use the button below to sign in.'}
            </p>
          </div>

          {/* Social Login Buttons - Only show on contact step */}
          {step === 'contact' && (
            <>
              <div className="space-y-3 mb-6">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 text-gray-700 border-gray-300 hover:bg-gray-50"
                  disabled
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 text-gray-700 border-gray-300 hover:bg-gray-50"
                  disabled
                >
                  <svg className="w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Continue with Facebook
                </Button>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>

              {/* Contact Type Tabs */}
              <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                <button
                  type="button"
                  onClick={() => setContactType('email')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    contactType === 'email' 
                      ? 'bg-white text-red-500 shadow-sm border-b-2 border-red-500' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </button>
                <button
                  type="button"
                  onClick={() => setContactType('phone')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    contactType === 'phone' 
                      ? 'bg-white text-red-500 shadow-sm border-b-2 border-red-500' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>Phone</span>
                </button>
              </div>
            </>
          )}

          {/* Form */}
          <form onSubmit={step === 'contact' ? (e) => { e.preventDefault(); handleContactStep(); } : handleSubmit} className="space-y-4">
            {/* Contact Step */}
            {step === 'contact' && (
              <div className="space-y-1">
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
            )}

            {/* Sign In Step */}
            {step === 'signin' && (
              <>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <Mail className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-800 flex-1">
                      {contactType === 'email' ? formData.email : formData.phone}
                    </span>
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
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
              </>
            )}

            {/* Sign Up Step */}
            {step === 'signup' && (
              <>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <Mail className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-800 flex-1">
                      {contactType === 'email' ? formData.email : formData.phone}
                    </span>
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="h-12 text-base"
                      placeholder="First name"
                    />
                  </div>
                  <div className="space-y-1">
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

                <div className="space-y-1">
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

                <div className="space-y-1">
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
              className="w-full h-12 text-base font-semibold bg-red-500 hover:bg-red-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 mt-6"
              disabled={isLoading || isCheckingUser || (contactType === 'email' && step === 'contact' && emailValidation.state !== 'valid')}
            >
              {isLoading || isCheckingUser ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {step === 'contact' ? 'Continue' : 
                   step === 'signin' ? 'Continue with Email' : 'Create account'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Security Notice */}
          {(step === 'signin' || step === 'signup') && (
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secure Authentication</span>
              </div>
              <p className="text-xs text-gray-400">
                By proceeding, you confirm that you've read and agree to our{' '}
                <span className="text-red-500">Terms of Service</span> and{' '}
                <span className="text-red-500">Privacy Policy</span>
              </p>
            </div>
          )}

          {/* Back button for signin/signup steps */}
          {(step === 'signin' || step === 'signup') && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={goBackToContact}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ← Back to contact options
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInScreen;
