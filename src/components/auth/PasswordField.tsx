
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, CheckCircle2, XCircle } from 'lucide-react';

interface PasswordFieldProps {
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

const PasswordField = ({ password, setPassword, showPassword, setShowPassword }: PasswordFieldProps) => {
  const [strength, setStrength] = useState(0);

  // Password strength checker
  useEffect(() => {
    let newStrength = 0;
    
    if (password.length > 0) {
      newStrength += 1;
    }
    
    if (password.length >= 8) {
      newStrength += 1;
    }
    
    if (/[A-Z]/.test(password)) {
      newStrength += 1;
    }
    
    if (/[0-9]/.test(password)) {
      newStrength += 1;
    }
    
    if (/[^A-Za-z0-9]/.test(password)) {
      newStrength += 1;
    }
    
    setStrength(newStrength);
  }, [password]);

  const getStrengthLabel = () => {
    if (password.length === 0) return "";
    if (strength <= 2) return "Weak";
    if (strength <= 4) return "Medium";
    return "Strong";
  };

  const getStrengthColor = () => {
    if (password.length === 0) return "bg-gray-200";
    if (strength <= 2) return "bg-red-500";
    if (strength <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="mb-1 relative">
      <Label htmlFor="password" className="block text-gray-700 mb-1">Password</Label>
      <div className="relative group">
        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#ff4747] transition-colors" />
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full pl-10 pr-10 py-2.5 rounded-md border border-[#eaeaea] focus:outline-none focus:ring-2 focus:ring-[#ff4747] focus:border-transparent"
          required
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      
      {password.length > 0 && (
        <div className="mt-2 space-y-2">
          {/* Password strength bar */}
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${getStrengthColor()}`}
              style={{ width: `${Math.min(100, strength * 20)}%` }}
            ></div>
          </div>
          
          {/* Password strength indicator */}
          <div className="flex justify-between items-center text-xs">
            <span className={`font-medium ${
              strength <= 2 ? 'text-red-500' : 
              strength <= 4 ? 'text-yellow-500' : 
              'text-green-500'
            }`}>
              {getStrengthLabel()} Password
            </span>
            <span className="text-gray-400">
              {password.length >= 8 ? (
                <span className="flex items-center text-green-500">
                  <CheckCircle2 className="inline-block h-3 w-3 mr-1" />
                  Min 8 characters
                </span>
              ) : (
                <span className="flex items-center text-gray-400">
                  <XCircle className="inline-block h-3 w-3 mr-1" />
                  Min 8 characters
                </span>
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordField;
