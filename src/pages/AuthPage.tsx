
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Import all the components we created
import AuthHeader from '@/components/auth/AuthHeader';
import StepProgress from '@/components/auth/StepProgress';
import BackButton from '@/components/auth/BackButton';
import AuthTabs from '@/components/auth/AuthTabs';
import PasswordStepContent from '@/components/auth/PasswordStepContent';
import TwoFactorAuth from '@/components/auth/TwoFactorAuth';
import SocialLogins from '@/components/auth/SocialLogins';
import AuthModeToggle from '@/components/auth/AuthModeToggle';
import SafetyNotice from '@/components/auth/SafetyNotice';
import FloatingButtons from '@/components/auth/FloatingButtons';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import SubmitButton from '@/components/auth/SubmitButton';

export default function AuthPage() {
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
  const [deviceTrusted, setDeviceTrusted] = useState(false);
  const [lastLogin, setLastLogin] = useState('May 4, 2025 - 17:42');
  const [loginLocation, setLoginLocation] = useState('San Francisco, USA');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
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

  // Get the appropriate title and description based on current state
  const getHeaderContent = () => {
    if (resetPassword) {
      return {
        title: "Reset Your Password",
        description: "Enter your email to receive a reset link"
      };
    } else if (authMode === 'signin') {
      return {
        title: "Sign In to Your Account",
        description: "Welcome back! Access your account securely"
      };
    } else {
      return {
        title: "Create Your Account",
        description: "Join our community today"
      };
    }
  };

  // Get the appropriate button label based on current state
  const getButtonLabel = () => {
    if (currentStep < totalSteps) {
      return "Continue";
    } else if (resetPassword) {
      return "Send Reset Link";
    } else if (authMode === 'signin') {
      return "Sign In";
    } else {
      return "Create Account";
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans transition-opacity duration-500 w-full">
      <div className="w-full flex flex-col">
        {/* Header */}
        <AuthHeader 
          title={getHeaderContent().title} 
          description={getHeaderContent().description} 
        />

        {/* Step progress */}
        <StepProgress currentStep={currentStep} totalSteps={totalSteps} />

        {/* Go back button */}
        {(currentStep > 1 || resetPassword || authMode === 'signup') && (
          <div className="px-6 pt-0 pb-4 max-w-5xl mx-auto w-full">
            <BackButton 
              onClick={goBack} 
              label={currentStep > 1 
                ? "Back to previous step" 
                : resetPassword 
                  ? "Back to login" 
                  : "Back to sign in"
              } 
            />
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
                      <div className="text-xs text-gray-700">
                        <span className="font-medium">Last login:</span> {lastLogin} from {loginLocation}
                      </div>
                    </div>
                  )}

                  <AuthTabs 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    email={email}
                    setEmail={setEmail}
                    phone={phone}
                    setPhone={setPhone}
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                    isSignUp={authMode === 'signup'}
                    fullName={fullName}
                    setFullName={setFullName}
                  />
                </div>
              )}

              {/* Step 2: Password */}
              {currentStep === 2 && (
                <PasswordStepContent 
                  authMode={authMode}
                  password={password}
                  setPassword={setPassword}
                  showPassword={showPassword}
                  toggleShowPassword={toggleShowPassword}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                  agreeToTerms={agreeToTerms}
                  setAgreeToTerms={setAgreeToTerms}
                  rememberMe={rememberMe}
                  setRememberMe={setRememberMe}
                  handlePasswordReset={handlePasswordReset}
                />
              )}

              {/* Step 3: 2FA (if enabled) */}
              {currentStep === 3 && showTwoFactor && (
                <TwoFactorAuth 
                  twoFactorCode={twoFactorCode}
                  setTwoFactorCode={setTwoFactorCode}
                  activeTab={activeTab}
                />
              )}
            </>
          ) : (
            <ResetPasswordForm 
              resetEmail={resetEmail}
              setResetEmail={setResetEmail}
              resetSent={resetSent}
              isLoading={isLoading}
              goBack={goBack}
            />
          )}

          {/* Submit Button */}
          {(!resetSent || !resetPassword) && (
            <SubmitButton isLoading={isLoading} label={getButtonLabel()} />
          )}
        </form>

        {/* Social logins */}
        {currentStep === 1 && !resetPassword && !resetSent && !showTwoFactor && (
          <SocialLogins handleSocialLogin={handleSocialLogin} />
        )}

        {/* Registration link */}
        {currentStep === 1 && !resetPassword && !resetSent && !showTwoFactor && (
          <AuthModeToggle authMode={authMode} setAuthMode={setAuthMode} />
        )}

        {/* Safety notice */}
        <SafetyNotice />
      </div>

      {/* Floating buttons */}
      <FloatingButtons />
    </div>
  );
}
