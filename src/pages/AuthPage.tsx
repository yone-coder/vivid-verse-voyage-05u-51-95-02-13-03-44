import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Lock, Mail, User, Eye, EyeOff, CheckCircle, GitHub, Twitter, Google, Facebook, ArrowRight, X, AlertCircle, Phone, Key, Info } from 'lucide-react';

const AuthPage = () => {
  const navigate = useNavigate();
  
  // Main state
  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'resetPassword'>('login');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [socialLoginLoading, setSocialLoginLoading] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Form values
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    agreeToTerms: false
  });

  // Errors
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    agreeToTerms: ''
  });

  // Password validation criteria
  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecial: false
  });

  // Effects
  useEffect(() => {
    validatePassword(formValues.password);
  }, [formValues.password]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear specific error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Password strength checker
  const validatePassword = (password: string) => {
    const criteria = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    setPasswordCriteria(criteria);
    
    // Calculate strength (0-4)
    const strength = Object.values(criteria).filter(Boolean).length;
    setPasswordStrength(strength);
  };

  // Form validation
  const validateForm = () => {
    const errors = {
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      phone: '',
      agreeToTerms: ''
    };
    
    let isValid = true;
    
    if (activeTab === 'signup' || activeTab === 'login' || activeTab === 'resetPassword') {
      // Email validation
      if (!formValues.email) {
        errors.email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
        errors.email = 'Email is invalid';
        isValid = false;
      }
    }
    
    if (activeTab === 'signup' || activeTab === 'login') {
      // Password validation
      if (!formValues.password) {
        errors.password = 'Password is required';
        isValid = false;
      } else if (activeTab === 'signup' && passwordStrength < 3) {
        errors.password = 'Password is not strong enough';
        isValid = false;
      }
    }
    
    if (activeTab === 'signup') {
      // Confirm password
      if (formValues.password !== formValues.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
        isValid = false;
      }
      
      // Name validation
      if (!formValues.fullName.trim()) {
        errors.fullName = 'Full name is required';
        isValid = false;
      }
      
      // Terms agreement
      if (!formValues.agreeToTerms) {
        errors.agreeToTerms = 'You must agree to the terms';
        isValid = false;
      }
    }
    
    setFormErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      switch (activeTab) {
        case 'login':
          await mockAuthRequest('login');
          toast.success('Logged in successfully!');
          navigate('/for-you');
          break;
        case 'signup':
          await mockAuthRequest('signup');
          setVerificationSent(true);
          toast.success('Account created! Please check your email to verify.');
          break;
        case 'resetPassword':
          await mockAuthRequest('reset');
          setResetSent(true);
          toast.success('Reset link sent! Please check your email.');
          break;
      }
    } catch (error) {
      toast.error('Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock auth request
  const mockAuthRequest = (type: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
  };

  // Handle social login
  const handleSocialLogin = async (provider: string) => {
    setSocialLoginLoading(provider);
    try {
      await mockAuthRequest(provider);
      toast.success(`Logged in with ${provider} successfully!`);
      navigate('/for-you');
    } catch (error) {
      toast.error(`${provider} login failed. Please try again.`);
    } finally {
      setSocialLoginLoading(null);
    }
  };

  // Reset the process
  const handleReset = () => {
    if (resetSent) setResetSent(false);
    if (verificationSent) setVerificationSent(false);
  };

  // Get password strength label
  const getPasswordStrengthLabel = () => {
    if (formValues.password.length === 0) return '';
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 2) return 'Fair';
    if (passwordStrength <= 3) return 'Good';
    return 'Strong';
  };

  // Get password strength color
  const getPasswordStrengthColor = () => {
    if (formValues.password.length === 0) return 'bg-gray-200';
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 2) return 'bg-orange-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Render login form
  const renderLoginForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4">
        <div className="relative group">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full pl-10 pr-10 py-3 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all border border-transparent focus:border-blue-600"
            value={formValues.email}
            onChange={handleChange}
          />
          {formErrors.email && (
            <div className="absolute right-3 top-3 text-red-500">
              <AlertCircle className="h-5 w-5" />
            </div>
          )}
        </div>
        {formErrors.email && (
          <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
        )}
      </div>

      <div className="mb-4">
        <div className="relative group">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            className="w-full pl-10 pr-10 py-3 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all border border-transparent focus:border-blue-600"
            value={formValues.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {formErrors.password && (
          <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
        )}
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Checkbox
            id="remember-me"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked === true)}
            className="h-4 w-4 text-blue-600 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
            Remember me
          </label>
        </div>
        <button
          type="button"
          onClick={() => setActiveTab('resetPassword')}
          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
        >
          Forgot password?
        </button>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors flex justify-center items-center space-x-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
        ) : (
          <>
            <span>Log In</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </motion.div>
  );

  // Render signup form
  const renderSignupForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4">
        <div className="relative group">
          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
          <Input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full pl-10 pr-10 py-3 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all border border-transparent focus:border-blue-600"
            value={formValues.fullName}
            onChange={handleChange}
          />
          {formErrors.fullName && (
            <div className="absolute right-3 top-3 text-red-500">
              <AlertCircle className="h-5 w-5" />
            </div>
          )}
        </div>
        {formErrors.fullName && (
          <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>
        )}
      </div>

      <div className="mb-4">
        <div className="relative group">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full pl-10 pr-10 py-3 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all border border-transparent focus:border-blue-600"
            value={formValues.email}
            onChange={handleChange}
          />
          {formErrors.email && (
            <div className="absolute right-3 top-3 text-red-500">
              <AlertCircle className="h-5 w-5" />
            </div>
          )}
        </div>
        {formErrors.email && (
          <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
        )}
      </div>

      <div className="mb-4">
        <div className="relative group">
          <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
          <Input
            type="tel"
            name="phone"
            placeholder="Phone Number (Optional)"
            className="w-full pl-10 pr-10 py-3 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all border border-transparent focus:border-blue-600"
            value={formValues.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="relative group">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Create Password"
            className="w-full pl-10 pr-10 py-3 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all border border-transparent focus:border-blue-600"
            value={formValues.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        
        <div className="mt-2">
          <div className="w-full h-1 flex space-x-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`h-full rounded-full w-1/4 ${i < passwordStrength ? getPasswordStrengthColor() : 'bg-gray-200'}`}></div>
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <span className={`text-xs ${passwordStrength >= 3 ? 'text-green-600' : passwordStrength >= 2 ? 'text-yellow-600' : 'text-red-600'}`}>
              {getPasswordStrengthLabel()}
            </span>
            <span className="text-xs text-gray-400">
              {formValues.password ? 'Last changed: Just now' : ''}
            </span>
          </div>
        </div>
        
        {passwordCriteria.minLength === false && formValues.password && (
          <p className="text-xs text-amber-600 mt-1 flex items-center">
            <Info className="h-3 w-3 mr-1" />
            Password must be at least 8 characters
          </p>
        )}
        
        {formErrors.password && (
          <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
        )}
      </div>

      <div className="mb-4">
        <div className="relative group">
          <Key className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
          <Input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full pl-10 pr-10 py-3 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all border border-transparent focus:border-blue-600"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {formErrors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
        )}
      </div>

      <div className="mb-6">
        <div className="flex items-start">
          <Checkbox
            id="agree-terms"
            name="agreeToTerms"
            checked={formValues.agreeToTerms}
            onCheckedChange={(checked) => 
              setFormValues(prev => ({ ...prev, agreeToTerms: checked === true }))
            }
            className="h-4 w-4 mt-0.5 text-blue-600 rounded"
          />
          <label htmlFor="agree-terms" className="ml-2 text-sm text-gray-600">
            I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
          </label>
        </div>
        {formErrors.agreeToTerms && (
          <p className="text-red-500 text-xs mt-1">{formErrors.agreeToTerms}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors flex justify-center items-center space-x-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
        ) : (
          <>
            <span>Create Account</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </motion.div>
  );

  // Render password reset form
  const renderResetPasswordForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!resetSent ? (
        <>
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-700">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>
          
          <div className="mb-4">
            <div className="relative group">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-10 py-3 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all border border-transparent focus:border-blue-600"
                value={formValues.email}
                onChange={handleChange}
              />
              {formErrors.email && (
                <div className="absolute right-3 top-3 text-red-500">
                  <AlertCircle className="h-5 w-5" />
                </div>
              )}
            </div>
            {formErrors.email && (
              <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors flex justify-center items-center space-x-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              <>
                <span>Send Reset Link</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
          
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className="w-full mt-4 text-sm text-gray-600 hover:text-gray-800 hover:underline flex justify-center items-center"
          >
            Back to login
          </button>
        </>
      ) : (
        <div className="text-center">
          <div className="bg-green-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Reset Link Sent!</h3>
          <p className="text-gray-600 mb-6">
            We've sent an email to <span className="font-medium">{formValues.email}</span> with a link to reset your password.
          </p>
          <Button
            type="button"
            onClick={handleReset}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
          >
            Back to Login
          </Button>
        </div>
      )}
    </motion.div>
  );

  // Render verification confirmation
  const renderVerificationConfirmation = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-center"
    >
      <div className="bg-green-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="h-10 w-10 text-green-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-800 mb-2">Verification Email Sent!</h3>
      <p className="text-gray-600 mb-6">
        We've sent an email to <span className="font-medium">{formValues.email}</span> with a verification link.
      </p>
      <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
        <p className="text-sm text-blue-700">
          Please check your inbox and click the verification link to complete your registration.
          If you don't see the email, check your spam folder.
        </p>
      </div>
      <Button
        type="button"
        onClick={handleReset}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
      >
        Back to Login
      </Button>
    </motion.div>
  );

  // Render social logins
  const renderSocialLogins = () => (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleSocialLogin('Google')}
          disabled={!!socialLoginLoading}
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors relative"
        >
          {socialLoginLoading === 'Google' ? (
            <div className="animate-spin h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full"></div>
          ) : (
            <>
              <Google className="h-5 w-5 text-red-500" />
              <span className="ml-2">Google</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin('Facebook')}
          disabled={!!socialLoginLoading}
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {socialLoginLoading === 'Facebook' ? (
            <div className="animate-spin h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full"></div>
          ) : (
            <>
              <Facebook className="h-5 w-5 text-blue-600" />
              <span className="ml-2">Facebook</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin('GitHub')}
          disabled={!!socialLoginLoading}
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {socialLoginLoading === 'GitHub' ? (
            <div className="animate-spin h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full"></div>
          ) : (
            <>
              <GitHub className="h-5 w-5 text-gray-800" />
              <span className="ml-2">GitHub</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin('Twitter')}
          disabled={!!socialLoginLoading}
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {socialLoginLoading === 'Twitter' ? (
            <div className="animate-spin h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full"></div>
          ) : (
            <>
              <Twitter className="h-5 w-5 text-blue-400" />
              <span className="ml-2">Twitter</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md"
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            {verificationSent
              ? 'Email Verification'
              : resetSent
              ? 'Password Reset'
              : activeTab === 'login'
              ? 'Welcome Back'
              : activeTab === 'signup'
              ? 'Create Account'
              : 'Reset Password'}
          </h2>
          {!verificationSent && !resetSent && (
            <p className="text-sm text-gray-600 max-w-sm mx-auto">
              {activeTab === 'login'
                ? 'Sign in to your account to continue'
                : activeTab === 'signup'
                ? 'Fill in your details to create an account'
                : "We'll send you a link to reset your password"}
            </p>
          )}
        </div>

        {!verificationSent && !resetSent && (
          <div className="flex border-b border-gray-200">
            <span
              onClick={() => setActiveTab('login')}
              className={`cursor-pointer py-3 px-4 w-1/2 text-center text-sm font-medium ${
                activeTab === 'login'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-blue-600'
              } transition-colors`}
            >
              Log In
            </span>
            <span
              onClick={() => setActiveTab('signup')}
              className={`cursor-pointer py-3 px-4 w-1/2 text-center text-sm font-medium ${
                activeTab === 'signup'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-blue-600'
              } transition-colors`}
            >
              Sign Up
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {verificationSent ? (
            renderVerificationConfirmation()
          ) : activeTab === 'login' ? (
            renderLoginForm()
          ) : activeTab === 'signup' ? (
            renderSignupForm()
          ) : (
            renderResetPasswordForm()
          )}
        </form>

        {!verificationSent && !resetSent && renderSocialLogins()}

        {!verificationSent && !resetSent && activeTab !== 'resetPassword' && (
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              {activeTab === 'login'
                ? "Don't have an account? "
                : 'Already have an account? '}
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
                className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
              >
                {activeTab === 'login' ? 'Create one' : 'Sign in'}
              </button>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AuthPage;
