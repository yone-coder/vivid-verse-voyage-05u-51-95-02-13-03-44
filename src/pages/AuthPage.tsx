
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
  const [lastLogin, setLastLogin] = useState('May 4, 2025 - 17:42');
  const [loginLocation, setLoginLocation] = useState('San Francisco, USA');
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

  // Render progress indicators
  const renderProgress = () => {
    return (
      <div className="flex items-center justify-between mb-6 w-full max-w-xs mx-auto">
        {[...Array(totalSteps)].map((_, index) => (
          <div key={index} className="flex items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep > index + 1 
                  ? 'bg-[#ff4747] text-white' 
                  : currentStep === index + 1 
                    ? 'bg-[#ff4747] text-white'
                    : 'bg-gray-200 text-gray-500'
              }`}
            >
              {currentStep > index + 1 ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            {index < totalSteps - 1 && (
              <div 
                className={`h-1 w-10 ${
                  currentStep > index + 1 ? 'bg-[#ff4747]' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans transition-opacity duration-500 w-full">
      <div className="w-full flex flex-col">
        {/* Minimal Header */}
        <div className="px-6 pt-8 pb-2 max-w-5xl mx-auto w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
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
          <div className="flex justify-center mb-4">
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
        <form onSubmit={handleSubmit} className="px-6 py-4 max-w-5xl mx-auto w-full">
          {!resetPassword ? (
            <>
              {/* Step 1: Authentication Method and Initial Details */}
              {currentStep === 1 && (
                <div className="mb-6">
                  {authMode === 'signin' && (
                    <div className="mb-4 p-3 bg-[#f5f5f5] rounded-lg border border-[#eaeaea] flex items-center">
                      <Info className="h-4 w-4 text-[#ff4747] mr-2" />
                      <div className="text-xs text-gray-700">
                        <span className="font-medium">Last login:</span> {lastLogin} from {loginLocation}
                      </div>
                    </div>
                  )}

                  {/* Authentication Method Tabs */}
                  <div className="mb-4">
                   <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab} className="w-full">
  <TabsList className="grid grid-cols-2 w-full bg-[#f5f5f5] h-16">
    <TabsTrigger
      value="email"
      className="flex items-center justify-center py-4 px-6 text-lg font-semibold data-[state=active]:bg-white data-[state=active]:text-[#ff4747]"
    >
      <Mail className="h-5 w-5 mr-3" />
      Email
    </TabsTrigger>
    <TabsTrigger
      value="phone"
      className="flex items-center justify-center py-4 px-6 text-lg font-semibold data-[state=active]:bg-white data-[state=active]:text-[#ff4747]"
    >
      <Smartphone className="h-5 w-5 mr-3" />
      Phone
    </TabsTrigger>
  </TabsList>
  
                      <TabsContent value="email" className="pt-4">
                        <div className="mb-4">
                          <Label htmlFor="email" className="block text-gray-700 mb-1">Email address</Label>
                          <div className="relative group">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#ff4747] transition-colors" />
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your email address"
                              className="w-full pl-10 pr-3 py-3 border-[#eaeaea] focus-visible:ring-[#ff4747]"
                              required
                            />
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="phone" className="pt-4">
                        <div className="mb-4">
                          <Label htmlFor="phone" className="block text-gray-700 mb-1">Phone number</Label>
                          <div className="flex">
                            <div className="relative w-24 mr-2">
                              <select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="h-10 w-full rounded-md border border-[#eaeaea] bg-background px-3 py-1.5 text-base focus-visible:ring-[#ff4747] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
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
                              <Smartphone className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#ff4747] transition-colors" />
                              <Input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter your phone number"
                                className="w-full pl-10 pr-3 py-3 border-[#eaeaea] focus-visible:ring-[#ff4747]"
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
                      <Label htmlFor="fullName" className="block text-gray-700 mb-1">Full Name</Label>
                      <div className="relative group">
                        <UserCheck className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#ff4747] transition-colors" />
                        <Input
                          id="fullName"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full pl-10 pr-3 py-3 border-[#eaeaea] focus-visible:ring-[#ff4747]"
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
                  <div className="mb-4">
                    <Label htmlFor="password" className="block text-gray-700 mb-1">Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#ff4747] transition-colors" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-10 py-3 border-[#eaeaea] focus-visible:ring-[#ff4747]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>

                    {/* Password requirements (sign up only) */}
                    {authMode === 'signup' && (
                      <div className="mt-2">
                        <div className="w-full h-1 flex space-x-1">
                          <div className={`h-full rounded-full w-1/4 ${password.length >= 8 ? 'bg-[#ff4747]' : 'bg-gray-200'}`}></div>
                          <div className={`h-full rounded-full w-1/4 ${/[A-Z]/.test(password) ? 'bg-[#ff4747]' : 'bg-gray-200'}`}></div>
                          <div className={`h-full rounded-full w-1/4 ${/[0-9]/.test(password) ? 'bg-[#ff4747]' : 'bg-gray-200'}`}></div>
                          <div className={`h-full rounded-full w-1/4 ${/[^A-Za-z0-9]/.test(password) ? 'bg-[#ff4747]' : 'bg-gray-200'}`}></div>
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
                    <div className="mb-4">
                      <Label htmlFor="confirmPassword" className="block text-gray-700 mb-1">Confirm Password</Label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#ff4747] transition-colors" />
                        <Input
                          id="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm your password"
                          className={`w-full pl-10 pr-10 py-3 border-[#eaeaea] focus-visible:ring-[#ff4747] ${
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
                    <div className="flex items-center mb-4">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={agreeToTerms}
                        onChange={() => setAgreeToTerms(!agreeToTerms)}
                        className="h-4 w-4 text-[#ff4747] rounded border-gray-300 focus:ring-[#ff4747]"
                        required
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                        I agree to the <a href="#" className="text-[#ff4747] hover:underline">Terms of Service</a> and <a href="#" className="text-[#ff4747] hover:underline">Privacy Policy</a>
                      </label>
                    </div>
                  )}

                  {/* Remember me & Forgot password */}
                  {authMode === 'signin' && (
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            id="remember-me"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                            className="absolute opacity-0 w-0 h-0"
                          />
                          <div className="block bg-gray-200 w-10 h-6 rounded-full cursor-pointer"></div>
                          <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${rememberMe ? 'transform translate-x-4 bg-[#ff4747]' : ''}`}></div>
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
                <div className="mb-4 mt-4 p-4 border border-[#eaeaea] rounded-lg bg-[#f9f9f9]">
                  <h3 className="text-sm font-medium text-gray-800 mb-2 flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-[#ff4747]" />
                    Two-Factor Authentication Required
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">
                    We've sent a verification code to your {activeTab === 'email' ? 'email' : 'phone'}.
                  </p>
                  <div className="mb-4">
                    <Label htmlFor="twoFactorCode">Enter 6-digit code</Label>
                    <InputOTP maxLength={6} value={twoFactorCode} onChange={setTwoFactorCode} className="mt-2">
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="border-[#eaeaea] focus:border-[#ff4747] focus:ring-[#ff4747]" />
                        <InputOTPSlot index={1} className="border-[#eaeaea] focus:border-[#ff4747] focus:ring-[#ff4747]" />
                        <InputOTPSlot index={2} className="border-[#eaeaea] focus:border-[#ff4747] focus:ring-[#ff4747]" />
                        <InputOTPSlot index={3} className="border-[#eaeaea] focus:border-[#ff4747] focus:ring-[#ff4747]" />
                        <InputOTPSlot index={4} className="border-[#eaeaea] focus:border-[#ff4747] focus:ring-[#ff4747]" />
                        <InputOTPSlot index={5} className="border-[#eaeaea] focus:border-[#ff4747] focus:ring-[#ff4747]" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <div className="flex justify-between mt-2">
                    <button type="button" className="text-xs text-[#ff4747] hover:text-[#ff2727] transition-colors">
                      Resend code
                    </button>
                    <span className="text-xs text-gray-500">
                      <Clock className="h-3 w-3 inline mr-1" />
                      Code expires in 4:59
                    </span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="mb-4">
              {!resetSent ? (
                <div>
                  <Label htmlFor="resetEmail" className="block text-gray-700 mb-1">Email address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#ff4747] transition-colors" />
                    <Input
                      id="resetEmail"
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-10 pr-3 py-3 border-[#eaeaea] focus-visible:ring-[#ff4747]"
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
              className="w-full flex items-center justify-center bg-[#ff4747] hover:bg-[#ff2727] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff4747] text-white font-medium py-3 px-4 rounded-lg transition-all relative overflow-hidden h-12"
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
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}

          {resetSent && (
            <Button
              type="button"
              onClick={goBack}
              className="w-full mt-4 border-[#ff4747] text-[#ff4747] hover:bg-[#fff2f2]"
              variant="outline"
            >
              Back to sign in
            </Button>
          )}
        </form>

        {/* Social logins */}
        {currentStep === 1 && !resetPassword && !resetSent && !showTwoFactor && (
          <div className="px-6 pt-0 pb-6 max-w-4xl mx-auto w-full">
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t w-full absolute"></div>
              <span className="bg-white px-4 text-sm text-gray-500 relative">or continue with</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button 
                type="button"
                onClick={() => handleSocialLogin('github')}
                className="flex justify-center items-center py-2 px-4 border border-[#eaeaea] rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-all hover:shadow-md"
              >
                <Github className="h-5 w-5" />
              </button>
              <button 
                className="flex justify-center items-center py-2 px-4 border border-[#eaeaea] rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-all hover:shadow-md"
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
                className="flex justify-center items-center py-2 px-4 border border-[#eaeaea] rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-all hover:shadow-md"
              >
                <Twitter className="h-5 w-5 text-[#1DA1F2]" />
              </button>
            </div>
          </div>
        )}

        {/* Registration link */}
        {currentStep === 1 && !resetPassword && !resetSent && !showTwoFactor && (
          <div className="px-6 py-4 bg-[#f9f9f9] flex items-center justify-between max-w-4xl mx-auto w-full">
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
        <div className="p-4 bg-[#f9f9f9] flex items-start border-t border-[#eaeaea] max-w-4xl mx-auto w-full">
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
