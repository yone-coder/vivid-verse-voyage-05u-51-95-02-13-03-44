import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Lock, AlertCircle, Check } from 'lucide-react';

interface ConfirmPasswordFieldProps {
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  password: string;
  showPassword: boolean;
}

const ConfirmPasswordField = ({ 
  confirmPassword, 
  setConfirmPassword, 
  password,
  showPassword 
}: ConfirmPasswordFieldProps) => {
  const passwordsMatch = confirmPassword && password === confirmPassword;
  const showError = confirmPassword && password !== confirmPassword;
  
  return (
    <div className="mb-4">
      <Label htmlFor="confirmPassword" className="flex items-center justify-between font-medium text-gray-700 mb-1">
        <span>Confirm Password</span>
        {confirmPassword && (
          passwordsMatch ? (
            <span className="text-xs flex items-center text-green-500">
              <Check className="h-3.5 w-3.5 mr-1" />
              Passwords match
            </span>
          ) : (
            <span className="text-xs flex items-center text-red-500">
              <AlertCircle className="h-3.5 w-3.5 mr-1" />
              Passwords don't match
            </span>
          )
        )}
      </Label>
      <div className="relative group">
        <Lock className={`absolute left-3 top-3 h-5 w-5 ${showError ? 'text-red-500' : 'text-gray-400 group-focus-within:text-[#ff4747]'} transition-colors`} />
        <Input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          className={`w-full pl-10 py-2.5 border-[#eaeaea] focus-visible:ring-[#ff4747] ${
            showError 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200 bg-red-50/30 dark:bg-red-950/10' 
              : passwordsMatch && confirmPassword
              ? 'border-green-500 focus:border-green-600 focus:ring-green-200 bg-green-50/30 dark:bg-green-950/10'
              : ''
          } text-base`}
          required
          aria-invalid={showError ? 'true' : 'false'}
          aria-describedby={showError ? 'confirm-password-error' : undefined}
        />
      </div>
    </div>
  );
};

export default ConfirmPasswordField;
