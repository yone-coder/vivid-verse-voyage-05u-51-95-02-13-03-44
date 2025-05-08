import React from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

interface SignInFormProps {
  email: string;
  password: string;
  rememberMe: boolean;
  setEmail?: (email: string) => void;
  setPassword: (password: string) => void;
  setRememberMe: (value: boolean) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  goBack: () => void;
  step: number;
  isLoading?: boolean;
}

const SignInForm = ({ 
  email, 
  password, 
  rememberMe, 
  setEmail,
  setPassword, 
  setRememberMe, 
  showPassword, 
  setShowPassword, 
  handleSubmit,
  goBack,
  step,
  isLoading = false
}: SignInFormProps) => {
  const handleForgotPassword = () => {
    toast.info("Password reset functionality is not implemented yet");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-5 w-full">
        {step === 1 && (
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail && setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 py-2.5 pl-10 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
                autoFocus
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <button 
                type="button"
                onClick={handleForgotPassword} 
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 pl-10 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
                autoFocus
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="flex items-center mt-3">
              <div className="relative inline-flex items-center">
                <input 
                  type="checkbox" 
                  id="remember" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only" 
                />
                <div className="relative">
                  <div className={`block w-10 h-5 rounded-full transition-colors duration-200 ease-in-out ${rememberMe ? 'bg-blue-500' : 'bg-gray-200'}`}>
                    <div className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-200 ${rememberMe ? 'translate-x-5' : 'translate-x-0'}`}>
                    </div>
                  </div>
                </div>
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600 cursor-pointer select-none">
                  Remember me
                </label>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white mt-6 relative group disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
        >
          <span className="flex items-center justify-center">
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {step === 1 ? 'Continue' : 'Sign in'}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
          </span>
        </button>

        {step === 2 && (
          <div className="text-center">
            <button 
              type="button" 
              onClick={goBack}
              className="text-gray-600 hover:text-gray-800 text-sm transition-colors inline-flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2 py-1"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to {email}
            </button>
          </div>
        )}
      </form>

      {step === 1 && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
              Sign up
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default SignInForm;