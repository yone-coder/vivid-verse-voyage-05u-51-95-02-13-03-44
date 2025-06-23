
import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, Shield, Users, Zap, CheckCircle, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSelector from '@/components/common/LanguageSelector';
import { toast } from 'sonner';

const SignInScreen: React.FC = () => {
  const { signIn, signUp, isLoading } = useAuth();
  const { t } = useLanguage();
  
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [step, setStep] = useState<'email' | 'details' | 'complete'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    rememberMe: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEmailStep = () => {
    if (!formData.email) {
      toast.error('Please enter your email');
      return;
    }
    setStep('details');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      toast.error(t('auth.passwordMismatch'));
      return;
    }

    try {
      if (mode === 'signin') {
        await signIn(formData.email, formData.password, formData.rememberMe);
      } else {
        await signUp(formData.email, formData.password);
      }
    } catch (error) {
      // Error handling is done in AuthContext
    }
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setStep('email');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      rememberMe: false
    });
  };

  const trustFeatures = [
    { icon: Shield, text: "Bank-grade security", color: "text-emerald-600" },
    { icon: Users, text: "2M+ trusted users", color: "text-blue-600" },
    { icon: Zap, text: "Instant transfers", color: "text-purple-600" },
    { icon: CheckCircle, text: "100% verified", color: "text-green-600" }
  ];

  const getStepIndicator = () => {
    if (mode === 'signin') return null;
    
    const steps = ['Email', 'Details', 'Complete'];
    const currentStepIndex = steps.indexOf(step === 'email' ? 'Email' : step === 'details' ? 'Details' : 'Complete');
    
    return (
      <div className="flex items-center justify-center mb-6">
        {steps.map((stepName, index) => (
          <React.Fragment key={stepName}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
              index <= currentStepIndex 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-500'
            }`}>
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-12 h-0.5 mx-2 transition-all ${
                index < currentStepIndex ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex">
      {/* Hero Panel */}
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)'
          }}
        />
        
        <div className="relative z-10 flex flex-col justify-center p-8 text-white">
          <div className="max-w-sm">
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Transfer money with{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                confidence
              </span>
            </h1>
            <p className="text-lg mb-6 text-blue-100 leading-relaxed">
              Join millions who trust our platform for secure, instant money transfers worldwide.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {trustFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <feature.icon className="w-3 h-3" />
                  </div>
                  <span className="text-sm text-blue-100">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-16 right-16 w-24 h-24 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-16 left-16 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl" />
      </div>

      {/* Form Panel */}
      <div className="flex-1 flex flex-col justify-center px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm" />
            </div>
            <span className="text-lg font-bold text-gray-900">TransferApp</span>
          </div>
          <LanguageSelector variant="compact" />
        </div>

        {/* Mobile Hero */}
        <div className="lg:hidden mb-6">
          <div 
            className="h-24 bg-cover bg-center rounded-xl opacity-80"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)'
            }}
          />
        </div>

        {/* Form Container */}
        <div className="max-w-sm mx-auto w-full">
          {/* Step Indicator */}
          {getStepIndicator()}

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {mode === 'signin' ? 'Welcome back' : 
               step === 'email' ? 'Get started' :
               step === 'details' ? 'Create password' : 'All set!'}
            </h2>
            <p className="text-sm text-gray-600">
              {mode === 'signin' ? 'Sign in to your account' : 
               step === 'email' ? 'Enter your email to continue' :
               step === 'details' ? 'Secure your account' : 'Complete your registration'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={mode === 'signin' || step === 'details' ? handleSubmit : (e) => { e.preventDefault(); handleEmailStep(); }} className="space-y-4">
            {/* Email Step */}
            {(mode === 'signin' || step === 'email') && (
              <div className="space-y-1">
                <Label htmlFor="email" className="text-xs font-medium text-gray-700 flex items-center">
                  <Mail className="w-3 h-3 mr-1" />
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="h-11 text-sm border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            )}

            {/* Password Step for Sign In or Details Step for Sign Up */}
            {(mode === 'signin' || step === 'details') && (
              <>
                {/* Name fields for signup details step */}
                {mode === 'signup' && step === 'details' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="firstName" className="text-xs font-medium text-gray-700 flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        First name
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="h-11 text-sm border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="First name"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="lastName" className="text-xs font-medium text-gray-700">
                        Last name
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="h-11 text-sm border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                )}

                {/* Password */}
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-xs font-medium text-gray-700 flex items-center">
                    <Lock className="w-3 h-3 mr-1" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="h-11 text-sm border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                      placeholder="Enter password"
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

                {/* Confirm password for signup */}
                {mode === 'signup' && step === 'details' && (
                  <div className="space-y-1">
                    <Label htmlFor="confirmPassword" className="text-xs font-medium text-gray-700">
                      Confirm password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="h-11 text-sm border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                        placeholder="Confirm password"
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
                )}

                {/* Remember me for signin */}
                {mode === 'signin' && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <input
                        id="rememberMe"
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                        className="w-3 h-3 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <Label htmlFor="rememberMe" className="text-xs text-gray-700">
                        Remember me
                      </Label>
                    </div>
                    <button type="button" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      Forgot password?
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full h-11 text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'signin' ? 'Sign in' : 
                   step === 'email' ? 'Continue' : 'Create account'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Navigation */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-600">
              {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
            </p>
            <button
              type="button"
              onClick={toggleMode}
              className="mt-1 text-sm text-blue-600 hover:text-blue-700 font-semibold"
            >
              {mode === 'signin' ? 'Create account' : 'Sign in'}
            </button>
          </div>

          {/* Mobile Trust indicators */}
          <div className="lg:hidden mt-6 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-3">
              {trustFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-5 h-5 ${feature.color} bg-gray-50 rounded-full flex items-center justify-center`}>
                    <feature.icon className="w-3 h-3" />
                  </div>
                  <span className="text-xs text-gray-600">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInScreen;
