
import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface RememberMeToggleProps {
  rememberMe: boolean;
  setRememberMe: (remember: boolean) => void;
}

const RememberMeToggle = ({ rememberMe, setRememberMe }: RememberMeToggleProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="remember-me"
        checked={rememberMe}
        onCheckedChange={setRememberMe}
        className="data-[state=checked]:bg-[#ff4747]"
      />
      <Label htmlFor="remember-me" className="text-sm text-gray-700 cursor-pointer">
        Remember me
      </Label>
    </div>
  );
};

export default RememberMeToggle;
