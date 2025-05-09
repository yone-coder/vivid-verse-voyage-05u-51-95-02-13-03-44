
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Lock } from 'lucide-react';

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
  return (
    <div className="mb-4">
      <Label htmlFor="confirmPassword" className="block mb-1.5 text-foreground/90">Confirm Password</Label>
      <div className="relative group">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-[#ff4747] transition-colors" />
        <Input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          className={`w-full pl-10 pr-3 h-11 border-input bg-background/80 focus-visible:ring-[#ff4747] ${
            confirmPassword && password !== confirmPassword 
              ? 'border-red-500 focus:ring-red-500' 
              : ''
          }`}
          required
        />
        {confirmPassword && password !== confirmPassword && (
          <div className="text-xs text-red-500 mt-1">Passwords don't match</div>
        )}
      </div>
    </div>
  );
};

export default ConfirmPasswordField;
