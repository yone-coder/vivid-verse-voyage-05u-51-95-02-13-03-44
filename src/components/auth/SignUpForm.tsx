
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface SignUpFormProps {
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  setPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  setAgreeToTerms: (value: boolean) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  goBack: () => void;
  step: number;
}

const SignUpForm = ({ 
  email, 
  password, 
  confirmPassword,
  agreeToTerms,
  setPassword, 
  setConfirmPassword,
  setAgreeToTerms,
  showPassword, 
  setShowPassword, 
  handleSubmit,
  goBack,
  step
}: SignUpFormProps) => {
  const getPasswordStrength = () => {
    if (password.length === 0) return 'None';
    if (password.length < 8) return 'Weak';
    if (!/[A-Z]/.test(password)) return 'Fair';
    if (!/[0-9]/.test(password)) return 'Good';
    if (!/[^A-Za-z0-9]/.test(password)) return 'Strong';
    return 'Very Strong';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {step === 2 && (
        <>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium mb-1 text-[#333]">
              Create Password
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
            
            <div className="mt-2">
              <div className="w-full h-1 flex space-x-1">
                <div className={`h-full rounded-full w-1/4 ${password.length >= 8 ? 'bg-[#ff4747]' : 'bg-gray-200'}`}></div>
                <div className={`h-full rounded-full w-1/4 ${/[A-Z]/.test(password) ? 'bg-[#ff4747]' : 'bg-gray-200'}`}></div>
                <div className={`h-full rounded-full w-1/4 ${/[0-9]/.test(password) ? 'bg-[#ff4747]' : 'bg-gray-200'}`}></div>
                <div className={`h-full rounded-full w-1/4 ${/[^A-Za-z0-9]/.test(password) ? 'bg-[#ff4747]' : 'bg-gray-200'}`}></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">Password strength: {getPasswordStrength()}</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 text-[#333]">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-3 py-2 bg-white border rounded-md text-[#333] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#ff4747] focus:border-transparent ${
                  confirmPassword && password !== confirmPassword 
                    ? 'border-red-500' 
                    : 'border-[#e8e8e8]'
                }`}
                required
              />
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="text-red-500 text-xs mt-1">Passwords don't match</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-[#ff4747] focus:ring-[#ff4747]"
            />
            <label htmlFor="terms" className="ml-2 block text-xs text-gray-600">
              I agree to the <a href="/terms" className="text-[#ff4747] hover:underline">Terms of Service</a> and <a href="/privacy" className="text-[#ff4747] hover:underline">Privacy Policy</a>
            </label>
          </div>
        </>
      )}

      <button
        type="submit"
        className="w-full bg-[#ff4747] text-white font-medium py-2 px-4 rounded-md hover:bg-[#ff2727] transition-all focus:outline-none focus:ring-2 focus:ring-[#ff4747] focus:ring-offset-2 focus:ring-offset-white mt-3"
        disabled={step === 2 && (!agreeToTerms || (confirmPassword !== password))}
      >
        {step === 1 ? 'Next' : 'Sign Up'}
      </button>

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

export default SignUpForm;
