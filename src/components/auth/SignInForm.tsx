
import React from 'react';
import { Eye, EyeOff, Lock, ArrowRight, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

interface SignInFormProps {
  email: string;
  password: string;
  rememberMe: boolean;
  setPassword: (password: string) => void;
  setRememberMe: (value: boolean) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  goBack: () => void;
  step: number;
}

const SignInForm = ({ 
  email, 
  password, 
  rememberMe, 
  setPassword, 
  setRememberMe, 
  showPassword, 
  setShowPassword, 
  handleSubmit,
  goBack,
  step
}: SignInFormProps) => {
  const handleForgotPassword = () => {
    toast.info("Password reset functionality is not implemented yet");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {step === 2 && (
        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium mb-1 text-[#333]">
            Password
          </label>
          <div className="relative group">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-[#ff4747] transition-colors" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 pl-10 bg-white border border-[#e8e8e8] rounded-md text-[#333] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#ff4747] focus:border-transparent transition-all"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#333] transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center">
              <div className="relative inline-block w-8 mr-2 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="remember" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="opacity-0 absolute block w-4 h-4 cursor-pointer" 
                />
                <label 
                  htmlFor="remember" 
                  className={`block overflow-hidden h-4 rounded-full bg-[#e8e8e8] cursor-pointer transition-colors duration-200 ${rememberMe ? 'bg-[#ff4747]' : ''}`}
                >
                  <span className={`block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${rememberMe ? 'translate-x-4' : 'translate-x-0'}`}></span>
                </label>
              </div>
              <label htmlFor="remember" className="text-xs cursor-pointer text-[#666]">
                Remember me
              </label>
            </div>
            <button 
              type="button"
              onClick={handleForgotPassword} 
              className="text-[#ff4747] hover:text-[#ff2727] hover:underline text-xs transition-colors"
            >
              Forgot password?
            </button>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#ff3030] to-[#ff6060] text-white font-medium py-3 px-4 rounded-md hover:from-[#ff2020] hover:to-[#ff5050] transition-all focus:outline-none focus:ring-2 focus:ring-[#ff4747] focus:ring-offset-2 focus:ring-offset-white mt-4 relative group overflow-hidden shadow-md"
      >
        <span className="flex items-center justify-center">
          {step === 1 ? 'Continue' : 'Sign In'}
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </button>

      {step === 2 && (
        <div className="text-center mt-3">
          <button 
            type="button" 
            onClick={goBack}
            className="text-gray-500 hover:text-gray-700 text-xs transition-colors inline-flex items-center"
          >
            <ChevronLeft className="h-3 w-3 mr-1" />
            Back to {email}
          </button>
        </div>
      )}
    </form>
  );
};

export default SignInForm;
