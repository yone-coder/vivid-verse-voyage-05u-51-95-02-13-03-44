
import React from 'react';
import { Eye, EyeOff, Lock, Shield, ChevronLeft, ArrowRight } from 'lucide-react';

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
    if (password.length === 0) return { text: 'None', color: 'bg-gray-200' };
    if (password.length < 8) return { text: 'Weak', color: 'bg-red-500' };
    if (!/[A-Z]/.test(password)) return { text: 'Fair', color: 'bg-orange-500' };
    if (!/[0-9]/.test(password)) return { text: 'Good', color: 'bg-yellow-500' };
    if (!/[^A-Za-z0-9]/.test(password)) return { text: 'Strong', color: 'bg-green-500' };
    return { text: 'Very Strong', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength();

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {step === 2 && (
        <>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium mb-1 text-[#333]">
              Create Password
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
            
            <div className="mt-2">
              <div className="w-full h-1.5 flex space-x-1 rounded-full bg-gray-100 overflow-hidden">
                <div className={`h-full transition-all duration-300 ${strength.color}`} 
                    style={{ width: `${Math.min(100, (password.length / 12) * 100)}%` }}></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">Password strength: <span className="font-medium">{strength.text}</span></span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 text-[#333]">
              Confirm Password
            </label>
            <div className="relative group">
              <Shield className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-[#ff4747] transition-colors" />
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-3 py-2 pl-10 bg-white border rounded-md text-[#333] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#ff4747] focus:border-transparent transition-all ${
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
        className={`w-full bg-gradient-to-r from-[#ff3030] to-[#ff6060] text-white font-medium py-3 px-4 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-[#ff4747] focus:ring-offset-2 focus:ring-offset-white mt-4 relative group overflow-hidden shadow-md
        ${step === 2 && (!agreeToTerms || (confirmPassword !== password)) ? 
          'opacity-50 cursor-not-allowed from-gray-400 to-gray-500' : 
          'hover:from-[#ff2020] hover:to-[#ff5050]'}`}
        disabled={step === 2 && (!agreeToTerms || (confirmPassword !== password))}
      >
        <span className="flex items-center justify-center">
          {step === 1 ? 'Continue' : 'Create Account'}
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

export default SignUpForm;
