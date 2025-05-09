
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff } from 'lucide-react';

interface PasswordFieldProps {
  id: string;
  label: string;
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
  hasConfirmation?: boolean;
  confirmPassword?: string;
}

const PasswordField = ({ 
  id, 
  label, 
  password, 
  setPassword, 
  showPassword, 
  toggleShowPassword,
  hasConfirmation = false,
  confirmPassword = ''
}: PasswordFieldProps) => {
  const getPasswordStrength = () => {
    if (password.length === 0) return 'None';
    if (password.length < 8) return 'Weak';
    if (!/[A-Z]/.test(password)) return 'Fair';
    if (!/[0-9]/.test(password)) return 'Good';
    if (!/[^A-Za-z0-9]/.test(password)) return 'Strong';
    return 'Very Strong';
  };

  return (
    <div className="mb-4">
      <Label htmlFor={id} className="block font-medium text-gray-700 mb-1">{label}</Label>
      <div className="relative group">
        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#ff4747] transition-colors" />
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={`Enter your ${label.toLowerCase()}`}
          className="w-full pl-10 pr-10 py-2.5 border-[#eaeaea] focus-visible:ring-[#ff4747] text-base"
          required
          autoFocus
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>

      {hasConfirmation && (
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
      )}
    </div>
  );
};

export default PasswordField;
