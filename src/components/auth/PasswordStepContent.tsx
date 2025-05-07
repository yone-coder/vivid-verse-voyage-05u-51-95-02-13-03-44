
import React, { useState } from 'react';
import PasswordField from './PasswordField';
import RememberMeToggle from './RememberMeToggle';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface PasswordStepContentProps {
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: () => void;
  rememberMe: boolean;
  setRememberMe: (remember: boolean) => void;
  onBack: () => void;
  loading?: boolean;
}

const PasswordStepContent: React.FC<PasswordStepContentProps> = ({
  password,
  setPassword,
  handleSubmit,
  rememberMe,
  setRememberMe,
  onBack,
  loading = false
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-4 py-2">
      <div className="flex items-center mb-4">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-medium">Enter your password</h2>
      </div>

      <PasswordField
        label="Password"
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        toggleShowPassword={toggleShowPassword}
      />

      <div className="flex items-center justify-between">
        <RememberMeToggle rememberMe={rememberMe} setRememberMe={setRememberMe} />
        
        <a 
          href="#" 
          className="text-sm text-[#ff4747] hover:text-[#ff2727] transition-colors"
        >
          Forgot password?
        </a>
      </div>

      <Button
        type="button"
        className="w-full mt-4"
        onClick={handleSubmit}
        disabled={password.length === 0 || loading}
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
    </div>
  );
};

export default PasswordStepContent;
