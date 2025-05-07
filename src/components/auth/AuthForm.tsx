
import React, { useState } from 'react';
import { Mail, Phone, KeyRound, Eye, EyeOff, Github, Twitter } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import AuthTabs from './AuthTabs';
import PasswordField from './PasswordField';
import RememberMeToggle from './RememberMeToggle';
import SubmitButton from './SubmitButton';
import AuthModeToggle from './AuthModeToggle';
import SocialLogins from './SocialLogins';

interface AuthFormProps {
  onSubmit: (data: any) => void;
}

const AuthForm = ({ onSubmit }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('email');
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form
      if (authMode === 'signup' && password !== confirmPassword) {
        throw new Error("Passwords don't match");
      }

      if (authMode === 'signup' && password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }

      // Prepare form data
      const formData = {
        authMode,
        method: activeTab,
        email: activeTab === 'email' ? email : '',
        phone: activeTab === 'phone' ? `${countryCode}${phone}` : '',
        password,
        fullName: authMode === 'signup' ? fullName : '',
        rememberMe
      };

      await onSubmit(formData);
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message || "Something went wrong, please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle social login
  const handleSocialLogin = async (provider: 'github' | 'twitter') => {
    setIsLoading(true);
    try {
      toast({
        title: "Social Login",
        description: `${provider} login initiated.`,
      });
      // Here you would implement actual social login logic
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Social login error:', error);
      setIsLoading(false);
    }
  };

  const isSignUp = authMode === 'signup';
  
  return (
    <>
      <div className="max-w-lg w-full mx-auto px-6 py-6 bg-white rounded-xl shadow-md">
        <AuthTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          isSignUp={isSignUp}
          fullName={fullName}
          setFullName={setFullName}
        />

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <PasswordField 
            password={password} 
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          
          {isSignUp && (
            <div className="mb-4 relative group">
              <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full pl-3 pr-10 py-2.5 border rounded-md border-[#eaeaea] focus:outline-none focus:ring-2 focus:ring-[#ff4747] focus:border-transparent"
                  required={isSignUp}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#333]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <RememberMeToggle 
              rememberMe={rememberMe} 
              setRememberMe={setRememberMe} 
            />
            
            {!isSignUp && (
              <a href="#" className="text-sm font-medium text-[#ff4747] hover:text-[#ff2727] transition-colors">
                Forgot password?
              </a>
            )}
          </div>
          
          <SubmitButton 
            isLoading={isLoading} 
            label={authMode === 'signin' ? 'Sign In' : 'Sign Up'} 
          />
        </form>
      </div>
      
      <SocialLogins handleSocialLogin={handleSocialLogin} />
      <AuthModeToggle authMode={authMode} setAuthMode={setAuthMode} />
    </>
  );
};

export default AuthForm;
