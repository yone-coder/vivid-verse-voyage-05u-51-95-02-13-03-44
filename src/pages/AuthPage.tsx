
import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthPageProps {
  isOverlay?: boolean;
  onClose?: () => void;
}

const AuthPage = ({ isOverlay = false, onClose }: AuthPageProps) => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [step, setStep] = useState(1); // 1 for email, 2 for password
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleEmailSubmit = () => {
    const inputValue = loginMethod === 'email' ? email.trim() : phoneNumber.trim();
    if (inputValue) {
      setStep(2);
    }
  };

  const handlePasswordSubmit = async () => {
    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    setIsLoading(true);
    try {
      const loginEmail = loginMethod === 'email' ? email : phoneNumber;
      await signIn(loginEmail, password, rememberMe);
      toast.success("Signed in successfully!");
      if (onClose) onClose();
      navigate('/for-you');
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep(1);
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`${provider} login is not configured yet`);
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-contain bg-top bg-no-repeat w-full"
        style={{
          backgroundImage: `url('/lovable-uploads/abcdf0d8-acdf-4009-abf2-0b30ecb1f695.png')`
        }}
      />
      
      {/* Black Gradient Overlay starting from middle to bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% via-black/70 to-black"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-8">
          <div className="max-w-md mx-auto">
            {isOverlay && onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-8 pb-16">
          <div className="w-full max-w-md">
            <h1 className="text-white text-5xl font-bold mb-12 text-center">
              Sign in
            </h1>

            {step === 1 ? (
              // Step 1: Email and Social Login
              <>
                {/* Social Login Buttons */}
                <div className="space-y-4 mb-8">
                  <button 
                    onClick={() => handleSocialLogin('Google')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-full flex items-center justify-center gap-3 transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>

                  <button 
                    onClick={() => handleSocialLogin('Apple')}
                    className="w-full bg-black/50 backdrop-blur-sm border border-gray-600 hover:border-gray-400 text-white font-semibold py-3 px-4 rounded-full flex items-center justify-center gap-3 transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    Continue with Apple
                  </button>
                </div>

                <div className="flex items-center my-8">
                  <hr className="flex-1 border-gray-600" />
                  <span className="px-4 text-gray-400">or</span>
                  <hr className="flex-1 border-gray-600" />
                </div>

                {/* Login Method Tabs */}
                <div className="flex bg-gray-800/70 backdrop-blur-sm rounded-lg p-1 mb-6">
                  <button
                    onClick={() => setLoginMethod('email')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      loginMethod === 'email'
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Email
                  </button>
                  <button
                    onClick={() => setLoginMethod('phone')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      loginMethod === 'phone'
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Phone
                  </button>
                </div>

                {/* Input Field */}
                <div className="space-y-6">
                  <div>
                    <label htmlFor="login-input" className="block text-white text-sm font-semibold mb-2">
                      {loginMethod === 'email' ? 'Email or username' : 'Phone number'}
                    </label>
                    {loginMethod === 'email' ? (
                      <input
                        type="text"
                        id="login-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit()}
                        className="w-full px-4 py-3 bg-gray-800/70 backdrop-blur-sm border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Email or username"
                      />
                    ) : (
                      <input
                        type="tel"
                        id="login-input"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit()}
                        className="w-full px-4 py-3 bg-gray-800/70 backdrop-blur-sm border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleEmailSubmit}
                    className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-4 rounded-full transition-colors"
                  >
                    Next
                  </button>
                </div>

                <div className="text-center mt-8">
                  <p className="text-gray-400 text-sm">
                    Don't have an account?{' '}
                    <button 
                      onClick={handleSignupRedirect}
                      className="text-white hover:text-green-500 underline font-semibold"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </>
            ) : (
              // Step 2: Password
              <>
                {/* Back button and email display */}
                <div className="mb-8">
                  <button
                    onClick={handleBackToEmail}
                    className="flex items-center text-gray-400 hover:text-white mb-4 transition-colors"
                  >
                    <ArrowLeft size={20} className="mr-2" />
                    Back
                  </button>
                  <div className="text-gray-400 text-sm mb-2">Continue as</div>
                  <div className="text-white font-semibold text-lg">
                    {loginMethod === 'email' ? email : phoneNumber}
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="password" className="block text-white text-sm font-semibold">
                        Password
                      </label>
                      <a href="#" className="text-white hover:text-green-500 underline text-sm">
                        Forgot your password?
                      </a>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                        className="w-full px-4 py-3 bg-gray-800/70 backdrop-blur-sm border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                        placeholder="Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-green-500 bg-gray-800 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
                    />
                    <label htmlFor="remember" className="ml-2 text-white text-sm">
                      Remember me
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={handlePasswordSubmit}
                    disabled={isLoading}
                    className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Signing in...' : 'Log In'}
                  </button>

                  <div className="text-center mt-8">
                    <p className="text-gray-400 text-sm">
                      Don't have an account?{' '}
                      <button 
                        onClick={handleSignupRedirect}
                        className="text-white hover:text-green-500 underline font-semibold"
                      >
                        Sign up
                      </button>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthPage;
