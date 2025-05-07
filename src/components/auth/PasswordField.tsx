
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

interface PasswordFieldProps {
  label: string;
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
  hasConfirmation?: boolean;
  confirmPassword?: string;
}

const PasswordField = ({ 
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

  const requirements = [
    { text: "8+ characters", fulfilled: password.length >= 8 },
    { text: "Contains uppercase letter", fulfilled: /[A-Z]/.test(password) },
    { text: "Contains number", fulfilled: /[0-9]/.test(password) },
    { text: "Contains special character", fulfilled: /[^A-Za-z0-9]/.test(password) }
  ];

  return (
    <div className="mb-4">
      <Label htmlFor={`password-${label.toLowerCase().replace(/\s+/g, '-')}`} className="block text-gray-700 mb-1">{label}</Label>
      <div className="relative group">
        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-[#ff4747] transition-colors" />
        <Input
          id={`password-${label.toLowerCase().replace(/\s+/g, '-')}`}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={`Enter your ${label.toLowerCase()}`}
          className="w-full pl-10 pr-10 py-3 border-[#eaeaea] focus-visible:ring-[#ff4747]"
          required
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
        <div className="mt-3 space-y-2">
          <div className="w-full h-1.5 flex space-x-1">
            <div className={`h-full rounded-full w-1/4 transition-colors ${password.length >= 8 ? 'bg-[#ff4747]' : 'bg-gray-200'}`}></div>
            <div className={`h-full rounded-full w-1/4 transition-colors ${/[A-Z]/.test(password) ? 'bg-[#ff4747]' : 'bg-gray-200'}`}></div>
            <div className={`h-full rounded-full w-1/4 transition-colors ${/[0-9]/.test(password) ? 'bg-[#ff4747]' : 'bg-gray-200'}`}></div>
            <div className={`h-full rounded-full w-1/4 transition-colors ${/[^A-Za-z0-9]/.test(password) ? 'bg-[#ff4747]' : 'bg-gray-200'}`}></div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Password strength: {getPasswordStrength()}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-center text-xs">
                {req.fulfilled ? 
                  <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5" /> : 
                  <AlertCircle className="h-3.5 w-3.5 text-gray-400 mr-1.5" />}
                <span className={req.fulfilled ? "text-green-500" : "text-gray-500"}>
                  {req.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordField;
