
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
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
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#e8e8e8] rounded-md text-[#333] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#ff4747] focus:border-transparent"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#333]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="flex items-center mt-2">
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
                className={`block overflow-hidden h-4 rounded-full bg-[#e8e8e8] cursor-pointer ${rememberMe ? 'bg-[#ff4747]' : ''}`}
              >
                <span className={`block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 ease-in ${rememberMe ? 'translate-x-4' : 'translate-x-0'}`}></span>
              </label>
            </div>
            <label htmlFor="remember" className="text-xs cursor-pointer text-[#666]">
              Remember me
            </label>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-[#ff4747] text-white font-medium py-2 px-4 rounded-md hover:bg-[#ff2727] transition-all focus:outline-none focus:ring-2 focus:ring-[#ff4747] focus:ring-offset-2 focus:ring-offset-white mt-3"
      >
        {step === 1 ? 'Next' : 'Log In'}
      </button>

      {step === 2 && (
        <div className="text-center mt-2">
          <button 
            type="button"
            onClick={handleForgotPassword} 
            className="text-[#ff4747] hover:text-[#ff2727] hover:underline text-xs transition-colors"
          >
            Forgot your password?
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="text-center mt-2">
          <button 
            type="button" 
            onClick={goBack}
            className="text-gray-500 hover:text-gray-700 text-xs transition-colors"
          >
            ← Back to {email}
          </button>
        </div>
      )}
    </form>
  );
};

export default SignInForm;
