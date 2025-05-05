
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, EyeOff, ChevronRight, ArrowRight, Smartphone, Lock, Mail, 
  AlertCircle, Fingerprint, UserPlus, Shield, Key, FileCheck, 
  Bell, Clock, Gift, Zap, HelpCircle, UserCheck, Info, CheckCircle,
  MessageSquare, Mail as EmailIcon, Coffee, Tablet, Github, Twitter, Loader
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function UltraModernLogin() {
  const [activeTab, setActiveTab] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('+1');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [deviceTrusted, setDeviceTrusted] = useState(false);
  const [accountRecoveryOpen, setAccountRecoveryOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(3);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);

    // Check if user is already logged in
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/for-you');
      }
    };
    
    checkUser();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/for-you');
      }
    });

    return () => {
      subscription.unsubscribe();
      setMounted(false);
    };
  }, [navigate]);

  // Set appropriate total steps based on auth mode
  useEffect(() => {
    if (resetPassword) {
      setTotalSteps(2);
    } else if (authMode === 'signin') {
      setTotalSteps(showTwoFactor ? 3 : 2);
    } else {
      setTotalSteps(3);
    }
  }, [authMode, showTwoFactor, resetPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If not on the last step, proceed to the next step
    if (currentStep < totalSteps) {
      // Validate current step
      if (currentStep === 1) {
        if (activeTab === 'email' && !email) {
          toast({
            title: "Email required",
            description: "Please enter your email address",
            variant: "destructive",
          });
          return;
        } else if (activeTab === 'phone' && !phone) {
          toast({
            title: "Phone number required",
            description: "Please enter your phone number",
            variant: "destructive",
          });
          return;
        }
      } else if (currentStep === 2 && !password) {
        toast({
          title: "Password required",
          description: "Please enter your password",
          variant: "destructive",
        });
        return;
      }
      
      setCurrentStep(currentStep + 1);
      
      // If we're now at step 3 for signin with 2FA, show 2FA UI
      if (currentStep + 1 === 3 && authMode === 'signin' && !resetPassword) {
        setShowTwoFactor(true);
      }
      
      return;
    }

    setIsLoading(true);

    try {
      if (resetPassword) {
        // Handle password reset
        const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
          redirectTo: `${window.location.origin}/auth?reset=true`,
        });
        
        if (error) throw error;
        
        setResetSent(true);
        toast({
          title: "Reset email sent",
          description: "Check your inbox for the password reset link",
          variant: "success",
        });
      } else if (authMode === 'signin') {
        // Handle sign in
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in",
          variant: "success",
        });
      } else {
        // Handle sign up
        if (password !== confirmPassword) {
          toast({
            title: "Passwords don't match",
            description: "Please make sure your passwords match",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        
        if (error) throw error;
        
        toast({
          title: "Account created",
          description: "Check your email to confirm your account",
        });
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      toast({
        title: "Authentication error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'github' | 'twitter') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth`,
        },
      });
      
      if (error) throw error;
    } catch (error: any) {
      console.error('Social login error:', error);
      toast({
        title: "Authentication error",
        description: error.message || "Something went wrong with social login",
        variant: "destructive",
      });
    }
  };

  const handlePasswordReset = async () => {
    setResetPassword(true);
    setCurrentStep(1);
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      
      // If going back from 2FA step
      if (currentStep === 3 && showTwoFactor) {
        setShowTwoFactor(false);
      }
    } else {
      if (resetPassword) {
        setResetPassword(false);
        setResetSent(false);
      } else {
        setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
      }
    }
  };

  // Calculate progress percentage
  const progressPercentage = (currentStep / totalSteps) * 100;

  // Render progress indicators
  const renderProgress = () => {
    return (
      <div className="mb-8 w-full max-w-md mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">Step {currentStep} of {totalSteps}</span>
          <span className="text-xs font-medium text-[#ff4747]">{Math.round(progressPercentage)}%</span>
        </div>
        <Progress 
          value={progressPercentage} 
          className="h-2 bg-gray-100" 
          indicatorClassName="bg-gradient-to-r from-[#ff4747] to-[#ff6b47]"
        />
        <div className="flex justify-between mt-2">
          {[...Array(totalSteps)].map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep > index + 1 
                    ? 'bg-[#ff4747] text-white transform scale-90' 
                    : currentStep === index + 1 
                      ? 'bg-[#ff4747] text-white ring-4 ring-red-100 transform scale-100'
                      : 'bg-gray-100 text-gray-400'
                }`}
              >
                {currentStep > index + 1 ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span className="text-sm">{index + 1}</span>
                )}
              </div>
              <span className="text-[10px] mt-1 text-gray-500 font-medium">
                {index === 0 ? 'Account' : 
                 index === 1 ? 'Password' : 
                 index === 2 ? 'Verify' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans transition-opacity duration-500 w-full">
      <div className="w-full flex flex-col">
        {/* Minimal Header */}
        <div className="px-6 pt-12 pb-4 max-w-5xl mx-auto w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-3 text-center">
            {resetPassword 
              ? "Reset Your Password" 
              : authMode === 'signin' 
                ? "Sign In to Your Account" 
                : "Create Your Account"}
          </h1>
          <p className="text-gray-500 text-center mb-4">
            {resetPassword 
              ? "Enter your email to receive a reset link" 
              : authMode === 'signin' 
                ? "Welcome back! Access your account securely" 
                : "Join our community today"}
          </p>
          <div className="flex justify-center mb-6">
            <div className="bg-[#fff2f2] text-[#ff4747] text-xs px-3 py-1 rounded-full flex items-center">
              <Shield className="h-3 w-3 mr-1" />
              <span>Enhanced security protocols active</span>
            </div>
          </div>
        </div>

        {/* Step progress */}
        {renderProgress()}

        {/* Go back button */}
        {(currentStep > 1 || resetPassword || authMode === 'signup') && (
          <div className="px-6 pt-0 pb-4 max-w-5xl mx-auto w-full">
            <button 
              onClick={goBack}
              className="text-sm text-[#ff4747] hover:text-[#ff2727] flex items-center"
            >
              <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
              {currentStep > 1 ? "Back to previous step" : resetPassword ? "Back to login" : "Back to sign in"}
            </button>
          </div>
        )}

        {/* Form area */}
        <form onSubmit={handleSubmit} className="px-6 py-4 max-w-md mx-auto w-full">
          {!resetPassword ? (
            <>
              {/* Step 1: Authentication Method and Initial Details */}
              {currentStep === 1 && (
                <div className="mb-6">
                  {/* Authentication Method Tabs */}
                  <div className="mb-6">
                    <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid grid-cols-2 w-full bg-[#f9f9f9] p-1 rounded-xl h-14 mb-4">
                        <TabsTrigger 
                          value="email" 
                          className="flex items-center justify-center text-base rounded-lg h-12 data-[state=active]:bg-white data-[state=active]:text-[#ff4747] data-[state=active]:shadow-sm transition-all"
                        >
                          <Mail className="h-5 w-5 mr-2" />
                          Email
                        </TabsTrigger>
                        <TabsTrigger 
                          value="phone" 
                          className="flex items-center justify-center text-base rounded-lg h-12 data-[state=active]:bg-white data-[state=active]:text-[#ff4747] data-[state=active]:shadow-sm transition-all"
                        >
                          <Smartphone className="h-5 w-5 mr-2" />
                          Phone
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="email" className="pt-2">
                        <div className="mb-4">
                          <Label htmlFor="email" className="block text-gray-700 mb-2 text-sm font-medium">Email address</Label>
                          <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#ff4747] transition-colors" />
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your email address"
                              className="w-full pl-12 pr-4 py-3 h-14 border-[#eaeaea] focus-visible:ring-[#ff4747] rounded-xl bg-[#f9f9f9] focus:bg-white transition-all"
                              required
                            />
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="phone" className="pt-2">
                        <div className="mb-4">
                          <Label htmlFor="phone" className="block text-gray-700 mb-2 text-sm font-medium">Phone number</Label>
                          <div className="flex">
                            <div className="relative w-24 mr-2">
                              <select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="h-14 w-full rounded-xl border border-[#eaeaea] bg-[#f9f9f9] px-3 py-3 text-base focus-visible:ring-[#ff4747] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <option value="+1">+1</option>
                                <option value="+44">+44</option>
                                <option value="+33">+33</option>
                                <option value="+49">+49</option>
                                <option value="+86">+86</option>
                                <option value="+91">+91</option>
                              </select>
                            </div>
                            <div className="relative group flex-1">
                              <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#ff4747] transition-colors" />
                              <Input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter your phone number"
                                className="w-full pl-12 pr-4 py-3 h-14 border-[#eaeaea] focus-visible:ring-[#ff4747] rounded-xl bg-[#f9f9f9] focus:bg-white transition-all"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  {/* Full name field (sign up only) */}
                  {authMode === 'signup' && (
                    <div className="mb-4">
                      <Label htmlFor="fullName" className="block text-gray-700 mb-2 text-sm font-medium">Full Name</Label>
                      <div className="relative group">
                        <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#ff4747] transition-colors" />
                        <Input
                          id="fullName"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full pl-12 pr-4 py-3 h-14 border-[#eaeaea] focus-visible:ring-[#ff4747] rounded-xl bg-[#f9f9f9] focus:bg-white transition-all"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Password */}
              {currentStep === 2 && (
                <div className="mb-6">
                  {/* Password field */}
                  <div className="mb-6">
                    <Label htmlFor="password" className="block text-gray-700 mb-2 text-sm font-medium">Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#ff4747] transition-colors" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-12 pr-12 py-3 h-14 border-[#eaeaea] focus-visible:ring-[#ff4747] rounded-xl bg-[#f9f9f9] focus:bg-white transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>

                    {/* Password requirements (sign up only) */}
                    {authMode === 'signup' && (
                      <div className="mt-4">
                        <div className="w-full h-1.5 flex space-x-1 mb-1">
                          <div className={`h-full rounded-full w-1/4 transition-all duration-300 ${password.length >= 8 ? 'bg-gradient-to-r from-[#ff4747] to-[#ff6b47]' : 'bg-gray-200'}`}></div>
                          <div className={`h-full rounded-full w-1/4 transition-all duration-300 ${/[A-Z]/.test(password) ? 'bg-gradient-to-r from-[#ff4747] to-[#ff6b47]' : 'bg-gray-200'}`}></div>
                          <div className={`h-full rounded-full w-1/4 transition-all duration-300 ${/[0-9]/.test(password) ? 'bg-gradient-to-r from-[#ff4747] to-[#ff6b47]' : 'bg-gray-200'}`}></div>
                          <div className={`h-full rounded-full w-1/4 transition-all duration-300 ${/[^A-Za-z0-9]/.test(password) ? 'bg-gradient-to-r from-[#ff4747] to-[#ff6b47]' : 'bg-gray-200'}`}></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">Password strength: {
                            password.length === 0 ? 'None' :
                            password.length < 8 ? 'Weak' :
                            !/[A-Z]/.test(password) ? 'Fair' :
                            !/[0-9]/.test(password) ? 'Good' :
                            !/[^A-Za-z0-9]/.test(password) ? 'Strong' : 'Very Strong'
                          }</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password field (sign up only) */}
                  {authMode === 'signup' && (
                    <div className="mb-6">
                      <Label htmlFor="confirmPassword" className="block text-gray-700 mb-2 text-sm font-medium">Confirm Password</Label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#ff4747] transition-colors" />
                        <Input
                          id="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm your password"
                          className={`w-full pl-12 pr-12 py-3 h-14 border-[#eaeaea] focus-visible:ring-[#ff4747] rounded-xl bg-[#f9f9f9] focus:bg-white transition-all ${
                            confirmPassword && password !== confirmPassword 
                              ? 'border-red-500 focus:ring-red-500' 
                              : ''
                          }`}
                          required
                        />
                        {confirmPassword && password !== confirmPassword && (
                          <div className="text-xs text-red-500 mt-1">Passwords don't match</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Terms checkbox (sign up only) */}
                  {authMode === 'signup' && (
                    <div className="flex items-center mb-6">
                      <div className="relative">
                        <input
                          id="terms"
                          type="checkbox"
                          checked={agreeToTerms}
                          onChange={() => setAgreeToTerms(!agreeToTerms)}
                          className="opacity-0 absolute h-5 w-5"
                          required
                        />
                        <div className={`h-5 w-5 rounded border ${agreeToTerms ? 'bg-[#ff4747] border-[#ff4747]' : 'border-gray-300 bg-white'} flex items-center justify-center transition-colors duration-200`}>
                          {agreeToTerms && <CheckCircle className="h-4 w-4 text-white" />}
                        </div>
                      </div>
                      <label htmlFor="terms" className="ml-3 block text-sm text-gray-600">
                        I agree to the <a href="#" className="text-[#ff4747] hover:underline">Terms of Service</a> and <a href="#" className="text-[#ff4747] hover:underline">Privacy Policy</a>
                      </label>
                    </div>
                  )}

                  {/* Remember me & Forgot password */}
                  {authMode === 'signin' && (
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="relative inline-block w-12 mr-2 align-middle select-none">
                          <input
                            id="remember-me"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                            className="absolute opacity-0 w-0 h-0"
                          />
                          <div className="block bg-gray-200 w-12 h-6 rounded-full cursor-pointer"></div>
                          <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${rememberMe ? 'transform translate-x-6 bg-[#ff4747]' : ''}`}></div>
                        </div>
                        <label htmlFor="remember-me" className="block text-sm text-gray-600 cursor-pointer">
                          Remember me
                        </label>
                      </div>
                      <div className="text-sm">
                        <button 
                          type="button"
                          onClick={handlePasswordReset}
                          className="font-medium text-[#ff4747] hover:text-[#ff2727] transition-colors cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: 2FA (if enabled) */}
              {currentStep === 3 && showTwoFactor && (
                <div className="mb-8 mt-4 p-6 border border-[#eaeaea] rounded-xl bg-[#f9f9f9] shadow-sm">
                  <h3 className="text-base font-medium text-gray-800 mb-3 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-[#ff4747]" />
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Enter the verification code sent to your {activeTab === 'email' ? 'email' : 'phone'}.
                  </p>
                  <div className="mb-6">
                    <Label htmlFor="twoFactorCode" className="block text-gray-700 mb-2 text-sm font-medium">Verification Code</Label>
                    <InputOTP maxLength={6} value={twoFactorCode} onChange={setTwoFactorCode} className="mt-2 justify-center gap-2">
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="w-12 h-12 border-[#eaeaea] focus:border-[#ff4747] focus:ring-[#ff4747] rounded-lg text-lg" />
                        <InputOTPSlot index={1} className="w-12 h-12 border-[#eaeaea] focus:border-[#ff4747] focus:ring-[#ff4747] rounded-lg text-lg" />
                        <InputOTPSlot index={2} className="w-12 h-12 border-[#eaeaea] focus:border-[#ff4747] focus:ring-[#ff4747] rounded-lg text-lg" />
                        <InputOTPSlot index={3} className="w-12 h-12 border-[#eaeaea] focus:border-[#ff4747] focus:ring-[#ff4747] rounded-lg text-lg" />
                        <InputOTPSlot index={4} className="w-12 h-12 border-[#eaeaea] focus:border-[#ff4747] focus:ring-[#ff4747] rounded-lg text-lg" />
                        <InputOTPSlot index={5} className="w-12 h-12 border-[#eaeaea] focus:border-[#ff4747] focus:ring-[#ff4747] rounded-lg text-lg" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <div className="flex justify-between mt-2">
                    <button type="button" className="text-sm text-[#ff4747] hover:text-[#ff2727] transition-colors flex items-center">
                      <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
                      Resend code
                    </button>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 inline mr-1" />
                      Expires in 4:59
                    </span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="mb-8">
              {!resetSent ? (
                <div>
                  <Label htmlFor="resetEmail" className="block text-gray-700 mb-2 text-sm font-medium">Email address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#ff4747] transition-colors" />
                    <Input
                      id="resetEmail"
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-3 h-14 border-[#eaeaea] focus-visible:ring-[#ff4747] rounded-xl bg-[#f9f9f9] focus:bg-white transition-all"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    We'll send a password reset link to this email address.
                  </p>
                </div>
              ) : (
                <div className="text-center p-8">
                  <div className="bg-[#fff2f2] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-[#ff4747]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Check your inbox</h3>
                  <p className="text-gray-600 mb-4">
                    We've sent a password reset link to <strong>{resetEmail}</strong>
                  </p>
                  <p className="text-sm text-gray-500">
                    Didn't receive an email? Check your spam folder or try again.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Next/Submit Button */}
          {(!resetSent || !resetPassword) && (
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-gradient-to-r from-[#ff4747] to-[#ff6b47] hover:from-[#ff2727] hover:to-[#ff5b47] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff4747] text-white font-medium py-3 px-4 rounded-xl transition-all relative overflow-hidden h-14 shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  {currentStep < totalSteps 
                    ? "Continue" 
                    : resetPassword 
                      ? "Send Reset Link" 
                      : authMode === 'signin' 
                        ? "Sign In" 
                        : "Create Account"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          )}

          {resetSent && (
            <Button
              type="button"
              onClick={goBack}
              className="w-full mt-4 border-[#ff4747] text-[#ff4747] hover:bg-[#fff2f2] h-14 rounded-xl"
              variant="outline"
            >
              Back to sign in
            </Button>
          )}
        </form>

        {/* Social logins */}
        {currentStep === 1 && !resetPassword && !resetSent && !showTwoFactor && (
          <div className="px-6 pt-2 pb-8 max-w-md mx-auto w-full">
            <div className="relative flex items-center justify-center my-6">
              <div className="border-t w-full absolute"></div>
              <span className="bg-white px-4 text-sm text-gray-500 relative">or continue with</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button 
                type="button"
                onClick={() => handleSocialLogin('github')}
                className="flex justify-center items-center py-3 px-4 border border-[#eaeaea] rounded-xl shadow-sm bg-white hover:bg-gray-50 transition-all hover:shadow-md h-14"
              >
                <Github className="h-5 w-5" />
              </button>
              <button 
                className="flex justify-center items-center py-3 px-4 border border-[#eaeaea] rounded-xl shadow-sm bg-white hover:bg-gray-50 transition-all hover:shadow-md h-14"
                onClick={() => {
                  toast({
                    title: "Google login",
                    description: "Google login is not configured yet",
                  });
                }}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              </button>
              <button 
                type="button"
                onClick={() => handleSocialLogin('twitter')}
                className="flex justify-center items-center py-3 px-4 border border-[#eaeaea] rounded-xl shadow-sm bg-white hover:bg-gray-50 transition-all hover:shadow-md h-14"
              >
                <Twitter className="h-5 w-5 text-[#1DA1F2]" />
              </button>
            </div>
          </div>
        )}

        {/* Registration link */}
        {currentStep === 1 && !resetPassword && !resetSent && !showTwoFactor && (
          <div className="px-6 py-6 bg-[#f9f9f9] flex items-center justify-between max-w-md mx-auto w-full rounded-xl mb-8">
            <p className="text-sm text-gray-600">
              {authMode === 'signin' ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button 
              type="button"
              onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
              className="inline-flex items-center text-sm font-medium text-[#ff4747] hover:text-[#ff2727] transition-colors cursor-pointer group"
            >
              {authMode === 'signin' ? "Register now" : "Sign in"}
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}

        {/* Safety notice */}
        <div className="p-4 bg-[#f9f9f9] flex items-start border-t border-[#eaeaea] max-w-md mx-auto w-full mt-auto">
          <AlertCircle className="h-5 w-5 text-[#ff4747] mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-xs text-gray-700">
            For account security, never share your password or verification codes. Our representatives will never ask for this information.
          </p>
        </div>
      </div>

      {/* Biometric login option - floating button */}
      <div className="fixed bottom-6 right-6">
        <button 
          type="button"
          onClick={() => {
            toast({
              title: "Biometric authentication",
              description: "Biometric authentication is not available yet",
            });
          }}
          className="bg-white text-[#ff4747] rounded-full p-3 shadow-lg hover:bg-[#fff2f2] transition-all flex items-center justify-center hover:scale-110 transform active:scale-95"
        >
          <Fingerprint className="w-6 h-6" />
        </button>
      </div>

      {/* App download suggestion */}
      <div className="fixed bottom-6 left-6 sm:flex hidden">
        <button 
          type="button"
          onClick={() => {
            toast({
              title: "Mobile app",
              description: "Mobile app download coming soon!",
            });
          }}
          className="bg-white flex items-center rounded-full pl-3 pr-4 py-2 shadow-lg hover:shadow-xl transition-all"
        >
          <div className="bg-[#ff4747] p-1 rounded-full mr-2">
            <Smartphone className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">Get our app</span>
        </button>
      </div>
    </div>
  );
}

